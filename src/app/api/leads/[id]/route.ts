import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDatabase, type LeadStatus } from "@/lib/mongodb";
import { statusSchema } from "@/lib/validation";
import { isDemoMode, updateDemoLead } from "@/lib/demo";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const parsed = statusSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
    }

    if (isDemoMode()) {
      const updated = updateDemoLead(id, parsed.data.status);
      return updated
        ? NextResponse.json({ ok: true, demo: true })
        : NextResponse.json({ error: "Lead no encontrado." }, { status: 404 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Lead inválido." }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: parsed.data.status as LeadStatus, updatedAt: new Date() } },
    );

    if (!result.matchedCount) {
      return NextResponse.json({ error: "Lead no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    console.error("lead_update_error", error);
    return NextResponse.json({ error: "No se pudo actualizar el lead." }, { status: 500 });
  }
}
