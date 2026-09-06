import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { getDemoAdmin, isDemoMode } from "@/lib/demo";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password || password.length > 200) {
      return NextResponse.json({ error: "Completá email y contraseña." }, { status: 400 });
    }

    let adminId = "";
    let validPassword = false;

    if (isDemoMode()) {
      const demoAdmin = getDemoAdmin();
      adminId = "demo-admin";
      validPassword = email === demoAdmin.email && password === demoAdmin.password;
    } else {
      const db = await getDatabase();
      const admin = await db.collection<{ email: string; passwordHash: string }>("admins").findOne({ email });
      adminId = admin?._id.toString() ?? "";
      validPassword = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
    }

    if (!adminId || !validPassword) {
      return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
    }

    const token = await createSessionToken({ id: adminId, email });
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("admin_login_error", error);
    return NextResponse.json({ error: "No se pudo iniciar sesión." }, { status: 500 });
  }
}
