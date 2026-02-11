"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SkillTree } from "@/components/learn/SkillTree";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Target, ArrowRight, Flame, Trophy, Zap, Lightbulb, Clock, ChevronRight, Star } from "lucide-react";
import { LESSONS } from "@/lib/lessons";

const MATH_IDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "19", "20", "21"];
const READING_IDS = ["11", "12", "13", "14", "15", "16", "17", "18", "22", "23", "24"];
const SAT_TIPS = [
  "Plug answer choices back in—start with B or C; they're correct more often than A or D.",
  "For paired evidence questions, answer the main question first, then find the line that proves it.",
  "'NO CHANGE' is correct about 25% of the time. Don't overthink it.",
  "Memorize 3-4-5 and 5-12-13 right triangles—they appear often.",
  "When stuck on vocab, cover the word and predict what would fit in the blank.",
  "Use your calculator for the Math section—it's allowed and can save time.",
  "Read the passage for main idea before answering questions.",
  "For comparisons, use 'any other' to exclude the thing being compared.",
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState({
    totalXP: 0,
    streak: 0,
    completedLessonIds: [] as string[],
    mathCompleted: 0,
    readingCompleted: 0,
    lastCompleted: [] as { lessonId: string | null; title: string; completedAt: string }[],
  });

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, []);

  const name = session?.user?.name || session?.user?.email?.split("@")[0] || "there";
  const lessonsCompleted = progress.completedLessonIds.length;
  const mathPercent = Math.round((progress.mathCompleted / MATH_IDS.length) * 100);
  const readingPercent = Math.round((progress.readingCompleted / READING_IDS.length) * 100);
  const totalPercent = Math.round((lessonsCompleted / 24) * 100);
  const level = Math.floor(progress.totalXP / 50) + 1;
  const xpToNext = 50 - (progress.totalXP % 50);
  const nextTip = SAT_TIPS[progress.totalXP % SAT_TIPS.length] ?? SAT_TIPS[0]!;

  const nextMathId = MATH_IDS.find((id) => !progress.completedLessonIds.includes(id));
  const nextReadingId = READING_IDS.find((id) => !progress.completedLessonIds.includes(id));
  const nextLessonId = nextMathId ?? nextReadingId;
  const nextLesson = nextLessonId ? LESSONS[nextLessonId] : null;

  if (!session) {
    return (
      <motion.div className="container mx-auto px-4 py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold mb-4">Sign in to view your dashboard</h1>
        <p className="text-sat-gray-600 mb-8">Log in to track your progress, earn XP, and build streaks.</p>
        <Link href="/auth/login" className="btn-primary inline-block">
          Log in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-sat-primary to-sat-crimson dark:from-sky-400 dark:to-sky-600 bg-clip-text text-transparent">
          Welcome back, {name}!
        </h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-lg">Your home base for SAT prep. Track progress, build streaks, and keep improving.</p>
      </motion.div>

      <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <ProgressTracker
          xp={progress.totalXP}
          streak={progress.streak}
          dailyGoal={20}
          dailyEarned={0}
          lessonsCompleted={lessonsCompleted}
        />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sat-primary to-sat-flame dark:from-sky-500 dark:to-sky-600 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold dark:text-white">Level {level}</h3>
          </div>
          <p className="text-sm text-sat-gray-600 dark:text-sky-200">{xpToNext} XP to Level {level + 1}</p>
        </motion.div>
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sat-flame to-sat-crimson dark:from-sky-400 dark:to-sky-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold dark:text-white">Math Progress</h3>
          </div>
          <div className="h-2 bg-sat-gray-200 dark:bg-sat-gray-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-sat-primary to-sat-crimson dark:from-sky-500 dark:to-sky-600" initial={{ width: 0 }} animate={{ width: `${mathPercent}%` }} transition={{ duration: 0.8 }} />
          </div>
          <p className="text-sm text-sat-gray-600 dark:text-sky-200 mt-1">{progress.mathCompleted}/{MATH_IDS.length} lessons · {mathPercent}%</p>
        </motion.div>
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sat-crimson to-sat-ember dark:from-sky-500 dark:to-sky-700 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold dark:text-white">Reading Progress</h3>
          </div>
          <div className="h-2 bg-sat-gray-200 dark:bg-sat-gray-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-sat-crimson to-sat-ember dark:from-sky-500 dark:to-sky-700" initial={{ width: 0 }} animate={{ width: `${readingPercent}%` }} transition={{ duration: 0.8 }} />
          </div>
          <p className="text-sm text-sat-gray-600 dark:text-sky-200 mt-1">{progress.readingCompleted}/{READING_IDS.length} lessons · {readingPercent}%</p>
        </motion.div>
        <motion.div className="card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 dark:from-sky-500 dark:to-sky-700 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold dark:text-white">Overall</h3>
          </div>
          <div className="h-2 bg-sat-gray-200 dark:bg-sat-gray-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 dark:from-sky-500 dark:to-sky-700" initial={{ width: 0 }} animate={{ width: `${totalPercent}%` }} transition={{ duration: 0.8 }} />
          </div>
          <p className="text-sm text-sat-gray-600 dark:text-sky-200 mt-1">{lessonsCompleted}/24 lessons · {totalPercent}%</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-14">
        <motion.div className="lg:col-span-2 card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
            <Clock className="w-5 h-5 text-sat-primary dark:text-sky-400" />
            Recent Activity
          </h2>
          {progress.lastCompleted.length > 0 ? (
            <ul className="space-y-3">
              {progress.lastCompleted.map((item, i) => (
                <li key={i} className="flex items-center gap-3 py-2 border-b border-sat-gray-100 dark:border-sat-gray-700 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium text-sat-gray-800 dark:text-white">{item.title}</span>
                  <span className="text-xs text-sat-gray-500 dark:text-sky-300 ml-auto">Completed</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sat-gray-500 dark:text-sky-300 py-6">No lessons completed yet. Start your first lesson below!</p>
          )}
        </motion.div>
        <motion.div className="card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
            <Lightbulb className="w-5 h-5 text-amber-500 dark:text-sky-400" />
            SAT Tip
          </h2>
          <p className="text-sat-gray-700 dark:text-sky-200 leading-relaxed">{nextTip}</p>
        </motion.div>
      </div>

      {nextLesson && (
        <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}>
          <Link href={`/learn/${nextLessonId}`} className="block">
            <div className="card p-6 bg-gradient-to-r from-sat-primary/5 via-sat-crimson/5 to-sat-flame/5 dark:from-sky-500/10 dark:via-sky-600/10 dark:to-sky-700/10 border-2 border-sat-primary/20 dark:border-sky-500/30 hover:border-sat-primary/40 dark:hover:border-sky-400/50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary to-sat-crimson dark:from-sky-500 dark:to-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sat-primary dark:text-sky-400">Suggested Next</p>
                    <h3 className="font-display font-bold text-xl dark:text-white">{nextLesson.title}</h3>
                    <p className="text-sat-gray-600 dark:text-sky-200 text-sm">+{nextLesson.xpReward} XP</p>
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 text-sat-primary dark:text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
        <h2 className="text-2xl font-display font-bold mb-2 bg-gradient-to-r from-sat-primary to-sat-crimson dark:from-sky-400 dark:to-sky-600 bg-clip-text text-transparent">
          Your Learning Path
        </h2>
        <p className="text-sat-gray-600 dark:text-sky-200">24 lessons across Math and Reading. Complete each to unlock the next.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <SkillTree />
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-4 mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
        <Link href="/practice">
          <motion.span className="btn-secondary inline-flex items-center gap-2 justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Target className="w-5 h-5" />
            Practice Questions
          </motion.span>
        </Link>
        <Link href="/plans">
          <motion.span className="btn-secondary inline-flex items-center gap-2 justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Flame className="w-5 h-5" />
            View Plans
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
