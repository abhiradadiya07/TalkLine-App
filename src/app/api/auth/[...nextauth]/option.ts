import prisma from "@/db/db.config";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  username?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      user: User;
      token: JWT;
      session: CustomSession;
    }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token.user as CustomUser;
      console.log(session.user,"###########");
      console.log("session",session);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        });

        if (user) {
          console.log(user,"******************");
          return { ...user, id: user.id.toString() };
        } else {
          return null;
        }
      },
    }),
  ],
};
