export type Plan = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  priceWithoutTaxes: string;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

export const plans: Plan[] = [
  {
    slug: "sonic",
    name: "Sonic",
    shortName: "Sonic",
    price: "$ 528.179",
    priceWithoutTaxes: "$ 431.889",
    description: "Un SUV que no te vas a poder sacar de la cabeza.",
    image: "/images/models/sonic.png",
    imageAlt: "Chevrolet Sonic",
    badge: "Nuevo",
  },
  {
    slug: "onix-lt-mt",
    name: "Onix LT MT",
    shortName: "Onix",
    price: "$ 245.166",
    priceWithoutTaxes: "$ 200.470",
    description: "Una experiencia increíble de seguridad, diseño y confort.",
    image: "/images/models/onix.png",
    imageAlt: "Chevrolet Onix",
  },
  {
    slug: "onix-plus-lt-mt",
    name: "Onix Plus LT MT",
    shortName: "Onix Plus",
    price: "$ 437.796",
    priceWithoutTaxes: "$ 357.983",
    description: "Economía, rendimiento, confort y estilo para todos tus días.",
    image: "/images/models/onix-plus.png",
    imageAlt: "Chevrolet Onix Plus",
  },
  {
    slug: "tracker-lt-at",
    name: "Tracker LT AT",
    shortName: "Tracker",
    price: "$ 306.219",
    priceWithoutTaxes: "$ 250.394",
    description: "Tecnología, rendimiento y seguridad en una sola elección.",
    image: "/images/models/tracker.png",
    imageAlt: "Chevrolet Tracker",
    badge: "Elegido",
  },
  {
    slug: "s10",
    name: "S10",
    shortName: "S10",
    price: "$ 665.313",
    priceWithoutTaxes: "$ 544.022",
    description: "Soluciones inteligentes para una vida conectada.",
    image: "/images/models/s10.png",
    imageAlt: "Chevrolet S10",
  },
  {
    slug: "montana",
    name: "Montana",
    shortName: "Montana",
    price: "$ 307.005",
    priceWithoutTaxes: "$ 251.036",
    description: "Confort, estilo y versatilidad en una pick-up fuerte.",
    image: "/images/models/montana.png",
    imageAlt: "Chevrolet Montana",
  },
  {
    slug: "captiva-hibrida",
    name: "Captiva Híbrida",
    shortName: "Captiva Híbrida",
    price: "$ 518.083",
    priceWithoutTaxes: "$ 502.993",
    description: "El SUV híbrido que te invita a vivir lo mejor.",
    image: "/images/models/captiva-hibrida.png",
    imageAlt: "Chevrolet Captiva Híbrida",
    badge: "Híbrida",
  },
];

export function getPlanBySlug(slug: string) {
  return plans.find((plan) => plan.slug === slug);
}
