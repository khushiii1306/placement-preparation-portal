import {
  College,
  CollegePlacementStatistic,
  CollegeCompany,
  CollegePlacementDrive,
  CollegePlacementNotice,
  CollegePlacementDocument,
  CollegeEnrolledStudent,
  CollegeTrainingEvent,
  CollegePlacementResultRecord,
} from '../types';
import { updateStudentVerificationInStorage, getStudentProfile } from './studentStorage';

// Storage keys
const KEY_COLLEGES = 'placement_portal_colleges_v2';
const KEY_STATS = 'placement_portal_stats_v2';
const KEY_COMPANIES = 'placement_portal_college_companies_v2';
const KEY_DRIVES = 'placement_portal_college_drives_v2';
const KEY_NOTICES = 'placement_portal_college_notices_v2';
const KEY_DOCS = 'placement_portal_college_docs_v2';
const KEY_STUDENTS = 'placement_portal_college_students_v2';
const KEY_TRAININGS = 'placement_portal_college_trainings_v2';
const KEY_RESULTS = 'placement_portal_college_results_v2';

// ---------------------------------------------------------------------------
// 1. Initial Seed Data
// ---------------------------------------------------------------------------

export const SEED_COLLEGES: College[] = [
  {
    id: 'col_aju',
    name: 'Arka Jain University',
    code: 'AJU001',
    email: 'placement@arkajainuniversity.ac.in',
    emailDomain: '@arkajainuniversity.ac.in',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    country: 'India',
    website: 'https://arkajainuniversity.ac.in',
    officerName: 'Prof. Animesh Sen',
    officerPhone: '+91 94311 88220',
    status: 'APPROVED',
    about:
      'Arka Jain University is a premier university in Eastern India committed to industry-aligned technical education, cutting-edge research, and robust campus recruitment across Fortune 500 tech companies.',
    createdAt: '2026-01-10T10:00:00Z',
    approvedAt: '2026-01-12T14:30:00Z',
  },
  {
    id: 'col_apex',
    name: 'Apex Institute of Engineering & Technology',
    code: 'AIET001',
    email: 'placement@apex.edu',
    emailDomain: '@apex.edu',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    website: 'https://apex.edu.in',
    officerName: 'Dr. Rajiv Malhotra',
    officerPhone: '+91 98290 12345',
    status: 'APPROVED',
    about:
      'Apex Institute is renowned for its engineering excellence, dedicated placement cell, and active corporate partnerships with global technology leaders.',
    createdAt: '2026-01-15T09:00:00Z',
    approvedAt: '2026-01-16T11:00:00Z',
  },
  {
    id: 'col_xavier',
    name: "St. Xavier's University of Technology",
    code: 'SXUT09',
    email: 'admin@xaviertech.edu',
    emailDomain: '@xaviertech.edu',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    website: 'https://xaviertech.edu',
    officerName: 'Fr. Matthew Joseph',
    officerPhone: '+91 98300 44556',
    status: 'PENDING',
    about:
      'Newly registered institution awaiting AI Studio Placement Cell Board verification for onboarding placement drives.',
    createdAt: '2026-09-14T08:30:00Z',
  },
];

export const SEED_STATS: CollegePlacementStatistic[] = [
  {
    id: 'stat_aju_2025_26',
    collegeId: 'col_aju',
    academicYear: '2025-26',
    totalStudents: 500,
    eligibleStudents: 420,
    placedStudents: 350,
    placementRate: 83.33,
    highestPackage: '₹18 LPA',
    averagePackage: '₹6.5 LPA',
    minPackage: '₹3.8 LPA',
    totalCompanies: 48,
    totalOffers: 410,
    updatedAt: '2026-09-10T12:00:00Z',
  },
  {
    id: 'stat_aju_2024_25',
    collegeId: 'col_aju',
    academicYear: '2024-25',
    totalStudents: 480,
    eligibleStudents: 395,
    placedStudents: 320,
    placementRate: 81.01,
    highestPackage: '₹16.5 LPA',
    averagePackage: '₹5.8 LPA',
    minPackage: '₹3.5 LPA',
    totalCompanies: 42,
    totalOffers: 375,
    updatedAt: '2025-08-20T12:00:00Z',
  },
  {
    id: 'stat_apex_2025_26',
    collegeId: 'col_apex',
    academicYear: '2025-26',
    totalStudents: 620,
    eligibleStudents: 530,
    placedStudents: 445,
    placementRate: 83.96,
    highestPackage: '₹24 LPA',
    averagePackage: '₹7.2 LPA',
    minPackage: '₹4.0 LPA',
    totalCompanies: 56,
    totalOffers: 512,
    updatedAt: '2026-09-05T12:00:00Z',
  },
];

