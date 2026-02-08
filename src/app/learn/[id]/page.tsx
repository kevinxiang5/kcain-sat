import { LessonViewer } from "@/components/learn/LessonViewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LessonPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-sat-gray-600 hover:text-sat-primary mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learn
      </Link>
      <LessonViewer lessonId={params.id} />
    </div>
  );
}
