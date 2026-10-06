// Initial Admin dataset for Questions, Companies, Mock Tests, Events, and Student Records

export interface AdminQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3; // 0-indexed corresponding to Option 1, 2, 3, 4
  explanation: string;
  createdDate: string;
}

export interface AdminCompany {
  id: string;
  companyName: string;
  jobRole: string;
  location: string;
  eligibility: string;
  requiredSkills: string[];
  packageCTC: string;
  deadline: string;
  applyLink: string;
  status: 'Active' | 'Upcoming' | 'Closed';
  logoColor?: string;
}

export interface AdminMockTest {
  id: string;
  testName: string;
  category: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Published' | 'Draft' | 'Unpublished';
  selectedQuestionIds: string[];
  totalAttempts?: number;
  avgScore?: number;
}

export interface AdminEvent {
  id: string;
  eventName: string;
  eventType: 'Quiz' | 'Coding Challenge' | 'Hiring Challenge';
  description: string;
  date: string;
  time: string;
  registrationDeadline: string;
  eligibility: string;
  rules: string;
  registrationLink: string;
  status: 'Published' | 'Upcoming' | 'Draft' | 'Completed';
  participantsCount?: number;
}

export interface AdminStudentRecord {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  year: string;
  overallScore: number;
  progress: number;
  rollNumber: string;
  cgpa: number;
  testsCompleted: number;
  questionsSolved: number;
  codingStreakDays: number;
  categoryPerformance: {
    quantitative: number;
    logical: number;
    verbal: number;
    coding: number;
  };
  companyReadiness: {
    tcs: number;
    infosys: number;
    amazon: number;
    accenture: number;
    cognizant: number;
  };
  recentResults: Array<{
    testName: string;
    score: number;
    totalMarks: number;
    date: string;
    accuracy: number;
    percentile: number;
  }>;
}