export const SEED_COMPANIES: CollegeCompany[] = [
  {
    id: 'comp_aju_1',
    collegeId: 'col_aju',
    name: 'Tata Consultancy Services (TCS)',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    jobRole: 'System Engineer & Digital Specialist',
    packageCTC: '₹3.8 - ₹7.5 LPA',
    location: 'Pan India / Bangalore / Kolkata',
    eligibility: 'B.Tech CSE/IT/ECE with min 60% or 6.5 CGPA, no active backlogs',
    skills: ['Java', 'Python', 'SQL', 'Data Structures', 'Logical Reasoning'],
    deadline: '2026-09-22',
    placementDate: '2026-09-25',
    description: 'Annual on-campus placement recruitment through TCS National Qualifier Test (NQT) & Digital Interview.',
  },
  {
    id: 'comp_aju_2',
    collegeId: 'col_aju',
    name: 'Infosys Limited',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Specialist Programmer (SP) & DSE',
    packageCTC: '₹6.25 - ₹9.5 LPA',
    location: 'Bangalore / Pune / Hyderabad',
    eligibility: 'All Engineering branches with 65% aggregate in 10th, 12th & Graduation',
    skills: ['Algorithms', 'Python', 'C++', 'System Design', 'DBMS'],
    deadline: '2026-09-27',
    placementDate: '2026-09-30',
    description: 'Premium specialist programmer drive for top competitive coding achievers at Arka Jain University.',
  },
  {
    id: 'comp_aju_3',
    collegeId: 'col_aju',
    name: 'Accenture India',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Associate Software Engineer (ASE)',
    packageCTC: '₹4.5 - ₹6.5 LPA',
    location: 'Gurugram / Pune / Chennai',
    eligibility: 'Min 6.0 CGPA, Max 1 backlog allowed at time of test',
    skills: ['Cloud Basics', 'Java/C#', 'Communication', 'Problem Solving'],
    deadline: '2026-10-08',
    placementDate: '2026-10-12',
    description: 'Comprehensive hiring drive covering Cognitive & Technical Assessment followed by Coding & Technical Interview.',
  },
  {
    id: 'comp_aju_4',
    collegeId: 'col_aju',
    name: 'Wipro Technologies',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    jobRole: 'Project Engineer (Elite & Turbo)',
    packageCTC: '₹3.6 - ₹6.5 LPA',
    location: 'Hyderabad / Bangalore',
    eligibility: 'B.Tech / MCA with min 60% aggregate throughout academics',
    skills: ['Core Java', 'OOP', 'Data Structures', 'Quantitative Aptitude'],
    deadline: '2026-10-18',
    placementDate: '2026-10-24',
    description: 'National Level Talent Hunt (NLTH) with direct on-campus interviews for Arka Jain students.',
  },
];

export const SEED_DRIVES: CollegePlacementDrive[] = [
  {
    id: 'drive_aju_1',
    collegeId: 'col_aju',
    companyName: 'Tata Consultancy Services (TCS)',
    driveTitle: 'TCS NQT Campus Placement Drive 2026',
    driveDate: '2026-09-25',
    deadline: '2026-09-22',
    role: 'System Engineer / Digital Specialist',
    packageCTC: '₹7.5 LPA (Digital) / ₹3.8 LPA (Ninja)',
    eligibility: 'B.Tech (CSE, IT, ECE, EE), Min 60% or 6.5 CGPA, Max 1 history of backlog',
    selectionProcess: 'Online NQT Assessment (Aptitude + Coding) -> Technical Interview -> HR Round',
    venue: 'AJU Central Computer Center (Lab 3 & 4), Block B',
    description: 'Mandatory on-campus drive. Hall tickets will be released on portal 24 hours before test.',
    status: 'UPCOMING',
  },
  {
    id: 'drive_aju_2',
    collegeId: 'col_aju',
    companyName: 'Infosys Limited',
    driveTitle: 'Infosys Special Recruitment Sprint',
    driveDate: '2026-09-30',
    deadline: '2026-09-27',
    role: 'Specialist Programmer (SP) & DSE',
    packageCTC: '₹9.5 LPA',
    eligibility: 'Min 65% in 10th, 12th, and B.Tech. Strong proficiency in algorithmic coding.',
    selectionProcess: '3-Problem Coding Qualifier (3 Hours) -> Virtual Technical Video Interview',
    venue: 'Online Proctored via Campus Network / AJU Auditorium',
    description: 'High CTC recruitment drive. Top 20 coders will be directly shortlisted for Final Round.',
    status: 'UPCOMING',
  },
  {
    id: 'drive_aju_3',
    collegeId: 'col_aju',
    companyName: 'Accenture India',
    driveTitle: 'Accenture Campus Hiring 2026-27',
    driveDate: '2026-10-12',
    deadline: '2026-10-08',
    role: 'Associate Software Engineer (ASE)',
    packageCTC: '₹6.5 LPA',
    eligibility: 'All B.Tech streams with min 6.0 CGPA',
    selectionProcess: 'Cognitive Test -> Technical Assessment -> Coding Round -> Communication Assessment -> Interview',
    venue: 'Main Campus Seminar Hall & Virtual Interview Hub',
    description: 'Registration open for all eligible final year students. Ensure resume updated.',
    status: 'ONGOING',
  },
  {
    id: 'drive_aju_4',
    collegeId: 'col_aju',
    companyName: 'Cognizant (GenC)',
    driveTitle: 'Cognizant GenC & GenC Next Hiring Drive',
    driveDate: '2026-08-20',
    deadline: '2026-08-16',
    role: 'Programmer Analyst Trainee',
    packageCTC: '₹4.0 - ₹6.75 LPA',
    eligibility: 'Min 60% aggregate across academics',
    selectionProcess: 'Aptitude & Coding Assessment -> Technical & HR Discussion',
    venue: 'Online Assessment Center',
    description: 'Completed campus drive. 42 students received final selection offer letters.',
    status: 'COMPLETED',
  },
];

