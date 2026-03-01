"use client";

import { Flame, Target, Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressTrackerProps {
  xp?: number;
  streak?: number;
  dailyGoal?: number;
  dailyEarned?: number;
  lessonsCompleted?: number;
}

export function ProgressTracker({
  xp = 0,
  streak = 0,
  dailyGoal = 20,
  dailyEarned = 0,
  lessonsCompleted = 0,
}: ProgressTrackerProps) {
  const dailyPercent = Math.min(100, (dailyEarned / dailyGoal) * 100);

  const stats = [
    { icon: Trophy, label: "Total XP", value: xp.toString(), iconClasses: "bg-sky-500 dark:bg-sky-600", barClasses: "", hasBar: false, barPercent: 0 },
    { icon: Flame, label: "Streak", value: `${streak} ${streak === 1 ? "day" : "days"}`, iconClasses: "bg-amber-500 dark:bg-amber-600", barClasses: "", hasBar: false, barPercent: 0 },
    { icon: Target, label: "Daily Goal", value: `${dailyEarned}/${dailyGoal} XP`, iconClasses: "bg-sky-500 dark:bg-sky-600", barClasses: "bg-sky-500 dark:bg-sky-600", hasBar: true, barPercent: dailyPercent },
    { icon: TrendingUp, label: "Lessons", value: lessonsCompleted.toString(), iconClasses: "bg-sky-500 dark:bg-sky-600", barClasses: "", hasBar: false, barPercent: 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, iconClasses, barClasses, hasBar, barPercent }, i) => (
        <motion.div
          key={label}
          className="card p-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className={`w-10 h-10 rounded-xl ${iconClasses} flex items-center justify-center mb-3`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-sat-gray-600 dark:text-sat-gray-400 mb-0.5">{label}</p>
          <p className="font-display font-bold text-xl text-sat-gray-900 dark:text-white">{value}</p>
          {hasBar && (
            <div className="mt-3 h-2 bg-sat-gray-200 dark:bg-sat-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barClasses}`}
                initial={{ width: 0 }}
                animate={{ width: `${barPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
