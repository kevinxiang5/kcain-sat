"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password. New user? Verify your email first.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
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
        <h1 className="text-2xl font-display font-bold text-center mb-2 dark:text-white">Welcome back</h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-center mb-8">Log in to continue your SAT journey</p>
        <p className="text-xs text-sat-gray-500 dark:text-sky-300 text-center mb-4">New? Check your email for a verification link before logging in.</p>

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
              className="w-full px-4 py-3 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-700 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none transition"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? "Signing in..." : "Log in"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-sat-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-sat-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-sat-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
