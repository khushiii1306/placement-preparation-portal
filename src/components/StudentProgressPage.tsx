import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Award,
  AlertTriangle,
  ArrowUpRight,
  Code2,
  Brain,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  Building2,
  ArrowRight,
  Info,
  Zap,
} from 'lucide-react';
import { StudentPerformanceData } from '../utils/studentStorage';

interface StudentProgressPageProps {
  studentData?: StudentPerformanceData;
  onBackToDashboard: () => void;
  onStartMockTest?: (testName?: string) => void;
  onPracticeCoding?: (topic?: string) => void;
  onPracticeMCQ?: (category?: string, topic?: string) => void;
  onViewCompany?: (companyName: string) => void;
}

interface MockTestHistoryItem {
  id: string;
  name: string;
  date: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  category: string;
  benchmark: number;
}

export const StudentProgressPage: React.FC<StudentProgressPageProps> = ({
  studentData,
  onBackToDashboard,
  onStartMockTest,
  onPracticeCoding,
  onPracticeMCQ,
  onViewCompany,
}) => {
  // Strictly use studentData's isolated test history, or empty list if new/empty
  const previousMockTests: MockTestHistoryItem[] = studentData?.testHistory || [];

  const [selectedTestIndex, setSelectedTestIndex] = useState<number | null>(
    previousMockTests.length > 0 ? previousMockTests.length - 1 : null
  );

  // Category progress reflecting student's isolated progress
  const categoryProgress = [
    {
      id: 'cat-quant',
      title: 'Quantitative Aptitude',
      percentage: studentData ? studentData.aptitudeProgress : 0,
      color: 'bg-indigo-600',
      trackColor: 'bg-indigo-50',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      questionsSolved: studentData?.categoryQuestionsSolved?.quant || 0,
      totalQuestions: 110,
      status: !studentData || studentData.aptitudeProgress === 0 ? 'Not Started' : studentData.aptitudeProgress >= 70 ? 'On Track' : 'Needs Practice',
    },
    {
      id: 'cat-logical',
      title: 'Logical Reasoning',
      percentage: studentData ? studentData.reasoningProgress : 0,
      color: 'bg-sky-600',
      trackColor: 'bg-sky-50',
      badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
      questionsSolved: studentData?.categoryQuestionsSolved?.logical || 0,
      totalQuestions: 90,
      status: !studentData || studentData.reasoningProgress === 0 ? 'Not Started' : studentData.reasoningProgress >= 70 ? 'Good Progress' : 'Needs Practice',
    },
    {
      id: 'cat-verbal',
      title: 'Verbal Ability',
      percentage: studentData ? studentData.verbalProgress : 0,
      color: 'bg-emerald-600',
      trackColor: 'bg-emerald-50',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      questionsSolved: studentData?.categoryQuestionsSolved?.verbal || 0,
      totalQuestions: 75,
      status: !studentData || studentData.verbalProgress === 0 ? 'Not Started' : studentData.verbalProgress >= 70 ? 'High Strength' : 'Needs Practice',
    },
    {
      id: 'cat-di',
      title: 'Data Interpretation',
      percentage: studentData ? studentData.dataInterpretationProgress : 0,
      color: 'bg-amber-600',
      trackColor: 'bg-amber-50',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      questionsSolved: studentData?.categoryQuestionsSolved?.di || 0,
      totalQuestions: 45,
      status: !studentData || studentData.dataInterpretationProgress === 0 ? 'Not Started' : studentData.dataInterpretationProgress >= 70 ? 'On Track' : 'Needs Practice',
    },
    {
      id: 'cat-coding',
      title: 'Coding',
      percentage: studentData ? studentData.codingProgress : 0,
      color: 'bg-rose-600',
      trackColor: 'bg-rose-50',
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
      questionsSolved: studentData?.categoryQuestionsSolved?.coding || 0,
      totalQuestions: 30,
      status: !studentData || studentData.codingProgress === 0 ? 'Not Started' : studentData.codingProgress >= 70 ? 'Cleared' : 'Critical Focus',
    },
  ];

  // Company readiness reflecting student's isolated readiness
  const tcsScore = studentData
    ? studentData.companyReadiness['comp-tcs'] || studentData.companyReadiness['tcs'] || 0
    : 0;
  const infyScore = studentData
    ? studentData.companyReadiness['comp-infosys'] || studentData.companyReadiness['infosys'] || 0
    : 0;
  const acnScore = studentData
    ? studentData.companyReadiness['comp-accenture'] || studentData.companyReadiness['accenture'] || 0
    : 0;

  const companyReadiness = [
    {
      company: 'TCS',
      score: tcsScore,
      tier: 'Digital & Prime',
      role: 'Systems Engineer & Digital SDE',
      cutoff: '60% in B.Tech',
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-600',
      barColor: 'bg-blue-600',
      status: tcsScore >= 70 ? 'Eligible & Strong' : tcsScore > 0 ? 'In Progress' : 'Not Started',
    },
    {
      company: 'Infosys',
      score: infyScore,
      tier: 'Specialist Programmer',
      role: 'Specialist Programmer (SP) / DSE',
      cutoff: '65% aggregate',
      color: 'from-sky-600 to-blue-700',
      textColor: 'text-sky-600',
      barColor: 'bg-sky-600',
      status: infyScore >= 65 ? 'Eligible & Target' : infyScore > 0 ? 'In Progress' : 'Not Started',
    },
    {
      company: 'Accenture',
      score: acnScore,
      tier: 'Advanced Tech Architect',
      role: 'Associate Software Engineer (ASE)',
      cutoff: '6.5 CGPA',
      color: 'from-purple-600 to-indigo-800',
      textColor: 'text-purple-600',
      barColor: 'bg-purple-600',
      status: acnScore >= 65 ? 'Eligible' : acnScore > 0 ? 'In Progress' : 'Not Started',
    },
  ];

  const selectedTest =
    selectedTestIndex !== null && previousMockTests[selectedTestIndex]
      ? previousMockTests[selectedTestIndex]
      : previousMockTests[0] || null;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              My Progress
            </h1>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
              Campus Cohort 2026
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track your preparation and improve consistently.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Top Statistics Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overall Progress
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {studentData ? studentData.overallProgress : 0}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {!studentData || studentData.overallProgress === 0 ? 'Baseline 0%' : '+6.4% this month'}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentData ? studentData.overallProgress : 0}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-purple-600"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Placement readiness threshold: 70%
          </p>
        </motion.div>

        {/* Tests Completed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tests Completed
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {studentData ? studentData.mockTestsCompleted : 0}
            </span>
            <span className="text-xs text-slate-500">
              {!studentData || studentData.mockTestsCompleted === 0 ? '0 Attempts' : 'Full-Length Mocks'}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  studentData
                    ? (studentData.mockTestsCompleted / 8) * 100
                    : 0
                }%`,
              }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {!studentData || studentData.mockTestsCompleted === 0
              ? 'Target: 8 full-length simulations'
              : 'Keep practicing to maintain readiness'}
          </p>
        </motion.div>

        {/* Questions Attempted */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Questions Attempted
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {studentData ? studentData.questionsAttempted : 0}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {!studentData || studentData.questionsAttempted === 0
                ? 'No attempts'
                : 'Questions Solved'}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  studentData
                    ? Math.min(100, (studentData.questionsAttempted / 350) * 100)
                    : 0
                }%`,
              }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-blue-600"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {!studentData || studentData.questionsAttempted === 0
              ? 'Practice MCQs and Coding problems to track accuracy'
              : 'Across Quantitative, Reasoning, Verbal & Coding'}
          </p>
        </motion.div>

        {/* Average Score */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Score
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600">
              {studentData ? studentData.averageScore : 0}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {!studentData || studentData.averageScore === 0 ? 'Unrated' : `${studentData.averageScore}% Accuracy`}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentData ? studentData.averageScore : 0}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-indigo-600"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {!studentData || studentData.averageScore === 0
              ? 'Calculated across all completed tests'
              : 'Higher than 82% of campus batch'}
          </p>
        </motion.div>
      </div>

      {/* Performance Chart: Scores Across Previous Mock Tests */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Mock Test Score Progression
              </h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100">
                {previousMockTests.length > 0 ? `${previousMockTests.length} Tests Logged` : 'Awaiting First Attempt'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {previousMockTests.length > 0
                ? `Performance breakdown and trajectory across all ${previousMockTests.length} completed examinations`
                : 'Take your first full-length proctored simulation to generate your score trend.'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-indigo-600" />
              <span>Your Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-dashed bg-rose-500" />
              <span>Placement Cutoff (70%)</span>
            </div>
          </div>
        </div>

        {/* Interactive Animated SVG & Bar Graph */}
        {previousMockTests.length === 0 || !selectedTest ? (
          <div className="mt-6 flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3 border border-indigo-100">
              <FileCheck className="h-7 w-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Mock Tests Attempted Yet</h4>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-5 leading-relaxed">
              You haven't completed any full-length mock tests yet. Complete your first proctored simulation to generate your score trend, percentile rank, and benchmark cutoff analysis.
            </p>
            <button
              type="button"
              onClick={() => onStartMockTest && onStartMockTest()}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              <span>Take Your First Mock Test</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Visual Chart Canvas */}
          <div className="lg:col-span-2">
            <div className="relative pt-6 pb-2">
              {/* Placement Cutoff Line at 70% */}
              <div
                className="absolute left-8 right-0 border-b-2 border-dashed border-rose-400 z-10 flex items-center justify-end pointer-events-none"
                style={{ top: '30%' }}
              >
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 -mt-5">
                  Cutoff: 70%
                </span>
              </div>

              {/* Bar Columns Container */}
              <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-64 pl-8 pr-2 border-b border-slate-200 relative">
                {/* Y-Axis scale marks */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] font-semibold text-slate-400">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {previousMockTests.map((test, idx) => {
                  const isSelected = selectedTestIndex === idx;
                  const isAboveCutoff = test.score >= test.benchmark;

                  return (
                    <div
                      key={test.id}
                      onClick={() => setSelectedTestIndex(idx)}
                      className="group flex flex-col items-center h-full justify-end cursor-pointer relative"
                    >
                      {/* Score Tooltip on Top */}
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-2 rounded-lg px-2 py-0.5 text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-indigo-900 text-white shadow-md scale-110'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-800'
                        }`}
                      >
                        {test.score}%
                      </motion.div>

                      {/* Animated Bar Column */}
                      <div className="w-full max-w-[48px] h-full flex items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${test.score}%` }}
                          transition={{
                            duration: 0.8,
                            delay: idx * 0.12,
                            ease: 'easeOut',
                          }}
                          className={`w-full rounded-t-xl transition-all ${
                            isSelected
                              ? 'bg-gradient-to-t from-indigo-700 to-indigo-500 shadow-md ring-2 ring-indigo-400'
                              : isAboveCutoff
                              ? 'bg-gradient-to-t from-indigo-600/80 to-indigo-400/90 group-hover:brightness-110'
                              : 'bg-gradient-to-t from-slate-400 to-slate-300 group-hover:bg-indigo-300'
                          }`}
                        />
                      </div>

                      {/* Test Label on Bottom */}
                      <div className="mt-3 text-center">
                        <span
                          className={`block text-xs font-bold transition-colors ${
                            isSelected ? 'text-indigo-600' : 'text-slate-700'
                          }`}
                        >
                          Mock #{idx + 1}
                        </span>
                        <span className="block text-[10px] text-slate-400 truncate max-w-[60px] sm:max-w-none">
                          {test.date.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Test Deep-Dive Card for selected item */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Assessment Details
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  {selectedTest.name}
                </h4>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  selectedTest.score >= 70
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {selectedTest.score >= 70 ? 'Qualified' : 'Below Cutoff'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white p-3 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Exam Score
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  {selectedTest.score}%
                </span>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Accuracy
                </span>
                <span className="text-xl font-bold text-emerald-600">
                  {selectedTest.accuracy}%
                </span>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Questions
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {selectedTest.totalQuestions} Questions
                </span>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Attempt Date
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {selectedTest.date}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartMockTest && onStartMockTest(selectedTest.name)}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Take Next Mock Test</span>
            </button>
          </div>
        </div>
        )}
      </div>

      {/* Category Progress & Weak Areas in 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Progress (Left / 7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Category Progress
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Topic-level mastery across syllabus modules
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              5 Core Categories
            </span>
          </div>

          <div className="space-y-4">
            {categoryProgress.map((cat, idx) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{cat.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${cat.badgeColor}`}
                    >
                      {cat.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">
                      {cat.questionsSolved} / {cat.totalQuestions} Qs
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>

                {/* Animated progress bar */}
                <div className={`h-2.5 w-full rounded-full ${cat.trackColor} overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + idx * 0.1,
                      ease: 'easeOut',
                    }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Students who achieve <strong>70%+</strong> across all 5 categories qualify for
              Day-1 placement interview shortlists across Tier-1 IT & Product recruiters.
            </p>
          </div>
        </div>

        {/* Your Weak Areas & Recommended Practice (Right / 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Your Weak Areas */}
          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <h3 className="font-bold text-base text-slate-900">
                Your Weak Areas
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Modules falling below the 65% campus threshold requiring immediate focus
            </p>

            <div className="mt-4 space-y-3">
              {/* Weak Area 1: Data Interpretation */}
              <div className="rounded-xl bg-white border border-rose-200 p-3.5 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <h4 className="font-bold text-slate-900 text-xs">
                      Data Interpretation
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Current Score: <strong className="text-amber-600">61%</strong> • Low speed in Pie Charts & Tables
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onPracticeMCQ && onPracticeMCQ('Data Interpretation', 'Tables & Graphs')}
                  className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1.5 text-[11px] font-bold text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Practice Now
                </button>
              </div>

              {/* Weak Area 2: Coding */}
              <div className="rounded-xl bg-white border border-rose-200 p-3.5 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <h4 className="font-bold text-slate-900 text-xs">Coding</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Current Score: <strong className="text-rose-600">45%</strong> • Arrays & Dynamic Programming
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onPracticeCoding && onPracticeCoding('Arrays')}
                  className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  Practice Code
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Practice */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-700">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-base text-slate-900">
                Recommended Practice
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Curated targeted sessions to boost your overall progress
            </p>

            <div className="mt-4 space-y-2.5">
              {/* Practice Arrays */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => onPracticeCoding && onPracticeCoding('Arrays')}
                className="rounded-xl border border-slate-200 p-3 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Practice Arrays
                    </h5>
                    <span className="text-[10px] text-slate-500">
                      Two-Pointers, Subarrays & Sliding Window • 8 Problems
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </motion.div>

              {/* Practice Data Interpretation */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => onPracticeMCQ && onPracticeMCQ('Data Interpretation', 'Bar Charts & Pie Graphs')}
                className="rounded-xl border border-slate-200 p-3 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Practice Data Interpretation
                    </h5>
                    <span className="text-[10px] text-slate-500">
                      Percentage growth, tables & ratio analysis • 20 MCQs
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </motion.div>

              {/* Take Aptitude Mock Test */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => onStartMockTest && onStartMockTest('Aptitude Assessment')}
                className="rounded-xl border border-slate-200 p-3 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      Take Aptitude Mock Test
                    </h5>
                    <span className="text-[10px] text-slate-500">
                      Full 30-min timed screening simulation • 30 Questions
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Readiness Section as requested */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-lg">
                Company Readiness
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Readiness index calibrated against actual cutoff requirements of major recruiters
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            3 Scheduled Day-1 Drives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {companyReadiness.map((comp) => (
            <div
              key={comp.company}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-3.5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${comp.color} font-bold text-white text-xs shadow-xs`}
                  >
                    {comp.company}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {comp.company}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {comp.tier}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-slate-900">
                    {comp.score}%
                  </span>
                  <span className="text-[10px] block font-bold text-emerald-600">
                    {comp.status}
                  </span>
                </div>
              </div>

              {/* Animated Readiness Bar */}
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${comp.score}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`h-full rounded-full ${comp.barColor}`}
                />
              </div>

              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                    {comp.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cutoff:</span>
                  <span className="font-semibold text-slate-800">{comp.cutoff}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onViewCompany && onViewCompany(comp.company)}
                className="w-full mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-white border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <span>View {comp.company} Opportunity</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
