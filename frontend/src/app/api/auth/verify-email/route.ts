// import { NextRequest, NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";


// export async function POST(req: NextRequest) {
//   const { token } = await req.json();

//   if (!token) {
//     return NextResponse.json({ error: 'Token is required' }, { status: 400 });
//   }

//   try {
//     // Find the verification token
//     const verification = await prisma.verificationToken.findUnique({
//       where: { token },
//     });

//     if (!verification || verification.expires < new Date()) {
//       return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
//     }

//     // Check if user is already verified
//     const user = await prisma.user.findFirst({
//       where: { email: verification.identifier },
//       select: { emailVerified: true }
//     });

//     if (user?.emailVerified) {
//       // User is already verified, just delete the token and return success
//       await prisma.verificationToken.deleteMany({
//         where: { token },
//       });
//       return NextResponse.json({ success: true, message: 'Email already verified' });
//     }

//     // Update the user's emailVerified field
//     await prisma.user.updateMany({
//       where: { email: verification.identifier },
//       data: { emailVerified: new Date() },
//     });

//     // Delete the verification token (use deleteMany to avoid error if already deleted)
//     await prisma.verificationToken.deleteMany({
//       where: { token },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     const errMsg = error.message || 'An error occurred while verifying the email address. Please try again.'
//     return NextResponse.json({ error: errMsg }, { status: 500 });
//   }
// }



export async function POST() {
  return new Response("Disabled", { status: 404 });
}