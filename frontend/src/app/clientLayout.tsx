"use client";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname()
  return (
    <>
     {pathname !== "/signup" && pathname !== "/signin" && pathname !== "/forgot-password" && <Header />}
      <main>{children}</main>
    </>
  );
}
