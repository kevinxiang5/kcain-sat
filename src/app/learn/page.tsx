"use client";

import { SkillTree } from "@/components/learn/SkillTree";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LearnPage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState({ totalXP: 0, completedLessonIds: [] as string[], streak: 0 });

  useEffect(() => {
    if (!session) {
      setProgress({ totalXP: 0, completedLessonIds: [], streak: 0 });
      return;
    }
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => setProgress({ totalXP: 0, completedLessonIds: [], streak: 0 }));
  }, [session]);

  const lessonsCompleted = progress.completedLessonIds.length;

  return (
    <motion.div
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 bg-gradient-to-r from-sat-primary to-sat-crimson bg-clip-text text-transparent">
          Your Learning Path
        </h1>
        <p className="text-sat-gray-600 text-lg">
          Complete lessons to unlock the next. 24 lessons across Math and Reading.
          {!session && " Sign in to save your progress."}
        </p>
      </motion.div>

      {session && (
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressTracker
            xp={progress.totalXP}
            streak={progress.streak}
            dailyGoal={20}
            dailyEarned={0}
            lessonsCompleted={lessonsCompleted}
          />
        </motion.div>
      )}

      <SkillTree />
    </motion.div>
  );
}
