"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Menu, X } from "lucide-react";
import { KcainLogo } from "./KcainLogo";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/practice", label: "Practice" },
  { href: "/plans", label: "Plans" },
];

export function Navigation() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sat-gray-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <KcainLogo size="md" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sat-gray-600 hover:text-sat-primary font-medium transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sat-primary to-sat-crimson group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {status === "loading" ? (
            <div className="w-24 h-9 bg-sat-gray-200 rounded-xl animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sat-gray-600 hover:text-sat-primary transition-colors"
              >
                {session.user?.image ? (
                  <Image src={session.user.image} alt="" width={36} height={36} className="w-9 h-9 rounded-xl object-cover" unoptimized />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sat-primary/20 to-sat-crimson/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-sat-primary" />
                  </div>
                )}
                <span className="font-medium">{session.user?.name || "Account"}</span>
              </Link>
              <motion.button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sat-gray-500 hover:text-sat-crimson transition-colors text-sm"
                whileHover={{ x: 2 }}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sat-gray-600 hover:text-sat-primary font-medium">
                Log in
              </Link>
              <Link href="/auth/signup">
                <motion.span
                  className="btn-primary text-sm py-2 px-5 inline-block"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign up
                </motion.span>
              </Link>
            </div>
          )}
        </div>

        <motion.button
          className="md:hidden p-2 rounded-xl hover:bg-sat-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-sat-gray-100 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sat-gray-600 hover:text-sat-primary font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {session ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-2 py-2" onClick={() => setMobileOpen(false)}>
                    {session.user?.image ? (
                      <Image src={session.user.image} alt="" width={32} height={32} className="w-8 h-8 rounded-full object-cover" unoptimized />
                    ) : (
                      <User className="w-8 h-8 text-sat-gray-400" />
                    )}
                    {session.user?.name || "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 text-sat-crimson py-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link href="/auth/login" className="btn-secondary flex-1 text-center py-2" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                  <Link href="/auth/signup" className="btn-primary flex-1 text-center py-2" onClick={() => setMobileOpen(false)}>
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
