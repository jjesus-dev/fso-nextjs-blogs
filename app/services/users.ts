import { db } from "../db";
import { users } from "../db/schema";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  return await db.query.users.findFirst({
    where: { username: username },
    with: { blogs: true },
  });
};

export const getUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    columns: { username: true },
    where: { username: username },
  });

  if (user?.username) return true;

  return false;
};

export const addUser = async (
  username: string,
  name: string,
  passwordHash: string,
) => {
  await db.insert(users).values({ username, name, passwordHash });
};
