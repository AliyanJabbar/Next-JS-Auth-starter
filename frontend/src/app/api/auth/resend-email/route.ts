// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import crypto from "crypto";
// import { verifyEmail } from "@/lib/email"; // same helper you already use
// import { noStore } from "@/lib/security/cache";
// import { rateKey, rateLimit } from "@/lib/security/rateLimiter";
// import { assertSameOrigin } from "@/lib/security/csrf";

// const ResendSchema = z.object({
//   email: z.string().trim().toLowerCase().email("Enter a valid email"),
// });

// export async function POST(req: NextRequest) {
//   try {
//     assertSameOrigin(req);
//     const ip =
//       req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
//       req.headers.get("x-real-ip") ||
//       "0.0.0.0";

//     // Rate limit: 3 resend attempts every 10 minutes per IP
//     if (!rateLimit(rateKey("auth:resend", "nouser", ip), 10 * 60_000, 3)) {
//       return noStore(
//         NextResponse.json(
//           { ok: false, message: "Too many resend attempts. Please wait and try again." },
//           { status: 429 }
//         )
//       );
//     }

//     const { email } = ResendSchema.parse(await req.json());

//     // Check if user exists and not yet verified
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { id: true, emailVerified: true },
//     });

//     if (!user) {
//       // To prevent account enumeration, always return ok
//       return noStore(NextResponse.json({ ok: true }));
//     }

//     if (user.emailVerified) {
//       return noStore(
//         NextResponse.json(
//           { ok: false, message: "Email is already verified." },
//           { status: 400 }
//         )
//       );
//     }

//     // Delete any previous tokens for this email
//     await prisma.verificationToken.deleteMany({
//       where: { identifier: email },
//     });

//     // Create a new token
//     const token = crypto.randomBytes(32).toString("hex");
//     const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

//     await prisma.verificationToken.create({
//       data: {
//         identifier: email,
//         token,
//         expires,
//       },
//     });

//     // Send verification email
   
//     await verifyEmail(email, token);

//     return noStore(
//       NextResponse.json({
//         ok: true,
//         message: "Verification email resent successfully.",
//       })
//     );
//   } catch (err: any) {
//     if (err instanceof z.ZodError) {
//       const message =
//         err.errors.map((e) => e.message).join(" · ") || "Invalid input.";
//       return noStore(NextResponse.json({ ok: false, message }, { status: 400 }));
//     }

//     console.error("resend-verification:error", err);
//     return noStore(
//       NextResponse.json(
//         { ok: false, message: "Unexpected error. Please try again later." },
//         { status: 500 }
//       )
//     );
//   }
// }


export async function POST() {
  return new Response("Disabled", { status: 404 });
}