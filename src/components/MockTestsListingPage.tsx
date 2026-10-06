import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCheck,
  Clock,
  HelpCircle,
  BarChart3,
  Building2,
  Code2,
  Calculator,
  Brain,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  Trophy,
} from 'lucide-react';
import { MockTestItem, MOCK_TESTS_CATALOG } from '../data/mockTestsData';

interface MockTestsListingPageProps {
  onStartTest: (test: MockTestItem) => void;
  onViewResults?: () => void;
  onBack?: () => void;
}

type FilterCategory = 'All' | 'Aptitude' | 'Coding' | 'Company-wise';

export const MockTestsListingPage: React.FC<MockTestsListingPageProps> = ({
  onStartTest,
  onViewResults,
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs: FilterCategory[] = ['All', 'Aptitude', 'Coding', 'Company-wise'];

  const filteredTests = MOCK_TESTS_CATALOG.filter((test) => {
    const matchesFilter =
      activeFilter === 'All' ? true : test.category === activeFilter;
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: MockTestItem['iconType']) => {
    switch (type) {
      case 'calculator':
        return <Calculator className="h-6 w-6 text-emerald-600" />;
      case 'code':
        return <Code2 className="h-6 w-6 text-cyan-600" />;
      case 'building':
        return <Building2 className="h-6 w-6 text-indigo-600" />;
      case 'brain':
        return <Brain className="h-6 w-6 text-violet-600" />;
      default:
        return <FileCheck className="h-6 w-6 text-indigo-600" />;
    }
  };

  const getDifficultyBadge = (difficulty: MockTestItem['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3 w-3" />
              Proctored Placement Environment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mock Tests
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Test yourself in a real placement-style environment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onViewResults && (
            <button
              id="view-latest-results-btn"
              type="button"
              onClick={onViewResults}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Latest Result: 78%</span>
            </button>
          )}

          {onBack && (
            <button
              id="mock-tests-back-btn"
              type="button"
              onClick={onBack}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              ← Back to Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Featured Banner: Realistic Exam Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-indigo-900/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="rounded-md bg-indigo-500/30 px-2.5 py-0.5 text-xs font-bold text-indigo-200 uppercase tracking-wider border border-indigo-400/30">
                Recommended Exam
              </span>
              <span className="text-xs text-indigo-300 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> 60 Mins • 40 Questions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              TCS Placement Mock (Tier-1 Screening Simulation)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Full-length proctored simulation strictly patterned after campus recruitment drives with Quantitative, Logical, Verbal, and Coding question sets, live timer alerts, and a dynamic 4-state question palette.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-indigo-200/90 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Auto-Timed with Low Warning
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Interactive 4-State Palette
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Comprehensive Result Scorecard
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 flex-shrink-0">
            <button
              id="start-tcs-featured-mock-btn"
              type="button"
              onClick={() => onStartTest(MOCK_TESTS_CATALOG[0])}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 hover:bg-indigo-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all transform active:scale-98 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Start TCS Mock Test</span>
            </button>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Previous Attempt:</span>
              <span className="font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                78%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80 w-fit">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                id={`filter-tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            id="mock-tests-search-input"
            type="text"
            placeholder="Search tests, topics, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 shadow-2xs"
          />
          <Filter className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tests Grid with entrance and hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between space-y-5 group"
            >
              {/* Card Top: Icon, Badges, Previous Score */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/70 group-hover:scale-105 group-hover:bg-indigo-50/70 transition-transform">
                    {getIcon(test.iconType)}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${getDifficultyBadge(
                        test.difficulty
                      )}`}
                    >
                      {test.difficulty}
                    </span>
                    {test.previousScore !== undefined ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <Trophy className="h-3 w-3" />
                        Score: {test.previousScore}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">
                        Not attempted yet
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                {/* Topics Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {test.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Metadata & Start Test Button */}
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {test.questionsCount}
                    </span>{' '}
                    Questions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {test.durationMinutes}
                    </span>{' '}
                    Mins
                  </div>
                </div>

                <button
                  id={`start-test-btn-${test.id}`}
                  type="button"
                  onClick={() => onStartTest(test)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs group-hover:shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Start Test</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTests.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <FileCheck className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-800">No matching mock tests</h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search criteria or selecting a different category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('All');
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
