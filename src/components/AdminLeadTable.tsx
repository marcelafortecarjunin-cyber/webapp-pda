"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type AdminLead = {
  _id: string;
  fullName: string;
  email: string;
  planName: string;
  status: "nuevo" | "contactado" | "cerrado";
  createdAt: string;
};

const statusLabels = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cerrado: "Cerrado",
} as const;

export function AdminLeadTable({ leads }: { leads: AdminLead[] }) {
  const [items, setItems] = useState(leads);

  async function updateStatus(id: string, status: AdminLead["status"]) {
    const response = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) return;
    setItems((current) => current.map((lead) => (lead._id === id ? { ...lead, status } : lead)));
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-black/20 bg-white/50 px-6 py-16 text-center">
        <p className="display text-4xl uppercase">Todavía no hay leads</p>
        <p className="mt-2 text-sm text-black/50">Las nuevas consultas van a aparecer acá.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-cream">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-black/10 bg-ink text-[10px] uppercase tracking-[0.13em] text-white/65">
            <tr>
              <th className="px-5 py-4 font-bold">Lead</th>
              <th className="px-5 py-4 font-bold">Plan</th>
              <th className="px-5 py-4 font-bold">Ingreso</th>
              <th className="px-5 py-4 font-bold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {items.map((lead) => (
              <tr key={lead._id} className="transition hover:bg-white">
                <td className="px-5 py-5">
                  <p className="font-bold">{lead.fullName}</p>
                  <a href={`mailto:${lead.email}`} className="mt-1 inline-block text-xs text-black/55 underline decoration-black/20 underline-offset-2 hover:text-ink">
                    {lead.email}
                  </a>
                </td>
                <td className="px-5 py-5 font-semibold">{lead.planName}</td>
                <td className="px-5 py-5 text-xs text-black/55">
                  {new Intl.DateTimeFormat("es-AR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.createdAt))}
                </td>
                <td className="px-5 py-5">
                  <select
                    value={lead.status}
                    aria-label={`Estado de ${lead.fullName}`}
                    onChange={(event) => updateStatus(lead._id, event.target.value as AdminLead["status"])}
                    className={`rounded-full border px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-yellow ${lead.status === "nuevo" ? "border-yellow-deep bg-yellow/30" : lead.status === "contactado" ? "border-blue-300 bg-blue-50" : "border-emerald-300 bg-emerald-50"}`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={logout} disabled={loading} className="text-xs font-bold uppercase tracking-[0.12em] text-black/50 transition hover:text-ink disabled:opacity-50">
      {loading ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}
