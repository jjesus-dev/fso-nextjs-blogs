import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { readingList } from "../db/schema";
import { getCurrentUser } from "./session";

export const getReadingList = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: { userId: userId },
  });
};

export const getReadingListWithBlog = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: { userId: userId },
    with: { blog: { columns: { title: true, author: true, url: true } } },
  });
};

export const readBlog = async (blogId: number) => {
  console.log("blogId", blogId);

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const blogInList = await db.query.readingList.findFirst({
    where: { userId: user.id, blogId: blogId },
  });

  if (blogInList) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(
        and(
          eq(readingList.blogId, blogInList.blogId),
          eq(readingList.userId, blogInList.userId),
        ),
      );
  }
};
