import { describe, expect, it } from "vitest";
import { leadSchema, statusSchema } from "@/lib/validation";

describe("validación de leads", () => {
  it("acepta un lead completo", () => {
    const result = leadSchema.safeParse({
      fullName: "Sofía Martínez",
      email: "sofia@example.com",
      planSlug: "tracker-lt-at",
      incomeRange: "1m-2m",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza email, nombre y plan inválidos", () => {
    const result = leadSchema.safeParse({
      fullName: "x",
      email: "no-es-email",
      planSlug: "",
    });

    expect(result.success).toBe(false);
  });

  it("rechaza un honeypot completado", () => {
    const result = leadSchema.safeParse({
      fullName: "Sofía Martínez",
      email: "sofia@example.com",
      planSlug: "tracker-lt-at",
      incomeRange: "1m-2m",
      website: "bot",
    });

    expect(result.success).toBe(false);
  });
});

describe("estados de leads", () => {
  it("acepta solamente estados operativos conocidos", () => {
    expect(statusSchema.safeParse({ status: "nuevo" }).success).toBe(true);
    expect(statusSchema.safeParse({ status: "contactado" }).success).toBe(true);
    expect(statusSchema.safeParse({ status: "cerrado" }).success).toBe(true);
    expect(statusSchema.safeParse({ status: "borrado" }).success).toBe(false);
  });
});
