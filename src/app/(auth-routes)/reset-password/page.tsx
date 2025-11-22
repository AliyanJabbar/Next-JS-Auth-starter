"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordCard } from "@/components/resetpassword";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  return <ResetPasswordCard token={token} />;
}
