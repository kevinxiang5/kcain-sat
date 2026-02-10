import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ totalXP: 0, completedLessonIds: [], streak: 0 });
  }

  const userId = session.user.id as string;

  const [xpRecords, streakRow] = await Promise.all([
    prisma.xPRecord.findMany({ where: { userId }, orderBy: { createdAt: "asc" } }),
    prisma.streak.findUnique({ where: { userId } }),
  ]);

  const totalXP = xpRecords.reduce((sum, r) => sum + r.amount, 0);
  const completedLessonIds = xpRecords
    .filter((r) => r.source === "lesson")
    .map((r) => r.reference)
    .filter(Boolean) as string[];

  return NextResponse.json({
    totalXP,
    completedLessonIds,
    streak: streakRow?.currentStreak ?? 0,
  });
}
