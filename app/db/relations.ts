import { defineRelations } from "drizzle-orm";
import { blogs, users } from "./schema";

export const relations = defineRelations({ blogs, users }, (r) => ({
  blogs: {
    user: r.one.users({
      from: r.blogs.userId,
      to: r.users.id,
    }),
  },
  users: {
    blogs: r.many.blogs(),
  },
}));
