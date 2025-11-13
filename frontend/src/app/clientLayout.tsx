"use client";
import Header from "@/components/common/Header";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      <SessionProvider>
        {pathname !== "/signup" &&
          pathname !== "/signin" &&
          pathname !== "/forgot-password" && <Header />}
        <main>{children}</main>
      </SessionProvider>
    </>
  );
}