export const INITIAL_QUESTIONS: AdminQuestion[] = [
  {
    id: 'Q-101',
    question: 'A train 140m long is running at 60 km/hr. In how much time will it pass a platform 260m long?',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    options: ['20 seconds', '24 seconds', '28 seconds', '32 seconds'],
    correctAnswer: 1, // 24 seconds
    explanation: 'Total distance = Train length + Platform length = 140m + 260m = 400m. Speed in m/s = 60 * (5/18) = 50/3 m/s. Time = Distance / Speed = 400 / (50/3) = (400 * 3) / 50 = 24 seconds.',
    createdDate: '2026-09-01',
  },
  {
    id: 'Q-102',
    question: 'If "CODING" is encoded as "DPEJOH" in a certain code language, how will "PYTHON" be encoded?',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    options: ['QZUIPO', 'QZUJPO', 'QZVJPO', 'PZUIPO'],
    correctAnswer: 1, // QZUJPO
    explanation: 'Each letter is shifted by +1 in the alphabet forward: P->Q, Y->Z, T->U, H->I, O->P, N->O => QZUIPO? Wait: P(+1)=Q, Y(+1)=Z, T(+1)=U, H(+1)=I, O(+1)=P, N(+1)=O. Letter order: Q Z U I P O (Option 1). Option 1 is QZUIPO.',
    createdDate: '2026-09-02',
  },
  {
    id: 'Q-103',
    question: 'Choose the word that is most nearly opposite in meaning to "CANDID":',
    category: 'Verbal Ability',
    difficulty: 'Easy',
    options: ['Outspoken', 'Deceitful', 'Frank', 'Genuine'],
    correctAnswer: 1, // Deceitful
    explanation: 'Candid means truthful, straightforward, and frank. The exact opposite antonym is Deceitful.',
    createdDate: '2026-09-03',
  },
  {
    id: 'Q-104',
    question: 'What is the average time complexity of searching an element in a Balanced Binary Search Tree (AVL / Red-Black)?',
    category: 'Technical & Coding',
    difficulty: 'Medium',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2, // O(log n)
    explanation: 'A balanced binary search tree maintains a height bounded by O(log n). Therefore, search, insertion, and deletion operate in O(log n) time.',
    createdDate: '2026-09-04',
  },
  {
    id: 'Q-105',
    question: 'A shopkeeper marks an article 25% above the cost price and allows a discount of 10% on the marked price. What is the net profit percentage?',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    options: ['10%', '12.5%', '15%', '17.5%'],
    correctAnswer: 1, // 12.5%
    explanation: 'Let CP = 100. MP = 125. Discount = 10% of 125 = 12.5. SP = 125 - 12.5 = 112.5. Profit = 112.5 - 100 = 12.5%.',
    createdDate: '2026-09-05',
  },
  {
    id: 'Q-106',
    question: 'In a group of 5 people, A is taller than B but shorter than C. D is taller than E but shorter than B. Who is the tallest?',
    category: 'Logical Reasoning',
    difficulty: 'Easy',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2, // C
    explanation: 'From given: C > A > B, and B > D > E. Putting together: C > A > B > D > E. Hence, C is the tallest.',
    createdDate: '2026-09-06',
  },
  {
    id: 'Q-107',
    question: 'Which of the following SQL statements is used to eliminate duplicate rows from a query result set?',
    category: 'Technical & Coding',
    difficulty: 'Easy',
    options: ['UNIQUE', 'DISTINCT', 'GROUP BY ONLY', 'FILTER'],
    correctAnswer: 1, // DISTINCT
    explanation: 'The SELECT DISTINCT statement is used to return only distinct (different) values, suppressing duplicate rows.',
    createdDate: '2026-09-07',
  },
  {
    id: 'Q-108',
    question: 'Find the odd word out: Ephemeral, Transient, Evanescent, Perpetual',
    category: 'Verbal Ability',
    difficulty: 'Hard',
    options: ['Ephemeral', 'Transient', 'Evanescent', 'Perpetual'],
    correctAnswer: 3, // Perpetual
    explanation: 'Ephemeral, Transient, and Evanescent all denote short-lived or fleeting duration. Perpetual means everlasting or endless.',
    createdDate: '2026-09-08',
  },
  {
    id: 'Q-109',
    question: 'Which data structure is primarily used to implement LRU (Least Recently Used) cache with O(1) get and put operations?',
    category: 'Technical & Coding',
    difficulty: 'Hard',
    options: ['Stack + Array', 'HashMap + Doubly Linked List', 'Queue + Min-Heap', 'Binary Search Tree + Array'],
    correctAnswer: 1, // HashMap + Doubly Linked List
    explanation: 'A Hash Map gives O(1) key lookup, while a Doubly Linked List allows O(1) removal and re-insertion of node elements at the head/tail.',
    createdDate: '2026-09-09',
  },
  {
    id: 'Q-110',
    question: 'A can complete a task in 12 days, and B in 18 days. They work together for 4 days. What fraction of the work remains unfinished?',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    options: ['1/3', '4/9', '5/9', '7/18'],
    correctAnswer: 1, // 4/9
    explanation: 'Work done per day = (1/12) + (1/18) = (3+2)/36 = 5/36. In 4 days, work done = 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.',
    createdDate: '2026-09-10',
  }
];

