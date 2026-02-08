/**
 * Database utilities and seed helpers
 * Run `npx prisma db push` to sync schema
 * Run `npx prisma db seed` for initial data (if configured)
 */

export const SAT_SECTIONS = [
  { id: "math", name: "Math", description: "Algebra, Problem Solving & Data Analysis, Advanced Math" },
  { id: "reading", name: "Reading & Writing", description: "Craft & Structure, Information & Ideas, Standard English Conventions" },
] as const;

export const SAMPLE_TOPICS = {
  math: ["Linear Equations", "Systems of Equations", "Quadratic Functions", "Exponential Functions", "Data Analysis", "Geometry"],
  reading: ["Evidence-Based Reading", "Words in Context", "Analysis in History/Science", "Standard English Conventions", "Expression of Ideas"],
} as const;
