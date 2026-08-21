import { drizzle } from "drizzle-orm/neon-http";

// Since v1 RC we don't need to provide the schema
export const db = drizzle(process.env.DATABASE_URL!)
