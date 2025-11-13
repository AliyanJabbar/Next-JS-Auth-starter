// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { assertSameOrigin } from "@/lib/security/csrf";
// import { rateKey, rateLimit } from "@/lib/security/rateLimiter";
// import { noStore } from "@/lib/security/cache";
// import { hashArgon2id } from "@/lib/security/secret-hash";
// import { verifyEmail } from "@/lib/email";
// import crypto from "crypto";

// const SignUpSchema = z.object({
//   firstName: z.string().trim().min(1, "First name is required").max(50),
//   lastName: z.string().trim().min(1, "Last name is required").max(50),
//   email: z.string().trim().toLowerCase().email("Enter a valid email"),
//   password: z.string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[a-z]/, "Must include a lowercase letter")
//     .regex(/[A-Z]/, "Must include an uppercase letter")
//     .regex(/[0-9]/, "Must include a number")
//     .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
//   planTier: z.enum(["FREE", "PRO"]).default("FREE"),
// });

// export async function POST(req: NextRequest) {
//   try {
//     assertSameOrigin(req);
//     const ip =
//       req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
//       req.headers.get("x-real-ip") ||
//       "0.0.0.0";
//     if (!rateLimit(rateKey("auth:signup", "nouser", ip), 10 * 60_000, 20)) {
//       return noStore(NextResponse.json({ ok: false, message: "Too many attempts" }, { status: 429 }));
//     }

//     const input = SignUpSchema.parse(await req.json());

//     const exists = await prisma.user.findFirst({
//       where: { email: { equals: input.email, mode: "insensitive" } },
//       select: { id: true },
//     });
//     if (exists) {
//       return noStore(
//         NextResponse.json(
//           { ok: false, message: "An account with that email already exists." },
//           { status: 400 }
//         )
//       );
//     }

//     const hash = await hashArgon2id(input.password);

//     await prisma.user.create({
//       data: {
//         email: input.email,
//         firstName: input.firstName,
//         lastName: input.lastName,
//         passwordHash: hash,
//         emailVerified: null,
//         planTier: input.planTier as any,
//         signupMethod: "EMAIL_PASSWORD",
//       },
//     });

//     // Create a new token
//     const token = crypto.randomBytes(32).toString("hex");
//     const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

//     await prisma.verificationToken.create({
//       data: {
//         identifier: input.email,
//         token,
//         expires,
//       },
//     });

//     await verifyEmail(input.email, token);

//     // After account creation, require login and take user to subscription selection
//     return noStore(NextResponse.json({ ok: true, redirect: "/signin?created=1&callbackUrl=%2Fsubscription" }, { status: 201 }));
//   } catch (err: any) {
//     if (err instanceof z.ZodError) {
//       const message = err.errors.map((e) => e.message).join(" · ") || "Invalid input.";
//       return noStore(NextResponse.json({ ok: false, message }, { status: 400 }));
//     }
//     if (err?.code === "P2002") {
//       return noStore(
//         NextResponse.json(
//           { ok: false, message: "An account with that email already exists." },
//           { status: 400 }
//         )
//       );
//     }
//     console.error("signup:error", err);
//     return noStore(
//       NextResponse.json({ ok: false, message: "Unexpected error. Please try again." }, { status: 500 })
//     );
//   }
// }


export async function POST() {
  return new Response("Disabled", { status: 404 });
}