export const SEED_NOTICES: CollegePlacementNotice[] = [
  {
    id: 'notice_aju_1',
    collegeId: 'col_aju',
    title: 'TCS Placement Drive Registration Open',
    description:
      'All eligible final-year B.Tech (CSE, IT, ECE) students are instructed to register on the TCS NextStep portal before 22 September 2026. Hall tickets will be verified at Lab 3.',
    date: '2026-09-15',
    expiryDate: '2026-09-22',
    attachment: 'TCS_NQT_2026_Instructions.pdf',
    isImportant: true,
    createdAt: '2026-09-15T09:30:00Z',
  },
  {
    id: 'notice_aju_2',
    collegeId: 'col_aju',
    title: 'Infosys Aptitude Test on 25 September',
    description:
      'Pre-placement aptitude booster and practice mock assessment will be conducted online on Friday, 25 September 2026 from 10:00 AM to 1:00 PM. Attendance is compulsory for shortlisted applicants.',
    date: '2026-09-14',
    expiryDate: '2026-09-25',
    attachment: 'Infosys_Syllabus_Breakdown.pdf',
    isImportant: true,
    createdAt: '2026-09-14T11:00:00Z',
  },
  {
    id: 'notice_aju_3',
    collegeId: 'col_aju',
    title: 'Bring your updated resume',
    description:
      'All registered candidates for on-campus drives must carry 3 hard copies of their updated resume (in college prescribed format), 4 passport photos, and original college ID card.',
    date: '2026-09-12',
    expiryDate: '2026-10-30',
    attachment: 'AJU_Approved_Resume_Template_2026.docx',
    isImportant: false,
    createdAt: '2026-09-12T14:15:00Z',
  },
  {
    id: 'notice_aju_4',
    collegeId: 'col_aju',
    title: 'Placement training scheduled for Monday',
    description:
      'Corporate soft skills & mock HR interview workshop with senior alumni from Google and Microsoft scheduled on Monday at 2:00 PM in the Central Auditorium.',
    date: '2026-09-10',
    expiryDate: '2026-09-21',
    attachment: 'Training_Schedule_Week_3.pdf',
    isImportant: false,
    createdAt: '2026-09-10T16:00:00Z',
  },
];

export const SEED_DOCUMENTS: CollegePlacementDocument[] = [
  {
    id: 'doc_aju_1',
    collegeId: 'col_aju',
    title: 'Placement Brochure 2026-27',
    category: 'Placement Brochure',
    fileName: 'Arka_Jain_University_Placement_Brochure_2026.pdf',
    fileSize: '3.4 MB',
    uploadDate: '2026-08-15',
    fileType: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc_aju_2',
    collegeId: 'col_aju',
    title: 'Placement Policy & Code of Conduct',
    category: 'Placement Policy',
    fileName: 'AJU_Placement_Policy_Regulations_2026.pdf',
    fileSize: '620 KB',
    uploadDate: '2026-08-20',
    fileType: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc_aju_3',
    collegeId: 'col_aju',
    title: 'Company Eligibility & Criteria Matrix',
    category: 'Company Eligibility List',
    fileName: 'Campus_Recruiters_Eligibility_Matrix_2026.xlsx',
    fileSize: '410 KB',
    uploadDate: '2026-09-01',
    fileType: 'XLSX',
    downloadUrl: '#',
  },
  {
    id: 'doc_aju_4',
    collegeId: 'col_aju',
    title: 'Annual Placement Calendar 2026-27',
    category: 'Placement Calendar',
    fileName: 'AJU_Placement_Drive_Calendar_2026_27.pdf',
    fileSize: '1.1 MB',
    uploadDate: '2026-09-02',
    fileType: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc_aju_5',
    collegeId: 'col_aju',
    title: 'Technical Training & Bootcamp Schedule',
    category: 'Training Schedule',
    fileName: 'T_and_P_Training_Master_Schedule.pdf',
    fileSize: '890 KB',
    uploadDate: '2026-09-05',
    fileType: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc_aju_6',
    collegeId: 'col_aju',
    title: 'Resume & Technical Interview Guidelines',
    category: 'Interview Guidelines',
    fileName: 'AJU_Resume_and_Interview_Master_Guidelines.pdf',
    fileSize: '1.4 MB',
    uploadDate: '2026-09-08',
    fileType: 'PDF',
    downloadUrl: '#',
  },
];

export const SEED_STUDENTS: CollegeEnrolledStudent[] = [
  {
    id: 'stud_aju_1',
    collegeId: 'col_aju',
    fullName: 'Rahul Kumar',
    email: 'rahul@arkajainuniversity.ac.in',
    enrollmentId: 'AJU202400123',
    branch: 'Computer Science & Engineering',
    academicYear: '4th Year (Final Year)',
    graduationYear: '2026',
    isVerified: true,
    verificationMethod: 'EMAIL_DOMAIN_OTP',
    status: 'ACTIVE',
    registeredAt: '2026-08-10T10:00:00Z',
    verifiedAt: '2026-08-10T10:05:00Z',
    cgpa: 8.6,
  },
  {
    id: 'stud_aju_2',
    collegeId: 'col_aju',
    fullName: 'Priya Sharma',
    email: 'priya@arkajainuniversity.ac.in',
    enrollmentId: 'AJU202400188',
    branch: 'Information Technology',
    academicYear: '4th Year (Final Year)',
    graduationYear: '2026',
    isVerified: true,
    verificationMethod: 'EMAIL_DOMAIN_OTP',
    status: 'ACTIVE',
    registeredAt: '2026-08-12T11:00:00Z',
    verifiedAt: '2026-08-12T11:04:00Z',
    cgpa: 8.9,
  },
  {
    id: 'stud_aju_3',
    collegeId: 'col_aju',
    fullName: 'Amit Patel',
    email: 'amit.patel@gmail.com',
    enrollmentId: 'AJU202400305',
    branch: 'Electronics & Communication',
    academicYear: '4th Year (Final Year)',
    graduationYear: '2026',
    isVerified: false,
    verificationMethod: 'PENDING',
    status: 'PENDING_VERIFICATION',
    registeredAt: '2026-09-14T14:30:00Z',
    cgpa: 7.8,
  },
  {
    id: 'stud_apex_1',
    collegeId: 'col_apex',
    fullName: 'Khushi Kumari',
    email: 'khushi.student@placement.edu',
    enrollmentId: 'APEX2026049',
    branch: 'Computer Science & Engineering',
    academicYear: '4th Year (Final Year)',
    graduationYear: '2026',
    isVerified: true,
    verificationMethod: 'MANUAL_OFFICER',
    status: 'ACTIVE',
    registeredAt: '2026-08-15T09:00:00Z',
    verifiedAt: '2026-08-15T10:00:00Z',
    cgpa: 8.8,
  },
];

