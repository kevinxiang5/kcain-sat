import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getLesson } from "@/lib/lessons";

const MATH_IDS = ["1", "2", "3", "R1", "4", "5", "6", "R2", "7", "8", "9", "10", "R3", "19", "20", "21", "R4", "25", "26", "27", "28", "29", "35", "36", "37", "38", "39", "45", "46", "47", "48", "49", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64"];
const READING_IDS = ["11", "12", "13", "R5", "14", "15", "16", "R6", "17", "18", "22", "23", "24", "R7", "30", "31", "32", "33", "34", "40", "41", "42", "43", "44", "50", "51", "52", "53", "54", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74"];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ totalXP: 0, completedLessonIds: [], streak: 0, mathCompleted: 0, readingCompleted: 0, lastCompleted: [] });
  }

  const userId = session.user.id as string;

  const [xpRecords, streakRow] = await Promise.all([
    prisma.xPRecord.findMany({ where: { userId, source: "lesson" }, orderBy: { createdAt: "desc" } }),
    prisma.streak.findUnique({ where: { userId } }),
  ]);

  const totalXP = (await prisma.xPRecord.aggregate({ where: { userId }, _sum: { amount: true } }))._sum.amount ?? 0;
  const completedLessonIds = xpRecords.map((r) => r.reference).filter(Boolean) as string[];
  const mathCompleted = completedLessonIds.filter((id) => MATH_IDS.includes(id)).length;
  const readingCompleted = completedLessonIds.filter((id) => READING_IDS.includes(id)).length;
  const lastCompleted = xpRecords.slice(0, 5).map((r) => {
    const lesson = getLesson(r.reference ?? "");
    return { lessonId: r.reference, title: lesson?.title ?? "Lesson", completedAt: r.createdAt };
  });

  return NextResponse.json({
    totalXP,
    completedLessonIds,
    streak: streakRow?.currentStreak ?? 0,
    mathCompleted,
    readingCompleted,
    lastCompleted,
  });
}
