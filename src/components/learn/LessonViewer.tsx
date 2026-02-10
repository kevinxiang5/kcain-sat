"use client";

import { useState } from "react";
import { ChevronRight, Check, X, Sparkles } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson } from "@/lib/lessons";

export function LessonViewer({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId);
  const [step, setStep] = useState<"content" | "question" | "result">("content");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!lesson) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-sat-gray-600">Lesson not found. <a href="/learn" className="text-sat-primary font-medium hover:underline">Back to Learn</a></p>
      </motion.div>
    );
  }

  const { content, question } = lesson;

  const handleAnswer = (key: string) => {
    if (showResult) return;
    setSelectedAnswer(key);
  };

  const handleCheck = () => {
    setShowResult(true);
    setStep("result");
    const correct = selectedAnswer === question.correctKey;
    if (correct) {
      fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      }).catch(() => {});
    }
  };

  const isCorrect = selectedAnswer === question.correctKey;

  const progressWidth = step === "content" ? "33%" : step === "question" ? "66%" : "100%";

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress bar */}
      <div className="h-2 bg-sat-gray-200 rounded-full mb-10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sat-primary to-sat-crimson rounded-full"
          initial={{ width: 0 }}
          animate={{ width: progressWidth }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {content.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={clsx(
                  block.type === "heading" && "text-2xl font-display font-bold bg-gradient-to-r from-sat-primary to-sat-crimson bg-clip-text text-transparent",
                  block.type === "text" && "text-sat-gray-700 leading-relaxed",
                  block.type === "example" && "p-5 bg-gradient-to-br from-sat-primary/5 to-sat-crimson/5 rounded-2xl border border-sat-primary/20 italic",
                  block.type === "formula" && "p-5 bg-sat-gray-100 rounded-2xl font-mono text-lg border border-sat-gray-200",
                  block.type === "tip" && "p-5 bg-amber-50 rounded-2xl border-l-4 border-amber-500 font-medium text-sat-gray-800"
                )}
              >
                {block.content}
              </motion.div>
            ))}
            <motion.button
              onClick={() => setStep("question")}
              className="btn-primary inline-flex items-center gap-2 mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Practice
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-display font-bold">Practice</h2>
            <p className="text-sat-gray-700 text-lg">{question.question}</p>
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <motion.button
                  key={opt.key}
                  onClick={() => handleAnswer(opt.key)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={clsx(
                    "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
                    selectedAnswer === opt.key
                      ? "border-sat-primary bg-sat-primary/5 shadow-md"
                      : "border-sat-gray-200 hover:border-sat-gray-300 hover:bg-sat-gray-50"
                  )}
                  whileHover={{ x: 4 }}
                >
                  <span className="w-10 h-10 rounded-xl bg-sat-gray-100 flex items-center justify-center font-bold shrink-0">
                    {opt.key}
                  </span>
                  {opt.text}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={handleCheck}
              disabled={!selectedAnswer}
              className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: selectedAnswer ? 1.01 : 1 }}
              whileTap={{ scale: 0.99 }}
            >
              Check
            </motion.button>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="space-y-6"
          >
            <motion.div
              className={clsx(
                "p-8 rounded-2xl flex items-center gap-6",
                isCorrect ? "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200" : "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200"
              )}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              {isCorrect ? (
                <>
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                  >
                    <Check className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-emerald-800">Correct!</h3>
                    <p className="text-emerald-700">+{lesson.xpReward} XP earned</p>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                  >
                    <X className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-red-800">Not quite</h3>
                    <p className="text-red-700">Review the explanation below</p>
                  </div>
                </>
              )}
            </motion.div>
            <motion.div
              className="p-6 bg-sat-gray-50 rounded-2xl border border-sat-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-bold mb-2 text-sat-gray-800">Explanation</p>
              <p className="text-sat-gray-700">{question.explanation}</p>
            </motion.div>
            <motion.button
              onClick={() => (window.location.href = "/learn")}
              className="btn-primary w-full py-4 inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Continue to Next Lesson
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
