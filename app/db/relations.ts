import { defineRelations } from "drizzle-orm";
import { blogs, users } from "./schema";

export const relations = defineRelations({ blogs, users });
