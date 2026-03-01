"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  Calendar,
  Target,
  CreditCard,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { KcainLogo } from "./KcainLogo";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/full-test", label: "Full Test", icon: FileQuestion },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/practice", label: "Practice", icon: Target },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <aside className="flex flex-col w-64 min-h-screen border-r border-sat-gray-200 dark:border-sat-gray-700 bg-white dark:bg-sat-gray-900 shrink-0">
      <div className="p-4 border-b border-sat-gray-100 dark:border-sat-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <KcainLogo size="md" />
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {mainLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              isActive(href)
                ? "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300"
                : "text-sat-gray-700 dark:text-sat-gray-300 hover:bg-sat-gray-100 dark:hover:bg-sat-gray-800"
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </Link>
        ))}
        <Link
          href="/plans"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sat-gray-700 dark:text-sat-gray-300 hover:bg-sat-gray-100 dark:hover:bg-sat-gray-800 transition-colors"
        >
          <CreditCard className="w-5 h-5 shrink-0" />
          Plans
        </Link>
      </nav>
      <div className="p-3 border-t border-sat-gray-100 dark:border-sat-gray-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sat-gray-600 dark:text-sat-gray-400">
          <ThemeToggle />
          <span className="text-sm">Theme</span>
        </div>
        {session && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            {session.user?.image ? (
              <Image src={session.user.image} alt="" width={32} height={32} className="w-8 h-8 rounded-full object-cover shrink-0" unoptimized />
            ) : (
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
            )}
            <span className="text-sm font-medium text-sat-gray-800 dark:text-white truncate flex-1">
              {session.user?.name || session.user?.email || "Account"}
            </span>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-sat-gray-600 dark:text-sat-gray-400 hover:bg-sat-gray-100 dark:hover:bg-sat-gray-800 hover:text-sat-crimson dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-2 rounded-xl bg-white dark:bg-sat-gray-800 border border-sat-gray-200 dark:border-sat-gray-700 shadow-sm"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{sidebar}</div>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
      <div className={clsx("lg:hidden fixed inset-y-0 left-0 z-40 transform transition-transform", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
        {sidebar}
      </div>
    </>
  );
}
