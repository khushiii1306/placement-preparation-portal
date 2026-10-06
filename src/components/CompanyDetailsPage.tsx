import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Award,
  AlertCircle,
  FileText,
  Send,
  Sparkles,
  ChevronRight,
  BookOpen,
  UserCheck,
  Check,
} from 'lucide-react';
import { JobOpportunity } from '../data/jobsData';

interface CompanyDetailsPageProps {
  job: JobOpportunity;
  onBackToCompanies: () => void;
  onTakeAssessment?: (companyName: string) => void;
  userName?: string;
  collegeName?: string;
  branch?: string;
}

export const CompanyDetailsPage: React.FC<CompanyDetailsPageProps> = ({
  job,
  onBackToCompanies,
  onTakeAssessment,
  userName = 'Student Candidate',
  collegeName = 'No College / Not Listed',
  branch = 'B.Tech (CSE) • 4th Year',
}) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleConfirmApply = () => {
    setIsApplied(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Navigation & Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToCompanies}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Companies</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Recruitment Drive Open
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Company Logo Badge */}
            <div
              className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${job.logoColor} font-black text-xl sm:text-2xl text-white shadow-md`}
            >
              {job.logoText}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {job.company}
                </h1>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {job.companyTier}
                </span>
              </div>

              {/* Job Role */}
              <p className="text-base sm:text-lg font-semibold text-indigo-700">
                {job.role}
              </p>

              {/* Meta: Location & Package */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <IndianRupee className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Package: {job.package}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Button in Header */}
          <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition-all cursor-pointer ${
                isApplied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
              }`}
            >
              {isApplied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Application Submitted</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Apply Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: 7 Sections on Left, "Your Readiness" on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): 7 Detailed Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: About Company */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <Building2 className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">1. About {job.company}</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {job.aboutCompany}
            </p>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">
                  Recruiter Category:
                </span>
                <span>{job.companyTier}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-indigo-600" />
                <span className="font-semibold text-slate-800">
                  Recruitment Nature:
                </span>
                <span>Annual Campus Recruitment Drive</span>
              </div>
            </div>
          </div>

          {/* Section 2: Job Description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">2. Job Description</h2>
            </div>
            <p className="text-sm text-slate-700 font-medium">
              {job.jobDescription.summary}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Responsibilities & Deliverables
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {job.jobDescription.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-indigo-50/50 p-3.5 border border-indigo-100 text-xs text-indigo-900">
              <span className="font-bold block mb-0.5">Career & Growth Track:</span>
              <span>{job.jobDescription.growthTrack}</span>
            </div>
          </div>

          {/* Section 3: Eligibility Criteria */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <UserCheck className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">3. Eligibility Criteria</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">
                  Academic Minimum
                </span>
                <p className="text-slate-800 font-bold mt-1">
                  {job.eligibilityCriteria.minimumMarks}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">
                  Active Backlog Policy
                </span>
                <p className="text-slate-800 font-bold mt-1">
                  {job.eligibilityCriteria.backlogPolicy}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">
                  Passing Out Batch
                </span>
                <p className="text-slate-800 font-bold mt-1">
                  {job.eligibilityCriteria.yearOfPassing}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block uppercase font-bold text-[10px]">
                  Education Gap Limit
                </span>
                <p className="text-slate-800 font-bold mt-1">
                  {job.eligibilityCriteria.gapInEducation}
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Eligible Branches & Degrees:
              </span>
              <div className="flex flex-wrap gap-2">
                {job.eligibilityCriteria.degreesAllowed.map((deg, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                  >
                    {deg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Required Skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <Award className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">4. Required Skills</h2>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Technical Core Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkillsDetailed.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-bold text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Tools, Frameworks & Runtime
                </span>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkillsDetailed.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Behavioral & Problem Solving Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkillsDetailed.softSkills.map((soft, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700"
                    >
                      {soft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Selection Process */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">5. Selection Process</h2>
            </div>

            <div className="space-y-4">
              {job.selectionProcess.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50/40"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-extrabold text-white text-xs">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {step.title}
                      </h4>
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Important Dates */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">6. Important Dates</h2>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
              {job.importantDates.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-emerald-500'
                          : item.status === 'Active'
                          ? 'bg-amber-500 animate-ping'
                          : 'bg-slate-300'
                      }`}
                    />
                    <span className="font-bold text-slate-800">{item.event}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-600">{item.date}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.status === 'Completed'
                          ? 'bg-slate-100 text-slate-600'
                          : item.status === 'Active'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Application Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold">7. Application Information</h2>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Official Portal:</span>
                <span className="font-bold text-slate-900">{job.applicationInfo.portalName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Notice from T&P:</span>
                <span className="font-semibold text-slate-700 text-right max-w-sm">
                  {job.applicationInfo.tpoNotice}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Mandatory Verification Documents
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {job.applicationInfo.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right-Side Card (4 cols): "Your Readiness" */}
        <div className="lg:col-span-4 sticky top-6 space-y-5">
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-b from-indigo-50/70 to-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Evaluation Profile
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Your Readiness
                </h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            {/* Prominent Score */}
            <div className="rounded-xl bg-white p-4 border border-indigo-100 text-center shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">
                {job.company} Readiness Index
              </span>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-indigo-700">
                  {job.readinessPercentage}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {job.readinessPercentage >= 70 ? '• Highly Competitive' : '• Eligible'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.readinessPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-indigo-600"
                />
              </div>
            </div>

            {/* Readiness Breakdown */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                Module Breakdown
              </span>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Aptitude & Math</span>
                    <span>{job.readinessBreakdown.aptitude}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${job.readinessBreakdown.aptitude}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Coding & Algorithms</span>
                    <span>{job.readinessBreakdown.coding}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${job.readinessBreakdown.coding}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Logical & Reasoning</span>
                    <span>{job.readinessBreakdown.logical}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-sky-600 rounded-full"
                      style={{ width: `${job.readinessBreakdown.logical}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>Communication & Fluency</span>
                    <span>{job.readinessBreakdown.communication}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${job.readinessBreakdown.communication}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-sm transition-all cursor-pointer ${
                  isApplied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
                }`}
              >
                {isApplied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Applied Successfully</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Apply Now</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onTakeAssessment && onTakeAssessment(job.company)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Take {job.company} Mock Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${job.logoColor} font-bold text-white text-xs`}
                >
                  {job.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Apply for {job.company}
                  </h3>
                  <p className="text-xs text-slate-500">{job.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Candidate Pre-fill Information */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2.5 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
                Verified College Placement Credentials
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block">Candidate:</span>
                  <strong className="text-slate-900">{userName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">College:</span>
                  <strong className="text-slate-900">{collegeName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Branch & Degree:</span>
                  <strong className="text-slate-900">{branch}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Current CGPA:</span>
                  <strong className="text-emerald-700">8.42 / 10.0 (Eligible)</strong>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 flex items-start gap-2.5 text-xs text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                Your verified resume and academic profile will be transmitted directly to the college
                Training & Placement Officer (TPO) and {job.company} Campus Portal.
              </p>
            </div>

            {/* Official External Link notice */}
            <div className="text-[11px] text-slate-500">
              <span>Recruitment Portal: </span>
              <a
                href={job.externalApplyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
              >
                <span>{job.applicationInfo.portalName}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApply}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm cursor-pointer"
              >
                Confirm Application Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
