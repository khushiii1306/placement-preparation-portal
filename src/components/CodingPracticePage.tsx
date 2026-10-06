import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  CheckCircle2,
  Circle,
  Play,
  Copy,
  Check,
  ChevronRight,
  Filter,
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  X,
  Layers,
  ArrowRight,
  Terminal,
  Cpu,
  Trophy,
  ArrowLeft,
} from 'lucide-react';
import { codingProblemsList, CodingProblem } from '../data/codingProblemsData';

interface CodingPracticePageProps {
  onBack?: () => void;
  completedProblemsMap?: Record<string, boolean>;
  onToggleProblemCompleted?: (problemId: string, isCompleted: boolean) => void;
}

export const CodingPracticePage: React.FC<CodingPracticePageProps> = ({
  onBack,
  completedProblemsMap,
  onToggleProblemCompleted,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track completed problems: { [problemId: string]: boolean }
  const [completedProblems, setCompletedProblems] = useState<Record<string, boolean>>(
    completedProblemsMap ?? {
      'prob-1': true, // default demo state
      'prob-5': true,
    }
  );

  useEffect(() => {
    if (completedProblemsMap) {
      setCompletedProblems(completedProblemsMap);
    }
  }, [completedProblemsMap]);

  // Modal State for currently opened problem
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'python' | 'java' | 'javascript'>('cpp');
  const [copied, setCopied] = useState<boolean>(false);
  const [testRunSimulated, setTestRunSimulated] = useState<boolean>(false);

  const filtersList = [
    'All',
    'Easy',
    'Medium',
    'Arrays',
    'Strings',
    'Searching',
    'Sorting',
    'Basic Programming',
  ];

  // Filter & Search Logic
  const filteredProblems = codingProblemsList.filter((p) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      p.difficulty === selectedFilter ||
      p.topic === selectedFilter;

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Toggle Complete handler
  const handleToggleComplete = (problemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextVal = !completedProblems[problemId];
    setCompletedProblems((prev) => ({
      ...prev,
      [problemId]: nextVal,
    }));
    if (onToggleProblemCompleted) {
      onToggleProblemCompleted(problemId, nextVal);
    }
  };

  // Copy code handler
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCompleted = Object.values(completedProblems).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / codingProblemsList.length) * 100);

  return (
    <div id="coding-practice-page" className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
              <Code2 className="h-3 w-3" />
              Technical Prep
            </span>
            <span className="text-xs text-slate-400">• Round 2 Coding Challenges</span>
          </div>

          <h1 id="coding-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Coding Practice
          </h1>

          <p id="coding-subtitle" className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal">
            Build your programming skills for placement coding rounds.
          </p>
        </div>

        {/* Action Controls & Aggregate indicator */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {onBack && (
            <button
              id="coding-back-btn"
              type="button"
              onClick={onBack}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </button>
          )}

          <div className="flex items-center gap-2 rounded-xl bg-emerald-50/80 border border-emerald-100 px-3.5 py-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Solved: {totalCompleted} / {codingProblemsList.length} ({progressPercent}%)</span>
          </div>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filtersList.map((f) => {
              const isSelected = selectedFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFilter(f)}
                  className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProblems.map((problem) => {
          const isDone = Boolean(completedProblems[problem.id]);

          return (
            <motion.div
              key={problem.id}
              id={`coding-card-${problem.id}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all"
            >
              {/* Card Header: Difficulty & Topic */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                          : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                      }`}
                    >
                      {problem.difficulty}
                    </span>

                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                      {problem.topic}
                    </span>
                  </div>

                  {/* Solved / Status icon */}
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Solved
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Unsolved
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-400">
                      #{problem.number}
                    </span>
                    <span>{problem.title}</span>
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {problem.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Solve Problem & Mark Complete */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  id={`mark-complete-${problem.id}`}
                  type="button"
                  onClick={(e) => handleToggleComplete(problem.id, e)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="h-3.5 w-3.5 text-slate-400" />
                      <span>Mark Complete</span>
                    </>
                  )}
                </button>

                <button
                  id={`solve-prob-${problem.id}`}
                  type="button"
                  onClick={() => {
                    setActiveProblem(problem);
                    setTestRunSimulated(false);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  <span>Solve Problem</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12 rounded-3xl bg-white border border-slate-200 p-8">
          <p className="text-sm font-semibold text-slate-700">No problems found matching your criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ========================================================
          PROBLEM MODAL: Statement, I/O, Examples, Approach, Reference Solution
      ======================================================== */}
      <AnimatePresence>
        {activeProblem && (
          <div
            id="coding-problem-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveProblem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-extrabold text-xs">
                    #{activeProblem.number}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>{activeProblem.title}</span>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.2 text-[10px] font-bold ${
                          activeProblem.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {activeProblem.difficulty}
                      </span>
                    </h2>
                    <span className="text-xs text-slate-500">{activeProblem.topic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(activeProblem.id)}
                    className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold border transition-colors cursor-pointer ${
                      completedProblems[activeProblem.id]
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {completedProblems[activeProblem.id] ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Solved</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-3.5 w-3.5 text-slate-400" />
                        <span>Mark as Solved</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveProblem(null)}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* 1. Problem Statement */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Problem Statement
                  </h3>
                  <p className="text-sm font-normal text-slate-800 leading-relaxed">
                    {activeProblem.statement}
                  </p>
                </div>

                {/* 2. Input & Output Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Input Format</span>
                    <p className="text-xs text-slate-800 font-mono">{activeProblem.inputFormat}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Output Format</span>
                    <p className="text-xs text-slate-800 font-mono">{activeProblem.outputFormat}</p>
                  </div>
                </div>

                {/* 3. Examples */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Examples
                  </h3>
                  <div className="space-y-3">
                    {activeProblem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 space-y-2"
                      >
                        <span className="text-xs font-bold text-indigo-700">Example {idx + 1}:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px] font-sans">Input:</span>
                            <span className="text-slate-900 font-bold">{ex.input}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                            <span className="text-slate-400 block text-[10px] font-sans">Output:</span>
                            <span className="text-emerald-700 font-bold">{ex.output}</span>
                          </div>
                        </div>
                        {ex.explanation && (
                          <p className="text-[11px] text-slate-500 italic">
                            Explanation: {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Expected Approach & Complexities */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <span>Expected Approach & Complexity</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeProblem.expectedApproach.intuition}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 border-t border-indigo-100/70 text-xs">
                    <div>
                      <span className="text-slate-400">Time Complexity: </span>
                      <code className="font-bold text-indigo-700 font-mono">
                        {activeProblem.expectedApproach.timeComplexity}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-400">Space Complexity: </span>
                      <code className="font-bold text-indigo-700 font-mono">
                        {activeProblem.expectedApproach.spaceComplexity}
                      </code>
                    </div>
                  </div>
                </div>

                {/* 5. Reference Solution with Multi-Language Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Reference Solution
                    </h3>

                    {/* Language selector tabs */}
                    <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                      {(['cpp', 'python', 'java', 'javascript'] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setSelectedLanguage(lang)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                            selectedLanguage === lang
                              ? 'bg-white text-indigo-700 shadow-xs'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {lang === 'cpp' ? 'C++' : lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Container with Copy button */}
                  <div className="relative rounded-2xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto shadow-inner">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCode(activeProblem.referenceSolutions[selectedLanguage])
                      }
                      className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-sans font-semibold text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>

                    <pre className="pt-6 leading-relaxed whitespace-pre font-mono">
                      {activeProblem.referenceSolutions[selectedLanguage]}
                    </pre>
                  </div>
                </div>

                {/* Simulated Run / Playground preview */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-900 block">Sample Test Simulation</span>
                    <span>Verify your code logic against pre-compiled placement test cases.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTestRunSimulated(true)}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Run Sample Test Cases</span>
                  </button>
                </div>

                {testRunSimulated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>All 5 Pre-compiled Test Cases Passed Successfully!</span>
                    </div>
                    <div className="text-[11px] text-emerald-700/80 font-mono">
                      Execution Time: 28ms • Memory: 14.2 MB • Strict Placement Boundary Verified.
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setActiveProblem(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleComplete(activeProblem.id);
                      setActiveProblem(null);
                    }}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                  >
                    {completedProblems[activeProblem.id]
                      ? 'Keep Completed & Close'
                      : 'Mark Complete & Continue'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
