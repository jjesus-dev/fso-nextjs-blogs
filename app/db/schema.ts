import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const blogsTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 100 }).notNull(),
  url: varchar({ length: 500 }).notNull().unique(),
  likes: integer().notNull().default(0),
});
