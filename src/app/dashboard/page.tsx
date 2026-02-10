"use client";

import { useSession } from "next-auth/react";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Target, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name || session?.user?.email?.split("@")[0] || "there";

  return (
    <motion.div
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-sat-primary to-sat-crimson bg-clip-text text-transparent">
          Welcome back, {name}!
        </h1>
        <p className="text-sat-gray-600 text-lg">Your home base for SAT prep. Track progress, build streaks, and keep improving.</p>
      </motion.div>

      <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <ProgressTracker
          xp={120}
          streak={3}
          dailyGoal={20}
          dailyEarned={15}
          lessonsCompleted={8}
        />
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-6 mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div className="card p-6" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <h2 className="font-display font-bold text-lg mb-4">Strengths</h2>
          <p className="text-sat-gray-600 mb-4">Topics you&apos;re doing well in:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-sat-primary to-sat-crimson" />
              Linear Equations — 92% avg
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-sat-primary to-sat-crimson" />
              Evidence-Based Reading — 85% avg
            </li>
          </ul>
        </motion.div>
        <motion.div className="card p-6" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <h2 className="font-display font-bold text-lg mb-4">Areas to Improve</h2>
          <p className="text-sat-gray-600 mb-4">Topics to focus on:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sat-crimson" />
              Quadratic Functions — 65% avg
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sat-flame" />
              Words in Context — 72% avg
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link href="/learn">
          <motion.span className="btn-primary inline-flex items-center gap-2 justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <BookOpen className="w-5 h-5" />
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </Link>
        <Link href="/practice">
          <motion.span className="btn-secondary inline-flex items-center gap-2 justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Target className="w-5 h-5" />
            Practice Questions
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
