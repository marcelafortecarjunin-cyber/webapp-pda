import { MongoClient, type Db } from "mongodb";
import type { IncomeRange } from "@/lib/income-ranges";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "chevrolet_leads";

type MongoCache = {
  client: MongoClient;
  db: Db;
};

const globalWithMongo = globalThis as typeof globalThis & {
  __mongoCache?: Promise<MongoCache>;
};

export async function getDatabase() {
  if (!uri) {
    throw new Error("Configurá MONGODB_URI en el archivo .env.");
  }

  if (!globalWithMongo.__mongoCache) {
    const client = new MongoClient(uri, {
      appName: "plan-ahorro-chevrolet",
      maxPoolSize: 10,
    });
    globalWithMongo.__mongoCache = client
      .connect()
      .then((connectedClient) => ({
        client: connectedClient,
        db: connectedClient.db(dbName),
      }));
  }

  return (await globalWithMongo.__mongoCache).db;
}

export type LeadStatus = "nuevo" | "contactado" | "cerrado";

export type LeadDocument = {
  fullName: string;
  email: string;
  planSlug: string;
  planName: string;
  incomeRange?: IncomeRange;
  status: LeadStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  userAgent?: string;
};
