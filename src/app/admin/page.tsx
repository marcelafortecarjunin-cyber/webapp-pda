import { ObjectId } from "mongodb";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLeadTable, type AdminLead } from "@/components/AdminLeadTable";
import { LogoutButton } from "@/components/AdminLeadTable";
import { getSession } from "@/lib/auth";
import { getDatabase, type LeadDocument } from "@/lib/mongodb";
import { isDemoMode, listDemoLeads } from "@/lib/demo";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const status = params.status ?? "";
  const filter: Record<string, unknown> = {};

  if (query) {
    filter.$or = [
      { fullName: { $regex: query.slice(0, 80), $options: "i" } },
      { email: { $regex: query.slice(0, 80), $options: "i" } },
      { planName: { $regex: query.slice(0, 80), $options: "i" } },
    ];
  }
  if (["nuevo", "contactado", "cerrado"].includes(status)) filter.status = status;

  let leads: AdminLead[] = [];
  let loadError = "";
  try {
    if (isDemoMode()) {
      leads = listDemoLeads({ query, status }).slice(0, 100).map((lead) => ({
        _id: lead._id,
        fullName: lead.fullName,
        email: lead.email,
        planName: lead.planName,
        status: lead.status,
        createdAt: lead.createdAt.toISOString(),
      }));
    } else {
      const db = await getDatabase();
      const documents = await db
        .collection<LeadDocument>("leads")
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      leads = documents.map((lead) => ({
        _id: (lead as LeadDocument & { _id: ObjectId })._id.toString(),
        fullName: lead.fullName,
        email: lead.email,
        planName: lead.planName,
        status: lead.status,
        createdAt: lead.createdAt.toISOString(),
      }));
    }
  } catch (error) {
    console.error("admin_page_load_error", error);
    loadError = "No se pudieron cargar los leads.";
  }

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-black/10 bg-ink px-5 py-5 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-ink">+</span>
            <span className="display text-2xl uppercase">Plan Chevrolet</span>
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden text-xs text-white/50 sm:inline">{session.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-black/45">Operaciones</p>
            <h1 className="display text-7xl uppercase leading-[0.8]">Leads</h1>
            <p className="mt-5 text-sm text-black/55">Consultas recibidas desde la landing de Plan Chevrolet.</p>
          </div>
          <div className="rounded-2xl bg-yellow px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/55">Mostrando</p>
            <p className="display mt-1 text-4xl">{leads.length}</p>
          </div>
        </div>

        <form className="mb-5 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 sm:flex-row">
          <label className="sr-only" htmlFor="q">
            Buscar leads
          </label>
          <input id="q" name="q" defaultValue={query} placeholder="Buscar por nombre, email o plan..." className="min-h-11 flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-yellow" />
          <label className="sr-only" htmlFor="status">
            Filtrar por estado
          </label>
          <select id="status" name="status" defaultValue={status} className="min-h-11 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-yellow">
            <option value="">Todos los estados</option>
            <option value="nuevo">Nuevos</option>
            <option value="contactado">Contactados</option>
            <option value="cerrado">Cerrados</option>
          </select>
          <button className="min-h-11 rounded-xl bg-ink px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-yellow hover:text-ink" type="submit">
            Filtrar
          </button>
        </form>

        {loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">{loadError}</div>
        ) : (
          <AdminLeadTable leads={leads} />
        )}
      </div>
    </main>
  );
}
