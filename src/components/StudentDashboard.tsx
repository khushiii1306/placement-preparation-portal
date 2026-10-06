import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  FileCheck2,
  TrendingUp,
  Target,
  Building2,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Award,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Filter,
  ExternalLink,
  School,
  Bell,
  FileText,
} from 'lucide-react';
import { TopNavbar } from './TopNavbar';
import { Sidebar, SidebarSection } from './Sidebar';
import { PerformanceChart } from './PerformanceChart';
import { TestSimulatorModal } from './TestSimulatorModal';
import { PracticeSection } from './PracticeSection';
import { MCQPracticePage } from './MCQPracticePage';
import { CodingPracticePage } from './CodingPracticePage';
import { MockTestsListingPage } from './MockTestsListingPage';
import { FullScreenMockTest } from './FullScreenMockTest';
import { TestResultPage } from './TestResultPage';
import { StudentProgressPage } from './StudentProgressPage';
import { CompaniesJobsPage } from './CompaniesJobsPage';
import { CompanyDetailsPage } from './CompanyDetailsPage';
import { EventsChallengesPage } from './EventsChallengesPage';
import { EventDetailsPage } from './EventDetailsPage';
import { StudentProfilePage } from './StudentProfilePage';
import { CompanyPreparationPage } from './CompanyPreparationPage';
import { UniversityPlacementPage } from './UniversityPlacementPage';
import { getAuthorizedUniversityPlacementData, getCollegeById } from '../utils/collegeStorage';
import {
  MockTestItem,
  MockTestResultData,
  MOCK_TESTS_CATALOG,
  DEFAULT_MOCK_RESULT,
} from '../data/mockTestsData';
import { JobOpportunity, JOBS_CATALOG } from '../data/jobsData';
import { CampusEvent, EVENTS_CATALOG } from '../data/eventsData';
import { CompanyReadiness, RecommendedItem, UpcomingDrive } from '../types';
import {
  getStudentPerformanceData,
  getStudentProfile,
  recordStudentMockTest,
  recordStudentPracticeMCQ,
  recordStudentCodingProblem,
  recordStudentEventRegistration,
  StudentPerformanceData,
} from '../utils/studentStorage';

