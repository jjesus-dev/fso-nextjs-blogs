import { eq } from "drizzle-orm";
import { db } from "../db";
import { blogs, readingList } from "../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: { id: id } });
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  await db.insert(blogs).values({ title, author, url, userId: user?.id });
};

export const addBlogWithReadingList = async (
  title: string,
  author: string,
  url: string,
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const blogId = await db
    .insert(blogs)
    .values({ title, author, url, userId: user?.id })
    .returning({ insertedId: blogs.id });

  if (blogId.length > 0) {
    await db
      .insert(readingList)
      .values({ userId: user?.id, blogId: blogId[0].insertedId });
  } else {
    throw new Error("Missing id (blog)");
  }
};

export const incrementLikes = async (id: number) => {
  const blog = await getBlogById(id);

  if (blog) {
    const blogLikes = blog.likes + 1;
    await db.update(blogs).set({ likes: blogLikes }).where(eq(blogs.id, id));
  }
};

export const addToReadingList = async (blogId: number) => {
  const blog = await getBlogById(blogId);

  // Check if user exists
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  if (blog && user.id >= 0) {
    return await db
      .insert(readingList)
      .values({ blogId, userId: user.id })
      .returning({ insertedId: readingList.id });
  }

  return [{ insertedId: -1 }];
};

export const checkReadingList = async (blogId: number) => {
  // Check if user exists
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  if (user.id >= 0) {
    const readingList = await db.query.readingList.findFirst({
      where: { blogId: blogId, userId: user.id },
    });

    if (readingList?.userId) {
      return true;
    }
  }

  return false;
};
