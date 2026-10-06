import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Code2,
  FileText,
  Upload,
  Eye,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Plus,
  Download,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle,
  FileCheck,
  Trash2,
} from 'lucide-react';
import { saveStudentProfile, getStudentProfile } from '../utils/studentStorage';

interface StudentProfilePageProps {
  initialName?: string;
  initialEmail?: string;
  initialCollege?: string;
  initialBranch?: string;
  initialAcademicYear?: string;
  onBackToDashboard?: () => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  initialName = '',
  initialEmail = '',
  initialCollege = '',
  initialBranch = '',
  initialAcademicYear = '',
  onBackToDashboard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const storedProfile = initialEmail ? getStudentProfile(initialEmail) : null;
  const effectiveInitialName = initialName || storedProfile?.fullName || 'Student Candidate';
  const effectiveInitialEmail = initialEmail || storedProfile?.email || '';
  const effectiveInitialCollege = initialCollege || storedProfile?.collegeName || 'No College / Not Listed';
  const effectiveInitialBranch = initialBranch || storedProfile?.branch || 'Computer Science & Engineering';
  const effectiveInitialYear = initialAcademicYear || storedProfile?.academicYear || '4th Year (Final Year)';

  const [name, setName] = useState(effectiveInitialName);
  const [email, setEmail] = useState(effectiveInitialEmail);
  const [college, setCollege] = useState(effectiveInitialCollege);
  const [branch, setBranch] = useState(effectiveInitialBranch);
  const [year, setYear] = useState(effectiveInitialYear);

  // Sync state when props change
  useEffect(() => {
    if (initialName || initialEmail) {
      const stored = initialEmail ? getStudentProfile(initialEmail) : null;
      const resName = initialName || stored?.fullName || 'Student Candidate';
      setName(resName);
      setEmail(initialEmail || stored?.email || '');
      setCollege(initialCollege || stored?.collegeName || 'No College / Not Listed');
      setBranch(initialBranch || stored?.branch || 'Computer Science & Engineering');
      setYear(initialAcademicYear || stored?.academicYear || '4th Year (Final Year)');
      setResumeFileName(`${resName.replace(/\s+/g, '_')}_Resume_2026.pdf`);
    }
  }, [initialName, initialEmail, initialCollege, initialBranch, initialAcademicYear]);

