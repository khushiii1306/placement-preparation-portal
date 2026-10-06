import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  DollarSign,
  Calendar,
  Bell,
  FileText,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Sparkles,
  ArrowRight,
  UserCheck,
  UserX,
  X,
  Check,
  Clock,
  XCircle,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
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
import {
  getCollegeById,
  updateCollegeProfile,
  getCollegeStatsByCollege,
  saveCollegeStatYear,
  getCompaniesByCollege,
  addCollegeCompany,
  deleteCollegeCompany,
  getDrivesByCollege,
  addCollegeDrive,
  deleteCollegeDrive,
  updateCollegeDrive,
  getNoticesByCollege,
  addCollegeNotice,
  deleteCollegeNotice,
  getDocumentsByCollege,
  uploadCollegeDocument,
  deleteCollegeDocument,
  getStudentsByCollege,
  verifyStudentByOfficer,
  rejectStudentByOfficer,
  getCollegeTrainingsList,
  addCollegeTraining,
  getCollegeResultsList,
} from '../utils/collegeStorage';

interface CollegeDashboardProps {
  collegeId: string;
  onLogout: () => void;
  onSwitchView?: (view: string) => void;
}

type TabType =
  | 'overview'
  | 'profile'
  | 'students'
  | 'companies'
  | 'drives'
  | 'statistics'
  | 'notices'
  | 'documents'
  | 'trainings'
  | 'results';

