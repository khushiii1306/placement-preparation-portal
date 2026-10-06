import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Check,
  X,
  BookOpen,
  Zap,
  FileCheck,
} from 'lucide-react';
import {
  MockTestResultData,
  DEFAULT_MOCK_RESULT,
  TCS_MOCK_QUESTIONS,
} from '../data/mockTestsData';

interface TestResultPageProps {
  resultData?: MockTestResultData | null;
  onRetake: () => void;
  onBackToDashboard: () => void;
  onViewProgress?: () => void;
}

export const TestResultPage: React.FC<TestResultPageProps> = ({
  resultData,
  onRetake,
  onBackToDashboard,
  onViewProgress,
}) => {
  if (!resultData) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Test Results
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Performance scorecard and question-by-question diagnostic review
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-12 text-center shadow-xs flex flex-col items-center justify-center max-w-2xl mx-auto my-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
            <Trophy className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Assessment Results Available</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 mb-6 leading-relaxed">
            You have not completed any mock tests or exams yet. Take a placement mock test or practice drill to see your scorecard and question analysis.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              <span>Explore Mock Tests</span>
            </button>
            <button
              type="button"
              onClick={onBackToDashboard}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [showDetailedAnswers, setShowDetailedAnswers] = useState<boolean>(false);
  const [answersFilter, setAnswersFilter] = useState<'All' | 'Correct' | 'Incorrect'>('All');
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  const targetScore = resultData.scorePercentage || 78;

  // Animate the numerical score up to the targetScore
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(targetScore / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [targetScore]);

  // Circular progress math
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * targetScore) / 100;

  // Detailed answers questions list
  const detailedQuestions = TCS_MOCK_QUESTIONS.slice(0, resultData.totalQuestions || 40);

  const filteredQuestions = detailedQuestions.filter((q) => {
    const userChoice = resultData.userAnswers[q.id];
    const isCorrect = userChoice === q.correctOption;

    if (answersFilter === 'Correct') return isCorrect;
    if (answersFilter === 'Incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Header Card: Heading "Test Completed!" & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Assessment Completed Successfully
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Test Completed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {resultData.testTitle} • Performance Evaluation & Detailed Scorecard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="result-retake-header-btn"
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Test</span>
          </button>
          {onViewProgress && (
            <button
              id="result-view-progress-header-btn"
              type="button"
              onClick={onViewProgress}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>View Progress</span>
            </button>
          )}
          <button
            id="result-dashboard-header-btn"
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Score Hero Card with Animated Circular Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Circular Animated Score Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  strokeLinecap="round"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Counter */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {animatedScore}%
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest">
                  Overall Score
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-sm">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                <Sparkles className="h-3 w-3" />
                Tier-1 Qualified Threshold
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Excellent Performance!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Your score places you comfortably in the{' '}
                <strong className="text-slate-800 font-semibold">top 15th percentile</strong>{' '}
                of test-takers for campus placement screening.
              </p>
            </div>
          </div>

          {/* Right: Primary Call to Action buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <button
              id="view-detailed-answers-btn"
              type="button"
              onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-5 py-3 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span>{showDetailedAnswers ? 'Hide Detailed Answers' : 'View Detailed Answers'}</span>
              {showDetailedAnswers ? (
                <ChevronUp className="h-3.5 w-3.5 ml-1" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              )}
            </button>

            <button
              id="retake-test-primary-btn"
              type="button"
              onClick={onRetake}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-slate-500" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 5 Core Metric Cards as requested:
          Total Questions: 40
          Correct: 31
          Incorrect: 9
          Accuracy: 77.5%
          Time Taken: 42 min
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Questions</span>
            <Layers className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {resultData.totalQuestions || 40}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Screening Questions</p>
        </motion.div>

        {/* Correct */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 shadow-xs"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold text-emerald-800">Correct</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {resultData.correctAnswers !== undefined ? resultData.correctAnswers : 31}
          </div>
          <p className="text-[10px] text-emerald-600/80 mt-1">+1.0 mark per correct</p>
        </motion.div>

        {/* Incorrect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 shadow-xs"
        >
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs font-semibold text-rose-800">Incorrect</span>
            <XCircle className="h-4 w-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700">
            {resultData.incorrectAnswers !== undefined ? resultData.incorrectAnswers : 9}
          </div>
          <p className="text-[10px] text-rose-600/80 mt-1">-0.25 negative marks</p>
        </motion.div>

        {/* Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-4 shadow-xs"
        >
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-semibold text-indigo-800">Accuracy</span>
            <Target className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-700">
            {resultData.accuracy !== undefined ? `${resultData.accuracy}%` : '77.5%'}
          </div>
          <p className="text-[10px] text-indigo-600/80 mt-1">High precision rate</p>
        </motion.div>

        {/* Time Taken */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25 }}
          className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 shadow-xs col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-semibold text-amber-800">Time Taken</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">
            {resultData.timeTakenMinutes || 42} min
          </div>
          <p className="text-[10px] text-amber-600/80 mt-1">
            Out of {resultData.totalDurationMinutes || 60} mins
          </p>
        </motion.div>
      </div>

      {/* Category Performance Section:
          Quantitative Aptitude - 82%
          Logical Reasoning - 75%
          Verbal Ability - 70%
          Coding - 65%
      */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Category Performance</h3>
            <p className="text-xs text-slate-500">
              Granular sectional breakdown across all 4 tested competencies
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            4 Sections
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {resultData.categoryPerformance.map((category) => {
            const getColor = (pct: number) => {
              if (pct >= 80) return 'bg-emerald-600 text-emerald-700';
              if (pct >= 70) return 'bg-indigo-600 text-indigo-700';
              return 'bg-amber-600 text-amber-700';
            };

            return (
              <div
                key={category.name}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">{category.name}</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {category.percentage}%
                  </span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      category.percentage >= 80
                        ? 'bg-emerald-500'
                        : category.percentage >= 75
                        ? 'bg-indigo-500'
                        : category.percentage >= 70
                        ? 'bg-cyan-500'
                        : 'bg-amber-500'
                    }`}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>
                    {category.correct} of {category.total} questions answered correctly
                  </span>
                  <span className="font-medium">
                    {category.percentage >= 75 ? 'Strong Cutoff' : 'Needs Polish'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Areas to Improve Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <div className="rounded-3xl border border-emerald-200/90 bg-emerald-50/30 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Key Strengths</h3>
              <p className="text-xs text-emerald-700 font-medium">
                High accuracy and fast solve times
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {resultData.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="rounded-3xl border border-amber-200/90 bg-amber-50/30 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-amber-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Areas to Improve</h3>
              <p className="text-xs text-amber-700 font-medium">
                Actionable focus areas for upcoming placement rounds
              </p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {resultData.areasToImprove.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible: Detailed Answers Section */}
      {showDetailedAnswers && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Detailed Answers & Solutions</h3>
              <p className="text-xs text-slate-500">
                Review all {resultData.totalQuestions} questions with official answer keys and step-by-step logic.
              </p>
            </div>

            {/* Sub-Filter pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {(['All', 'Correct', 'Incorrect'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setAnswersFilter(filter)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    answersFilter === filter
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {filteredQuestions.map((q, idx) => {
              const userAns = resultData.userAnswers[q.id];
              const isCorrect = userAns === q.correctOption;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-5 space-y-3 transition-colors ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : userAns
                      ? 'border-rose-200 bg-rose-50/20'
                      : 'border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-200 text-slate-800 text-xs font-bold">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {q.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <Check className="h-3 w-3" /> Correct (+1.0)
                        </span>
                      ) : userAns ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <X className="h-3 w-3" /> Incorrect (-0.25)
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Unanswered (0)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isCorrectOption = opt.id === q.correctOption;
                      const isUserChoice = userAns === opt.id;

                      let style = 'bg-white border-slate-200 text-slate-700';

                      if (isCorrectOption) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-300';
                      } else if (isUserChoice && !isCorrect) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs ${style}`}
                        >
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                              isCorrectOption
                                ? 'bg-emerald-600 text-white'
                                : isUserChoice
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="leading-tight">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="rounded-xl bg-slate-100/90 border border-slate-200/80 p-3 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 block">Explanation:</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Bottom Floating Navigation Actions: Retake Test, View Detailed Answers, Back to Dashboard */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          <span>Targeting upcoming campus drives?</span>{' '}
          <strong className="text-slate-800">Continuous mock assessments boost percentile scores by up to 34%.</strong>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            id="bottom-retake-btn"
            type="button"
            onClick={onRetake}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Test</span>
          </button>

          <button
            id="bottom-view-detailed-btn"
            type="button"
            onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-2xs transition-colors cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
            <span>{showDetailedAnswers ? 'Hide Answers' : 'View Detailed Answers'}</span>
          </button>

          {onViewProgress && (
            <button
              id="bottom-view-progress-btn"
              type="button"
              onClick={onViewProgress}
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Go to Progress & Analytics</span>
            </button>
          )}

          <button
            id="bottom-back-dashboard-btn"
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
