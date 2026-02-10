"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { getQuestionsByDifficultyOrdered } from "@/lib/questions";

const TOPIC_LABELS: Record<string, string> = {
  "math-algebra": "Math – Algebra",
  "math-problem-solving": "Math – Problem Solving",
  "math-quadratics": "Math – Quadratics",
  "math-functions": "Math – Functions",
  "math-data": "Math – Data & Statistics",
  "math-geometry": "Math – Geometry",
  "reading-evidence": "Reading – Evidence",
  "reading-words": "Reading – Words in Context",
  "reading-comprehension": "Reading – Comprehension",
  "writing-conventions": "Writing – Conventions",
  "writing-transitions": "Writing – Transitions",
};

const TOPIC_MAP: Record<string, string> = {
  "math-algebra": "algebra",
  "math-problem-solving": "math",
  "math-quadratics": "quadratics",
  "math-functions": "functions",
  "math-data": "data",
  "math-geometry": "geometry",
  "reading-evidence": "evidence",
  "reading-words": "words",
  "reading-comprehension": "reading",
  "writing-conventions": "grammar",
  "writing-transitions": "transitions",
};

export default function PracticeTopicPage() {
  const params = useParams();
  const router = useRouter();
  const topicSlug = params.topic as string;
  const topic = TOPIC_MAP[topicSlug] || "algebra";
  const label = TOPIC_LABELS[topicSlug] || topicSlug;

  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [questions, setQuestions] = useState<ReturnType<typeof getQuestionsByDifficultyOrdered>>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const diff = difficulty === "all" ? undefined : difficulty;
    setQuestions(getQuestionsByDifficultyOrdered(15, topic, diff));
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
  }, [topic, difficulty]);

  const q = questions[current];
  const isCorrect = selected === q?.correctKey;

  const handleCheck = () => {
    if (!selected) return;
    setShowResult(true);
    if (selected === q.correctKey) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    if (current < questions.length - 1) setCurrent((c) => c + 1);
  };

  const handleFinish = () => router.push("/practice");

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse h-64 bg-sat-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!q) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-sat-gray-600">No questions loaded. <Link href="/practice" className="text-sat-primary">Back to Practice</Link></p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-10 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link href="/practice" className="inline-flex items-center gap-2 text-sat-gray-600 hover:text-sat-primary mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">{label}</h1>
          <span className="text-sm text-sat-gray-500">
            {current + 1} / {questions.length} • Score: {score}
          </span>
        </div>
        <div className="flex gap-2 text-sm">
          {(["all", "easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full border text-xs font-medium ${
                difficulty === d
                  ? "border-sat-primary bg-sat-primary/10 text-sat-primary"
                  : "border-sat-gray-200 text-sat-gray-600 hover:border-sat-gray-300"
              }`}
            >
              {d === "all" ? "All" : d[0].toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-2 bg-sat-gray-200 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sat-primary to-sat-crimson"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <p className="text-lg text-sat-gray-800">{q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => !showResult && setSelected(opt.key)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                  !showResult
                    ? selected === opt.key
                      ? "border-sat-primary bg-sat-primary/5"
                      : "border-sat-gray-200 hover:border-sat-gray-300"
                    : opt.key === q.correctKey
                    ? "border-emerald-500 bg-emerald-50"
                    : selected === opt.key
                    ? "border-red-400 bg-red-50"
                    : "border-sat-gray-200 opacity-70"
                }`}
              >
                <span className="w-10 h-10 rounded-xl bg-sat-gray-100 flex items-center justify-center font-bold shrink-0">
                  {opt.key}
                </span>
                {opt.text}
                {showResult && opt.key === q.correctKey && <Check className="w-5 h-5 text-emerald-500 ml-auto" />}
                {showResult && selected === opt.key && opt.key !== q.correctKey && <X className="w-5 h-5 text-red-500 ml-auto" />}
              </button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-sat-gray-50 rounded-xl"
            >
              <p className="font-medium mb-1">Explanation</p>
              <p className="text-sat-gray-700 text-sm">{q.explanation}</p>
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={!selected}
                className="btn-primary flex-1 py-3 disabled:opacity-50"
              >
                Check
              </button>
            ) : current < questions.length - 1 ? (
              <button onClick={handleNext} className="btn-primary flex-1 py-3">
                Next question
              </button>
            ) : (
              <>
                <button onClick={handleFinish} className="btn-primary flex-1 py-3">
                  Finish — {score}/{questions.length} correct
                </button>
                <Link href="/practice" className="btn-secondary py-3 px-6">Back to topics</Link>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
