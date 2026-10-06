import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  Eye,
  FileCheck,
  TrendingUp,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  X,
  Clock,
  ArrowUpRight,
  Shield,
  Layers,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { AdminStudentRecord } from '../data/adminData';

interface AdminStudentRecordsPageProps {
  students: AdminStudentRecord[];
}

export const AdminStudentRecordsPage: React.FC<AdminStudentRecordsPageProps> = ({
  students,
}) => {
  // Search & Filter State as requested:
  // Search: by name or email
  // Filters: Branch, Academic Year, Performance
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPerformance, setSelectedPerformance] = useState('All');

  // Modals
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<AdminStudentRecord | null>(null);
  const [selectedStudentForResults, setSelectedStudentForResults] = useState<AdminStudentRecord | null>(null);

  // Filter Branches
  const branches = [
    'All',
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Electrical Engineering',
  ];

  const academicYears = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];

  const performanceLevels = [
    'All',
    'Top Tier (>85%)',
    'Good Standing (70-85%)',
    'Needs Improvement (<70%)',
  ];

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((stu) => {
      // Search by name or email
      const matchesSearch =
        stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

      // Branch filter
      const matchesBranch = selectedBranch === 'All' || stu.branch === selectedBranch;

      // Academic Year filter
      const matchesYear = selectedYear === 'All' || stu.year === selectedYear;

      // Performance filter
      let matchesPerf = true;
      if (selectedPerformance === 'Top Tier (>85%)') {
        matchesPerf = stu.overallScore >= 85;
      } else if (selectedPerformance === 'Good Standing (70-85%)') {
        matchesPerf = stu.overallScore >= 70 && stu.overallScore < 85;
      } else if (selectedPerformance === 'Needs Improvement (<70%)') {
        matchesPerf = stu.overallScore < 70;
      }

      return matchesSearch && matchesBranch && matchesYear && matchesPerf;
    });
  }, [students, searchQuery, selectedBranch, selectedYear, selectedPerformance]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Student Records
            </h1>
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-0.5 text-xs font-bold border border-indigo-100">
              {students.length} Enrolled Candidates
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track student placement diagnostic results, practice hours, mock percentiles, and company readiness.
          </p>
        </div>
      </div>

      {/* Search & Filters Bar as requested */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search by name or email */}
          <div className="sm:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Branch */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    Branch: {b}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter Academic Year */}
          <div className="sm:col-span-2">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
              >
                {academicYears.map((y) => (
                  <option key={y} value={y}>
                    Year: {y}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter Performance */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={selectedPerformance}
                onChange={(e) => setSelectedPerformance(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
              >
                {performanceLevels.map((p) => (
                  <option key={p} value={p}>
                    Performance: {p}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reset button if filtered */}
        {(selectedBranch !== 'All' ||
          selectedYear !== 'All' ||
          selectedPerformance !== 'All' ||
          searchQuery) && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Found <strong className="text-slate-800">{filteredStudents.length}</strong> candidates
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedBranch('All');
                setSelectedYear('All');
                setSelectedPerformance('All');
              }}
              className="font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Student Records Table as requested:
          Student Name, Email, College, Branch, Year, Overall Score, Progress, Actions */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Student Name</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">College</th>
                <th className="px-4 py-3.5">Branch</th>
                <th className="px-4 py-3.5">Year</th>
                <th className="px-4 py-3.5">Overall Score</th>
                <th className="px-4 py-3.5">Progress</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="font-bold text-slate-600">No student records match your query</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Check your spelling or reset the branch and year filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Student Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-extrabold text-xs shrink-0">
                          {stu.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{stu.name}</p>
                          <span className="text-[10px] font-mono text-slate-400">
                            {stu.rollNumber} • CGPA: {stu.cgpa}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3.5 text-slate-600 max-w-[150px]">
                      <span className="truncate block" title={stu.email}>
                        {stu.email}
                      </span>
                    </td>

                    {/* College */}
                    <td className="px-4 py-3.5 text-slate-600 max-w-[160px]">
                      <span className="truncate block text-[11px]" title={stu.college}>
                        {stu.college}
                      </span>
                    </td>

                    {/* Branch */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-700">
                      <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
                        {stu.branch}
                      </span>
                    </td>

                    {/* Year */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-medium">
                      {stu.year}
                    </td>

                    {/* Overall Score */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-black ${
                            stu.overallScore >= 85
                              ? 'text-emerald-600'
                              : stu.overallScore >= 70
                              ? 'text-indigo-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {stu.overallScore}%
                        </span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                            stu.overallScore >= 85
                              ? 'bg-emerald-50 text-emerald-700'
                              : stu.overallScore >= 70
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {stu.overallScore >= 85
                            ? 'Top'
                            : stu.overallScore >= 70
                            ? 'Good'
                            : 'Review'}
                        </span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-4 py-3.5 whitespace-nowrap w-36">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-600">
                          <span>{stu.progress}%</span>
                          <span>{stu.testsCompleted} tests</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${stu.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions: View Details, View Results */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedStudentForDetails(stu)}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedStudentForResults(stu)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <FileCheck className="h-3 w-3 text-purple-600" />
                          <span>View Results</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredStudents.length}</strong> of{' '}
            <strong className="text-slate-800">{students.length}</strong> students
          </span>
          <span className="text-[11px] text-slate-400">Placement Assessment Analytics Engine</span>
        </div>
      </div>

      {/* Student Details Modal as requested:
          - Personal information
          - Practice progress
          - Mock test scores
          - Category performance
          - Company readiness */}
      <AnimatePresence>
        {selectedStudentForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white font-extrabold text-base shadow-sm">
                    {selectedStudentForDetails.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">
                        {selectedStudentForDetails.name}
                      </h3>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-[10px] font-bold border border-emerald-200">
                        Eligible for Drives
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {selectedStudentForDetails.rollNumber} • {selectedStudentForDetails.branch} ({selectedStudentForDetails.year})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStudentForDetails(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* 1. Personal Information */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-indigo-600" />
                    <span>Personal & Academic Information</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Full Name</span>
                      <span className="font-bold text-slate-900">{selectedStudentForDetails.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Email Address</span>
                      <span className="font-medium text-slate-800 break-all">{selectedStudentForDetails.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">College</span>
                      <span className="font-medium text-slate-800">{selectedStudentForDetails.college}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Current CGPA</span>
                      <span className="font-extrabold text-indigo-600 text-sm">
                        {selectedStudentForDetails.cgpa} / 10.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Practice Progress */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span>Practice Progress & Activity</span>
                    </h4>
                    <span className="text-xs font-extrabold text-emerald-600">
                      {selectedStudentForDetails.progress}% Syllabus Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Questions Solved</span>
                      <span className="text-lg font-black text-slate-900">
                        {selectedStudentForDetails.questionsSolved}
                      </span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Mock Tests Taken</span>
                      <span className="text-lg font-black text-slate-900">
                        {selectedStudentForDetails.testsCompleted}
                      </span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Coding Streak</span>
                      <span className="text-lg font-black text-amber-600">
                        {selectedStudentForDetails.codingStreakDays} Days 🔥
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Category Performance */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-3 shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-purple-600" />
                    <span>Category Performance Benchmark</span>
                  </h4>

                  <div className="space-y-3">
                    {[
                      {
                        title: 'Quantitative Aptitude',
                        score: selectedStudentForDetails.categoryPerformance.quantitative,
                        color: 'bg-blue-600',
                      },
                      {
                        title: 'Logical Reasoning',
                        score: selectedStudentForDetails.categoryPerformance.logical,
                        color: 'bg-emerald-600',
                      },
                      {
                        title: 'Verbal Ability',
                        score: selectedStudentForDetails.categoryPerformance.verbal,
                        color: 'bg-amber-600',
                      },
                      {
                        title: 'Technical & Coding',
                        score: selectedStudentForDetails.categoryPerformance.coding,
                        color: 'bg-purple-600',
                      },
                    ].map((cat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{cat.title}</span>
                          <span className="font-extrabold text-slate-900">{cat.score}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${cat.color} rounded-full`}
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Company Readiness */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 space-y-3 shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-indigo-600" />
                    <span>Target Company Readiness Index</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {[
                      { name: 'TCS', score: selectedStudentForDetails.companyReadiness.tcs },
                      { name: 'Infosys', score: selectedStudentForDetails.companyReadiness.infosys },
                      { name: 'Amazon', score: selectedStudentForDetails.companyReadiness.amazon },
                      { name: 'Accenture', score: selectedStudentForDetails.companyReadiness.accenture },
                      { name: 'Cognizant', score: selectedStudentForDetails.companyReadiness.cognizant },
                    ].map((comp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center"
                      >
                        <span className="text-[10px] font-bold text-slate-600 block">{comp.name}</span>
                        <span
                          className={`text-base font-black ${
                            comp.score >= 85
                              ? 'text-emerald-600'
                              : comp.score >= 70
                              ? 'text-indigo-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {comp.score}%
                        </span>
                        <span className="text-[9px] font-medium text-slate-400 block mt-0.5">
                          {comp.score >= 85 ? 'Drive Ready' : 'In Prep'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end px-6 py-3.5 bg-slate-50 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForDetails(null)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Results Modal as requested */}
      <AnimatePresence>
        {selectedStudentForResults && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Mock Test Results: {selectedStudentForResults.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Detailed diagnostic score breakdown, accuracy, and historical percentile ranking.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudentForResults(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between rounded-xl bg-indigo-50 border border-indigo-100 p-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                      Overall Assessment Score
                    </span>
                    <p className="text-2xl font-black text-indigo-900">
                      {selectedStudentForResults.overallScore}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-800">
                      {selectedStudentForResults.testsCompleted} Tests Completed
                    </span>
                    <p className="text-[10px] text-indigo-600 mt-0.5">Top 10% in College</p>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pt-2">
                  Completed Mock Tests & Diagnostics
                </h4>

                <div className="space-y-3">
                  {selectedStudentForResults.recentResults.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:border-indigo-200 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{res.testName}</span>
                          <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[9px] font-bold">
                            {res.percentile}th %ile
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {res.date}
                          </span>
                          <span>•</span>
                          <span>Accuracy: {res.accuracy}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-lg font-black text-slate-900">
                            {res.score} / {res.totalMarks}
                          </span>
                          <p className="text-[10px] text-slate-400">Score Achieved</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end px-6 py-3.5 bg-slate-50 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForResults(null)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                >
                  Close Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
