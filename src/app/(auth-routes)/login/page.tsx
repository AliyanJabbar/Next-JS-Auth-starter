import Loading from "@/app/loading";
import SignInCard from "@/components/signin";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    // Suspense is needed because useSearchParams is used in SignInCard
    <Suspense fallback={<Loading />}>
      <SignInCard />
    </Suspense>
  );
}
