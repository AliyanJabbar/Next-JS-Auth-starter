// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import prisma from "@/lib/prisma";
// import { generateToken, hashToken, minutesFromNow } from "@/lib/tokens";
// import { sendPasswordResetEmail } from "@/lib/email";
// import { assertSameOrigin } from "@/lib/security/csrf";
// import { rateKey, rateLimit } from "@/lib/security/rateLimiter";
// import { noStore } from "@/lib/security/cache";

// const Body = z.object({ email: z.string().email() });

// function baseUrl(req: NextRequest) {
//   return (
//     process.env.NEXTAUTH_URL ||
//     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${req.nextUrl.protocol}//${req.nextUrl.host}`)
//   );
// }

// export async function POST(req: NextRequest) {
//   const generic = noStore(NextResponse.json({ ok: true })); // avoid user enumeration

//   try {
//     assertSameOrigin(req);
//     const ip =
//       req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
//       req.headers.get("x-real-ip") ||
//       "0.0.0.0";
//     if (!rateLimit(rateKey("auth:forgot", "nouser", ip), 10 * 60_000, 20)) {
//       return generic;
//     }

//     const { email } = Body.parse(await req.json());

//     const user = await prisma.user.findFirst({
//       where: { email: { equals: email, mode: "insensitive" } },
//       select: { id: true, email: true },
//     });
//     if (!user) return generic;

//     await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

//     const token = generateToken();
//     const tokenHash = hashToken(token);
//     const ttl = Number(process.env.RESET_TOKEN_TTL_MINUTES || 30);
//     const expiresAt = minutesFromNow(ttl);

//     await prisma.passwordResetToken.create({
//       data: { userId: user.id, tokenHash, expiresAt },
//     });

//     const url = `${baseUrl(req)}/reset-password/${token}`;
//     await sendPasswordResetEmail(user.email!, url);

//     return generic;
//   } catch {
//     return generic;
//   }
// }


export async function POST() {
  return new Response("Disabled", { status: 404 });
}