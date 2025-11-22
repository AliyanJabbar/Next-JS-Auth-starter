import SignInCard from "@/components/signin";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    // Suspense is needed because useSearchParams is used in SignInCard
    <Suspense
      fallback={
        <div className="fixed h-screen w-screen bg-white/50 backdrop-blur-2xl flex items-center justify-center z-50">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      }
    >
      <SignInCard />
    </Suspense>
  );
}
