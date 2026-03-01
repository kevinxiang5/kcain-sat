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

const MATH_IDS = ["1", "2", "3", "R1", "4", "5", "6", "R2", "7", "8", "9", "10", "R3", "19", "20", "21", "R4", "25", "26", "27", "28", "29", "35", "36", "37", "38", "39", "45", "46", "47", "48", "49", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64"];
const READING_IDS = ["11", "12", "13", "R5", "14", "15", "16", "R6", "17", "18", "22", "23", "24", "R7", "30", "31", "32", "33", "34", "40", "41", "42", "43", "44", "50", "51", "52", "53", "54", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74"];

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
          <div className="relative flex flex-col max-w-md mx-auto w-full" style={{ minHeight: nodes.length * 88 }}>
            {/* Snake path: zigzag through node positions */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 100 ${nodes.length * 88}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={[
                  "M 50 0",
                  ...nodes.map((_, i) => {
                    const x = i % 2 === 0 ? 25 : 75;
                    const y = 44 + i * 88;
                    return `L ${x} ${y}`;
                  }),
                ].join(" ")}
                fill="none"
                className="path-snake"
                strokeWidth="0.4"
              />
            </svg>
            {nodes.map((node, i) => {
              const isLeft = i % 2 === 0;
              const showReward = (i + 1) % 5 === 0 && i > 0;
              return (
                <motion.div
                  key={node.id}
                  className="relative grid w-full items-center gap-0 px-1"
                  style={{ gridTemplateColumns: "1fr 2fr 1fr", minHeight: showReward ? 100 : 88 }}
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
                  {/* Left zone (25%): node when isLeft */}
                  <div className="flex items-center justify-end h-full pr-1">
                    {isLeft ? <PathNode node={node} /> : null}
                  </div>
                  {/* Middle (50%): title */}
                  <div className={clsx("flex items-center h-full px-2", isLeft ? "justify-start" : "justify-end")}>
                    {(node.status === "available" || node.status === "current") && (
                      <p className={clsx("text-sm font-medium text-sat-gray-700 dark:text-sat-gray-300 line-clamp-2", isLeft ? "text-left" : "text-right")}>
                        {node.title}
                      </p>
                    )}
                  </div>
                  {/* Right zone (25%): node when !isLeft */}
                  <div className="flex items-center justify-start h-full pl-1">
                    {!isLeft ? <PathNode node={node} /> : null}
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