export const CollegeDashboard: React.FC<CollegeDashboardProps> = ({
  collegeId,
  onLogout,
  onSwitchView,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Core College State
  const [college, setCollege] = useState<College | null>(() => getCollegeById(collegeId));
  const [stats, setStats] = useState<CollegePlacementStatistic[]>(() =>
    getCollegeStatsByCollege(collegeId)
  );
  const [companies, setCompanies] = useState<CollegeCompany[]>(() =>
    getCompaniesByCollege(collegeId)
  );
  const [drives, setDrives] = useState<CollegePlacementDrive[]>(() =>
    getDrivesByCollege(collegeId)
  );
  const [notices, setNotices] = useState<CollegePlacementNotice[]>(() =>
    getNoticesByCollege(collegeId)
  );
  const [documents, setDocuments] = useState<CollegePlacementDocument[]>(() =>
    getDocumentsByCollege(collegeId)
  );
  const [students, setStudents] = useState<CollegeEnrolledStudent[]>(() =>
    getStudentsByCollege(collegeId)
  );
  const [trainings, setTrainings] = useState<CollegeTrainingEvent[]>(() =>
    getCollegeTrainingsList(collegeId)
  );
  const [results, setResults] = useState<CollegePlacementResultRecord[]>(() =>
    getCollegeResultsList(collegeId)
  );

  // Active year statistic (default to latest)
  const currentStat = stats[0] || {
    id: '',
    collegeId,
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
  };

  // Modals state
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isAddDriveOpen, setIsAddDriveOpen] = useState(false);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [isEditStatsOpen, setIsEditStatsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Form states for modals
  const [newCompany, setNewCompany] = useState({
    name: '',
    jobRole: 'Software Development Engineer',
    packageCTC: '₹4.5 - ₹8.0 LPA',
    location: 'Pan India / Hybrid',
    eligibility: 'B.Tech CSE/IT, Min 60% or 6.5 CGPA',
    skills: 'Java, Python, SQL, DSA',
    deadline: '2026-10-15',
    placementDate: '2026-10-20',
    description: 'On-campus recruitment sprint with technical assessment and interviews.',
  });

  const [newDrive, setNewDrive] = useState({
    companyName: 'TCS',
    driveTitle: 'Campus Drive 2026',
    driveDate: '2026-10-25',
    deadline: '2026-10-20',
    role: 'System Engineer',
    packageCTC: '₹7.0 LPA',
    eligibility: 'Min 60% in 10th, 12th & Graduation',
    selectionProcess: 'Aptitude Test -> Coding Test -> Technical Interview -> HR Round',
    venue: 'Computer Center Lab 3, Main Campus',
    description: 'Annual placement drive for final year students.',
    status: 'UPCOMING' as const,
  });

  const [newNotice, setNewNotice] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '2026-10-31',
    attachment: '',
    isImportant: true,
  });

  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Placement Brochure',
    fileName: '',
    fileSize: '1.2 MB',
    fileType: 'PDF' as const,
  });

  const [statFormData, setStatFormData] = useState({
    academicYear: '2025-26',
    totalStudents: currentStat.totalStudents,
    eligibleStudents: currentStat.eligibleStudents,
    placedStudents: currentStat.placedStudents,
    highestPackage: currentStat.highestPackage,
    averagePackage: currentStat.averagePackage,
    minPackage: currentStat.minPackage,
    totalCompanies: currentStat.totalCompanies,
    totalOffers: currentStat.totalOffers,
  });

  const [profileFormData, setProfileFormData] = useState({
    name: college?.name || '',
    website: college?.website || '',
    city: college?.city || '',
    state: college?.state || '',
    country: college?.country || 'India',
    officerName: college?.officerName || '',
    officerPhone: college?.officerPhone || '',
    about: college?.about || '',
  });

  // Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING_VERIFICATION' | 'REJECTED'>('ALL');

  // Refresh helper
  const refreshData = () => {
    if (!collegeId) return;
    setCollege(getCollegeById(collegeId));
    setStats(getCollegeStatsByCollege(collegeId));
    setCompanies(getCompaniesByCollege(collegeId));
    setDrives(getDrivesByCollege(collegeId));
    setNotices(getNoticesByCollege(collegeId));
    setDocuments(getDocumentsByCollege(collegeId));
    setStudents(getStudentsByCollege(collegeId));
    setTrainings(getCollegeTrainingsList(collegeId));
    setResults(getCollegeResultsList(collegeId));
  };

  useEffect(() => {
    refreshData();
  }, [collegeId]);

  if (!college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-xl font-bold">Institution Profile Not Found</h2>
          <p className="text-sm text-slate-400 mt-2 mb-6">
            Unable to load credentials for this institution. Please re-login.
          </p>
          <button
            onClick={onLogout}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Action handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCollegeProfile(collegeId, profileFormData);
    refreshData();
    setIsEditProfileOpen(false);
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    const eligible = Number(statFormData.eligibleStudents) || 0;
    const placed = Number(statFormData.placedStudents) || 0;
    const rate = eligible > 0 ? Number(((placed / eligible) * 100).toFixed(2)) : 0;

    saveCollegeStatYear({
      collegeId,
      academicYear: statFormData.academicYear,
      totalStudents: Number(statFormData.totalStudents),
      eligibleStudents: eligible,
      placedStudents: placed,
      placementRate: rate,
      highestPackage: statFormData.highestPackage,
      averagePackage: statFormData.averagePackage,
      minPackage: statFormData.minPackage,
      totalCompanies: Number(statFormData.totalCompanies),
      totalOffers: Number(statFormData.totalOffers),
    });
    refreshData();
    setIsEditStatsOpen(false);
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    addCollegeCompany(collegeId, {
      name: newCompany.name,
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
      jobRole: newCompany.jobRole,
      packageCTC: newCompany.packageCTC,
      location: newCompany.location,
      eligibility: newCompany.eligibility,
      skills: newCompany.skills.split(',').map((s) => s.trim()),
      deadline: newCompany.deadline,
      placementDate: newCompany.placementDate,
      description: newCompany.description,
    });
    refreshData();
    setIsAddCompanyOpen(false);
    setNewCompany({
      name: '',
      jobRole: 'Software Development Engineer',
      packageCTC: '₹4.5 - ₹8.0 LPA',
      location: 'Pan India / Hybrid',
      eligibility: 'B.Tech CSE/IT, Min 60%',
      skills: 'Java, Python, SQL, DSA',
      deadline: '2026-10-15',
      placementDate: '2026-10-20',
      description: 'Campus hiring drive for final year graduates.',
    });
  };

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    addCollegeDrive(collegeId, newDrive);
    refreshData();
    setIsAddDriveOpen(false);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addCollegeNotice(collegeId, newNotice);
    refreshData();
    setIsAddNoticeOpen(false);
    setNewNotice({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      expiryDate: '2026-10-31',
      attachment: '',
      isImportant: true,
    });
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    uploadCollegeDocument(collegeId, {
      title: newDoc.title,
      category: newDoc.category,
      fileName: newDoc.fileName || `${newDoc.title.replace(/\s+/g, '_')}.${newDoc.fileType.toLowerCase()}`,
      fileSize: newDoc.fileSize,
      fileType: newDoc.fileType,
      downloadUrl: '#',
    });
    refreshData();
    setIsAddDocOpen(false);
  };

  const handleVerifyStudent = (studentId: string) => {
    verifyStudentByOfficer(collegeId, studentId);
    refreshData();
  };

  const handleRejectStudent = (studentId: string) => {
    rejectStudentByOfficer(collegeId, studentId);
    refreshData();
  };

  // Filtered Students & Verification Requests
  const pendingRequestsCount = students.filter((s) => s.status === 'PENDING_VERIFICATION').length;
  const verifiedStudentsCount = students.filter((s) => s.status === 'ACTIVE').length;

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.enrollmentId.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesStatus =
      studentStatusFilter === 'ALL' || st.status === studentStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col">
      {/* 1. TOP INSTITUTION HEADER */}
      <header className="border-b border-indigo-950/80 bg-[#0a102a]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  College Placement Dashboard
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {college.status}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Welcome, {college.name}</span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                  {college.code}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block text-right text-xs">
              <p className="font-semibold text-slate-200">{college.officerName}</p>
              <p className="text-[11px] text-slate-400">Placement Officer • {college.city}</p>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800/60 bg-indigo-900/30 px-3 py-2 text-xs font-bold text-blue-300 hover:bg-indigo-900/60 transition-colors cursor-pointer"
            >
              <Edit className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/60 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION BAR TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-indigo-950/60 flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'profile', label: 'University Profile' },
            { id: 'students', label: `Manage Students (${students.length})` },
            { id: 'companies', label: `Companies (${companies.length})` },
            { id: 'drives', label: `Placement Drives (${drives.length})` },
            { id: 'statistics', label: 'Placement Statistics' },
            { id: 'notices', label: `Notices (${notices.length})` },
            { id: 'documents', label: `Documents (${documents.length})` },
            { id: 'trainings', label: 'Training & Events' },
            { id: 'results', label: `Placement Results (${results.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-indigo-950/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* ================================================================ */}
        {/* TAB 1: OVERVIEW */}
        {/* ================================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Summary Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Total Students</span>
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-2xl font-black text-white">{currentStat.totalStudents}</p>
                <p className="text-[10px] text-slate-400 mt-1">Batch {currentStat.academicYear}</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Eligible</span>
                  <UserCheck className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-black text-cyan-300">{currentStat.eligibleStudents}</p>
                <p className="text-[10px] text-slate-400 mt-1">Criterion Cleared</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Companies</span>
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="text-2xl font-black text-white">{currentStat.totalCompanies}</p>
                <p className="text-[10px] text-slate-400 mt-1">Visiting Recruiters</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Placed</span>
                  <Award className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-emerald-400">{currentStat.placedStudents}</p>
                <p className="text-[10px] text-emerald-400/80 mt-1">{currentStat.totalOffers} Total Offers</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Placement %</span>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-2xl font-black text-blue-400">{currentStat.placementRate}%</p>
                <p className="text-[10px] text-slate-400 mt-1">Success Metric</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Average CTC</span>
                  <DollarSign className="h-4 w-4 text-amber-400" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-amber-300">{currentStat.averagePackage}</p>
                <p className="text-[10px] text-slate-400 mt-1">Per Annum</p>
              </div>

              <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Highest CTC</span>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-purple-300">{currentStat.highestPackage}</p>
                <p className="text-[10px] text-purple-400/80 mt-1">Record Package</p>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setIsAddDriveOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-700 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Placement Drive</span>
                </button>

                <button
                  onClick={() => setIsAddCompanyOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800 bg-indigo-900/40 px-3.5 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Company</span>
                </button>

                <button
                  onClick={() => setIsAddNoticeOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800 bg-indigo-900/40 px-3.5 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900 transition-all cursor-pointer"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span>Upload Notices</span>
                </button>

                <button
                  onClick={() => setIsAddDocOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800 bg-indigo-900/40 px-3.5 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900 transition-all cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Upload Documents</span>
                </button>

                <button
                  onClick={() => setActiveTab('students')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800 bg-indigo-900/40 px-3.5 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900 transition-all cursor-pointer"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Manage Students</span>
                </button>

                <button
                  onClick={() => setIsEditStatsOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-800 bg-indigo-900/40 px-3.5 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900 transition-all cursor-pointer"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Update Placement Statistics</span>
                </button>
              </div>
            </div>

            {/* Grid: Recent Placement Activities & Upcoming Campus Drives */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 cols: Recent Placement Drives */}
              <div className="lg:col-span-7 rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>Recent Placement Activities</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('drives')}
                    className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View All Drives</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {drives.slice(0, 4).map((drive) => (
                    <div
                      key={drive.id}
                      className="rounded-xl border border-indigo-950/80 bg-[#090e24] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{drive.companyName}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              drive.status === 'UPCOMING'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                : drive.status === 'ONGOING'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {drive.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{drive.driveTitle}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Role: <strong className="text-slate-200">{drive.role}</strong> • CTC: <strong className="text-emerald-400">{drive.packageCTC}</strong>
                        </p>
                      </div>

                      <div className="text-left sm:text-right flex-shrink-0">
                        <span className="inline-block text-[11px] font-mono text-slate-300 bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-900/60">
                          Drive Date: {drive.driveDate}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">Deadline: {drive.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 cols: Latest Notices */}
              <div className="lg:col-span-5 rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-400" />
                    <span>Published Student Notices</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('notices')}
                    className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Manage Notices</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {notices.slice(0, 4).map((notice) => (
                    <div
                      key={notice.id}
                      className="rounded-xl border border-indigo-950/80 bg-[#090e24] p-3.5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{notice.title}</h4>
                        {notice.isImportant && (
                          <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[9px] font-bold text-rose-400 border border-rose-500/30 flex-shrink-0">
                            IMPORTANT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{notice.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-indigo-950/40">
                        <span>Posted: {notice.date}</span>
                        <span>Valid till: {notice.expiryDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: UNIVERSITY PROFILE */}
        {/* ================================================================ */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto rounded-2xl border border-indigo-950 bg-[#0c1330] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-950/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">University Placement Profile</h3>
                <p className="text-xs text-slate-400">Institutional details visible to enrolled students & recruiters.</p>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
              >
                <Edit className="h-3.5 w-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Institution Name</span>
                <p className="text-sm font-bold text-white mt-1">{college.name}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">University Code</span>
                <p className="text-sm font-mono font-bold text-blue-400 mt-1">{college.code}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Official Email</span>
                <p className="text-sm font-medium text-white mt-1">{college.email}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Domain Filter</span>
                <p className="text-sm font-mono text-emerald-400 mt-1">{college.emailDomain}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Location</span>
                <p className="text-sm text-white mt-1">{college.city}, {college.state}, {college.country}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Official Website</span>
                <a
                  href={college.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 hover:underline flex items-center gap-1 mt-1"
                >
                  <span>{college.website}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Placement Officer</span>
                <p className="text-sm font-bold text-white mt-1">{college.officerName}</p>
              </div>

              <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Officer Contact</span>
                <p className="text-sm font-mono text-white mt-1">{college.officerPhone}</p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-950 bg-[#090e24] p-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">About Institution</span>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{college.about}</p>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: MANAGE STUDENTS */}
        {/* ================================================================ */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Registered Enrolled Students</h3>
                <p className="text-xs text-slate-400">
                  Data isolated for {college.name}. Verify student enrollment ID or approve accounts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by name, email, roll..."
                    className="rounded-xl border border-indigo-950 bg-[#090e24] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={studentStatusFilter}
                  onChange={(e) => setStudentStatusFilter(e.target.value as any)}
                  className="rounded-xl border border-indigo-950 bg-[#090e24] py-1.5 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Verified (Active)</option>
                  <option value="PENDING_VERIFICATION">Pending Verification</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-indigo-950 bg-[#090e24] text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Enrollment ID</th>
                      <th className="py-3 px-4">Branch & Year</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Verification</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-950/60 text-slate-200">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No students found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-indigo-950/30 transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{st.fullName}</td>
                          <td className="py-3 px-4 font-mono font-semibold text-blue-300">
                            {st.enrollmentId}
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-white">{st.branch}</p>
                            <p className="text-[11px] text-slate-400">{st.academicYear}</p>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-300">{st.email}</td>
                          <td className="py-3 px-4">
                            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                              {st.verificationMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {st.status === 'ACTIVE' ? (
                              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                                Verified
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                                Pending Officer Review
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {st.status !== 'ACTIVE' ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleVerifyStudent(st.id)}
                                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 cursor-pointer"
                                >
                                  <UserCheck className="h-3 w-3" />
                                  <span>Verify</span>
                                </button>
                                <button
                                  onClick={() => handleRejectStudent(st.id)}
                                  className="inline-flex items-center gap-1 rounded-lg bg-rose-900/40 px-2.5 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-900 cursor-pointer"
                                >
                                  <UserX className="h-3 w-3" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400">Verified</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 4: COMPANIES */}
        {/* ================================================================ */}
        {activeTab === 'companies' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Campus Visiting Companies</h3>
                <p className="text-xs text-slate-400">
                  Manage corporate recruiters scheduled to hire from {college.name}.
                </p>
              </div>
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add Visiting Company</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{comp.name}</h4>
                        <p className="text-xs font-semibold text-blue-400">{comp.jobRole}</p>
                      </div>
                      <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                        {comp.packageCTC}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{comp.description}</p>

                    <div className="pt-2 border-t border-indigo-950/60 space-y-1.5 text-xs text-slate-400">
                      <p><strong>Eligibility:</strong> {comp.eligibility}</p>
                      <p><strong>Location:</strong> {comp.location}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {comp.skills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-indigo-950/80 px-2 py-0.5 text-[10px] font-mono text-indigo-300 border border-indigo-900/60"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-indigo-950/60 text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Visit Date: {comp.placementDate}
                    </span>
                    <button
                      onClick={() => {
                        deleteCollegeCompany(collegeId, comp.id);
                        refreshData();
                      }}
                      className="text-rose-400 hover:text-rose-300 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 5: PLACEMENT DRIVES */}
        {/* ================================================================ */}
        {activeTab === 'drives' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Campus Placement Drives</h3>
                <p className="text-xs text-slate-400">
                  Official on-campus drives with eligibility, registration dates, and test venues.
                </p>
              </div>
              <button
                onClick={() => setIsAddDriveOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add Placement Drive</span>
              </button>
            </div>

            <div className="space-y-3">
              {drives.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-base font-bold text-white">{d.companyName}</h4>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          d.status === 'UPCOMING'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : d.status === 'ONGOING'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-300">{d.driveTitle}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{d.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                      <span>Role: <strong className="text-white">{d.role}</strong></span>
                      <span>Package: <strong className="text-emerald-400">{d.packageCTC}</strong></span>
                      <span>Venue: <strong className="text-slate-300">{d.venue}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-end justify-between gap-2 border-t md:border-t-0 border-indigo-950/60 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="inline-block text-xs font-mono font-bold text-blue-300 bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-900">
                        Date: {d.driveDate}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Deadline: {d.deadline}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const nextStatus =
                            d.status === 'UPCOMING'
                              ? 'ONGOING'
                              : d.status === 'ONGOING'
                              ? 'COMPLETED'
                              : 'UPCOMING';
                          updateCollegeDrive(collegeId, d.id, { status: nextStatus });
                          refreshData();
                        }}
                        className="rounded-lg border border-indigo-800 bg-indigo-950/50 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-900"
                      >
                        Cycle Status
                      </button>
                      <button
                        onClick={() => {
                          deleteCollegeDrive(collegeId, d.id);
                          refreshData();
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 6: PLACEMENT STATISTICS */}
        {/* ================================================================ */}
        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Annual Placement Statistics</h3>
                <p className="text-xs text-slate-400">
                  Track and publish yearly placement metrics for {college.name}.
                </p>
              </div>
              <button
                onClick={() => setIsEditStatsOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Update Year Metrics</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((st) => (
                <div
                  key={st.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-400">Academic Year</span>
                      <h4 className="text-xl font-black text-white">{st.academicYear}</h4>
                    </div>
                    <span className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-sm font-black text-emerald-400">
                      {st.placementRate}% Placed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Total Students</span>
                      <p className="text-base font-bold text-white mt-0.5">{st.totalStudents}</p>
                    </div>
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Eligible</span>
                      <p className="text-base font-bold text-cyan-300 mt-0.5">{st.eligibleStudents}</p>
                    </div>
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Students Placed</span>
                      <p className="text-base font-bold text-emerald-400 mt-0.5">{st.placedStudents}</p>
                    </div>
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Total Offers</span>
                      <p className="text-base font-bold text-white mt-0.5">{st.totalOffers}</p>
                    </div>
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Average CTC</span>
                      <p className="text-sm font-bold text-amber-300 mt-0.5">{st.averagePackage}</p>
                    </div>
                    <div className="rounded-lg bg-[#090e24] p-2.5">
                      <span className="text-[10px] text-slate-400 uppercase">Highest CTC</span>
                      <p className="text-sm font-bold text-purple-300 mt-0.5">{st.highestPackage}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-right">
                    {st.totalCompanies} recruiters participated
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 7: NOTICES */}
        {/* ================================================================ */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Campus Placement Notices</h3>
                <p className="text-xs text-slate-400">
                  Broadcast drives, tests, and training notices directly to enrolled students.
                </p>
              </div>
              <button
                onClick={() => setIsAddNoticeOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/30"
              >
                <Plus className="h-4 w-4" />
                <span>Upload New Notice</span>
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-lg hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm sm:text-base font-bold text-white">{n.title}</h4>
                      {n.isImportant && (
                        <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                          IMPORTANT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{n.description}</p>
                    {n.attachment && (
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#090e24] px-2.5 py-1 text-xs text-blue-300 border border-indigo-950">
                        <FileText className="h-3.5 w-3.5 text-blue-400" />
                        <span>{n.attachment}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center sm:flex-col items-end justify-between gap-2 border-t sm:border-t-0 border-indigo-950/60 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right text-[11px] text-slate-400">
                      <p>Published: {n.date}</p>
                      <p>Expires: {n.expiryDate}</p>
                    </div>
                    <button
                      onClick={() => {
                        deleteCollegeNotice(collegeId, n.id);
                        refreshData();
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 8: DOCUMENTS */}
        {/* ================================================================ */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Official Placement Documents</h3>
                <p className="text-xs text-slate-400">
                  Upload brochures, placement policy, eligibility lists, calendars, and templates.
                </p>
              </div>
              <button
                onClick={() => setIsAddDocOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-600/30"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-indigo-800 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{doc.fileType} • {doc.fileSize}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{doc.title}</h4>
                    <p className="text-xs font-mono text-slate-400 break-all">{doc.fileName}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-indigo-950/60 text-xs">
                    <span className="text-[11px] text-slate-400">{doc.uploadDate}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Simulating download for ${doc.fileName}`)}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => {
                          deleteCollegeDocument(collegeId, doc.id);
                          refreshData();
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 9: TRAINING & EVENTS */}
        {/* ================================================================ */}
        {activeTab === 'trainings' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <div>
                <h3 className="text-base font-bold text-white">Campus Training Workshops & Bootcamps</h3>
                <p className="text-xs text-slate-400">
                  Pre-placement aptitude, coding bootcamps, and mock interviews scheduled by T&P cell.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trainings.map((tr) => (
                <div
                  key={tr.id}
                  className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-5 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase">
                      {tr.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">{tr.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{tr.title}</h4>
                  <p className="text-xs text-slate-300">{tr.topic}</p>
                  <div className="pt-2 border-t border-indigo-950/60 text-xs text-slate-400 space-y-1">
                    <p><strong>Coach:</strong> {tr.trainer}</p>
                    <p><strong>Schedule:</strong> {tr.date} ({tr.time})</p>
                    <p><strong>Venue:</strong> {tr.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 10: PLACEMENT RESULTS */}
        {/* ================================================================ */}
        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] p-4">
              <h3 className="text-base font-bold text-white">Verified Campus Selections & Offers</h3>
              <p className="text-xs text-slate-400">
                Official list of students who secured placement offers from {college.name}.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-950 bg-[#0c1330] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-indigo-950 bg-[#090e24] text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Enrollment ID</th>
                      <th className="py-3 px-4">Branch</th>
                      <th className="py-3 px-4">Recruiting Company</th>
                      <th className="py-3 px-4">Job Role</th>
                      <th className="py-3 px-4">Package Offered</th>
                      <th className="py-3 px-4 text-right">Offer Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-950/60 text-slate-200">
                    {results.map((r) => (
                      <tr key={r.id} className="hover:bg-indigo-950/30">
                        <td className="py-3 px-4 font-bold text-white">{r.studentName}</td>
                        <td className="py-3 px-4 font-mono text-blue-300">{r.enrollmentId}</td>
                        <td className="py-3 px-4">{r.branch}</td>
                        <td className="py-3 px-4 font-semibold text-white">{r.companyName}</td>
                        <td className="py-3 px-4 text-slate-300">{r.role}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400 font-mono">{r.packageCTC}</td>
                        <td className="py-3 px-4 text-right font-mono text-slate-400">{r.offerDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================================================================ */}
      {/* MODAL: ADD COMPANY */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isAddCompanyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Add Campus Visiting Company</h3>
                <button onClick={() => setIsAddCompanyOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddCompany} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    placeholder="e.g. Amazon / Microsoft"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Job Role *</label>
                    <input
                      type="text"
                      required
                      value={newCompany.jobRole}
                      onChange={(e) => setNewCompany({ ...newCompany, jobRole: e.target.value })}
                      placeholder="e.g. SDE-1"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Package CTC *</label>
                    <input
                      type="text"
                      required
                      value={newCompany.packageCTC}
                      onChange={(e) => setNewCompany({ ...newCompany, packageCTC: e.target.value })}
                      placeholder="e.g. ₹8.5 LPA"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Visit Date *</label>
                    <input
                      type="date"
                      required
                      value={newCompany.placementDate}
                      onChange={(e) => setNewCompany({ ...newCompany, placementDate: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Deadline *</label>
                    <input
                      type="date"
                      required
                      value={newCompany.deadline}
                      onChange={(e) => setNewCompany({ ...newCompany, deadline: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={newCompany.eligibility}
                    onChange={(e) => setNewCompany({ ...newCompany, eligibility: e.target.value })}
                    placeholder="Min 60% with no active backlogs"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={newCompany.skills}
                    onChange={(e) => setNewCompany({ ...newCompany, skills: e.target.value })}
                    placeholder="Java, Python, SQL, DSA"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddCompanyOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Save Company
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL: ADD PLACEMENT DRIVE */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isAddDriveOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Add Campus Placement Drive</h3>
                <button onClick={() => setIsAddDriveOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddDrive} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={newDrive.companyName}
                      onChange={(e) => setNewDrive({ ...newDrive, companyName: e.target.value })}
                      placeholder="e.g. TCS"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Drive Title *</label>
                    <input
                      type="text"
                      required
                      value={newDrive.driveTitle}
                      onChange={(e) => setNewDrive({ ...newDrive, driveTitle: e.target.value })}
                      placeholder="TCS NQT Campus Drive 2026"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Drive Date *</label>
                    <input
                      type="date"
                      required
                      value={newDrive.driveDate}
                      onChange={(e) => setNewDrive({ ...newDrive, driveDate: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Deadline *</label>
                    <input
                      type="date"
                      required
                      value={newDrive.deadline}
                      onChange={(e) => setNewDrive({ ...newDrive, deadline: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Role</label>
                    <input
                      type="text"
                      value={newDrive.role}
                      onChange={(e) => setNewDrive({ ...newDrive, role: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Package CTC</label>
                    <input
                      type="text"
                      value={newDrive.packageCTC}
                      onChange={(e) => setNewDrive({ ...newDrive, packageCTC: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue</label>
                  <input
                    type="text"
                    value={newDrive.venue}
                    onChange={(e) => setNewDrive({ ...newDrive, venue: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description / Instructions</label>
                  <textarea
                    rows={2}
                    value={newDrive.description}
                    onChange={(e) => setNewDrive({ ...newDrive, description: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDriveOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Publish Drive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL: ADD NOTICE */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isAddNoticeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Publish Placement Notice</h3>
                <button onClick={() => setIsAddNoticeOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="e.g. TCS Placement Drive Registration Open"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={newNotice.description}
                    onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                    placeholder="Instructions for students..."
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      value={newNotice.date}
                      onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={newNotice.expiryDate}
                      onChange={(e) => setNewNotice({ ...newNotice, expiryDate: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Attachment File Name</label>
                  <input
                    type="text"
                    value={newNotice.attachment}
                    onChange={(e) => setNewNotice({ ...newNotice, attachment: e.target.value })}
                    placeholder="e.g. TCS_Instructions_2026.pdf"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={newNotice.isImportant}
                    onChange={(e) => setNewNotice({ ...newNotice, isImportant: e.target.checked })}
                    className="rounded border-slate-700 text-rose-600 focus:ring-0"
                  />
                  <span className="text-xs text-rose-300 font-semibold">Mark as High Priority / Important</span>
                </label>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddNoticeOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Post Notice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL: UPLOAD DOCUMENT */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isAddDocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Upload Placement Document</h3>
                <button onClick={() => setIsAddDocOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddDocument} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    placeholder="e.g. Placement Policy 2026-27"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  >
                    <option value="Placement Brochure">Placement Brochure</option>
                    <option value="Placement Policy">Placement Policy</option>
                    <option value="Company Eligibility List">Company Eligibility List</option>
                    <option value="Placement Calendar">Placement Calendar</option>
                    <option value="Training Schedule">Training Schedule</option>
                    <option value="Interview Guidelines">Interview Guidelines</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">File Type</label>
                    <select
                      value={newDoc.fileType}
                      onChange={(e) => setNewDoc({ ...newDoc, fileType: e.target.value as any })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="DOCX">DOCX Word Document</option>
                      <option value="XLSX">XLSX Spreadsheet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">File Size</label>
                    <input
                      type="text"
                      value={newDoc.fileSize}
                      onChange={(e) => setNewDoc({ ...newDoc, fileSize: e.target.value })}
                      placeholder="e.g. 2.1 MB"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDocOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL: UPDATE STATS */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isEditStatsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Update Placement Statistics</h3>
                <button onClick={() => setIsEditStatsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStats} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Academic Year</label>
                  <input
                    type="text"
                    required
                    value={statFormData.academicYear}
                    onChange={(e) => setStatFormData({ ...statFormData, academicYear: e.target.value })}
                    placeholder="2025-26"
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Total Students</label>
                    <input
                      type="number"
                      required
                      value={statFormData.totalStudents}
                      onChange={(e) => setStatFormData({ ...statFormData, totalStudents: Number(e.target.value) })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Eligible Students</label>
                    <input
                      type="number"
                      required
                      value={statFormData.eligibleStudents}
                      onChange={(e) => setStatFormData({ ...statFormData, eligibleStudents: Number(e.target.value) })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Placed Students</label>
                    <input
                      type="number"
                      required
                      value={statFormData.placedStudents}
                      onChange={(e) => setStatFormData({ ...statFormData, placedStudents: Number(e.target.value) })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Total Offers</label>
                    <input
                      type="number"
                      required
                      value={statFormData.totalOffers}
                      onChange={(e) => setStatFormData({ ...statFormData, totalOffers: Number(e.target.value) })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Average CTC</label>
                    <input
                      type="text"
                      value={statFormData.averagePackage}
                      onChange={(e) => setStatFormData({ ...statFormData, averagePackage: e.target.value })}
                      placeholder="₹6.5 LPA"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Highest CTC</label>
                    <input
                      type="text"
                      value={statFormData.highestPackage}
                      onChange={(e) => setStatFormData({ ...statFormData, highestPackage: e.target.value })}
                      placeholder="₹18 LPA"
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditStatsOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Save Statistics
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* MODAL: EDIT PROFILE */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-indigo-900 bg-[#0e1738] p-6 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                <h3 className="text-base font-bold">Edit University Placement Profile</h3>
                <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">University / College Name</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.name}
                    onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={profileFormData.city}
                      onChange={(e) => setProfileFormData({ ...profileFormData, city: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={profileFormData.state}
                      onChange={(e) => setProfileFormData({ ...profileFormData, state: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Website</label>
                  <input
                    type="url"
                    value={profileFormData.website}
                    onChange={(e) => setProfileFormData({ ...profileFormData, website: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Placement Officer Name</label>
                    <input
                      type="text"
                      value={profileFormData.officerName}
                      onChange={(e) => setProfileFormData({ ...profileFormData, officerName: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Officer Phone</label>
                    <input
                      type="text"
                      value={profileFormData.officerPhone}
                      onChange={(e) => setProfileFormData({ ...profileFormData, officerPhone: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">About University Placement Cell</label>
                  <textarea
                    rows={3}
                    value={profileFormData.about}
                    onChange={(e) => setProfileFormData({ ...profileFormData, about: e.target.value })}
                    className="w-full rounded-xl border border-indigo-900 bg-[#090e24] px-3 py-2 text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Save Changes
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
