export type EventType = 'Quiz' | 'Coding Challenge' | 'Hiring Challenge';

export interface CampusEvent {
  id: string;
  name: string;
  type: EventType;
  shortDescription: string;
  date: string;
  time: string;
  deadline: string;
  targetDate: string; // ISO date string for countdown timer
  deadlineDaysLeft: number;
  status: 'Registration Open' | 'Closing Soon' | 'Upcoming';
  statusColor: string; // Tailwind color class
  eligibility: string;
  iconName: 'Quiz' | 'Coding' | 'Hiring' | 'Trophy';
  themeColor: string; // gradient classes
  accentColor: string; // border/text color
  prizePool?: string;
  registeredCount: number;
  tags: string[];
  
  // Detailed information
  about: {
    overview: string;
    highlights: string[];
    organizer: string;
    mode: 'Online Proctoring' | 'College Lab Assessment' | 'Hybrid';
  };
  rules: string[];
  participationProcess: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export const EVENTS_CATALOG: CampusEvent[] = [
  {
    id: 'tech-quiz',
    name: 'TechQuiz',
    type: 'Quiz',
    shortDescription: 'Fast-paced technical & CS fundamentals quiz testing algorithms, OS, DBMS, networks, and logical aptitude.',
    date: 'October 15, 2026',
    time: '06:00 PM - 07:30 PM IST',
    deadline: 'October 12, 2026, 11:59 PM',
    targetDate: '2026-10-15T18:00:00',
    deadlineDaysLeft: 3,
    status: 'Closing Soon',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    eligibility: 'Open to all B.Tech/B.E, BCA, and MCA students across all semesters',
    iconName: 'Quiz',
    themeColor: 'from-amber-500 to-orange-600',
    accentColor: 'border-orange-200 text-orange-600',
    prizePool: '₹25,000 Cash + Certificates',
    registeredCount: 480,
    tags: ['CS Fundamentals', 'OS & DBMS', 'Speed Trivia', 'Campus Leaderboard'],
    about: {
      overview:
        'TechQuiz is our premier inter-college cognitive and technical trivia challenge designed to test your core computer science foundations, problem-solving reflexes, and logical intuition under timed conditions. Compete against top students across multiple universities and benchmark your knowledge against standard industry placement aptitude patterns.',
      highlights: [
        '45 Multiple Choice Questions in 60 minutes with rapid-fire speed bonuses',
        'Sections covering Data Structures, Algorithms, Operating Systems, Computer Networks, and SQL',
        'Real-time live percentile leaderboard and comprehensive answer analysis',
        'Official certificate of participation verified by the Placement Cell',
      ],
      organizer: 'Institute Placement Cell & Tech Innovation Club',
      mode: 'Online Proctoring',
    },
    rules: [
      'The quiz contains 45 questions to be answered in 60 minutes with automated webcam proctoring.',
      'Each correct answer awards +2 marks. Incorrect answers carry a penalty of -0.5 marks.',
      'Switching browser tabs or exiting full-screen mode more than twice will trigger automatic submission.',
      'Calculators, mobile devices, and secondary screens are strictly prohibited during the assessment window.',
      'In case of tied scores, the participant with lesser total elapsed time will receive a higher rank.',
    ],
    participationProcess: [
      {
        step: 1,
        title: 'Register Online',
        description: 'Click "Register Now" to link your college roll number and secure your test passkey.',
      },
      {
        step: 2,
        title: 'Diagnostic System Check',
        description: 'Complete a 2-minute webcam and microphone check 24 hours prior to event start.',
      },
      {
        step: 3,
        title: 'Join Live Assessment',
        description: 'Login 10 minutes prior to 06:00 PM IST on October 15th with your registered student credentials.',
      },
      {
        step: 4,
        title: 'View Ranks & Certificates',
        description: 'Instant scores, percentile badges, and solution keys will be published within 2 hours of completion.',
      },
    ],
    benefits: [
      {
        title: 'Cash Rewards & Medals',
        description: '₹12,000 for 1st Place, ₹8,000 for 2nd Place, and ₹5,000 for 3rd Place with branded trophies.',
        icon: 'Trophy',
      },
      {
        title: 'Direct Mock Test Exemption',
        description: 'Top 10% scorers receive automatic qualification waivers for tier-1 company mock rounds.',
        icon: 'Award',
      },
      {
        title: 'Verified Digital Certificate',
        description: 'Sharable LinkedIn credential certified by College Training & Placement Officers.',
        icon: 'CheckCircle',
      },
      {
        title: 'Diagnostic Skill Breakdown',
        description: 'Get deep AI-driven analytics identifying your strengths and topic-wise gap areas.',
        icon: 'BarChart',
      },
    ],
  },
  {
    id: 'coding-challenge',
    name: 'Coding Challenge',
    type: 'Coding Challenge',
    shortDescription: 'National competitive programming contest featuring algorithmic problems across dynamic programming, trees, graphs, and greedy algorithms.',
    date: 'October 22, 2026',
    time: '02:00 PM - 05:00 PM IST',
    deadline: 'October 19, 2026, 11:59 PM',
    targetDate: '2026-10-22T14:00:00',
    deadlineDaysLeft: 10,
    status: 'Registration Open',
    statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    eligibility: 'Pre-final & final year B.Tech, MCA, and M.Tech engineering students',
    iconName: 'Coding',
    themeColor: 'from-indigo-600 to-violet-700',
    accentColor: 'border-indigo-200 text-indigo-600',
    prizePool: '₹50,000 Cash + Tech Goodies',
    registeredCount: 820,
    tags: ['Data Structures', 'Algorithms', 'LeetCode-style', 'C++ / Java / Python'],
    about: {
      overview:
        'The Coding Challenge is an intensive 3-hour competitive programming showdown. Engineered to mirror technical screening assessments conducted by leading product companies (such as Amazon, Microsoft, and Google), participants will solve 4 real-world algorithmic problems ranging from medium to hard difficulty.',
      highlights: [
        '4 algorithmic challenges calibrated for balanced time complexity and corner case mastery',
        'Support for modern programming languages: C++20, Java 17, Python 3.11, and JavaScript',
        'Live dynamic leaderboard displaying execution runtime and memory efficiency',
        'Plagiarism detection software with zero-tolerance strict code similarity audits',
      ],
      organizer: 'Competitive Coding Society in collaboration with Industry Partners',
      mode: 'Online Proctoring',
    },
    rules: [
      'Contest duration is exactly 180 minutes. Submission timestamp breaks ties.',
      'Partial marking is awarded based on test cases passed (Subtask scoring model).',
      'All code must be originally authored during the contest. Using external libraries or AI tools (ChatGPT, Copilot) leads to permanent disqualification.',
      'Memory limit is 256MB, and execution time limit is 1.0s for C++/Java and 3.0s for Python.',
      'Code submissions will be checked by MOSS (Measure of Software Similarity) after the contest.',
    ],
    participationProcess: [
      {
        step: 1,
        title: 'One-Click Registration',
        description: 'Verify your GitHub / Student profile and register your preferred language.',
      },
      {
        step: 2,
        title: 'Warm-up Sandbox',
        description: 'Access practice questions in the code execution sandbox 48 hours prior to test your IDE setup.',
      },
      {
        step: 3,
        title: 'Compete Live',
        description: 'Write, compile, and run code against hidden stress test cases in the contest environment.',
      },
      {
        step: 4,
        title: 'Leaderboard & Prizes',
        description: 'Official ranking announcement with editorial walkthroughs and prize distribution.',
      },
    ],
    benefits: [
      {
        title: '₹50,000 Prize Pool',
        description: 'Cash rewards for Top 5 contestants plus exclusive mechanical keyboards and tech gear.',
        icon: 'Gift',
      },
      {
        title: 'Placement Cell Priority Pass',
        description: 'Top 25 performers receive direct recommendations to visiting product development teams.',
        icon: 'Star',
      },
      {
        title: 'Editorial Solution Walkthroughs',
        description: 'In-depth code explanations and optimal O(N) complexity breakdowns by senior architects.',
        icon: 'BookOpen',
      },
      {
        title: 'National Coding Rank Badge',
        description: 'Add an elite certified competitive rank badge to your resume and campus portfolio.',
        icon: 'ShieldCheck',
      },
    ],
  },
  {
    id: 'hiring-challenge',
    name: 'Hiring Challenge',
    type: 'Hiring Challenge',
    shortDescription: 'Comprehensive recruitment assessment offering direct interview shortlists with premier software and fintech recruiters.',
    date: 'November 05, 2026',
    time: '10:00 AM - 01:00 PM IST',
    deadline: 'November 01, 2026, 11:59 PM',
    targetDate: '2026-11-05T10:00:00',
    deadlineDaysLeft: 24,
    status: 'Registration Open',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    eligibility: '2026 & 2027 Graduating Batches with 60%+ in 10th, 12th & Graduation',
    iconName: 'Hiring',
    themeColor: 'from-emerald-600 to-teal-700',
    accentColor: 'border-emerald-200 text-emerald-600',
    prizePool: '15+ Direct Interview Fast-Tracks',
    registeredCount: 1250,
    tags: ['Placement Fast-Track', 'Full-Time & Internships', '6 to 18 LPA', 'Direct Interviews'],
    about: {
      overview:
        'The Mega Campus Hiring Challenge is a consolidated recruitment drive backed by multiple corporate hiring partners. Candidates scoring above the 80th percentile skip initial resume screening and online rounds, moving directly into Technical Interview Rounds for Associate Software Engineer and SDE-1 roles.',
      highlights: [
        'Multi-round assessment: 30 Aptitude & CS MCQs + 2 Data Structure Coding Challenges',
        'Over 15 hiring partner companies recruiting with packages ranging from 6.5 LPA to 18 LPA',
        'Direct HR interview fast-track invitations sent within 5 working days of assessment',
        'Zero registration fees sponsored fully by the University Training & Placement Directorate',
      ],
      organizer: 'Central Training & Placement Directorate with Corporate Talent Consortium',
      mode: 'Online Proctoring',
    },
    rules: [
      'Applicants must meet minimum 60% aggregate academic criteria across standard 10th, 12th, and current CGPA.',
      'No active dead backlogs permitted at the time of final interview rounds.',
      'Both Sections (Cognitive Aptitude + Coding) are mandatory; sectional cutoffs apply.',
      'Candidate identity will be verified via college ID card scan before starting the examination.',
      'Offer letters issued under this challenge adhere to the standard college placement policy guidelines.',
    ],
    participationProcess: [
      {
        step: 1,
        title: 'Registration & Resume Upload',
        description: 'Confirm attendance and ensure your verified resume PDF is attached to your dashboard profile.',
      },
      {
        step: 2,
        title: 'Slot Confirmation & Admit Card',
        description: 'Receive your unique candidate assessment key and login credentials 48 hours in advance.',
      },
      {
        step: 3,
        title: 'Online Hiring Assessment',
        description: 'Complete the 180-minute proctored assessment testing cognitive aptitude, CS theory, and coding.',
      },
      {
        step: 4,
        title: 'Direct Interview Invitations',
        description: 'Shortlisted candidates receive direct interview schedules from hiring partner HR teams.',
      },
    ],
    benefits: [
      {
        title: 'Direct Interview Shortlisting',
        description: 'Bypass preliminary resume filters and online coding rounds with top hiring partners.',
        icon: 'Briefcase',
      },
      {
        title: 'High-Value CTC Packages',
        description: 'Opportunities ranging from 6.5 LPA to 18 LPA across full-time and 6-month internship tracks.',
        icon: 'IndianRupee',
      },
      {
        title: 'Comprehensive Candidate Report',
        description: 'Receive an industry-standard skill scorecard to demonstrate proficiency to recruiters.',
        icon: 'FileText',
      },
      {
        title: 'Personalized Mentorship Call',
        description: 'Top 50 finalists receive a 1-on-1 interview prep session with senior FAANG engineering mentors.',
        icon: 'UserCheck',
      },
    ],
  },
  {
    id: 'aptitude-speed-quiz',
    name: 'Aptitude Blitz Quiz',
    type: 'Quiz',
    shortDescription: 'High-intensity quantitative aptitude and logical speed test simulating TCS NQT and Infosys Cognitive tests.',
    date: 'October 28, 2026',
    time: '05:00 PM - 06:15 PM IST',
    deadline: 'October 25, 2026, 11:59 PM',
    targetDate: '2026-10-28T17:00:00',
    deadlineDaysLeft: 16,
    status: 'Registration Open',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    eligibility: 'All college students preparing for campus placements',
    iconName: 'Quiz',
    themeColor: 'from-blue-600 to-indigo-700',
    accentColor: 'border-blue-200 text-blue-600',
    prizePool: '₹15,000 + Aptitude Mastery Kit',
    registeredCount: 390,
    tags: ['Quant Aptitude', 'Time & Work', 'Logical Reasoning', 'Speed Math'],
    about: {
      overview:
        'Aptitude Blitz is designed specifically for students who want to polish their calculation speed, mental math shortcuts, and rapid logical deduction. Built around the exact syllabi of top IT services and banking screening examinations.',
      highlights: [
        '50 Questions in 50 Minutes - 1 minute per question blitz format',
        'Covers Number Systems, Percentages, Profit & Loss, Syllogisms, and Blood Relations',
        'Detailed shortcut video solutions unlocked immediately following the contest',
      ],
      organizer: 'Campus Quantitative Training Cell',
      mode: 'Online Proctoring',
    },
    rules: [
      'Each question has a strict maximum timer of 75 seconds.',
      'No navigation back to previous questions once submitted.',
      'Marks: +1 for correct, 0 for unattempted, -0.25 for incorrect.',
    ],
    participationProcess: [
      {
        step: 1,
        title: 'Register Free',
        description: 'Single-click enrollment open to all registered portal students.',
      },
      {
        step: 2,
        title: 'Attempt the Blitz',
        description: 'Fast-paced online test on October 28th at 05:00 PM IST.',
      },
      {
        step: 3,
        title: 'Analyze Performance',
        description: 'Check your speed score vs accuracy trade-offs with granular analytics.',
      },
    ],
    benefits: [
      {
        title: 'Speed Math Handbook',
        description: 'All participants receive a curated 120-page formula and shortcut cheat sheet.',
        icon: 'BookOpen',
      },
      {
        title: 'Top Performer Vouchers',
        description: 'Amazon gift cards for the top 10 fastest and most accurate solvers.',
        icon: 'Gift',
      },
    ],
  },
  {
    id: 'fintech-hiring-challenge',
    name: 'FinTech SDE Hiring Challenge',
    type: 'Hiring Challenge',
    shortDescription: 'Dedicated hiring contest sponsored by tier-1 fintech firms for Backend, Data, and Full-Stack engineer roles.',
    date: 'November 18, 2026',
    time: '11:00 AM - 02:00 PM IST',
    deadline: 'November 14, 2026, 11:59 PM',
    targetDate: '2026-11-18T11:00:00',
    deadlineDaysLeft: 37,
    status: 'Upcoming',
    statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
    eligibility: 'Final year B.Tech/M.Tech (CSE, IT, ECE) with 65%+ aggregate',
    iconName: 'Hiring',
    themeColor: 'from-purple-600 to-pink-700',
    accentColor: 'border-purple-200 text-purple-600',
    prizePool: '10 to 16 LPA Full-Time Offers',
    registeredCount: 640,
    tags: ['FinTech', 'High Frequency Systems', 'Backend & Cloud', 'SDE-1'],
    about: {
      overview:
        'Co-hosted by leading fintech and digital payment unicorn startups, this hiring challenge assesses database scaling, distributed system concepts, concurrency, and algorithmic efficiency for high-scale financial technology roles.',
      highlights: [
        'Curated by Principal Engineers from top fintech firms',
        '2 Coding Problems + 1 System Design MCQ Section',
        'Direct SDE-1 and Backend Intern roles on offer',
      ],
      organizer: 'National FinTech Developer Network & College TPO',
      mode: 'Online Proctoring',
    },
    rules: [
      'Strict adherence to the code of conduct and proctoring requirements.',
      'Language choices include Java, Go, Python, C++, and TypeScript.',
      'Shortlists determined by overall benchmark score and solution code quality.',
    ],
    participationProcess: [
      {
        step: 1,
        title: 'Sign Up & Profile Sync',
        description: 'Complete student registration and link project portfolio.',
      },
      {
        step: 2,
        title: '3-Hour Online Test',
        description: 'Complete algorithm and system reasoning questions on November 18.',
      },
      {
        step: 3,
        title: 'Interviews & Offer Letters',
        description: 'Direct on-site or virtual interview loops conducted within 7 days.',
      },
    ],
    benefits: [
      {
        title: 'High CTC Packages',
        description: 'Starting packages from 10 LPA to 16 LPA with equity and joining bonuses.',
        icon: 'Briefcase',
      },
      {
        title: 'Engineering Mentorship',
        description: 'Direct access to senior backend architects and engineering leadership.',
        icon: 'UserCheck',
      },
    ],
  },
];
