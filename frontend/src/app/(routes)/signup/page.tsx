"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { ClientSignUpSchema } from "../../../../schema/schema_auth";
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
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Heartify";

export default function SignUpPage() {
  // const [mounted, setMounted] = React.useState(false);
  const [showPw, setShowPw] = React.useState(false);
  const [showPw2, setShowPw2] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [step, setStep] = React.useState<"email" | "password">("email");

  const router = useRouter();

  // React.useEffect(() => setMounted(true), []);

  const form = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: string;
  }>({
    resolver: zodResolver(ClientSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, planTier: "FREE" }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      const msg =
        typeof data?.message === "string"
          ? data.message
          : "Could not create the account. Please check your inputs.";
      setError(msg);
      return;
    }

    localStorage.setItem("unverifiedEmail", values.email);
    router.push("/verify-email");
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
    value === "signin" && router.push("/signin");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 fixed left-0 top-0 h-screen overflow-hidden z-10 bg-[url('/signin.png')] bg-cover">
        <div className="flex flex-col items-center justify-end flex-1">
          <div className="text-center space-y-8">
            <div className="space-y-4 text-ourBrown">
              <h1 className="text-4xl font-bold ">{`Join ${APP_NAME}`}</h1>
              <p className="text-lg max-w-md ">
                Take control of your health and wellness with personalized
                fitness and nutrition guidance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1  lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen lg:min-h-0 bg-ourLightGray">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            <Card className="border-0 text-ourBlack shadow-md bg-ourBrown/50 p-6 rounded-lg">
              <CardHeader className="text-center space-y-0 pb-4">
                {step === "password" && (
                  <div className="flex justify-start mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep("email")}
                      className="text-ourBrown hover:text-ourBrown/70 cursor-pointer transition-colors text-sm"
                    >
                      <ArrowLeft size={14} className="mr-1" />
                      Back to email
                    </Button>
                  </div>
                )}

                <CardTitle className="text-2xl sm:text-3xl font-bold ">
                  {step === "email"
                    ? "Create your account"
                    : "Set your password"}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg ">
                  {step === "email"
                    ? "Start your wellness journey today"
                    : "Create a strong password to secure your account"}
                </CardDescription>

                {step === "password" && (
                  <div className="mt-3 p-2 bg-ourBrown/50 text-white rounded-lg">
                    <p className="text-xs ">
                      Signing up with:{" "}
                      <span className="font-medium">
                        {form.getValues("email")}
                      </span>
                    </p>
                  </div>
                )}

                {error && (
                  <div
                    className="mt-3 rounded-md border border-ourBrown/50 bg-ourBrown/10 px-3 py-2 text-xs text-ourBrown"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <div className="flex justify-center">
                  <Tabs
                    defaultValue="signup"
                    value="signup"
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
                {step === "email" && (
                  <>
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
                        {googleLoading
                          ? "Redirecting…"
                          : "Continue with Google"}
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
                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (form.getValues("email")) setStep("password");
                        }}
                      >
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
                                  id="signup-email"
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
                        <Button
                          type="submit"
                          className="w-full h-10 sm:h-12 text-base sm:text-lg bg-ourBrown text-white hover:bg-ourBrown/70 hover:text-white transition-colors"
                          disabled={!form.getValues("email")}
                        >
                          Continue with email
                        </Button>
                      </form>
                    </Form>
                  </>
                )}

                {step === "password" && (
                  <Form {...form}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">
                                  First name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your first name"
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
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">
                                  Last name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your last name"
                                    className="h-10 sm:h-12 placeholder:text-ourBrown"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Create Password
                        </h3>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">
                                Password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showPw ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className="h-10 sm:h-12 pr-10 placeholder:text-ourBrown"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-ourBrown/90 transition-colors"
                                    aria-label={
                                      showPw ? "Hide password" : "Show password"
                                    }
                                    tabIndex={-1}
                                  >
                                    {showPw ? (
                                      <EyeOff size={18} />
                                    ) : (
                                      <Eye size={18} />
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
                          name="confirm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">
                                Confirm password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showPw2 ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="h-10 sm:h-12 pr-10 placeholder:text-ourBrown"
                                    {...field}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPw2((v) => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-ourBrown/90 transition-colors"
                                    aria-label={
                                      showPw2
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                    tabIndex={-1}
                                  >
                                    {showPw2 ? (
                                      <EyeOff size={18} />
                                    ) : (
                                      <Eye size={18} />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-2 space-y-3">
                        <Button
                          type="submit"
                          className="w-full h-10 sm:h-12 text-base sm:text-lg bg-white text-ourBrown hover:bg-ourBrown/70 cursor-pointer hover:text-white transition-colors"
                          disabled={loading}
                        >
                          {loading ? "Creating account…" : "Create account"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                <div className="text-center text-sm sm:text-base">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-bold hover:underline text-ourBrown transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-white">
              <p>
                By creating an account, you agree to our{" "}
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
