"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addBlogWithReadingList,
  addToReadingList,
  incrementLikes,
} from "../services/blogs";
import { auth } from "../auth";
import { InitialStateType } from "../types";

export const createBlog = async (
  prevState: InitialStateType,
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors = {
    errorTitle: "",
    errorAuthor: "",
    errorUrl: "",
    success: false,
  };

  if (!title || title.length < 5) {
    errors.errorTitle = "Blog's title must be at least 5 characters long";
  }

  if (!author || author.length < 5) {
    errors.errorAuthor = "Blog's author must be at least 5 characters long";
  }

  if (!url || url.length < 5) {
    errors.errorUrl = "Blog's url must be at least 5 characters long";
  }

  if (
    errors.errorTitle !== "" ||
    errors.errorAuthor !== "" ||
    errors.errorUrl !== ""
  ) {
    return { errors, values: { title, author, url, success: false } };
  }

  await addBlogWithReadingList(title, author, url);

  revalidatePath("/blogs");
  return { errors, values: { title, author, url, success: true } };
};

export const updateBlogStatus = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const buttonPressed = formData.get("blogAction") as string;

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  let listResult = [{ insertedId: -1 }];

  switch (buttonPressed) {
    case "like":
      await incrementLikes(Number(id));
      break;
    case "list":
      listResult = await addToReadingList(Number(id));
      break;
    default:
      console.log("Unknown action");
  }

  if (listResult.length < 1 || listResult[0]?.insertedId === -1) {
    console.log("Couldn't add to the reading list.");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
