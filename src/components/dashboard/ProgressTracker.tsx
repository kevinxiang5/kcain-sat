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
    { icon: Trophy, label: "Total XP", value: xp.toString(), color: "from-sat-primary to-sat-flame" },
    { icon: Flame, label: "Current Streak", value: `${streak} ${streak === 1 ? "day" : "days"}`, color: "from-sat-flame to-sat-crimson" },
    { icon: Target, label: "Daily Goal", value: `${dailyEarned}/${dailyGoal} XP`, color: "from-sat-primary to-sat-crimson", hasBar: true, barPercent: dailyPercent },
    { icon: TrendingUp, label: "Lessons Done", value: lessonsCompleted.toString(), color: "from-sat-crimson to-sat-ember" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, color, hasBar, barPercent }, i) => (
        <motion.div
          key={label}
          className="card p-5 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-sat-gray-600 mb-1">{label}</p>
          <p className="font-display font-bold text-2xl">{value}</p>
          {hasBar && (
            <div className="mt-3 h-2 bg-sat-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
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
