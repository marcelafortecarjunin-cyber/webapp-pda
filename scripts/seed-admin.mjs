import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB = "chevrolet_leads", ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (process.env.DEMO_MODE === "true") {
  console.log("DEMO_MODE=true: no hace falta ejecutar el seed de MongoDB.");
  process.exit(0);
}

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("Faltan MONGODB_URI, ADMIN_EMAIL o ADMIN_PASSWORD en .env");
}

if (ADMIN_PASSWORD.length < 12) {
  throw new Error("ADMIN_PASSWORD debe tener al menos 12 caracteres.");
}

const client = new MongoClient(MONGODB_URI, { appName: "plan-ahorro-chevrolet-seed" });

try {
  await client.connect();
  const collection = client.db(MONGODB_DB).collection("admins");
  await collection.createIndex({ email: 1 }, { unique: true });
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await collection.updateOne(
    { email: ADMIN_EMAIL.trim().toLowerCase() },
    {
      $set: { email: ADMIN_EMAIL.trim().toLowerCase(), passwordHash, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
  console.log(`Admin listo: ${ADMIN_EMAIL.trim().toLowerCase()}`);
} finally {
  await client.close();
}
