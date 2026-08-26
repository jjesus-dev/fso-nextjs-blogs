import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { blogs } from "../db/schema";

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: { id: id } });
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await db.query.users.findFirst({ orderBy: () => sql`RANDOM()` });
  await db.insert(blogs).values({ title, author, url, userId: user?.id });
};

export const incrementLikes = async (id: number) => {
  const blog = await getBlogById(id);

  if (blog) {
    const blogLikes = blog.likes + 1;
    await db.update(blogs).set({ likes: blogLikes }).where(eq(blogs.id, id));
  }
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  return await db.query.users.findFirst({
    where: { username: username },
    with: { blogs: true },
  });
};
