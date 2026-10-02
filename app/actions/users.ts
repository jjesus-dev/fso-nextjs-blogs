"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { UserInitialStateType } from "../types";
import {
  addUser,
  getUsername,
  getUserToken,
  updateUserToken,
} from "../services/users";

export const registerUser = async (
  prevState: UserInitialStateType,
  formData: FormData,
) => {
  let nameError = null;
  let usernameError = null;
  let passwordError = null;
  let passwordConfirmError = null;

  const name = (formData.get("name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  if (!name || name.length < 4) {
    nameError = "Name must be at least 4 characters long.";
  }

  if (!username || username.length < 4) {
    usernameError = "Username must be at least 4 characters long.";
  }

  if (!password || password.length < 4) {
    passwordError = "Password must be at least 4 characters long.";
  }

  if (!passwordConfirm || passwordConfirm !== password) {
    passwordConfirmError = "Passwords don't match.";
  }

  const userExists = await getUsername(username);

  if (userExists) {
    usernameError = "Username already exists.";
  }

  if (
    nameError !== null ||
    usernameError !== null ||
    passwordError !== null ||
    passwordConfirmError !== null
  ) {
    return {
      errors: {
        name: nameError,
        username: usernameError,
        password: passwordError,
        passwordConfirm: passwordConfirmError,
      },
      values: { name, username, password, passwordConfirm },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await addUser(username, name, passwordHash);

  redirect("/login");
};

export const getToken = async (username: string) => {
  return await getUserToken(username);
};

export const generateUserToken = async (formData: FormData) => {
  const username = (formData.get("username") as string)?.trim();
  //const oldToken = formData.get("token") as string;

  const userExists = await getUsername(username);

  if (userExists) {
    const token = crypto.randomUUID();
    await updateUserToken(username, token);

    revalidatePath("/me");
    redirect("/me");
  }
};