interface StudentDashboardProps {
  userEmail?: string;
  userName?: string;
  collegeName?: string;
  collegeId?: string;
  branch?: string;
  academicYear?: string;
  onLogout: () => void;
  initialSection?: SidebarSection;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userEmail = '',
  userName = '',
 collegeName = '',
 collegeId,
  branch = 'Computer Science & Engineering',
  academicYear = '4th Year (Final Year)',
  onLogout,
  initialSection = 'Dashboard',
}) => {
  // Navigation & Search State
  const [activeSection, setActiveSection] = useState<SidebarSection>(initialSection);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically resolve student profile from storage if available
  const storedProfile = userEmail ? getStudentProfile(userEmail) : null;
  const resolvedName = userName || storedProfile?.fullName || 'Student Candidate';
  const resolvedCollegeName = collegeName || storedProfile?.collegeName || 'No College / Not Listed';
  const resolvedBranch = branch || storedProfile?.branch || 'Computer Science & Engineering';
  const resolvedAcademicYear = academicYear || storedProfile?.academicYear || '4th Year (Final Year)';

  // Resolve the college selected by this student's stored profile only.
  const resolvedCollegeId = storedProfile?.collegeId || undefined;
  const selectedCollege = resolvedCollegeId ? getCollegeById(resolvedCollegeId) : null;

  // Sync initialSection prop when changed from external navigation
  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection === 'My University' && !selectedCollege ? 'Dashboard' : initialSection);
    }
  }, [initialSection, resolvedCollegeId]);

  // MCQ Practice Page State (Opens when a topic or drill is selected)
  const [mcqPracticeConfig, setMcqPracticeConfig] = useState<{
    isOpen: boolean;
    initialQuestionNumber: number;
    categoryTitle?: string;
  } | null>(null);

  // Test Simulator Modal State
  const [simulatorConfig, setSimulatorConfig] = useState<{
    isOpen: boolean;
    title: string;
    category: string;
    duration: string;
    questionsCount: number;
  }>({
    isOpen: false,
    title: 'Aptitude Practice Test',
    category: 'Quantitative Aptitude',
    duration: '25 Mins',
    questionsCount: 20,
  });

  // Student performance data isolated by userEmail
  const [studentPerfData, setStudentPerfData] = useState<StudentPerformanceData>(() =>
    getStudentPerformanceData(userEmail)
  );

  // Full-Screen Mock Test & Results State
  const [isFullScreenMockTestActive, setIsFullScreenMockTestActive] = useState<boolean>(false);
  const [activeMockTestItem, setActiveMockTestItem] = useState<MockTestItem>(MOCK_TESTS_CATALOG[0]);
  const [latestMockResult, setLatestMockResult] = useState<MockTestResultData | null>(
    () => getStudentPerformanceData(userEmail).latestMockResult || null
  );

  // Selected company modal / view
  const [selectedCompany, setSelectedCompany] = useState<CompanyReadiness | null>(null);
  const [selectedJobOpportunity, setSelectedJobOpportunity] = useState<JobOpportunity | null>(null);

  // Selected event and registered events state
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [registeredEventsMap, setRegisteredEventsMap] = useState<Record<string, boolean>>(
    () => getStudentPerformanceData(userEmail).registeredEventsMap || {}
  );

  // Synchronize when userEmail changes (e.g. login as different user)
  useEffect(() => {
    const data = getStudentPerformanceData(userEmail);
    setStudentPerfData(data);
    setRegisteredEventsMap(data.registeredEventsMap || {});
    if (data.latestMockResult) {
      setLatestMockResult(data.latestMockResult);
    } else {
      setLatestMockResult(null);
    }
  }, [userEmail]);

  const handleStartMockTest = (test: MockTestItem) => {
    setActiveMockTestItem(test);
    setIsFullScreenMockTestActive(true);
  };

  const handleSubmitMockTest = (result: MockTestResultData) => {
    const updated = recordStudentMockTest(userEmail, activeMockTestItem, result);
    setStudentPerfData(updated);
    setLatestMockResult(result);
    setIsFullScreenMockTestActive(false);
    setActiveSection('Results');
  };

  const handleRegisterEvent = (eventId: string) => {
    const updated = recordStudentEventRegistration(userEmail, eventId);
    setStudentPerfData(updated);
    setRegisteredEventsMap(updated.registeredEventsMap || {});
  };

  // Dynamic Statistics Data bound to student's isolated profile
  const statistics = [
    {
      id: 'stat-aptitude',
      title: 'Aptitude Accuracy',
      value: `${studentPerfData.aptitudeProgress}%`,
      numericProgress: studentPerfData.aptitudeProgress,
      subtitle:
        studentPerfData.aptitudeProgress === 0
          ? 'Diagnostic test pending'
          : '+4.2% from last week',
      icon: BrainCircuit,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      barColor: 'bg-indigo-600',
      target:
        studentPerfData.aptitudeProgress === 0
          ? 'Benchmark: 70%'
          : 'Target: 75% for Tier 1',
    },
    {
      id: 'stat-coding',
      title: 'Coding Progress',
      value: `${studentPerfData.codingProgress}%`,
      numericProgress: studentPerfData.codingProgress,
      subtitle: `${studentPerfData.categoryQuestionsSolved?.coding || 0} problems solved`,
      icon: Code2,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      barColor: 'bg-sky-500',
      target:
        studentPerfData.codingProgress === 0
          ? '0/20 DSA problems'
          : 'Medium & Hard focus',
    },
    {
      id: 'stat-mock-tests',
      title: 'Mock Tests Completed',
      value: `${studentPerfData.mockTestsCompleted}`,
      numericProgress: Math.min(100, (studentPerfData.mockTestsCompleted / 8) * 100),
      subtitle:
        studentPerfData.mockTestsCompleted === 0
          ? '0 full-length attempts'
          : `${studentPerfData.mockTestsCompleted} full-length simulations`,
      icon: FileCheck2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      barColor: 'bg-emerald-500',
      target:
        studentPerfData.mockTestsCompleted === 0
          ? 'Target: 8 tests'
          : `Avg score: ${studentPerfData.averageScore} / 100`,
    },
    {
      id: 'stat-overall',
      title: 'Overall Progress',
      value: `${studentPerfData.overallProgress}%`,
      numericProgress: studentPerfData.overallProgress,
      subtitle: 'Placement readiness index',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-600',
      target:
        studentPerfData.overallProgress >= 70
          ? 'Super Dream eligible'
          : 'Placement threshold: 70%',
    },
  ];

  // Company Readiness Data bound to student's isolated profile
  const getReadinessScore = (key: string, fallback: number) => {
    if (studentPerfData.companyReadiness && studentPerfData.companyReadiness[key] !== undefined) {
      return studentPerfData.companyReadiness[key];
    }
    return fallback;
  };

  const tcsReadiness = getReadinessScore('comp-tcs', getReadinessScore('tcs', 0));
  const infyReadiness = getReadinessScore('comp-infosys', getReadinessScore('infosys', 0));
  const acnReadiness = getReadinessScore('comp-accenture', getReadinessScore('accenture', 0));

  const companyReadinessList: CompanyReadiness[] = [
    {
      id: 'comp-tcs',
      company: 'TCS',
      logo: 'TCS',
      readinessPercentage: tcsReadiness,
      tier: 'Digital & Prime',
      eligibilityCutoff: '60% in B.Tech, 0 backlogs',
      aptitudeScore: tcsReadiness > 0 ? Math.round(tcsReadiness * 1.08) : 0,
      codingScore: tcsReadiness > 0 ? Math.round(tcsReadiness * 0.94) : 0,
      interviewScore: tcsReadiness > 0 ? Math.round(tcsReadiness * 0.97) : 0,
      nextDriveDate: 'Oct 14, 2026',
      hiringRole: 'Systems Engineer & Digital SDE',
      ctc: '₹3.6 - ₹9.0 LPA',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'comp-infosys',
      company: 'Infosys',
      logo: 'INFY',
      readinessPercentage: infyReadiness,
      tier: 'Specialist Programmer',
      eligibilityCutoff: '65% aggregate, All branches',
      aptitudeScore: infyReadiness > 0 ? Math.round(infyReadiness * 1.08) : 0,
      codingScore: infyReadiness > 0 ? Math.round(infyReadiness * 0.95) : 0,
      interviewScore: infyReadiness > 0 ? Math.round(infyReadiness * 0.97) : 0,
      nextDriveDate: 'Oct 24, 2026',
      hiringRole: 'Specialist Programmer (SP) / DSE',
      ctc: '₹6.5 - ₹9.5 LPA',
      color: 'from-sky-600 to-blue-700',
    },
    {
      id: 'comp-accenture',
      company: 'Accenture',
      logo: 'ACN',
      readinessPercentage: acnReadiness,
      tier: 'Advanced Tech Architect',
      eligibilityCutoff: '6.5 CGPA, No active backlogs',
      aptitudeScore: acnReadiness > 0 ? Math.round(acnReadiness * 1.09) : 0,
      codingScore: acnReadiness > 0 ? Math.round(acnReadiness * 0.93) : 0,
      interviewScore: acnReadiness > 0 ? Math.round(acnReadiness * 0.96) : 0,
      nextDriveDate: 'Nov 04, 2026',
      hiringRole: 'Associate Software Engineer (ASE)',
      ctc: '₹4.5 - ₹6.5 LPA',
      color: 'from-purple-600 to-indigo-800',
    },
  ];

  // Recommended Section: 3 practice/test cards as requested
  const recommendedItems: RecommendedItem[] = [
    {
      id: 'rec-1',
      title: 'TCS NQT Aptitude Speed Sprint',
      type: 'Practice',
      category: 'Quantitative & Logical Ability',
      duration: '30 Mins',
      questionsCount: 25,
      difficulty: 'Medium',
      attemptsCount: 1420,
      rating: 4.9,
      tags: ['TCS Specific', 'Negative Marking', 'Speed Math'],
    },
    {
      id: 'rec-2',
      title: 'Data Structures: Graphs & Trees Marathon',
      type: 'Practice',
      category: 'Coding & Algorithms',
      duration: '45 Mins',
      questionsCount: 3,
      difficulty: 'Hard',
      attemptsCount: 890,
      rating: 4.8,
      tags: ['BFS/DFS', 'Binary Trees', 'Infosys SP / Amazon'],
    },
    {
      id: 'rec-3',
      title: 'Accenture Cognitive & Communication Mock Exam',
      type: 'Mock Test',
      category: 'Full Mock Test',
      duration: '60 Mins',
      questionsCount: 50,
      difficulty: 'Medium',
      attemptsCount: 2150,
      rating: 4.9,
      tags: ['Full Length', 'Proctored', 'Verbal & Abstract'],
    },
  ];

  // Quick Action Triggers
  const handleQuickAction = (action: string) => {
    if (action === 'Practice Coding') {
      setActiveSection('Coding Practice');
    } else if (action === 'Practice Aptitude') {
      setActiveSection('Practice');
      setMcqPracticeConfig({
        isOpen: true,
        initialQuestionNumber: 12,
        categoryTitle: 'Quantitative Aptitude • Profit & Loss',
      });
    } else if (action === 'Start Mock Test') {
      handleStartMockTest(MOCK_TESTS_CATALOG[0]);
    } else if (action === 'View Companies') {
      setActiveSection('Companies & Jobs');
    }
  };

  const handleStartRecommended = (item: RecommendedItem) => {
    if (item.category.includes('Coding')) {
      setActiveSection('Coding Practice');
    } else if (item.type === 'Mock Test') {
      const match = MOCK_TESTS_CATALOG.find((m) => m.title === item.title) || MOCK_TESTS_CATALOG[0];
      handleStartMockTest(match);
    } else {
      setActiveSection('Practice');
      setMcqPracticeConfig({
        isOpen: true,
        initialQuestionNumber: 12,
        categoryTitle: item.title,
      });
    }
  };

  return (
    <div id="student-portal-app" className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <TopNavbar
        studentName={resolvedName}
        studentRole={`${resolvedBranch.split('&')[0]} • ${resolvedAcademicYear.split('(')[0]}`}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={(sec) => {
          const section = sec as SidebarSection;
          if (section === 'My University' && !selectedCollege) return;
          setActiveSection(section);
        }}
      />

      {/* Main Layout Body: Left Sidebar + Center Scrollable Content */}
      <div className="mx-auto flex max-w-7xl">
        {/* Left Sidebar with all 10 items */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(section) => {
            if (section === 'My University' && !selectedCollege) return;
            setActiveSection(section);
          }}
          onLogout={onLogout}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          showUniversity={Boolean(selectedCollege)}
        />

        {/* Center Main Dashboard Content */}
        <main
          id="main-dashboard-content"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8"
        >
          {/* Main View vs Sub-sections */}
          {activeSection === 'Dashboard' && (
            <>
              {/* 1. Welcome Section */}
              <section id="welcome-section">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl"
                >
                  {/* Subtle Background Glows */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-200 backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                        <span>Campus Placement Season 2026 • Verified Profile</span>
                      </div>

                      <h1
                        id="welcome-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white"
                      >
                        Welcome back, {resolvedName.split(' ')[0]}! 👋
                      </h1>

                      <p
                        id="welcome-subtitle"
                        className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed"
                      >
                        Keep practicing and move closer to your dream placement.
                      </p>
                    </div>

                    {/* Quick Readiness Card / Target Drive */}
                    <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md self-start md:self-auto">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/60 font-black text-lg text-white border border-white/20">
                        🎯
                      </div>
                      <div className="text-xs space-y-1">
                        <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
                          Next Recruiter Drive
                        </span>
                        <p className="font-bold text-white text-sm">
                          TCS NQT On-Campus
                        </p>
                        <p className="text-emerald-300 text-[11px] font-semibold">
                          Scheduled for Oct 14 • {tcsReadiness}% Ready
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* 2. Statistics Cards with Animated Progress Bars */}
              <section id="statistics-cards-section" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Key Readiness Metrics
                  </h2>
                  <span className="text-xs text-indigo-600 font-semibold">
                    Target: Tier-1 SDE Shortlist
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {statistics.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.08 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all"
                      >
                        {/* Top: Title and Icon */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">
                            {stat.title}
                          </span>
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-110`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Value */}
                        <div className="mt-3 flex items-baseline justify-between">
                          <span className="text-3xl font-black tracking-tight text-slate-900">
                            {stat.value}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {stat.target}
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="mt-3 space-y-1.5">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.numericProgress}%` }}
                              transition={{ duration: 0.9, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
                              className={`h-full rounded-full ${stat.barColor}`}
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {stat.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* MY UNIVERSITY SECTION (Prompt Requirement #13) */}
              {selectedCollege && (
              <section id="my-university-dashboard-section" className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25">
                      <School className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                        MY UNIVERSITY
                      </span>
                      <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                       {selectedCollege.name || resolvedCollegeName || 'No College / Not Listed'}
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSection('My University')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    <span>Open Full University Placement Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* The 7 Interactive Links specified in Prompt #13 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
                  {[
                    { label: 'University Profile', icon: Award },
                    { label: 'Placement Notices', icon: Bell },
                    { label: 'Placement Drives', icon: Calendar },
                    { label: 'Companies Visiting Campus', icon: Building2 },
                    { label: 'Placement Statistics', icon: TrendingUp },
                    { label: 'Placement Documents', icon: FileText },
                    { label: 'Training & Events', icon: BookOpen },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={() => setActiveSection('My University')}
                        className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-xs transition-all cursor-pointer group"
                      >
                        <Icon className="h-4 w-4 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-900 leading-tight">
                          {btn.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
              )}

              {/* 3. Performance Section with Line/Bar Chart */}
              <section id="performance-chart-wrapper">
                <PerformanceChart studentData={studentPerfData} />
              </section>

              {/* 4. Quick Actions */}
              <section id="quick-actions-section" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Quick Actions
                  </h3>
                  <span className="text-xs text-slate-400">
                    1-Click test drills & company directory
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                  {/* Action 1: Practice Aptitude */}
                  <motion.button
                    id="quick-action-practice-aptitude"
                    type="button"
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction('Practice Aptitude')}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Practice Aptitude
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Quantitative & Logical questions
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:underline">
                      Start Drill <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.button>

                  {/* Action 2: Start Mock Test */}
                  <motion.button
                    id="quick-action-start-mock-test"
                    type="button"
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction('Start Mock Test')}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Start Mock Test
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        60-min simulated campus exam
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:underline">
                      Take Test <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.button>

                  {/* Action 3: Practice Coding */}
                  <motion.button
                    id="quick-action-practice-coding"
                    type="button"
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction('Practice Coding')}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        Practice Coding
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        DSA & Algorithms IDE
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:underline">
                      Solve Problems <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.button>

                  {/* Action 4: View Companies */}
                  <motion.button
                    id="quick-action-view-companies"
                    type="button"
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction('View Companies')}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        View Companies
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        52 upcoming recruiting drives
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-purple-600 group-hover:underline">
                      Explore Drives <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.button>
                </div>
              </section>

              {/* 5. Company Readiness Section */}
              <section id="company-readiness-section" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Company Readiness
                    </h3>
                    <p className="text-xs text-slate-500">
                      Alignment scores mapped to specific recruiter test patterns and syllabus cutoffs
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 self-start sm:self-auto">
                    3 Recruiter Benchmarks
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {companyReadinessList.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      {/* Company Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} font-black text-sm text-white shadow-sm`}
                          >
                            {item.logo}
                          </div>
                          <div>
                            <h4 className="text-base font-extrabold text-slate-900">
                              {item.company}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {item.hiringRole}
                            </p>
                          </div>
                        </div>

                        {/* Readiness Percentage Badge */}
                        <div className="text-right">
                          <span className="text-2xl font-black text-indigo-600">
                            {item.readinessPercentage}%
                          </span>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase">
                            Readiness
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 text-[11px]">Syllabus Covered</span>
                          <span className="font-bold text-slate-700">{item.readinessPercentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.readinessPercentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-indigo-600"
                          />
                        </div>
                      </div>

                      {/* CTC & Sub-scores */}
                      <div className="mt-4 rounded-xl bg-slate-50/70 p-3 space-y-2 border border-slate-100">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Package (CTC):</span>
                          <span className="font-bold text-slate-900">{item.ctc}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Drive Date:</span>
                          <span className="font-semibold text-slate-700">{item.nextDriveDate}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px]">
                          <div className="bg-white p-1 rounded-lg border border-slate-200">
                            <span className="text-slate-400 block">Aptitude</span>
                            <strong className="text-indigo-600">{item.aptitudeScore}%</strong>
                          </div>
                          <div className="bg-white p-1 rounded-lg border border-slate-200">
                            <span className="text-slate-400 block">Coding</span>
                            <strong className="text-sky-600">{item.codingScore}%</strong>
                          </div>
                          <div className="bg-white p-1 rounded-lg border border-slate-200">
                            <span className="text-slate-400 block">Interview</span>
                            <strong className="text-emerald-600">{item.interviewScore}%</strong>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSimulatorConfig({
                              isOpen: true,
                              title: `${item.company} Targeted Placement Test`,
                              category: `${item.company} Screening Syllabus`,
                              duration: '40 Mins',
                              questionsCount: 30,
                            });
                          }}
                          className="w-full rounded-xl bg-indigo-50 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                        >
                          Take {item.company} Readiness Test
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* 6. Recommended Section */}
              <section id="recommended-section" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3
                      id="recommended-heading"
                      className="text-base sm:text-lg font-bold text-slate-900"
                    >
                      Recommended for You
                    </h3>
                    <p className="text-xs text-slate-500">
                      Curated based on your weak areas and upcoming campus drive timelines
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 cursor-pointer hover:underline self-start sm:self-auto">
                    View All Assessments →
                  </span>
                </div>

                {/* 3 Recommended Practice / Test Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {recommendedItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.1 }}
                      whileHover={{
                        y: -4,
                        boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08)',
                      }}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all"
                    >
                      {/* Card Header & Type Badge */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              item.type === 'Mock Test'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-indigo-100 text-indigo-700'
                            }`}
                          >
                            {item.type}
                          </span>

                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              item.difficulty === 'Hard'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {item.difficulty}
                          </span>
                        </div>

                        {/* Title & Category */}
                        <h4 className="mt-3 text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.category}
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Details & CTA Button */}
                      <div className="mt-5 border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                            {item.questionsCount} Qs
                          </span>
                          <span className="flex items-center gap-1 text-amber-600 font-semibold">
                            ★ {item.rating}
                          </span>
                        </div>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStartRecommended(item)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                          <PlayCircle className="h-4 w-4" />
                          <span>Start Assessment</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Dedicated Sub-View: My University (University Placement Portal) */}
          {activeSection === 'My University' && (
            <UniversityPlacementPage
              collegeId={resolvedCollegeId}
              userEmail={userEmail}
              userName={resolvedName}
              onBackToDashboard={() => setActiveSection('Dashboard')}
            />
          )}

          {/* Dedicated Sub-View: Companies & Jobs Opportunities */}
          {activeSection === 'Companies & Jobs' && (
            selectedJobOpportunity ? (
              <CompanyDetailsPage
                job={selectedJobOpportunity}
                onBackToCompanies={() => setSelectedJobOpportunity(null)}
                userName={resolvedName}
                collegeName={resolvedCollegeName}
                branch={resolvedBranch}
                onTakeAssessment={(compName) => {
                  setSimulatorConfig({
                    isOpen: true,
                    title: `${compName} Placement Screening Assessment`,
                    category: `${compName} Campus Syllabus`,
                    duration: '45 Mins',
                    questionsCount: 30,
                  });
                }}
              />
            ) : (
              <CompaniesJobsPage
                onSelectCompany={(job) => setSelectedJobOpportunity(job)}
                onBackToDashboard={() => setActiveSection('Dashboard')}
                userName={resolvedName}
                collegeName={resolvedCollegeName}
                branch={resolvedBranch}
              />
            )
          )}

          {/* Dedicated Sub-View: Student Progress Tracking Page */}
          {activeSection === 'Progress' && (
            <StudentProgressPage
              studentData={studentPerfData}
              onBackToDashboard={() => setActiveSection('Dashboard')}
              onStartMockTest={(testName) => {
                const match =
                  MOCK_TESTS_CATALOG.find((m) =>
                    m.title.toLowerCase().includes(testName?.toLowerCase() || '')
                  ) || MOCK_TESTS_CATALOG[0];
                handleStartMockTest(match);
              }}
              onPracticeCoding={() => setActiveSection('Coding Practice')}
              onPracticeMCQ={(category, topic) => {
                setActiveSection('Practice');
                setMcqPracticeConfig({
                  isOpen: true,
                  categoryTitle: topic ? `${category} • ${topic}` : (category || 'Quantitative Aptitude'),
                  initialQuestionNumber: 1,
                });
              }}
              onViewCompany={(companyName) => {
                const matchJob =
                  JOBS_CATALOG.find(
                    (j) => j.company.toLowerCase() === companyName.toLowerCase()
                  ) || JOBS_CATALOG[0];
                setSelectedJobOpportunity(matchJob);
                setActiveSection('Companies & Jobs');
              }}
            />
          )}

          {/* Dedicated Sub-View: Coding Practice Page */}
          {activeSection === 'Coding Practice' && (
            <CodingPracticePage
              onBack={() => setActiveSection('Dashboard')}
              completedProblemsMap={studentPerfData.completedCodingProblems}
              onToggleProblemCompleted={(problemId, isCompleted) => {
                const updated = recordStudentCodingProblem(userEmail, problemId, isCompleted);
                setStudentPerfData(updated);
              }}
            />
          )}

          {/* Dedicated Sub-View: Practice Section or MCQ Practice Page */}
          {activeSection === 'Practice' && (
            mcqPracticeConfig?.isOpen ? (
              <MCQPracticePage
                initialQuestionNumber={mcqPracticeConfig.initialQuestionNumber}
                categoryTitle={mcqPracticeConfig.categoryTitle}
                onBack={() => setMcqPracticeConfig(null)}
                onFinishPractice={(resultData) => {
                  if (resultData) {
                    setLatestMockResult(resultData);
                    const updated = recordStudentPracticeMCQ(
                      userEmail,
                     mcqPracticeConfig.categoryTitle || '',
                      resultData.totalQuestions,
                      resultData.correctAnswers,
                      resultData
                    );
                    setStudentPerfData(updated);
                  }
                  setMcqPracticeConfig(null);
                  setActiveSection('Results');
                }}
              />
            ) : (
              <PracticeSection
                onStartPractice={(categoryTitle, topicName) => {
                  if (categoryTitle.includes('Coding')) {
                    setActiveSection('Coding Practice');
                  } else {
                    setMcqPracticeConfig({
                      isOpen: true,
                      initialQuestionNumber: topicName?.includes('Profit') || categoryTitle.includes('Quantitative') ? 12 : 1,
                      categoryTitle: topicName ? `${categoryTitle} • ${topicName}` : categoryTitle,
                    });
                  }
                }}
                onOpenMCQPractice={(questionNumber = 12, topic) => {
                  setMcqPracticeConfig({
                    isOpen: true,
                    initialQuestionNumber: questionNumber,
                    categoryTitle: topic ? `Quantitative Aptitude • ${topic}` : 'Quantitative Aptitude • Profit & Loss',
                  });
                }}
                onOpenCodingPractice={() => setActiveSection('Coding Practice')}
                onBackToDashboard={() => setActiveSection('Dashboard')}
                studentPerformance={studentPerfData}
              />
            )
          )}

          {/* Dedicated Sub-View: Mock Tests Listing Page */}
          {activeSection === 'Mock Tests' && (
            <MockTestsListingPage
              onStartTest={handleStartMockTest}
              onViewResults={() => setActiveSection('Results')}
              onBack={() => setActiveSection('Dashboard')}
            />
          )}

          {/* Dedicated Sub-View: Test Result Page */}
          {activeSection === 'Results' && (
            <TestResultPage
              resultData={latestMockResult}
              onRetake={() => handleStartMockTest(activeMockTestItem)}
              onBackToDashboard={() => setActiveSection('Dashboard')}
              onViewProgress={() => setActiveSection('Progress')}
            />
          )}

          {/* Dedicated Sub-View: Events & Challenges */}
          {activeSection === 'Events & Challenges' && (
            selectedEvent ? (
              <EventDetailsPage
                event={selectedEvent}
                isRegistered={Boolean(registeredEventsMap[selectedEvent.id])}
                onRegister={handleRegisterEvent}
                onBack={() => setSelectedEvent(null)}
              />
            ) : (
              <EventsChallengesPage
                onSelectEvent={(evt) => setSelectedEvent(evt)}
                registeredEventsMap={registeredEventsMap}
                onRegisterEvent={handleRegisterEvent}
                onBackToDashboard={() => setActiveSection('Dashboard')}
              />
            )
          )}

          {/* Dedicated Sub-View: Company Readiness & Comprehensive Preparation */}
          {activeSection === 'Company Readiness' && (
            <CompanyPreparationPage
              companyReadinessMap={studentPerfData.companyReadiness}
              onBackToDashboard={() => setActiveSection('Dashboard')}
              onStartDrill={(companyName) =>
                setSimulatorConfig({
                  isOpen: true,
                  title: `${companyName} Placement Screening Assessment`,
                  category: `${companyName} Preparation Drill`,
                  duration: '35 Mins',
                  questionsCount: 25,
                })
              }
              onPracticeCoding={() => setActiveSection('Coding Practice')}
              onViewJobOpportunity={(companyName) => {
                const matchJob =
                  JOBS_CATALOG.find(
                    (j) => j.company.toLowerCase() === companyName.toLowerCase()
                  ) || JOBS_CATALOG[0];
                setSelectedJobOpportunity(matchJob);
                setActiveSection('Companies & Jobs');
              }}
            />
          )}

          {/* Dedicated Sub-View: Student Profile Page */}
          {activeSection === 'Profile' && (
            <StudentProfilePage
              initialName={resolvedName}
              initialEmail={userEmail}
              initialCollege={resolvedCollegeName}
              initialBranch={resolvedBranch}
              initialAcademicYear={resolvedAcademicYear}
              onBackToDashboard={() => setActiveSection('Dashboard')}
            />
          )}
        </main>
      </div>

      {/* Interactive Test Simulator Modal */}
      <TestSimulatorModal
        isOpen={simulatorConfig.isOpen}
        title={simulatorConfig.title}
        category={simulatorConfig.category}
        duration={simulatorConfig.duration}
        questionsCount={simulatorConfig.questionsCount}
        onClose={() => setSimulatorConfig((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Full-Screen Proctored Mock Test Interface */}
      {isFullScreenMockTestActive && (
        <FullScreenMockTest
          testItem={activeMockTestItem}
          onExit={() => setIsFullScreenMockTestActive(false)}
          onSubmitTest={handleSubmitMockTest}
        />
      )}
    </div>
  );
};
