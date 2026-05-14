"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string | null; // YYYY-MM-DD
  createdAt: string;
}

function ymd(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function today(): string {
  return ymd(new Date());
}

function parseKeywords(text: string): { clean: string; date: string | null } {
  const now = new Date();
  const map: Record<string, () => Date> = {
    "!today": () => now,
    "!tomorrow": () => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
    "!nextweek": () => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
    "!monday": () => nextWeekday(now, 1),
    "!tuesday": () => nextWeekday(now, 2),
    "!wednesday": () => nextWeekday(now, 3),
    "!thursday": () => nextWeekday(now, 4),
    "!friday": () => nextWeekday(now, 5),
    "!saturday": () => nextWeekday(now, 6),
    "!sunday": () => nextWeekday(now, 0),
  };
  for (const [kw, fn] of Object.entries(map)) {
    if (text.toLowerCase().includes(kw)) {
      return { clean: text.replace(new RegExp(kw, "i"), "").trim(), date: ymd(fn()) };
    }
  }
  return { clean: text, date: null };
}

function nextWeekday(from: Date, targetDay: number): Date {
  const result = new Date(from);
  const diff = (targetDay - from.getDay() + 7) % 7 || 7;
  result.setDate(from.getDate() + diff);
  return result;
}

const STORAGE_KEY = "cain_tasks_v1";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((updated: Task[]) => {
    setTasks(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }, []);

  const addTask = useCallback((text: string, dueDate?: string | null) => {
    const { clean, date } = parseKeywords(text);
    if (!clean) return;
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: clean,
      completed: false,
      dueDate: dueDate ?? date,
      createdAt: new Date().toISOString(),
    };
    save([...tasks, task]);
  }, [tasks, save]);

  const toggleTask = useCallback((id: string) => {
    save(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [tasks, save]);

  const deleteTask = useCallback((id: string) => {
    save(tasks.filter((t) => t.id !== id));
  }, [tasks, save]);

  const updateDueDate = useCallback((id: string, date: string | null) => {
    save(tasks.map((t) => t.id === id ? { ...t, dueDate: date } : t));
  }, [tasks, save]);

  return { tasks, addTask, toggleTask, deleteTask, updateDueDate };
}

interface TaskManagerProps {
  tasks: Task[];
  addTask: (text: string, dueDate?: string | null) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function TaskManager({ tasks, addTask, toggleTask, deleteTask }: TaskManagerProps) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  function handleAdd() {
    const text = input.trim();
    if (!text) return;
    addTask(text, dueDate || null);
    setInput("");
    setDueDate("");
    setShowDatePicker(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAdd();
  }

  function formatDue(dateStr: string | null): string {
    if (!dateStr) return "";
    const t = today();
    if (dateStr === t) return "Today";
    const tomorrow = ymd(new Date(new Date().getTime() + 86400000));
    if (dateStr === tomorrow) return "Tomorrow";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function isDueUrgent(dateStr: string | null): boolean {
    if (!dateStr) return false;
    return dateStr <= today();
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-sm text-sat-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-base">📋</span> Tasks
        </h2>
        {tasks.length > 0 && (
          <span className="text-xs text-sat-gray-400 dark:text-sat-gray-500">
            {doneTasks.length}/{tasks.length} done
          </span>
        )}
      </div>

      {/* Add task row */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex gap-2 items-center bg-sat-gray-50 dark:bg-sat-gray-800 rounded-xl border border-sat-gray-200 dark:border-sat-gray-700 px-3 py-2">
          <Plus className="w-4 h-4 text-sat-gray-400 dark:text-sat-gray-500 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add task… (!today, !friday, etc.)"
            className="flex-1 bg-transparent text-sm text-sat-gray-800 dark:text-white placeholder-sat-gray-400 dark:placeholder-sat-gray-500 outline-none"
          />
          <button
            onClick={() => setShowDatePicker((v) => !v)}
            className={`text-sat-gray-400 dark:text-sat-gray-500 hover:text-sky-500 transition-colors shrink-0 ${dueDate ? "text-sky-500" : ""}`}
            title="Set due date"
          >
            <CalendarDays className="w-4 h-4" />
          </button>
        </div>
        <motion.button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-xl bg-black dark:bg-blue-600 text-white flex items-center justify-center hover:bg-sat-gray-800 dark:hover:bg-blue-700 disabled:opacity-40 transition-colors shrink-0"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {showDatePicker && (
        <div className="mb-3 flex items-center gap-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs rounded-lg border border-sat-gray-200 dark:border-sat-gray-600 bg-white dark:bg-sat-gray-700 dark:text-white px-3 py-1.5 outline-none focus:ring-1 focus:ring-sky-400"
          />
          {dueDate && (
            <button onClick={() => { setDueDate(""); setShowDatePicker(false); }} className="text-xs text-sat-gray-400 hover:text-sat-gray-600 dark:text-sat-gray-500 dark:hover:text-white transition-colors">
              Clear
            </button>
          )}
        </div>
      )}

      {/* Active tasks */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {activeTasks.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-xs text-sat-gray-400 dark:text-sat-gray-500 text-center py-4"
            >
              No active tasks. Add one above!
            </motion.p>
          )}
          {activeTasks.map((task) => (
            <TaskRow key={task.id} task={task} toggle={toggleTask} del={deleteTask} formatDue={formatDue} isDueUrgent={isDueUrgent} />
          ))}
        </AnimatePresence>
      </div>

      {/* Completed tasks toggle */}
      {doneTasks.length > 0 && (
        <div className="mt-3 border-t border-sat-gray-100 dark:border-sat-gray-700 pt-3">
          <button
            onClick={() => setShowDone((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-sat-gray-400 dark:text-sat-gray-500 hover:text-sat-gray-600 dark:hover:text-white transition-colors"
          >
            {showDone ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {doneTasks.length} completed
          </button>
          <AnimatePresence>
            {showDone && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mt-2 max-h-40 overflow-y-auto pr-1">
                  {doneTasks.map((task) => (
                    <TaskRow key={task.id} task={task} toggle={toggleTask} del={deleteTask} formatDue={formatDue} isDueUrgent={isDueUrgent} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, toggle, del, formatDue, isDueUrgent }: {
  task: Task;
  toggle: (id: string) => void;
  del: (id: string) => void;
  formatDue: (d: string | null) => string;
  isDueUrgent: (d: string | null) => boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const dueLabel = formatDue(task.dueDate);
  const urgent = isDueUrgent(task.dueDate) && !task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-2.5 group py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button onClick={() => toggle(task.id)} className="shrink-0 text-sat-gray-300 dark:text-sat-gray-600 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
        {task.completed
          ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400" />
          : <Circle className="w-4.5 h-4.5" />}
      </button>
      <span className={`flex-1 text-sm leading-snug ${task.completed ? "line-through text-sat-gray-400 dark:text-sat-gray-500" : "text-sat-gray-800 dark:text-white"}`}>
        {task.text}
      </span>
      {dueLabel && (
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${
          urgent
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            : "bg-sat-gray-100 dark:bg-sat-gray-800 text-sat-gray-500 dark:text-sat-gray-400"
        }`}>
          {dueLabel}
        </span>
      )}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => del(task.id)}
            className="shrink-0 text-sat-gray-300 dark:text-sat-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
