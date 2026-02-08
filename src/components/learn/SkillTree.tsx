"use client";

import Link from "next/link";
import { Calculator, BookOpen, Lock, Check } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SAT_SECTIONS } from "@/lib/db";
import { LESSONS } from "@/lib/lessons";

export type SkillNodeStatus = "locked" | "available" | "completed" | "current";

export interface SkillNode {
  id: string;
  title: string;
  topic: string;
  xpReward: number;
  status: SkillNodeStatus;
  section: "math" | "reading";
  order: number;
}

// Build skill nodes from lessons - 10 Math, 8 Reading
const lessonEntries = Object.entries(LESSONS).sort(([a], [b]) => parseInt(a) - parseInt(b));
const ALL_LESSONS: SkillNode[] = [
  ...lessonEntries
    .filter(([id]) => parseInt(id) <= 10)
    .map(([id], i) => ({
      id,
      title: LESSONS[id].title,
      topic: "Math",
      xpReward: LESSONS[id].xpReward,
      status: (i === 0 ? "available" : "locked") as SkillNodeStatus,
      section: "math" as const,
      order: i + 1,
    })),
  ...lessonEntries
    .filter(([id]) => parseInt(id) >= 11)
    .map(([id], i) => ({
      id,
      title: LESSONS[id].title,
      topic: "Reading",
      xpReward: LESSONS[id].xpReward,
      status: (i === 0 ? "available" : "locked") as SkillNodeStatus,
      section: "reading" as const,
      order: i + 1,
    })),
];

const sectionIcons = {
  math: Calculator,
  reading: BookOpen,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function SkillTree() {
  const mathNodes = ALL_LESSONS.filter((n) => n.section === "math");
  const readingNodes = ALL_LESSONS.filter((n) => n.section === "reading");

  return (
    <motion.div
      className="space-y-16"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {[
        { section: "math", nodes: mathNodes, label: SAT_SECTIONS[0].name },
        { section: "reading", nodes: readingNodes, label: SAT_SECTIONS[1].name },
      ].map(({ section, nodes, label }) => {
        const Icon = sectionIcons[section as keyof typeof sectionIcons];
        return (
          <motion.div key={section} variants={item}>
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sat-primary to-sat-crimson flex items-center justify-center shadow-lg shadow-sat-primary/25"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-sat-primary to-sat-crimson bg-clip-text text-transparent">
                {label}
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
              variants={container}
            >
              {nodes.map((node, i) => (
                <SkillNode key={node.id} node={node} index={i} />
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function SkillNode({ node, index }: { node: SkillNode; index: number }) {
  const isClickable = node.status === "available" || node.status === "current";
  const content = (
    <motion.div
      className={clsx(
        "skill-node",
        node.status === "locked" && "skill-node--locked",
        node.status === "available" && "skill-node--available",
        node.status === "completed" && "skill-node--completed",
        node.status === "current" && "skill-node--current"
      )}
      variants={item}
      whileHover={isClickable ? { scale: 1.08, y: -4 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {node.status === "locked" ? (
        <Lock className="w-6 h-6" />
      ) : node.status === "completed" ? (
        <Check className="w-6 h-6" />
      ) : (
        <span className="text-sm font-bold">{node.order}</span>
      )}
    </motion.div>
  );

  const label = (
    <div className="mt-2 text-center">
      <p className="font-medium text-sm text-sat-gray-800 line-clamp-2">{node.title}</p>
      <p className="text-xs text-sat-gray-500 mt-0.5">{node.xpReward} XP</p>
    </div>
  );

  if (isClickable) {
    return (
      <Link href={`/learn/${node.id}`} className="flex flex-col items-center group">
        {content}
        {label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center cursor-not-allowed">
      {content}
      {label}
    </div>
  );
}
