"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  { topic: "Math - Algebra", count: 45, difficulty: "Easy → Hard", href: "/practice/math-algebra" },
  { topic: "Math - Quadratics", count: 25, difficulty: "Easy → Hard", href: "/practice/math-quadratics" },
  { topic: "Math - Functions", count: 20, difficulty: "Easy → Hard", href: "/practice/math-functions" },
  { topic: "Math - Data & Stats", count: 25, difficulty: "Easy → Hard", href: "/practice/math-data" },
  { topic: "Math - Geometry", count: 30, difficulty: "Easy → Hard", href: "/practice/math-geometry" },
  { topic: "Math - Mixed", count: "100+", difficulty: "Easy → Hard", href: "/practice/math-problem-solving" },
  { topic: "Reading - Evidence", count: 15, difficulty: "Easy → Hard", href: "/practice/reading-evidence" },
  { topic: "Reading - Words", count: 15, difficulty: "Easy → Hard", href: "/practice/reading-words" },
  { topic: "Reading - Comprehension", count: 12, difficulty: "Easy → Hard", href: "/practice/reading-comprehension" },
  { topic: "Writing - Conventions", count: 25, difficulty: "Easy → Hard", href: "/practice/writing-conventions" },
  { topic: "Writing - Transitions", count: 12, difficulty: "Easy → Hard", href: "/practice/writing-transitions" },
];

export default function PracticePage() {
  return (
    <motion.div
      className="max-w-5xl mx-auto"
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
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-sat-gray-900 dark:text-white">
          Practice Questions
        </h1>
        <p className="text-sat-gray-600 dark:text-sky-200 text-lg">
          SAT-style questions by topic. Questions ramp from easy to hard for effective practice.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {topics.map(({ topic, count, difficulty, href }, i) => (
          <Link key={topic} href={href}>
            <motion.div
              className="card p-6 group cursor-pointer"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(255, 107, 53, 0.2)" }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-sat-primary transition-colors dark:text-white">
                {topic}
              </h3>
              <p className="text-sat-gray-600 text-sm dark:text-sat-gray-400">{String(count)} questions • {difficulty}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        className="card p-6 bg-sat-gray-50 dark:bg-sat-gray-800/50 border border-sat-gray-200 dark:border-sat-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-display font-bold text-lg mb-2 dark:text-white">Full Practice Test</h3>
        <p className="text-sat-gray-600 dark:text-sky-200 mb-4">
          Simulate a real SAT with a timed full-length practice test. Use the <strong>Full Test</strong> tab in the sidebar for the full experience.
        </p>
        <Link href="/full-test">
          <motion.span className="btn-secondary text-sm py-2 px-5 inline-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Go to Full Test
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
