"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    const shouldDark = stored === "dark";
    setDark(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-xl border border-sat-gray-200 hover:border-sat-primary hover:bg-sat-gray-100/70 dark:hover:bg-sat-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="w-4 h-4 text-sat-gray-100" /> : <Moon className="w-4 h-4 text-sat-gray-700" />}
    </button>
  );
}


