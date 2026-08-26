import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 100 }).notNull(),
  url: varchar({ length: 500 }).notNull().unique(),
  likes: integer().notNull().default(0),
  userId: integer("user_id").notNull().references(() => users.id),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 60 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
});