export const SEED_RESULTS: CollegePlacementResultRecord[] = [
  {
    id: 'res_aju_1',
    collegeId: 'col_aju',
    studentName: 'Rahul Kumar',
    enrollmentId: 'AJU202400123',
    companyName: 'TCS (Digital Track)',
    packageCTC: '₹7.5 LPA',
    branch: 'CSE',
    offerDate: '2026-08-25',
    role: 'Digital Specialist Engineer',
  },
  {
    id: 'res_aju_2',
    collegeId: 'col_aju',
    studentName: 'Priya Sharma',
    enrollmentId: 'AJU202400188',
    companyName: 'Infosys Limited',
    packageCTC: '₹9.5 LPA',
    branch: 'IT',
    offerDate: '2026-08-28',
    role: 'Specialist Programmer',
  },
  {
    id: 'res_aju_3',
    collegeId: 'col_aju',
    studentName: 'Rohan Verma',
    enrollmentId: 'AJU202400054',
    companyName: 'Accenture India',
    packageCTC: '₹6.5 LPA',
    branch: 'CSE',
    offerDate: '2026-09-02',
    role: 'Associate Software Engineer',
  },
];

export const SEED_TRAININGS: CollegeTrainingEvent[] = [
  {
    id: 'tr_aju_1',
    collegeId: 'col_aju',
    title: 'Full-Stack Data Structures & Algorithmic Sprint',
    trainer: 'Er. Sandeep Mukherjee (Ex-Amazon SDE-2)',
    date: '2026-09-21',
    time: '02:00 PM - 05:00 PM',
    venue: 'Computer Lab 3, Block B',
    topic: 'Dynamic Programming, Trees & Graphs for TCS/Infosys Coding qualifiers',
    category: 'Coding',
    status: 'UPCOMING',
  },
  {
    id: 'tr_aju_2',
    collegeId: 'col_aju',
    title: 'Aptitude Speed Math & Logical Reasoning Masterclass',
    trainer: 'Prof. Alok Ranjan (Corporate Aptitude Coach)',
    date: '2026-09-23',
    time: '10:00 AM - 01:00 PM',
    venue: 'Central Auditorium',
    topic: 'Shortcut techniques in Time-Work, Speed-Distance and Syllogisms',
    category: 'Aptitude',
    status: 'UPCOMING',
  },
  {
    id: 'tr_aju_3',
    collegeId: 'col_aju',
    title: 'Mock Technical & Behavioral HR Panel Interviews',
    trainer: 'T&P Senior Alumni Council',
    date: '2026-09-28',
    time: '09:30 AM - 04:30 PM',
    venue: 'Executive Boardroom, Admin Wing',
    topic: '1-on-1 Simulated Interviews with Resume Deep Dive',
    category: 'Mock Interview',
    status: 'UPCOMING',
  },
];

// ---------------------------------------------------------------------------
// 2. LocalStorage Helpers with Seed Fallbacks
// ---------------------------------------------------------------------------

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// ---------------------------------------------------------------------------
// 3. College Management & Auth Operations
// ---------------------------------------------------------------------------

export const getCollegesList = (): College[] => {
  return loadFromStorage<College[]>(KEY_COLLEGES, SEED_COLLEGES);
};

export const getCollegeById = (collegeId: string): College | null => {
  const colleges = getCollegesList();
  return colleges.find((c) => c.id === collegeId) || null;
};

export const getCollegeByEmail = (email: string): College | null => {
  const colleges = getCollegesList();
  const normalized = email.trim().toLowerCase();
  return colleges.find((c) => c.email.toLowerCase() === normalized) || null;
};

export const getCollegeByCode = (code: string): College | null => {
  const colleges = getCollegesList();
  const normalized = code.trim().toUpperCase();
  return colleges.find((c) => c.code.toUpperCase() === normalized) || null;
};

/**
 * Register a new Institution.
 * Initial status is strictly 'PENDING' until Admin approval!
 */
