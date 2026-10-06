export interface JobOpportunity {
  id: string;
  company: string;
  logoText: string;
  logoColor: string;
  role: string;
  category: 'Placement' | 'Internship';
  location: string;
  locationCity: 'Pan-India' | 'Bengaluru' | 'Hyderabad' | 'Pune' | 'Chennai';
  eligibility: string;
  eligibilityCategory: 'B.Tech 60%+' | 'B.Tech 65%+' | 'All Degrees';
  requiredSkills: string[];
  package: string;
  packageCategory: '< 4 LPA' | '4-7 LPA' | '> 7 LPA';
  deadline: string;
  deadlineDaysLeft: number;
  readinessPercentage: number;
  readinessBreakdown: {
    aptitude: number;
    coding: number;
    logical: number;
    communication: number;
  };
  externalApplyUrl: string;
  aboutCompany: string;
  companyTier: string;
  jobDescription: {
    summary: string;
    responsibilities: string[];
    growthTrack: string;
  };
  eligibilityCriteria: {
    degreesAllowed: string[];
    minimumMarks: string;
    backlogPolicy: string;
    yearOfPassing: string;
    gapInEducation: string;
  };
  requiredSkillsDetailed: {
    technical: string[];
    tools: string[];
    softSkills: string[];
  };
  selectionProcess: Array<{
    step: number;
    title: string;
    duration: string;
    description: string;
  }>;
  importantDates: Array<{
    event: string;
    date: string;
    status: 'Completed' | 'Active' | 'Upcoming';
  }>;
  applicationInfo: {
    portalName: string;
    portalUrl: string;
    requiredDocuments: string[];
    instructions: string[];
    tpoNotice: string;
  };
}

