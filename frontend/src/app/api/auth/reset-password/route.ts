// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { hashToken } from "@/lib/tokens";
// import { assertSameOrigin } from "@/lib/security/csrf";
// import { rateKey, rateLimit } from "@/lib/security/rateLimiter";
// import { noStore } from "@/lib/security/cache";
// import { hashArgon2id } from "@/lib/security/secret-hash";

// const Body = z.object({
//   token: z.string().min(20),
//   password: z.string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[a-z]/, "Must include a lowercase letter")
//     .regex(/[A-Z]/, "Must include an uppercase letter")
//     .regex(/[0-9]/, "Must include a number")
//     .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
// });

// export async function POST(req: NextRequest) {
//   try {
//     assertSameOrigin(req);
//     const ip =
//       req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
//       req.headers.get("x-real-ip") ||
//       "0.0.0.0";
//     if (!rateLimit(rateKey("auth:reset", "nouser", ip), 10 * 60_000, 30)) {
//       return noStore(NextResponse.json({ ok: false, message: "Unable to reset password." }, { status: 400 }));
//     }

//     const { token, password } = Body.parse(await req.json());
//     const tokenHash = hashToken(token);

//     const record = await prisma.passwordResetToken.findUnique({
//       where: { tokenHash },
//       include: { user: { select: { id: true } } },
//     });

//     if (!record || record.usedAt || record.expiresAt < new Date()) {
//       return noStore(NextResponse.json({ ok: false, message: "This link is invalid or expired." }, { status: 400 }));
//     }

//     const newHash = await hashArgon2id(password);

//     await prisma.$transaction([
//       prisma.user.update({ where: { id: record.userId }, data: { passwordHash: newHash } }),
//       prisma.passwordResetToken.update({ where: { tokenHash }, data: { usedAt: new Date() } }),
//       prisma.passwordResetToken.deleteMany({ where: { userId: record.userId, NOT: { tokenHash } } }),
//       // prisma.session.deleteMany({ where: { userId: record.userId } }), // if using DB sessions
//     ]);

//     return noStore(NextResponse.json({ ok: true }));
//   } catch (err: any) {
//     const message = err?.issues?.[0]?.message ?? "Unable to reset password.";
//     return noStore(NextResponse.json({ ok: false, message }, { status: 400 }));
//   }
// }



export async function POST() {
  return new Response("Disabled", { status: 404 });
}