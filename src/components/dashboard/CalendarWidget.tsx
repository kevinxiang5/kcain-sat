"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Task } from "./TaskManager";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ymd(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function today(): string {
  return ymd(new Date());
}

function getTasksForDate(tasks: Task[], dateStr: string) {
  return tasks.filter((t) => t.dueDate === dateStr);
}

interface CalendarWidgetProps {
  tasks: Task[];
  onSelectDate?: (date: string) => void;
}

export function CalendarWidget({ tasks, onSelectDate }: CalendarWidgetProps) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(today());
  const [direction, setDirection] = useState(0);

  const todayStr = today();

  function prevMonth() {
    setDirection(-1);
    if (currentMonth === 0) { setCurrentYear((y) => y - 1); setCurrentMonth(11); }
    else setCurrentMonth((m) => m - 1);
  }

  function nextMonth() {
    setDirection(1);
    if (currentMonth === 11) { setCurrentYear((y) => y + 1); setCurrentMonth(0); }
    else setCurrentMonth((m) => m + 1);
  }

  function buildCells() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const cells: { date: string; day: number; isCurrentMonth: boolean }[] = [];

    // Previous month filler
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
      cells.push({ date: ymd(d), day: d.getDate(), isCurrentMonth: false });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      cells.push({ date: ymd(date), day: d, isCurrentMonth: true });
    }

    // Next month filler — fill to 42 cells (6 rows)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(currentYear, currentMonth + 1, d);
      cells.push({ date: ymd(date), day: d, isCurrentMonth: false });
    }

    return cells;
  }

  const cells = buildCells();
  const selectedTasks = getTasksForDate(tasks, selectedDate);
  const selectedDateObj = new Date(selectedDate + "T00:00:00");

  function handleSelect(dateStr: string) {
    setSelectedDate(dateStr);
    onSelectDate?.(dateStr);
  }

  return (
    <div className="card p-5">
      <h2 className="font-display font-semibold text-sm text-sat-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <span className="text-base">📅</span> Calendar
      </h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-7 h-7 rounded-lg bg-sat-gray-100 dark:bg-sat-gray-800 flex items-center justify-center hover:bg-sat-gray-200 dark:hover:bg-sat-gray-700 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-sat-gray-600 dark:text-sat-gray-400" />
        </button>
        <span className="text-sm font-display font-bold text-sat-gray-800 dark:text-white">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 rounded-lg bg-sat-gray-100 dark:bg-sat-gray-800 flex items-center justify-center hover:bg-sat-gray-200 dark:hover:bg-sat-gray-700 transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5 text-sat-gray-600 dark:text-sat-gray-400" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-sat-gray-400 dark:text-sat-gray-500 uppercase tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map(({ date, day, isCurrentMonth }) => {
          const dayTasks = getTasksForDate(tasks, date);
          const hasTask = dayTasks.length > 0;
          const allDone = hasTask && dayTasks.every((t) => t.completed);
          const isToday = date === todayStr;
          const isSelected = date === selectedDate;

          return (
            <button
              key={date}
              onClick={() => handleSelect(date)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-all
                ${!isCurrentMonth ? "opacity-30" : ""}
                ${isSelected
                  ? "bg-black dark:bg-blue-600 text-white"
                  : isToday
                  ? "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 ring-1 ring-sky-400/40"
                  : "hover:bg-sat-gray-100 dark:hover:bg-sat-gray-800 text-sat-gray-700 dark:text-sat-gray-300"}
              `}
            >
              {day}
              {hasTask && (
                <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                  allDone ? "bg-emerald-400" : isSelected ? "bg-white/70" : "bg-sky-400 dark:bg-sky-500"
                }`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day tasks */}
      <div className="mt-4 pt-4 border-t border-sat-gray-100 dark:border-sat-gray-700">
        <p className="text-xs font-bold text-sat-gray-600 dark:text-sat-gray-400 mb-2">
          {selectedDate === todayStr
            ? "Today"
            : selectedDateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          {selectedTasks.length > 0 && (
            <span className="ml-1 font-normal">· {selectedTasks.length} task{selectedTasks.length !== 1 ? "s" : ""}</span>
          )}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-1.5 max-h-28 overflow-y-auto"
          >
            {selectedTasks.length === 0 ? (
              <p className="text-xs text-sat-gray-400 dark:text-sat-gray-500">No tasks for this day</p>
            ) : (
              selectedTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.completed ? "bg-emerald-400" : "bg-sky-400"}`} />
                  <span className={`text-xs ${task.completed ? "line-through text-sat-gray-400 dark:text-sat-gray-500" : "text-sat-gray-700 dark:text-sat-gray-300"}`}>
                    {task.text}
                  </span>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
