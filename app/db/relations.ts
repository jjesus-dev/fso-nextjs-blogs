import { defineRelations } from "drizzle-orm";
import { blogs, readingList, users } from "./schema";

export const relations = defineRelations(
  { blogs, users, readingList },
  (r) => ({
    blogs: {
      user: r.one.users({
        from: r.blogs.userId,
        to: r.users.id,
      }),
    },
    users: {
      blogs: r.many.blogs(),
    },
    readingList: {
      user: r.one.users({
        from: r.readingList.userId,
        to: r.users.id,
      }),
      blog: r.one.blogs({
        from: r.readingList.blogId,
        to: r.blogs.id,
      }),
    },
  }),
);
