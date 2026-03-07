"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileQuestion, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { estimateSectionScore } from "@/lib/scoring";

type LastFullTest = {
  readingRaw: number;
  mathRaw: number;
  readingScaled: number;
  mathScaled: number;
  totalScaled: number;
  computedAt: string;
};

const READING_MAX_RAW = 54; // digital SAT Reading & Writing
const MATH_MAX_RAW = 44; // digital SAT Math

export default function FullTestPage() {
  const [readingRaw, setReadingRaw] = useState("");
  const [mathRaw, setMathRaw] = useState("");
  const [result, setResult] = useState<LastFullTest | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("cain:lastFullTest");
      if (stored) {
        const parsed = JSON.parse(stored) as LastFullTest;
        setResult(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const rRaw = Number(readingRaw);
    const mRaw = Number(mathRaw);
    if (!Number.isFinite(rRaw) || !Number.isFinite(mRaw)) return;

    const readingScaled = estimateSectionScore(rRaw, READING_MAX_RAW, "reading_writing");
    const mathScaled = estimateSectionScore(mRaw, MATH_MAX_RAW, "math");
    const totalScaled = readingScaled + mathScaled;
    const payload: LastFullTest = {
      readingRaw: rRaw,
      mathRaw: mRaw,
      readingScaled,
      mathScaled,
      totalScaled,
      computedAt: new Date().toISOString(),
    };
    setResult(payload);
    try {
      window.localStorage.setItem("cain:lastFullTest", JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }

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
        Simulate a real SAT with a timed, full-length practice test. Math and Reading &amp; Writing sections.
      </p>

      <div className="card p-8 space-y-6 mb-10">
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
            Timed sections: Math and Reading &amp; Writing
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

      <div className="card p-8 space-y-6">
        <h2 className="font-display font-bold text-lg mb-1 dark:text-white">Score calculator</h2>
        <p className="text-sm text-sat-gray-600 dark:text-sat-gray-300 mb-2">
          Enter the number of questions you got right on a full digital SAT (no penalty for wrong answers). We&apos;ll
          estimate your scaled score out of 1600.
        </p>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
                Reading &amp; Writing correct (out of {READING_MAX_RAW})
              </label>
              <input
                type="number"
                min={0}
                max={READING_MAX_RAW}
                value={readingRaw}
                onChange={(e) => setReadingRaw(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-800 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sat-gray-700 dark:text-sky-200 mb-1">
                Math correct (out of {MATH_MAX_RAW})
              </label>
              <input
                type="number"
                min={0}
                max={MATH_MAX_RAW}
                value={mathRaw}
                onChange={(e) => setMathRaw(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sat-gray-200 dark:border-sat-gray-600 dark:bg-sat-gray-800 dark:text-white focus:ring-2 focus:ring-sat-primary dark:focus:ring-sky-500 outline-none text-sm"
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="btn-primary inline-flex items-center gap-2 mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Calculate score
          </motion.button>
        </form>

        {result && (
          <div className="mt-4 border-t border-sat-gray-100 dark:border-sat-gray-700 pt-4 space-y-2">
            <p className="text-sm text-sat-gray-600 dark:text-sky-200">
              Estimated scores (digital SAT style, 200–800 per section):
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold dark:text-white">Reading &amp; Writing:</span>{" "}
                {result.readingScaled} (raw {result.readingRaw}/{READING_MAX_RAW})
              </div>
              <div>
                <span className="font-semibold dark:text-white">Math:</span> {result.mathScaled} (raw{" "}
                {result.mathRaw}/{MATH_MAX_RAW})
              </div>
              <div>
                <span className="font-semibold dark:text-white">Total:</span> {result.totalScaled}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

