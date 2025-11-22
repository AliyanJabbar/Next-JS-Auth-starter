"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Loader2, ArrowLeft, MailCheck, TriangleAlert } from "lucide-react";
import { resetPassword } from "@/actions/forgot-password";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const ForgotPasswordCard = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsPending(true);

    const formData = new FormData();
    formData.append("email", email);

    try {
      const data = await resetPassword(formData);
      if (data?.error) {
        setError(data.error);
      } else if (data?.success) {
        setSuccess(data.success);
        // Optional: Clear email on success
        // setEmail("");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding (Matches SignIn) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 flex-col justify-between p-12 fixed left-0 top-0 h-screen overflow-hidden z-10">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center space-y-8">
            <Link
              href="https://aliyan-jabbar-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto my-10"
              />
            </Link>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                AJ Auth Starter
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Don&apos;t worry, we&apos;ll help you get back into your
                account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen lg:min-h-0">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-2">
            {/* Mobile Logo */}
            <Link
              href="https://aliyan-jabbar-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden block"
            >
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto my-10"
              />
            </Link>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-center space-y-0 pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Forgot Password?
                </CardTitle>
                <CardDescription className="text-base sm:text-lg mt-2">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Success Message */}
                {success && (
                  <div className="p-3 bg-emerald-100 border border-emerald-200 rounded-md flex items-center gap-x-2 text-sm text-emerald-700">
                    <MailCheck className="w-4 h-4" />
                    <p>{success}</p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-100 border border-red-200 rounded-md flex items-center gap-x-2 text-sm text-red-700">
                    <TriangleAlert className="w-4 h-4" />
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base sm:text-lg">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-10 sm:h-12 text-base sm:text-lg"
                      disabled={isPending}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 text-base sm:text-lg text-white"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        Sending email...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <div className="text-center text-sm sm:text-base mt-4">
                    <Link
                      href="/login"
                      className="font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
