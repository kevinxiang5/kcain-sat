import { NextRequest, NextResponse } from "next/server";

const CB_LIST =
  "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions";
const CB_QUESTION =
  "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question";
const SAT_ID = 99;

const DOMAINS: Record<string, string[]> = {
  rw: ["INI", "CAS", "EOI", "SEC"],
  math: ["H", "P", "Q", "S"],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function listDomain(domain: string): Promise<Record<string, unknown>[]> {
  try {
    const r = await fetch(CB_LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ asmtEventId: SAT_ID, test: 2, domain }),
      signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) return [];
    const d = await r.json();
    if (Array.isArray(d)) return d as Record<string, unknown>[];
    if (d && Array.isArray(d.data)) return d.data as Record<string, unknown>[];
    return [];
  } catch {
    return [];
  }
}

async function fetchContent(id: string): Promise<Record<string, unknown> | null> {
  try {
    const r = await fetch(CB_QUESTION, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ external_id: id }),
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return null;
    const d = await r.json();
    const content = d?.data ?? d;
    return typeof content === "object" && content !== null
      ? (content as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const section = sp.get("section") === "math" ? "math" : "rw";
  const isM2 = sp.get("module") === "2";
  const harder = sp.get("harder") === "true";
  const excludeIds = new Set<string>(
    sp.get("excludeIds") ? (JSON.parse(sp.get("excludeIds")!) as string[]) : []
  );

  const domains = DOMAINS[section];
  const target = section === "math" ? 22 : 27;

  // Difficulty ratios per module type
  let eR: number, hR: number;
  if (!isM2) {
    eR = 0.33;
    hR = 0.22;
  } else if (harder) {
    eR = 0.10;
    hR = 0.60;
  } else {
    eR = 0.40;
    hR = 0.20;
  }
  const eN = Math.round(target * eR);
  const hN = Math.round(target * hR);
  const mN = target - eN - hN;

  // Fetch all domain lists in parallel
  const lists = await Promise.all(domains.map(listDomain));
  const pool = lists
    .flat()
    .filter(
      (q) =>
        !excludeIds.has(String(q.questionId ?? "")) &&
        !excludeIds.has(String(q.external_id ?? ""))
    );

  const byDiff = {
    E: shuffle(pool.filter((q) => q.difficulty === "E")),
    M: shuffle(pool.filter((q) => q.difficulty === "M")),
    H: shuffle(pool.filter((q) => q.difficulty === "H")),
  };

  const primary = [
    ...byDiff.E.slice(0, eN),
    ...byDiff.M.slice(0, mN),
    ...byDiff.H.slice(0, hN),
  ];

  // Fill any gap from the remaining pool if we didn't hit the target
  const usedSet = new Set(primary.map((q) => q.questionId));
  const filler = shuffle(pool.filter((q) => !usedSet.has(q.questionId))).slice(
    0,
    Math.max(0, target - primary.length)
  );
  const selected = shuffle([...primary, ...filler]);

  // Fetch full question content in parallel
  const settled = await Promise.allSettled(
    selected.map(async (meta) => {
      const extId = String(meta.external_id || meta.questionId || "");
      if (!extId) return null;
      const c = await fetchContent(extId);
      if (!c || !c.stem) return null;

      const optRaw = c.answerOptions as Record<string, string> | null | undefined;
      const answerOptions = optRaw
        ? Object.entries(optRaw)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, text]) => ({ key, text }))
        : undefined;

      const rawAns = c.correct_answer;
      const correctAnswer: string[] = Array.isArray(rawAns)
        ? (rawAns as string[])
        : rawAns != null
        ? [String(rawAns)]
        : [];

      return {
        id: String(meta.questionId || extId),
        externalId: extId,
        difficulty: String(meta.difficulty || "M"),
        skill_desc: String(meta.skill_desc || ""),
        domain: section,
        type: typeof c.type === "string" ? c.type.toLowerCase() : "mcq",
        stem: c.stem as string,
        stimulus: c.stimulus ? (c.stimulus as string) : undefined,
        answerOptions,
        correctAnswer,
        rationale: c.rationale ? (c.rationale as string) : undefined,
      };
    })
  );

  const questions = settled
    .filter((r) => r.status === "fulfilled" && r.value != null)
    .map((r) => (r as PromiseFulfilledResult<unknown>).value);

  return NextResponse.json({ success: true, questions, count: questions.length });
}
