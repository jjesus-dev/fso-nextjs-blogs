"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLikes } from "../services/blogs";
import { auth } from "../auth";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (!title || title.length < 5) {
    return { error: "Blog's title must be at least 5 characters long" };
  }

  if (!author || author.length < 5) {
    return { error: "Blog's author must be at least 5 characters long" };
  }

  if (!url || url.length < 5) {
    return { error: "Blog's url must be at least 5 characters long" };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeABlog = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await incrementLikes(Number(id));

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
