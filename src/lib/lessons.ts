export interface ContentBlock {
  type: "heading" | "text" | "example" | "formula" | "tip";
  content: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface LessonData {
  id: string;
  title: string;
  content: ContentBlock[];
  question: PracticeQuestion;
  xpReward: number;
}

export const LESSONS: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "Linear Equations",
    xpReward: 10,
    content: [
      { type: "heading", content: "Linear Equations Basics" },
      { type: "text", content: "A linear equation has the form y = mx + b. The variable has no exponent (or exponent of 1). To solve, isolate the variable using inverse operations: undo addition with subtraction, multiplication with division." },
      { type: "example", content: "Example: Solve 2x + 5 = 13" },
      { type: "formula", content: "2x + 5 = 13 → 2x = 8 → x = 4" },
      { type: "tip", content: "SAT TIP: When stuck, plug answer choices back in. Start with B or C—they're correct more often than A or D." },
    ],
    question: {
      id: "q1",
      question: "If 3x + 7 = 22, what is the value of x?",
      options: [{ key: "A", text: "3" }, { key: "B", text: "4" }, { key: "C", text: "5" }, { key: "D", text: "6" }],
      correctKey: "C",
      explanation: "Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.",
    },
  },
  "2": {
    id: "2",
    title: "Systems of Equations",
    xpReward: 15,
    content: [
      { type: "heading", content: "Solving Systems" },
      { type: "text", content: "A system has two or more equations with the same variables. Solutions satisfy all equations. Use substitution or elimination." },
      { type: "example", content: "Substitution: If y = 2x and x + y = 9, substitute: x + 2x = 9 → 3x = 9 → x = 3" },
      { type: "formula", content: "Elimination: Add or subtract equations to cancel a variable" },
      { type: "tip", content: "SAT TIP: When you solve for one variable, plug it back into the original equation to get the other. Always verify (x,y) satisfies BOTH equations." },
    ],
    question: {
      id: "q2",
      question: "If 2x + y = 10 and x - y = 2, what is x?",
      options: [{ key: "A", text: "2" }, { key: "B", text: "3" }, { key: "C", text: "4" }, { key: "D", text: "5" }],
      correctKey: "C",
      explanation: "Add the equations: 3x = 12, so x = 4.",
    },
  },
  "3": {
    id: "3",
    title: "Quadratic Functions",
    xpReward: 15,
    content: [
      { type: "heading", content: "Quadratics: y = ax² + bx + c" },
      { type: "text", content: "Quadratic functions graph as parabolas. The vertex is at x = -b/(2a). Solve ax² + bx + c = 0 using factoring or the quadratic formula." },
      { type: "formula", content: "x = (-b ± √(b² - 4ac)) / 2a" },
      { type: "tip", content: "SAT TIP: Try factoring first—it's faster. Look for (x ± a)(x ± b). If it doesn't factor, use the quadratic formula." },
    ],
    question: {
      id: "q3",
      question: "For x² - 5x + 6 = 0, which is a solution?",
      options: [{ key: "A", text: "1" }, { key: "B", text: "2" }, { key: "C", text: "4" }, { key: "D", text: "5" }],
      correctKey: "B",
      explanation: "Factor: (x-2)(x-3) = 0. Solutions are x = 2 and x = 3.",
    },
  },
  "4": {
    id: "4",
    title: "Exponential Functions",
    xpReward: 15,
    content: [
      { type: "heading", content: "Exponential Growth & Decay" },
      { type: "text", content: "Exponential form: y = a·b^x. When b > 1, growth; when 0 < b < 1, decay. Doubling time and half-life use exponentials." },
      { type: "example", content: "y = 100(2)^x doubles every time x increases by 1" },
      { type: "tip", content: "SAT TIP: For doubling/halving, use the rule: after n periods, amount = initial × 2^n or × (1/2)^n. Watch for units—is time in years or months?" },
    ],
    question: {
      id: "q4",
      question: "If a population doubles every 3 years and starts at 500, what is it after 6 years?",
      options: [{ key: "A", text: "1,000" }, { key: "B", text: "1,500" }, { key: "C", text: "2,000" }, { key: "D", text: "2,500" }],
      correctKey: "C",
      explanation: "Doubles at 3 years (1000) and again at 6 years (2000).",
    },
  },
  "5": {
    id: "5",
    title: "Linear Inequalities",
    xpReward: 12,
    content: [
      { type: "heading", content: "Solving Inequalities" },
      { type: "text", content: "Solve like equations, but flipping the inequality when multiplying or dividing by a negative number." },
      { type: "example", content: "-2x > 6 → x < -3 (flip because we divided by -2)" },
      { type: "tip", content: "SAT TIP: Flip the sign only when multiplying or dividing by a negative. Don't flip when adding or subtracting. Graph solutions on a number line to check." },
    ],
    question: {
      id: "q5",
      question: "For -3x + 6 ≥ 12, which value satisfies the inequality?",
      options: [{ key: "A", text: "-1" }, { key: "B", text: "0" }, { key: "C", text: "-2" }, { key: "D", text: "1" }],
      correctKey: "C",
      explanation: "-3x ≥ 6 → x ≤ -2. Only -2 satisfies.",
    },
  },
  "6": {
    id: "6",
    title: "Functions & Graphs",
    xpReward: 15,
    content: [
      { type: "heading", content: "Function Notation" },
      { type: "text", content: "f(x) means output when input is x. Domain = allowed inputs; range = possible outputs. A vertical line test checks if a graph is a function." },
      { type: "tip", content: "SAT TIP: f(g(x)) means plug g(x) into f. Work inside out: find g(x) first, then f of that result. For domain, exclude values that make denominators zero or square roots negative." },
    ],
    question: {
      id: "q6",
      question: "If f(x) = 2x - 3, what is f(5)?",
      options: [{ key: "A", text: "5" }, { key: "B", text: "7" }, { key: "C", text: "10" }, { key: "D", text: "13" }],
      correctKey: "B",
      explanation: "f(5) = 2(5) - 3 = 10 - 3 = 7.",
    },
  },
  "7": {
    id: "7",
    title: "Data Analysis",
    xpReward: 15,
    content: [
      { type: "heading", content: "Mean, Median, Mode" },
      { type: "text", content: "Mean = sum/count. Median = middle value when sorted. Mode = most frequent. Outliers affect mean more than median." },
      { type: "tip", content: "SAT TIP: If adding a value changes the mean, use: new mean = (old sum + new value) / (n + 1). For median with even count, average the two middle values." },
    ],
    question: {
      id: "q7",
      question: "Data: 2, 4, 4, 6, 8. What is the median?",
      options: [{ key: "A", text: "2" }, { key: "B", text: "4" }, { key: "C", text: "5" }, { key: "D", text: "6" }],
      correctKey: "B",
      explanation: "Middle value when sorted is 4.",
    },
  },
  "8": {
    id: "8",
    title: "Geometry: Area & Perimeter",
    xpReward: 12,
    content: [
      { type: "heading", content: "Shapes & Formulas" },
      { type: "text", content: "Rectangle: A = lw, P = 2l + 2w. Triangle: A = ½bh. Circle: A = πr², C = 2πr. Trapezoid: A = ½(b₁+b₂)h" },
      { type: "tip", content: "SAT TIP: Circle formulas use r, not d. If given diameter, halve it first. Similar shapes have proportional sides—set up ratios to find unknowns." },
    ],
    question: {
      id: "q8",
      question: "A rectangle has length 8 and width 5. What is its area?",
      options: [{ key: "A", text: "13" }, { key: "B", text: "26" }, { key: "C", text: "40" }, { key: "D", text: "80" }],
      correctKey: "C",
      explanation: "Area = length × width = 8 × 5 = 40.",
    },
  },
  "9": {
    id: "9",
    title: "Pythagorean Theorem",
    xpReward: 12,
    content: [
      { type: "heading", content: "Right Triangles" },
      { type: "text", content: "For right triangles: a² + b² = c², where c is the hypotenuse. Use to find missing sides." },
      { type: "formula", content: "a² + b² = c²" },
      { type: "tip", content: "SAT TIP: Memorize 3-4-5 and 5-12-13 right triangles—they appear often. For 30-60-90: sides are x, x√3, 2x. For 45-45-90: sides are x, x, x√2." },
    ],
    question: {
      id: "q9",
      question: "A right triangle has legs 3 and 4. What is the hypotenuse?",
      options: [{ key: "A", text: "5" }, { key: "B", text: "6" }, { key: "C", text: "7" }, { key: "D", text: "12" }],
      correctKey: "A",
      explanation: "3² + 4² = 9 + 16 = 25 = 5², so c = 5.",
    },
  },
  "10": {
    id: "10",
    title: "Polynomials",
    xpReward: 15,
    content: [
      { type: "heading", content: "Adding & Multiplying Polynomials" },
      { type: "text", content: "Combine like terms. (a+b)(a-b) = a² - b². (a+b)² = a² + 2ab + b². (a-b)² = a² - 2ab + b²." },
      { type: "tip", content: "SAT TIP: Difference of squares: (x+a)(x-a) = x² - a². Perfect squares: (x±a)² = x² ± 2ax + a². FOIL carefully—(a+b)² ≠ a² + b²!" },
    ],
    question: {
      id: "q10",
      question: "What is (x+3)(x-3)?",
      options: [{ key: "A", text: "x² - 9" }, { key: "B", text: "x² + 9" }, { key: "C", text: "x² - 6" }, { key: "D", text: "x² + 6x - 9" }],
      correctKey: "A",
      explanation: "Difference of squares: (x+3)(x-3) = x² - 9.",
    },
  },
  "11": {
    id: "11",
    title: "Evidence-Based Reading",
    xpReward: 10,
    content: [
      { type: "heading", content: "Finding Evidence" },
      { type: "text", content: "SAT questions often ask which line best supports an answer. The evidence must be directly stated or clearly implied in the passage." },
      { type: "tip", content: "SAT TIP: Answer the evidence question second—pick your answer to the main question first, then find the line that proves it. Wrong evidence choices often sound relevant but don't actually support your answer." },
    ],
    question: {
      id: "q11",
      question: "When asked for evidence, you should choose the option that:",
      options: [
        { key: "A", text: "Sounds most impressive" },
        { key: "B", text: "Directly supports your previous answer" },
        { key: "C", text: "Is the longest quote" },
        { key: "D", text: "Appears first in the passage" },
      ],
      correctKey: "B",
      explanation: "Evidence must directly and clearly support your answer.",
    },
  },
  "12": {
    id: "12",
    title: "Words in Context",
    xpReward: 15,
    content: [
      { type: "heading", content: "Vocabulary in Context" },
      { type: "text", content: "Don't pick the most common meaning. Use context—what makes sense in the sentence? Replace the word with each choice and see which fits." },
      { type: "tip", content: "SAT TIP: Cover the word and predict what would go in the blank. Then match to the choices. The SAT tests how words work in context, not dictionary definitions." },
    ],
    question: {
      id: "q12",
      question: "In 'the argument was sound,' 'sound' most likely means:",
      options: [{ key: "A", text: "noise" }, { key: "B", text: "solid or valid" }, { key: "C", text: "to measure depth" }, { key: "D", text: "to make a noise" }],
      correctKey: "B",
      explanation: "In this context, 'sound' means logical or valid.",
    },
  },
  "13": {
    id: "13",
    title: "Standard Conventions",
    xpReward: 15,
    content: [
      { type: "heading", content: "Grammar Rules" },
      { type: "text", content: "Subject-verb agreement, pronoun clarity, parallel structure, and punctuation. The shortest correct answer is often right." },
      { type: "tip", content: "SAT TIP: 'NO CHANGE' is correct about 25% of the time—don't second-guess yourself. If multiple choices are grammatically correct, pick the shortest one. Watch for subject-verb agreement: phrases like 'each of the students' take a singular verb." },
    ],
    question: {
      id: "q13",
      question: "Which is correct?",
      options: [
        { key: "A", text: "Each of the students have a book." },
        { key: "B", text: "Each of the students has a book." },
        { key: "C", text: "Each of the students having a book." },
        { key: "D", text: "Each of the students got a book." },
      ],
      correctKey: "B",
      explanation: "'Each' is singular, so use 'has' not 'have'.",
    },
  },
  "14": {
    id: "14",
    title: "Expression of Ideas",
    xpReward: 15,
    content: [
      { type: "heading", content: "Clarity & Conciseness" },
      { type: "text", content: "SAT rewards clear, concise writing. Avoid redundancy. Put the main idea first. Transitions should connect ideas logically." },
    ],
    question: {
      id: "q14",
      question: "Which revision is most concise? Original: 'Due to the fact that it was raining'",
      options: [
        { key: "A", text: "Due to the fact that it was raining" },
        { key: "B", text: "Because it was raining" },
        { key: "C", text: "On account of the rain" },
        { key: "D", text: "As a result of rain falling" },
      ],
      correctKey: "B",
      explanation: "'Because' is the clearest and most concise.",
    },
  },
  "15": {
    id: "15",
    title: "Main Idea & Purpose",
    xpReward: 12,
    content: [
      { type: "heading", content: "Central Idea" },
      { type: "text", content: "The main idea is what the passage is mostly about. Author's purpose: inform, persuade, or entertain. Look at the overall structure." },
    ],
    question: {
      id: "q15",
      question: "The main idea of a passage is best found by:",
      options: [
        { key: "A", text: "The first sentence only" },
        { key: "B", text: "A detail from the middle" },
        { key: "C", text: "Synthesizing the whole passage" },
        { key: "D", text: "The last sentence only" },
      ],
      correctKey: "C",
      explanation: "Main idea emerges from the entire passage.",
    },
  },
  "16": {
    id: "16",
    title: "Rhetorical Analysis",
    xpReward: 15,
    content: [
      { type: "heading", content: "Author's Choices" },
      { type: "text", content: "Why did the author use this word, structure, or example? Consider tone, audience, and effect on the reader." },
    ],
    question: {
      id: "q16",
      question: "Rhetorical analysis questions ask you to:",
      options: [
        { key: "A", text: "Summarize the passage" },
        { key: "B", text: "Explain why the author made specific choices" },
        { key: "C", text: "Correct grammar errors" },
        { key: "D", text: "Define vocabulary" },
      ],
      correctKey: "B",
      explanation: "Rhetorical analysis examines author's deliberate choices.",
    },
  },
  "17": {
    id: "17",
    title: "Command of Evidence",
    xpReward: 12,
    content: [
      { type: "heading", content: "Supporting Claims" },
      { type: "text", content: "Claims need evidence. Evidence must be relevant and sufficient. Avoid options that are too broad or too narrow for the claim." },
    ],
    question: {
      id: "q17",
      question: "The best evidence for a claim is:",
      options: [
        { key: "A", text: "The most dramatic statistic" },
        { key: "B", text: "Relevant and directly supports the claim" },
        { key: "C", text: "The longest quote" },
        { key: "D", text: "From an emotional passage" },
      ],
      correctKey: "B",
      explanation: "Evidence must be relevant and directly support the claim.",
    },
  },
  "18": {
    id: "18",
    title: "Transitions",
    xpReward: 12,
    content: [
      { type: "heading", content: "Logical Transitions" },
      { type: "text", content: "Transitions show relationships: contrast (however), cause (therefore), addition (moreover), example (for instance). Read the sentences before and after the blank." },
    ],
    question: {
      id: "q18",
      question: "Which transition shows contrast?",
      options: [{ key: "A", text: "Furthermore" }, { key: "B", text: "Therefore" }, { key: "C", text: "However" }, { key: "D", text: "Additionally" }],
      correctKey: "C",
      explanation: "'However' indicates contrast or opposition.",
    },
  },
  "19": {
    id: "19",
    title: "Rational Expressions",
    xpReward: 15,
    content: [
      { type: "heading", content: "Simplifying & Operating on Rationals" },
      { type: "text", content: "Rational expressions are fractions with polynomials. Factor numerator and denominator, cancel common factors. To add/subtract, find LCD." },
      { type: "tip", content: "SAT TIP: Factor first—often the answer is in factored form. Watch for restrictions: denominator ≠ 0." },
    ],
    question: {
      id: "q19",
      question: "Simplify: (x² - 4) / (x - 2)",
      options: [{ key: "A", text: "x - 2" }, { key: "B", text: "x + 2" }, { key: "C", text: "x² - 2" }, { key: "D", text: "(x-2)(x+2)" }],
      correctKey: "B",
      explanation: "x² - 4 = (x-2)(x+2). Cancel (x-2): x + 2.",
    },
  },
  "20": {
    id: "20",
    title: "Radicals & Exponents",
    xpReward: 15,
    content: [
      { type: "heading", content: "Rules of Exponents & Radicals" },
      { type: "text", content: "√x = x^(1/2). x^a · x^b = x^(a+b). (x^a)^b = x^(ab). √(ab) = √a · √b." },
      { type: "tip", content: "SAT TIP: Convert radicals to fractional exponents when combining. √(x²) = |x|, not always x." },
    ],
    question: {
      id: "q20",
      question: "√(x²) when x < 0 equals:",
      options: [{ key: "A", text: "x" }, { key: "B", text: "-x" }, { key: "C", text: "x²" }, { key: "D", text: "-x²" }],
      correctKey: "B",
      explanation: "√(x²) = |x|. When x < 0, |x| = -x.",
    },
  },
  "21": {
    id: "21",
    title: "Sequence & Series",
    xpReward: 12,
    content: [
      { type: "heading", content: "Arithmetic & Geometric Sequences" },
      { type: "text", content: "Arithmetic: a_n = a_1 + (n-1)d. Geometric: a_n = a_1 · r^(n-1). Sum of first n terms: arithmetic S_n = n(a_1+a_n)/2." },
      { type: "tip", content: "SAT TIP: Find the pattern first. Is the difference constant (arithmetic) or ratio constant (geometric)?" },
    ],
    question: {
      id: "q21",
      question: "In 3, 7, 11, 15..., what is the common difference?",
      options: [{ key: "A", text: "2" }, { key: "B", text: "3" }, { key: "C", text: "4" }, { key: "D", text: "5" }],
      correctKey: "C",
      explanation: "7-3 = 11-7 = 15-11 = 4.",
    },
  },
  "22": {
    id: "22",
    title: "Sentence Boundaries",
    xpReward: 12,
    content: [
      { type: "heading", content: "Run-ons, Fragments & Comma Splices" },
      { type: "text", content: "A complete sentence needs subject + verb. Run-on: two sentences joined without punctuation. Fragment: incomplete thought. Comma splice: two sentences joined by comma only." },
      { type: "tip", content: "SAT TIP: Fix with period, semicolon, or conjunction. Read the sentence aloud to hear the break." },
    ],
    question: {
      id: "q22",
      question: "Which fixes a comma splice?",
      options: [{ key: "A", text: "Add a comma" }, { key: "B", text: "Use a semicolon" }, { key: "C", text: "Remove the comma" }, { key: "D", text: "Add an adjective" }],
      correctKey: "B",
      explanation: "Semicolon correctly joins two independent clauses.",
    },
  },
  "23": {
    id: "23",
    title: "Logical Comparisons",
    xpReward: 12,
    content: [
      { type: "heading", content: "Comparing Like Things" },
      { type: "text", content: "Compare apples to apples. 'Faster than any runner' is wrong—compare to 'any other runner.' Avoid illogical or ambiguous comparisons." },
      { type: "tip", content: "SAT TIP: The thing after 'than' or 'as' must match the first thing. 'Her score was higher than his' not 'than him' when comparing scores." },
    ],
    question: {
      id: "q23",
      question: "Which is correct?",
      options: [
        { key: "A", text: "This book is better than any book." },
        { key: "B", text: "This book is better than any other book." },
        { key: "C", text: "This book is better than any books." },
        { key: "D", text: "This book is more better than any book." },
      ],
      correctKey: "B",
      explanation: "Use 'any other' to exclude the thing being compared.",
    },
  },
  "24": {
    id: "24",
    title: "SAT Reading Strategy",
    xpReward: 15,
    content: [
      { type: "heading", content: "Time Management & Approach" },
      { type: "text", content: "Read the passage first for main idea. Answer evidence questions with the main answer in mind. Use elimination—cross out wrong answers. Don't overthink." },
      { type: "tip", content: "SAT TIP: For paired questions, answer the main question first, then pick the line that proves it. Wrong answers often sound good but don't support your choice." },
    ],
    question: {
      id: "q24",
      question: "Best approach for long reading passages:",
      options: [
        { key: "A", text: "Read questions first, skim passage" },
        { key: "B", text: "Read passage for main idea, then answer" },
        { key: "C", text: "Guess and move on" },
        { key: "D", text: "Read only the first and last paragraph" },
      ],
      correctKey: "B",
      explanation: "Understanding the whole passage leads to better accuracy.",
    },
  },
};

export function getLesson(id: string): LessonData | undefined {
  return LESSONS[id];
}