export const registerInstitution = (data: {
  name: string;
  code: string;
  email: string;
  emailDomain: string;
  city: string;
  state: string;
  country: string;
  website: string;
  officerName: string;
  officerPhone: string;
  password?: string;
  about?: string;
}): { success: boolean; message: string; college: College } => {
  const colleges = getCollegesList();

  const codeUpper = data.code.trim().toUpperCase();
  const emailLower = data.email.trim().toLowerCase();
  let domain = data.emailDomain.trim().toLowerCase();
  if (!domain.startsWith('@')) {
    domain = '@' + domain;
  }

  // Check duplicates
  if (colleges.some((c) => c.code.toUpperCase() === codeUpper)) {
    throw new Error(`University code "${data.code}" is already registered.`);
  }
  if (colleges.some((c) => c.email.toLowerCase() === emailLower)) {
    throw new Error(`Official university email "${data.email}" is already registered.`);
  }

  const newCollege: College = {
    id: `col_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: data.name.trim(),
    code: codeUpper,
    email: emailLower,
    emailDomain: domain,
    city: data.city.trim(),
    state: data.state.trim(),
    country: data.country.trim() || 'India',
    website: data.website.trim(),
    officerName: data.officerName.trim(),
    officerPhone: data.officerPhone.trim(),
    status: 'PENDING', // Initially pending!
    about: data.about?.trim() || `${data.name.trim()} Training & Placement Cell.`,
    createdAt: new Date().toISOString(),
  };

  const updated = [newCollege, ...colleges];
  saveToStorage(KEY_COLLEGES, updated);

  // Initialize empty statistics for newly registered college
  const currentStats = getCollegeStatsList();
  const defaultStat: CollegePlacementStatistic = {
    id: `stat_${newCollege.id}_2026`,
    collegeId: newCollege.id,
    academicYear: '2025-26',
    totalStudents: 0,
    eligibleStudents: 0,
    placedStudents: 0,
    placementRate: 0,
    highestPackage: '₹0 LPA',
    averagePackage: '₹0 LPA',
    minPackage: '₹0 LPA',
    totalCompanies: 0,
    totalOffers: 0,
    updatedAt: new Date().toISOString(),
  };
  saveToStorage(KEY_STATS, [defaultStat, ...currentStats]);

  return {
    success: true,
    message: 'Institution registered successfully! Status is PENDING approval by AI Studio Portal Admin.',
    college: newCollege,
  };
};

/**
 * Admin action: Approve, Reject, or Suspend an institution
 */
export const updateCollegeStatus = (
  collegeId: string,
  newStatus: 'APPROVED' | 'REJECTED' | 'SUSPENDED'
): College => {
  const colleges = getCollegesList();
  const index = colleges.findIndex((c) => c.id === collegeId);
  if (index === -1) {
    throw new Error('Institution not found');
  }

  const updatedCollege: College = {
    ...colleges[index],
    status: newStatus,
    approvedAt: newStatus === 'APPROVED' ? new Date().toISOString() : colleges[index].approvedAt,
  };

  colleges[index] = updatedCollege;
  saveToStorage(KEY_COLLEGES, colleges);
  return updatedCollege;
};

// Aliases for Admin College Management Page
export const getAllCollegesForAdmin = (): College[] => getCollegesList();
export const approveCollegeByAdmin = (collegeId: string): College => updateCollegeStatus(collegeId, 'APPROVED');
export const suspendCollegeByAdmin = (collegeId: string): College => updateCollegeStatus(collegeId, 'SUSPENDED');
export const activateCollegeByAdmin = (collegeId: string): College => updateCollegeStatus(collegeId, 'APPROVED');
export const rejectCollegeByAdmin = (collegeId: string): College => updateCollegeStatus(collegeId, 'REJECTED');
export const registerCollege = (data: any) => registerInstitution(data);

/**
 * College Admin action: Edit own institution profile
 */
export const updateCollegeProfile = (
  collegeId: string,
  updates: Partial<Omit<College, 'id' | 'code' | 'status' | 'createdAt'>>
): College => {
  const colleges = getCollegesList();
  const index = colleges.findIndex((c) => c.id === collegeId);
  if (index === -1) {
    throw new Error('Institution not found');
  }

  const updated: College = {
    ...colleges[index],
    ...updates,
  };
  colleges[index] = updated;
  saveToStorage(KEY_COLLEGES, colleges);
  return updated;
};

// ---------------------------------------------------------------------------
// 4. Placement Statistics Operations (by Academic Year & College ID)
// ---------------------------------------------------------------------------

export const getCollegeStatsList = (): CollegePlacementStatistic[] => {
  return loadFromStorage<CollegePlacementStatistic[]>(KEY_STATS, SEED_STATS);
};

export const getCollegeStatsByCollege = (collegeId: string): CollegePlacementStatistic[] => {
  const all = getCollegeStatsList();
  return all.filter((s) => s.collegeId === collegeId);
};

export const saveCollegeStatYear = (
  stat: Omit<CollegePlacementStatistic, 'id'> & { id?: string }
): CollegePlacementStatistic => {
  const all = getCollegeStatsList();
  const existingIndex = all.findIndex(
    (s) => s.collegeId === stat.collegeId && s.academicYear === stat.academicYear
  );

  const finalStat: CollegePlacementStatistic = {
    id: stat.id || (existingIndex >= 0 ? all[existingIndex].id : `stat_${Date.now()}`),
    collegeId: stat.collegeId,
    academicYear: stat.academicYear,
    totalStudents: Number(stat.totalStudents) || 0,
    eligibleStudents: Number(stat.eligibleStudents) || 0,
    placedStudents: Number(stat.placedStudents) || 0,
    placementRate:
      Number(stat.placementRate) ||
      (Number(stat.eligibleStudents) > 0
        ? Number(((Number(stat.placedStudents) / Number(stat.eligibleStudents)) * 100).toFixed(2))
        : 0),
    highestPackage: stat.highestPackage || '₹0 LPA',
    averagePackage: stat.averagePackage || '₹0 LPA',
    minPackage: stat.minPackage || '₹0 LPA',
    totalCompanies: Number(stat.totalCompanies) || 0,
    totalOffers: Number(stat.totalOffers) || 0,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    all[existingIndex] = finalStat;
  } else {
    all.unshift(finalStat);
  }

  saveToStorage(KEY_STATS, all);
  return finalStat;
};

// ---------------------------------------------------------------------------
// 5. Company Management Operations (Isolated by College ID)
// ---------------------------------------------------------------------------

export const getCollegeCompaniesList = (): CollegeCompany[] => {
  return loadFromStorage<CollegeCompany[]>(KEY_COMPANIES, SEED_COMPANIES);
};

export const getCompaniesByCollege = (collegeId: string): CollegeCompany[] => {
  return getCollegeCompaniesList().filter((c) => c.collegeId === collegeId);
};

export const addCollegeCompany = (
  collegeId: string,
  companyData: Omit<CollegeCompany, 'id' | 'collegeId'>
): CollegeCompany => {
  const all = getCollegeCompaniesList();
  const newCompany: CollegeCompany = {
    id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    ...companyData,
  };
  const updated = [newCompany, ...all];
  saveToStorage(KEY_COMPANIES, updated);
  return newCompany;
};

export const updateCollegeCompany = (
  collegeId: string,
  companyId: string,
  updates: Partial<CollegeCompany>
): CollegeCompany => {
  const all = getCollegeCompaniesList();
  const index = all.findIndex((c) => c.id === companyId && c.collegeId === collegeId);
  if (index === -1) {
    throw new Error('Unauthorized or company not found for this university');
  }
  const updatedCompany = { ...all[index], ...updates };
  all[index] = updatedCompany;
  saveToStorage(KEY_COMPANIES, all);
  return updatedCompany;
};

export const deleteCollegeCompany = (collegeId: string, companyId: string): void => {
  const all = getCollegeCompaniesList();
  const filtered = all.filter((c) => !(c.id === companyId && c.collegeId === collegeId));
  saveToStorage(KEY_COMPANIES, filtered);
};

// ---------------------------------------------------------------------------
// 6. Placement Drive Management (UPCOMING / ONGOING / COMPLETED)
// ---------------------------------------------------------------------------

export const getCollegeDrivesList = (): CollegePlacementDrive[] => {
  return loadFromStorage<CollegePlacementDrive[]>(KEY_DRIVES, SEED_DRIVES);
};

export const getDrivesByCollege = (collegeId: string): CollegePlacementDrive[] => {
  return getCollegeDrivesList().filter((d) => d.collegeId === collegeId);
};

export const addCollegeDrive = (
  collegeId: string,
  driveData: Omit<CollegePlacementDrive, 'id' | 'collegeId'>
): CollegePlacementDrive => {
  const all = getCollegeDrivesList();
  const newDrive: CollegePlacementDrive = {
    id: `drive_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    ...driveData,
  };
  const updated = [newDrive, ...all];
  saveToStorage(KEY_DRIVES, updated);
  return newDrive;
};

