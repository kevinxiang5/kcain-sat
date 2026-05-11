"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";
import { KcainLogo } from "./KcainLogo";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", requireAuth: true },
  { href: "/practice", label: "Practice", requireAuth: true },
  { href: "/plans", label: "Plans", requireAuth: false },
];

export function Navigation() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className={clsx(
        "sticky top-0 z-50 backdrop-blur-md border-b transition-colors",
        "bg-white/92 border-black/8 shadow-[0_1px_0_rgba(0,0,0,0.06)]",
        "dark:bg-sat-night/95 dark:border-sat-horizon dark:shadow-none"
      )}
      initial={{ y: -4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="container mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-85 transition-opacity">
          <KcainLogo size="md" showText />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks
            .filter((link) => !link.requireAuth || session)
            .map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative text-black/65 hover:text-black dark:text-sat-mist dark:hover:text-sat-frost font-medium text-sm transition-colors group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

          {status === "loading" ? (
            <div className="w-24 h-8 bg-black/8 dark:bg-white/8 rounded-xl animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-black/65 hover:text-black dark:text-sat-mist dark:hover:text-sat-frost transition-colors"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-black/8 dark:bg-sat-horizon flex items-center justify-center">
                    <User className="w-4 h-4 text-black/50 dark:text-sat-mist" />
                  </div>
                )}
                <span className="text-sm font-medium">
                  {session.user?.name || "Account"}
                </span>
              </Link>
              <motion.button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-black/42 hover:text-black dark:text-sat-mist dark:hover:text-sat-frost transition-colors text-sm"
                whileHover={{ x: 2 }}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </motion.button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-black/62 hover:text-black dark:text-sat-mist dark:hover:text-sat-frost font-medium text-sm transition-colors"
              >
                Log in
              </Link>
              <Link href="/auth/signup">
                <motion.span
                  className="btn-primary text-sm py-2 px-5 inline-block"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sign up
                </motion.span>
              </Link>
              <ThemeToggle />
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2 rounded-xl hover:bg-black/6 dark:hover:bg-white/6 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.93 }}
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-black dark:text-sat-frost" />
          ) : (
            <Menu className="w-5 h-5 text-black dark:text-sat-frost" />
          )}
        </motion.button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-black/8 dark:border-sat-horizon bg-white dark:bg-sat-night"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-5 py-5 flex flex-col gap-4">
              {navLinks
                .filter((link) => !link.requireAuth || session)
                .map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-black/70 hover:text-black dark:text-sat-mist dark:hover:text-sat-frost font-medium py-1.5 text-sm transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 py-1.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-lg object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-black/8 dark:bg-sat-horizon flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-black/45 dark:text-sat-mist" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-black dark:text-sat-frost">
                      {session.user?.name || "Dashboard"}
                    </span>
                  </Link>
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="flex items-center gap-2 text-black/50 dark:text-sat-mist hover:text-black dark:hover:text-sat-frost py-1.5 text-sm text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-1">
                  <Link
                    href="/auth/login"
                    className="btn-secondary flex-1 text-center py-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="btn-primary flex-1 text-center py-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
