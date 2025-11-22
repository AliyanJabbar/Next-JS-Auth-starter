"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Loader2, TriangleAlert, Check, ArrowLeft } from "lucide-react";
import { updatePassword } from "@/actions/reset-password";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ResetPasswordCardProps {
  token?: string;
}

export function ResetPasswordCard({ token }: ResetPasswordCardProps) {
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) return setError("Invalid or missing token.");
    if (password !== confirm) return setError("Passwords do not match.");

    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);

      const res = await updatePassword(formData);

      if (res.error) setError(res.error);
      if (res.success) setSuccess(res.success);
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 text-center max-w-md">
          <CardTitle>Invalid Link</CardTitle>
          <p className="text-red-600 mt-4">Missing or invalid token.</p>
          <Link href="/forgot-password" className="mt-6 block font-bold text-primary">
            Request New Reset Link
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-2">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center space-y-1 pb-4">
            <CardTitle className="text-2xl lg:text-3xl font-bold">Reset Your Password</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Enter your new password to complete your reset.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {success && (
              <div className="p-3 bg-emerald-100 border border-emerald-200 rounded-md flex gap-x-2 items-center text-emerald-700">
                <Check className="w-4 h-4" />
                <p>{success}</p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-md flex gap-x-2 items-center text-red-700">
                <TriangleAlert className="w-4 h-4" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 sm:h-12 text-base"
                />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="h-10 sm:h-12 text-base"
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full h-10 sm:h-12 text-base text-white">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <div className="text-center mt-4">
                <Link href="/login" className="font-bold inline-flex items-center text-primary">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
