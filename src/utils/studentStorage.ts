import { MockTestItem, MockTestResultData, DEFAULT_MOCK_RESULT } from '../data/mockTestsData';

export interface StudentProfile {
  id: string; // Unique student ID e.g. "student_1726588291000_abc"
  fullName: string;
  email: string;
  collegeName: string;
  collegeId?: string;
  enrollmentId?: string;
  branch: string;
  academicYear: string;
  graduationYear?: string;
  isCollegeVerified?: boolean;
  collegeVerificationStatus?: 'APPROVED' | 'PENDING' | 'REJECTED';
  registeredAt: string;
}

export interface StudentMockTestHistoryItem {
  id: string;
  name: string;
  date: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  category: string;
  benchmark: number;
}

export interface StudentPerformanceData {
  studentId: string;
  studentEmail: string;

  // Progress metrics (0% for newly registered student)
  overallProgress: number;
  aptitudeProgress: number;
  reasoningProgress: number;
  verbalProgress: number;
  codingProgress: number;
  dataInterpretationProgress: number;

  // Category questions solved
  categoryQuestionsSolved: {
    quant: number;
    logical: number;
    verbal: number;
    di: number;
    coding: number;
  };

  // High-level counters
  questionsAttempted: number;
  mockTestsCompleted: number;
  examAttempts: number;
  averageScore: number;

  // Test Results & History
  results: MockTestResultData[];
  latestMockResult: MockTestResultData | null;
  testHistory: StudentMockTestHistoryItem[];
  previousAttempts: Array<{
    id: string;
    testTitle: string;
    category: string;
    date: string;
    score: number;
    total: number;
    timeSpent: string;
  }>;

  // Company Preparation Progress (0% / empty for newly registered student)
  companyReadiness: Record<string, number>;

  // Coding solved problems map
  completedCodingProblems: Record<string, boolean>;

  // Registered Events
  registeredEventsMap: Record<string, boolean>;

  // Weekly/recent performance trends for PerformanceChart
  performanceTrends: {
    aptitudeRecent: number[];
    reasoningRecent: number[];
    verbalRecent: number[];
    codingRecent: number[];
  };
}

const STORAGE_PREFIX = 'placement_student_data_v1_';
const PROFILE_PREFIX = 'placement_student_profile_v1_';
const REGISTRY_KEY = 'placement_registered_students_registry_v1';
 // Dedicated demo account if needed

/**
 * Creates a completely fresh, blank student performance data object.
 * All progress = 0%, all counts = 0, all histories = empty.
 */
export const createFreshStudentData = (studentId: string, studentEmail: string): StudentPerformanceData => ({
  studentId,
  studentEmail,
  overallProgress: 0,
  aptitudeProgress: 0,
  reasoningProgress: 0,
  verbalProgress: 0,
  codingProgress: 0,
  dataInterpretationProgress: 0,
  categoryQuestionsSolved: {
    quant: 0,
    logical: 0,
    verbal: 0,
    di: 0,
    coding: 0,
  },
  questionsAttempted: 0,
  mockTestsCompleted: 0,
  examAttempts: 0,
  averageScore: 0,
  results: [],
  latestMockResult: null,
  testHistory: [],
  previousAttempts: [],
  companyReadiness: {},
  completedCodingProblems: {},
  registeredEventsMap: {},
  performanceTrends: {
    aptitudeRecent: [0, 0, 0, 0, 0],
    reasoningRecent: [0, 0, 0, 0, 0],
    verbalRecent: [0, 0, 0, 0, 0],
    codingRecent: [0, 0, 0, 0, 0],
  },
});

/**
 * Pre-populated demo performance data for the pre-seeded demo user ONLY.
 */


function sanitizeKey(identifier: string): string {
  return identifier.toLowerCase().trim().replace(/[^a-z0-9_@.-]/g, '_');
}

/**
 * Get the list of all registered student profiles.
 */
export const getRegisteredStudentsList = (): StudentProfile[] => {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load registered students registry', e);
    return [];
  }
};

/**
 * Register a newly created student account.
 * Guarantees fresh 0% progress and data isolated to this student's unique ID.
 */
