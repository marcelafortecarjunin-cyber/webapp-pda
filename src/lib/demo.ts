import type { LeadDocument, LeadStatus } from "@/lib/mongodb";

type DemoLead = LeadDocument & { _id: string };

const initialDemoLeads: DemoLead[] = [
  {
    _id: "demo-lead-001",
    fullName: "Sofía Martínez",
    email: "sofia.demo@ejemplo.com",
    planSlug: "tracker-lt-at",
    planName: "Tracker LT AT",
    incomeRange: "2m-3m",
    status: "nuevo",
    source: "demo",
    createdAt: new Date("2026-09-05T14:30:00.000Z"),
    updatedAt: new Date("2026-09-05T14:30:00.000Z"),
  },
];

const globalWithDemo = globalThis as typeof globalThis & {
  __demoLeads?: DemoLead[];
};

function getStore() {
  if (!globalWithDemo.__demoLeads) {
    globalWithDemo.__demoLeads = [...initialDemoLeads];
  }
  return globalWithDemo.__demoLeads;
}

export function isDemoMode() {
  return process.env.DEMO_MODE === "true";
}

export function createDemoLead(lead: LeadDocument) {
  const item: DemoLead = {
    ...lead,
    _id: `demo-lead-${Date.now()}`,
  };
  getStore().unshift(item);
  return item;
}

export function listDemoLeads(options?: { query?: string; status?: string; incomeRange?: string }) {
  const query = options?.query?.toLowerCase() ?? "";
  const status = options?.status ?? "";
  const incomeRange = options?.incomeRange ?? "";

  return getStore().filter((lead) => {
    const matchesQuery =
      !query ||
      [lead.fullName, lead.email, lead.planName].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = !status || lead.status === status;
    const matchesIncomeRange = !incomeRange || lead.incomeRange === incomeRange;
    return matchesQuery && matchesStatus && matchesIncomeRange;
  });
}

export function updateDemoLead(id: string, status: LeadStatus) {
  const lead = getStore().find((item) => item._id === id);
  if (!lead) return false;
  lead.status = status;
  lead.updatedAt = new Date();
  return true;
}

export function getDemoAdmin() {
  return {
    email: process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
  };
}
