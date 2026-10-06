export interface CompanyPreparationDetail {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  readinessPercentage: number;
  hiringRole: string;
  ctcPackage: string;
  eligibility: {
    cgpaCutoff: string;
    allowedBranches: string;
    backlogs: string;
    gapInEducation: string;
  };
  requiredSkills: string[];
  selectionProcess: {
    roundNumber: number;
    title: string;
    duration: string;
    description: string;
    keyTips: string;
  }[];
  aptitudePreparation: {
    sections: {
      name: string;
      questionsCount: number;
      timeMinutes: number;
      topics: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
    }[];
    strategy: string;
  };
  codingPreparation: {
    format: string;
    languages: string[];
    frequentTopics: string[];
    sampleProblemTitles: string[];
    recommendedApproaches: string;
  };
  interviewPreparation: {
    technicalTips: string[];
    hrTips: string[];
    sampleQuestions: {
      question: string;
      type: 'Technical' | 'HR' | 'Managerial';
      suggestedApproach: string;
    }[];
  };
  previousQuestions: {
    id: string;
    topic: string;
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
  }[];
}

export const COMPANY_PREP_DATA: CompanyPreparationDetail[] = [
  {
    id: 'tcs',
    name: 'TCS',
    shortCode: 'TCS',
    tagline: 'Tata Consultancy Services • Ninja, Digital & Prime Tracks',
    readinessPercentage: 72,
    hiringRole: 'Graduate Trainee / Systems Engineer / Digital SDE',
    ctcPackage: '₹3.6 LPA (Ninja) | ₹7.0 LPA (Digital) | ₹9.0 LPA (Prime)',
    eligibility: {
      cgpaCutoff: '60% or 6.0 CGPA throughout 10th, 12th & B.Tech',
      allowedBranches: 'All Engineering disciplines (CSE, IT, ECE, EE, ME, Civil)',
      backlogs: 'Maximum 1 active backlog permitted at the time of appearance',
      gapInEducation: 'Overall academic gap should not exceed 24 months',
    },
    requiredSkills: ['C/C++ or Java', 'Python', 'SQL & Relational DBs', 'Data Structures', 'Quantitative Aptitude'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'TCS NQT Cognitive Assessment',
        duration: '80 Minutes',
        description: 'Numerical Ability (26 Qs), Verbal Ability (24 Qs), Reasoning Ability (30 Qs).',
        keyTips: 'Speed math and non-verbal reasoning are time-critical; avoid getting stuck on multi-step DI questions.',
      },
      {
        roundNumber: 2,
        title: 'TCS NQT Advanced Cognitive & Coding',
        duration: '90 Minutes',
        description: 'Advanced Quantitative (15 Qs), Advanced Reasoning (15 Qs), and 2 Hands-on Coding questions.',
        keyTips: 'Passing at least 1 coding problem with 100% test cases unlocks the Digital/Prime interview bracket.',
      },
      {
        roundNumber: 3,
        title: 'Technical & HR Composite Interview',
        duration: '35-45 Minutes',
        description: 'In-depth review of final year project, core CS fundamentals (OOPs, DBMS, OS), and behavioral alignment.',
        keyTips: 'Be confident in explaining your project architecture and how you handled teamwork conflicts.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Numerical Ability',
          questionsCount: 26,
          timeMinutes: 40,
          topics: ['Percentages', 'Time & Work', 'Profit & Loss', 'Ratio & Proportion', 'Probability'],
          difficulty: 'Medium',
        },
        {
          name: 'Reasoning Ability',
          questionsCount: 30,
          timeMinutes: 30,
          topics: ['Coding-Decoding', 'Blood Relations', 'Syllogism', 'Data Sufficiency'],
          difficulty: 'Medium',
        },
        {
          name: 'Verbal Ability',
          questionsCount: 24,
          timeMinutes: 30,
          topics: ['Reading Comprehension', 'Sentence Completion', 'Error Spotting'],
          difficulty: 'Easy',
        },
      ],
      strategy: 'Focus on TCS specific question banks. In NQT, speed and negative marking avoidance ensure clearing sectional cutoffs.',
    },
    codingPreparation: {
      format: '2 Coding questions: Problem 1 (Easy-Medium, 15 marks) + Problem 2 (Medium-Hard, 30 marks).',
      languages: ['C', 'C++', 'Java', 'Python', 'Perl'],
      frequentTopics: ['Array Manipulation', 'String Formatting', 'Matrix Traversal', 'HashMaps', 'Number Theory'],
      sampleProblemTitles: [
        'Non-Repeating Character in Stream',
        'Find Equilibrium Index of an Array',
        'Smallest Subarray with Sum Greater than K',
        'Caesar Cipher Encryption with Variable Offset',
      ],
      recommendedApproaches: 'Write clean modular code with zero global variable dependencies. Handle corner test cases (empty array, zero, negative integers).',
    },
    interviewPreparation: {
      technicalTips: [
        'Master the 4 pillars of OOPs with real-world examples (e.g., Polymorphism via Payment Gateways).',
        'Be ready to write SQL queries involving INNER JOIN, GROUP BY, and HAVING clauses on paper/screen.',
        'Review basic system design concepts if applying for Digital or Prime tracks.',
      ],
      hrTips: [
        'Prepare the answer for "Why TCS over other IT service firms?" (Mention research labs, Tata ethics, global delivery model).',
        'Express willingness for relocation and shifts when asked directly.',
      ],
      sampleQuestions: [
        {
          question: 'What is the difference between TRUNCATE, DELETE, and DROP in SQL?',
          type: 'Technical',
          suggestedApproach: 'Explain DDL vs DML commands, rollback capabilities, and impact on table schema vs data rows.',
        },
        {
          question: 'Where do you see yourself in 3 years at Tata Consultancy Services?',
          type: 'HR',
          suggestedApproach: 'Focus on transitioning from Associate to Module Lead while mastering cloud technologies and certifications.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'tcs-pq-1',
        topic: 'Aptitude • Time & Work',
        question: 'A can do a piece of work in 15 days and B in 20 days. If they work together for 4 days, then the fraction of the work that is left is?',
        options: ['7/15', '8/15', '11/15', '2/11'],
        answer: '8/15',
        explanation: "A's 1 day work = 1/15, B's 1 day work = 1/20. (A + B)'s 1 day work = (1/15 + 1/20) = 7/60. In 4 days, work done = 4 × (7/60) = 7/15. Remaining work = 1 - 7/15 = 8/15.",
      },
      {
        id: 'tcs-pq-2',
        topic: 'Technical • DBMS',
        question: 'Which normal form is based on the concept of full functional dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: '2NF',
        explanation: 'Second Normal Form (2NF) mandates that the relation is in 1NF and every non-prime attribute is fully functionally dependent on any candidate key (no partial dependency).',
      },
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    shortCode: 'INFY',
    tagline: 'Infosys Limited • Systems Engineer & Specialist Programmer (SP)',
    readinessPercentage: 68,
    hiringRole: 'Systems Engineer (SE) / Digital Specialist Engineer (DSE) / Specialist Programmer (SP)',
    ctcPackage: '₹3.6 LPA (SE) | ₹6.5 LPA (DSE) | ₹9.5 LPA (SP)',
    eligibility: {
      cgpaCutoff: '65% or 6.5 CGPA in 10th, 12th, and B.Tech with no active backlogs',
      allowedBranches: 'BE/B.Tech/ME/M.Tech (All branches) & MCA/M.Sc (CS/IT)',
      backlogs: 'Zero active backlogs at the time of joining',
      gapInEducation: 'Maximum 1 year gap permitted post 12th',
    },
    requiredSkills: ['Data Structures & Algorithms', 'Python / Java', 'Object Oriented Design', 'RDBMS & NoSQL', 'Web Technologies'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Infosys Online Placement Test',
        duration: '100 Minutes',
        description: 'Mathematical Reasoning (15 Qs), Logical & Abstract Reasoning (15 Qs), Verbal Ability (20 Qs), Pseudocode (5 Qs), Numerical Puzzle Solving (4 Qs).',
        keyTips: 'The Pseudocode and Puzzle sections have high weightage; practice bitwise operations and recursion tracing.',
      },
      {
        roundNumber: 2,
        title: 'HackWithInfy / SP Coding Round (for DSE & SP)',
        duration: '180 Minutes',
        description: '3 Hard DSA coding problems evaluated on time and memory efficiency.',
        keyTips: 'Dynamic programming and graph traversal algorithms (Dijkstra, Topological Sort) are frequent.',
      },
      {
        roundNumber: 3,
        title: 'Technical + HR Combined Interview',
        duration: '30-40 Minutes',
        description: 'Code dry-run, questions on resume projects, Infosys core values (C-LIFE), and adaptability.',
        keyTips: 'Know every line of code written in your resume projects.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Mathematical Ability',
          questionsCount: 15,
          timeMinutes: 35,
          topics: ['Permutations & Combinations', 'Probability', 'Speed, Distance & Time', 'Mixtures & Allegations'],
          difficulty: 'Hard',
        },
        {
          name: 'Reasoning Ability',
          questionsCount: 15,
          timeMinutes: 25,
          topics: ['Critical Reasoning', 'Data Interpretation', 'Syllogism', 'Seating Arrangement'],
          difficulty: 'Medium',
        },
        {
          name: 'Verbal Ability',
          questionsCount: 20,
          timeMinutes: 20,
          topics: ['Para Jumbles', 'Fill in the Blanks', 'Critical Reading'],
          difficulty: 'Medium',
        },
      ],
      strategy: 'Infosys has strict sectional cutoffs. Allocate dedicated time to the Pseudocode and Puzzle solving sections.',
    },
    codingPreparation: {
      format: 'Pseudocode debugging in round 1, full algorithmic problems in HackWithInfy/SP.',
      languages: ['Java', 'Python', 'C++'],
      frequentTopics: ['Recursion & Backtracking', 'Dynamic Programming', 'Graph Shortest Paths', 'Binary Trees'],
      sampleProblemTitles: [
        'Coin Change Minimum Combinations',
        'Longest Palindromic Substring',
        'Network Delay Time (Dijkstra)',
        'Evaluate Reverse Polish Notation',
      ],
      recommendedApproaches: 'Focus on time complexity constraints (10⁵ elements require O(N log N) or O(N)).',
    },
    interviewPreparation: {
      technicalTips: [
        'Explain method overloading vs overriding with virtual function dispatch.',
        'Be ready to explain normalization up to BCNF and write subqueries.',
        'Understand time-space tradeoffs for quicksort vs mergesort.',
      ],
      hrTips: [
        'Understand Infosys values: Customer Delight, Leadership by Example, Integrity & Transparency, Fairness, Pursuit of Excellence.',
        'Describe an instance when you learned a new technology in a short timeframe.',
      ],
      sampleQuestions: [
        {
          question: 'What is deadlock in Operating Systems and what are the 4 Coffman conditions?',
          type: 'Technical',
          suggestedApproach: 'State Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait, and brief prevention strategies.',
        },
        {
          question: 'Why do you want to start your career at Infosys Mysore campus?',
          type: 'HR',
          suggestedApproach: 'Highlight the world-class Global Education Center (GEC) training and foundation program.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'infy-pq-1',
        topic: 'Aptitude • Permutations',
        question: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
        options: ['360', '720', '480', '5040'],
        answer: '720',
        explanation: 'Vowels are E, A, I (3 vowels). Treat (E,A,I) as 1 unit. Total letters remaining = L, D, N, G (4 consonants) + 1 unit = 5 units. Number of ways to arrange 5 units = 5! = 120. Vowels among themselves can arrange in 3! = 6 ways. Total = 120 × 6 = 720.',
      },
      {
        id: 'infy-pq-2',
        topic: 'Pseudocode • Recursion',
        question: 'What is the output of fun(4)? fun(int n) { if(n <= 1) return 1; return n * fun(n - 1); }',
        options: ['12', '24', '16', '6'],
        answer: '24',
        explanation: 'fun(4) = 4 * fun(3) = 4 * 3 * fun(2) = 4 * 3 * 2 * fun(1) = 4 * 3 * 2 * 1 = 24.',
      },
    ],
  },
  {
    id: 'accenture',
    name: 'Accenture',
    shortCode: 'ACN',
    tagline: 'Accenture • Associate Software Engineer & Advanced Tech Analyst',
    readinessPercentage: 64,
    hiringRole: 'Associate Software Engineer (ASE) / Advanced ASE (AASE)',
    ctcPackage: '₹4.5 LPA (ASE) | ₹6.5 LPA (AASE)',
    eligibility: {
      cgpaCutoff: '6.5 CGPA or 65% aggregate throughout B.Tech',
      allowedBranches: 'All full-time Engineering streams & MCA',
      backlogs: 'No active backlogs allowed during recruitment or onboarding',
      gapInEducation: 'Maximum 1 year gap allowed during academic progression',
    },
    requiredSkills: ['Cloud Basics (AWS/Azure)', 'Java / C# / Python', 'Critical Reasoning', 'Communication Skills', 'SQL'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Cognitive & Technical Assessment',
        duration: '90 Minutes',
        description: 'English Ability (17 Qs), Critical Reasoning & Problem Solving (18 Qs), Abstract Reasoning (15 Qs), Common Applications & MS Office (12 Qs), Pseudocode (18 Qs), Networking & Cloud Basics (10 Qs).',
        keyTips: 'Assessment is elimination-based; if you clear the cognitive cutoff, the coding test starts immediately.',
      },
      {
        roundNumber: 2,
        title: 'Accenture Coding Assessment',
        duration: '45 Minutes',
        description: '2 Hands-on coding problems focusing on arrays, strings, and pattern printing.',
        keyTips: 'C, C++, Java, Python, and C# are supported. Solve both problems to qualify for the higher AASE CTC.',
      },
      {
        roundNumber: 3,
        title: 'Communication Assessment & Virtual HR Interview',
        duration: '20 + 25 Minutes',
        description: 'Automated AI voice assessment (Pronunciation, Fluency, Vocabulary) followed by behavioral interview.',
        keyTips: 'Speak clearly into the microphone in a quiet environment with steady pacing.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Critical Thinking & Logic',
          questionsCount: 18,
          timeMinutes: 20,
          topics: ['Statement & Conclusions', 'Flowcharts', 'Data Sufficiency', 'Venn Diagrams'],
          difficulty: 'Medium',
        },
        {
          name: 'Technical Aptitude & Pseudocode',
          questionsCount: 28,
          timeMinutes: 30,
          topics: ['Loop tracing', 'Bitwise operations', 'Computer Networks (OSI layers)', 'Cloud fundamentals'],
          difficulty: 'Medium',
        },
        {
          name: 'English Ability',
          questionsCount: 17,
          timeMinutes: 15,
          topics: ['Vocabulary', 'Sentence Correction', 'Grammar'],
          difficulty: 'Easy',
        },
      ],
      strategy: 'Do not overlook the MS Office and Networking questions, as they constitute 22 questions of the total cutoff score.',
    },
    codingPreparation: {
      format: '2 Coding questions testing clean logic and standard algorithms.',
      languages: ['C', 'C++', 'Java', 'Python', 'C#'],
      frequentTopics: ['String Reversal & Anagrams', 'Array Rotation', 'Counting Digits & Palindromes', 'Greedy Choices'],
      sampleProblemTitles: [
        'Password Checker with Character Constraints',
        'Automorphic Number Validator',
        'Minimum Operations to Make Array Elements Equal',
        'Find Superior Array Element (Leader)',
      ],
      recommendedApproaches: 'Ensure 100% test case pass on Problem 1 before moving to Problem 2.',
    },
    interviewPreparation: {
      technicalTips: [
        'Be prepared to explain cloud virtualization, SaaS, PaaS, IaaS differences.',
        'Review basic Agile methodologies (Sprint, Scrum, User Stories).',
        'Explain how you tested your college project and handled edge inputs.',
      ],
      hrTips: [
        'Emphasize adaptability and eagerness to learn new enterprise stacks like SAP, Salesforce, or Workday.',
        'Demonstrate strong spoken English and concise structured articulation.',
      ],
      sampleQuestions: [
        {
          question: 'What is Cloud Computing and what are the deployment models?',
          type: 'Technical',
          suggestedApproach: 'Define on-demand delivery of compute/storage over the internet; cover Public, Private, Hybrid, and Community clouds.',
        },
        {
          question: 'Describe a situation where you had to lead a project under tight deadlines.',
          type: 'HR',
          suggestedApproach: 'Use the STAR method (Situation, Task, Action, Result) showcasing leadership and time management.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'acn-pq-1',
        topic: 'Aptitude • Logical Reasoning',
        question: 'If "CLOUD" is coded as "ENQWF", how will "SERVER" be coded in the same language?',
        options: ['UGTXGT', 'UGTXFT', 'THTXFT', 'VHUYHU'],
        answer: 'UGTXGT',
        explanation: 'Each letter is shifted forward by 2 positions: C(+2)=E, L(+2)=N, O(+2)=Q, U(+2)=W, D(+2)=F. Similarly, S(+2)=U, E(+2)=G, R(+2)=T, V(+2)=X, E(+2)=G, R(+2)=T → UGTXGT.',
      },
      {
        id: 'acn-pq-2',
        topic: 'Technical • Computer Networks',
        question: 'At which layer of the OSI model does the Router operate?',
        options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
        answer: 'Network Layer',
        explanation: 'Routers operate at Layer 3 (Network Layer) because they route packets using logical IP addressing.',
      },
    ],
  },
  {
    id: 'wipro',
    name: 'Wipro',
    shortCode: 'WIPRO',
    tagline: 'Wipro Elite National Talent Hunt (NTH) • Project Engineer',
    readinessPercentage: 70,
    hiringRole: 'Project Engineer (Elite & Turbo Tracks)',
    ctcPackage: '₹3.5 LPA (Elite) | ₹6.5 LPA (Turbo)',
    eligibility: {
      cgpaCutoff: '60% or 6.0 CGPA in 10th, 12th, and B.Tech',
      allowedBranches: 'CS, IT, Circuit branches (ECE, EEE), Mechanical, Civil',
      backlogs: 'Maximum 1 active backlog permitted at the time of online assessment',
      gapInEducation: 'Maximum 3 years gap permitted across education timeline',
    },
    requiredSkills: ['C++ or Java', 'OOPs Architecture', 'Relational Databases', 'Verbal Communication', 'Business Essay Writing'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Wipro Elite NTH Online Assessment',
        duration: '128 Minutes',
        description: 'Aptitude Test (Quantitative, Logical, Verbal - 48 mins), Written Communication / Essay (20 mins), Online Coding (2 Qs - 60 mins).',
        keyTips: 'The essay test is evaluated via automated NLP tool checking for grammar, spelling, and sentence coherence.',
      },
      {
        roundNumber: 2,
        title: 'Technical & HR Virtual Interview',
        duration: '30 Minutes',
        description: 'Verification of academic credentials, resume review, code explanation, and readiness to relocate.',
        keyTips: 'Be ready to write and explain standard algorithms (bubble sort, palindrome, matrix multiplication).',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Quantitative Ability',
          questionsCount: 16,
          timeMinutes: 16,
          topics: ['Simple & Compound Interest', 'Profit & Loss', 'Time, Speed & Distance', 'Number System'],
          difficulty: 'Medium',
        },
        {
          name: 'Logical Reasoning',
          questionsCount: 14,
          timeMinutes: 14,
          topics: ['Coding-Decoding', 'Blood Relations', 'Analogy', 'Direction Sense'],
          difficulty: 'Easy',
        },
        {
          name: 'Verbal Ability',
          questionsCount: 22,
          timeMinutes: 18,
          topics: ['Sentence Correction', 'Synonyms & Antonyms', 'Prepositions'],
          difficulty: 'Easy',
        },
      ],
      strategy: 'Time management is key in Wipro: you have approximately 1 minute per question in the aptitude section.',
    },
    codingPreparation: {
      format: '2 Programming questions: 1 basic logic and 1 string/array intermediate.',
      languages: ['C', 'C++', 'Java', 'Python'],
      frequentTopics: ['Fibonacci & Prime Series', 'String Palindromes', 'Matrix Row-wise Operations', 'Searching'],
      sampleProblemTitles: [
        'Count Pairs with Given Sum',
        'Find Missing Number in Consecutive Series',
        'Second Largest Element in Array without Sorting',
        'Check Anagram Strings',
      ],
      recommendedApproaches: 'Ensure proper syntax and handling of null inputs; avoid external libraries not in standard templates.',
    },
    interviewPreparation: {
      technicalTips: [
        'Master the difference between static and dynamic binding in Java/C++.',
        'Be ready to explain primary keys, foreign keys, and unique keys with examples.',
      ],
      hrTips: [
        'Be familiar with Wipro Spirit: Be passionate about clients, Treat each person with respect, Be global and responsible, Unyielding integrity.',
      ],
      sampleQuestions: [
        {
          question: 'What is the purpose of Garbage Collection in Java?',
          type: 'Technical',
          suggestedApproach: 'Explain automatic memory reclamation, the Heap area, System.gc(), and avoidance of memory leaks.',
        },
        {
          question: 'Are you comfortable working in rotating shifts or supporting international clients?',
          type: 'HR',
          suggestedApproach: 'Affirm flexibility and express enthusiasm for global exposure and client satisfaction.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'wipro-pq-1',
        topic: 'Aptitude • Interest',
        question: 'At what rate percent per annum will a sum of money double in 8 years under Simple Interest?',
        options: ['12.5%', '10%', '15%', '14.2%'],
        answer: '12.5%',
        explanation: 'Let Principal = P. Simple Interest = P. Time = 8 years. Rate = (SI × 100) / (P × T) = (P × 100) / (P × 8) = 100/8 = 12.5% per annum.',
      },
    ],
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    shortCode: 'DELOITTE',
    tagline: 'Deloitte USI • Analyst & Technology Consulting',
    readinessPercentage: 66,
    hiringRole: 'Analyst - Technology Consulting / Risk & Financial Advisory',
    ctcPackage: '₹4.5 - ₹7.6 LPA',
    eligibility: {
      cgpaCutoff: '6.5 CGPA or 60% with no active backlogs',
      allowedBranches: 'Circuit and Software engineering streams (CSE, IT, ECE, EEE)',
      backlogs: 'No active backlogs allowed at time of interview',
      gapInEducation: 'Maximum 1 year gap allowed during higher education',
    },
    requiredSkills: ['SQL & Data Analytics', 'Problem Solving & Case Studies', 'Python or R', 'Software Engineering Principles', 'Business Acumen'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Deloitte Online Assessment',
        duration: '75 Minutes',
        description: 'Quantitative Aptitude (14 Qs), Logical Ability (14 Qs), Verbal Ability (14 Qs), and Computer Fundamentals (30 Qs on OS, DBMS, OOPs).',
        keyTips: 'Deloitte places heavy emphasis on Data Interpretation and business aptitude.',
      },
      {
        roundNumber: 2,
        title: 'Case Study / JAM Round (Group Activity)',
        duration: '25 Minutes',
        description: 'Business case scenario analysis in small groups or 1-minute impromptu speaking.',
        keyTips: 'Structure your thoughts clearly: Problem Definition → 2 Alternative Solutions → Final Recommendation with reasoning.',
      },
      {
        roundNumber: 3,
        title: 'Partner / Technical Interview',
        duration: '40 Minutes',
        description: 'Consulting mindset assessment, database queries, project discussion, and cultural fitment.',
        keyTips: 'Demonstrate professional demeanor, active listening, and business curiosity.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Quantitative & DI',
          questionsCount: 14,
          timeMinutes: 20,
          topics: ['Bar & Pie Charts', 'Percentages', 'Profit Analysis', 'Averages'],
          difficulty: 'Hard',
        },
        {
          name: 'Logical Reasoning',
          questionsCount: 14,
          timeMinutes: 20,
          topics: ['Data Arrangements', 'Puzzles', 'Assumptions & Conclusions'],
          difficulty: 'Medium',
        },
        {
          name: 'Computer Fundamentals',
          questionsCount: 30,
          timeMinutes: 25,
          topics: ['SQL Queries', 'DBMS Keys', 'OS Scheduling', 'OOPs Concepts'],
          difficulty: 'Medium',
        },
      ],
      strategy: 'Master Data Interpretation tables and multi-series line graphs with percentages.',
    },
    codingPreparation: {
      format: 'Algorithmic or data-driven code questions evaluating clarity and edge-case handling.',
      languages: ['Python', 'Java', 'C++', 'SQL'],
      frequentTopics: ['String tokenization', 'Array counting', 'SQL Aggregations and Window Functions'],
      sampleProblemTitles: [
        'Top 3 Highest Earning Employees per Department (SQL)',
        'Check If Two Arrays Contain Same Set of Elements',
        'Validate IPv4 and IPv6 Address Strings',
      ],
      recommendedApproaches: 'Write well-commented code that models business requirements neatly.',
    },
    interviewPreparation: {
      technicalTips: [
        'Explain SQL Joins with Venn diagrams and write syntax cleanly on whiteboard.',
        'Explain MVC architecture or microservices vs monolithic concepts.',
      ],
      hrTips: [
        'Read about Deloitte global impact and technological innovation initiatives.',
        'Dress in crisp formal attire and maintain steady eye contact during virtual video interviews.',
      ],
      sampleQuestions: [
        {
          question: 'How would you advise a retail client to transition from offline stores to omnichannel e-commerce?',
          type: 'Technical',
          suggestedApproach: 'Analyze customer touchpoints, supply chain inventory tracking, payment security, and cloud scalability.',
        },
        {
          question: 'Tell me about a time you handled conflict in a student group project.',
          type: 'HR',
          suggestedApproach: 'Focus on constructive dialogue, task realignment based on strengths, and shared goal alignment.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'deloitte-pq-1',
        topic: 'Aptitude • Data Interpretation',
        question: 'If Company X revenue grew by 20% in 2024 to $120M, what was the revenue in 2023?',
        options: ['$100M', '$96M', '$105M', '$90M'],
        answer: '$100M',
        explanation: 'Let 2023 revenue = R. R × 1.20 = 120 → R = 120 / 1.2 = $100M.',
      },
    ],
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    shortCode: 'CTS',
    tagline: 'Cognizant GenC, GenC Elevate & GenC Next Hiring',
    readinessPercentage: 75,
    hiringRole: 'Programmer Analyst Trainee (GenC / GenC Elevate / GenC Next)',
    ctcPackage: '₹4.0 LPA (GenC) | ₹4.25 LPA (Elevate) | ₹6.75 LPA (Next)',
    eligibility: {
      cgpaCutoff: '60% or 6.0 CGPA throughout 10th, 12th & B.Tech / MCA',
      allowedBranches: 'All engineering disciplines & circuit branches',
      backlogs: 'Zero active backlogs at the time of onboarding',
      gapInEducation: 'Maximum 1 year gap permitted post high school',
    },
    requiredSkills: ['Core Java / Python', 'DBMS & SQL', 'Analytical Problem Solving', 'Web Fundamentals', 'Debugging'],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Cognizant Communication & Skill Assessment',
        duration: '90 Minutes',
        description: 'Quantitative Ability (25 Qs), Analytical Reasoning (25 Qs), English Comprehension (20 Qs), and Technical Debugging / Pseudocode.',
        keyTips: 'GenC Next candidates face 2 additional advanced competitive coding problems.',
      },
      {
        roundNumber: 2,
        title: 'Technical Interview',
        duration: '35 Minutes',
        description: 'Live coding on browser editor, SQL queries, resume projects, and fundamental CS theory.',
        keyTips: 'Explain your thought process while coding; interviewers reward algorithmic clarity and clean naming.',
      },
      {
        roundNumber: 3,
        title: 'HR & Document Verification',
        duration: '15 Minutes',
        description: 'Confirmation of joining dates, location preferences, shifts, and background checks.',
        keyTips: 'Ensure all semester marksheets and identity proofs are organized.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Quantitative Ability',
          questionsCount: 25,
          timeMinutes: 30,
          topics: ['Time and Work', 'Logarithms', 'Probability', 'Geometry & Mensuration'],
          difficulty: 'Medium',
        },
        {
          name: 'Analytical Reasoning',
          questionsCount: 25,
          timeMinutes: 25,
          topics: ['Data Interpretation', 'Logical Sequences', 'Cubes & Dices'],
          difficulty: 'Medium',
        },
        {
          name: 'English Comprehension',
          questionsCount: 20,
          timeMinutes: 20,
          topics: ['Cloze Test', 'Sentence Improvement', 'Vocabulary'],
          difficulty: 'Easy',
        },
      ],
      strategy: 'Practice timed sectional sets to ensure 80%+ accuracy on quantitative and debugging questions.',
    },
    codingPreparation: {
      format: '2 Coding questions for GenC Elevate/Next tracks evaluating standard data structures.',
      languages: ['C', 'C++', 'Java', 'Python'],
      frequentTopics: ['Array Traversal', 'String Matching', 'Linked Lists', 'Sorting Algorithms'],
      sampleProblemTitles: [
        'Rotate Matrix by 90 Degrees',
        'Find Middle Element of Linked List in Single Pass',
        'Longest Common Prefix in Array of Strings',
      ],
      recommendedApproaches: 'Write idiomatic code and check edge cases such as single element inputs or negative indices.',
    },
    interviewPreparation: {
      technicalTips: [
        'Know the internal workings of ArrayList vs LinkedList in Java.',
        'Explain ACID properties in database management with banking transaction examples.',
      ],
      hrTips: [
        'Express willingness to adapt to any domain: Healthcare, Banking, or Retail practice.',
      ],
      sampleQuestions: [
        {
          question: 'What are the ACID properties in DBMS?',
          type: 'Technical',
          suggestedApproach: 'Atomicity (all or nothing), Consistency (preserves database rules), Isolation (concurrent transactions execute independently), Durability (committed changes persist).',
        },
        {
          question: 'Why should Cognizant hire you today?',
          type: 'HR',
          suggestedApproach: 'Connect your technical preparation, discipline in coursework, and fast-learning capabilities to client project delivery.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'cts-pq-1',
        topic: 'Aptitude • Numbers',
        question: 'What is the unit digit in (7⁹⁵ - 3⁵⁸)?',
        options: ['0', '4', '6', '7'],
        answer: '4',
        explanation: 'Cyclicity of 7 is 4: 95 % 4 = 3, so 7³ ends in 3. Cyclicity of 3 is 4: 58 % 4 = 2, so 3² ends in 9. Since (3 - 9) is negative, borrow 10: 13 - 9 = 4.',
      },
    ],
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    shortCode: 'HCL',
    tagline: 'Supercharging Progress • Engineering & Digital Services',
    readinessPercentage: 74,
    hiringRole: 'Graduate Engineer Trainee (GET) & Software Engineer',
    ctcPackage: '₹4.25 LPA - ₹6.5 LPA',
    eligibility: {
      cgpaCutoff: '65% or 6.5 CGPA throughout 10th, 12th & B.Tech',
      allowedBranches: 'CSE, IT, ECE, EEE, Mechanical, Civil',
      backlogs: 'No active backlogs allowed at registration',
      gapInEducation: 'Maximum 1 year gap permitted post-12th',
    },
    requiredSkills: [
      'C / C++ / Java / Python Programming',
      'Data Structures & Algorithms',
      'Database Management Systems & SQL',
      'Object Oriented Programming (OOP)',
      'Operating Systems & Networking Basics',
    ],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Online Aptitude & Technical Assessment',
        duration: '75 Minutes',
        description: 'Quantitative, Verbal, Logical Reasoning, and Technical MCQs on OOP, C, DBMS.',
        keyTips: 'Speed is essential; practice pseudo-code and output debugging questions.',
      },
      {
        roundNumber: 2,
        title: 'Coding Assessment',
        duration: '45 Minutes',
        description: 'Two hands-on coding problems evaluating string manipulation, arrays, and searching.',
        keyTips: 'Ensure clean indentation, proper variable names, and zero syntax errors.',
      },
      {
        roundNumber: 3,
        title: 'Technical Interview',
        duration: '35 Minutes',
        description: 'Detailed discussion on final-year projects, core CS fundamentals, and basic live coding.',
        keyTips: 'Be confident in explaining architecture diagrams and database schema design.',
      },
      {
        roundNumber: 4,
        title: 'HR & Fitment Interview',
        duration: '20 Minutes',
        description: 'Behavioral checks, shift flexibility, location preferences, and communication assessment.',
        keyTips: 'Demonstrate enthusiasm for learning cutting-edge enterprise cloud technologies.',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Quantitative Aptitude',
          questionsCount: 20,
          timeMinutes: 25,
          topics: ['Time & Work', 'Percentages', 'Profit & Loss', 'Permutation & Combination', 'Ratio & Proportion'],
          difficulty: 'Medium',
        },
        {
          name: 'Logical Reasoning',
          questionsCount: 20,
          timeMinutes: 25,
          topics: ['Syllogisms', 'Coding-Decoding', 'Data Sufficiency', 'Blood Relations', 'Series Completion'],
          difficulty: 'Medium',
        },
        {
          name: 'Technical MCQs',
          questionsCount: 20,
          timeMinutes: 25,
          topics: ['C/C++ Output', 'OOP Concepts', 'SQL Queries', 'Data Structures (Stacks, Queues)'],
          difficulty: 'Medium',
        },
      ],
      strategy: 'Focus on pseudo-code analysis and accurate problem breakdown under time constraints.',
    },
    codingPreparation: {
      format: '2 Coding Challenges on HCL Assessment Platform',
      languages: ['C', 'C++', 'Java', 'Python'],
      frequentTopics: ['Array Traversal', 'String Operations', 'Palindrome Verification', 'Sorting'],
      sampleProblemTitles: [
        'Count Frequency of Characters in a String',
        'Find Second Largest Element in Unsorted Array',
        'Check Balanced Parentheses in Expression',
      ],
      recommendedApproaches: 'Write modular code, avoid O(N²) when O(N) is feasible with frequency maps.',
    },
    interviewPreparation: {
      technicalTips: [
        'Prepare thoroughly on DBMS normalization (1NF, 2NF, 3NF, BCNF).',
        'Be ready to write clean code on a shared whiteboard or online editor.',
      ],
      hrTips: [
        'Research HCLTech’s major initiatives in AI Force, Cloud, and Engineering R&D.',
      ],
      sampleQuestions: [
        {
          question: 'What is the difference between primary key, unique key, and foreign key?',
          type: 'Technical',
          suggestedApproach: 'Primary key enforces uniqueness and non-null values for entity identification; unique key permits single null; foreign key maintains referential integrity.',
        },
        {
          question: 'Are you comfortable relocating to Chennai, Noida, or Bangalore?',
          type: 'HR',
          suggestedApproach: 'Affirm your readiness for mobility and excitement to work in premier technology hubs.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'hcl-pq-1',
        topic: 'Aptitude • Time & Work',
        question: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:',
        options: ['7/15', '8/15', '1/4', '1/10'],
        answer: '8/15',
        explanation: 'A’s 1 day work = 1/15; B’s 1 day work = 1/20. Together in 1 day = (1/15 + 1/20) = 7/60. In 4 days = 4 * (7/60) = 7/15. Remaining work = 1 - 7/15 = 8/15.',
      },
    ],
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    shortCode: 'CAP',
    tagline: 'Get the Future You Want • Global Business & Tech Transformation',
    readinessPercentage: 76,
    hiringRole: 'Analyst & Senior Analyst (Excellence Track)',
    ctcPackage: '₹4.25 LPA - ₹7.5 LPA',
    eligibility: {
      cgpaCutoff: '60% or 6.0 CGPA aggregate across all semesters',
      allowedBranches: 'All Engineering disciplines (CSE, IT, ECE, EEE, ME, CE, AI/ML)',
      backlogs: 'Zero active backlogs at the time of drive',
      gapInEducation: 'Maximum 1 year gap permitted throughout academics',
    },
    requiredSkills: [
      'Core Programming (Java, Python, or C++)',
      'Game-Based Aptitude & Cognitive Agility',
      'Pseudocode & Algorithm Tracing',
      'Relational Database Concepts & SQL',
      'Spoken & Written English Proficiency',
    ],
    selectionProcess: [
      {
        roundNumber: 1,
        title: 'Pseudocode & Technical MCQ Test',
        duration: '30 Minutes',
        description: '30 pseudocode questions testing bitwise operations, recursion, and loops.',
        keyTips: 'Brush up on bitwise operators (&, |, ^, <<, >>) and loop counters.',
      },
      {
        roundNumber: 2,
        title: 'Game-Based Cognitive Aptitude Test',
        duration: '24 Minutes',
        description: '4 gamified tasks measuring response speed, spatial memory, and deductive logic.',
        keyTips: 'Stay calm and focused; don’t panic if a game level increases in speed.',
      },
      {
        roundNumber: 3,
        title: 'Behavioral Profiling & English Test',
        duration: '30 Minutes',
        description: 'Work-style assessment measuring collaborative attitude and verbal clarity.',
        keyTips: 'Answer consistently and professionally matching standard corporate ethics.',
      },
      {
        roundNumber: 4,
        title: 'Technical & HR Composite Interview',
        duration: '40 Minutes',
        description: 'Project walkthrough, technical problem solving, resume cross-examination, and behavioral evaluation.',
        keyTips: 'Structure responses using STAR format (Situation, Task, Action, Result).',
      },
    ],
    aptitudePreparation: {
      sections: [
        {
          name: 'Pseudocode Test',
          questionsCount: 30,
          timeMinutes: 30,
          topics: ['Bitwise Operators', 'Recursion Trees', 'Nested Loops', 'Function Calls', 'Array Pointer Arithmetic'],
          difficulty: 'Hard',
        },
        {
          name: 'Game-Based Aptitude',
          questionsCount: 4,
          timeMinutes: 24,
          topics: ['Grid Challenge', 'Motion Challenge', 'Switch Challenge', 'Digit Challenge'],
          difficulty: 'Medium',
        },
        {
          name: 'English Communication',
          questionsCount: 30,
          timeMinutes: 30,
          topics: ['Sentence Correction', 'Reading Comprehension', 'Vocabulary', 'Para Jumbles'],
          difficulty: 'Easy',
        },
      ],
      strategy: 'Mastering pseudocode is the gatekeeper for Capgemini; calculate variable state step-by-step.',
    },
    codingPreparation: {
      format: 'Pseudocode Evaluation + Optional Excellence Coding (2 problems)',
      languages: ['Java', 'Python', 'C++'],
      frequentTopics: ['Recursion', 'Array Manipulation', 'Bit Manipulation', 'Dynamic Programming Basics'],
      sampleProblemTitles: [
        'Bitwise XOR sum of subarray elements',
        'Find contiguous subarray with maximum product',
        'String transformation with minimal replacements',
      ],
      recommendedApproaches: 'For pseudocode, trace dry runs on paper for 3-4 loop iterations to detect patterns.',
    },
    interviewPreparation: {
      technicalTips: [
        'Understand difference between Interface and Abstract class in OOP.',
        'Be prepared to explain database indexes and joins (Inner, Left, Right, Full Outer).',
      ],
      hrTips: [
        'Highlight adaptability to multinational agile delivery squads.',
      ],
      sampleQuestions: [
        {
          question: 'Can you instantiate an abstract class in Java or C++?',
          type: 'Technical',
          suggestedApproach: 'No, abstract classes cannot be instantiated directly; they serve as templates for derived subclasses to implement pure virtual methods.',
        },
        {
          question: 'Tell us about a time you resolved a conflict within your college project team.',
          type: 'HR',
          suggestedApproach: 'Use STAR method: explain how you listened to differing views, aligned on project deadlines, and divided tasks based on individual strengths.',
        },
      ],
    },
    previousQuestions: [
      {
        id: 'cap-pq-1',
        topic: 'Pseudocode • Bitwise',
        question: 'What is the output of the following pseudocode?\nInteger a = 8, b = 4\nInteger c = (a & b) + (a | b) + (a ^ b)\nPrint c',
        options: ['12', '20', '24', '16'],
        answer: '24',
        explanation: 'a = 8 (1000₂), b = 4 (0100₂). a & b = 0. a | b = 1100₂ = 12. a ^ b = 1100₂ = 12. So c = 0 + 12 + 12 = 24.',
      },
    ],
  },
];
