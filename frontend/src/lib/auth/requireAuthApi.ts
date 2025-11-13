// src/lib/auth/requireAuthApi.ts
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export class UnauthorizedError extends Error {
  status = 401 as const;
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Production-grade API authentication:
 * - Verifies Auth.js JWT directly from cookies/headers
 * - Returns the canonical userId (uid or sub)
 * - Throws UnauthorizedError if missing/invalid
 */
export async function requireAuthApi(req: NextRequest): Promise<string> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const userId = token?.uid ?? token?.sub ?? null;
  if (!userId) throw new UnauthorizedError();
  return String(userId);
}
