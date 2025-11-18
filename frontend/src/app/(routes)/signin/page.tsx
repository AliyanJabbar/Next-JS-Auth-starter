"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ClientSignInSchema } from "../../../../schema/schema_auth";
import Link from "next/link";
import Image from "next/image";
// import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CustomUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  hasSeenQuickStart?: boolean;
};


export default function SignInPage() {
  // const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before showing theme-dependent content
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const form = useForm<{ email: string; password: string; remember?: boolean }>(
    {
      resolver: zodResolver(ClientSignInSchema),
      defaultValues: { email: "", password: "", remember: false },
      mode: "onSubmit",
      reValidateMode: "onChange",
    }
  );
  const email = form.watch("email");
  const password = form.watch("password");
  const [showPw, setShowPw] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const params = useSearchParams();
  const created = params.get("created") === "1";
  const callbackUrl = params.get("callbackUrl") || "/";
  const errorParam = params.get("error");

  // Handle OAuth callback errors
  React.useEffect(() => {
    if (errorParam) {
      let errorMessage = "Authentication failed. Please try again.";

      // Map common OAuth errors to user-friendly messages
      switch (errorParam) {
        case "OAuthCallback":
          errorMessage =
            "Google sign-in was cancelled or failed. Please try again.";
          break;
        case "OAuthSignin":
          errorMessage = "Google sign-in failed. Please try again.";
          break;
        case "OAuthCreateAccount":
          errorMessage =
            "Could not create account with Google. Please try again.";
          break;
        case "Callback":
          errorMessage = "Authentication callback failed. Please try again.";
          break;
        case "Default":
          errorMessage = "Authentication failed. Please try again.";
          break;
        default:
          errorMessage = `Authentication error: ${errorParam}. Please try again.`;
      }

      setError(errorMessage);

      // Clear the error parameter from URL to prevent it from showing again on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      url.searchParams.delete("callbackUrl");
      window.history.replaceState({}, "", url.toString());
    }
  }, [errorParam]);

  const handleCredentials = form.handleSubmit(async (values) => {
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        remember: values.remember,
      });
      if (!res) {
        setError("Unexpected error. Please try again.");
        return;
      }
      if (res.error) {
        setError(
          res.error === "CredentialsSignin"
            ? "Invalid email or password."
            : res.error
        );
        return;
      }
      const session = await getSession();
      const hasSeenQuickStart = (session?.user as CustomUser).hasSeenQuickStart;
      if (!hasSeenQuickStart) {
        // setTheme("light")
      }
      // Hard navigate so SSR immediately applies user theme & session
      window.location.assign(callbackUrl);
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  });

  async function handleGoogle() {
    if (googleLoading) return;
    setError(null);
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl, redirect: true });
    } catch {
      setGoogleLoading(false);
    }
  }

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Logo and Terms (Fixed - No Scroll) */}
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
                Welcome to Heartify
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Create meaningful wishes effortlessly with our AI-powered message and card generation platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form (Fixed height on mobile) */}
      <div className="flex-1 lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen lg:min-h-0">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-2">
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
                  Welcome back
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Sign in with Google or continue with your email
                </CardDescription>

                <div className="flex justify-center w-full">
                  <Tabs
                    defaultValue="/signin"
                    value="/signin"
                    onValueChange={handleTabChange}
                    className="w-full mt-4"
                  >
                    <TabsList className="grid w-full grid-cols-2 h-10">
                      <TabsTrigger value="/signin" className="h-8 text-sm">
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger value="/signup" className="h-8 text-sm">
                        Sign Up
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {created && (
                  <div
                    className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                    role="status"
                    aria-live="polite"
                  >
                    Your account has been created. Please sign in.
                  </div>
                )}
                {error && (
                  <div
                    className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                {/* OAuth */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-10 sm:h-12 text-base sm:text-lg"
                    type="button"
                    onClick={handleGoogle}
                    disabled={loading || googleLoading}
                    aria-busy={googleLoading}
                    aria-disabled={loading || googleLoading}
                  >
                    {googleLoading ? (
                      <>
                        <svg
                          className="mr-2 h-6 w-6 animate-spin"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Redirecting…
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-6 w-6"
                          viewBox="0 0 16 16"
                        >
                          <g
                            fill="none"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path
                              fill="#f44336"
                              d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86"
                              opacity="0.987"
                            />
                            <path
                              fill="#ffc107"
                              d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92"
                              opacity="0.997"
                            />
                            <path
                              fill="#448aff"
                              d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49"
                              opacity="0.999"
                            />
                            <path
                              fill="#43a047"
                              d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z"
                              opacity="0.993"
                            />
                          </g>
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative text-center text-sm">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Credentials Form */}
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={handleCredentials}
                    noValidate
                  >
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
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              autoComplete="email"
                              inputMode="email"
                              className="h-10 sm:h-12 text-base sm:text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-base sm:text-lg">
                              Password
                            </FormLabel>
                            <Link
                              href="/forgot-password"
                              className="text-sm sm:text-base font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPw ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="h-10 sm:h-12 text-base sm:text-lg pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={
                                  showPw ? "Hide password" : "Show password"
                                }
                                tabIndex={-1}
                              >
                                {showPw ? (
                                  <EyeOff size={20} />
                                ) : (
                                  <Eye size={20} />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember"
                              className="h-4 w-4"
                              checked={!!field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(!!checked)
                              }
                            />
                            <FormLabel
                              htmlFor="remember"
                              className="text-sm sm:text-base text-muted-foreground cursor-pointer"
                            >
                              Remember me
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-center text-xs text-muted-foreground">
                      <p className="text-balance">
                        By using this service, you agree to our{" "}
                        <Link
                          href="/terms"
                          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-10 sm:h-12 text-base sm:text-lg"
                      disabled={loading}
                    >
                      {loading ? "Signing in…" : "Sign In"}
                    </Button>

                    <div className="text-center text-sm sm:text-base">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Mobile Terms */}
          </div>
        </div>
      </div>
    </div>
  );
}
