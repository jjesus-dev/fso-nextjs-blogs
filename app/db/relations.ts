import { defineRelations } from "drizzle-orm";
import { blogs } from "./schema";

export const relations = defineRelations({ blogs });
