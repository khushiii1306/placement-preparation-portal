export interface MockTestItem {
  id: string;
  title: string;
  category: 'Aptitude' | 'Coding' | 'Company-wise';
  company?: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  previousScore?: number; // e.g., 78
  previousAttemptDate?: string;
  description: string;
  topics: string[];
  iconType: 'calculator' | 'code' | 'building' | 'brain' | 'terminal';
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface MockQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal Ability' | 'Coding';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface MockTestResultData {
  testId: string;
  testTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredCount: number;
  accuracy: number; // e.g. 77.5
  scorePercentage: number; // e.g. 78
  timeTakenMinutes: number; // e.g. 42
  totalDurationMinutes: number; // e.g. 60
  categoryPerformance: {
    name: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal Ability' | 'Coding';
    percentage: number;
    correct: number;
    total: number;
  }[];
  strengths: string[];
  areasToImprove: string[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  markedForReview: Record<number, boolean>;
}

export const MOCK_TESTS_CATALOG: MockTestItem[] = [
  {
    id: 'tcs-mock-1',
    title: 'TCS Placement Mock',
    category: 'Company-wise',
    company: 'TCS',
    questionsCount: 40,
    durationMinutes: 60,
    difficulty: 'Medium',
    previousScore: 78,
    previousAttemptDate: '2 days ago',
    description: 'Complete TCS NQT style screening covering Numerical, Verbal, Reasoning and Technical MCQ logic.',
    topics: ['Numerical Ability', 'Verbal Reasoning', 'Pseudocode', 'CS Fundamentals'],
    iconType: 'building',
  },
  {
    id: 'aptitude-assessment-1',
    title: 'Aptitude Assessment',
    category: 'Aptitude',
    questionsCount: 30,
    durationMinutes: 30,
    difficulty: 'Medium',
    previousScore: 82,
    previousAttemptDate: 'Yesterday',
    description: 'Fast-paced quantitative and logical problem-solving test standard across all tier-1 IT drives.',
    topics: ['Percentages', 'Time & Work', 'Syllogisms', 'Data Interpretation'],
    iconType: 'calculator',
  },
  {
    id: 'coding-assessment-1',
    title: 'Coding Assessment',
    category: 'Coding',
    questionsCount: 5,
    durationMinutes: 45,
    difficulty: 'Medium',
    previousScore: 74,
    previousAttemptDate: 'Last week',
    description: 'Algorithmic problem-solving simulation focusing on arrays, strings, dynamic programming, and complexity.',
    topics: ['Arrays & HashMaps', 'Two Pointers', 'String Manipulation', 'Recursion'],
    iconType: 'code',
  },
  {
    id: 'infosys-sp-mock',
    title: 'Infosys Specialist Programmer Mock',
    category: 'Company-wise',
    company: 'Infosys',
    questionsCount: 40,
    durationMinutes: 60,
    difficulty: 'Medium',
    previousScore: undefined,
    description: 'Simulates the Infosys technical assessment with reasoning, pseudocode analysis, and algorithms.',
    topics: ['Mathematical Modeling', 'Pseudocode Analysis', 'Data Structures'],
    iconType: 'building',
  },
  {
    id: 'accenture-cognitive-mock',
    title: 'Accenture Cognitive & Technical Assessment',
    category: 'Company-wise',
    company: 'Accenture',
    questionsCount: 40,
    durationMinutes: 50,
    difficulty: 'Medium',
    previousScore: 80,
    previousAttemptDate: '4 days ago',
    description: 'Covers critical thinking, abstract reasoning, and core technical concepts like Cloud & Security.',
    topics: ['Abstract Reasoning', 'English Ability', 'Common Applications & MS Office'],
    iconType: 'brain',
  },
  {
    id: 'logical-reasoning-speed',
    title: 'Logical Reasoning Mastery Test',
    category: 'Aptitude',
    questionsCount: 30,
    durationMinutes: 30,
    difficulty: 'Medium',
    previousScore: 68,
    previousAttemptDate: '5 days ago',
    description: 'High-speed diagnostic for seating arrangements, blood relations, coding-decoding, and series.',
    topics: ['Seating Arrangement', 'Blood Relations', 'Direction Sense', 'Puzzles'],
    iconType: 'brain',
  },
];

// Comprehensive 40 placement-standard questions for the test
export const TCS_MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 1,
    question: 'A shopkeeper marks his goods at 25% above the cost price and allows a discount of 12% on the marked price. What is his net profit percentage?',
    options: [
      { id: 'A', text: '8%' },
      { id: 'B', text: '10%' },
      { id: 'C', text: '12%' },
      { id: 'D', text: '15%' },
    ],
    correctOption: 'B',
    explanation: 'Let CP = 100. MP = 125. Discount = 12% of 125 = 15. SP = 125 - 15 = 110. Profit = 110 - 100 = 10%.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 2,
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: [
      { id: 'A', text: '65 seconds' },
      { id: 'B', text: '89 seconds' },
      { id: 'C', text: '100 seconds' },
      { id: 'D', text: '75 seconds' },
    ],
    correctOption: 'B',
    explanation: 'Speed of train = 240 / 24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time = 890 / 10 = 89 seconds.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 3,
    question: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?',
    options: [
      { id: 'A', text: '10 minutes' },
      { id: 'B', text: '12 minutes' },
      { id: 'C', text: '15 minutes' },
      { id: 'D', text: '25 minutes' },
    ],
    correctOption: 'B',
    explanation: 'Combined rate = (1/20) + (1/30) = (3+2)/60 = 5/60 = 1/12. Time taken = 12 minutes.',
    category: 'Quantitative Aptitude',
    difficulty: 'Easy',
  },
  {
    id: 4,
    question: 'If "CODING" is encoded as "DPEJOH", how is "PLACEMENT" encoded in that same cipher?',
    options: [
      { id: 'A', text: 'QMBDFNFOU' },
      { id: 'B', text: 'QMBCEMFOU' },
      { id: 'C', text: 'RNBDFNFOU' },
      { id: 'D', text: 'QMBDFMEOU' },
    ],
    correctOption: 'A',
    explanation: 'Each letter is shifted by +1 in alphabetical order. P->Q, L->M, A->B, C->D, E->F, M->N, E->F, N->O, T->U.',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
  },
  {
    id: 5,
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: [
      { id: 'A', text: 'Brother' },
      { id: 'B', text: 'Father' },
      { id: 'C', text: 'Uncle' },
      { id: 'D', text: 'Grandfather' },
    ],
    correctOption: 'B',
    explanation: '"The only son of my mother" means Suresh himself. Therefore, the boy in the photograph is Suresh\'s son, making Suresh the Father.',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
  },
  {
    id: 6,
    question: 'Select the word that is most nearly opposite in meaning (Antonym) to "CANDID":',
    options: [
      { id: 'A', text: 'Deceitful' },
      { id: 'B', text: 'Frank' },
      { id: 'C', text: 'Blunt' },
      { id: 'D', text: 'Genuine' },
    ],
    correctOption: 'A',
    explanation: 'Candid means truthful, outspoken, and straightforward. Its antonym is deceitful, evasive, or insincere.',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 7,
    question: 'Choose the correct preposition: "The candidate was fully equipped _____ all necessary credentials for the technical interview."',
    options: [
      { id: 'A', text: 'with' },
      { id: 'B', text: 'by' },
      { id: 'C', text: 'for' },
      { id: 'D', text: 'of' },
    ],
    correctOption: 'A',
    explanation: 'The standard collocated preposition with the adjective "equipped" is "with" (e.g. equipped with tools/credentials).',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 8,
    question: 'What is the worst-case time complexity of QuickSort on an array of size n with a naive last-element pivot selection?',
    options: [
      { id: 'A', text: 'O(n log n)' },
      { id: 'B', text: 'O(n²)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(log n)' },
    ],
    correctOption: 'B',
    explanation: 'When the array is already sorted or reverse-sorted and the last element is chosen as pivot, partitions are unbalanced (size 0 and n-1), resulting in O(n²) time complexity.',
    category: 'Coding',
    difficulty: 'Medium',
  },
  {
    id: 9,
    question: 'Which data structure follows the Last In First Out (LIFO) order and is used in function recursion call stacks?',
    options: [
      { id: 'A', text: 'Stack' },
      { id: 'B', text: 'Queue' },
      { id: 'C', text: 'Linked List' },
      { id: 'D', text: 'Binary Tree' },
    ],
    correctOption: 'A',
    explanation: 'A Stack strictly obeys the Last-In-First-Out (LIFO) property and is utilized by CPU architectures for execution call frames.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 10,
    question: 'The average age of 24 students and their teacher is 15 years. If the teacher’s age is excluded, the average age decreases by 1 year. What is the teacher’s age?',
    options: [
      { id: 'A', text: '35 years' },
      { id: 'B', text: '39 years' },
      { id: 'C', text: '40 years' },
      { id: 'D', text: '42 years' },
    ],
    correctOption: 'B',
    explanation: 'Total age of 25 persons = 25 × 15 = 375. Total age of 24 students = 24 × 14 = 336. Teacher\'s age = 375 - 336 = 39 years.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 11,
    question: 'In how many different ways can the letters of the word "LEADING" be arranged so that the vowels always come together?',
    options: [
      { id: 'A', text: '360' },
      { id: 'B', text: '720' },
      { id: 'C', text: '144' },
      { id: 'D', text: '5040' },
    ],
    correctOption: 'B',
    explanation: 'Vowels: E, A, I (3 vowels). Consonants: L, D, N, G (4 consonants). Treating the 3 vowels as one single unit gives 5 entities arranged in 5! = 120 ways. The 3 vowels can be arranged among themselves in 3! = 6 ways. Total = 120 × 6 = 720 ways.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 12,
    question: 'A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times of itself at the same rate of interest?',
    options: [
      { id: 'A', text: '15 years' },
      { id: 'B', text: '10 years' },
      { id: 'C', text: '20 years' },
      { id: 'D', text: '12 years' },
    ],
    correctOption: 'A',
    explanation: 'Doubling means Interest = Principal P in 5 years. For becoming 4 times, Interest required = 3P. Since simple interest is proportional to time: Time = 3 × 5 = 15 years.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 13,
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: [
      { id: 'A', text: '95' },
      { id: 'B', text: '127' },
      { id: 'C', text: '128' },
      { id: 'D', text: '111' },
    ],
    correctOption: 'B',
    explanation: 'Each term is (previous × 2) + 1: 3×2+1=7; 7×2+1=15; 15×2+1=31; 31×2+1=63; 63×2+1=127.',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
  },
  {
    id: 14,
    question: 'Statements: Some cats are dogs. All dogs are birds. Conclusions: I. Some birds are cats. II. All birds are dogs.',
    options: [
      { id: 'A', text: 'Only conclusion I follows' },
      { id: 'B', text: 'Only conclusion II follows' },
      { id: 'C', text: 'Both I and II follow' },
      { id: 'D', text: 'Neither I nor II follows' },
    ],
    correctOption: 'A',
    explanation: 'Since Some cats are dogs and All dogs are birds, the intersection between cats and birds is non-empty, so Some birds are cats is valid. Not all birds need to be dogs.',
    category: 'Logical Reasoning',
    difficulty: 'Medium',
  },
  {
    id: 15,
    question: 'Identify the sentence with correct grammatical agreement:',
    options: [
      { id: 'A', text: 'Neither the manager nor the employees was aware of the policy change.' },
      { id: 'B', text: 'Neither the manager nor the employees were aware of the policy change.' },
      { id: 'C', text: 'Neither the manager or the employees was aware of the policy change.' },
      { id: 'D', text: 'Neither the manager nor the employees are been aware of the policy change.' },
    ],
    correctOption: 'B',
    explanation: 'With "neither... nor", the verb agrees with the closer subject ("employees", which is plural), so "were" is grammatically correct.',
    category: 'Verbal Ability',
    difficulty: 'Medium',
  },
  {
    id: 16,
    question: 'Fill in the blank: "The team’s _______ approach to debugging resulted in zero regression faults during production release."',
    options: [
      { id: 'A', text: 'meticulous' },
      { id: 'B', text: 'sporadic' },
      { id: 'C', text: 'tentative' },
      { id: 'D', text: 'precarious' },
    ],
    correctOption: 'A',
    explanation: 'Meticulous means showing great attention to detail and precision, which directly produces high-quality software with zero regressions.',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 17,
    question: 'What is the return value of evaluating the postfix expression: "6 3 + 2 * 4 -" ?',
    options: [
      { id: 'A', text: '12' },
      { id: 'B', text: '14' },
      { id: 'C', text: '16' },
      { id: 'D', text: '18' },
    ],
    correctOption: 'B',
    explanation: '6 3 + = 9; 9 2 * = 18; 18 4 - = 14.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 18,
    question: 'In object-oriented programming, what is the principle where a subclass provides a specific implementation of a method that is already defined in its superclass?',
    options: [
      { id: 'A', text: 'Method Overloading' },
      { id: 'B', text: 'Encapsulation' },
      { id: 'C', text: 'Method Overriding' },
      { id: 'D', text: 'Abstraction' },
    ],
    correctOption: 'C',
    explanation: 'Method overriding enables run-time polymorphism where a child class replaces the behavior inherited from a parent class.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 19,
    question: 'What is the sum of all natural numbers from 1 to 50 inclusive?',
    options: [
      { id: 'A', text: '1250' },
      { id: 'B', text: '1275' },
      { id: 'C', text: '1300' },
      { id: 'D', text: '1225' },
    ],
    correctOption: 'B',
    explanation: 'Formula S = n(n + 1)/2 = 50 × 51 / 2 = 25 × 51 = 1275.',
    category: 'Quantitative Aptitude',
    difficulty: 'Easy',
  },
  {
    id: 20,
    question: 'A car covers a distance of 450 km in 6 hours. What is its speed in meters per second?',
    options: [
      { id: 'A', text: '18.5 m/s' },
      { id: 'B', text: '20.83 m/s' },
      { id: 'C', text: '25 m/s' },
      { id: 'D', text: '30 m/s' },
    ],
    correctOption: 'B',
    explanation: 'Speed = 450 / 6 = 75 km/h. Converting to m/s: 75 × (5/18) = 375/18 ≈ 20.83 m/s.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 21,
    question: 'If A is 40% more efficient than B, and B alone can complete a project in 21 days, in how many days can A and B together complete the project?',
    options: [
      { id: 'A', text: '8.75 days' },
      { id: 'B', text: '9.25 days' },
      { id: 'C', text: '10 days' },
      { id: 'D', text: '12 days' },
    ],
    correctOption: 'A',
    explanation: 'B efficiency = 100 units/day. A efficiency = 140 units/day. Total work = 100 × 21 = 2100 units. Combined rate = 240 units/day. Time = 2100 / 240 = 8.75 days.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 22,
    question: 'In a code language, if 134 means "good and tasty", 478 means "see good pictures", and 729 means "pictures are faint", which digit stands for "see"?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '7' },
      { id: 'C', text: '8' },
      { id: 'D', text: '9' },
    ],
    correctOption: 'C',
    explanation: 'In 134 and 478, common digit is 4 and common word is "good". In 478 and 729, common digit is 7 and common word is "pictures". Hence, in 478, the remaining digit 8 stands for "see".',
    category: 'Logical Reasoning',
    difficulty: 'Medium',
  },
  {
    id: 23,
    question: 'Six friends A, B, C, D, E, F are sitting in a circle facing the center. E is to the left of D. C is between A and B. F is between E and A. Who is to the immediate left of B?',
    options: [
      { id: 'A', text: 'D' },
      { id: 'B', text: 'C' },
      { id: 'C', text: 'E' },
      { id: 'D', text: 'F' },
    ],
    correctOption: 'A',
    explanation: 'Working around clockwise: D -> E -> F -> A -> C -> B -> D. Facing the center, the immediate left of B is D.',
    category: 'Logical Reasoning',
    difficulty: 'Medium',
  },
  {
    id: 24,
    question: 'Choose the correct synonym for "PRAGMATIC":',
    options: [
      { id: 'A', text: 'Idealistic' },
      { id: 'B', text: 'Practical' },
      { id: 'C', text: 'Theoretical' },
      { id: 'D', text: 'Impulsive' },
    ],
    correctOption: 'B',
    explanation: 'Pragmatic describes dealing with problems sensibly and realistically in a practical way rather than by theoretical considerations.',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 25,
    question: 'Select the correctly spelled word:',
    options: [
      { id: 'A', text: 'Accomodation' },
      { id: 'B', text: 'Accommodation' },
      { id: 'C', text: 'Acommodation' },
      { id: 'D', text: 'Accommadation' },
    ],
    correctOption: 'B',
    explanation: '"Accommodation" has double \'c\' and double \'m\'.',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 26,
    question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) of n nodes?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log n)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(n log n)' },
    ],
    correctOption: 'B',
    explanation: 'In a balanced BST, tree height is log₂(n), so lookup requires at most O(log n) comparisons.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 27,
    question: 'Which of the following sorting algorithms is inherently STABLE?',
    options: [
      { id: 'A', text: 'Merge Sort' },
      { id: 'B', text: 'Quick Sort' },
      { id: 'C', text: 'Heap Sort' },
      { id: 'D', text: 'Selection Sort' },
    ],
    correctOption: 'A',
    explanation: 'Merge Sort maintains the relative order of duplicate elements because it merges left and right partitions stably using <= comparison.',
    category: 'Coding',
    difficulty: 'Medium',
  },
  {
    id: 28,
    question: 'A dice is thrown twice. What is the probability of getting a sum of 8?',
    options: [
      { id: 'A', text: '5/36' },
      { id: 'B', text: '1/6' },
      { id: 'C', text: '7/36' },
      { id: 'D', text: '1/9' },
    ],
    correctOption: 'A',
    explanation: 'Pairs giving sum 8: (2,6), (3,5), (4,4), (5,3), (6,2). That is 5 favorable outcomes out of 36 total. Probability = 5/36.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 29,
    question: 'The difference between simple interest and compound interest on Rs. 10,000 for 2 years at 10% per annum is:',
    options: [
      { id: 'A', text: 'Rs. 100' },
      { id: 'B', text: 'Rs. 150' },
      { id: 'C', text: 'Rs. 200' },
      { id: 'D', text: 'Rs. 50' },
    ],
    correctOption: 'A',
    explanation: 'Difference for 2 years = P × (R/100)² = 10,000 × (10/100)² = 10,000 × 0.01 = Rs. 100.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 30,
    question: 'Find the odd one out among the options:',
    options: [
      { id: 'A', text: 'Java' },
      { id: 'B', text: 'Python' },
      { id: 'C', text: 'Oracle SQL' },
      { id: 'D', text: 'C++' },
    ],
    correctOption: 'C',
    explanation: 'Java, Python, and C++ are general-purpose programming languages, whereas SQL is a declarative database query language.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 31,
    question: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
    options: [
      { id: 'A', text: '1/3' },
      { id: 'B', text: '1/8' },
      { id: 'C', text: '2/8' },
      { id: 'D', text: '1/16' },
    ],
    correctOption: 'B',
    explanation: 'This is a geometric progression with common ratio 1/2. Next term is (1/4) × (1/2) = 1/8.',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
  },
  {
    id: 32,
    question: 'Which of the following sentences uses the idiom "burn the midnight oil" correctly?',
    options: [
      { id: 'A', text: 'He burned the midnight oil by leaving the factory at noon.' },
      { id: 'B', text: 'She burned the midnight oil studying for her final placement coding round.' },
      { id: 'C', text: 'They burned the midnight oil by ordering takeaway for lunch.' },
      { id: 'D', text: 'The fuel engine burned the midnight oil efficiently on the expressway.' },
    ],
    correctOption: 'B',
    explanation: '"To burn the midnight oil" means to study or work late into the night.',
    category: 'Verbal Ability',
    difficulty: 'Easy',
  },
  {
    id: 33,
    question: 'What is the output of: `console.log(typeof NaN)` in JavaScript?',
    options: [
      { id: 'A', text: '"undefined"' },
      { id: 'B', text: '"number"' },
      { id: 'C', text: '"NaN"' },
      { id: 'D', text: '"object"' },
    ],
    correctOption: 'B',
    explanation: 'In JavaScript according to IEEE 754 floating point specifications, NaN represents a numeric entity indicating not-a-number, hence its typeof is "number".',
    category: 'Coding',
    difficulty: 'Medium',
  },
  {
    id: 34,
    question: 'If a clock shows 3:40, what is the acute angle between the hour hand and the minute hand?',
    options: [
      { id: 'A', text: '120°' },
      { id: 'B', text: '130°' },
      { id: 'C', text: '140°' },
      { id: 'D', text: '150°' },
    ],
    correctOption: 'B',
    explanation: 'Angle = |30H - (11/2)M| = |30(3) - (11/2)(40)| = |90 - 220| = 130°.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 35,
    question: 'Statement: "Should high school students be required to pass standardized coding tests?" Arguments: I. Yes, modern workplaces increasingly rely on digital literacy. II. No, students with humanities or arts inclinations may face unnecessary strain.',
    options: [
      { id: 'A', text: 'Only Argument I is strong' },
      { id: 'B', text: 'Only Argument II is strong' },
      { id: 'C', text: 'Both I and II are strong' },
      { id: 'D', text: 'Neither is strong' },
    ],
    correctOption: 'C',
    explanation: 'Both arguments present valid, logical perspectives regarding general workforce utility vs. academic diversity.',
    category: 'Logical Reasoning',
    difficulty: 'Medium',
  },
  {
    id: 36,
    question: 'Identify the part containing an error: "Each of the participants (A) / were rewarded (B) / with a commemorative trophy (C) / for their effort (D)."',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'B' },
      { id: 'C', text: 'C' },
      { id: 'D', text: 'D' },
    ],
    correctOption: 'B',
    explanation: '"Each" is a singular pronoun and requires the singular verb "was rewarded" rather than "were rewarded".',
    category: 'Verbal Ability',
    difficulty: 'Medium',
  },
  {
    id: 37,
    question: 'In SQL, which clause is used to filter groups created by the GROUP BY clause?',
    options: [
      { id: 'A', text: 'WHERE' },
      { id: 'B', text: 'HAVING' },
      { id: 'C', text: 'ORDER BY' },
      { id: 'D', text: 'FILTER' },
    ],
    correctOption: 'B',
    explanation: 'The HAVING clause filters aggregated groups returned by GROUP BY, while WHERE filters individual table rows prior to aggregation.',
    category: 'Coding',
    difficulty: 'Easy',
  },
  {
    id: 38,
    question: 'Which CPU scheduling algorithm gives minimum average waiting time for a set of processes known in advance?',
    options: [
      { id: 'A', text: 'First-Come First-Served (FCFS)' },
      { id: 'B', text: 'Round Robin (RR)' },
      { id: 'C', text: 'Shortest Job First (SJF)' },
      { id: 'D', text: 'Priority Scheduling' },
    ],
    correctOption: 'C',
    explanation: 'Shortest Job First (SJF) is mathematically optimal in minimizing average waiting time for a given set of processes.',
    category: 'Coding',
    difficulty: 'Medium',
  },
  {
    id: 39,
    question: 'A box contains 5 red balls, 4 green balls, and 3 blue balls. If two balls are drawn at random one after another without replacement, what is the probability that both are red?',
    options: [
      { id: 'A', text: '5/33' },
      { id: 'B', text: '5/66' },
      { id: 'C', text: '1/6' },
      { id: 'D', text: '2/11' },
    ],
    correctOption: 'A',
    explanation: 'Total balls = 12. P(First Red) = 5/12. P(Second Red) = 4/11. Total P = (5/12) × (4/11) = 20/132 = 5/33.',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
  },
  {
    id: 40,
    question: 'What is the binary representation of decimal number 43?',
    options: [
      { id: 'A', text: '101011' },
      { id: 'B', text: '101101' },
      { id: 'C', text: '110011' },
      { id: 'D', text: '101001' },
    ],
    correctOption: 'A',
    explanation: '43 = 32 + 8 + 2 + 1 = 2⁵ + 2³ + 2¹ + 2⁰ = 101011 in binary.',
    category: 'Coding',
    difficulty: 'Easy',
  },
];

