import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { incomeRanges } from "@/lib/income-ranges";
import { getDatabase, type LeadDocument } from "@/lib/mongodb";
import { getPlanBySlug } from "@/lib/plans";
import { leadSchema } from "@/lib/validation";
import { createDemoLead, isDemoMode, listDemoLeads } from "@/lib/demo";

export const runtime = "nodejs";

const requestLog = new Map<string, { count: number; startedAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestLog.get(ip);
  if (!current || now - current.startedAt > WINDOW_MS) {
    requestLog.set(ip, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim() ?? "";
    const status = url.searchParams.get("status") ?? "";
    const requestedIncomeRange = url.searchParams.get("incomeRange") ?? "";
    const incomeRange = incomeRanges.some((range) => range.value === requestedIncomeRange) ? requestedIncomeRange : "";
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1") || 1);
    const pageSize = 20;

    if (isDemoMode()) {
      const demoLeads = listDemoLeads({ query, status, incomeRange });
      return NextResponse.json({
        leads: demoLeads.slice((page - 1) * pageSize, page * pageSize),
        total: demoLeads.length,
        page,
        pageSize,
        pages: Math.max(1, Math.ceil(demoLeads.length / pageSize)),
      });
    }

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { fullName: { $regex: query.slice(0, 80), $options: "i" } },
        { email: { $regex: query.slice(0, 80), $options: "i" } },
        { planName: { $regex: query.slice(0, 80), $options: "i" } },
      ];
    }
    if (["nuevo", "contactado", "cerrado"].includes(status)) filter.status = status;
    if (incomeRange) filter.incomeRange = incomeRange;

    const db = await getDatabase();
    const [leads, total] = await Promise.all([
      db
        .collection<LeadDocument>("leads")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      db.collection<LeadDocument>("leads").countDocuments(filter),
    ]);

    return NextResponse.json({
      leads: leads.map((lead) => ({ ...lead, _id: (lead as LeadDocument & { _id: ObjectId })._id.toString() })),
      total,
      page,
      pageSize,
      pages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    console.error("lead_list_error", error);
    return NextResponse.json({ error: "No se pudieron cargar los leads." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intentá más tarde." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Revisá los campos del formulario." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const plan = getPlanBySlug(parsed.data.planSlug);
    if (!plan) {
      return NextResponse.json({ error: "El plan seleccionado no es válido." }, { status: 400 });
    }

    const now = new Date();
    const lead: LeadDocument = {
      fullName: parsed.data.fullName,
      email: parsed.data.email.toLowerCase(),
      planSlug: plan.slug,
      planName: plan.name,
      incomeRange: parsed.data.incomeRange as LeadDocument["incomeRange"],
      status: "nuevo",
      source: requestHeaders.get("referer") ?? "landing",
      createdAt: now,
      updatedAt: now,
      userAgent: requestHeaders.get("user-agent") ?? undefined,
    };

    if (isDemoMode()) {
      createDemoLead(lead);
      return NextResponse.json({ ok: true, demo: true }, { status: 201 });
    }

    const db = await getDatabase();
    await db.collection<LeadDocument>("leads").insertOne(lead);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("lead_create_error", error);
    return NextResponse.json({ error: "No pudimos guardar tu consulta. Intentá nuevamente." }, { status: 500 });
  }
}