export const registerNewStudent = (data: {
  fullName: string;
  email: string;
  collegeName: string;
  collegeId?: string;
  enrollmentId?: string;
  branch: string;
  academicYear: string;
  graduationYear?: string;
}): { profile: StudentProfile; performanceData: StudentPerformanceData } => {
  const normalizedEmail = data.email.toLowerCase().trim();
  const studentId = `student_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const resolvedCollegeId = data.collegeId || undefined;

  let gradYear = data.graduationYear?.trim();
  if (!gradYear) {
    if (data.academicYear.includes('4th') || data.academicYear.includes('Final') || data.academicYear.includes('Postgraduate')) {
      gradYear = '2026';
    } else if (data.academicYear.includes('3rd')) {
      gradYear = '2027';
    } else if (data.academicYear.includes('2nd')) {
      gradYear = '2028';
    } else {
      gradYear = '2029';
    }
  }

  const profile: StudentProfile = {
    id: studentId,
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    collegeName: data.collegeName.trim(),
    collegeId: resolvedCollegeId,
    enrollmentId: data.enrollmentId?.trim(),
    branch: data.branch,
    academicYear: data.academicYear,
    graduationYear: gradYear,
    isCollegeVerified: false,
    collegeVerificationStatus: 'PENDING',
    registeredAt: new Date().toISOString(),
  };

  // Every newly registered student starts with fresh 0% data
  const performanceData = createFreshStudentData(studentId, normalizedEmail);

  try {
    // 1. Save profile under email and studentId
    localStorage.setItem(`${PROFILE_PREFIX}${sanitizeKey(normalizedEmail)}`, JSON.stringify(profile));
    localStorage.setItem(`${PROFILE_PREFIX}${sanitizeKey(studentId)}`, JSON.stringify(profile));

    // 2. Save isolated performance data under email and studentId
    const perfJson = JSON.stringify(performanceData);
    localStorage.setItem(`${STORAGE_PREFIX}${sanitizeKey(normalizedEmail)}`, perfJson);
    localStorage.setItem(`${STORAGE_PREFIX}${sanitizeKey(studentId)}`, perfJson);

    // 3. Add to registry
    const registry = getRegisteredStudentsList().filter(
      (p) => p.email.toLowerCase() !== normalizedEmail && p.id !== studentId
    );
    registry.push(profile);
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Error saving new student registration to localStorage', e);
  }

  return { profile, performanceData };
};

/**
 * Update a student's college verification status and link in storage
 */
export const updateStudentVerificationInStorage = (
  email: string,
  verification: {
    isCollegeVerified: boolean;
    collegeVerificationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
    collegeId?: string;
  }
) => {
  const normEmail = email.toLowerCase().trim();
  const profile = getStudentProfile(normEmail);
  if (profile) {
    profile.isCollegeVerified = verification.isCollegeVerified;
    profile.collegeVerificationStatus = verification.collegeVerificationStatus;
    if (verification.collegeId) {
      profile.collegeId = verification.collegeId;
    }
    try {
      localStorage.setItem(`${PROFILE_PREFIX}${sanitizeKey(normEmail)}`, JSON.stringify(profile));
      localStorage.setItem(`${PROFILE_PREFIX}${sanitizeKey(profile.id)}`, JSON.stringify(profile));
      const registry = getRegisteredStudentsList().map((p) =>
        p.email.toLowerCase() === normEmail ? profile : p
      );
      localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
    } catch (e) {
      console.error('Failed to update student verification in storage', e);
    }
  }
};

/**
 * Look up a student profile by email or student ID.
 */
export const getStudentProfile = (emailOrId: string): StudentProfile | null => {
  if (!emailOrId) return null;
  const key = sanitizeKey(emailOrId);
  try {
    const raw = localStorage.getItem(`${PROFILE_PREFIX}${key}`);
    if (raw) return JSON.parse(raw);

    // Fallback: check registry
    const registry = getRegisteredStudentsList();
    const found = registry.find(
      (s) => s.email.toLowerCase() === emailOrId.toLowerCase() || s.id === emailOrId
    );
    return found || null;
  } catch (e) {
    console.error('Error loading student profile', e);
    return null;
  }
};

/**
 * Save updated student profile (e.g. from Profile page).
 */
export const updateStudentProfile = (profile: StudentProfile): void => {
  try {
    const keyEmail = sanitizeKey(profile.email);
    const keyId = sanitizeKey(profile.id);
    const raw = JSON.stringify(profile);
    localStorage.setItem(`${PROFILE_PREFIX}${keyEmail}`, raw);
    localStorage.setItem(`${PROFILE_PREFIX}${keyId}`, raw);

    const registry = getRegisteredStudentsList().map((p) =>
      p.id === profile.id || p.email.toLowerCase() === profile.email.toLowerCase() ? profile : p
    );
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Error updating student profile', e);
  }
};

/**
 * Convenience helper to save or update student profile fields.
 */
export const saveStudentProfile = (data: {
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  academicYear: string;
}): StudentProfile => {
  const existing = getStudentProfile(data.email);
  const profile: StudentProfile = {
    id: existing?.id || `student_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: data.fullName,
    email: data.email.toLowerCase().trim(),
    collegeName: data.collegeName,
    branch: data.branch,
    academicYear: data.academicYear,
    registeredAt: existing?.registeredAt || new Date().toISOString(),
  };
  updateStudentProfile(profile);
  return profile;
};

