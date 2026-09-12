import { auth } from "../auth";
import { db } from "../db";

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return await db.query.users.findFirst({
    where: { username: session?.user?.email },
  });
};
