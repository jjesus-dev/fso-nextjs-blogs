"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { getReadingListWithBlog, readBlog } from "../services/readingLists";
import { getUserId } from "../services/users";

export const getReadingListByUser = async (username: string) => {
  const userId = await getUserId(username);

  const readingList = await getReadingListWithBlog(userId);
  return readingList;
};

export async function markAsRead(formData: FormData) {
  const buttonPressed = formData.get("readBlog") as string;
  const blogId = buttonPressed.substring(3, buttonPressed.length);

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  await readBlog(Number(blogId));
  revalidatePath("/me");
  redirect("/me");
}
