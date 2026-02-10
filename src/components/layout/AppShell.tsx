"use client";

import { useSession } from "next-auth/react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sat-gray-50 via-white to-sat-primary/5">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sat-primary/5 via-transparent to-transparent">
        {children}
      </div>
    </div>
  );
}
