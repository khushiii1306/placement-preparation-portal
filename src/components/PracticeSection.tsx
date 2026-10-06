import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Brain,
  BookOpen,
  PieChart,
  Code2,
  ChevronRight,
  PlayCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  BarChart3,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { PracticeCategory, PracticeDifficulty } from '../types';

interface PracticeSectionProps {
  onStartPractice: (categoryTitle: string, topicName?: string) => void;
  onOpenMCQPractice?: (questionNumber?: number, topic?: string) => void;
  onOpenCodingPractice?: () => void;
  onBackToDashboard?: () => void;
    studentPerformance?: {
  overallProgress: number;
  aptitudeProgress: number;
  codingProgress: number;
  categoryQuestionsSolved?: {
    reasoning?: number;
    verbal?: number;
    aptitude?: number;
    coding?: number;
  };
};
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  onStartPractice,
  onOpenMCQPractice,
  onOpenCodingPractice,
  onBackToDashboard,
  studentPerformance,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<PracticeDifficulty>('All');
  const [selectedTopic, setSelectedTopic] = useState<{ categoryId: string; topic: string } | null>(null);

  // The 5 large category cards specified by the user
  const practiceCategories: PracticeCategory[] = [
    {
      id: 'cat-quant',
      title: 'Quantitative Aptitude',
      subtitle: 'Formulas, speed math, equations and numerical problem solving',
      iconName: 'Calculator',
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      questionsCount: 480,
      difficulty: 'Intermediate',
      progressPercentage: studentPerformance?.aptitudeProgress ?? 0,
      topics: ['Arithmetic', 'Percentages', 'Profit & Loss', 'Time & Work'],
      detailedTopics: [
        { name: 'Arithmetic', questionsCount: 140, completedCount: 0 },
        { name: 'Percentages', questionsCount: 110, completedCount: 0 },
        { name: 'Profit & Loss', questionsCount: 115, completedCount: 0 },
        { name: 'Time & Work', questionsCount: 115, completedCount: 0 },
      ],
      estimatedTime: '25 mins / session',
      lastPracticed: 'Yesterday',
    },
    {
      id: 'cat-reasoning',
      title: 'Logical Reasoning',
      subtitle: 'Deductive logic, patterns, spatial puzzles and sequences',
      iconName: 'Brain',
      color: 'text-sky-600',
      bgLight: 'bg-sky-50 border-sky-200 text-sky-700',
      questionsCount: 390,
      difficulty: 'Beginner',
      progressPercentage: 0,
      topics: ['Puzzles', 'Coding-Decoding', 'Blood Relations', 'Series'],
      detailedTopics: [
        { name: 'Puzzles', questionsCount: 120, completedCount: 0 },
        { name: 'Coding-Decoding', questionsCount: 90, completedCount: 0 },
        { name: 'Blood Relations', questionsCount: 85, completedCount: 0 },
        { name: 'Series', questionsCount: 95, completedCount: 0},
      ],
      estimatedTime: '20 mins / session',
      lastPracticed: '2 days ago',
    },
    {
      id: 'cat-verbal',
      title: 'Verbal Ability',
      subtitle: 'Lexical precision, sentence correction and reading passages',
      iconName: 'BookOpen',
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      questionsCount: 320,
      difficulty: 'Beginner',
      progressPercentage: 0,
      topics: ['Grammar', 'Vocabulary', 'Reading Comprehension'],
      detailedTopics: [
        { name: 'Grammar', questionsCount: 120, completedCount: 0 },
        { name: 'Vocabulary', questionsCount: 110, completedCount: 0 },
        { name: 'Reading Comprehension', questionsCount: 90, completedCount: 0 },
      ],
      estimatedTime: '15 mins / session',
      lastPracticed: '3 days ago',
    },
    {
      id: 'cat-di',
      title: 'Data Interpretation',
      subtitle: 'Synthesizing charts, matrix tables, caselets and data trends',
      iconName: 'PieChart',
      color: 'text-amber-600',
      bgLight: 'bg-amber-50 border-amber-200 text-amber-700',
      questionsCount: 260,
      difficulty: 'Intermediate',
      progressPercentage: 0,
      topics: ['Tables', 'Charts', 'Graphs'],
      detailedTopics: [
        { name: 'Tables', questionsCount: 90, completedCount: 0 },
        { name: 'Charts', questionsCount: 85, completedCount: 0 },
        { name: 'Graphs', questionsCount: 85, completedCount: 0 },
      ],
      estimatedTime: '30 mins / session',
      lastPracticed: '4 days ago',
    },
    {
      id: 'cat-coding',
      title: 'Coding Practice',
      subtitle: 'Core computer science algorithms, data structures and syntax drills',
      iconName: 'Code2',
      color: 'text-purple-600',
      bgLight: 'bg-purple-50 border-purple-200 text-purple-700',
      questionsCount: 520,
      difficulty: 'Advanced',
      progressPercentage: studentPerformance?.codingProgress ?? 0,
      topics: ['Arrays', 'Strings', 'Searching', 'Sorting', 'Basic Programming'],
      detailedTopics: [
        { name: 'Arrays', questionsCount: 130, completedCount: 0 },
        { name: 'Strings', questionsCount: 110, completedCount: 0 },
        { name: 'Searching', questionsCount: 90, completedCount: 0 },
        { name: 'Sorting', questionsCount: 100, completedCount: 0 },
        { name: 'Basic Programming', questionsCount: 90, completedCount: 0 },
      ],
      estimatedTime: '45 mins / session',
      lastPracticed: 'Today',
    },
  ];

