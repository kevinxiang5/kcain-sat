"use client";

import Link from "next/link";
import { KcainLogo } from "./KcainLogo";
import clsx from "clsx";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <motion.header
      className={clsx(
        "sticky top-0 z-50 backdrop-blur-md border-b shadow-sm",
        "bg-white/90 border-sat-gray-100 dark:bg-sat-gray-900/95 dark:border-sat-gray-700"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1" />
        <Link href="/" className="hover:opacity-90 transition-opacity flex items-center justify-end">
          <KcainLogo size="md" showText={false} />
        </Link>
      </nav>
    </motion.header>
  );
}
