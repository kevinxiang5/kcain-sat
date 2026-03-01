/**
 * Seeds Firestore with practice questions from scripts/questions-seed.json.
 * Prerequisite: Run "npx tsx scripts/export-questions.ts" to generate questions-seed.json.
 * Set FIREBASE_SERVICE_ACCOUNT_PATH to the path to your Firebase service account JSON.
 *
 * Run from project root:
 *   node --env-file=.env.local scripts/seed-questions-firestore.js
 * Or: set FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json && node scripts/seed-questions-firestore.js
 */
const path = require("path");
const fs = require("fs");

// Load .env.local if present (Node 20+)
try {
  require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
} catch (_) {}

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
  path.join(process.cwd(), "firebase-service-account.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    "Missing service account file. Set FIREBASE_SERVICE_ACCOUNT_PATH in .env.local to your Firebase service account JSON path, or place firebase-service-account.json in the project root."
  );
  console.error("Get it from: Firebase Console → Project settings → Service accounts → Generate new private key");
  process.exit(1);
}

const questionsPath = path.join(__dirname, "questions-seed.json");
if (!fs.existsSync(questionsPath)) {
  console.error("Missing questions-seed.json. Run: npx tsx scripts/export-questions.ts");
  process.exit(1);
}

const admin = require("firebase-admin");
const questions = require(questionsPath);

const keyPath = path.isAbsolute(serviceAccountPath) ? serviceAccountPath : path.resolve(process.cwd(), serviceAccountPath);
admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) });
const db = admin.firestore();

async function seed() {
  const coll = db.collection("questions");
  let written = 0;
  for (const q of questions) {
    await coll.doc(q.id).set({
      topic: q.topic,
      difficulty: q.difficulty,
      question: q.question,
      options: q.options,
      correctKey: q.correctKey,
      explanation: q.explanation,
    });
    written++;
    if (written % 20 === 0) console.log("Written", written, "questions...");
  }
  console.log("Done. Written", written, "questions to Firestore collection 'questions'.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
