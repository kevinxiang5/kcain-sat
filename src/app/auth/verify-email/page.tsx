"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email }),
    })
      .then(async (res) => {
        setStatus(res.ok ? "success" : "error");
      })
      .catch(() => setStatus("error"));
  }, [token, email]);

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="card w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-8">
          <KcainLogo size="lg" />
        </div>

        {status === "loading" && (
          <div className="space-y-6">
            <div className="w-12 h-12 border-4 border-sat-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sat-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold">Email verified!</h1>
            <p className="text-sat-gray-600">Your account is active. You can now log in.</p>
            <Link href="/auth/login" className="btn-primary inline-block">Log in</Link>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-sat-crimson/20 flex items-center justify-center mx-auto text-sat-crimson">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold">Verification failed</h1>
            <p className="text-sat-gray-600">The link may be expired or invalid.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup" className="btn-secondary">Sign up again</Link>
              <Link href="/auth/login" className="text-sat-primary font-medium hover:underline">Log in</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
