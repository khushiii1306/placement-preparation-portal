import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Code2,
  Calculator,
  HelpCircle,
  FileText,
  Briefcase,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  GraduationCap,
  ShieldCheck,
  Target,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { COMPANY_PREP_DATA, CompanyPreparationDetail } from '../data/companyPrepData';

interface CompanyPreparationPageProps {
  companyReadinessMap?: Record<string, number>;
  onBackToDashboard: () => void;
  onStartDrill: (companyName: string) => void;
  onPracticeCoding: () => void;
  onViewJobOpportunity?: (companyName: string) => void;
}

export const CompanyPreparationPage: React.FC<CompanyPreparationPageProps> = ({
  companyReadinessMap,
  onBackToDashboard,
  onStartDrill,
  onPracticeCoding,
  onViewJobOpportunity,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('tcs');
  const [activeTab, setActiveTab] = useState<'overview' | 'aptitude' | 'coding' | 'interview' | 'previousQuestions'>('overview');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCompanyReadiness = (cId: string, shortCode: string, defaultScore: number) => {
    if (!companyReadinessMap) return defaultScore;
    if (companyReadinessMap[cId] !== undefined) return companyReadinessMap[cId];
    const lowerShort = shortCode.toLowerCase();
    if (companyReadinessMap[lowerShort] !== undefined) return companyReadinessMap[lowerShort];
    const compKey = `comp-${cId}`;
    if (companyReadinessMap[compKey] !== undefined) return companyReadinessMap[compKey];
    return 0;
  };

  const company: CompanyPreparationDetail =
    COMPANY_PREP_DATA.find((c) => c.id === selectedCompanyId) || COMPANY_PREP_DATA[0];

  const filteredCompanies = COMPANY_PREP_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.hiringRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRevealAnswer = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div id="company-preparation-page" className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>Target Company Readiness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company-Wise Placement Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Target recruitment curricula, previous year placement papers, sectional cutoffs, and mock readiness for premier campus recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Company Selector Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Company ({COMPANY_PREP_DATA.length} Top Recruiters)
          </h2>
          <div className="w-48 sm:w-64">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recruiter..."
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-7 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
              />
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2 top-2.5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredCompanies.map((c) => {
            const isSelected = c.id === company.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCompanyId(c.id);
                  setActiveTab('overview');
                }}
                className={`relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl font-black text-sm mb-2 shadow-xs ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {c.shortCode}
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{c.name}</h3>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="text-[11px] font-extrabold text-indigo-700">
                    {getCompanyReadiness(c.id, c.shortCode, c.readinessPercentage)}% Ready
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Company Hero Banner */}
      <motion.div
        key={company.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 text-xs font-bold text-indigo-200">
                {company.shortCode} Placement Drive 2026
              </span>
              <span className="text-xs text-slate-300 font-medium">{company.tagline}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{company.name} Preparation Hub</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Role: <span className="text-white font-semibold">{company.hiringRole}</span> • Package:{' '}
              <span className="text-emerald-300 font-semibold">{company.ctcPackage}</span>
            </p>
          </div>

          {/* Readiness Gauge & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="space-y-1 min-w-[140px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-200">Your Readiness</span>
                <span className="font-black text-emerald-400 text-sm">
                  {getCompanyReadiness(company.id, company.shortCode, company.readinessPercentage)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                  style={{
                    width: `${getCompanyReadiness(company.id, company.shortCode, company.readinessPercentage)}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-slate-300">Based on past mocks & topic scores</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStartDrill(company.name)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-md"
              >
                Start Diagnostic Drill
              </button>
              {onViewJobOpportunity && (
                <button
                  type="button"
                  onClick={() => onViewJobOpportunity(company.name)}
                  className="rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  View Vacancy
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Selection & Eligibility', icon: GraduationCap },
            { id: 'aptitude', label: 'Aptitude Syllabus', icon: Calculator },
            { id: 'coding', label: 'Coding Preparation', icon: Code2 },
            { id: 'interview', label: 'Interview Questions', icon: HelpCircle },
            { id: 'previousQuestions', label: 'Previous Placement Papers', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 whitespace-nowrap py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab 1: Overview, Eligibility & Selection Process */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Eligibility Criteria Cards */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Official Eligibility Criteria
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Academic Cutoff</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{company.eligibility.cgpaCutoff}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Permitted Branches</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{company.eligibility.allowedBranches}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Backlog Criteria</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{company.eligibility.backlogs}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Academic Gap Allowance</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{company.eligibility.gapInEducation}</p>
              </div>
            </div>
          </div>

          {/* Required Skills Chips */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Core Required Skills & Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {company.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-800"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Selection Process Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Campus Recruitment Workflow</h3>
            <div className="space-y-4">
              {company.selectionProcess.map((round) => (
                <div key={round.roundNumber} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm">
                    {round.roundNumber}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{round.title}</h4>
                      <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {round.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{round.description}</p>
                    <div className="flex items-start gap-1 text-[11px] text-indigo-700 font-semibold pt-1">
                      <Sparkles className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span>{round.keyTips}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Aptitude Preparation */}
      {activeTab === 'aptitude' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs text-indigo-950 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Recommended Preparation Strategy:</span> {company.aptitudePreparation.strategy}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.aptitudePreparation.sections.map((sec) => (
              <div
                key={sec.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{sec.name}</h4>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        sec.difficulty === 'Hard'
                          ? 'bg-rose-100 text-rose-700'
                          : sec.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {sec.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{sec.questionsCount} Questions</span>
                    <span>•</span>
                    <span>{sec.timeMinutes} Mins</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">
                      Key Topics
                    </span>
                    <ul className="space-y-1">
                      {sec.topics.map((t) => (
                        <li key={t} className="text-xs text-slate-700 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onStartDrill(`${company.name} - ${sec.name}`)}
                  className="w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer text-center"
                >
                  Practice {sec.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Coding Preparation */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Technical Coding Assessment Structure</h3>
                <p className="text-xs text-slate-500">{company.codingPreparation.format}</p>
              </div>
              <button
                type="button"
                onClick={onPracticeCoding}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
              >
                <Code2 className="h-4 w-4" />
                <span>Go to Coding Practice</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Supported Compilers</span>
                <div className="flex flex-wrap gap-1.5">
                  {company.codingPreparation.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Frequently Evaluated DSA</span>
                <div className="flex flex-wrap gap-1.5">
                  {company.codingPreparation.frequentTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-500">Frequently Asked Coding Problems</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {company.codingPreparation.sampleProblemTitles.map((p, idx) => (
                  <div
                    key={p}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800"
                  >
                    <span className="truncate pr-2">
                      {idx + 1}. {p}
                    </span>
                    <button
                      type="button"
                      onClick={onPracticeCoding}
                      className="text-indigo-600 hover:text-indigo-800 font-bold whitespace-nowrap cursor-pointer"
                    >
                      Solve →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interview Preparation */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4 text-indigo-600" />
                <span>Technical Interview Key Tips</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {company.interviewPreparation.technicalTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <span>HR & Behavioral Tips</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {company.interviewPreparation.hrTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Standard Interview Questions & Model Answers</h4>
            <div className="space-y-4">
              {company.interviewPreparation.sampleQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{q.question}</span>
                    <span className="rounded-md bg-indigo-100 text-indigo-800 px-2 py-0.5 text-[10px] font-bold">
                      {q.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                    <span className="font-bold text-slate-800">Suggested Approach: </span>
                    {q.suggestedApproach}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Previous Placement Questions */}
      {activeTab === 'previousQuestions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Verified Previous Placement Questions from {company.name} Campus Drives
            </h3>
            <span className="text-xs text-slate-400">
              {company.previousQuestions.length} Sample Questions
            </span>
          </div>

          <div className="space-y-4">
            {company.previousQuestions.map((pq) => {
              const isRevealed = Boolean(revealedAnswers[pq.id]);
              return (
                <div
                  key={pq.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                      {pq.topic}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleRevealAnswer(pq.id)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      {isRevealed ? 'Hide Solution' : 'Reveal Solution & Explanation'}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{pq.question}</p>

                  {pq.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {pq.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-xl border text-xs font-medium ${
                            isRevealed && opt.includes(pq.answer)
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-700'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {isRevealed && (
                    <div className="mt-3 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs space-y-1 text-emerald-950 animate-in fade-in duration-150">
                      <p className="font-bold text-emerald-800">Correct Answer: {pq.answer}</p>
                      <p className="text-slate-700 leading-relaxed">{pq.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
