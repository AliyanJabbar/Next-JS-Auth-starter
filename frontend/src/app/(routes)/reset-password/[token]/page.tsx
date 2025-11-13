"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [pw1, setPw1] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (pw1 !== pw2) {
      setErr("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: pw1 }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Could not reset password.");
      }
      setOk(true);
      setTimeout(() => router.push("/signin?reset=1"), 900);
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Could not reset password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card className="rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Set a new password</CardTitle>
          <CardDescription>
            Choose a strong password you don’t use elsewhere.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ok ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Password updated. Redirecting to sign in…
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="pw1">New password</Label>
                <div className="relative">
                  <Input
                    id="pw1"
                    type={show1 ? "text" : "password"}
                    value={pw1}
                    onChange={(e) => setPw1(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                    onClick={() => setShow1((v) => !v)}
                  >
                    {show1 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  8+ chars with upper, lower, number, and symbol.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pw2">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="pw2"
                    type={show2 ? "text" : "password"}
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                    onClick={() => setShow2((v) => !v)}
                  >
                    {show2 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {err && <p className="text-sm text-red-600">{err}</p>}
              <Button
                className="w-full"
                type="submit"
                disabled={loading || !token}
              >
                {loading ? "Saving…" : "Update password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
