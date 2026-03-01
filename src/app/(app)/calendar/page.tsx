"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-2 text-sat-gray-900 dark:text-white">
        Calendar
      </h1>
      <p className="text-sat-gray-600 dark:text-sat-gray-400 mb-8">
        Plan your study schedule and see your streak. Schedule practice sessions and full tests.
      </p>

      <div className="card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
            <CalendarIcon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg dark:text-white">Study calendar</h2>
            <p className="text-sm text-sat-gray-600 dark:text-sat-gray-400">Coming soon</p>
          </div>
        </div>
        <p className="text-sat-gray-600 dark:text-sat-gray-400 text-sm">
          You’ll be able to block time for lessons, practice, and full tests, and see your activity over time.
        </p>
      </div>
    </motion.div>
  );
}