  // Skills State: HTML, CSS, JavaScript, React, Python, SQL
  const [skills, setSkills] = useState<string[]>([
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Python',
    'SQL',
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Resume State
  const [resumeFileName, setResumeFileName] = useState<string>(() =>
    effectiveInitialName ? `${effectiveInitialName.replace(/\s+/g, '_')}_Resume_2026.pdf` : 'Student_Resume_2026.pdf'
  );
  const [resumeFileSize, setResumeFileSize] = useState<string>('248 KB');
  const [resumeUploadDate, setResumeUploadDate] = useState<string>('Uploaded on 08 Sep 2026');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Dynamic Avatar Initials
  const getInitials = (fullName: string): string => {
    if (!fullName) return 'ST';
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'ST';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Handle Save
  const handleSave = () => {
    saveStudentProfile({
      fullName: name.trim(),
      email: email.trim(),
      collegeName: college.trim(),
      branch: branch.trim(),
      academicYear: year.trim(),
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  // Remove Skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Handle File Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingResume(true);
      setTimeout(() => {
        setResumeFileName(file.name);
        setResumeFileSize(`${(file.size / 1024).toFixed(0)} KB`);
        setResumeUploadDate(`Uploaded on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`);
        setIsUploadingResume(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 800);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Student Profile
            </h1>
            <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              Verified Candidate
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your academic credentials, technical skills, and placement resume.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </button>
          )}

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold">Profile Updated Successfully</p>
                <p className="text-[11px] text-emerald-700">
                  All personal details, skills, and placement records have been safely saved.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSaveSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Profile Header Box */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle accent backdrop decoration */}
        <div className="absolute top-0 right-0 h-32 w-48 bg-gradient-to-bl from-indigo-50/60 to-transparent pointer-events-none rounded-tr-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-3xl font-extrabold text-white shadow-md ring-4 ring-indigo-50">
                <span>{getInitials(name)}</span>
              </div>
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Candidate" />
            </div>

            {/* Candidate Identity Details */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {name}
                </h2>
                <span className="rounded-lg bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                  {branch}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>{college}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Academic Year: {year}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action in Header */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <Eye className="h-4 w-4 text-indigo-600" />
              <span>Preview Resume</span>
            </button>
          </div>
        </div>

        {/* 2. Profile Completion: 80% Animated Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Profile Completion
              </span>
              <span className="rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-bold border border-indigo-100">
                80% Completed
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Complete remaining 20% to unlock top tier MNC drive recommendations
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 shadow-sm relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>

          {/* Completion milestones */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Personal Details (Done)
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Core Tech Skills (Done)
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Resume Uploaded (Done)
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Add GitHub Profile (+10%)
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Verify Contact OTP (+10%)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Personal Information, Skills & Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Personal Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Personal Information</h3>
                  <p className="text-xs text-slate-500">
                    Official candidate details recorded for campus placement drives
                  </p>
                </div>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
              ) : (
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Editing Mode
                </span>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    placeholder="Enter full name"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-100">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>{name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-100">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{email}</span>
                  </div>
                )}
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  College / Institute
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    placeholder="Enter college name"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-100">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span>{college}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Branch / Specialization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                      placeholder="e.g. B.Tech CSE"
                    />
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-100">
                      <GraduationCap className="h-4 w-4 text-slate-400" />
                      <span>{branch}</span>
                    </div>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Academic Year
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                      placeholder="e.g. 2023 - 2027 (4th Year)"
                    />
                  ) : (
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-100">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{year}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons in edit mode */}
              {isEditing && (
                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-all cursor-pointer shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Skills & Resume */}
        <div className="lg:col-span-5 space-y-6">
          {/* Skills Section */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Technical Skills</h3>
                  <p className="text-xs text-slate-500">Verified core competencies</p>
                </div>
              </div>

              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 border border-purple-100">
                {skills.length} Skills
              </span>
            </div>

            {/* Required Skills Badges: HTML, CSS, JavaScript, React, Python, SQL */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all"
                >
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-red-600 ml-0.5 transition-colors cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* Add Skill Input in Editing Mode */}
            {isEditing && (
              <form onSubmit={handleAddSkill} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Add skill (e.g. Docker, TypeScript)..."
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </form>
            )}
          </div>

          {/* Resume Section */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Resume</h3>
                  <p className="text-xs text-slate-500">Placement CV & ATS scorecard</p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100 flex items-center gap-1">
                <Check className="h-3 w-3" />
                <span>ATS 88%</span>
              </span>
            </div>

            {/* Active Resume Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-xs">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {resumeFileName}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {resumeFileSize} • {resumeUploadDate}
                  </p>
                </div>
              </div>

              {/* View Resume Button as requested */}
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Upload Resume Control as requested */}
            <div className="relative">
              <label
                htmlFor="resume-upload-input"
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-5 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group"
              >
                <input
                  id="resume-upload-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform mb-2">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {isUploadingResume ? 'Processing Resume...' : 'Upload New Resume'}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Drag & drop or click to replace • PDF, DOCX (Max 5MB)
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive View Resume Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{resumeFileName}</h3>
                    <p className="text-[11px] text-slate-500">{name} - Campus Recruitment Profile</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body: Document Preview Sheet */}
              <div className="p-6 overflow-y-auto bg-slate-100/70 flex-1 space-y-4">
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-8 text-slate-800 space-y-6">
                  {/* Document Header */}
                  <div className="border-b border-slate-200 pb-4 text-center">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                      {name}
                    </h2>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {branch} • 8.82 CGPA
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {email} • +91 98765 43210 • Placement Candidate Profile
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                      Education
                    </h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{college}</span>
                        <span>2023 - 2027</span>
                      </div>
                      <p className="text-slate-600">B.Tech in Computer Science & Engineering | Current CGPA: 8.82/10</p>
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                      Technical Skills
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold">Languages & Core:</span> Python, SQL, JavaScript (ES6+), HTML5, CSS3<br />
                      <span className="font-bold">Frameworks & Libraries:</span> React.js, Tailwind CSS, Express, Node.js<br />
                      <span className="font-bold">Database & Tools:</span> PostgreSQL, Git, GitHub, VS Code, Postman
                    </p>
                  </div>

                  {/* Key Projects */}
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                      Selected Projects
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Campus Placement Assessment & Preparation Engine</span>
                          <span className="text-slate-500 font-normal">React, TypeScript, Tailwind</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          Built full-stack proctored exam simulator with timing enforcement, section navigation, and instant analytics.
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Smart Career & Skill Gap Analyzer</span>
                          <span className="text-slate-500 font-normal">Python, SQL, Streamlit</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          Designed diagnostic assessment tool matching company eligibility criteria and test cutoff percentiles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3.5 bg-white">
                <span className="text-xs text-slate-500">
                  Ready for placement drive distribution
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert('Resume downloaded to local documents.');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(false)}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    Close Preview
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
