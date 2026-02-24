"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    setDevVerifyUrl(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
      if (data.verifyUrl) setDevVerifyUrl(data.verifyUrl);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sat-cream to-white dark:from-sat-gray-900 dark:to-sat-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="card w-full max-w-md p-8 text-center dark:bg-sat-gray-800 dark:border-sat-gray-700">
          <div className="flex justify-center mb-6">
            <KcainLogo size="lg" />
          </div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 text-white"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-display font-bold mb-2 dark:text-white">Check your email</h1>
          <p className="text-sat-gray-600 dark:text-sky-200 mb-6">
            We sent a verification link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          {devVerifyUrl && process.env.NODE_ENV === "development" && (
            <div className="mb-6 p-4 bg-sat-primary/5 rounded-xl text-left">
              <p className="text-sm font-medium text-sat-primary mb-2">Dev mode: verification link</p>
              <a href={devVerifyUrl} className="text-sm text-sat-gray-600 break-all hover:underline">
                {devVerifyUrl}
              </a>
            </div>
          )}
          <Link href="/auth/login" className="text-sat-primary font-medium hover:underline">
            Go to login
          </Link>
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
        <h1 className="text-2xl font-display font-bold text-center mb-2 dark:text-white">Create your account</h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-center mb-8">Start your SAT prep journey with kcain</p>

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
            <label htmlFor="name" className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none transition"
              placeholder="Your name"
            />
          </div>
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
              className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
              Password
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
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-sat-gray-600 dark:text-sky-200">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-sat-primary dark:text-sky-400 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