/**
 * Retrieve performance data for a given student ID or email.
 * Ensures strict isolation: each student sees only their own saved data.
 * Newly registered students or users without saved data start with fresh 0% data.
 */
export const getStudentPerformanceData = (emailOrId: string): StudentPerformanceData => {
  if (!emailOrId) {
    return createFreshStudentData('unknown', 'unknown');
  }

  const key = sanitizeKey(emailOrId);

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (raw) {
      const parsed = JSON.parse(raw) as StudentPerformanceData;
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse student data from localStorage', e);
  }

  // If this is the explicit demo credentials button email AND user never registered freshly
  

  // For any other student (including any newly registered student), return fresh 0% data
  const freshData = createFreshStudentData(`student_${key}`, emailOrId);
  saveStudentPerformanceData(emailOrId, freshData);
  return freshData;
};

/**
 * Persist student performance data isolated to their student ID / email.
 */
export const saveStudentPerformanceData = (
  emailOrId: string,
  data: StudentPerformanceData
): void => {
  if (!emailOrId) return;
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(`${STORAGE_PREFIX}${sanitizeKey(emailOrId)}`, json);
    if (data.studentId && data.studentId !== emailOrId) {
      localStorage.setItem(`${STORAGE_PREFIX}${sanitizeKey(data.studentId)}`, json);
    }
    if (data.studentEmail && data.studentEmail !== emailOrId) {
      localStorage.setItem(`${STORAGE_PREFIX}${sanitizeKey(data.studentEmail)}`, json);
    }
  } catch (e) {
    console.error('Error saving student performance data to localStorage', e);
  }
};

/**
 * Record a completed mock test for a specific student.
 */
