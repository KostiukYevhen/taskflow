import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, token }) {
  //     if (token.name) {
  //       console.log("session", session);

  //       session.user.name = token.name;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     console.log("user", user);

  //     if (user) {
  //       token.name = user.name;
  //     }
  //     return token;
  //   },
  // },
  pages: {
    signIn: "/login",
  },
});
