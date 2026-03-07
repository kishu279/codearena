import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

// import { getAuthUser } from "@/lib/mock-data";
import { prisma } from "./prisma";
import { getUser } from "./data";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.warn(
    "GitHub OAuth credentials are not set. GitHub login will be unavailable.",
  );
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn(
    "Google OAuth credentials are not set. Google login will be unavailable.",
  );
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
if (!NEXTAUTH_SECRET) {
  console.warn(
    "NEXTAUTH_SECRET is not set. Please set it to a secure random string in production.",
  );
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const identifier = String(credentials?.username ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!identifier || !password) return null;

        // const user = getAuthUser(identifier);
        const user = await getUser(credentials?.email, credentials?.username);
        if (!user) return null;
        const isValid = await bcrypt.compare(password, user.password!!);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username ?? user.name ?? user.email,
        };
      },
    }),

    GithubProvider({
      clientId: GITHUB_CLIENT_ID!!,
      clientSecret: GITHUB_CLIENT_SECRET!!,
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!!,
      clientSecret: GOOGLE_CLIENT_SECRET!!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.username = token.username ?? session.user.name ?? "";
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: NEXTAUTH_SECRET,
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
