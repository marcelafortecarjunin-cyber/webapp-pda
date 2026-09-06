"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "No se pudo iniciar sesión.");
      router.push("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-ink">+</span>
          <span className="display text-2xl uppercase">Plan Chevrolet</span>
        </Link>
        <div className="rounded-[2rem] bg-cream p-7 text-ink shadow-[10px_10px_0_rgba(244,208,0,0.35)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Área privada</p>
          <h1 className="display mt-3 text-6xl uppercase leading-[0.85]">Acceso admin</h1>
          <p className="mt-5 text-sm leading-6 text-black/55">Gestioná las consultas que llegan desde la landing.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em]">
                Email
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-yellow" />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em]">
                Contraseña
              </label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-yellow" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-ink px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-yellow hover:text-ink disabled:opacity-60">
              {loading ? "Ingresando..." : "Ingresar al panel"}
            </button>
            <p role="alert" className={`text-sm font-semibold text-red-700 ${error ? "" : "invisible"}`}>
              {error || "Error"}
            </p>
          </form>
        </div>
        <Link href="/" className="mt-7 inline-block text-xs uppercase tracking-[0.12em] text-white/50 transition hover:text-yellow">
          ← Volver a la landing
        </Link>
      </div>
    </main>
  );
}
