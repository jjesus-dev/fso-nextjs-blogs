import { eq } from "drizzle-orm";
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

export const checkIfUserExists = async (username: string) => {
  const user = await db.query.users.findFirst({
    columns: { username: true },
    where: { username: username },
  });

  if (user?.username) return true;

  return false;
};

export const getUserWithToken = async (username: string) => {
  const user = await db.query.users.findFirst({
    columns: { username: true, token: true },
    where: { username: username },
  });

  if (user) return user;

  return { username: "", token: "" };
};

export const getUserFromToken = async (token: string) => {
  return await db.query.users.findFirst({
    where: { token: token },
    with: { blogs: true },
  });
};

export const addUser = async (
  username: string,
  name: string,
  passwordHash: string,
) => {
  await db.insert(users).values({ username, name, passwordHash });
};

export const updateUserToken = async (username: string, token: string) => {
  const updatedUser = await db
    .update(users)
    .set({ token: token })
    .where(eq(users.username, username))
    .returning({ id: users.id, updatedToken: users.token });

  return updatedUser;
};
