import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  School,
  Building2,
  Calendar,
  Bell,
  FileText,
  Award,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Globe,
  AlertCircle,
  Briefcase,
  ChevronRight,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import {
  getAuthorizedUniversityPlacementData,
  getCollegeById,
} from '../utils/collegeStorage';
import {
  CollegePlacementDrive,
  CollegePlacementNotice,
  CollegeCompany,
  CollegePlacementDocument,
  CollegeTrainingEvent,
} from '../types';

interface UniversityPlacementPageProps {
  collegeId?: string;
  userEmail?: string;
  userName?: string;
  onBackToDashboard?: () => void;
}

type SubTab =
  | 'overview'
  | 'notices'
  | 'drives'
  | 'companies'
  | 'statistics'
  | 'documents'
  | 'trainings'
  | 'profile';

export const UniversityPlacementPage: React.FC<UniversityPlacementPageProps> = ({
  collegeId,
  userEmail = '',
  userName = 'Student Candidate',
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<SubTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Applied drives state (isolated by student email in localStorage)
  const [appliedDrivesMap, setAppliedDrivesMap] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(`applied_drives_${userEmail}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [applyModalDrive, setApplyModalDrive] = useState<CollegePlacementDrive | null>(null);
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  if (!collegeId) return null;

  // CRITICAL ACCESS CONTROL: student.college_id == content.college_id
  const authorizedData = getAuthorizedUniversityPlacementData(collegeId);

  const college = authorizedData?.college || getCollegeById(collegeId);
  if (!college) return null;

  const stats = authorizedData?.stats || {
    id: 'stat_fallback',
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

  const companies: CollegeCompany[] = authorizedData?.companies || [];
  const drives: CollegePlacementDrive[] = authorizedData?.drives || [];
  const notices: CollegePlacementNotice[] = authorizedData?.notices || [];
  const documents: CollegePlacementDocument[] = authorizedData?.documents || [];
  const trainings: CollegeTrainingEvent[] = authorizedData?.trainings || [];

  const handleApplyDrive = (drive: CollegePlacementDrive) => {
    const updated = { ...appliedDrivesMap, [drive.id]: true };
    setAppliedDrivesMap(updated);
    try {
      localStorage.setItem(`applied_drives_${userEmail}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setApplyModalDrive(null);
    setApplySuccessMsg(`Successfully registered for ${drive.companyName} (${drive.role}) drive! Hall ticket will be sent to ${userEmail}.`);
    setTimeout(() => setApplySuccessMsg(null), 5000);
  };

  const handleDownloadDoc = (docTitle: string, fileName: string) => {
    alert(`Downloading verified campus document: "${fileName}" for ${college.name}`);
  };

  const handleDownloadNotice = (noticeTitle: string, attachment?: string) => {
    alert(`Downloading official notice attachment: "${attachment || noticeTitle}"`);
  };

  return (
    <div id="university-placement-container" className="space-y-6">
      {/* Top Breadcrumb & Return to Dashboard Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-600 text-white font-bold shadow-md shadow-blue-600/25">
            <School className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                MY UNIVERSITY
              </span>
              <span className="text-xs text-slate-400 font-mono">Code: {college.code}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="h-3 w-3" />
                Verified Campus
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {college.name}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Training & Placement Cell • Corporate Relations Board
            </p>
          </div>
        </div>

        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            ← Back to Preparation Dashboard
          </button>
        )}
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {applySuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 flex items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>{applySuccessMsg}</span>
            </div>
            <button
              onClick={() => setApplySuccessMsg(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-Navigation Buttons (The 7 Sections requested) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 no-scrollbar">
        {[
          { key: 'overview', label: 'University Placement', icon: School },
          { key: 'notices', label: 'Placement Notices', icon: Bell, count: notices.length },
          { key: 'drives', label: 'Placement Drives', icon: Calendar, count: drives.length },
          { key: 'companies', label: 'Companies Visiting Campus', icon: Building2, count: companies.length },
          { key: 'statistics', label: 'Placement Statistics', icon: TrendingUp },
          { key: 'documents', label: 'Placement Documents', icon: FileText, count: documents.length },
          { key: 'trainings', label: 'Training & Events', icon: BookOpen, count: trainings.length },
          { key: 'profile', label: 'University Profile', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as SubTab)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: OVERVIEW (The University Placement Page requested in Prompt #14)
         ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1435] via-[#101b46] to-[#0a0e27] p-6 sm:p-8 text-white border border-indigo-900/60 shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-500/30">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                Official Campus Placement Season 2026-27
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {college.name}
              </h2>
              <p className="text-sm font-semibold text-blue-300">
                Placement Cell • Career Development Center
              </p>
              <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                Welcome, <strong className="text-white">{userName}</strong>! Explore official drives, track visiting campus recruiters, review audited placement records, and access university placement documents.
              </p>
            </div>

            {/* Quick links pill */}
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-indigo-800/60">
              <button
                onClick={() => setActiveTab('drives')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>View Campus Drives ({drives.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('notices')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <span>Latest Notices ({notices.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <span>Download Brochure & Policies</span>
              </button>
            </div>
          </div>

          {/* Section: Placement Statistics (as requested: 83.33% Placement Rate, ₹18 LPA Highest, ₹6.5 LPA Average, 350 Students Placed) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <span>Placement Statistics ({stats.academicYear})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Audited campus recruitment statistics for {college.name}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('statistics')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Detailed Statistics →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Stat 1: 83.33% Placement Rate */}
              <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Placement Rate
                  </span>
                  <Award className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600 mt-2">
                  {stats.placementRate}%
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Audited Campus Rate
                </p>
              </div>

              {/* Stat 2: ₹18 LPA Highest Package */}
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Highest Package
                  </span>
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2">
                  {stats.highestPackage}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Top Offer CTC
                </p>
              </div>

              {/* Stat 3: ₹6.5 LPA Average Package */}
              <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/70 to-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Average Package
                  </span>
                  <TrendingUp className="h-4 w-4 text-sky-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-sky-700 mt-2">
                  {stats.averagePackage}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Median CTC: ₹5.5 LPA
                </p>
              </div>

              {/* Stat 4: 350 Students Placed */}
              <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/70 to-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Students Placed
                  </span>
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-purple-700 mt-2">
                  {stats.placedStudents}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Out of {stats.eligibleStudents} eligible
                </p>
              </div>
            </div>
          </div>

          {/* Section: Upcoming Drives (as requested: TCS 25 September 2026, Infosys 30 September 2026) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Placement Drives</span>
                </h3>
                <p className="text-xs text-slate-500">
                  On-campus and virtual recruitment schedules for {college.name} students
                </p>
              </div>
              <button
                onClick={() => setActiveTab('drives')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View All Drives ({drives.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drives.slice(0, 4).map((drive) => {
                const isApplied = Boolean(appliedDrivesMap[drive.id]);
                return (
                  <div
                    key={drive.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                            {drive.status}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900 mt-1.5">
                            {drive.companyName}
                          </h4>
                          <p className="text-xs font-semibold text-slate-600">{drive.role}</p>
                        </div>
                        <span className="rounded-xl bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-100">
                          {drive.packageCTC}
                        </span>
                      </div>

                      <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Drive Date:</span>
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-600" />
                            {drive.driveDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Apply Deadline:</span>
                          <span className="font-semibold text-rose-600">{drive.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Eligibility:</span>
                          <span className="font-medium text-slate-700 truncate max-w-[220px]">
                            {drive.eligibility}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      {isApplied ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="h-4 w-4" />
                          Registered / Applied
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setApplyModalDrive(drive)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Apply / Register</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}

                      <span className="text-[11px] text-slate-400 font-medium">
                        Venue: {drive.venue.split(',')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Companies Visiting Campus (as requested: TCS, Infosys, Accenture, Wipro) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  <span>Companies Visiting Campus</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Approved recruitment partners for {college.name}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('companies')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View Directory ({companies.length}) →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {companies.map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col items-center justify-between"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-indigo-700 font-black text-sm border border-slate-200/80 mb-2">
                    {comp.name.slice(0, 3).toUpperCase()}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {comp.name}
                  </h4>
                  <p className="text-[11px] text-indigo-600 font-semibold mt-1">{comp.packageCTC}</p>
                  <span className="mt-2 text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 truncate w-full">
                    {comp.jobRole}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Latest Notices */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-500" />
                  <span>Latest Notices & Announcements</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Important updates from {college.officerName} (T&P Officer)
                </p>
              </div>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                [ View All Notices ]
              </button>
            </div>

            <div className="space-y-2.5">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {notice.isImportant && (
                        <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-extrabold text-rose-700">
                          IMPORTANT
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-slate-900">{notice.title}</h4>
                      <span className="text-[11px] text-slate-400">• {notice.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                      {notice.description}
                    </p>
                  </div>

                  {notice.attachment && (
                    <button
                      type="button"
                      onClick={() => handleDownloadNotice(notice.title, notice.attachment)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{notice.attachment.slice(0, 20)}...</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PLACEMENT NOTICES (Notice Title, Date, Description, Attachment, Important tag)
         ========================================================================= */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-500" />
                <span>Placement Notices ({notices.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Official circulars published by {college.name} Placement Cell
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            {notices
              .filter(
                (n) =>
                  n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  n.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((notice) => (
                <div
                  key={notice.id}
                  className={`rounded-2xl border p-5 bg-white shadow-xs transition-all ${
                    notice.isImportant ? 'border-amber-300 ring-1 ring-amber-200/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      {notice.isImportant ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-black text-rose-700">
                          <AlertCircle className="h-3 w-3" />
                          IMPORTANT NOTICE
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                          CIRCULAR
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium">
                        Published: {notice.date}
                      </span>
                      {notice.expiryDate && (
                        <span className="text-xs text-rose-600 font-medium">
                          • Valid until: {notice.expiryDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3">
                    <h4 className="text-base font-extrabold text-slate-900">{notice.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                      {notice.description}
                    </p>
                  </div>

                  {notice.attachment && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FileText className="h-4 w-4 text-indigo-600" />
                        <span className="font-semibold text-slate-700">Attachment:</span>
                        <span className="font-mono text-indigo-600">{notice.attachment}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadNotice(notice.title, notice.attachment)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download Attachment</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PLACEMENT DRIVES (Company, Role, Eligibility, Drive Date, Deadline, Selection Process, Package, [ Apply / Register ])
         ========================================================================= */}
      {activeTab === 'drives' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Placement Drives ({drives.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Campus recruitment drives scheduled for {college.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              {['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterType(st)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                    filterType === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {drives
              .filter((d) => filterType === 'ALL' || d.status === filterType)
              .map((drive) => {
                const isApplied = Boolean(appliedDrivesMap[drive.id]);
                return (
                  <div
                    key={drive.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                              drive.status === 'UPCOMING'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : drive.status === 'ONGOING'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {drive.status}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            Drive ID: {drive.id}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mt-1">
                          {drive.companyName}
                        </h4>
                        <p className="text-sm font-bold text-indigo-600">{drive.role}</p>
                      </div>

                      <div className="text-right sm:self-auto self-start">
                        <span className="text-xs font-semibold text-slate-400 block">Package (CTC)</span>
                        <span className="text-lg sm:text-xl font-black text-emerald-600">
                          {drive.packageCTC}
                        </span>
                      </div>
                    </div>

                    {/* Drive Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block font-semibold text-[11px]">
                          Drive Date:
                        </span>
                        <span className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-blue-600" />
                          {drive.driveDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[11px]">
                          Application Deadline:
                        </span>
                        <span className="font-bold text-rose-600 mt-0.5 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-rose-500" />
                          {drive.deadline}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[11px]">
                          Venue / Center:
                        </span>
                        <span className="font-semibold text-slate-800 mt-0.5 truncate block">
                          {drive.venue}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold text-[11px]">
                          Eligibility:
                        </span>
                        <span className="font-semibold text-slate-800 mt-0.5 truncate block">
                          {drive.eligibility}
                        </span>
                      </div>
                    </div>

                    {/* Selection Process & Description */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-slate-800 font-bold">Selection Process: </strong>
                        <span className="text-slate-600">{drive.selectionProcess}</span>
                      </div>
                      <div>
                        <strong className="text-slate-800 font-bold">Instructions: </strong>
                        <span className="text-slate-600">{drive.description}</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <School className="h-4 w-4 text-indigo-600" />
                        <span>Eligible Institution: <strong>{college.name}</strong></span>
                      </div>

                      {isApplied ? (
                        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Application Submitted (Hall Ticket Verified)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setApplyModalDrive(drive)}
                          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          <FileCheck2 className="h-4 w-4" />
                          <span>Apply / Register for Drive</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: COMPANIES VISITING CAMPUS
         ========================================================================= */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" />
                <span>Companies Visiting Campus ({companies.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Corporate recruiters offering placement opportunities to {college.name} students
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((comp) => (
              <div
                key={comp.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-black text-base shadow-sm">
                      {comp.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">{comp.name}</h4>
                      <p className="text-xs font-semibold text-slate-500">{comp.jobRole}</p>
                    </div>
                  </div>
                  <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 border border-emerald-100">
                    {comp.packageCTC}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{comp.description}</p>

                <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold">{comp.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Eligibility:</span>
                    <span className="font-semibold truncate max-w-[220px]">{comp.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Interview Date:</span>
                    <span className="font-bold text-blue-600">{comp.placementDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Key Technical Skills Tested:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: PLACEMENT STATISTICS (Detailed)
         ========================================================================= */}
      {activeTab === 'statistics' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span>Campus Placement Performance Summary</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verified records for {college.name} ({stats.academicYear})
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Batch</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{stats.totalStudents}</p>
                <span className="text-[10px] text-slate-400">Enrolled Students</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Eligible</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{stats.eligibleStudents}</p>
                <span className="text-[10px] text-slate-400">Zero Backlog Batch</span>
              </div>
              <div className="rounded-xl bg-indigo-50/70 p-3 border border-indigo-100">
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">Placed</span>
                <p className="text-xl font-black text-indigo-700 mt-0.5">{stats.placedStudents}</p>
                <span className="text-[10px] text-indigo-600">Offers Confirmed</span>
              </div>
              <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-100">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">Placement Rate</span>
                <p className="text-xl font-black text-emerald-700 mt-0.5">{stats.placementRate}%</p>
                <span className="text-[10px] text-emerald-600">Eligible Placed</span>
              </div>
              <div className="rounded-xl bg-amber-50/70 p-3 border border-amber-100">
                <span className="text-[10px] font-bold uppercase text-amber-700 block">Highest CTC</span>
                <p className="text-xl font-black text-amber-700 mt-0.5">{stats.highestPackage}</p>
                <span className="text-[10px] text-amber-600">Domestic Offer</span>
              </div>
              <div className="rounded-xl bg-sky-50/70 p-3 border border-sky-100">
                <span className="text-[10px] font-bold uppercase text-sky-700 block">Average CTC</span>
                <p className="text-xl font-black text-sky-700 mt-0.5">{stats.averagePackage}</p>
                <span className="text-[10px] text-sky-600">Batch Average</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Placement Track Record Highlights</h4>
            <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
              <li>Over 48 Tier-1 technology companies and global corporations visited {college.name} campus.</li>
              <li>410 total job offers issued across Computer Science, IT, Electronics, and Mechanical branches.</li>
              <li>Average package increased from ₹5.8 LPA (2024-25) to ₹6.5 LPA (2025-26).</li>
              <li>100% of students clearing the pre-placement mock assessment secured campus placement offers.</li>
            </ul>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: PLACEMENT DOCUMENTS (Brochure, Policy, Resume Guidelines, Format Templates)
         ========================================================================= */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <span>Placement Documents ({documents.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Official brochures, recruitment policies, templates, and eligibility guidelines
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold border border-indigo-100">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                      {doc.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{doc.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {doc.fileSize} • {doc.fileType}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadDoc(doc.title, doc.fileName)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: TRAINING & EVENTS
         ========================================================================= */}
      {activeTab === 'trainings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <span>Placement Training & Bootcamps ({trainings.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Specialized soft skills, aptitude drills, and technical mock sessions by {college.name}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {trainings.map((tr) => (
              <div
                key={tr.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {tr.category}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1">{tr.title}</h4>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {tr.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block font-semibold">Lead Trainer:</span>
                    <span className="font-bold text-slate-800">{tr.trainer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Date & Time:</span>
                    <span className="font-bold text-slate-800">{tr.date} ({tr.time})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Venue:</span>
                    <span className="font-bold text-slate-800">{tr.venue}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 pt-1">
                  <strong>Curriculum Focus:</strong> {tr.topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: UNIVERSITY PROFILE
         ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold">
                  <School className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{college.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Institution Portal Code: <strong className="text-indigo-600 font-mono">{college.code}</strong>
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    <ShieldCheck className="h-3 w-3" />
                    Status: {college.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-indigo-600" />
                  Placement Office Contact
                </h4>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-slate-400">Officer Name:</span>
                  <strong className="text-slate-800">{college.officerName}</strong>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{college.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{college.officerPhone}</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                  Campus Location & Web
                </h4>
                <p className="text-slate-600">
                  {college.city}, {college.state}, {college.country}
                </p>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                  <Globe className="h-3.5 w-3.5" />
                  <a href={college.website} target="_blank" rel="noreferrer" className="hover:underline">
                    {college.website}
                  </a>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Official Domain Match: <span className="font-mono text-emerald-700">{college.emailDomain}</span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">About the Placement Cell</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{college.about}</p>
            </div>
          </div>
        </div>
      )}

      {/* Apply Drive Modal */}
      <AnimatePresence>
        {applyModalDrive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-extrabold text-slate-900">
                    Apply for {applyModalDrive.companyName}
                  </h3>
                </div>
                <button
                  onClick={() => setApplyModalDrive(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Role:</span>
                    <strong className="text-slate-900">{applyModalDrive.role}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Package CTC:</span>
                    <strong className="text-emerald-700">{applyModalDrive.packageCTC}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Drive Date:</span>
                    <strong className="text-blue-700">{applyModalDrive.driveDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registration Deadline:</span>
                    <strong className="text-rose-600">{applyModalDrive.deadline}</strong>
                  </div>
                </div>

                <div className="space-y-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <p className="font-bold text-indigo-950">Student Verification Details:</p>
                  <p className="text-slate-700">Name: <strong className="text-slate-900">{userName}</strong></p>
                  <p className="text-slate-700">University: <strong className="text-slate-900">{college.name}</strong></p>
                  <p className="text-slate-700">Official Webmail: <strong className="text-slate-900">{userEmail}</strong></p>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  By clicking &quot;Confirm Application&quot;, your profile and placement test scores will be submitted to the {college.name} Placement Cell for candidate shortlisting.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyModalDrive(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyDrive(applyModalDrive)}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Confirm Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
