export type UserRole = 'student' | 'college' | 'admin';

export type CollegeStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface College {
  id: string; // e.g. "col_aju"
  name: string;
  code: string; // e.g. "AJU001"
  email: string; // official email e.g. "placement@arkajainuniversity.ac.in"
  emailDomain: string; // e.g. "@arkajainuniversity.ac.in"
  city: string;
  state: string;
  country: string;
  website: string;
  officerName: string;
  officerPhone: string;
  status: CollegeStatus;
  logo?: string;
  about?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface CollegePlacementStatistic {
  id: string;
  collegeId: string;
  academicYear: string; // e.g. "2025-26"
  totalStudents: number;
  eligibleStudents: number;
  placedStudents: number;
  placementRate: number; // percentage e.g. 83.33
  highestPackage: string; // e.g. "₹18 LPA"
  averagePackage: string; // e.g. "₹6.5 LPA"
  minPackage: string; // e.g. "₹3.6 LPA"
  totalCompanies: number;
  totalOffers: number;
  updatedAt?: string;
}

export interface CollegeCompany {
  id: string;
  collegeId: string;
  name: string;
  logo: string;
  jobRole: string;
  packageCTC: string;
  location: string;
  eligibility: string;
  skills: string[];
  deadline: string;
  placementDate: string;
  description: string;
}

export interface CollegePlacementDrive {
  id: string;
  collegeId: string;
  companyName: string;
  driveTitle: string;
  driveDate: string;
  deadline: string;
  role: string;
  packageCTC: string;
  eligibility: string;
  selectionProcess: string;
  venue: string;
  description: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
}

export interface CollegePlacementNotice {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  date: string;
  expiryDate: string;
  attachment?: string;
  isImportant: boolean;
  createdAt?: string;
}

export interface CollegePlacementDocument {
  id: string;
  collegeId: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  fileType: 'PDF' | 'DOC' | 'DOCX' | 'XLSX';
  downloadUrl?: string;
}

export interface CollegeEnrolledStudent {
  id: string;
  collegeId: string;
  fullName: string;
  email: string;
  enrollmentId: string;
  branch: string;
  academicYear: string;
  graduationYear?: string;
  isVerified: boolean;
  verificationMethod: 'EMAIL_DOMAIN_OTP' | 'MANUAL_OFFICER' | 'PENDING' | 'COLLEGE_ADMIN';
  status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'REJECTED';
  registeredAt: string;
  verifiedAt?: string;
  cgpa?: number;
}

export interface CollegeTrainingEvent {
  id: string;
  collegeId: string;
  title: string;
  trainer: string;
  date: string;
  time: string;
  venue: string;
  topic: string;
  category: 'Aptitude' | 'Coding' | 'Soft Skills' | 'Mock Interview';
  status: 'UPCOMING' | 'COMPLETED';
}

export interface CollegePlacementResultRecord {
  id: string;
  collegeId: string;
  studentName: string;
  enrollmentId: string;
  companyName: string;
  packageCTC: string;
  branch: string;
  offerDate: string;
  role: string;
}

export interface UserProfile {
  name: string;
  email: string;
  collegeName: string;
  branch: string;
  academicYear: string;
  rollNumber?: string;
  batch?: string;
  cgpa?: number;
  avatar?: string;
}

export interface StudentRegistrationData {
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  academicYear: string;
  password: string;
}

export interface UpcomingDrive {
  id: string;
  company: string;
  logo: string;
  role: string;
  ctc: string;
  driveDate: string;
  status: 'Registration Open' | 'Eligible' | 'Shortlisted' | 'Interview Scheduled';
  deadline: string;
  location: string;
}

export interface PrepModule {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  iconName: string;
}

export interface CompanyReadiness {
  id: string;
  company: string;
  logo: string;
  readinessPercentage: number;
  tier: string;
  eligibilityCutoff: string;
  aptitudeScore: number;
  codingScore: number;
  interviewScore: number;
  nextDriveDate: string;
  hiringRole: string;
  ctc: string;
  color: string;
}

export interface RecommendedItem {
  id: string;
  title: string;
  type: 'Practice' | 'Mock Test' | 'Challenge';
  category: string;
  duration: string;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attemptsCount: number;
  rating: number;
  tags: string[];
}

export interface PerformanceTopic {
  topic: string;
  score: number;
  benchmark: number;
  recentScores: number[];
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'drive' | 'test' | 'system';
}

export type PracticeDifficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface PracticeTopicItem {
  name: string;
  questionsCount: number;
  completedCount: number;
}

export interface PracticeCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  questionsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progressPercentage: number;
  topics: string[];
  detailedTopics?: PracticeTopicItem[];
  estimatedTime: string;
  lastPracticed?: string;
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface MCQQuestion {
  id: number;
  questionNumber: number;
  category: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: MCQOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  formulaHint?: string;
}
