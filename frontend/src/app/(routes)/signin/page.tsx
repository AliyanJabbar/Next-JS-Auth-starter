"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSignInSchema } from "../../../../schema/schema_auth";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Heartify";

export default function SignInPage() {
  // const [mounted, setMounted] = React.useState(false);
  const [showPw, setShowPw] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const router = useRouter();

  // React.useEffect(() => setMounted(true), []);

  const form = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(ClientSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
  });

  const handleGoogle = async () => {
    if (googleLoading) return;
    setError(null);
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/", redirect: true });
    } catch {
      setGoogleLoading(false);
    }
  };

  const handleTabChange = (value: string) =>
    value === "signup" && router.push("/signup");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 fixed left-0 top-0 h-screen overflow-hidden z-10 bg-[url('/signin.png')] bg-cover">
        <div className="flex flex-col items-center justify-end flex-1">
          <div className="text-center space-y-8">
            <div className="space-y-4 text-ourBrown">
              <h1 className="text-4xl font-bold">{`Welcome Back to ${APP_NAME}`}</h1>
              <p className="text-lg max-w-md">
                Continue your journey to better health and wellness.  
                Log in to track your progress and reach your goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen lg:min-h-0 bg-ourLightGray">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            <Card className="border-0 text-ourBlack shadow-md bg-ourBrown/50 p-6 rounded-lg">
              <CardHeader className="text-center space-y-0 pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Log in to continue your wellness journey
                </CardDescription>

                {error && (
                  <div
                    className="mt-3 rounded-md border border-ourR/70 bg-ourR/50 px-3 py-2 text-xs text-ourBrown"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <div className="flex justify-center">
                  <Tabs
                    defaultValue="signin"
                    value="signin"
                    onValueChange={handleTabChange}
                    className="w-full mt-4"
                  >
                    <TabsList className="grid w-full grid-cols-2 h-10 rounded-lg">
                      <TabsTrigger
                        value="signin"
                        className="cursor-pointer h-8 text-sm text-ourBrown hover:bg-ourBrown/50 hover:text-white data-[state=active]:bg-ourBrown/80 data-[state=active]:text-white rounded-md transition-colors"
                      >
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger
                        value="signup"
                        className="cursor-pointer h-8 text-sm text-ourBrown hover:bg-ourBrown/50 hover:text-white data-[state=active]:bg-ourBrown/80 data-[state=active]:text-white rounded-md transition-colors"
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Button
                    variant="default"
                    className="w-full h-10 sm:h-12 text-base sm:text-lg bg-white text-ourBrown cursor-pointer hover:bg-ourBrown hover:text-white transition-colors"
                    type="button"
                    onClick={handleGoogle}
                    disabled={loading || googleLoading}
                    aria-busy={googleLoading}
                    aria-disabled={loading || googleLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      viewBox="0 0 16 16"
                    >
                      <g fill="none" fillRule="evenodd" clipRule="evenodd">
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
                    {googleLoading ? "Redirecting…" : "Continue with Google"}
                  </Button>
                </div>

                <div className="relative text-center text-sm">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-ourBrown/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-ourBrown px-2 text-ourLightGray">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <Form {...form}>
                  <form className="space-y-4" onSubmit={onSubmit}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base sm:text-lg">
                            Email address:
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="signin-email"
                              type="email"
                              placeholder="Enter your email address"
                              className="h-10 sm:h-12 placeholder:text-ourBrown"
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
                          <FormLabel className="text-base sm:text-lg">
                            Password:
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPw ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-10 sm:h-12 pr-10 placeholder:text-ourBrown"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-ourBrown/90 transition-colors"
                              >
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-10 sm:h-12 text-base sm:text-lg bg-ourBrown text-white hover:bg-ourBrown/70 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Signing in…" : "Sign In"}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm sm:text-base">
                  Don’t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-bold hover:underline text-ourBrown transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-white">
              <p>
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-medium underline underline-offset-4 text-white hover:text-ourDB transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium underline underline-offset-4 text-white hover:text-ourDB transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