export const recordStudentMockTest = (
  emailOrId: string,
  testItem: MockTestItem,
  result: MockTestResultData
): StudentPerformanceData => {
  const current = getStudentPerformanceData(emailOrId);

  const updatedMockTestsCompleted = current.mockTestsCompleted + 1;
  const updatedExamAttempts = current.examAttempts + 1;
  const updatedQuestionsAttempted = current.questionsAttempted + (result.totalQuestions || 0);

  const newHistoryItem: StudentMockTestHistoryItem = {
    id: `mock-${Date.now()}`,
    name: testItem.title,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
    score: result.scorePercentage,
    totalQuestions: result.totalQuestions,
    accuracy: result.accuracy ?? Math.round(((result.correctAnswers || 0) / (result.totalQuestions || 1)) * 100),
    category: testItem.category,
    benchmark: 70,
  };

  const updatedTestHistory = [newHistoryItem, ...current.testHistory];
  const updatedResults = [result, ...current.results];

  // Calculate new average score across all tests
  const sumScores = updatedTestHistory.reduce((acc, curr) => acc + curr.score, 0);
  const updatedAverageScore = Math.round(sumScores / updatedTestHistory.length);

  // Update relevant category progress
  let updatedAptitude = current.aptitudeProgress;
  let updatedReasoning = current.reasoningProgress;
  let updatedVerbal = current.verbalProgress;
  let updatedCoding = current.codingProgress;

  if (testItem.category === 'Aptitude' || testItem.title.toLowerCase().includes('aptitude')) {
    updatedAptitude = Math.max(current.aptitudeProgress, result.scorePercentage);
  } else if (testItem.category === 'Coding' || testItem.title.toLowerCase().includes('coding')) {
    updatedCoding = Math.max(current.codingProgress, result.scorePercentage);
  } else {
    // General screening mock: updates aptitude, reasoning, verbal evenly
    updatedAptitude = Math.max(current.aptitudeProgress, Math.round(result.scorePercentage * 0.9));
    updatedReasoning = Math.max(current.reasoningProgress, Math.round(result.scorePercentage * 0.95));
    updatedVerbal = Math.max(current.verbalProgress, Math.round(result.scorePercentage * 0.85));
  }

  // Update Overall Progress based on completed tests and category benchmarks
  const categoryAvg = Math.round(
    (updatedAptitude + updatedReasoning + updatedVerbal + updatedCoding) / 4
  );
  const testsWeight = Math.min(100, Math.round((updatedMockTestsCompleted / 8) * 100));
  const updatedOverallProgress = Math.min(
    100,
    Math.round(categoryAvg * 0.7 + testsWeight * 0.3)
  );

  // Update company readiness if applicable
  const updatedCompanyReadiness = { ...current.companyReadiness };
  if (testItem.title.toLowerCase().includes('tcs') || testItem.category === 'Company-wise') {
    updatedCompanyReadiness['comp-tcs'] = Math.round(result.scorePercentage * 0.9);
    updatedCompanyReadiness['tcs'] = Math.round(result.scorePercentage * 0.9);
    updatedCompanyReadiness['comp-infosys'] = Math.round(result.scorePercentage * 0.85);
    updatedCompanyReadiness['infosys'] = Math.round(result.scorePercentage * 0.85);
    updatedCompanyReadiness['comp-accenture'] = Math.round(result.scorePercentage * 0.8);
    updatedCompanyReadiness['accenture'] = Math.round(result.scorePercentage * 0.8);
  }

  const updatedData: StudentPerformanceData = {
    ...current,
    mockTestsCompleted: updatedMockTestsCompleted,
    examAttempts: updatedExamAttempts,
    questionsAttempted: updatedQuestionsAttempted,
    averageScore: updatedAverageScore,
    overallProgress: updatedOverallProgress,
    aptitudeProgress: updatedAptitude,
    reasoningProgress: updatedReasoning,
    verbalProgress: updatedVerbal,
    codingProgress: updatedCoding,
    results: updatedResults,
    latestMockResult: result,
    testHistory: updatedTestHistory,
    companyReadiness: updatedCompanyReadiness,
    performanceTrends: {
      aptitudeRecent: [...current.performanceTrends.aptitudeRecent.slice(1), updatedAptitude],
      reasoningRecent: [...current.performanceTrends.reasoningRecent.slice(1), updatedReasoning],
      verbalRecent: [...current.performanceTrends.verbalRecent.slice(1), updatedVerbal],
      codingRecent: [...current.performanceTrends.codingRecent.slice(1), updatedCoding],
    },
  };

  saveStudentPerformanceData(emailOrId, updatedData);
  return updatedData;
};

/**
 * Record practice MCQ completion for a specific student.
 */
