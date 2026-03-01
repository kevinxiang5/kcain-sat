/**
 * Exports PRACTICE_QUESTIONS to JSON for the Firestore seed script.
 * Run from project root: npx tsx scripts/export-questions.ts
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { PRACTICE_QUESTIONS } from "../src/lib/questions";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "questions-seed.json");

fs.writeFileSync(outPath, JSON.stringify(PRACTICE_QUESTIONS, null, 2), "utf-8");
console.log("Wrote scripts/questions-seed.json (" + PRACTICE_QUESTIONS.length + " questions)");
