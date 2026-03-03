"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!token || !email) {
      setError("Invalid reset link. Please request a new one.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
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

  if (!token || !email) {
    return (
      <motion.div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sat-cream to-white dark:from-sat-gray-900 dark:to-sat-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="card w-full max-w-md p-8 shadow-xl dark:bg-sat-gray-800 dark:border-sat-gray-700 text-center">
          <div className="flex justify-center mb-8">
            <KcainLogo size="lg" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2 dark:text-white">Invalid link</h1>
          <p className="text-sat-gray-600 dark:text-sky-200 mb-6">This reset link is missing information. Use the link from your email or request a new one.</p>
          <Link href="/auth/forgot-password" className="btn-primary inline-block">Request new link</Link>
          <p className="mt-6">
            <Link href="/auth/login" className="text-sat-primary font-medium hover:underline">Back to log in</Link>
          </p>
        </div>
      </motion.div>
    );
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
        <h1 className="text-2xl font-display font-bold text-center mb-2 dark:text-white">Set new password</h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-center mb-8">Enter your new password below.</p>

        {success ? (
          <div className="space-y-6 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 text-sm">
              Password updated. You can now log in with your new password.
            </div>
            <Link href="/auth/login" className="btn-primary inline-block">Log in</Link>
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
              <label htmlFor="password" className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none transition"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none transition"
                placeholder="Same as above"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? "Updating..." : "Update password"}
            </motion.button>
          </form>
        )}

        {!success && (
          <p className="mt-6 text-center text-sm text-sat-gray-600 dark:text-sky-300">
            <Link href="/auth/login" className="text-sat-primary font-medium hover:underline">
              Back to log in
            </Link>
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ResetPasswordFallback() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-sat-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
