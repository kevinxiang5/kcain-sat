"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface KcainLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = { sm: 32, md: 44, lg: 56 };

export function KcainLogo({ size = "md", showText = true, className = "" }: KcainLogoProps) {
  const px = sizes[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        className="relative shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Image
          src="/logo.png"
          alt="Cain"
          width={px}
          height={px}
          className="rounded-lg object-contain"
          priority
        />
      </motion.div>
      {showText && (
        <span className="font-display font-bold text-sat-gray-800 dark:text-white tracking-tight lowercase">
          cain
        </span>
      )}
    </div>
  );
}
