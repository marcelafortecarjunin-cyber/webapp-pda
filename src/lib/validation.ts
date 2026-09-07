import { z } from "zod";
import { incomeRanges } from "@/lib/income-ranges";

const incomeRangeValues = incomeRanges.map((range) => range.value);

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresá tu nombre completo.")
    .max(100, "El nombre es demasiado largo."),
  email: z.string().trim().email("Ingresá un email válido.").max(160),
  planSlug: z.string().trim().min(1, "Elegí un plan."),
  incomeRange: z
    .string()
    .refine((value) => incomeRangeValues.includes(value as (typeof incomeRangeValues)[number]), "Elegí un rango de ingresos."),
  website: z.string().max(0, "Solicitud inválida.").optional().default(""),
});

export const statusSchema = z.object({
  status: z.enum(["nuevo", "contactado", "cerrado"]),
});
