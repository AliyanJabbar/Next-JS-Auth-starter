"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
// import { AppSidebar } from "@/components/common/AppSidbar";
// import Header from "@/components/common/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <SidebarProvider>
        {pathname !== "/signup" &&
          pathname !== "/signin" &&
          pathname !== "/forgot-password" && <AppSidebar />}

        <SidebarInset>
          {/* {pathname !== "/signup" &&
          pathname !== "/signin" &&
          pathname !== "/forgot-password" && <Header />} */}
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
