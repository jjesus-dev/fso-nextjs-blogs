"use server";

import { getReadingListWithBlog } from "../services/readingLists";
import { getUserId } from "../services/users";

export const getReadingListByUser = async (username: string) => {
  const userId = await getUserId(username);

  const readingList = await getReadingListWithBlog(userId);
  return readingList;
};
