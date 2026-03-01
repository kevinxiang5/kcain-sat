import { isFirebaseConfigured, getDb } from "./firebase";
import type { PracticeBankQuestion } from "./questions";

const MATH_TOPICS = ["algebra", "quadratics", "functions", "data", "geometry", "inequalities", "exponentials", "trigonometry", "word-problems", "advanced-math"];
const READING_TOPICS = ["evidence", "words", "reading", "grammar", "transitions", "main-idea", "tone", "rhetoric", "conventions-advanced"];
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2, very_hard: 3 };

function mapDocToQuestion(id: string, data: Record<string, unknown>): PracticeBankQuestion {
  return {
    id: id || (data.id as string),
    topic: (data.topic as string) || "algebra",
    difficulty: (data.difficulty as "easy" | "medium" | "hard" | "very_hard") || "easy",
    question: (data.question as string) || "",
    options: Array.isArray(data.options)
      ? (data.options as { key: string; text: string }[])
      : [],
    correctKey: (data.correctKey as string) || "A",
    explanation: (data.explanation as string) || "",
  };
}

/**
 * Fetches practice questions from Firestore. Returns [] if Firebase is not configured or the query fails.
 * Uses dynamic import for firebase/firestore so the app builds without Firebase installed.
 */
export async function fetchQuestionsFromFirestore(
  topic: string,
  difficulty: "all" | "easy" | "medium" | "hard" | "very_hard" | undefined,
  limitCount: number
): Promise<PracticeBankQuestion[]> {
  if (!isFirebaseConfigured()) return [];
  const db = await getDb();
  if (!db) return [];

  try {
    const firestore = await import("firebase/firestore");
    const coll = firestore.collection(db as import("firebase/firestore").Firestore, "questions");
    let q;

    if (topic === "math") {
      q = firestore.query(
        coll,
        firestore.where("topic", "in", MATH_TOPICS),
        ...(difficulty && difficulty !== "all" ? [firestore.where("difficulty", "==", difficulty)] : []),
        firestore.limit(limitCount * 2)
      );
    } else if (topic === "reading") {
      q = firestore.query(
        coll,
        firestore.where("topic", "in", READING_TOPICS),
        ...(difficulty && difficulty !== "all" ? [firestore.where("difficulty", "==", difficulty)] : []),
        firestore.limit(limitCount * 2)
      );
    } else {
      q = firestore.query(
        coll,
        firestore.where("topic", "==", topic),
        ...(difficulty && difficulty !== "all" ? [firestore.where("difficulty", "==", difficulty)] : []),
        firestore.limit(limitCount * 2)
      );
    }

    const snapshot = await firestore.getDocs(q);
    const list: PracticeBankQuestion[] = [];
    snapshot.forEach((doc: { id: string; data: () => Record<string, unknown> }) => {
      list.push(mapDocToQuestion(doc.id, doc.data() as Record<string, unknown>));
    });

    const sorted = list.sort(
      (a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]
    );
    return sorted.slice(0, limitCount);
  } catch {
    return [];
  }
}
