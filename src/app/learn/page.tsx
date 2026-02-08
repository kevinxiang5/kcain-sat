"use client";

import { SkillTree } from "@/components/learn/SkillTree";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { motion } from "framer-motion";

export default function LearnPage() {
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
        <p className="text-sat-gray-600 text-lg">Complete lessons to unlock the next. 18+ lessons across Math and Reading.</p>
      </motion.div>

      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProgressTracker xp={0} streak={0} dailyGoal={20} dailyEarned={0} lessonsCompleted={0} />
      </motion.div>

      <SkillTree />
    </motion.div>
  );
}