export const INITIAL_COMPANIES: AdminCompany[] = [
  {
    id: 'comp-1',
    companyName: 'TCS (Tata Consultancy Services)',
    jobRole: 'Ninja & Digital Software Engineer',
    location: 'Pan India (Bengaluru, Pune, Hyderabad, Chennai)',
    eligibility: '60% or 6.0 CGPA throughout 10th, 12th & B.Tech. Max 1 active backlog allowed.',
    requiredSkills: ['Java/Python', 'Data Structures', 'SQL Basics', 'Core CS Fundamentals'],
    packageCTC: '7.2 LPA (Digital) / 3.8 LPA (Ninja)',
    deadline: '2026-10-15',
    applyLink: 'https://nextstep.tcs.com/campus',
    status: 'Active',
    logoColor: 'bg-indigo-600',
  },
  {
    id: 'comp-2',
    companyName: 'Infosys Limited',
    jobRole: 'Specialist Programmer (Power Programmer)',
    location: 'Bengaluru / Hyderabad / Pune',
    eligibility: '65% or 6.5 CGPA in B.Tech (CSE, IT, ECE). Zero backlogs at time of drive.',
    requiredSkills: ['Advanced Algorithms', 'Dynamic Programming', 'System Design Basics', 'Java/C++'],
    packageCTC: '9.5 LPA',
    deadline: '2026-10-22',
    applyLink: 'https://career.infosys.com/apply/sp2026',
    status: 'Active',
    logoColor: 'bg-blue-600',
  },
  {
    id: 'comp-3',
    companyName: 'Amazon Development Centre',
    jobRole: 'Software Development Engineer (SDE-1)',
    location: 'Bengaluru / Hyderabad / Gurugram',
    eligibility: '7.5+ CGPA in B.Tech/B.E. Strong coding proficiency in LeetCode style problems.',
    requiredSkills: ['DSA', 'Object-Oriented Design', 'Graph Theory', 'Trees', 'Problem Solving'],
    packageCTC: '32.0 LPA',
    deadline: '2026-10-30',
    applyLink: 'https://amazon.jobs/en/jobs/campus-sde-2026',
    status: 'Active',
    logoColor: 'bg-amber-600',
  },
  {
    id: 'comp-4',
    companyName: 'Accenture India',
    jobRole: 'Advanced Application Engineering Analyst',
    location: 'Pan India',
    eligibility: '6.5 CGPA or 65% aggregate with all branches eligible.',
    requiredSkills: ['Cloud Concepts', 'Python/JavaScript', 'Aptitude & Analytical Thinking'],
    packageCTC: '6.5 LPA',
    deadline: '2026-11-05',
    applyLink: 'https://india.accenture.com/campus2026',
    status: 'Upcoming',
    logoColor: 'bg-purple-600',
  },
  {
    id: 'comp-5',
    companyName: 'Microsoft Corporation',
    jobRole: 'Software Engineer - University Graduate',
    location: 'Hyderabad / Bengaluru / Noida',
    eligibility: '8.0+ CGPA. CSE, IT, ECE, Data Science, AI specializations.',
    requiredSkills: ['C++/C#/Java', 'Data Structures', 'OS Internals', 'System Architecture'],
    packageCTC: '44.0 LPA',
    deadline: '2026-11-12',
    applyLink: 'https://careers.microsoft.com/students/us/en',
    status: 'Upcoming',
    logoColor: 'bg-cyan-600',
  },
  {
    id: 'comp-6',
    companyName: 'Cognizant Technology Solutions',
    jobRole: 'GenC Next Specialist',
    location: 'Chennai / Coimbatore / Kolkata',
    eligibility: '60% throughout education. Max 1 year education gap permitted.',
    requiredSkills: ['Full Stack Basics', 'REST APIs', 'SQL Database', 'Git Version Control'],
    packageCTC: '6.75 LPA',
    deadline: '2026-09-28',
    applyLink: 'https://cognizant.com/careers/genc-next',
    status: 'Closed',
    logoColor: 'bg-teal-600',
  },
];