export const recordStudentPracticeMCQ = (
  emailOrId: string,
  categoryTitle: string,
  totalQuestions: number,
  correctQuestions: number,
  resultData?: MockTestResultData
): StudentPerformanceData => {
  const current = getStudentPerformanceData(emailOrId);

  const updatedQuestionsAttempted = current.questionsAttempted + totalQuestions;
  const catSolved = { ...current.categoryQuestionsSolved };

  const isQuant = categoryTitle.toLowerCase().includes('quant') || categoryTitle.toLowerCase().includes('aptitude');
  const isReasoning = categoryTitle.toLowerCase().includes('logical') || categoryTitle.toLowerCase().includes('reasoning');
  const isVerbal = categoryTitle.toLowerCase().includes('verbal');
  const isDI = categoryTitle.toLowerCase().includes('data') || categoryTitle.toLowerCase().includes('interpretation');

  let updatedAptitude = current.aptitudeProgress;
  let updatedReasoning = current.reasoningProgress;
  let updatedVerbal = current.verbalProgress;
  let updatedDI = current.dataInterpretationProgress;

  const scorePct = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  if (isQuant) {
    catSolved.quant += correctQuestions;
    updatedAptitude = Math.min(100, Math.max(current.aptitudeProgress, Math.round((catSolved.quant / 110) * 100) || scorePct));
  } else if (isReasoning) {
    catSolved.logical += correctQuestions;
    updatedReasoning = Math.min(100, Math.max(current.reasoningProgress, Math.round((catSolved.logical / 90) * 100) || scorePct));
  } else if (isVerbal) {
    catSolved.verbal += correctQuestions;
    updatedVerbal = Math.min(100, Math.max(current.verbalProgress, Math.round((catSolved.verbal / 75) * 100) || scorePct));
  } else if (isDI) {
    catSolved.di += correctQuestions;
    updatedDI = Math.min(100, Math.max(current.dataInterpretationProgress, Math.round((catSolved.di / 45) * 100) || scorePct));
  }

  const updatedOverallProgress = Math.round(
    (updatedAptitude + updatedReasoning + updatedVerbal + updatedDI + current.codingProgress) / 5
  );

  const updatedResults = resultData ? [resultData, ...current.results] : current.results;
  const updatedLatestMock = resultData || current.latestMockResult;

  const updatedData: StudentPerformanceData = {
    ...current,
    questionsAttempted: updatedQuestionsAttempted,
    categoryQuestionsSolved: catSolved,
    aptitudeProgress: updatedAptitude,
    reasoningProgress: updatedReasoning,
    verbalProgress: updatedVerbal,
    dataInterpretationProgress: updatedDI,
    overallProgress: updatedOverallProgress,
    results: updatedResults,
    latestMockResult: updatedLatestMock,
  };

  saveStudentPerformanceData(emailOrId, updatedData);
  return updatedData;
};

/**
 * Record coding problem completion for a specific student.
 */
export const recordStudentCodingProblem = (
  emailOrId: string,
  problemId: string,
  isCompleted: boolean
): StudentPerformanceData => {
  const current = getStudentPerformanceData(emailOrId);
  const updatedCompleted = { ...current.completedCodingProblems, [problemId]: isCompleted };
  const totalCompleted = Object.values(updatedCompleted).filter(Boolean).length;
  const codingProgress = Math.min(100, Math.round((totalCompleted / 20) * 100));

  const catSolved = {
    ...current.categoryQuestionsSolved,
    coding: totalCompleted,
  };

  const updatedQuestionsAttempted = isCompleted
    ? current.questionsAttempted + 1
    : current.questionsAttempted;

  const updatedOverallProgress = Math.round(
    (current.aptitudeProgress + current.reasoningProgress + current.verbalProgress + current.dataInterpretationProgress + codingProgress) / 5
  );

  const updatedData: StudentPerformanceData = {
    ...current,
    completedCodingProblems: updatedCompleted,
    codingProgress,
    categoryQuestionsSolved: catSolved,
    questionsAttempted: updatedQuestionsAttempted,
    overallProgress: updatedOverallProgress,
  };

  saveStudentPerformanceData(emailOrId, updatedData);
  return updatedData;
};

/**
 * Record campus event registration for a specific student.
 */
export const recordStudentEventRegistration = (
  emailOrId: string,
  eventId: string
): StudentPerformanceData => {
  const current = getStudentPerformanceData(emailOrId);
  const updatedEvents = { ...current.registeredEventsMap, [eventId]: true };

  const updatedData: StudentPerformanceData = {
    ...current,
    registeredEventsMap: updatedEvents,
  };

  saveStudentPerformanceData(emailOrId, updatedData);
  return updatedData;
};
