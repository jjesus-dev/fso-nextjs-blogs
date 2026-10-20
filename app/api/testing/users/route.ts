import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addUser, getUsername } from "@/app/services/users";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  let usernameError = null;
  let nameError = null;
  let passwordError = null;

  const body = await req.json();
  const { username, name, password } = await body;

  if (!username || username.length < 4) {
    usernameError = "Username must be at least 4 characters long.";
  }

  if (!name || name.length < 4) {
    nameError = "Name must be at least 4 characters long.";
  }

  if (!password || password.length < 4) {
    passwordError = "Password must be at least 4 characters long.";
  }

  const userExists = await getUsername(username);

  if (userExists) {
    return NextResponse.json(
      {
        errors: {
          username: "Username already exists.",
        },
      },
      { status: 400 },
    );
  }

  if (nameError !== null || usernameError !== null || passwordError !== null) {
    return NextResponse.json(
      {
        errors: {
          username: usernameError,
          name: nameError,
          password: passwordError,
        },
      },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await addUser(username, name, passwordHash);
  revalidatePath("/api/testing/users");
  return NextResponse.json({ success: true }, { status: 201 });
};
