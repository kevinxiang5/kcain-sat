"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sat-cream to-white dark:from-sat-gray-900 dark:to-sat-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="card w-full max-w-md p-8 shadow-xl dark:bg-sat-gray-800 dark:border-sat-gray-700">
        <div className="flex justify-center mb-8">
          <KcainLogo size="lg" />
        </div>
        <h1 className="text-2xl font-display font-bold text-center mb-2 dark:text-white">Forgot password</h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-center mb-8">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        {success ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 text-sm text-center mb-6">
            If an account exists with that email, we sent a reset link. Check your inbox and spam folder.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-sat-crimson/10 text-sat-crimson text-sm"
              >
                {error}
              </motion.div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 focus:border-sat-primary outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? "Sending..." : "Send reset link"}
            </motion.button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-sat-gray-600 dark:text-sky-300">
          <Link href="/auth/login" className="text-sat-primary font-medium hover:underline">
            Back to log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
