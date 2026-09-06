import Image from "next/image";
import type { Plan } from "@/lib/plans";

type ModelCardProps = {
  plan: Plan;
  onChoose?: (slug: string) => void;
};

export function ModelCard({ plan, onChoose }: ModelCardProps) {
  return (
    <article className="group flex min-h-[410px] flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-cream shadow-[0_12px_0_rgba(16,21,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_0_rgba(16,21,26,0.1)]">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[#e5e1d8]">
        {plan.badge ? (
          <span className="absolute left-5 top-5 z-10 rounded-full bg-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
            {plan.badge}
          </span>
        ) : null}
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-yellow/80 blur-2xl transition duration-500 group-hover:scale-125" />
        <Image
          src={plan.image}
          alt={plan.imageAlt}
          width={624}
          height={326}
          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 30vw, 360px"
          className="relative z-10 h-full w-full object-contain px-3 transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h3 className="display text-4xl uppercase leading-none">{plan.name}</h3>
          <span className="mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-black/45">
            cuota 1*
          </span>
        </div>
        <p className="min-h-12 text-sm leading-6 text-black/60">{plan.description}</p>
        <div className="mt-auto border-t border-black/10 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
            Referencia cuota 1
          </p>
          <p className="display mt-1 text-3xl">{plan.price}</p>
          <p className="mt-1 text-xs text-black/50">
            Sin impuestos nacionales: {plan.priceWithoutTaxes}
          </p>
          <button
            type="button"
            onClick={() => onChoose?.(plan.slug)}
            className="mt-5 flex w-full items-center justify-between rounded-xl bg-ink px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-yellow hover:text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          >
            Quiero este plan
            <span aria-hidden="true" className="text-lg leading-none">
              ↗
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
