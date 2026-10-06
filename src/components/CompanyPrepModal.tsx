import React, { useState } from 'react';
import { CompanyPreparationDetail } from '../data/companyPrepData';
import {
  X,
  Briefcase,
  Award,
  CheckCircle2,
  Clock,
  Code2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  TcsLogo,
  InfosysLogo,
  AccentureLogo,
  WiproLogo,
  DeloitteLogo,
  CognizantLogo,
  HclTechLogo,
  CapgeminiLogo,
} from './CompanyLogos';

interface CompanyPrepModalProps {
  company: CompanyPreparationDetail | null;
  onClose: () => void;
  onStartPreparation: (companyId: string) => void;
}

export const CompanyPrepModal: React.FC<CompanyPrepModalProps> = ({
  company,
  onClose,
  onStartPreparation,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rounds' | 'syllabus' | 'interview'>('overview');

  if (!company) return null;

  const renderLogo = (id: string) => {
    switch (id) {
      case 'tcs':
        return <TcsLogo className="h-8 w-auto" />;
      case 'infosys':
        return <InfosysLogo className="h-8 w-auto" />;
      case 'accenture':
        return <AccentureLogo className="h-8 w-auto" />;
      case 'wipro':
        return <WiproLogo className="h-8 w-auto" />;
      case 'deloitte':
        return <DeloitteLogo className="h-8 w-auto" />;
      case 'cognizant':
        return <CognizantLogo className="h-8 w-auto" />;
      case 'hcltech':
        return <HclTechLogo className="h-8 w-auto" />;
      case 'capgemini':
        return <CapgeminiLogo className="h-8 w-auto" />;
      default:
        return (
          <span className="font-black text-xl text-slate-900 tracking-tight">
            {company.name}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040611]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-indigo-900/80 bg-[#0c1236] shadow-2xl shadow-blue-950/50 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-indigo-900/60 bg-[#080d26] px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-32 items-center justify-center rounded-xl bg-white px-3 shadow-xs">
              {renderLogo(company.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{company.name}</h3>
                <span className="rounded-full bg-blue-950/90 border border-blue-500/40 px-2.5 py-0.5 text-xs font-bold text-blue-300">
                  {company.readinessPercentage}% Readiness Target
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{company.tagline}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-indigo-900/60 bg-[#090e2b] px-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Hiring Overview & CTC
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rounds')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'rounds'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Selection Rounds ({company.selectionProcess.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'syllabus'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Aptitude & Coding Pattern
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'interview'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Interview Questions ({company.interviewPreparation.sampleQuestions.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0f2e]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e173d] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Primary Role
                  </span>
                  <p className="mt-1 font-extrabold text-sm text-white">{company.hiringRole}</p>
                </div>
                <div className="rounded-2xl border border-blue-500/40 bg-blue-950/40 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    CTC Package Offered
                  </span>
                  <p className="mt-1 font-black text-sm text-blue-200">{company.ctcPackage}</p>
                </div>
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e173d] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Academic Cutoff
                  </span>
                  <p className="mt-1 font-bold text-sm text-slate-200">{company.eligibility.cgpaCutoff}</p>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="rounded-2xl border border-indigo-900/60 p-5 bg-[#0e173d] space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  Campus Eligibility Criteria
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="font-bold text-white">Allowed Branches:</span>
                    <span>{company.eligibility.allowedBranches}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="font-bold text-white">Active Backlogs:</span>
                    <span>{company.eligibility.backlogs}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="font-bold text-white">Academic Gap:</span>
                    <span>{company.eligibility.gapInEducation}</span>
                  </div>
                </div>
              </div>

              {/* Required Core Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Required Competencies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {company.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-indigo-800 bg-[#0f1a45] px-3 py-1 text-xs font-semibold text-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Official Campus Recruitment Workflow
              </h4>
              <div className="space-y-3">
                {company.selectionProcess.map((round) => (
                  <div
                    key={round.roundNumber}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-indigo-900/60 bg-[#0e173d] p-4 hover:border-blue-500/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 font-black text-blue-300 text-sm">
                        0{round.roundNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-white">{round.title}</h5>
                          <span className="rounded-md bg-[#0a0f2e] border border-indigo-900 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                            {round.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{round.description}</p>
                        <p className="text-xs text-blue-300 font-semibold mt-1">
                          Tip: {round.keyTips}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              {/* Aptitude Section Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Aptitude Test Pattern
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {company.aptitudePreparation.sections.map((sec, idx) => (
                    <div key={idx} className="rounded-2xl border border-indigo-900/60 p-4 bg-[#0e173d] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{sec.name}</span>
                        <span className="rounded bg-blue-950 border border-blue-500/40 text-blue-300 text-[10px] font-bold px-1.5 py-0.5">
                          {sec.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{sec.questionsCount} Qs</span>
                        <span>•</span>
                        <span>{sec.timeMinutes} Mins</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {sec.topics.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-blue-200/90 italic bg-blue-950/30 border border-blue-500/30 rounded-xl p-3">
                  Strategy: {company.aptitudePreparation.strategy}
                </p>
              </div>

              {/* Coding Pattern */}
              <div className="rounded-2xl border border-indigo-900/60 p-5 bg-[#0e173d] space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Coding Challenge Specifications
                </h4>
                <div className="text-xs space-y-2">
                  <p className="text-slate-300 font-medium">
                    <span className="font-bold text-white">Platform & Format:</span> {company.codingPreparation.format}
                  </p>
                  <p className="text-slate-300 font-medium">
                    <span className="font-bold text-white">Supported Languages:</span>{' '}
                    {company.codingPreparation.languages.join(', ')}
                  </p>
                  <p className="text-slate-300 font-medium">
                    <span className="font-bold text-white">Frequent Topics:</span>{' '}
                    {company.codingPreparation.frequentTopics.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Frequently Asked Interview Questions
              </h4>
              <div className="space-y-3">
                {company.interviewPreparation.sampleQuestions.map((q, idx) => (
                  <div key={idx} className="rounded-2xl border border-indigo-900/60 p-4 bg-[#0e173d] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{q.question}</span>
                      <span className="rounded bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold px-2 py-0.5">
                        {q.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 bg-[#080d26] p-3 rounded-xl border border-indigo-900/60">
                      <strong className="text-blue-400">Recommended Answer Approach:</strong> {q.suggestedApproach}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-indigo-900/60 bg-[#080d26] px-6 py-4">
          <div className="text-xs text-slate-400">
            Official 2026 Campus Placement Blueprint for {company.name}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-indigo-800 bg-[#0e173d] px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-[#15204c] hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartPreparation(company.id);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Start {company.shortCode} Preparation</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
