"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema
const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<{ email: string }>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = form.handleSubmit(async ({ email }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError("Could not send reset email. Please try again.");
      } else {
        setSuccess(
          "If this email is registered, you will receive a password reset link shortly."
        );
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Logo Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary/10 via-primary/5 to-background flex-col justify-between p-12 fixed left-0 top-0 h-screen overflow-hidden z-10">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center space-y-8">
            <Image
              src="/Heartify.png"
              alt="Heartify Logo"
              width={200}
              height={100}
              className="mx-auto"
            />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Reset Your Password
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Enter your email and we’ll send you a reset password link.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen lg:min-h-0">
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-4">
          {/* Breadcrumb back to signin */}
          <div className="absolute top-7 left-5 sm:top-10 sm:left-20 text-sm sm:text-base text-muted-foreground flex items-center gap-2 mb-4">
            <Link
              href="/signin"
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-primary/80">←</span> Back to Sign In
            </Link>
          </div>
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <Image
                src="/Heartify.png"
                alt="Heartify Logo"
                width={200}
                height={100}
                className="mx-auto"
              />
            </div>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-center space-y-0 pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Forgot Password
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Enter your email to receive a password reset link
                </CardDescription>

                {success && (
                  <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base sm:text-lg">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="h-10 sm:h-12 text-base sm:text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-10 sm:h-12 text-base sm:text-lg"
                      disabled={loading}
                    >
                      {loading ? "Sending…" : "Send Reset Link"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