export const updateCollegeDrive = (
  collegeId: string,
  driveId: string,
  updates: Partial<CollegePlacementDrive>
): CollegePlacementDrive => {
  const all = getCollegeDrivesList();
  const index = all.findIndex((d) => d.id === driveId && d.collegeId === collegeId);
  if (index === -1) {
    throw new Error('Drive not found or access denied');
  }
  const updatedDrive = { ...all[index], ...updates };
  all[index] = updatedDrive;
  saveToStorage(KEY_DRIVES, all);
  return updatedDrive;
};

export const deleteCollegeDrive = (collegeId: string, driveId: string): void => {
  const all = getCollegeDrivesList();
  const filtered = all.filter((d) => !(d.id === driveId && d.collegeId === collegeId));
  saveToStorage(KEY_DRIVES, filtered);
};

// ---------------------------------------------------------------------------
// 7. Placement Notices System (Published for students of this college)
// ---------------------------------------------------------------------------

export const getCollegeNoticesList = (): CollegePlacementNotice[] => {
  return loadFromStorage<CollegePlacementNotice[]>(KEY_NOTICES, SEED_NOTICES);
};

export const getNoticesByCollege = (collegeId: string): CollegePlacementNotice[] => {
  return getCollegeNoticesList().filter((n) => n.collegeId === collegeId);
};

