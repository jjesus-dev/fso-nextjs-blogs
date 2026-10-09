import { db } from "../db";

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
