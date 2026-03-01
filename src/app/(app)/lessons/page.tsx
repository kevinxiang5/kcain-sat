"use client";

import { motion } from "framer-motion";
import { SkillTree } from "@/components/learn/SkillTree";

export default function LessonsPage() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-1 text-sat-gray-900 dark:text-white">
          Learning Path
        </h1>
        <p className="text-sat-gray-600 dark:text-sat-gray-400 text-base">
          Complete lessons in order to unlock the next. Tap a circle to play.
        </p>
      </motion.div>
      <SkillTree />
    </motion.div>
  );
}