export const INITIAL_MOCK_TESTS: AdminMockTest[] = [
  {
    id: 'mock-1',
    testName: 'TCS NQT Full-Length National Qualifier Mock 1',
    category: 'Full Mock Test',
    questionsCount: 40,
    durationMinutes: 90,
    difficulty: 'Medium',
    status: 'Published',
    selectedQuestionIds: ['Q-101', 'Q-102', 'Q-103', 'Q-105', 'Q-106', 'Q-110'],
    totalAttempts: 142,
    avgScore: 74,
  },
  {
    id: 'mock-2',
    testName: 'Quantitative Aptitude Diagnostic Sprint',
    category: 'Quantitative Aptitude',
    questionsCount: 25,
    durationMinutes: 35,
    difficulty: 'Medium',
    status: 'Published',
    selectedQuestionIds: ['Q-101', 'Q-105', 'Q-110'],
    totalAttempts: 135,
    avgScore: 68,
  },
  {
    id: 'mock-3',
    testName: 'Coding & Data Structures Marathon Mock',
    category: 'Technical & Coding',
    questionsCount: 15,
    durationMinutes: 60,
    difficulty: 'Hard',
    status: 'Published',
    selectedQuestionIds: ['Q-104', 'Q-107', 'Q-109'],
    totalAttempts: 121,
    avgScore: 82,
  },
  {
    id: 'mock-4',
    testName: 'Infosys Specialist Programmer Coding Simulator',
    category: 'Technical & Coding',
    questionsCount: 20,
    durationMinutes: 75,
    difficulty: 'Hard',
    status: 'Draft',
    selectedQuestionIds: ['Q-104', 'Q-109'],
    totalAttempts: 0,
    avgScore: 0,
  },
  {
    id: 'mock-5',
    testName: 'Verbal Ability & Logical Reasoning Combo Drill',
    category: 'Logical Reasoning',
    questionsCount: 30,
    durationMinutes: 45,
    difficulty: 'Easy',
    status: 'Published',
    selectedQuestionIds: ['Q-102', 'Q-103', 'Q-106', 'Q-108'],
    totalAttempts: 128,
    avgScore: 81,
  },
];

export const INITIAL_EVENTS: AdminEvent[] = [
  {
    id: 'evt-1',
    eventName: 'Campus Grand Aptitude League 2026',
    eventType: 'Quiz',
    description: 'A college-wide fast-paced aptitude quiz testing speed, accuracy, and quick mathematical heuristics.',
    date: '2026-09-20',
    time: '10:00 AM - 11:30 AM',
    registrationDeadline: '2026-09-18',
    eligibility: 'Open to all 3rd & 4th year undergraduate engineering and MCA students.',
    rules: 'No calculators allowed. 60 questions in 60 minutes. Negative marking (-0.25) per wrong answer.',
    registrationLink: 'https://portal.placement.edu/events/aptitude-league',
    status: 'Published',
    participantsCount: 340,
  },
  {
    id: 'evt-2',
    eventName: 'CodeStorm 2026 Inter-College Hackathon',
    eventType: 'Coding Challenge',
    description: '36-hour competitive coding sprint featuring algorithmic puzzles, dynamic programming, and systems architecture challenges.',
    date: '2026-10-05',
    time: '09:00 AM - 09:00 PM',
    registrationDeadline: '2026-10-01',
    eligibility: 'Teams of 2-3 students from CSE, IT, AI, DS, and ECE branches.',
    rules: 'Plagiarism will lead to immediate disqualification. Automated test suites will evaluate time & space complexity.',
    registrationLink: 'https://portal.placement.edu/events/codestorm2026',
    status: 'Published',
    participantsCount: 215,
  },
  {
    id: 'evt-3',
    eventName: 'Amazon AWS Campus Hiring Challenge',
    eventType: 'Hiring Challenge',
    description: 'Official pre-placement screening assessment for Cloud and SDE internship offers with Amazon AWS team.',
    date: '2026-10-18',
    time: '02:00 PM - 05:00 PM',
    registrationDeadline: '2026-10-14',
    eligibility: 'B.Tech graduating batch 2026 with minimum 7.5 CGPA and no current backlogs.',
    rules: 'Proctored browser environment with webcam and microphone required. Two coding problems + 20 MCQs.',
    registrationLink: 'https://portal.placement.edu/events/amazon-challenge',
    status: 'Upcoming',
    participantsCount: 410,
  },
  {
    id: 'evt-4',
    eventName: 'TCS NQT National Mock Olympiad',
    eventType: 'Quiz',
    description: 'Simulated national level entrance test identical in pattern and timing to the official TCS NQT 2026.',
    date: '2026-10-25',
    time: '11:00 AM - 01:00 PM',
    registrationDeadline: '2026-10-22',
    eligibility: 'All final year students eligible for IT campus recruitment drives.',
    rules: 'Strict sectional timing. Once a section is submitted, candidates cannot return to previous questions.',
    registrationLink: 'https://portal.placement.edu/events/tcs-olympiad',
    status: 'Draft',
    participantsCount: 0,
  },
];

