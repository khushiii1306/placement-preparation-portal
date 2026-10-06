import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { verifyAdminAuthorization, getAccountStoredRole, getAuthSession } from '../utils/rbac';
import {
  LayoutDashboard,
  Users,
  HelpCircle,
  FileCheck,
  Building2,
  Calendar,
  Trophy,
  LogOut,
  Plus,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Filter,
  MoreVertical,
  X,
  Sparkles,
  ChevronRight,
  Shield,
  BarChart3,
  BookOpen,
  Briefcase,
  Layers,
  ArrowRight,
  Download,
  AlertCircle,
  Menu,
  School,
} from 'lucide-react';
import {
  INITIAL_QUESTIONS,
  INITIAL_COMPANIES,
  INITIAL_MOCK_TESTS,
  INITIAL_EVENTS,
  INITIAL_STUDENT_RECORDS,
  AdminQuestion,
  AdminCompany,
  AdminMockTest,
  AdminEvent,
  AdminStudentRecord,
} from '../data/adminData';
import { AdminManageQuestionsPage } from './AdminManageQuestionsPage';
import { AdminManageCompaniesPage } from './AdminManageCompaniesPage';
import { AdminManageMockTestsPage } from './AdminManageMockTestsPage';
import { AdminManageEventsPage } from './AdminManageEventsPage';
import { AdminStudentRecordsPage } from './AdminStudentRecordsPage';
import { AdminManageCollegesPage } from './AdminManageCollegesPage';

export type AdminSidebarItem =
  | 'Dashboard'
  | 'Manage Colleges'
  | 'Students'
  | 'Questions'
  | 'Mock Tests'
  | 'Companies'
  | 'Events'
  | 'Results'
  | 'Logout';

