import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { loginSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username:", type: "text" },
        password: { label: "Password:", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // Validate fields with Zod
        const { username, password } =
          await loginSchema.parseAsync(credentials);

        if (!username || !password) {
          return null;
        }

        user = await db.query.users.findFirst({
          where: { username: username },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(
          password as string,
          user.passwordHash,
        );

        if (!isValid) {
          return null;
        }

        return { id: String(user.id), name: user.name, email: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
