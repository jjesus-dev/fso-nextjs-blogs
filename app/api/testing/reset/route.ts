import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { sql } from "drizzle-orm";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  // Based on PostgreSQL docs -> https://www.postgresql.org/docs/current/sql-truncate.html
  await db.execute(sql`TRUNCATE blogs, users RESTART IDENTITY CASCADE;`);

  revalidatePath("/api/testing/reset");
  return new Response(null, { status: 204 });
};
