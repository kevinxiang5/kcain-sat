"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "work" | "short" | "long";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MODE_LABELS: Record<Mode, string> = {
  work: "Focus",
  short: "Short Break",
  long: "Long Break",
};

const MODE_COLORS: Record<Mode, string> = {
  work: "#38bdf8",
  short: "#34d399",
  long: "#818cf8",
};

export function PomodoroTimer() {
  const [workMins, setWorkMins] = useState(25);
  const [shortMins, setShortMins] = useState(5);
  const [longMins, setLongMins] = useState(15);
  const [mode, setMode] = useState<Mode>("work");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(0); // 0-3 work sessions before long break
  const [showSettings, setShowSettings] = useState(false);
  const [pomosCompleted, setPomosCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = mode === "work" ? workMins * 60 : mode === "short" ? shortMins * 60 : longMins * 60;
  const fraction = secondsLeft / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - fraction);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const advanceMode = useCallback(() => {
    if (mode === "work") {
      const newCycle = cycle + 1;
      if (newCycle >= 4) {
        setCycle(0);
        setMode("long");
        setSecondsLeft(longMins * 60);
      } else {
        setCycle(newCycle);
        setMode("short");
        setSecondsLeft(shortMins * 60);
      }
      setPomosCompleted((p) => p + 1);
    } else {
      setMode("work");
      setSecondsLeft(workMins * 60);
    }
    setRunning(false);
  }, [mode, cycle, workMins, shortMins, longMins]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            advanceMode();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, advanceMode]);

  function reset() {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  }

  function skip() {
    setRunning(false);
    advanceMode();
  }

  function applySettings(w: number, s: number, l: number) {
    setWorkMins(w);
    setShortMins(s);
    setLongMins(l);
    setRunning(false);
    if (mode === "work") setSecondsLeft(w * 60);
    else if (mode === "short") setSecondsLeft(s * 60);
    else setSecondsLeft(l * 60);
    setShowSettings(false);
  }

  const color = MODE_COLORS[mode];

  return (
    <div className="card p-5 flex flex-col items-center gap-4 relative">
      <div className="w-full flex items-center justify-between mb-1">
        <h2 className="font-display font-semibold text-sm text-sat-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-base">⏱</span> Pomodoro Timer
        </h2>
        <button
          onClick={() => setShowSettings((v) => !v)}
          className="text-sat-gray-400 dark:text-sat-gray-500 hover:text-sat-gray-700 dark:hover:text-white transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1.5 w-full">
        {(["work", "short", "long"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              if (m === mode) return;
              setMode(m);
              setRunning(false);
              setSecondsLeft(m === "work" ? workMins * 60 : m === "short" ? shortMins * 60 : longMins * 60);
            }}
            className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
              mode === m
                ? "bg-black dark:bg-blue-600 text-white"
                : "bg-sat-gray-100 dark:bg-sat-gray-800 text-sat-gray-500 dark:text-sat-gray-400 hover:bg-sat-gray-200 dark:hover:bg-sat-gray-700"
            }`}
          >
            {m === "work" ? "Focus" : m === "short" ? "Short" : "Long"}
          </button>
        ))}
      </div>

      {/* SVG Ring */}
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <svg width="100" height="100" className="-rotate-90">
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-sat-gray-100 dark:text-sat-gray-700"
          />
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sat-gray-400 dark:text-sat-gray-500 mb-0.5">
            {MODE_LABELS[mode]}
          </span>
          <span className="text-xl font-black font-mono" style={{ color }}>
            {mins}:{secs}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className="w-8 h-8 rounded-lg bg-sat-gray-100 dark:bg-sat-gray-800 text-sat-gray-500 dark:text-sat-gray-400 hover:bg-sat-gray-200 dark:hover:bg-sat-gray-700 flex items-center justify-center transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <motion.button
          onClick={() => setRunning((r) => !r)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ background: color }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={running ? "Pause" : "Start"}
        >
          {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </motion.button>

        <button
          onClick={skip}
          className="w-8 h-8 rounded-lg bg-sat-gray-100 dark:bg-sat-gray-800 text-sat-gray-500 dark:text-sat-gray-400 hover:bg-sat-gray-200 dark:hover:bg-sat-gray-700 flex items-center justify-center transition-colors"
          aria-label="Skip"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Pomo dots */}
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < cycle ? "bg-sky-400 dark:bg-sky-500" : "bg-sat-gray-200 dark:bg-sat-gray-700"
            }`}
          />
        ))}
        {pomosCompleted > 0 && (
          <span className="text-xs text-sat-gray-400 dark:text-sat-gray-500 ml-1">×{pomosCompleted}</span>
        )}
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            workMins={workMins}
            shortMins={shortMins}
            longMins={longMins}
            onApply={applySettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsPanel({
  workMins, shortMins, longMins, onApply, onClose,
}: {
  workMins: number; shortMins: number; longMins: number;
  onApply: (w: number, s: number, l: number) => void;
  onClose: () => void;
}) {
  const [w, setW] = useState(workMins);
  const [s, setS] = useState(shortMins);
  const [l, setL] = useState(longMins);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute top-10 right-4 z-20 bg-white dark:bg-sat-slate border border-sat-gray-200 dark:border-sat-horizon rounded-xl shadow-xl p-4 w-44"
    >
      <p className="text-xs font-bold text-sat-gray-700 dark:text-white mb-3">Timer Settings</p>
      {([["Focus (min)", w, setW], ["Short break", s, setS], ["Long break", l, setL]] as [string, number, (v: number) => void][]).map(([label, val, setter]) => (
        <div key={label} className="flex items-center justify-between mb-2">
          <span className="text-xs text-sat-gray-500 dark:text-sat-gray-400">{label}</span>
          <input
            type="number"
            min={1} max={99}
            value={val}
            onChange={(e) => setter(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="w-12 text-center text-xs rounded-lg border border-sat-gray-200 dark:border-sat-gray-600 bg-sat-gray-50 dark:bg-sat-gray-700 dark:text-white py-1 outline-none focus:ring-1 focus:ring-sky-400"
          />
        </div>
      ))}
      <div className="flex gap-2 mt-3">
        <button onClick={onClose} className="flex-1 text-xs py-1.5 rounded-lg border border-sat-gray-200 dark:border-sat-gray-600 text-sat-gray-500 dark:text-sat-gray-400 hover:bg-sat-gray-50 dark:hover:bg-sat-gray-700 transition-colors">
          Cancel
        </button>
        <button onClick={() => onApply(w, s, l)} className="flex-1 text-xs py-1.5 rounded-lg bg-black dark:bg-blue-600 text-white hover:bg-sat-gray-800 dark:hover:bg-blue-700 transition-colors font-semibold">
          Apply
        </button>
      </div>
    </motion.div>
  );
}
