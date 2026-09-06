import { z } from "zod";

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresá tu nombre completo.")
    .max(100, "El nombre es demasiado largo."),
  email: z.string().trim().email("Ingresá un email válido.").max(160),
  planSlug: z.string().trim().min(1, "Elegí un plan."),
  website: z.string().max(0, "Solicitud inválida.").optional().default(""),
});

export const statusSchema = z.object({
  status: z.enum(["nuevo", "contactado", "cerrado"]),
});