  // Filter categories by difficulty if not 'All'
  const filteredCategories = practiceCategories.filter((cat) => {
    if (selectedDifficulty === 'All') return true;
    return cat.difficulty === selectedDifficulty;
  });

  // Render icon helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="h-6 w-6" />;
      case 'Brain':
        return <Brain className="h-6 w-6" />;
      case 'BookOpen':
        return <BookOpen className="h-6 w-6" />;
      case 'PieChart':
        return <PieChart className="h-6 w-6" />;
      case 'Code2':
        return <Code2 className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };

  const getDifficultyBadge = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (difficulty) {
      case 'Beginner':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Beginner
          </span>
        );
      case 'Intermediate':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Intermediate
          </span>
        );
      case 'Advanced':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 ring-1 ring-rose-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Advanced
          </span>
        );
    }
  };

  return (
    <div id="practice-section" className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
              Campus Recruitment Prep
            </span>
            <span className="text-xs text-slate-400">• 1,970 Total Curated Questions</span>
          </div>

          <h1
            id="practice-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Practice & Improve
          </h1>

          <p
            id="practice-subtitle"
            className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal"
          >
            Strengthen your skills with topic-wise practice.
          </p>
        </div>

        {/* Action Controls: Back to dashboard & Summary indicator */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {onOpenMCQPractice && (
            <button
              id="open-mcq-drill-btn"
              type="button"
              onClick={() => onOpenMCQPractice(12, 'Profit & Loss')}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Launch MCQ Drill (Q12)</span>
            </button>
          )}

          {onBackToDashboard && (
            <button
              id="practice-back-to-dash-btn"
              type="button"
              onClick={onBackToDashboard}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            >
              ← Back to Dashboard
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-indigo-50/80 border border-indigo-100 px-3.5 py-2 text-xs font-semibold text-indigo-700">
            <Award className="h-4 w-4 text-indigo-600" />
            <span>Mastery Score: {studentPerformance?.overallProgress ?? 0}%</span>
          </div>
        </div>
      </div>

      {/* 2. Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Filter className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter by Level:
          </span>
        </div>

        {/* All | Beginner | Intermediate | Advanced Buttons */}
        <div
          id="practice-difficulty-filters"
          className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl"
        >
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as PracticeDifficulty[]).map((level) => {
            const isActive = selectedDifficulty === level;
            return (
              <button
                key={level}
                id={`filter-${level.toLowerCase()}`}
                type="button"
                onClick={() => setSelectedDifficulty(level)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Result Counter */}
      {selectedDifficulty !== 'All' && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong>{filteredCategories.length}</strong> categories matching{' '}
            <strong className="text-indigo-600">{selectedDifficulty}</strong> difficulty level.
          </span>
          <button
            type="button"
            onClick={() => setSelectedDifficulty('All')}
            className="font-semibold text-indigo-600 hover:underline cursor-pointer"
          >
            Clear filter (Show all 5)
          </button>
        </div>
      )}

      {/* 3. 5 Large Category Cards with Smooth Hover-Lift Animations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCategories.map((cat, idx) => {
          return (
            <motion.div
              key={cat.id}
              id={`practice-card-${cat.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 6px 12px -4px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all relative overflow-hidden"
            >
              {/* Subtle top color gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  cat.id === 'cat-quant'
                    ? 'bg-indigo-600'
                    : cat.id === 'cat-reasoning'
                    ? 'bg-sky-500'
                    : cat.id === 'cat-verbal'
                    ? 'bg-emerald-500'
                    : cat.id === 'cat-di'
                    ? 'bg-amber-500'
                    : 'bg-purple-600'
                }`}
              />

              {/* Upper Portion: Header, Icon, Title, Difficulty & Stats */}
              <div>
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        cat.id === 'cat-quant'
                          ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                          : cat.id === 'cat-reasoning'
                          ? 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'
                          : cat.id === 'cat-verbal'
                          ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                          : cat.id === 'cat-di'
                          ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
                          : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                      } transition-all duration-300 shadow-2xs`}
                    >
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {cat.title}
                      </h2>
                      <span className="text-xs font-semibold text-slate-500">
                        {cat.questionsCount} Questions
                      </span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div>{getDifficultyBadge(cat.difficulty)}</div>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                {/* Progress Percentage & Animated Bar */}
                <div className="mt-5 space-y-2 rounded-2xl bg-slate-50/80 p-4 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Syllabus Mastery</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-slate-900">
                        {cat.progressPercentage}%
                      </span>
                      <span className="text-[10px] text-slate-400">completed</span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="h-2.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.progressPercentage}%` }}
                      transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        cat.id === 'cat-quant'
                          ? 'bg-indigo-600'
                          : cat.id === 'cat-reasoning'
                          ? 'bg-sky-500'
                          : cat.id === 'cat-verbal'
                          ? 'bg-emerald-500'
                          : cat.id === 'cat-di'
                          ? 'bg-amber-500'
                          : 'bg-purple-600'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-[10px] text-slate-400">
                    <span>Target: 80% for Direct Shortlist</span>
                    <span>{cat.estimatedTime}</span>
                  </div>
                </div>

                {/* Topics Breakdown List as requested */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Sub-Topics & Modules:</span>
                    <span className="text-[11px] text-slate-400">{cat.topics.length} core units</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.topics.map((topicName) => (
                      <button
                        key={topicName}
                        type="button"
                        onClick={() => {
                          if (cat.id === 'cat-coding') {
                            onOpenCodingPractice ? onOpenCodingPractice() : onStartPractice(cat.title, topicName);
                          } else if (topicName.includes('Profit') || cat.title.includes('Quantitative')) {
                            onOpenMCQPractice ? onOpenMCQPractice(12, topicName) : onStartPractice(cat.title, topicName);
                          } else {
                            onOpenMCQPractice ? onOpenMCQPractice(1, topicName) : onStartPractice(cat.title, topicName);
                          }
                        }}
                        className="group/topic flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/60 hover:text-indigo-900 transition-all cursor-pointer shadow-2xs"
                        title={`Practice ${topicName}`}
                      >
                        <span>{topicName}</span>
                        <ChevronRight className="h-3 w-3 text-slate-400 group-hover/topic:text-indigo-600 transition-transform group-hover/topic:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Portion: Start Practice Button */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <motion.button
                  id={`start-practice-${cat.id}`}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (cat.id === 'cat-coding') {
                      onOpenCodingPractice ? onOpenCodingPractice() : onStartPractice(cat.title);
                    } else if (onOpenMCQPractice) {
                      onOpenMCQPractice(cat.id === 'cat-quant' ? 12 : 1, cat.title);
                    } else {
                      onStartPractice(cat.title);
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Start Practice</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Quick Tips / Placement Preparation Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-blue-50/70 to-slate-50 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Campus Placement Practice Strategy
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Companies like TCS, Infosys, and Accenture prioritize Quantitative Aptitude and Coding speed in Round 1 screening. We recommend solving at least 15 questions daily from your lowest-scoring section to boost your readiness index.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onStartPractice('Quantitative Aptitude', 'Speed Math Drill')}
          className="whitespace-nowrap rounded-xl bg-white border border-indigo-200 px-4 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-2xs self-start md:self-auto cursor-pointer"
        >
          Take Daily 15-Min Sprint →
        </button>
      </div>
    </div>
  );
};
