import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  headers: vi.fn(),
  requireAdmin: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: mocks.headers,
}));

vi.mock("@/lib/auth", async () => {
  const actual = await vi.importActual<typeof import("@/lib/auth")>("@/lib/auth");
  return { ...actual, requireAdmin: mocks.requireAdmin };
});

import { GET, POST } from "@/app/api/leads/route";

describe("API de leads en modo demo", () => {
  beforeEach(() => {
    process.env.DEMO_MODE = "true";
    mocks.headers.mockResolvedValue(
      new Headers({
        "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 200) + 1}`,
        referer: "http://localhost:3000/",
        "user-agent": "vitest",
      }),
    );
    mocks.requireAdmin.mockResolvedValue({ id: "demo-admin", email: "admin@test.local" });
  });

  it("rechaza payloads inválidos con 400", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({ fullName: "x", email: "invalid", planSlug: "" }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Revisá los campos del formulario.",
    });
  });

  it("crea y luego lista un lead sin MongoDB", async () => {
    const email = `lead-${Date.now()}@example.com`;
    const response = await POST(
      new Request("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          fullName: "Lead de integración",
          email,
          planSlug: "tracker-lt-at",
          website: "",
        }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({ ok: true, demo: true });

    const listResponse = await GET(new Request(`http://localhost:3000/api/leads?q=${email}`));
    const list = await listResponse.json();
    expect(listResponse.status).toBe(200);
    expect(list.leads).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email, planName: "Tracker LT AT", status: "nuevo" }),
      ]),
    );
  });
});