export const addCollegeNotice = (
  collegeId: string,
  noticeData: Omit<CollegePlacementNotice, 'id' | 'collegeId'>
): CollegePlacementNotice => {
  const all = getCollegeNoticesList();
  const newNotice: CollegePlacementNotice = {
    id: `notice_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    createdAt: new Date().toISOString(),
    ...noticeData,
  };
  const updated = [newNotice, ...all];
  saveToStorage(KEY_NOTICES, updated);
  return newNotice;
};

export const deleteCollegeNotice = (collegeId: string, noticeId: string): void => {
  const all = getCollegeNoticesList();
  const filtered = all.filter((n) => !(n.id === noticeId && n.collegeId === collegeId));
  saveToStorage(KEY_NOTICES, filtered);
};

// ---------------------------------------------------------------------------
// 8. Placement Documents Management
// ---------------------------------------------------------------------------

export const getCollegeDocumentsList = (): CollegePlacementDocument[] => {
  return loadFromStorage<CollegePlacementDocument[]>(KEY_DOCS, SEED_DOCUMENTS);
};

export const getDocumentsByCollege = (collegeId: string): CollegePlacementDocument[] => {
  return getCollegeDocumentsList().filter((doc) => doc.collegeId === collegeId);
};

export const uploadCollegeDocument = (
  collegeId: string,
  docData: Omit<CollegePlacementDocument, 'id' | 'collegeId' | 'uploadDate'>
): CollegePlacementDocument => {
  const all = getCollegeDocumentsList();
  const newDoc: CollegePlacementDocument = {
    id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    uploadDate: new Date().toISOString().split('T')[0],
    ...docData,
  };
  const updated = [newDoc, ...all];
  saveToStorage(KEY_DOCS, updated);
  return newDoc;
};

export const deleteCollegeDocument = (collegeId: string, docId: string): void => {
  const all = getCollegeDocumentsList();
  const filtered = all.filter((doc) => !(doc.id === docId && doc.collegeId === collegeId));
  saveToStorage(KEY_DOCS, filtered);
};

// ---------------------------------------------------------------------------
// 9. Enrolled Students & University Verification
// ---------------------------------------------------------------------------

export const getCollegeStudentsList = (): CollegeEnrolledStudent[] => {
  return loadFromStorage<CollegeEnrolledStudent[]>(KEY_STUDENTS, SEED_STUDENTS);
};

export const getStudentsByCollege = (collegeId: string): CollegeEnrolledStudent[] => {
  return getCollegeStudentsList().filter((s) => s.collegeId === collegeId);
};

export const findStudentByEmail = (email: string): CollegeEnrolledStudent | null => {
  const all = getCollegeStudentsList();
  const norm = email.trim().toLowerCase();
  return all.find((s) => s.email.toLowerCase() === norm) || null;
};

/**
 * Register student under a college.
 * When a student selects a registered college during registration/enrollment,
 * creates a pending verification request for that college.
 * Only after College Admin approves will isVerified become true and linked.
 */
export const enrollStudentInCollege = (params: {
  collegeId: string;
  fullName: string;
  email: string;
  enrollmentId: string;
  branch: string;
  academicYear: string;
  graduationYear?: string;
  isOfficialEmailVerified?: boolean;
}): CollegeEnrolledStudent => {
  const all = getCollegeStudentsList();
  const normEmail = params.email.trim().toLowerCase();

  // Determine graduation year
  let gradYear = params.graduationYear?.trim();
  if (!gradYear) {
    if (params.academicYear.includes('4th') || params.academicYear.includes('Final') || params.academicYear.includes('Postgraduate')) {
      gradYear = '2026';
    } else if (params.academicYear.includes('3rd')) {
      gradYear = '2027';
    } else if (params.academicYear.includes('2nd')) {
      gradYear = '2028';
    } else {
      gradYear = '2029';
    }
  }

  const existingIndex = all.findIndex((s) => s.email.toLowerCase() === normEmail);

  const newStudent: CollegeEnrolledStudent = {
    id: existingIndex !== -1 ? all[existingIndex].id : `stud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId: params.collegeId,
    fullName: params.fullName.trim(),
    email: normEmail,
    enrollmentId: params.enrollmentId.trim().toUpperCase(),
    branch: params.branch.trim(),
    academicYear: params.academicYear.trim(),
    graduationYear: gradYear,
    isVerified: false, // Pending College Admin approval
    verificationMethod: 'PENDING',
    status: 'PENDING_VERIFICATION',
    registeredAt: existingIndex !== -1 ? all[existingIndex].registeredAt : new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    all[existingIndex] = newStudent;
    saveToStorage(KEY_STUDENTS, all);
  } else {
    saveToStorage(KEY_STUDENTS, [newStudent, ...all]);
  }

  return newStudent;
};

export const verifyStudentByOfficer = (collegeId: string, studentId: string): void => {
  const all = getCollegeStudentsList();
  const index = all.findIndex((s) => s.id === studentId && s.collegeId === collegeId);
  if (index !== -1) {
    const student = all[index];
    all[index] = {
      ...student,
      isVerified: true,
      verificationMethod: 'COLLEGE_ADMIN',
      status: 'ACTIVE',
      verifiedAt: new Date().toISOString(),
    };
    saveToStorage(KEY_STUDENTS, all);

    // Link the student to that college in studentStorage
    try {
      updateStudentVerificationInStorage(student.email, {
        isCollegeVerified: true,
        collegeVerificationStatus: 'APPROVED',
        collegeId: collegeId,
      });
    } catch (e) {
      console.error(e);
    }
  }
};

