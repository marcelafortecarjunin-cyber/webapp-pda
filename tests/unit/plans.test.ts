import { describe, expect, it } from "vitest";
import { getPlanBySlug, plans } from "@/lib/plans";

describe("catálogo de planes", () => {
  it("mantiene siete planes con slugs únicos", () => {
    expect(plans).toHaveLength(7);
    expect(new Set(plans.map((plan) => plan.slug)).size).toBe(plans.length);
  });

  it("encuentra un plan por slug", () => {
    expect(getPlanBySlug("tracker-lt-at")?.name).toBe("Tracker LT AT");
    expect(getPlanBySlug("no-existe")).toBeUndefined();
  });
});