export const JOBS_CATALOG: JobOpportunity[] = [
  {
    id: 'job-tcs-2026',
    company: 'TCS',
    logoText: 'TCS',
    logoColor: 'from-blue-700 via-indigo-800 to-slate-900',
    role: 'Systems Engineer & Digital Software Developer',
    category: 'Placement',
    location: 'Pan-India (Bengaluru, Hyderabad, Pune, Chennai)',
    locationCity: 'Pan-India',
    eligibility: 'B.Tech / BE / MCA (All Branches) • 60% or 6.0 CGPA throughout',
    eligibilityCategory: 'B.Tech 60%+',
    requiredSkills: ['Java / Python', 'Data Structures & Algorithms', 'SQL & DBMS', 'OOP Concepts', 'Git'],
    package: '₹7.0 - ₹9.0 LPA (Digital / Prime) | ₹3.6 LPA (Ninja)',
    packageCategory: '4-7 LPA',
    deadline: 'October 18, 2026',
    deadlineDaysLeft: 6,
    readinessPercentage: 72,
    readinessBreakdown: {
      aptitude: 78,
      coding: 68,
      logical: 74,
      communication: 70,
    },
    externalApplyUrl: 'https://nextstep.tcs.com/campus/#/',
    aboutCompany:
      'Tata Consultancy Services is a global leader in IT services, consulting, and business solutions with a network of innovation and delivery centers worldwide. TCS is part of the prestigious Tata group, India’s largest multinational business group.',
    companyTier: 'Tier-1 Mass & Super Dream Recruiter',
    jobDescription: {
      summary:
        'Selected candidates will work in cutting-edge enterprise units engineering cloud architectures, banking microservices, AI/ML pipelines, and resilient full-stack applications serving Fortune 500 clients.',
      responsibilities: [
        'Design, implement, and test high-throughput scalable software systems in Java, Python, or Go.',
        'Collaborate with agile scrum teams across product development, automated testing, and CI/CD pipelines.',
        'Optimize database queries and RESTful microservices for low latency and high availability.',
        'Participate in code reviews, technical architecture sessions, and production reliability sprints.',
      ],
      growthTrack:
        'Fast-track appraisal cycle for Digital and Prime tier hires, with specialized certifications via TCS Elevate Wings and cross-border mobility opportunities after 18 months.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['B.Tech / B.E. (All Engineering Branches)', 'M.Tech / M.E.', 'MCA with BCA/B.Sc background'],
      minimumMarks: 'Minimum 60% or 6.0 CGPA in 10th, 12th, Diploma (if applicable), and Graduation',
      backlogPolicy: 'No active / standing backlogs at the time of appearing for the on-campus assessment',
      yearOfPassing: 'Class of 2026 & 2027 eligible for current registration window',
      gapInEducation: 'Overall academic gap must not exceed 24 months until graduation',
    },
    requiredSkillsDetailed: {
      technical: ['Java / Python / C++', 'Data Structures (Trees, Graphs, Hash Maps)', 'Relational Databases (MySQL/PostgreSQL)', 'REST APIs & Web Services'],
      tools: ['Git & GitHub', 'Linux Shell Scripting', 'Docker Basics', 'Postman'],
      softSkills: ['Analytical Reasoning', 'Technical Problem Decomposition', 'Clear Professional Communication', 'Team Collaboration'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'TCS NQT Online Screening Assessment',
        duration: '90 Minutes',
        description: 'Covers Numerical Ability (20 Qs), Reasoning Ability (20 Qs), Verbal Ability (25 Qs), and 2 Hands-on Coding problems (Python/Java/C++).',
      },
      {
        step: 2,
        title: 'Technical Interview Round',
        duration: '35-45 Minutes',
        description: 'In-depth assessment of algorithms, projects listed on your resume, DBMS normalization, indexing, and live code walkthrough.',
      },
      {
        step: 3,
        title: 'Managerial & HR Behavioral Round',
        duration: '20-30 Minutes',
        description: 'Cultural fitment evaluation, relocation readiness, situational scenario questions, and communication assessment.',
      },
      {
        step: 4,
        title: 'Offer Letter & Onboarding Verification',
        duration: 'Within 2 Weeks',
        description: 'Digital/Ninja stream allocation based on composite NQT and interview ranking, followed by official letter release.',
      },
    ],
    importantDates: [
      { event: 'Registration Portal Opens', date: 'September 20, 2026', status: 'Completed' },
      { event: 'College T&P Candidate Verification', date: 'October 05, 2026', status: 'Completed' },
      { event: 'Application Deadline', date: 'October 18, 2026', status: 'Active' },
      { event: 'On-Campus TCS NQT Exam', date: 'October 25 - 26, 2026', status: 'Upcoming' },
      { event: 'Technical & HR Interviews', date: 'November 05 - 08, 2026', status: 'Upcoming' },
      { event: 'Final Result & Offer Rollout', date: 'November 20, 2026', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'TCS NextStep Campus Portal',
      portalUrl: 'https://nextstep.tcs.com/campus/#/',
      requiredDocuments: [
        'College Identity Card & Bonafide Certificate',
        'Official Transcript / Marksheets till current semester',
        'Government Photo ID (Aadhaar Card or Passport)',
        'Updated Professional Placement Resume (1-2 pages in PDF format)',
      ],
      instructions: [
        'Ensure your TCS DT Reference Number is generated on TCS NextStep before applying.',
        'Confirm that your personal details (Name, DOB, College Roll No) match your official college records exactly.',
        'Report any backlogs or discrepancies to the college Training & Placement officer before final submission.',
      ],
      tpoNotice: 'Mandatory drive for eligible B.Tech/MCA students. Strict formal dress code and college ID card required during the exam.',
    },
  },
  {
    id: 'job-infosys-2026',
    company: 'Infosys',
    logoText: 'INFY',
    logoColor: 'from-sky-600 via-blue-700 to-indigo-900',
    role: 'Specialist Programmer (SP) & Digital Specialist Engineer',
    category: 'Placement',
    location: 'Bengaluru, Hyderabad, Pune',
    locationCity: 'Bengaluru',
    eligibility: 'B.Tech / BE / M.Tech (CS, IT, ECE, EE) • 65% aggregate or 6.5 CGPA+',
    eligibilityCategory: 'B.Tech 65%+',
    requiredSkills: ['Data Structures & Algorithms', 'C++ / Java / Python', 'Dynamic Programming', 'Graph Theory', 'System Design'],
    package: '₹6.5 - ₹9.5 LPA (Specialist Programmer) | ₹4.0 LPA (SE)',
    packageCategory: '> 7 LPA',
    deadline: 'October 24, 2026',
    deadlineDaysLeft: 12,
    readinessPercentage: 68,
    readinessBreakdown: {
      aptitude: 74,
      coding: 65,
      logical: 72,
      communication: 68,
    },
    externalApplyUrl: 'https://career.infosys.com/joblist',
    aboutCompany:
      'Infosys is a global leader in next-generation digital services and consulting. With over four decades of pioneering technological advancements, Infosys enables clients in more than 56 countries to navigate their digital transformation journeys.',
    companyTier: 'Premium Product & Elite Coding Track',
    jobDescription: {
      summary:
        'The Specialist Programmer (SP) role is an elite high-compensation technical role focused on complex algorithm implementation, high-performance distributed systems, and open-source contributions.',
      responsibilities: [
        'Engineer algorithmic solutions for high-concurrency systems and distributed cloud infrastructures.',
        'Implement low-level optimizations and complex data structure routines for financial and enterprise domains.',
        'Contribute to Infosys Topaz generative AI platforms and cloud automation stacks.',
        'Collaborate with principal architects on zero-trust security and microservice reliability.',
      ],
      growthTrack:
        'Direct track to Senior Systems Architect or Tech Lead within 3 years, with immediate placement in core engineering labs.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['B.Tech / B.E. (Circuit & Computing branches)', 'M.Tech in CS/IT/Data Science', 'Integrated Dual Degrees'],
      minimumMarks: 'Minimum 65% or 6.5 CGPA across 10th, 12th, and all semesters in B.Tech',
      backlogPolicy: 'Zero active backlogs allowed at registration',
      yearOfPassing: 'Batch of 2026 passing out students',
      gapInEducation: 'Maximum 1 year gap permitted post 12th standard',
    },
    requiredSkillsDetailed: {
      technical: ['Advanced Data Structures', 'Greedy & Dynamic Programming', 'Time & Space Complexity Profiling', 'Multi-threading in Java/C++'],
      tools: ['Linux/Unix Terminal', 'Docker Containers', 'Git Version Control', 'GDB / LLDB Debuggers'],
      softSkills: ['Root-Cause Analysis', 'Structured Problem Solving', 'Adaptability under Pressure', 'Technical Articulation'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'Infosys HackWithInfy / Coding Assessment',
        duration: '180 Minutes',
        description: '3 Hard algorithmic problems focusing on Dynamic Programming, Graph Algorithms, and Segment Trees / Math.',
      },
      {
        step: 2,
        title: 'Technical Architecture & Live Coding Round',
        duration: '60 Minutes',
        description: 'Pair programming on whiteboard/screen share with Senior Technical Specialists exploring runtime tradeoffs.',
      },
      {
        step: 3,
        title: 'Leadership & HR Interview',
        duration: '20 Minutes',
        description: 'Discussion of past project dilemmas, hackathon wins, continuous learning attitude, and team ethics.',
      },
    ],
    importantDates: [
      { event: 'Campus Registration Window Opens', date: 'October 01, 2026', status: 'Completed' },
      { event: 'Mock Coding Warm-up Test', date: 'October 15, 2026', status: 'Active' },
      { event: 'Application Deadline', date: 'October 24, 2026', status: 'Active' },
      { event: 'InfyTQ / SP Coding Round', date: 'November 02, 2026', status: 'Upcoming' },
      { event: 'Interviews & Offer Announcement', date: 'November 15, 2026', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'Infosys Career & InfyTQ Hub',
      portalUrl: 'https://career.infosys.com/joblist',
      requiredDocuments: [
        'College Bonafide Certificate and Official Grade Sheets',
        'Government Issued Photo ID',
        'Competitive Coding Profiles (LeetCode / Codeforces / GitHub links)',
        'Standard College Resume',
      ],
      instructions: [
        'Create and verify your profile on the official Infosys Career portal.',
        'Ensure code submitted during tests has optimal algorithmic complexity to pass all hidden test cases.',
      ],
      tpoNotice: 'High-package category. Students who qualify the coding cutoff are exempted from the standard verbal aptitude round.',
    },
  },
  {
    id: 'job-accenture-2026',
    company: 'Accenture',
    logoText: 'ACN',
    logoColor: 'from-purple-700 via-indigo-800 to-slate-900',
    role: 'Associate Software Engineer (ASE) & Advanced ASE',
    category: 'Placement',
    location: 'Bengaluru, Hyderabad, Pune, Chennai, Gurugram',
    locationCity: 'Pan-India',
    eligibility: 'B.Tech / BE (All Disciplines) / MCA • 6.5 CGPA or 65% with no active backlogs',
    eligibilityCategory: 'B.Tech 65%+',
    requiredSkills: ['Full-Stack Fundamentals', 'JavaScript / TypeScript / React', 'Core Java', 'Cloud Essentials', 'Pseudocode & Logic'],
    package: '₹4.5 - ₹6.5 LPA (Advanced ASE) | ₹4.5 LPA (ASE)',
    packageCategory: '4-7 LPA',
    deadline: 'November 04, 2026',
    deadlineDaysLeft: 23,
    readinessPercentage: 64,
    readinessBreakdown: {
      aptitude: 70,
      coding: 60,
      logical: 68,
      communication: 65,
    },
    externalApplyUrl: 'https://www.accenture.com/in-en/careers',
    aboutCompany:
      'Accenture is a leading global professional services company that helps the world’s leading businesses, governments and other organizations build their digital core, optimize their operations, accelerate revenue growth and enhance citizen services.',
    companyTier: 'Tier-1 Consulting & Digital Transformation',
    jobDescription: {
      summary:
        'Join global multidisciplinary teams delivering enterprise-scale digital transformations, modern cloud applications, cybersecurity architectures, and enterprise AI integrations.',
      responsibilities: [
        'Develop, test, maintain, and support robust enterprise web applications and API gateways.',
        'Implement automated unit and integration tests to ensure enterprise software reliability.',
        'Work closely with business analysts to translate client functional requirements into technical specifications.',
        'Adopt DevOps best practices and cloud platform fundamentals (AWS, Azure, GCP).',
      ],
      growthTrack:
        'Structured 12-month foundational learning roadmap followed by accelerated promotion cycles based on project client praise and skill mastery certifications.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['All B.Tech/B.E Streams', 'M.Tech / M.E.', 'MCA / M.Sc Computer Science'],
      minimumMarks: 'Minimum 65% or 6.5 CGPA without round-off in current degree',
      backlogPolicy: 'No standing arrears or backlogs at the time of online application and onboarding',
      yearOfPassing: '2026 graduating batch',
      gapInEducation: 'Maximum 1 year gap between 10th and graduation',
    },
    requiredSkillsDetailed: {
      technical: ['Core Java / Python / C#', 'HTML5, CSS3, Modern JavaScript', 'Relational Databases & SQL', 'Cloud Concepts'],
      tools: ['Git', 'VS Code', 'Jira Basics', 'Jenkins CI basics'],
      softSkills: ['Critical Reasoning', 'Client Interpersonal Skills', 'Adaptability', 'Verbal Fluency'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'Cognitive & Technical Assessment',
        duration: '90 Minutes',
        description: 'Covers English Ability (17 Qs), Critical Reasoning (18 Qs), Abstract Reasoning (15 Qs), Common Apps & MS Office (12 Qs), Pseudocode (18 Qs), and Networking/Cloud (10 Qs).',
      },
      {
        step: 2,
        title: 'Coding Assessment (Immediately following Step 1 if cleared)',
        duration: '45 Minutes',
        description: '2 Coding problems evaluating array manipulation, strings, logic building, and matrix mathematics.',
      },
      {
        step: 3,
        title: 'Automated Communication Assessment',
        duration: '30 Minutes',
        description: 'Audio-based evaluation assessing sentence mastery, vocabulary, fluency, and pronunciation.',
      },
      {
        step: 4,
        title: 'Virtual Technical & HR Interview',
        duration: '25-30 Minutes',
        description: 'Review of projects, scenario-based teamwork questions, and problem-solving mindset.',
      },
    ],
    importantDates: [
      { event: 'Registration Portal Opens', date: 'October 10, 2026', status: 'Active' },
      { event: 'Application Deadline', date: 'November 04, 2026', status: 'Active' },
      { event: 'Phase 1 Online Cognitive Exam', date: 'November 12 - 14, 2026', status: 'Upcoming' },
      { event: 'Communication Assessment Window', date: 'November 18 - 20, 2026', status: 'Upcoming' },
      { event: 'Interviews & Letters', date: 'December 02, 2026', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'Accenture India Campus Careers',
      portalUrl: 'https://www.accenture.com/in-en/careers',
      requiredDocuments: [
        'Aadhaar Card (Mandatory for identity verification)',
        'Latest College Marksheet / Grade Card',
        'Official Passport Size Photograph (White Background)',
        'Updated Resume in PDF format',
      ],
      instructions: [
        'Cognitive and Coding rounds are knockout rounds conducted consecutively in the same testing session.',
        'A working webcam and microphone are strictly mandatory for the proctored assessment and audio round.',
      ],
      tpoNotice: 'Eligible candidates will receive individual hall tickets and proctored test links directly to their registered college email IDs.',
    },
  },
  {
    id: 'job-wipro-2026',
    company: 'Wipro',
    logoText: 'WIPRO',
    logoColor: 'from-emerald-700 via-teal-800 to-slate-900',
    role: 'Project Engineer (Elite National Talent Hunt - NLTH)',
    category: 'Placement',
    location: 'Hyderabad, Bengaluru, Pune, Chennai, Kolkata',
    locationCity: 'Hyderabad',
    eligibility: 'B.Tech / BE (All Branches) • 60% or 6.0 CGPA throughout 10th, 12th & Graduation',
    eligibilityCategory: 'B.Tech 60%+',
    requiredSkills: ['C / C++ / Java', 'Object Oriented Programming', 'Basic Database Queries', 'Aptitude & Reasoning', 'Business Communication'],
    package: '₹3.6 - ₹4.2 LPA + Joining Performance Bonus',
    packageCategory: '< 4 LPA',
    deadline: 'November 12, 2026',
    deadlineDaysLeft: 31,
    readinessPercentage: 76,
    readinessBreakdown: {
      aptitude: 82,
      coding: 70,
      logical: 78,
      communication: 74,
    },
    externalApplyUrl: 'https://careers.wipro.com/careers-home/',
    aboutCompany:
      'Wipro Limited is a premier technology services and consulting company focused on building innovative solutions that address clients’ most complex digital transformation needs.',
    companyTier: 'Tier-1 Mass & Global Enterprise IT Services',
    jobDescription: {
      summary:
        'The Elite National Talent Hunt hires talented fresh engineering graduates to undergo specialized domain training in full-stack web, cyber defense, cloud native, or ERP platforms before billable deployment.',
      responsibilities: [
        'Develop software modules according to detailed functional requirements and test specifications.',
        'Collaborate with global onshore and offshore teams on software maintenance and upgrades.',
        'Troubleshoot software defects and ensure clean documentation for production releases.',
        'Complete Wipro Velocity foundational certifications in modern software engineering.',
      ],
      growthTrack:
        'Promising Project Engineers are promoted to Senior Software Engineers within 2 years, with specialized incentives for cloud and AI track qualifications.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['B.Tech / B.E. (All branches except fashion/textile/agriculture)', '5-Year Integrated M.Tech'],
      minimumMarks: 'Minimum 60% or 6.0 CGPA in 10th, 12th, and all semesters of graduation',
      backlogPolicy: 'Maximum 1 active backlog allowed at the time of online exam (must be cleared before joining)',
      yearOfPassing: 'Batch of 2026 graduating students',
      gapInEducation: 'Maximum 3 years gap permitted in education overall',
    },
    requiredSkillsDetailed: {
      technical: ['C / C++ / Core Java / Python', 'Foundational Data Structures', 'SQL Basics (CRUD, Joins)', 'HTML/CSS Basics'],
      tools: ['Git', 'Eclipse / VS Code', 'MySQL Workbench'],
      softSkills: ['Logical Deduction', 'Written English Comprehension', 'Interpersonal Skills'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'Wipro Elite National Talent Assessment',
        duration: '128 Minutes',
        description: 'Comprises Aptitude Test (48 mins: Logical, Quantitative, English), Written Communication (20 mins essay), and Online Programming Test (60 mins: 2 coding questions).',
      },
      {
        step: 2,
        title: 'Technical & Business Discussion',
        duration: '30 Minutes',
        description: 'Comprehensive review of final year academic project, coding approach in exam, and core CS basics.',
      },
      {
        step: 3,
        title: 'HR Discussion & Onboarding Formalities',
        duration: '15 Minutes',
        description: 'Verification of academic criteria, service agreements, and preferred location allocation.',
      },
    ],
    importantDates: [
      { event: 'Registration Gateway Opens', date: 'October 12, 2026', status: 'Active' },
      { event: 'Application Deadline', date: 'November 12, 2026', status: 'Active' },
      { event: 'Nationwide Assessment Window', date: 'November 22 - 25, 2026', status: 'Upcoming' },
      { event: 'Virtual Interviews', date: 'December 08 - 14, 2026', status: 'Upcoming' },
      { event: 'Offer Release', date: 'January 2027', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'Wipro Elite NLTH Registration Portal',
      portalUrl: 'https://careers.wipro.com/careers-home/',
      requiredDocuments: [
        'Government Photo ID Proof (PAN / Aadhaar / Voter ID)',
        '10th, 12th Marks Memo',
        'Consolidated Semester Marksheets',
        'Resume formatted in single PDF file',
      ],
      instructions: [
        'Candidates must write code in one of the approved languages: C, C++, Java, or Python.',
        'Essay writing section requires clean grammar, sentence variety, and coherence.',
      ],
      tpoNotice: 'All eligible registered students will be provided campus computer lab slots for taking the proctored test.',
    },
  },
  {
    id: 'job-cognizant-2026',
    company: 'Cognizant',
    logoText: 'CTS',
    logoColor: 'from-blue-600 via-sky-800 to-indigo-950',
    role: 'GenC Next & GenC Elevate Software Engineer',
    category: 'Placement',
    location: 'Chennai, Coimbatore, Bengaluru, Hyderabad, Pune',
    locationCity: 'Chennai',
    eligibility: 'B.Tech / BE (CS, IT, ECE, EEE, Mechanical) • 60% or 6.0 CGPA without standing arrears',
    eligibilityCategory: 'B.Tech 60%+',
    requiredSkills: ['Full Stack Development', 'Node.js / Python / Java', 'Relational & NoSQL Databases', 'Cloud Microservices', 'DSA'],
    package: '₹6.75 LPA (GenC Next) | ₹4.25 LPA (GenC Elevate)',
    packageCategory: '4-7 LPA',
    deadline: 'November 18, 2026',
    deadlineDaysLeft: 37,
    readinessPercentage: 70,
    readinessBreakdown: {
      aptitude: 76,
      coding: 67,
      logical: 72,
      communication: 70,
    },
    externalApplyUrl: 'https://careers.cognizant.com/global/en',
    aboutCompany:
      'Cognizant engineers modern businesses to improve everyday life. As one of the world’s leading technology solutions companies, Cognizant helps clients modernize technology, reimagine processes and transform experiences.',
    companyTier: 'Tier-1 Digital Engineering & IT Consulting',
    jobDescription: {
      summary:
        'GenC Next is Cognizant’s premier developer hiring track focused on full-stack web, cloud microservices, and AI-driven automation systems.',
      responsibilities: [
        'Build scalable microservices and responsive web user interfaces.',
        'Collaborate with agile squads on cloud engineering and infrastructure automation.',
        'Deploy automated testing suites and telemetry monitoring for cloud-native apps.',
      ],
      growthTrack: 'Fast-track promotion path to Senior Software Engineer with early client exposure.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['B.Tech / B.E.', 'MCA', 'M.Tech'],
      minimumMarks: 'Minimum 60% aggregate in 10th, 12th, and B.Tech',
      backlogPolicy: 'No active backlogs allowed at registration',
      yearOfPassing: 'Batch of 2026',
      gapInEducation: 'Maximum 2 years gap permitted',
    },
    requiredSkillsDetailed: {
      technical: ['Java / Python / JavaScript', 'Data Structures & Algorithms', 'REST APIs', 'SQL / MongoDB'],
      tools: ['Git', 'Docker', 'Postman'],
      softSkills: ['Analytical Mindset', 'Communication', 'Teamwork'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'Cognizant Skill-Based Screening',
        duration: '100 Minutes',
        description: 'Advanced Coding (2 Problems), Tech MCQs, and Aptitude Reasoning.',
      },
      {
        step: 2,
        title: 'Technical Discussion',
        duration: '40 Minutes',
        description: 'Project architecture, DSA complexity analysis, and database design.',
      },
      {
        step: 3,
        title: 'HR & Fitment Interview',
        duration: '20 Minutes',
        description: 'Communication skills and relocation flexibility.',
      },
    ],
    importantDates: [
      { event: 'Registration Portal Opens', date: 'October 15, 2026', status: 'Active' },
      { event: 'Application Deadline', date: 'November 18, 2026', status: 'Active' },
      { event: 'Skill Assessment Round', date: 'December 02 - 04, 2026', status: 'Upcoming' },
      { event: 'Interview Dates', date: 'December 15 - 18, 2026', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'Cognizant Superset Campus Drive',
      portalUrl: 'https://careers.cognizant.com/global/en',
      requiredDocuments: ['College ID Card', 'Latest Transcript', 'Government ID Proof', 'Resume'],
      instructions: ['Register with your official college email ID on Superset.'],
      tpoNotice: 'Drive is open for both GenC Next (6.75 LPA) and GenC Elevate (4.25 LPA) tracks.',
    },
  },
  {
    id: 'job-capgemini-2026',
    company: 'Capgemini',
    logoText: 'CAP',
    logoColor: 'from-blue-700 via-indigo-900 to-slate-900',
    role: 'Senior Software Analyst & Cloud Developer',
    category: 'Placement',
    location: 'Pune, Mumbai, Bengaluru, Hyderabad',
    locationCity: 'Pune',
    eligibility: 'B.Tech / BE (CS, IT, Circuit Branches) • 60% or 6.0 CGPA without arrears',
    eligibilityCategory: 'B.Tech 60%+',
    requiredSkills: ['Core Java / Python', 'Data Structures', 'Cloud Fundamentals', 'SQL & RDBMS', 'Game-Based Aptitude'],
    package: '₹4.0 - ₹7.5 LPA (Differential hiring based on performance)',
    packageCategory: '4-7 LPA',
    deadline: 'November 25, 2026',
    deadlineDaysLeft: 44,
    readinessPercentage: 66,
    readinessBreakdown: {
      aptitude: 72,
      coding: 63,
      logical: 70,
      communication: 65,
    },
    externalApplyUrl: 'https://www.capgemini.com/in-en/careers/',
    aboutCompany:
      'Capgemini is a global business and technology transformation partner, helping organizations to accelerate their transition to the digital and sustainable world.',
    companyTier: 'Tier-1 Global Consulting & Technology Services',
    jobDescription: {
      summary:
        'Work as a Cloud and Software Analyst implementing scalable digital architectures, enterprise ERP integrations, and resilient cloud systems.',
      responsibilities: [
        'Develop and unit-test business modules in Java/Python frameworks.',
        'Collaborate on cloud migrations and containerized application deployments.',
        'Analyze system requirements and deliver technical documentation.',
      ],
      growthTrack: 'Opportunity to advance through Capgemini University learning pathways and global project rotations.',
    },
    eligibilityCriteria: {
      degreesAllowed: ['B.Tech / B.E.', 'MCA'],
      minimumMarks: 'Minimum 60% or 6.0 CGPA in 10th, 12th, and B.Tech',
      backlogPolicy: 'No active backlog at registration',
      yearOfPassing: '2026',
      gapInEducation: 'Maximum 1 year gap allowed',
    },
    requiredSkillsDetailed: {
      technical: ['Java / Python', 'Data Structures', 'SQL', 'Web Technologies'],
      tools: ['Git', 'VS Code', 'AWS / Azure Basics'],
      softSkills: ['Logical Reasoning', 'Communication', 'Collaborative Mindset'],
    },
    selectionProcess: [
      {
        step: 1,
        title: 'Technical Assessment & Pseudocode',
        duration: '40 Minutes',
        description: '30 Questions on Pseudocode and Technical fundamentals.',
      },
      {
        step: 2,
        title: 'English Communication & Game-Based Aptitude',
        duration: '45 Minutes',
        description: 'Interactive gamified cognitive challenges and verbal proficiency test.',
      },
      {
        step: 3,
        title: 'Coding Assessment (For Higher Package Track)',
        duration: '45 Minutes',
        description: '2 Algorithmic coding questions.',
      },
      {
        step: 4,
        title: 'Technical & HR Discussion',
        duration: '30 Minutes',
        description: 'Final interview evaluating projects and interpersonal fit.',
      },
    ],
    importantDates: [
      { event: 'Registration Portal Opens', date: 'October 20, 2026', status: 'Active' },
      { event: 'Application Deadline', date: 'November 25, 2026', status: 'Active' },
      { event: 'Assessment Schedule', date: 'December 05 - 08, 2026', status: 'Upcoming' },
      { event: 'Interviews', date: 'December 20 - 23, 2026', status: 'Upcoming' },
    ],
    applicationInfo: {
      portalName: 'Capgemini Campus Recruitment Portal',
      portalUrl: 'https://www.capgemini.com/in-en/careers/',
      requiredDocuments: ['College ID Card', 'Latest Transcript', 'Government ID', 'Resume PDF'],
      instructions: ['Complete all test sections on a desktop or laptop with webcam enabled.'],
      tpoNotice: 'Differential packages awarded based on performance in the coding round.',
    },
  },
];
