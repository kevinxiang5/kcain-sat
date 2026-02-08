"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  { topic: "Math - Algebra", count: 45, difficulty: "Mixed", href: "/practice/math-algebra" },
  { topic: "Math - Problem Solving", count: 32, difficulty: "Mixed", href: "/practice/math-problem-solving" },
  { topic: "Reading - Evidence", count: 28, difficulty: "Mixed", href: "/practice/reading-evidence" },
  { topic: "Writing - Conventions", count: 38, difficulty: "Mixed", href: "/practice/writing-conventions" },
];

export default function PracticePage() {
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
          Practice Questions
        </h1>
        <p className="text-sat-gray-600 text-lg">
          SAT-style questions by topic and difficulty. Randomized for effective practice.
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
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-sat-primary transition-colors">
                {topic}
              </h3>
              <p className="text-sat-gray-600 text-sm">{count} questions • {difficulty}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        className="card p-6 bg-gradient-to-br from-sat-primary/5 to-sat-crimson/5 border-2 border-sat-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-display font-bold text-lg mb-2">Full Practice Test</h3>
        <p className="text-sat-gray-600 mb-4">
          Simulate a real SAT with a timed full-length practice test. Premium feature.
        </p>
        <motion.button
          className="btn-secondary text-sm py-2 px-5 opacity-75 cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
        >
          Unlock with Premium
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
