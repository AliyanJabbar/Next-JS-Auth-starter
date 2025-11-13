"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setSent(true); // hide enumeration
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 fixed left-0 top-0 h-screen overflow-hidden z-10 bg-[url('/signin.png')] bg-cover">
        <div className="flex flex-col items-center justify-end flex-1">
          <div className="text-center space-y-6 text-ourBrown">
            <h1 className="text-4xl font-bold">Forgot your password?</h1>
            <p className="text-lg max-w-md mx-auto">
              Don’t worry — we’ll help you regain access to your account safely.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen bg-ourLightGray">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            <Card className="border-0 text-ourBlack shadow-md bg-ourBrown/50 p-6 rounded-lg">
              <CardHeader className="text-center space-y-1 pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                  Reset your password
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-white/80">
                  We’ll email you a secure link to create a new password.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {sent ? (
                  <div className="rounded-md border border-ourBrown/50 bg-white/90 px-4 py-3 text-sm text-ourBrown text-center">
                    If an account exists for <strong>{email}</strong>, a reset link has been sent.
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 placeholder:text-ourBrown"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-white text-ourBrown hover:bg-ourBrown hover:text-white transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Sending…" : "Send reset link"}
                    </Button>
                  </form>
                )}

                <div className="mt-4 text-center text-sm text-white">
                  <Link href="/signin" className="underline underline-offset-4 hover:text-ourBrown transition-colors">
                    Back to sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
