import { LeadForm } from "@/components/LeadForm";
import { PlanCatalog } from "@/components/PlanCatalog";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "Plan Chevrolet",
            brand: "Chevrolet",
            areaServed: "AR",
            url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          }),
        }}
      />
      <section className="noise relative bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-5 sm:px-8 lg:px-10 lg:pb-28">
          <nav className="flex items-center justify-between border-b border-white/15 pb-5">
            <Link href="/" className="flex items-center gap-3" aria-label="Plan Chevrolet, inicio">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-ink">
                <span className="text-lg font-black">+</span>
              </span>
              <span className="display text-2xl uppercase tracking-tight">Plan Chevrolet</span>
            </Link>
            <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] text-white/65 md:flex">
              <a className="transition hover:text-yellow" href="#planes">
                Modelos
              </a>
              <a className="transition hover:text-yellow" href="#como-funciona">
                Cómo funciona
              </a>
              <a className="rounded-full border border-white/25 px-4 py-2 text-white transition hover:border-yellow hover:text-yellow" href="/admin/login">
                Acceso admin
              </a>
            </div>
            <a className="text-xs font-bold uppercase tracking-[0.13em] text-yellow md:hidden" href="#contacto">
              Contacto ↗
            </a>
          </nav>

          <div className="grid gap-10 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pt-24">
            <div className="max-w-3xl">
              <p className="reveal mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow">
                <span className="h-px w-10 bg-yellow" />
                Plan de ahorro en Argentina
              </p>
              <h1 className="display reveal delay-1 max-w-4xl text-[clamp(4.5rem,12vw,9.5rem)] uppercase leading-[0.78]">
                Tu próximo
                <br />
                <span className="text-yellow">0 km</span>
                <br />
                empieza hoy.
              </h1>
              <p className="reveal delay-2 mt-8 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
                Elegí el Chevrolet que querés manejar y recibí asesoramiento personalizado sobre tu plan de ahorro.
              </p>
              <div className="reveal delay-3 mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#planes"
                  className="rounded-full bg-yellow px-6 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-ink transition hover:bg-white"
                >
                  Ver modelos <span className="ml-3">↓</span>
                </a>
                <span className="text-xs uppercase tracking-[0.1em] text-white/45">Financiá hasta el 100%</span>
              </div>
            </div>
            <div className="relative hidden min-h-[320px] lg:block">
              <div className="absolute bottom-0 right-2 h-72 w-72 rounded-full border border-yellow/35" />
              <div className="absolute bottom-10 right-12 h-52 w-52 rounded-full border border-white/15" />
              <div className="absolute right-16 top-4 rotate-90 text-[10px] uppercase tracking-[0.25em] text-white/35 [writing-mode:vertical-rl]">
                Chevrolet / Argentina / 2026
              </div>
              <div className="absolute bottom-16 right-24 text-right">
                <p className="display text-8xl leading-none text-white/10">01</p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/45">Elegí tu camino</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-yellow/50" />
      </section>

      <section className="bg-yellow">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            ["01", "Hasta 100%", "de tu Chevrolet 0 km"],
            ["02", "Hasta 120", "cuotas para organizarte"],
            ["03", "Sin interés", "y sin anticipo inicial"],
          ].map(([number, title, copy]) => (
            <div key={number} className="flex items-center gap-4 border-black/15 sm:border-r sm:last:border-0">
              <span className="display text-4xl text-black/30">{number}</span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.06em]">{title}</p>
                <p className="mt-1 text-xs text-black/60">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="planes" className="bg-paper px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/45">Catálogo de planes</p>
              <h2 className="display max-w-xl text-6xl uppercase leading-[0.85] sm:text-8xl">
                Elegí tu
                <br />
                próximo <span className="text-yellow-deep">Chevy.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-black/55">
              Siete modelos. Una decisión que se siente tuya. Tocá cualquier plan para iniciar una conversación.
            </p>
          </div>
          <PlanCatalog />
        </div>
      </section>

      <section id="como-funciona" className="grid-lines bg-paper-muted px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/45">Cómo funciona</p>
            <h2 className="display text-6xl uppercase leading-[0.85] sm:text-8xl">
              Fácil de
              <br />
              <span className="text-yellow-deep">entender.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-6 text-black/60">
              Un grupo cerrado de personas hace aportes mensuales para alcanzar su Chevrolet 0 km. Simple, ordenado y acompañado.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              ["01", "Elegí tu modelo", "Encontrá el plan que mejor se adapta a lo que estás buscando."],
              ["02", "Completá tus datos", "Un asesor recibe tu consulta y te explica cada detalle."],
              ["03", "Empezá tu camino", "Avanzá con la suscripción digital de forma segura."],
            ].map(([number, title, copy]) => (
              <div key={number} className="flex gap-5 rounded-2xl border border-black/10 bg-cream p-6 sm:gap-8 sm:p-8">
                <span className="display text-4xl text-yellow-deep">{number}</span>
                <div>
                  <h3 className="display text-3xl uppercase">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-black/55">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-yellow px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-black/55">Hablemos de tu próximo auto</p>
            <h2 className="display max-w-2xl text-6xl uppercase leading-[0.82] sm:text-8xl">
              Tu plan
              <br />
              empieza
              <br />
              con un hola.
            </h2>
            <div className="mt-10 flex items-center gap-3 text-sm font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/25">↘</span>
              Te respondemos a la brevedad
            </div>
          </div>
          <div className="rounded-[2rem] bg-cream p-6 shadow-[10px_10px_0_rgba(16,21,26,0.12)] sm:p-9">
            <div className="mb-7 flex items-start justify-between gap-5 border-b border-black/10 pb-5">
              <div>
                <h3 className="display text-4xl uppercase">Recibí asesoramiento</h3>
                <p className="mt-2 text-sm text-black/55">Elegí un plan y te contactamos.</p>
              </div>
              <span className="text-2xl text-yellow-deep">✳</span>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="bg-ink px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-xs text-white/45 sm:flex-row sm:items-center">
          <p className="display text-2xl uppercase text-white">Plan Chevrolet</p>
          <p>Información de referencia · Chevrolet Argentina · 2026</p>
          <a className="text-yellow transition hover:text-white" href="https://www.chevrolet.com.ar/plan-chevrolet" target="_blank" rel="noreferrer">
            Fuente oficial ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
