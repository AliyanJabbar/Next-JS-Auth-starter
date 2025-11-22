import Footer from "@/components/footer";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-24 gap-10 text-center">
        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
            Next.js 16 + Neon + Drizzle + NextAuth Starter
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            A production-ready authentication starter template featuring Server
            Actions, Drizzle ORM, Secure Credential Login, Google OAuth, and
            Password Reset flows.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Features Card */}
          <div className="rounded-xl border shadow-sm p-6 bg-card text-card-foreground space-y-4">
            <h2 className="text-xl font-semibold mb-2">Core Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Next.js 16 (App Router, Server Actions)",
                "Neon Serverless Postgres",
                "Drizzle ORM",
                "NextAuth.js v5",
                "Google OAuth",
                "Credentials Login",
                "Password Reset Flow",
                "Resend + SMTP Email",
                "Password Hashing with bcrypt",
                "Even I cannot read your password!",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Routes Card */}
          <div className="rounded-xl border shadow-sm p-6 bg-card text-card-foreground space-y-4">
            <h2 className="text-xl font-semibold mb-2">Main Routes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "/login (auth)",
                "/register (auth)",
                "/forgot-password (auth via email send)",
                "/reset-password (auth via token after email)",
              ].map((route) => (
                <Link
                  href={route.split(" ")[0]}
                  key={route}
                  className="flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span>{route}</span>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
