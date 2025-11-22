import { ResetPasswordCard } from "@/components/resetpassword";
import { Suspense } from "react";
import Loading from "@/app/loading";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordCard />
    </Suspense>
  );
}