export const rejectStudentByOfficer = (collegeId: string, studentId: string): void => {
  const all = getCollegeStudentsList();
  const index = all.findIndex((s) => s.id === studentId && s.collegeId === collegeId);
  if (index !== -1) {
    const student = all[index];
    all[index] = {
      ...student,
      isVerified: false,
      status: 'REJECTED',
    };
    saveToStorage(KEY_STUDENTS, all);

    try {
      updateStudentVerificationInStorage(student.email, {
        isCollegeVerified: false,
        collegeVerificationStatus: 'REJECTED',
        collegeId: collegeId,
      });
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 * Check verification status of a student for accessing college-specific information
 */
export const getStudentCollegeVerificationStatus = (
  studentEmail: string,
  collegeId?: string
): {
  isVerified: boolean;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'UNLINKED';
  collegeName?: string;
  collegeId?: string;
  enrollmentId?: string;
  branch?: string;
  graduationYear?: string;
  fullName?: string;
} => {
  const normEmail = (studentEmail || '').trim().toLowerCase();
  if (!normEmail) {
    return { isVerified: false, status: 'UNLINKED' };
  }

  const all = getCollegeStudentsList();
  // Look up in college enrolled students
  const match = collegeId
    ? all.find((s) => s.email.toLowerCase() === normEmail && s.collegeId === collegeId)
    : all.find((s) => s.email.toLowerCase() === normEmail);

  if (match) {
    const col = getCollegeById(match.collegeId);
    if (match.isVerified && match.status === 'ACTIVE') {
      return {
        isVerified: true,
        status: 'VERIFIED',
        collegeName: col?.name,
        collegeId: match.collegeId,
        enrollmentId: match.enrollmentId,
        branch: match.branch,
        graduationYear: match.graduationYear || match.academicYear,
        fullName: match.fullName,
      };
    }
    if (match.status === 'REJECTED') {
      return {
        isVerified: false,
        status: 'REJECTED',
        collegeName: col?.name,
        collegeId: match.collegeId,
        enrollmentId: match.enrollmentId,
        branch: match.branch,
        graduationYear: match.graduationYear || match.academicYear,
        fullName: match.fullName,
      };
    }
    return {
      isVerified: false,
      status: 'PENDING',
      collegeName: col?.name,
      collegeId: match.collegeId,
      enrollmentId: match.enrollmentId,
      branch: match.branch,
      graduationYear: match.graduationYear || match.academicYear,
      fullName: match.fullName,
    };
  }

  // Check student profile registry
  const profile = getStudentProfile(normEmail);
  if (profile?.collegeId) {
    const col = getCollegeById(profile.collegeId);
    if (profile.isCollegeVerified) {
      return {
        isVerified: true,
        status: 'VERIFIED',
        collegeName: col?.name || profile.collegeName,
        collegeId: profile.collegeId,
        enrollmentId: profile.enrollmentId,
        branch: profile.branch,
        graduationYear: profile.graduationYear || profile.academicYear,
        fullName: profile.fullName,
      };
    }
    if (profile.collegeVerificationStatus === 'REJECTED') {
      return {
        isVerified: false,
        status: 'REJECTED',
        collegeName: col?.name || profile.collegeName,
        collegeId: profile.collegeId,
        enrollmentId: profile.enrollmentId,
        branch: profile.branch,
        graduationYear: profile.graduationYear || profile.academicYear,
        fullName: profile.fullName,
      };
    }
    return {
      isVerified: false,
      status: 'PENDING',
      collegeName: col?.name || profile.collegeName,
      collegeId: profile.collegeId,
      enrollmentId: profile.enrollmentId,
      branch: profile.branch,
      graduationYear: profile.graduationYear || profile.academicYear,
      fullName: profile.fullName,
    };
  }

  return {
    isVerified: false,
    status: 'UNLINKED',
  };
};

// ---------------------------------------------------------------------------
// 10. Training Events & Placement Results
// ---------------------------------------------------------------------------

export const getCollegeTrainingsList = (collegeId: string): CollegeTrainingEvent[] => {
  const all = loadFromStorage<CollegeTrainingEvent[]>(KEY_TRAININGS, SEED_TRAININGS);
  return all.filter((t) => t.collegeId === collegeId);
};

export const addCollegeTraining = (
  collegeId: string,
  training: Omit<CollegeTrainingEvent, 'id' | 'collegeId'>
): CollegeTrainingEvent => {
  const all = loadFromStorage<CollegeTrainingEvent[]>(KEY_TRAININGS, SEED_TRAININGS);
  const newT: CollegeTrainingEvent = {
    id: `tr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    collegeId,
    ...training,
  };
  saveToStorage(KEY_TRAININGS, [newT, ...all]);
  return newT;
};

export const getCollegeResultsList = (collegeId: string): CollegePlacementResultRecord[] => {
  const all = loadFromStorage<CollegePlacementResultRecord[]>(KEY_RESULTS, SEED_RESULTS);
  return all.filter((r) => r.collegeId === collegeId);
};

// ---------------------------------------------------------------------------
// 11. CRITICAL ACCESS CONTROL CHECK
// ---------------------------------------------------------------------------

/**
 * Access Control Rule:
 * student.college_id == content.college_id
 *
 * Ensures that a student ONLY receives placement data belonging strictly to
 * their own verified university. If unauthorized, throws or returns null.
 */
export const getAuthorizedUniversityPlacementData = (
  studentCollegeId: string | undefined | null,
  studentEmail?: string
) => {
  if (!studentCollegeId) {
    return null;
  }

  // If student email is provided, check that the student is approved/verified for this college
  if (studentEmail) {
    const verification = getStudentCollegeVerificationStatus(studentEmail, studentCollegeId);
    if (!verification.isVerified) {
      return null;
    }
  }

  const college = getCollegeById(studentCollegeId);
  if (!college) {
    return null;
  }

  // Strictly filter by student.college_id == content.college_id
  const stats = getCollegeStatsByCollege(studentCollegeId);
  const companies = getCompaniesByCollege(studentCollegeId);
  const drives = getDrivesByCollege(studentCollegeId);
  const notices = getNoticesByCollege(studentCollegeId);
  const documents = getDocumentsByCollege(studentCollegeId);
  const trainings = getCollegeTrainingsList(studentCollegeId);
  const results = getCollegeResultsList(studentCollegeId);

  return {
    college,
    stats: stats[0] || null,
    allStats: stats,
    companies,
    drives,
    notices,
    documents,
    trainings,
    results,
  };
};

// ---------------------------------------------------------------------------
// 12. OTP Verification Mock Engine
// ---------------------------------------------------------------------------

const OTP_MAP: Record<string, string> = {
  'rahul@arkajainuniversity.ac.in': '123456',
  'priya@arkajainuniversity.ac.in': '123456',
  'placement@arkajainuniversity.ac.in': '123456',
};

export const generateStudentOtp = (email: string): string => {
  const otp = '123456'; // Consistent and easy for live testing
  OTP_MAP[email.toLowerCase()] = otp;
  return otp;
};

export const verifyStudentOtp = (email: string, enteredOtp: string): boolean => {
  const key = email.toLowerCase();
  const expected = OTP_MAP[key] || '123456';
  return enteredOtp.trim() === expected || enteredOtp.trim() === '123456';
};
