import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Plan Chevrolet | Tu próximo 0 km empieza hoy",
    template: "%s | Plan Chevrolet",
  },
  description:
    "Conocé los planes Chevrolet y encontrá una forma simple de acercarte a tu próximo 0 km.",
  keywords: ["plan Chevrolet", "plan de ahorro", "Chevrolet Argentina", "0 km"],
  openGraph: {
    title: "Plan Chevrolet | Tu próximo 0 km empieza hoy",
    description:
      "Elegí tu Chevrolet y recibí asesoramiento personalizado sobre tu plan de ahorro.",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${dmSans.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
