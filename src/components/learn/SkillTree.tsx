"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Lock, Check, Play, Star, Gift } from "lucide-react";
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

const MATH_IDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "19", "20", "21"];
const READING_IDS = ["11", "12", "13", "14", "15", "16", "17", "18", "22", "23", "24"];

function buildNodes(ids: string[], section: "math" | "reading", completedIds: Set<string>): SkillNode[] {
  let foundCurrent = false;
  return ids.map((id, i) => {
    const prevCompleted = i === 0 || completedIds.has(ids[i - 1]!);
    const completed = completedIds.has(id);
    let status: SkillNodeStatus = "locked";
    if (completed) status = "completed";
    else if (prevCompleted) {
      status = !foundCurrent ? "current" : "available";
      foundCurrent = true;
    }
    return {
      id,
      title: LESSONS[id]!.title,
      topic: section === "math" ? "Math" : "Reading",
      xpReward: LESSONS[id]!.xpReward,
      status,
      section,
      order: i + 1,
    };
  });
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function SkillTree() {
  const { data: session } = useSession();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!session) {
      setCompletedIds(new Set());
      return;
    }
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => setCompletedIds(new Set(d.completedLessonIds || [])))
      .catch(() => setCompletedIds(new Set()));
  }, [session]);

  const mathNodes = buildNodes(MATH_IDS, "math", completedIds);
  const readingNodes = buildNodes(READING_IDS, "reading", completedIds);

  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {[
        { section: "math", nodes: mathNodes, label: SAT_SECTIONS[0].name },
        { section: "reading", nodes: readingNodes, label: SAT_SECTIONS[1].name },
      ].map(({ section, nodes, label }) => (
        <motion.div key={section} variants={item} className="path-section">
          <h2 className="text-lg font-semibold text-sat-gray-700 dark:text-sat-gray-300 mb-6 pl-1">
            {label}
          </h2>
          <div className="relative flex flex-col items-center max-w-md mx-auto">
            {/* Vertical path line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 path-line"
              aria-hidden
            />
            {nodes.map((node, i) => {
              const isLeft = i % 2 === 0;
              const showReward = (i + 1) % 5 === 0 && i > 0;
              return (
                <motion.div
                  key={node.id}
                  className="relative flex items-center w-full"
                  style={{ minHeight: showReward ? 100 : 88 }}
                  variants={item}
                >
                  {showReward && (
                    <div
                      className={clsx(
                        "absolute left-1/2 -translate-x-1/2 -top-2 z-10 flex items-center justify-center w-10 h-10 rounded-full path-reward",
                        "bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-400 dark:border-amber-600"
                      )}
                    >
                      <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  )}
                  <div
                    className={clsx(
                      "flex items-center gap-4 w-full",
                      isLeft ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    <div className={clsx("flex-1", isLeft ? "text-right" : "text-left")}>
                      {(node.status === "available" || node.status === "current") && (
                        <p className="text-sm font-medium text-sat-gray-700 dark:text-sat-gray-300 line-clamp-2">
                          {node.title}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0">
                      <PathNode node={node} />
                    </div>
                    <div className={clsx("flex-1 w-0", isLeft ? "text-left" : "text-right")} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PathNode({ node }: { node: SkillNode }) {
  const isClickable = node.status === "available" || node.status === "current";

  const circleContent = (
    <motion.span
      className={clsx(
        "path-node path-node--circle",
        node.status === "locked" && "path-node--locked",
        node.status === "available" && "path-node--available",
        node.status === "completed" && "path-node--completed",
        node.status === "current" && "path-node--current"
      )}
      whileHover={isClickable ? { scale: 1.1 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {node.status === "locked" && <Lock className="w-5 h-5" />}
      {node.status === "completed" && (
        <>
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
          <span className="path-node-stars">
            <Star className="w-3 h-3 fill-white text-white" />
            <Star className="w-3 h-3 fill-white text-white" />
            <Star className="w-3 h-3 fill-white text-white" />
          </span>
        </>
      )}
      {(node.status === "available" || node.status === "current") && (
        <span className="path-node-play">
          <Play className="w-5 h-5" fill="currentColor" />
        </span>
      )}
    </motion.span>
  );

  if (isClickable) {
    return (
      <Link href={`/learn/${node.id}`} className="inline-flex flex-col items-center gap-1.5 group">
        {circleContent}
        <span className="text-xs font-semibold text-sat-primary dark:text-sky-400 group-hover:underline">
          {node.status === "current" ? "PLAY" : "Start"}
        </span>
      </Link>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-1.5 cursor-not-allowed">
      {circleContent}
      {node.status === "completed" && (
        <span className="text-xs font-medium text-sat-gray-500 dark:text-sat-gray-400">Done</span>
      )}
    </div>
  );
}
