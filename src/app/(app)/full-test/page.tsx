"use client";

import { motion } from "framer-motion";
import { FileQuestion, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function FullTestPage() {
  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-2 text-sat-gray-900 dark:text-white">
        Full Practice Test
      </h1>
      <p className="text-sat-gray-600 dark:text-sat-gray-400 mb-8">
        Simulate a real SAT with a timed, full-length practice test. Math and Reading & Writing sections.
      </p>

      <div className="card p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
            <FileQuestion className="w-7 h-7 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg dark:text-white">Timed full test</h2>
            <p className="text-sm text-sat-gray-600 dark:text-sat-gray-400">Same structure as the real SAT</p>
          </div>
        </div>
        <ul className="space-y-2 text-sat-gray-700 dark:text-sat-gray-300">
          <li className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            Timed sections: Math and Reading & Writing
          </li>
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-sky-500" />
            Get a score estimate and review answers
          </li>
        </ul>
        <div className="pt-4">
          <p className="text-sm text-sat-gray-600 dark:text-sat-gray-400 mb-4">
            Full practice tests are available with Premium. Upgrade to unlock unlimited access and full-length tests.
          </p>
          <Link href="/plans" target="_blank" rel="noopener noreferrer">
            <motion.span
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View plans
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
