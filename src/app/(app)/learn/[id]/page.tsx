import { LessonViewer } from "@/components/learn/LessonViewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLesson } from "@/lib/lessons";
import type { Metadata } from "next";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLesson(params.id);
  if (!lesson) return { title: "Lesson | kcain SAT Prep" };
  return { title: `${lesson.title} | kcain SAT Prep` };
}

export default function LessonPage({ params }: Props) {
  const lesson = getLesson(params.id);
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="flex flex-col gap-2 mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sat-gray-600 hover:text-sat-primary dark:text-sky-200 dark:hover:text-sky-400 mb-2 font-medium transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        {lesson && (
          <h1 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-sat-primary to-sat-crimson dark:from-sky-400 dark:to-sky-600 bg-clip-text text-transparent">
            {lesson.title}
          </h1>
        )}
      </div>
      <LessonViewer lessonId={params.id} />
    </div>
  );
}
