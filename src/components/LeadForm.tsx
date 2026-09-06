"use client";

import { FormEvent, useEffect, useState } from "react";
import { plans } from "@/lib/plans";

type LeadFormProps = {
  initialPlan?: string;
};

export function LeadForm({ initialPlan = "" }: LeadFormProps) {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    function handlePlanSelection(event: Event) {
      const customEvent = event as CustomEvent<string>;
      setSelectedPlan(customEvent.detail);
    }
    window.addEventListener("plan-selected", handlePlanSelection);
    return () => window.removeEventListener("plan-selected", handlePlanSelection);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "No pudimos enviar tu consulta.");
      setStatus("success");
      setMessage("Listo. Un asesor va a contactarte muy pronto.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Revisá los datos e intentá otra vez.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="fullName" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em]">
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Ej. Martina González"
          required
          minLength={3}
          maxLength={100}
          className="w-full rounded-xl border border-black/15 bg-white/80 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/35 focus:border-ink focus:ring-2 focus:ring-yellow"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tuemail@ejemplo.com"
          required
          maxLength={160}
          className="w-full rounded-xl border border-black/15 bg-white/80 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/35 focus:border-ink focus:ring-2 focus:ring-yellow"
        />
      </div>
      <div>
        <label htmlFor="planSlug" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em]">
          Plan que te interesa
        </label>
        <select
          id="planSlug"
          name="planSlug"
          value={selectedPlan}
          onChange={(event) => setSelectedPlan(event.target.value)}
          required
          className="w-full appearance-none rounded-xl border border-black/15 bg-white/80 px-4 py-3.5 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-yellow"
        >
          <option value="" disabled>
            Elegí un modelo
          </option>
          {plans.map((plan) => (
            <option key={plan.slug} value={plan.slug}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-between rounded-xl bg-ink px-5 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:bg-yellow hover:text-ink disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
      >
        {status === "loading" ? "Enviando..." : "Quiero que me contacten"}
        <span aria-hidden="true" className="text-xl leading-none">
          →
        </span>
      </button>
      <p className="text-[11px] leading-5 text-black/50">
        Al enviar tus datos aceptás que un asesor se comunique con vos para brindarte información sobre el plan elegido.
      </p>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm font-semibold ${status === "error" ? "text-red-700" : status === "success" ? "text-emerald-700" : "text-transparent"}`}
      >
        {message || " "}
      </p>
    </form>
  );
}
