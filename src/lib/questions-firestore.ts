import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import type { PracticeBankQuestion } from "./questions";

const MATH_TOPICS = ["algebra", "quadratics", "functions", "data", "geometry"];
const READING_TOPICS = ["evidence", "words", "reading", "grammar", "transitions"];
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

function mapDocToQuestion(id: string, data: Record<string, unknown>): PracticeBankQuestion {
  return {
    id: id || (data.id as string),
    topic: (data.topic as string) || "algebra",
    difficulty: (data.difficulty as "easy" | "medium" | "hard") || "easy",
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
 */
export async function fetchQuestionsFromFirestore(
  topic: string,
  difficulty: "all" | "easy" | "medium" | "hard" | undefined,
  limitCount: number
): Promise<PracticeBankQuestion[]> {
  if (!isFirebaseConfigured()) return [];
  const db = getDb();
  if (!db) return [];

  try {
    const coll = collection(db, "questions");
    let q;

    if (topic === "math") {
      q = query(
        coll,
        where("topic", "in", MATH_TOPICS),
        ...(difficulty && difficulty !== "all" ? [where("difficulty", "==", difficulty)] : []),
        firestoreLimit(limitCount * 2)
      );
    } else if (topic === "reading") {
      q = query(
        coll,
        where("topic", "in", READING_TOPICS),
        ...(difficulty && difficulty !== "all" ? [where("difficulty", "==", difficulty)] : []),
        firestoreLimit(limitCount * 2)
      );
    } else {
      q = query(
        coll,
        where("topic", "==", topic),
        ...(difficulty && difficulty !== "all" ? [where("difficulty", "==", difficulty)] : []),
        firestoreLimit(limitCount * 2)
      );
    }

    const snapshot = await getDocs(q);
    const list: PracticeBankQuestion[] = [];
    snapshot.forEach((doc) => {
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
