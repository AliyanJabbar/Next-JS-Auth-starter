import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const ABSOLUTE_SESSION_SECONDS = 7 * 24 * 60 * 60; // 7 days
// const SHORT_SESSION_SECONDS = 24 * 60 * 60; // 1 day
const SLIDING_REFRESH_SECONDS = 10 * 60; // 10 minutes

// Extend JWT type with custom uid
interface CustomJWT extends JWT {
  uid?: string;
}

// Extend Session type with id in user
interface CustomSession extends Session {
  user?: Session["user"] & { id?: string };
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
    maxAge: ABSOLUTE_SESSION_SECONDS,
    updateAge: SLIDING_REFRESH_SECONDS,
  },
  jwt: {
    maxAge: ABSOLUTE_SESSION_SECONDS,
  },

  pages: { signIn: "/signin" },

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: { params: { prompt: "select_account" } },
    }),

    // Basic Credentials Provider (no DB)
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email || "").trim().toLowerCase();
        const password = credentials?.password || "";

        if (!email || !password) return null;

        // Accept static demo user
        if (email === "demo@example.com" && password === "demo") {
          return {
            id: "1",
            email: "demo@example.com",
            name: "Demo User",
          } as NextAuthUser;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: CustomJWT; user?: NextAuthUser }) {
      if (user?.id) token.uid = String(user.id);
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      if (session.user && token?.uid) {
        session.user.id = String(token.uid);
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Helper
export function requireOwnerId(req: NextRequest): string {
  const ownerId = req.headers.get("x-owner-id");
  if (!ownerId) throw new Error("Unauthorized");
  return ownerId;
}
