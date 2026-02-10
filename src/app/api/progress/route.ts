import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getLesson } from "@/lib/lessons";

const MATH_IDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "19", "20", "21"];
const READING_IDS = ["11", "12", "13", "14", "15", "16", "17", "18", "22", "23", "24"];

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
