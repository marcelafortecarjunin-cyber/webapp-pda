"use client";

import { useState } from "react";
import { plans } from "@/lib/plans";
import { ModelCard } from "./ModelCard";

export function PlanCatalog() {
  const [selectedPlan, setSelectedPlan] = useState("");

  function choosePlan(slug: string) {
    setSelectedPlan(slug);
    window.dispatchEvent(new CustomEvent("plan-selected", { detail: slug }));
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.getElementById("fullName")?.focus(), 550);
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <ModelCard key={plan.slug} plan={plan} onChoose={choosePlan} />
        ))}
      </div>
      <p className="mt-6 text-xs leading-5 text-black/45">
        * Valores de referencia de cuota 1 relevados de la página oficial de Plan Chevrolet. Pueden variar según
        condiciones vigentes, impuestos y jurisdicción. Un asesor te brindará la información actualizada.
      </p>
      <div id="catalog-selection" data-selected-plan={selectedPlan} />
    </>
  );
}
