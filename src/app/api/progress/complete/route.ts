import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getLesson } from "@/lib/lessons";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = await request.json();
  if (!lessonId || typeof lessonId !== "string") {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const lesson = getLesson(lessonId);
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const userId = session.user.id as string;

  const existing = await prisma.xPRecord.findFirst({
    where: { userId, source: "lesson", reference: lessonId },
  });
  if (existing) {
    return NextResponse.json({ ok: true, xpEarned: 0, alreadyCompleted: true });
  }

  await prisma.xPRecord.create({
    data: {
      userId,
      amount: lesson.xpReward,
      source: "lesson",
      reference: lessonId,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const existingStreak = await prisma.streak.findUnique({ where: { userId } });
  const lastActive = existingStreak?.lastActiveAt ? new Date(existingStreak.lastActiveAt) : null;
  const lastActiveDay = lastActive ? (() => { lastActive.setHours(0, 0, 0, 0); return lastActive.getTime(); })() : 0;
  const todayMs = today.getTime();
  const dayDiff = Math.floor((todayMs - lastActiveDay) / (24 * 60 * 60 * 1000));

  let newStreak = existingStreak?.currentStreak ?? 0;
  if (dayDiff === 0) newStreak = existingStreak?.currentStreak ?? 1;
  else if (dayDiff === 1) newStreak = (existingStreak?.currentStreak ?? 0) + 1;
  else newStreak = 1;

  const longestStreak = Math.max(newStreak, existingStreak?.longestStreak ?? 0);

  await prisma.streak.upsert({
    where: { userId },
    create: { userId, currentStreak: 1, longestStreak: 1, lastActiveAt: new Date() },
    update: { currentStreak: newStreak, longestStreak, lastActiveAt: new Date() },
  });

  return NextResponse.json({
    ok: true,
    xpEarned: lesson.xpReward,
    alreadyCompleted: false,
  });
}
