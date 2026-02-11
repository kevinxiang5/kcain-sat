"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface KcainLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = { sm: 32, md: 44, lg: 56 };

function LogoSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" className="rounded-lg">
      <defs>
        <linearGradient id="kclogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M10 28 Q18 14 26 28 T42 28"
        fill="none"
        stroke="url(#kclogo)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="14" y="12" width="28" height="32" rx="3" fill="none" stroke="url(#kclogo)" strokeWidth="2" />
    </svg>
  );
}

export function KcainLogo({ size = "md", showText = true, className = "" }: KcainLogoProps) {
  const px = sizes[size];
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        className="relative shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-sat-primary to-sat-crimson dark:from-sky-500 dark:to-sky-600 p-1 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {!imgError ? (
          <Image
            src="/kcain-logo.png"
            alt="Kcain"
            width={px}
            height={px}
            className="rounded-lg object-contain"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <LogoSvg size={px} />
        )}
      </motion.div>
      {showText && (
        <span className="font-display font-bold text-sat-gray-800 dark:text-white tracking-tight lowercase">
          kcain
        </span>
      )}
    </div>
  );
}
