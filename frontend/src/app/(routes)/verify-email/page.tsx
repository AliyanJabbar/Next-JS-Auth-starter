// "use client";

// import * as React from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";


// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");

//   const [status, setStatus] = React.useState<
//     "idle" | "verifying" | "success" | "error" | "invalid"
//   >(token ? "verifying" : "idle");

//   const [email, setEmail] = React.useState("");
//   const [resendStatus, setResendStatus] = React.useState<
//     "idle" | "sending" | "sent" | "failed"
//   >("idle");

//   // Load unverified email from localStorage on mount
//   React.useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedEmail = localStorage.getItem("unverifiedEmail");
//       if (storedEmail) {
//         setEmail(storedEmail);
//       }
//     }
//   }, []);

//   // Verify token if present
//   React.useEffect(() => {
//     async function verify() {
//       if (!token) return;

//       try {
//         const res = await fetch("/api/auth/verify-email", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });

//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         if (data.success) {
//           setStatus("success");

//           // ✅ Clear stored unverified email once verified
//           localStorage.removeItem("unverifiedEmail");

//           setTimeout(() => router.push("/signin"), 2500);
//         } else {
//           setStatus("error");
//         }
//       } catch {
//         setStatus("error");
//       }
//     }

//     verify();
//   }, [token, router]);

//   // Resend verification email
//   async function resendVerification() {
//     if (!email) return;
//     setResendStatus("sending");
//     try {
//       const res = await fetch("/api/auth/resend-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setResendStatus("sent");
//       } else {
//         setResendStatus("failed");
//       }
//     } catch {
//       setResendStatus("failed");
//     }
//   }

//   return (
//     <div className="mx-auto max-w-md">
//       <Card className="rounded-2xl mt-20">
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Verify Email</CardTitle>
//           <CardDescription>
//             {token
//               ? status === "verifying"
//                 ? "Verifying your email address..."
//                 : status === "success"
//                 ? "Your email has been verified successfully!"
//                 : status === "error"
//                 ? "Verification failed. The link may have expired."
//                 : "Invalid verification link."
//               : "We’ve sent a verification link to your email address."}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="text-center space-y-6">
//           {/* === No token in URL === */}
//           {!token && (
//             <div className="flex flex-col items-center space-y-4">
//               <Mail className="h-8 w-8 text-sky-600" />
//               <p className="text-sm text-gray-600">
//                 Please check your inbox and click the link to verify your email.
//               </p>

//               <div className="w-full flex flex-col items-center space-y-2">
               
//                 <Button
//                   onClick={resendVerification}
//                   disabled={resendStatus === "sending" || !email}
//                 >
//                   {resendStatus === "sending" ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       Sending...
//                     </>
//                   ) : resendStatus === "sent" ? (
//                     "Email Sent!"
//                   ) : resendStatus === "failed" ? (
//                     "Try Again"
//                   ) : (
//                     "Resend Verification Email"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* === When token exists === */}
//           {token && status === "verifying" && (
//             <div className="flex flex-col items-center space-y-4">
//               <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
//               <p className="text-sm text-gray-500">Please wait…</p>
//             </div>
//           )}

//           {token && status === "success" && (
//             <div className="flex flex-col items-center space-y-4 text-green-600">
//               <CheckCircle2 className="h-8 w-8" />
//               <p className="font-medium">Email verified successfully!</p>
//               <p className="text-sm text-gray-500">Redirecting to login...</p>
//             </div>
//           )}

//           {token && (status === "error" || status === "invalid") && (
//             <div className="flex flex-col items-center space-y-4 text-red-600">
//               <XCircle className="h-8 w-8" />
//               <p className="font-medium">
//                 {status === "error"
//                   ? "Verification link is invalid or expired."
//                   : "Missing verification token."}
//               </p>

//               <Button variant="outline" onClick={() => router.push("/signin")}>
//                 Go to Sign In
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function VerifyEmailPage() {


  return (
<div>
</div>
  );
}
