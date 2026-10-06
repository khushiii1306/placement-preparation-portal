import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  ArrowUpRight,
  Check,
  X,
} from 'lucide-react';
import { JobOpportunity, JOBS_CATALOG } from '../data/jobsData';

interface CompaniesJobsPageProps {
  onSelectCompany: (job: JobOpportunity) => void;
  onBackToDashboard: () => void;
  userName?: string;
  collegeName?: string;
  branch?: string;
}

export const CompaniesJobsPage: React.FC<CompaniesJobsPageProps> = ({
  onSelectCompany,
  onBackToDashboard,
  userName = 'Student Candidate',
  collegeName = 'No College / Not Listed',
  branch = 'B.Tech (CSE)',
}) => {
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // 5 Dedicated Filters
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('All');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('All');
  const [selectedEligibilityFilter, setSelectedEligibilityFilter] = useState('All');
  const [selectedPackageFilter, setSelectedPackageFilter] = useState('All');

  // Application Modal State
  const [applyingJob, setApplyingJob] = useState<JobOpportunity | null>(null);
  const [appliedJobsMap, setAppliedJobsMap] = useState<Record<string, boolean>>({});

  // Filter Options
  const companyOptions = ['All', 'TCS', 'Infosys', 'Accenture', 'Wipro', 'Cognizant', 'Capgemini'];
  const roleOptions = [
    'All',
    'Systems Engineer',
    'Specialist Programmer',
    'Associate Software Engineer',
    'Project Engineer',
    'Cloud Developer',
  ];
  const locationOptions = ['All', 'Pan-India', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'];
  const eligibilityOptions = ['All', 'B.Tech 60%+', 'B.Tech 65%+'];
  const packageOptions = ['All', '< 4 LPA', '4-7 LPA', '> 7 LPA'];

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return JOBS_CATALOG.filter((job) => {
      // Search matching
      const matchesSearch =
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Company Filter
      const matchesCompany =
        selectedCompanyFilter === 'All' || job.company === selectedCompanyFilter;

      // Role Filter
      const matchesRole =
        selectedRoleFilter === 'All' || job.role.toLowerCase().includes(selectedRoleFilter.toLowerCase());

      // Location Filter
      const matchesLocation =
        selectedLocationFilter === 'All' ||
        job.locationCity === selectedLocationFilter ||
        job.location.toLowerCase().includes(selectedLocationFilter.toLowerCase());

      // Eligibility Filter
      const matchesEligibility =
        selectedEligibilityFilter === 'All' ||
        job.eligibilityCategory === selectedEligibilityFilter;

      // Package Filter
      const matchesPackage =
        selectedPackageFilter === 'All' ||
        job.packageCategory === selectedPackageFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesRole &&
        matchesLocation &&
        matchesEligibility &&
        matchesPackage
      );
    });
  }, [
    searchQuery,
    selectedCompanyFilter,
    selectedRoleFilter,
    selectedLocationFilter,
    selectedEligibilityFilter,
    selectedPackageFilter,
  ]);

  const handleApplyClick = (e: React.MouseEvent, job: JobOpportunity) => {
    e.stopPropagation();
    setApplyingJob(job);
  };

  const handleConfirmApplication = () => {
    if (applyingJob) {
      setAppliedJobsMap((prev) => ({ ...prev, [applyingJob.id]: true }));
      setTimeout(() => {
        setApplyingJob(null);
      }, 1500);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCompanyFilter('All');
    setSelectedRoleFilter('All');
    setSelectedLocationFilter('All');
    setSelectedEligibilityFilter('All');
    setSelectedPackageFilter('All');
  };

  const activeFilterCount =
    (selectedCompanyFilter !== 'All' ? 1 : 0) +
    (selectedRoleFilter !== 'All' ? 1 : 0) +
    (selectedLocationFilter !== 'All' ? 1 : 0) +
    (selectedEligibilityFilter !== 'All' ? 1 : 0) +
    (selectedPackageFilter !== 'All' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Companies & Job Opportunities
            </h1>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
              {filteredJobs.length} Opportunities
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Explore placement and internship opportunities.
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

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or job role"
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* 5 Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Company Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Company
            </label>
            <select
              value={selectedCompanyFilter}
              onChange={(e) => setSelectedCompanyFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {companyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Companies' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Job Role Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Job Role
            </label>
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {roleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Job Roles' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Location
            </label>
            <select
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {locationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Locations' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Eligibility Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Eligibility
            </label>
            <select
              value={selectedEligibilityFilter}
              onChange={(e) => setSelectedEligibilityFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {eligibilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Eligibility' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Package Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Package
            </label>
            <select
              value={selectedPackageFilter}
              onChange={(e) => setSelectedPackageFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {packageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Packages' : opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Pill display if filters applied */}
        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredJobs.length}</strong> matching opportunity(ies)
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <Building2 className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="font-bold text-slate-900 text-base">
            No opportunities matched your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keyword or relaxing filter constraints to see more campus opportunities.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, idx) => {
            const hasApplied = appliedJobsMap[job.id];

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectCompany(job)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
              >
                <div>
                  {/* Top Bar: Logo, Name, Role & Deadline Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${job.logoColor} font-black text-white text-sm shadow-xs`}
                      >
                        {job.logoText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                            {job.company}
                          </h3>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            {job.readinessPercentage}% Readiness
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5 line-clamp-1">
                          {job.role}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{job.deadlineDaysLeft}d left</span>
                    </span>
                  </div>

                  {/* Core Card Information Grid */}
                  <div className="mt-4 rounded-xl bg-slate-50/70 p-3.5 border border-slate-100 space-y-2 text-xs">
                    {/* Location */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Location:</span>
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                        {job.location}
                      </span>
                    </div>

                    {/* Package */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <IndianRupee className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Package:</span>
                      </span>
                      <span className="font-bold text-slate-900">
                        {job.package}
                      </span>
                    </div>

                    {/* Eligibility */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                        <span>Eligibility:</span>
                      </span>
                      <span className="font-semibold text-slate-800 text-right truncate max-w-[220px]">
                        {job.eligibility}
                      </span>
                    </div>

                    {/* Application Deadline */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Deadline:</span>
                      </span>
                      <span className="font-semibold text-amber-700">
                        {job.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Required Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-lg bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 text-[11px] font-medium text-indigo-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons: View Details & Apply Now */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectCompany(job)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Full Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleApplyClick(e, job)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      hasApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {hasApplied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick Apply / External Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${applyingJob.logoColor} font-bold text-white text-xs`}
                >
                  {applyingJob.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {applyingJob.company} Application
                  </h3>
                  <p className="text-xs text-slate-500">{applyingJob.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApplyingJob(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Student:</span>
                <strong className="text-slate-900">{userName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">College:</span>
                <span className="font-semibold text-slate-900">{collegeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Degree & Branch:</span>
                <span className="font-semibold text-slate-900">{branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Package:</span>
                <strong className="text-emerald-700">{applyingJob.package}</strong>
              </div>
            </div>

            <div className="rounded-xl bg-indigo-50/70 border border-indigo-100 p-3 text-xs text-indigo-900 space-y-1">
              <span className="font-bold block">Direct TPO & External Gateway:</span>
              <p className="text-[11px] text-indigo-700">
                Confirming will mark your application in the college placement portal and connect with the recruiter database.
              </p>
              <a
                href={applyingJob.externalApplyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline pt-1"
              >
                <span>Open {applyingJob.company} Careers Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setApplyingJob(null)}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApplication}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
              >
                Confirm & Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
