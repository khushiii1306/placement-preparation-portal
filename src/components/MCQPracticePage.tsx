import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Flag,
  Share2,
  Maximize2,
  Flame,
  Lightbulb,
  Trophy,
} from 'lucide-react';
import { MCQQuestion, MCQOption } from '../types';
import { sampleMCQQuestions } from '../data/mcqQuestionsData';
import { MockTestResultData } from '../data/mockTestsData';

interface MCQPracticePageProps {
  initialQuestionNumber?: number;
  categoryTitle?: string;
  onBack?: () => void;
  onFinishPractice?: (resultData: MockTestResultData) => void;
}

export const MCQPracticePage: React.FC<MCQPracticePageProps> = ({
  initialQuestionNumber = 12, // Default to Q12 as specified by user
  categoryTitle,
  onBack,
  onFinishPractice,
}) => {
  const questions = sampleMCQQuestions;
  
  // Find index of initial question or default to 11 (Q12)
  const initialIndex = Math.max(
    0,
    questions.findIndex((q) => q.questionNumber === initialQuestionNumber)
  );

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 11);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  // User responses: { [questionId: number]: 'A' | 'B' | 'C' | 'D' }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});

  // Submitted questions tracking: { [questionId: number]: boolean }
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});

  // Flagged questions
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  // Countdown timer in seconds (starts at 25 minutes = 1500 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(1500);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Auto-tick timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion: MCQQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;

  const currentSelectedOption = selectedAnswers[currentQuestion.id];
  const isCurrentSubmitted = Boolean(submittedQuestions[currentQuestion.id]);

  // Handler for option selection
  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isCurrentSubmitted) return; // Prevent changing after submit unless reset
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  // Handler for Submitting current question
  const handleSubmitQuestion = () => {
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setSlideDirection('forward');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSlideDirection('backward');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setSlideDirection(index > currentIndex ? 'forward' : 'backward');
    setCurrentIndex(index);
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleClearSelection = () => {
    if (isCurrentSubmitted) return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleResetQuestion = () => {
    setSubmittedQuestions((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Stats calculation for Question Palette
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Palette item state determination
  const getPaletteState = (q: MCQQuestion, index: number) => {
    const isCurrent = index === currentIndex;
    const isAnswered = selectedAnswers[q.id] !== undefined;

    return {
      isCurrent,
      isAnswered,
      isUnanswered: !isAnswered,
    };
  };

  const handleFinishPractice = () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredCount = 0;
    const userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {};

    const detailedAnswers = questions.map((q) => {
      const selected = selectedAnswers[q.id];
      if (selected) {
        userAnswers[q.id] = selected;
        if (selected === q.correctAnswer) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      } else {
        unansweredCount++;
      }
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedOption: selected,
        correctOption: q.correctAnswer,
        isCorrect: selected === q.correctAnswer,
        explanation: q.explanation,
        category: q.category,
      };
    });

    const attempted = correctAnswers + incorrectAnswers;
    const accuracy = attempted > 0 ? Math.round((correctAnswers / attempted) * 100) : 0;
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    const timeTakenMinutes = Math.max(1, Math.round((1500 - timeLeft) / 60));

    const result: MockTestResultData = {
      testId: 'mcq-practice-' + Date.now(),
      testTitle: categoryTitle || 'Quantitative Aptitude Practice Drill',
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      unansweredCount,
      accuracy,
      scorePercentage,
      timeTakenMinutes,
      totalDurationMinutes: 25,
      categoryPerformance: [
        {
          name: (categoryTitle?.includes('Reasoning')
            ? 'Logical Reasoning'
            : categoryTitle?.includes('Verbal')
            ? 'Verbal Ability'
            : 'Quantitative Aptitude') as any,
          percentage: scorePercentage,
          correct: correctAnswers,
          total: questions.length,
        },
      ],
      strengths: scorePercentage >= 60 ? ['Speed Calculations', 'Formulas & Precision'] : ['Formula Recognition'],
      areasToImprove: scorePercentage < 80 ? ['Time Allocation per Question', 'Complex Ratio Problems'] : ['Advanced Optimization'],
      userAnswers,
      markedForReview: flaggedQuestions,
    };

    onFinishPractice?.(result);
  };

  return (
    <div id="mcq-practice-page" className="min-h-screen pb-12 text-slate-800">
      {/* ========================================================
          1. TOP BAR: Category, Question #, Progress, Timer
      ======================================================== */}
      <header
        id="mcq-top-bar"
        className="sticky top-0 z-30 mb-6 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-2xs"
      >
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left: Return back & Category Name */}
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  id="mcq-back-btn"
                  type="button"
                  onClick={onBack}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Back to Categories"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                    <BookOpen className="h-3 w-3" />
                    {categoryTitle || currentQuestion.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {currentQuestion.topic}
                  </span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Topic-Wise MCQ Practice Drill</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.2 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-500/20">
                    Live Session
                  </span>
                </h1>
              </div>
            </div>

            {/* Center/Right: Question Number & Progress Indicator */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Question Number Badge */}
              <div
                id="mcq-question-number-badge"
                className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                <span>Question</span>
                <span className="text-indigo-600 font-extrabold text-sm">
                  {currentQuestion.questionNumber}
                </span>
                <span className="text-slate-400">/ {totalQuestions}</span>
              </div>

              {/* Progress Indicator Bar */}
              <div
                id="mcq-progress-indicator"
                className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[170px]"
              >
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-slate-700">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Timer Pill */}
              <div
                id="mcq-timer-display"
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-2xs border transition-colors ${
                  timeLeft < 300
                    ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="tabular-nums tracking-wide text-sm font-black">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[10px] text-amber-700/70 uppercase tracking-wider font-semibold">
                  Left
                </span>
              </div>

              {/* Finish & View Results Button */}
              {onFinishPractice && (
                <button
                  id="mcq-finish-practice-header-btn"
                  type="button"
                  onClick={handleFinishPractice}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Finish & View Result</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          MAIN CONTENT: Left Main Question Card + Right Palette
      ======================================================== */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* ----------------------------------------------------
              LEFT COLUMN (8 cols): Main Question Card & Bottom Controls
          ---------------------------------------------------- */}
          <section className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{
                  opacity: 0,
                  x: slideDirection === 'forward' ? 24 : -24,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: slideDirection === 'forward' ? -24 : 24,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                id={`mcq-card-${currentQuestion.id}`}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm"
              >
                {/* Top of Card: Difficulty & Flag toggle */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Standard Objective Test
                    </span>
                    <span className="text-slate-300">•</span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        currentQuestion.difficulty === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700'
                          : currentQuestion.difficulty === 'Intermediate'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleFlag}
                      className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        flaggedQuestions[currentQuestion.id]
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Flag className="h-3.5 w-3.5" />
                      <span>
                        {flaggedQuestions[currentQuestion.id] ? 'Flagged' : 'Flag for Review'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-lg font-black text-indigo-600 pt-0.5">
                      Q{currentQuestion.questionNumber}.
                    </span>
                    <h2
                      id="mcq-question-text"
                      className="text-lg sm:text-xl font-bold leading-relaxed text-slate-900"
                    >
                      {currentQuestion.question.replace(/^Q\d+\.\s*/, '')}
                    </h2>
                  </div>
                </div>

                {/* Options List (Single Option Selectable) */}
                <div id="mcq-options-container" className="mt-8 space-y-3">
                  {currentQuestion.options.map((option: MCQOption) => {
                    const isSelected = currentSelectedOption === option.id;
                    const isCorrect = option.id === currentQuestion.correctAnswer;

                    // Option visual styling based on submission state
                    let optionClasses =
                      'group relative flex items-center justify-between rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer text-left';

                    if (!isCurrentSubmitted) {
                      if (isSelected) {
                        optionClasses +=
                          ' border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600 text-indigo-950 font-medium';
                      } else {
                        optionClasses +=
                          ' border-slate-200/90 bg-white hover:border-indigo-300 hover:bg-slate-50/60 text-slate-700';
                      }
                    } else {
                      // Submitted Review State
                      if (isCorrect) {
                        optionClasses +=
                          ' border-emerald-500 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionClasses +=
                          ' border-rose-500 bg-rose-50/80 ring-1 ring-rose-500 text-rose-950 line-through';
                      } else {
                        optionClasses += ' border-slate-200 bg-slate-50/50 opacity-60 text-slate-500';
                      }
                    }

                    return (
                      <div
                        key={option.id}
                        id={`option-${option.id.toLowerCase()}`}
                        onClick={() => handleSelectOption(option.id)}
                        className={optionClasses}
                      >
                        <div className="flex items-center gap-4">
                          {/* Option Badge Pill (A, B, C, D) */}
                          <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                              !isCurrentSubmitted
                                ? isSelected
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                                : isCorrect
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : isSelected
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {option.id}
                          </div>

                          {/* Option Text */}
                          <span className="text-sm sm:text-base">{option.text}</span>
                        </div>

                        {/* Status Icon or Radio Pill */}
                        <div className="flex items-center pl-3">
                          {!isCurrentSubmitted ? (
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600'
                                  : 'border-slate-300 bg-white group-hover:border-indigo-400'
                              }`}
                            >
                              {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                            </div>
                          ) : (
                            <div>
                              {isCorrect && (
                                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                                  <Check className="h-3.5 w-3.5" />
                                  Correct Answer
                                </span>
                              )}
                              {isSelected && !isCorrect && (
                                <span className="flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                                  <XCircle className="h-3.5 w-3.5" />
                                  Your Choice
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clear Response Button (active if selected but not submitted) */}
                {currentSelectedOption && !isCurrentSubmitted && (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                    >
                      Clear selection
                    </button>
                  </div>
                )}

                {/* ========================================================
                    SUBMITTED FEEDBACK: Correct Answer, User's Answer, Explanation
                ======================================================== */}
                <AnimatePresence>
                  {isCurrentSubmitted && (
                    <motion.div
                      id="mcq-submitted-explanation-box"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-2xs space-y-5"
                    >
                      {/* Status Summary Banner */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                        <div className="flex items-center gap-3">
                          {currentSelectedOption === currentQuestion.correctAnswer ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                              <XCircle className="h-6 w-6" />
                            </div>
                          )}

                          <div>
                            <div className="text-sm font-extrabold text-slate-900">
                              {currentSelectedOption === currentQuestion.correctAnswer
                                ? 'Correct Answer! Well Done.'
                                : 'Incorrect Attempt'}
                            </div>
                            <div className="text-xs text-slate-500">
                              {currentSelectedOption
                                ? `You selected Option ${currentSelectedOption}`
                                : 'No option was selected'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleResetQuestion}
                            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Try Again</span>
                          </button>
                        </div>
                      </div>

                      {/* Detail Answer Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Your Selection
                          </span>
                          <span
                            className={`text-sm font-black ${
                              currentSelectedOption === currentQuestion.correctAnswer
                                ? 'text-emerald-700'
                                : currentSelectedOption
                                ? 'text-rose-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {currentSelectedOption
                              ? `Option ${currentSelectedOption}: ${
                                  currentQuestion.options.find((o) => o.id === currentSelectedOption)?.text
                                }`
                              : 'Not Answered'}
                          </span>
                        </div>

                        <div className="rounded-xl bg-emerald-50/90 p-3.5 border border-emerald-200 shadow-2xs">
                          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                            Correct Answer
                          </span>
                          <span className="text-sm font-black text-emerald-900">
                            Option {currentQuestion.correctAnswer}:{' '}
                            {
                              currentQuestion.options.find(
                                (o) => o.id === currentQuestion.correctAnswer
                              )?.text
                            }
                          </span>
                        </div>
                      </div>

                      {/* Short Explanation Box */}
                      <div className="rounded-xl bg-white p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          <span>Detailed Step-by-Step Explanation</span>
                        </div>

                        <p className="text-xs sm:text-sm font-normal text-slate-700 whitespace-pre-line leading-relaxed font-mono sm:font-sans">
                          {currentQuestion.explanation}
                        </p>

                        {currentQuestion.formulaHint && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-bold text-indigo-600">Core Formula:</span>
                            <code className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-800 font-mono">
                              {currentQuestion.formulaHint}
                            </code>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ========================================================
                    BOTTOM CONTROLS: Previous, Next, Submit
                ======================================================== */}
                <div
                  id="mcq-bottom-controls"
                  className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6"
                >
                  {/* Left: Previous Button */}
                  <button
                    id="mcq-prev-btn"
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      currentIndex === 0
                        ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  {/* Middle / Right: Submit & Next */}
                  <div className="flex items-center gap-3">
                    {/* Submit Button */}
                    <button
                      id="mcq-submit-btn"
                      type="button"
                      onClick={handleSubmitQuestion}
                      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
                        isCurrentSubmitted
                          ? 'border border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span>{isCurrentSubmitted ? 'Submitted (Reviewing)' : 'Submit'}</span>
                    </button>

                    {/* Next Button */}
                    <button
                      id="mcq-next-btn"
                      type="button"
                      onClick={handleNext}
                      disabled={currentIndex === totalQuestions - 1}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        currentIndex === totalQuestions - 1
                          ? 'border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          {/* ----------------------------------------------------
              RIGHT SIDEBAR (4 cols): Question Palette
          ---------------------------------------------------- */}
          <aside className="lg:col-span-4 space-y-5">
            <div
              id="mcq-question-palette"
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sticky top-24"
            >
              {/* Palette Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Question Palette</h3>
                  <span className="text-xs text-slate-400">Click any number to jump</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-lg px-2.5 py-1">
                  <Flame className="h-3.5 w-3.5 text-indigo-600" />
                  <span>{answeredCount} Done</span>
                </div>
              </div>

              {/* Numbered Buttons Grid (1 - 20) */}
              <div
                id="palette-buttons-grid"
                className="grid grid-cols-5 gap-2.5 sm:gap-3"
              >
                {questions.map((q, idx) => {
                  const state = getPaletteState(q, idx);
                  const isFlagged = flaggedQuestions[q.id];

                  // Dynamic state classes based on prompt requirements:
                  // - Unanswered
                  // - Answered
                  // - Current
                  let buttonClasses =
                    'relative flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer select-none';

                  if (state.isCurrent) {
                    // Current State: ring indicator / prominent highlight
                    buttonClasses +=
                      ' ring-2 ring-indigo-600 ring-offset-2 bg-indigo-600 text-white font-black shadow-sm';
                  } else if (state.isAnswered) {
                    // Answered State: filled emerald/green state
                    buttonClasses +=
                      ' bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700 shadow-2xs';
                  } else {
                    // Unanswered State: clean slate/gray state
                    buttonClasses +=
                      ' bg-slate-100 text-slate-600 border border-slate-200/90 hover:bg-slate-200/80 hover:text-slate-900';
                  }

                  return (
                    <motion.button
                      key={q.id}
                      id={`palette-btn-${q.questionNumber}`}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={buttonClasses}
                      title={`Question ${q.questionNumber}: ${
                        state.isAnswered ? 'Answered' : 'Unanswered'
                      }${state.isCurrent ? ' (Current)' : ''}`}
                    >
                      <span>{q.questionNumber}</span>

                      {/* Small flag indicator if flagged */}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Status Legend as requested */}
              <div
                id="palette-legend"
                className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-xs font-medium text-slate-600"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Palette Legend
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-md bg-indigo-600 ring-2 ring-indigo-600 ring-offset-1" />
                    <span>Current Question</span>
                  </div>
                  <span className="font-bold text-slate-900">Q{currentQuestion.questionNumber}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-md bg-emerald-600" />
                    <span>Answered</span>
                  </div>
                  <span className="font-bold text-emerald-700">{answeredCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-md bg-slate-100 border border-slate-200" />
                    <span>Unanswered</span>
                  </div>
                  <span className="font-bold text-slate-500">{unansweredCount}</span>
                </div>
              </div>

              {/* Quick Session Summary Box */}
              <div className="mt-6 rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 text-xs text-indigo-900 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                  <Award className="h-4 w-4 text-indigo-600" />
                  <span>Exam Tip</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Click <strong>Submit</strong> after selecting an answer to verify your solution and view the full step-by-step breakdown.
                </p>
              </div>

              {/* Submit & View Results in Palette */}
              {onFinishPractice && (
                <div className="mt-4 pt-2">
                  <button
                    id="mcq-palette-finish-btn"
                    type="button"
                    onClick={handleFinishPractice}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 py-3 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>Submit & View Results</span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