interface AdminDashboardProps {
  onLogout: () => void;
  onSwitchToStudent?: () => void;
  onRedirectToCollege?: () => void;
  initialSection?: AdminSidebarItem;
  onSectionChange?: (section: AdminSidebarItem) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onSwitchToStudent,
  onRedirectToCollege,
  initialSection = 'Dashboard',
  onSectionChange,
}) => {
  const [activeSection, setActiveSection] = useState<AdminSidebarItem>(initialSection);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isAuthorizedAdmin = verifyAdminAuthorization();

  // Enforce Rule: Only accounts whose stored role is "ADMIN" can access Admin Dashboard
  // Redirect non-ADMIN users to their own dashboard
  useEffect(() => {
    if (!verifyAdminAuthorization()) {
      console.warn('Unauthorized access to AdminDashboard detected. Redirecting to appropriate dashboard.');
      const session = getAuthSession();
      const storedRole = session?.email ? getAccountStoredRole(session.email) : null;

      if (storedRole === 'COLLEGE' || session?.role === 'college') {
        window.history.replaceState(null, '', '/college');
        if (onRedirectToCollege) {
          onRedirectToCollege();
        } else {
          onLogout();
        }
      } else if (storedRole === 'STUDENT' || session?.role === 'student') {
        window.history.replaceState(null, '', '/dashboard');
        if (onSwitchToStudent) {
          onSwitchToStudent();
        } else {
          onLogout();
        }
      } else {
        window.history.replaceState(null, '', '/login');
        onLogout();
      }
    }
  }, [onLogout, onSwitchToStudent, onRedirectToCollege]);

  // Synchronize initialSection when routed from external URL
  useEffect(() => {
    if (initialSection && initialSection !== activeSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // If unauthorized, render security shield fallback while redirection executes
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
          <Shield className="h-8 w-8 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white mb-2">
          Verifying Administrator Privileges
        </h2>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Access to the Central Admin Dashboard is strictly restricted to accounts with stored role &quot;ADMIN&quot;. Non-ADMIN accounts are redirected to their own dashboard.
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Redirecting to your authorized dashboard...</span>
        </div>
      </div>
    );
  }

  // Central State for all Admin entities initialized from robust admin dataset
  const [questions, setQuestions] = useState<AdminQuestion[]>(INITIAL_QUESTIONS);
  const [companies, setCompanies] = useState<AdminCompany[]>(INITIAL_COMPANIES);
  const [mockTests, setMockTests] = useState<AdminMockTest[]>(INITIAL_MOCK_TESTS);
  const [events, setEvents] = useState<AdminEvent[]>(INITIAL_EVENTS);
  const [students, setStudents] = useState<AdminStudentRecord[]>(INITIAL_STUDENT_RECORDS);

  // Statistics State as requested:
  // Students: 150, Questions: 500, Mock Tests: 20, Companies: 10, Events: 8
  // Automatically synchronized as records are added or removed
  const stats = {
    students: 150,
    questions: 500 + (questions.length - INITIAL_QUESTIONS.length),
    mockTests: 20 + (mockTests.length - INITIAL_MOCK_TESTS.length),
    companies: 10 + (companies.length - INITIAL_COMPANIES.length),
    events: 8 + (events.length - INITIAL_EVENTS.length),
  };

  // Recent Activity State as requested
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 'act-1',
      title: 'New student registered',
      detail: 'Khushi Kumari (B.Tech CSE) completed placement onboarding & profile',
      time: '10 mins ago',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'act-2',
      title: 'New company added',
      detail: 'Amazon AWS created campus drive for SDE-1 (32 LPA, 2026 Batch)',
      time: '45 mins ago',
      icon: Building2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'act-3',
      title: 'Mock test completed',
      detail: '85 students submitted TCS NQT Full-Length Mock Test 2',
      time: '2 hours ago',
      icon: FileCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'act-4',
      title: 'New event published',
      detail: 'Google Cloud Sprint & Coding Challenge scheduled for Oct 15',
      time: '5 hours ago',
      icon: Calendar,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
  ]);

  // Quick Action Modal State
  type QuickActionModalType = 'question' | 'company' | 'mockTest' | 'event' | null;
  const [activeModal, setActiveModal] = useState<QuickActionModalType>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Form states for Quick Actions
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    options: ['', '', '', ''],
    correctOption: 0,
  });

  const [newCompany, setNewCompany] = useState({
    name: '',
    role: 'Software Development Engineer (SDE-1)',
    packageCTC: '18.5 LPA',
    cutoffCGPA: '7.5 CGPA',
    driveDate: '2026-10-18',
  });

  const [newMockTest, setNewMockTest] = useState({
    title: '',
    category: 'Full Mock Test',
    durationMinutes: '60',
    totalQuestions: '30',
  });

  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'Coding Challenge',
    date: '2026-10-25',
    prizePool: '₹50,000 + PPI Opportunity',
  });

  // Sidebar navigation items
  const sidebarItems: { name: AdminSidebarItem; icon: React.ElementType; badge?: string }[] = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Manage Colleges', icon: School, badge: 'Colleges' },
    { name: 'Students', icon: Users, badge: String(stats.students) },
    { name: 'Questions', icon: HelpCircle, badge: String(stats.questions) },
    { name: 'Mock Tests', icon: FileCheck, badge: String(stats.mockTests) },
    { name: 'Companies', icon: Building2, badge: String(stats.companies) },
    { name: 'Events', icon: Calendar, badge: String(stats.events) },
    { name: 'Results', icon: Trophy },
    { name: 'Logout', icon: LogOut },
  ];

  const handleNavClick = (sectionName: AdminSidebarItem) => {
    if (sectionName === 'Logout') {
      onLogout();
    } else {
      setActiveSection(sectionName);
      onSectionChange?.(sectionName);
    }
    setMobileSidebarOpen(false);
  };

  const showSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  // CRUD Handlers for Questions
  const handleAddQuestion = (newQ: Omit<AdminQuestion, 'id' | 'createdDate'>) => {
    const item: AdminQuestion = {
      ...newQ,
      id: `Q-${100 + questions.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setQuestions((prev) => [item, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New question added',
        detail: `Added "${item.question.slice(0, 45)}..." to ${item.category}`,
        time: 'Just now',
        icon: HelpCircle,
        color: 'bg-blue-50 text-blue-600 border-blue-100',
      },
      ...prev,
    ]);
  };

  const handleEditQuestion = (id: string, updated: Omit<AdminQuestion, 'id' | 'createdDate'>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // CRUD Handlers for Companies
  const handleAddCompany = (newC: Omit<AdminCompany, 'id'>) => {
    const item: AdminCompany = {
      ...newC,
      id: `comp-${Date.now()}`,
    };
    setCompanies((prev) => [item, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New company added',
        detail: `${item.companyName} scheduled drive for ${item.jobRole} (${item.packageCTC})`,
        time: 'Just now',
        icon: Building2,
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      },
      ...prev,
    ]);
  };

  const handleEditCompany = (id: string, updated: Omit<AdminCompany, 'id'>) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD Handlers for Mock Tests
  const handleCreateTest = (newT: Omit<AdminMockTest, 'id'>) => {
    const item: AdminMockTest = {
      ...newT,
      id: `mock-${Date.now().toString().slice(-4)}`,
    };
    setMockTests((prev) => [item, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New mock test created',
        detail: `Published "${item.testName}" (${item.durationMinutes} mins, ${item.questionsCount} Qs)`,
        time: 'Just now',
        icon: FileCheck,
        color: 'bg-purple-50 text-purple-600 border-purple-100',
      },
      ...prev,
    ]);
  };

  const handleEditTest = (id: string, updated: Omit<AdminMockTest, 'id'>) => {
    setMockTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const handleDeleteTest = (id: string) => {
    setMockTests((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTogglePublishTest = (id: string) => {
    setMockTests((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'Published' ? 'Unpublished' : 'Published',
            }
          : t
      )
    );
  };

  // CRUD Handlers for Events
  const handleAddEvent = (newE: Omit<AdminEvent, 'id'>) => {
    const item: AdminEvent = {
      ...newE,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [item, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'New event published',
        detail: `Announced "${item.eventName}" (${item.eventType})`,
        time: 'Just now',
        icon: Calendar,
        color: 'bg-amber-50 text-amber-600 border-amber-100',
      },
      ...prev,
    ]);
  };

  const handleEditEvent = (id: string, updated: Omit<AdminEvent, 'id'>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleTogglePublishEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: e.status === 'Published' ? 'Draft' : 'Published',
            }
          : e
      )
    );
  };

  // Quick Action Modal Submit Handlers
  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.title.trim()) return;

    handleAddQuestion({
      question: newQuestion.title.trim(),
      category: newQuestion.category,
      difficulty: newQuestion.difficulty as 'Easy' | 'Medium' | 'Hard',
      options: [
        newQuestion.options[0] || 'Option A',
        newQuestion.options[1] || 'Option B',
        newQuestion.options[2] || 'Option C',
        newQuestion.options[3] || 'Option D',
      ],
      correctAnswer: 0,
      explanation: 'Verified solution prepared by Placement Training team.',
    });

    setActiveModal(null);
    setNewQuestion({
      title: '',
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      options: ['', '', '', ''],
      correctOption: 0,
    });
    showSuccess('Question added to Question Bank successfully!');
  };

  const handleAddCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name.trim()) return;

    handleAddCompany({
      companyName: newCompany.name.trim(),
      jobRole: newCompany.role,
      location: 'Bengaluru / Hybrid',
      eligibility: `${newCompany.cutoffCGPA} throughout B.Tech`,
      requiredSkills: ['Problem Solving', 'DSA', 'Core CS'],
      packageCTC: newCompany.packageCTC,
      deadline: newCompany.driveDate,
      applyLink: 'https://careers.example.com',
      status: 'Active',
      logoColor: 'bg-emerald-600',
    });

    setActiveModal(null);
    setNewCompany({
      name: '',
      role: 'Software Development Engineer (SDE-1)',
      packageCTC: '18.5 LPA',
      cutoffCGPA: '7.5 CGPA',
      driveDate: '2026-10-18',
    });
    showSuccess('New company drive registered successfully!');
  };

  const handleCreateMockTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMockTest.title.trim()) return;

    handleCreateTest({
      testName: newMockTest.title.trim(),
      category: newMockTest.category,
      questionsCount: Number(newMockTest.totalQuestions) || 30,
      durationMinutes: Number(newMockTest.durationMinutes) || 60,
      difficulty: 'Medium',
      status: 'Published',
      selectedQuestionIds: questions.slice(0, 5).map((q) => q.id),
      totalAttempts: 0,
      avgScore: 0,
    });

    setActiveModal(null);
    setNewMockTest({
      title: '',
      category: 'Full Mock Test',
      durationMinutes: '60',
      totalQuestions: '30',
    });
    showSuccess('Mock Test published to students!');
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.name.trim()) return;

    handleAddEvent({
      eventName: newEvent.name.trim(),
      eventType: newEvent.type as 'Quiz' | 'Coding Challenge' | 'Hiring Challenge',
      description: 'Competitive campus challenge to evaluate candidate coding aptitude.',
      date: newEvent.date,
      time: '10:00 AM - 01:00 PM',
      registrationDeadline: newEvent.date,
      eligibility: 'All 3rd and 4th year undergraduate engineering candidates.',
      rules: '1. Standard placement code of conduct applies.\n2. Automated unit testing environment.',
      registrationLink: 'https://portal.placement.edu/events',
      status: 'Published',
      participantsCount: 0,
    });

    setActiveModal(null);
    setNewEvent({
      name: '',
      type: 'Coding Challenge',
      date: '2026-10-25',
      prizePool: '₹50,000 + PPI Opportunity',
    });
    showSuccess('Campus challenge event published!');
  };

  // Mock Students List (sample for Students drill-down tab)
  const studentsList = [
    { id: 'STU-101', name: 'Khushi Kumari', branch: 'B.Tech CSE', cgpa: '8.82', testsTaken: 12, avgScore: 84, status: 'Placement Ready' },
    { id: 'STU-102', name: 'Aarav Sharma', branch: 'B.Tech CSE', cgpa: '8.45', testsTaken: 9, avgScore: 78, status: 'In Progress' },
    { id: 'STU-103', name: 'Priya Verma', branch: 'B.Tech IT', cgpa: '9.10', testsTaken: 15, avgScore: 92, status: 'Shortlisted' },
    { id: 'STU-104', name: 'Rohan Patel', branch: 'B.Tech ECE', cgpa: '7.95', testsTaken: 8, avgScore: 71, status: 'In Progress' },
    { id: 'STU-105', name: 'Ananya Gupta', branch: 'B.Tech CSE', cgpa: '8.65', testsTaken: 11, avgScore: 86, status: 'Placement Ready' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* 1. Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200/80 bg-white p-4 sticky top-0 h-screen z-30">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white shadow-sm ring-1 ring-slate-800">
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">
                  PlacementPortal
                </span>
                <span className="rounded-md bg-indigo-100 text-indigo-700 px-1.5 py-0.2 text-[10px] font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Admin Control Center
              </p>
            </div>
          </div>

          {/* Role switcher link */}
          {onSwitchToStudent && (
            <button
              type="button"
              onClick={onSwitchToStudent}
              className="w-full flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-indigo-600" />
                <span>Switch to Student View</span>
              </div>
              <ArrowRight className="h-3 w-3 text-slate-400" />
            </button>
          )}

          {/* Navigation Links: Dashboard, Students, Questions, Mock Tests, Companies, Events, Results, Logout */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;
              const isLogout = item.name === 'Logout';

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.name)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isLogout
                      ? 'text-red-600 hover:bg-red-50 hover:text-red-700 mt-4 border-t border-slate-100 pt-3'
                      : isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : isLogout ? 'text-red-500' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Admin Profile */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-xs">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Placement Admin</p>
              <p className="text-[10px] text-slate-500">Apex Placement Cell</p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500" title="Online" />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="relative w-64 bg-white h-full z-10 p-4 flex flex-col justify-between shadow-2xl border-r border-slate-200"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <span className="font-extrabold text-sm text-slate-900">Placement Admin</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleNavClick(item.name)}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold ${
                        activeSection === item.name
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[10px]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>College Placement Preparation Portal</span>
                <span className="hidden sm:inline-block rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-0.5">
                  Academic Year 2026-27
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onSwitchToStudent && (
              <button
                type="button"
                onClick={onSwitchToStudent}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Student Portal</span>
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <LogOut className="h-3.5 w-3.5 text-red-500" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeSection === 'Dashboard' && (
            <>
              {/* Main Heading: "Admin Dashboard" as requested */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      Admin Dashboard
                    </h1>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                      Live Operations
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Monitor student readiness, test engagement, company recruitment drives, and question repositories.
                  </p>
                </div>

                {/* Quick Action Buttons Group */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveModal('question')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Question</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal('company')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Company</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal('mockTest')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Create Mock Test</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal('event')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 text-amber-600" />
                    <span>Add Event</span>
                  </button>
                </div>
              </div>

          {/* Success Notification Alert */}
          <AnimatePresence>
            {actionSuccessMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-xs font-bold">{actionSuccessMsg}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActionSuccessMsg(null)}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Statistics Section as requested */}
          {/* Students: 150, Questions: 500, Mock Tests: 20, Companies: 10, Events: 8 */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Portal Statistics
              </h3>
              <span className="text-xs text-slate-500">Live system counters</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Stat 1: Students: 150 */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection('Students')}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs cursor-pointer hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Students
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stats.students}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12 this week</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 2: Questions: 500 */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection('Questions')}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs cursor-pointer hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Questions
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stats.questions}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                    <span>4 Categories</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 3: Mock Tests: 20 */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection('Mock Tests')}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs cursor-pointer hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Mock Tests
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <FileCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stats.mockTests}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
                    <span>Active Drills</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 4: Companies: 10 */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection('Companies')}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs cursor-pointer hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Companies
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Building2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stats.companies}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <span>Tier 1 & MNCs</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 5: Events: 8 */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActiveSection('Events')}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs cursor-pointer hover:border-indigo-300 transition-all col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Events
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stats.events}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                    <span>Hackathons & Quizzes</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 4. Charts Section as requested */}
          {/* - Student performance */}
          {/* - Test participation */}
          {/* - Category-wise performance */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Analytics & Visual Reports
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time visual benchmarks across batches and assessments
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                Batch of 2026
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chart 1: Student Performance (Area / Trend visualization) */}
              <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-indigo-600" />
                        <span>Student Performance Trend</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Average score progression across mock iterations
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-indigo-600">79.4%</span>
                      <p className="text-[10px] text-slate-400 font-medium">Batch Average</p>
                    </div>
                  </div>

                  {/* SVG Line / Area Graph */}
                  <div className="h-44 w-full relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="320" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="110" x2="320" y2="110" stroke="#e2e8f0" />

                      {/* Area Fill */}
                      <polygon
                        points="0,95 50,85 110,68 170,52 230,42 290,26 320,20 320,110 0,110"
                        fill="url(#perfGradient)"
                      />

                      {/* Line Path */}
                      <polyline
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,95 50,85 110,68 170,52 230,42 290,26 320,20"
                      />

                      {/* Data Dots with tooltips */}
                      {[
                        { cx: 50, cy: 85, val: '64%' },
                        { cx: 110, cy: 68, val: '71%' },
                        { cx: 170, cy: 52, val: '76%' },
                        { cx: 230, cy: 42, val: '81%' },
                        { cx: 290, cy: 26, val: '87%' },
                      ].map((dot, i) => (
                        <g key={i} className="cursor-pointer group">
                          <circle
                            cx={dot.cx}
                            cy={dot.cy}
                            r="4.5"
                            fill="#ffffff"
                            stroke="#4f46e5"
                            strokeWidth="2.5"
                            className="transition-transform group-hover:scale-125"
                          />
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 border-t border-slate-100 pt-2">
                    <span>Mock 1</span>
                    <span>Mock 2</span>
                    <span>Mock 3</span>
                    <span>Mock 4</span>
                    <span>Mock 5</span>
                    <span>Final Prep</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    Top Quartile: 91.2%
                  </span>
                  <span className="font-semibold text-emerald-600">+14.2% Growth Rate</span>
                </div>
              </div>

              {/* Chart 2: Test Participation (Bar Chart) */}
              <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <span>Test Participation</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Student attempt volume per mock assessment type
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-emerald-600">88.5%</span>
                      <p className="text-[10px] text-slate-400 font-medium">Attendance Rate</p>
                    </div>
                  </div>

                  {/* SVG / Styled Bar Graph */}
                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'TCS NQT Full Mock', count: 142, max: 150, pct: '94%' },
                      { label: 'Aptitude Diagnostic', count: 135, max: 150, pct: '90%' },
                      { label: 'Coding Blitz Marathon', count: 121, max: 150, pct: '80%' },
                      { label: 'Google Tech Sprint', count: 110, max: 150, pct: '73%' },
                      { label: 'Verbal & Reasoning Drill', count: 128, max: 150, pct: '85%' },
                    ].map((bar, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{bar.label}</span>
                          <span className="text-slate-900 font-bold">
                            {bar.count} / 150 ({bar.pct})
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(bar.count / bar.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Total Active Candidates: 150</span>
                  <span className="font-semibold text-indigo-600">636 Test Attempts Logged</span>
                </div>
              </div>

              {/* Chart 3: Category-wise Performance (Domain Breakdowns) */}
              <div className="lg:col-span-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Layers className="h-4 w-4 text-purple-600" />
                      <span>Category-wise Performance</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Domain mastery across core placement assessment pillars
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-purple-600" />
                      Current Average
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                      College Cutoff Threshold (70%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { category: 'Quantitative Aptitude', score: 78, change: '+6%', status: 'Strong', color: 'indigo' },
                    { category: 'Logical Reasoning', score: 85, change: '+9%', status: 'Excellent', color: 'emerald' },
                    { category: 'Verbal Ability', score: 72, change: '+4%', status: 'Target Met', color: 'blue' },
                    { category: 'Coding & Data Structures', score: 89, change: '+12%', status: 'Top Rated', color: 'purple' },
                  ].map((cat, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{cat.category}</span>
                        <span className="text-xs font-bold text-emerald-600">{cat.change}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">{cat.score}%</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {cat.status}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Exceeds placement cutoff (70%) by {cat.score - 70}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Recent Activity & Quick Actions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Activity List as requested: */}
            {/* - New student registered */}
            {/* - New company added */}
            {/* - Mock test completed */}
            {/* - New event published */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <h3 className="font-bold text-slate-900 text-sm">Recent Activity</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Real-time event feed
                </span>
              </div>

              <div className="space-y-3">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.id}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${act.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{act.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed truncate">
                          {act.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Panel as requested: */}
            {/* - Add Question */}
            {/* - Add Company */}
            {/* - Create Mock Test */}
            {/* - Add Event */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Quick Actions</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600">Admin Tools</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Instantly publish updates, add test materials, or onboard visiting recruiting partners.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {/* Action 1: Add Question */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('question')}
                    className="flex flex-col p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold group-hover:scale-105 transition-transform mb-2">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                      Add Question
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Expand 500+ Question Bank
                    </span>
                  </button>

                  {/* Action 2: Add Company */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('company')}
                    className="flex flex-col p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold group-hover:scale-105 transition-transform mb-2">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      Add Company
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Schedule recruitment drive
                    </span>
                  </button>

                  {/* Action 3: Create Mock Test */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('mockTest')}
                    className="flex flex-col p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold group-hover:scale-105 transition-transform mb-2">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                      Create Mock Test
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Configure timed assessment
                    </span>
                  </button>

                  {/* Action 4: Add Event */}
                  <button
                    type="button"
                    onClick={() => setActiveModal('event')}
                    className="flex flex-col p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold group-hover:scale-105 transition-transform mb-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                      Add Event
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Publish campus hackathon
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>College Portal API</span>
                <span className="font-semibold text-emerald-600">● Operational</span>
              </div>
            </div>
          </div>
            </>
          )}

          {/* Sub-Page 0: University & College Institutional Management */}
          {activeSection === 'Manage Colleges' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Manage Colleges & Universities</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminManageCollegesPage onBackToDashboard={() => setActiveSection('Dashboard')} />
            </div>
          )}

          {/* Sub-Page 1: Students Directory & Performance Records */}
          {activeSection === 'Students' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Students Directory</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminStudentRecordsPage students={students} />
            </div>
          )}

          {/* Sub-Page 2: Question Bank Management */}
          {activeSection === 'Questions' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Manage Questions</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminManageQuestionsPage
                questions={questions}
                onAddQuestion={handleAddQuestion}
                onEditQuestion={handleEditQuestion}
                onDeleteQuestion={handleDeleteQuestion}
              />
            </div>
          )}

          {/* Sub-Page 3: Company Recruitment Drives Management */}
          {activeSection === 'Companies' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Manage Companies</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminManageCompaniesPage
                companies={companies}
                onAddCompany={handleAddCompany}
                onEditCompany={handleEditCompany}
                onDeleteCompany={handleDeleteCompany}
              />
            </div>
          )}

          {/* Sub-Page 4: Mock Tests Management */}
          {activeSection === 'Mock Tests' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Manage Mock Tests</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminManageMockTestsPage
                mockTests={mockTests}
                availableQuestions={questions}
                onCreateTest={handleCreateTest}
                onEditTest={handleEditTest}
                onDeleteTest={handleDeleteTest}
                onTogglePublishTest={handleTogglePublishTest}
              />
            </div>
          )}

          {/* Sub-Page 5: Events & Challenges Management */}
          {activeSection === 'Events' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Manage Events</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminManageEventsPage
                events={events}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                onTogglePublishEvent={handleTogglePublishEvent}
              />
            </div>
          )}

          {/* Sub-Page 6: Placement Test Results & Analytics */}
          {activeSection === 'Results' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Admin Portal</span>
                  <span>/</span>
                  <span className="text-indigo-600 font-bold">Placement Results & Diagnostic Reports</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('Dashboard')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Dashboard Overview
                </button>
              </div>
              <AdminStudentRecordsPage students={students} />
            </div>
          )}
        </main>
      </div>

      {/* 6. Quick Action Modals */}
      {/* Modal 1: Add Question */}
      <AnimatePresence>
        {activeModal === 'question' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Add New Question</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddQuestionSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Question Title / Problem Statement
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    placeholder="e.g. A train 140m long is running at 60 km/hr. In how much time will it pass a platform 260m long?"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newQuestion.category}
                      onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-indigo-500 outline-none bg-white"
                    >
                      <option>Quantitative Aptitude</option>
                      <option>Logical Reasoning</option>
                      <option>Verbal Ability</option>
                      <option>Technical & Coding</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                    <select
                      value={newQuestion.difficulty}
                      onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-indigo-500 outline-none bg-white"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs"
                  >
                    Save & Publish Question
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Add Company */}
      <AnimatePresence>
        {activeModal === 'company' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">Add Visiting Company Drive</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddCompanySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    placeholder="e.g. Microsoft India, Adobe, Goldman Sachs"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Package CTC</label>
                    <input
                      type="text"
                      required
                      value={newCompany.packageCTC}
                      onChange={(e) => setNewCompany({ ...newCompany, packageCTC: e.target.value })}
                      placeholder="e.g. 24 LPA"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Eligibility Cutoff</label>
                    <input
                      type="text"
                      required
                      value={newCompany.cutoffCGPA}
                      onChange={(e) => setNewCompany({ ...newCompany, cutoffCGPA: e.target.value })}
                      placeholder="e.g. 7.5 CGPA"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Role</label>
                  <input
                    type="text"
                    required
                    value={newCompany.role}
                    onChange={(e) => setNewCompany({ ...newCompany, role: e.target.value })}
                    placeholder="e.g. SDE-1 / Graduate Tech Associate"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                  >
                    Add Company Drive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: Create Mock Test */}
      <AnimatePresence>
        {activeModal === 'mockTest' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Create Mock Test</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateMockTestSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Test Title</label>
                  <input
                    type="text"
                    required
                    value={newMockTest.title}
                    onChange={(e) => setNewMockTest({ ...newMockTest, title: e.target.value })}
                    placeholder="e.g. TCS NQT National Qualifier Mock 3"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      required
                      value={newMockTest.durationMinutes}
                      onChange={(e) => setNewMockTest({ ...newMockTest, durationMinutes: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Questions Count</label>
                    <input
                      type="number"
                      required
                      value={newMockTest.totalQuestions}
                      onChange={(e) => setNewMockTest({ ...newMockTest, totalQuestions: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 shadow-xs"
                  >
                    Publish Mock Test
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 4: Add Event */}
      <AnimatePresence>
        {activeModal === 'event' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">Add Campus Event / Challenge</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddEventSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    placeholder="e.g. CodeStorm 2026 Inter-College Hackathon"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Event Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-indigo-500 outline-none bg-white"
                    >
                      <option>Coding Challenge</option>
                      <option>Quiz</option>
                      <option>Hiring Challenge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rewards / Benefits</label>
                  <input
                    type="text"
                    required
                    value={newEvent.prizePool}
                    onChange={(e) => setNewEvent({ ...newEvent, prizePool: e.target.value })}
                    placeholder="e.g. ₹50,000 Cash Pool + Direct Interview Fast-track"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 shadow-xs"
                  >
                    Publish Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
