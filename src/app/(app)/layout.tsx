"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      const callbackUrl = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/auth/login?callbackUrl=${callbackUrl}`);
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-sat-night">
        <div className="w-10 h-10 border-[3px] border-black/15 dark:border-blue-500/30 border-t-black dark:border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen flex bg-white dark:bg-sat-night overflow-hidden">
      <AppSidebar />
      <main className="flex-1 min-w-0 min-h-0 flex flex-col lg:pl-0 pl-14 pt-14 lg:pt-0">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