export const INITIAL_STUDENT_RECORDS: AdminStudentRecord[] = [
  {
    id: 'stu-1',
    name: 'Khushi Kumari',
    email: 'khushi.student@placement.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    overallScore: 88,
    progress: 82,
    rollNumber: '22CSE042',
    cgpa: 8.9,
    testsCompleted: 14,
    questionsSolved: 348,
    codingStreakDays: 18,
    categoryPerformance: {
      quantitative: 84,
      logical: 89,
      verbal: 78,
      coding: 92,
    },
    companyReadiness: {
      tcs: 92,
      infosys: 88,
      amazon: 82,
      accenture: 90,
      cognizant: 94,
    },
    recentResults: [
      { testName: 'TCS NQT Full Mock 1', score: 86, totalMarks: 100, date: '2026-09-08', accuracy: 91, percentile: 94 },
      { testName: 'Coding Marathon Mock', score: 90, totalMarks: 100, date: '2026-09-05', accuracy: 95, percentile: 96 },
      { testName: 'Quantitative Diagnostic', score: 82, totalMarks: 100, date: '2026-09-01', accuracy: 85, percentile: 89 },
    ],
  },
  {
    id: 'stu-2',
    name: 'Aarav Patel',
    email: 'aarav.patel@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    overallScore: 94,
    progress: 90,
    rollNumber: '22CSE003',
    cgpa: 9.3,
    testsCompleted: 19,
    questionsSolved: 460,
    codingStreakDays: 28,
    categoryPerformance: {
      quantitative: 92,
      logical: 95,
      verbal: 86,
      coding: 97,
    },
    companyReadiness: {
      tcs: 96,
      infosys: 94,
      amazon: 91,
      accenture: 95,
      cognizant: 98,
    },
    recentResults: [
      { testName: 'TCS NQT Full Mock 1', score: 94, totalMarks: 100, date: '2026-09-08', accuracy: 96, percentile: 98 },
      { testName: 'Coding Marathon Mock', score: 98, totalMarks: 100, date: '2026-09-05', accuracy: 100, percentile: 99 },
    ],
  },
  {
    id: 'stu-3',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Information Technology',
    year: '4th Year',
    overallScore: 76,
    progress: 70,
    rollNumber: '22IT018',
    cgpa: 8.1,
    testsCompleted: 10,
    questionsSolved: 240,
    codingStreakDays: 7,
    categoryPerformance: {
      quantitative: 72,
      logical: 78,
      verbal: 80,
      coding: 74,
    },
    companyReadiness: {
      tcs: 80,
      infosys: 76,
      amazon: 65,
      accenture: 82,
      cognizant: 84,
    },
    recentResults: [
      { testName: 'TCS NQT Full Mock 1', score: 74, totalMarks: 100, date: '2026-09-08', accuracy: 78, percentile: 76 },
      { testName: 'Verbal Combo Drill', score: 84, totalMarks: 100, date: '2026-09-03', accuracy: 88, percentile: 85 },
    ],
  },
  {
    id: 'stu-4',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Electronics & Communication',
    year: '4th Year',
    overallScore: 82,
    progress: 75,
    rollNumber: '22ECE012',
    cgpa: 8.5,
    testsCompleted: 12,
    questionsSolved: 290,
    codingStreakDays: 12,
    categoryPerformance: {
      quantitative: 86,
      logical: 84,
      verbal: 75,
      coding: 81,
    },
    companyReadiness: {
      tcs: 88,
      infosys: 84,
      amazon: 74,
      accenture: 86,
      cognizant: 89,
    },
    recentResults: [
      { testName: 'TCS NQT Full Mock 1', score: 82, totalMarks: 100, date: '2026-09-08', accuracy: 86, percentile: 87 },
    ],
  },
  {
    id: 'stu-5',
    name: 'Vikramaditya Verma',
    email: 'vikram.verma@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Mechanical Engineering',
    year: '4th Year',
    overallScore: 66,
    progress: 58,
    rollNumber: '22ME024',
    cgpa: 7.4,
    testsCompleted: 7,
    questionsSolved: 175,
    codingStreakDays: 3,
    categoryPerformance: {
      quantitative: 75,
      logical: 68,
      verbal: 62,
      coding: 59,
    },
    companyReadiness: {
      tcs: 72,
      infosys: 68,
      amazon: 52,
      accenture: 74,
      cognizant: 75,
    },
    recentResults: [
      { testName: 'Aptitude Diagnostic', score: 68, totalMarks: 100, date: '2026-09-01', accuracy: 70, percentile: 62 },
    ],
  },
  {
    id: 'stu-6',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    overallScore: 85,
    progress: 78,
    rollNumber: '23CSE065',
    cgpa: 8.8,
    testsCompleted: 11,
    questionsSolved: 310,
    codingStreakDays: 15,
    categoryPerformance: {
      quantitative: 80,
      logical: 88,
      verbal: 82,
      coding: 89,
    },
    companyReadiness: {
      tcs: 89,
      infosys: 86,
      amazon: 78,
      accenture: 88,
      cognizant: 91,
    },
    recentResults: [
      { testName: 'Coding Marathon Mock', score: 88, totalMarks: 100, date: '2026-09-05', accuracy: 92, percentile: 91 },
    ],
  },
  {
    id: 'stu-7',
    name: 'Devansh Reddy',
    email: 'devansh.r@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Information Technology',
    year: '3rd Year',
    overallScore: 91,
    progress: 85,
    rollNumber: '23IT009',
    cgpa: 9.1,
    testsCompleted: 15,
    questionsSolved: 385,
    codingStreakDays: 22,
    categoryPerformance: {
      quantitative: 89,
      logical: 92,
      verbal: 85,
      coding: 95,
    },
    companyReadiness: {
      tcs: 94,
      infosys: 92,
      amazon: 87,
      accenture: 93,
      cognizant: 96,
    },
    recentResults: [
      { testName: 'TCS NQT Full Mock 1', score: 92, totalMarks: 100, date: '2026-09-08', accuracy: 94, percentile: 95 },
    ],
  },
  {
    id: 'stu-8',
    name: 'Pooja Nair',
    email: 'pooja.nair@college.edu',
    college: 'Apex Institute of Engineering & Technology',
    branch: 'Electrical Engineering',
    year: '4th Year',
    overallScore: 68,
    progress: 62,
    rollNumber: '22EE031',
    cgpa: 7.7,
    testsCompleted: 8,
    questionsSolved: 195,
    codingStreakDays: 5,
    categoryPerformance: {
      quantitative: 74,
      logical: 70,
      verbal: 65,
      coding: 62,
    },
    companyReadiness: {
      tcs: 74,
      infosys: 70,
      amazon: 55,
      accenture: 76,
      cognizant: 78,
    },
    recentResults: [
      { testName: 'Aptitude Diagnostic', score: 70, totalMarks: 100, date: '2026-09-01', accuracy: 72, percentile: 66 },
    ],
  },
];
