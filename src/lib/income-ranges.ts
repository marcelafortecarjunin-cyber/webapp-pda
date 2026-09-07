export const incomeRanges = [
  { value: "menos-1m", label: "Menos de $1.000.000" },
  { value: "1m-2m", label: "Entre $1.000.000 y $2.000.000" },
  { value: "2m-3m", label: "Entre $2.000.000 y $3.000.000" },
  { value: "mas-3m", label: "Más de $3.000.000" },
  { value: "prefiero-no-responder", label: "Prefiero no responder" },
] as const;

export type IncomeRange = (typeof incomeRanges)[number]["value"];

export function getIncomeRangeLabel(value?: string) {
  return incomeRanges.find((range) => range.value === value)?.label ?? "No informado";
}
