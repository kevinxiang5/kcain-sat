import type { PracticeQuestion } from "./lessons";

export interface PracticeBankQuestion extends PracticeQuestion {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
}

export const PRACTICE_QUESTIONS: PracticeBankQuestion[] = [
  // Math - Algebra
  { id: "pq1", topic: "algebra", difficulty: "easy", question: "Solve: 5x - 3 = 12", options: [{ key: "A", text: "2" }, { key: "B", text: "3" }, { key: "C", text: "4" }, { key: "D", text: "5" }], correctKey: "B", explanation: "5x = 15, so x = 3." },
  { id: "pq2", topic: "algebra", difficulty: "easy", question: "If 2(x + 4) = 18, then x = ?", options: [{ key: "A", text: "5" }, { key: "B", text: "6" }, { key: "C", text: "7" }, { key: "D", text: "8" }], correctKey: "A", explanation: "2x + 8 = 18 → 2x = 10 → x = 5." },
  { id: "pq3", topic: "algebra", difficulty: "medium", question: "For what value of k does 3x + ky = 6 have slope -2?", options: [{ key: "A", text: "-6" }, { key: "B", text: "-3/2" }, { key: "C", text: "3/2" }, { key: "D", text: "6" }], correctKey: "C", explanation: "Slope = -3/k = -2, so k = 3/2." },
  { id: "pq4", topic: "algebra", difficulty: "medium", question: "If x² = 49, what is |x|?", options: [{ key: "A", text: "7" }, { key: "B", text: "49" }, { key: "C", text: "±7" }, { key: "D", text: "7 or -7" }], correctKey: "A", explanation: "|x| is the absolute value, so |7| = |-7| = 7." },
  { id: "pq5", topic: "algebra", difficulty: "hard", question: "If a + b = 10 and ab = 21, what is a² + b²?", options: [{ key: "A", text: "58" }, { key: "B", text: "79" }, { key: "C", text: "100" }, { key: "D", text: "121" }], correctKey: "A", explanation: "(a+b)² = a²+2ab+b². So 100 = a²+b²+42, hence a²+b² = 58." },
  // Math - Quadratics
  { id: "pq6", topic: "quadratics", difficulty: "easy", question: "What are the roots of x² - 9 = 0?", options: [{ key: "A", text: "3 only" }, { key: "B", text: "-3 only" }, { key: "C", text: "3 and -3" }, { key: "D", text: "9 and -9" }], correctKey: "C", explanation: "x² = 9 → x = ±3." },
  { id: "pq7", topic: "quadratics", difficulty: "medium", question: "The vertex of y = x² - 4x + 3 is at x = ?", options: [{ key: "A", text: "1" }, { key: "B", text: "2" }, { key: "C", text: "3" }, { key: "D", text: "4" }], correctKey: "B", explanation: "Vertex x = -b/(2a) = 4/2 = 2." },
  { id: "pq8", topic: "quadratics", difficulty: "hard", question: "For x² - 6x + c = 0 to have one real root, c = ?", options: [{ key: "A", text: "6" }, { key: "B", text: "9" }, { key: "C", text: "12" }, { key: "D", text: "18" }], correctKey: "B", explanation: "Discriminant b²-4ac = 0: 36-4c = 0, so c = 9." },
  // Math - Functions
  { id: "pq9", topic: "functions", difficulty: "easy", question: "If f(x) = x² + 1, then f(-2) = ?", options: [{ key: "A", text: "-3" }, { key: "B", text: "3" }, { key: "C", text: "5" }, { key: "D", text: "7" }], correctKey: "C", explanation: "f(-2) = (-2)² + 1 = 4 + 1 = 5." },
  { id: "pq10", topic: "functions", difficulty: "medium", question: "If f(x) = 2x - 1 and g(x) = x + 3, what is f(g(2))?", options: [{ key: "A", text: "5" }, { key: "B", text: "7" }, { key: "C", text: "9" }, { key: "D", text: "11" }], correctKey: "C", explanation: "g(2)=5, f(5)=2(5)-1=9." },
  // Math - Data
  { id: "pq11", topic: "data", difficulty: "easy", question: "Mean of 4, 6, 8, 10?", options: [{ key: "A", text: "6" }, { key: "B", text: "7" }, { key: "C", text: "8" }, { key: "D", text: "9" }], correctKey: "B", explanation: "(4+6+8+10)/4 = 28/4 = 7." },
  { id: "pq12", topic: "data", difficulty: "medium", question: "Data: 2, 4, 6, 6, 10. What is the mode?", options: [{ key: "A", text: "4" }, { key: "B", text: "5.6" }, { key: "C", text: "6" }, { key: "D", text: "10" }], correctKey: "C", explanation: "Mode is the most frequent value: 6." },
  // Math - Geometry
  { id: "pq13", topic: "geometry", difficulty: "easy", question: "Area of a circle with radius 5?", options: [{ key: "A", text: "10π" }, { key: "B", text: "25π" }, { key: "C", text: "50π" }, { key: "D", text: "100π" }], correctKey: "B", explanation: "A = πr² = π(25) = 25π." },
  { id: "pq14", topic: "geometry", difficulty: "medium", question: "A 30-60-90 triangle has short leg 4. What is the hypotenuse?", options: [{ key: "A", text: "4" }, { key: "B", text: "6" }, { key: "C", text: "8" }, { key: "D", text: "12" }], correctKey: "C", explanation: "Hypotenuse = 2 × short leg = 8." },
  // Reading - Evidence
  { id: "pq15", topic: "evidence", difficulty: "easy", question: "The best evidence for an answer typically:", options: [{ key: "A", text: "Restates the question" }, { key: "B", text: "Directly supports the claim" }, { key: "C", text: "Is the longest sentence" }, { key: "D", text: "Uses emotional language" }], correctKey: "B", explanation: "Evidence must directly support your answer choice." },
  { id: "pq16", topic: "evidence", difficulty: "medium", question: "Paired evidence questions on the SAT often:", options: [{ key: "A", text: "Have no wrong answers" }, { key: "B", text: "Link back to your previous answer" }, { key: "C", text: "Require outside knowledge" }, { key: "D", text: "Test vocabulary only" }], correctKey: "B", explanation: "Evidence must support the answer you chose in the prior question." },
  // Reading - Words in Context
  { id: "pq17", topic: "words", difficulty: "easy", question: "In 'a fleeting moment,' fleeting means:", options: [{ key: "A", text: "lasting" }, { key: "B", text: "brief" }, { key: "C", text: "bright" }, { key: "D", text: "slow" }], correctKey: "B", explanation: "Fleeting means short-lived or brief." },
  { id: "pq18", topic: "words", difficulty: "medium", question: "In 'her words were equivocal,' equivocal means:", options: [{ key: "A", text: "clear" }, { key: "B", text: "ambiguous" }, { key: "C", text: "harsh" }, { key: "D", text: "kind" }], correctKey: "B", explanation: "Equivocal means ambiguous or open to multiple interpretations." },
  // Grammar
  { id: "pq19", topic: "grammar", difficulty: "easy", question: "Which is correct? 'Neither John nor his friends ___ going.'", options: [{ key: "A", text: "is" }, { key: "B", text: "are" }, { key: "C", text: "was" }, { key: "D", text: "were" }], correctKey: "B", explanation: "With 'nor,' the verb agrees with the closer subject: 'friends' is plural, so 'are.'" },
  { id: "pq20", topic: "grammar", difficulty: "medium", question: "Which fixes the run-on? 'She ran fast she won the race.'", options: [{ key: "A", text: "She ran fast, she won the race." }, { key: "B", text: "She ran fast; she won the race." }, { key: "C", text: "She ran fast and she won the race." }, { key: "D", text: "Both B and C" }], correctKey: "D", explanation: "Semicolon or conjunction both fix the run-on." },
  // More Math
  { id: "pq21", topic: "algebra", difficulty: "easy", question: "Simplify: 3(x - 4) + 2x", options: [{ key: "A", text: "5x - 12" }, { key: "B", text: "5x - 4" }, { key: "C", text: "6x - 12" }, { key: "D", text: "6x - 4" }], correctKey: "A", explanation: "3x - 12 + 2x = 5x - 12." },
  { id: "pq22", topic: "algebra", difficulty: "medium", question: "If 2^x = 8, then x = ?", options: [{ key: "A", text: "2" }, { key: "B", text: "3" }, { key: "C", text: "4" }, { key: "D", text: "8" }], correctKey: "B", explanation: "8 = 2³, so x = 3." },
  { id: "pq23", topic: "algebra", difficulty: "medium", question: "Solve |2x - 4| = 10", options: [{ key: "A", text: "x = 7 only" }, { key: "B", text: "x = -3 only" }, { key: "C", text: "x = 7 or x = -3" }, { key: "D", text: "No solution" }], correctKey: "C", explanation: "2x-4=10 → x=7; 2x-4=-10 → x=-3." },
  { id: "pq24", topic: "quadratics", difficulty: "easy", question: "(x + 5)(x - 5) = ?", options: [{ key: "A", text: "x² - 25" }, { key: "B", text: "x² + 25" }, { key: "C", text: "x² - 10" }, { key: "D", text: "x² + 10x - 25" }], correctKey: "A", explanation: "Difference of squares: (x+5)(x-5) = x² - 25." },
  { id: "pq25", topic: "quadratics", difficulty: "hard", question: "For x² + bx + 16 to be a perfect square, b = ?", options: [{ key: "A", text: "4" }, { key: "B", text: "8" }, { key: "C", text: "±8" }, { key: "D", text: "±4" }], correctKey: "C", explanation: "(x±4)² = x² ± 8x + 16, so b = ±8." },
  { id: "pq26", topic: "geometry", difficulty: "easy", question: "Perimeter of a square with side 7?", options: [{ key: "A", text: "14" }, { key: "B", text: "28" }, { key: "C", text: "49" }, { key: "D", text: "56" }], correctKey: "B", explanation: "P = 4s = 4(7) = 28." },
  { id: "pq27", topic: "geometry", difficulty: "medium", question: "Volume of a cylinder with r=3, h=4?", options: [{ key: "A", text: "12π" }, { key: "B", text: "24π" }, { key: "C", text: "36π" }, { key: "D", text: "48π" }], correctKey: "C", explanation: "V = πr²h = π(9)(4) = 36π." },
  { id: "pq28", topic: "data", difficulty: "hard", question: "If the mean of 5 numbers is 20 and four are 15, 20, 25, 20, the fifth is:", options: [{ key: "A", text: "15" }, { key: "B", text: "20" }, { key: "C", text: "25" }, { key: "D", text: "30" }], correctKey: "B", explanation: "Sum = 100, four sum to 80, so fifth = 20." },
  { id: "pq29", topic: "reading", difficulty: "medium", question: "The main purpose of an argumentative passage is to:", options: [{ key: "A", text: "Entertain" }, { key: "B", text: "Persuade" }, { key: "C", text: "Describe" }, { key: "D", text: "Narrate" }], correctKey: "B", explanation: "Argumentative writing aims to persuade." },
  { id: "pq30", topic: "transitions", difficulty: "easy", question: "Which shows addition? The experiment failed. ___, we learned from it.", options: [{ key: "A", text: "However" }, { key: "B", text: "Therefore" }, { key: "C", text: "Moreover" }, { key: "D", text: "Consequently" }], correctKey: "C", explanation: "Moreover adds related information." },
];

export function getQuestionsByTopic(topic: string): PracticeBankQuestion[] {
  return PRACTICE_QUESTIONS.filter((q) => q.topic === topic);
}

export function getRandomQuestions(count: number, topic?: string): PracticeBankQuestion[] {
  let pool = topic ? getQuestionsByTopic(topic) : [...PRACTICE_QUESTIONS];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