// Default sample result data matching the exact figures specified by user
export const DEFAULT_MOCK_RESULT: MockTestResultData = {
  testId: 'tcs-mock-1',
  testTitle: 'TCS Placement Mock',
  totalQuestions: 40,
  correctAnswers: 31,
  incorrectAnswers: 9,
  unansweredCount: 0,
  accuracy: 77.5,
  scorePercentage: 78,
  timeTakenMinutes: 42,
  totalDurationMinutes: 60,
  categoryPerformance: [
    { name: 'Quantitative Aptitude', percentage: 82, correct: 11, total: 13 },
    { name: 'Logical Reasoning', percentage: 75, correct: 8, total: 10 },
    { name: 'Verbal Ability', percentage: 70, correct: 7, total: 10 },
    { name: 'Coding', percentage: 65, correct: 5, total: 7 },
  ],
  strengths: [
    'Speed & precision in Quantitative Arithmetic (Percentages, Time & Work)',
    'Strong Pattern Recognition and Deductive Syllogisms',
    'High accuracy in Core Data Structures (Stack, BST complexity)',
  ],
  areasToImprove: [
    'Time allocation in complex verbal reading passages and antonyms',
    'Edge-case debugging in Recursive Algorithms and QuickSort worst-cases',
    'Review Permutations & Combinations probability models',
  ],
  userAnswers: {
    1: 'B', 2: 'B', 3: 'B', 4: 'A', 5: 'B', 6: 'A', 7: 'A', 8: 'B', 9: 'A', 10: 'B',
    11: 'B', 12: 'A', 13: 'B', 14: 'A', 15: 'B', 16: 'A', 17: 'B', 18: 'C', 19: 'B', 20: 'B',
    21: 'A', 22: 'C', 23: 'A', 24: 'B', 25: 'B', 26: 'B', 27: 'A', 28: 'A', 29: 'A', 30: 'C',
    31: 'B', 32: 'B', 33: 'A', // Incorrect (was B)
    34: 'A', // Incorrect (was B)
    35: 'A', // Incorrect (was C)
    36: 'A', // Incorrect (was B)
    37: 'A', // Incorrect (was B)
    38: 'A', // Incorrect (was C)
    39: 'B', // Incorrect (was A)
    40: 'B', // Incorrect (was A)
  },
  markedForReview: { 4: true, 11: true, 28: true },
};
