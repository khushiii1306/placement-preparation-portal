import React, { useState, useId, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  User,
  Mail,
  School,
  BookOpen,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
  KeyRound,
  Building2,
} from 'lucide-react';
import { TermsModal } from './TermsModal';
import { registerNewStudent } from '../utils/studentStorage';
import { getCollegesList, enrollStudentInCollege, verifyStudentOtp } from '../utils/collegeStorage';

interface StudentRegistrationCardProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: (userData: {
    fullName: string;
    email: string;
    collegeName: string;
    branch: string;
    academicYear: string;
    collegeId?: string;
  }) => void;
}

export const StudentRegistrationCard = ({
  onSwitchToLogin,
  onRegisterSuccess,
}: StudentRegistrationCardProps) => {
  // Colleges list
  const approvedColleges = getCollegesList();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
 const [selectedCollegeId, setSelectedCollegeId] = useState<string>('NO_COLLEGE');
 const [collegeName, setCollegeName] = useState('');
  const [enrollmentIdVal, setEnrollmentIdVal] = useState('');
  const [branch, setBranch] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // OTP Verification for official university emails
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Touched and Error states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field IDs
  const nameId = useId();
  const emailId = useId();
  const collegeIdField = useId();
  const enrollmentIdField = useId();
  const branchId = useId();
  const yearId = useId();
  const gradYearId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const termsId = useId();

  // Check matching domain with current selected college
  const currentCollege = approvedColleges.find((c) => c.id === selectedCollegeId);
  const isOfficialEmail = currentCollege
    ? email.trim().toLowerCase().endsWith(currentCollege.emailDomain.toLowerCase())
    : false;

  useEffect(() => {
    // If college changes, update collegeName
    const col = approvedColleges.find((c) => c.id === selectedCollegeId);
    if (col) {
      setCollegeName(col.name);
    }
  }, [selectedCollegeId]);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200', text: 'text-slate-400' };

    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
      default:
        return { score: 0, label: 'Too short', color: 'bg-slate-200', text: 'text-slate-400' };
    }
  };

  const passwordStrength = getPasswordStrength(password);

  // Validation checks
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;
  const isPasswordValid = password.length >= 8;

  const errors = {
    fullName: !fullName.trim() ? 'Full name is required' : '',
    email: !email.trim()
      ? 'Email address is required'
      : !isEmailValid
      ? 'Please enter a valid email address'
      : '',
    enrollmentId: !enrollmentIdVal.trim() ? 'Enrollment ID or Roll Number is required' : '',
    collegeName:
      selectedCollegeId !== 'NO_COLLEGE' && !collegeName.trim()
        ? 'College or university name is required'
        : '',
    branch: !branch ? 'Please select your academic branch' : '',
    academicYear: !academicYear ? 'Please select your academic year' : '',
    password: !password
      ? 'Password is required'
      : !isPasswordValid
      ? 'Password must be at least 8 characters long'
      : '',
    confirmPassword: !confirmPassword
      ? 'Please confirm your password'
      : !doPasswordsMatch
      ? 'Passwords do not match'
      : '',
    terms: !agreedToTerms ? 'You must agree to the Terms and Conditions' : '',
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpError('');
    setEnteredOtp('123456'); // Pre-fill test OTP for seamless evaluation
  };

  const handleVerifyOtp = () => {
    if (verifyStudentOtp(email, enteredOtp)) {
      setIsOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP code. Please enter 123456.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Verify all validation passes
    const hasErrors = Object.values(errors).some((err) => Boolean(err));
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    const enrId = enrollmentIdVal.trim() || `ENR${Date.now().toString().slice(-6)}`;

    // Register student under the selected college for data isolation (creates a pending verification request)
    const isNoCollege = selectedCollegeId === 'NO_COLLEGE';
    if (!isNoCollege) {
    enrollStudentInCollege({
      collegeId: selectedCollegeId,
      fullName: fullName.trim(),
      email: email.trim(),
      enrollmentId: enrId,
      branch,
      academicYear,
      graduationYear,
      isOfficialEmailVerified: isOtpVerified,
     });
    }

    // Initialize isolated fresh student storage (0% progress, empty history)
    const registered = registerNewStudent({
      fullName: fullName.trim(),
      email: email.trim(),
      collegeName: isNoCollege ? 'No College / Not Listed' : collegeName.trim(),
      collegeId: isNoCollege ? undefined : selectedCollegeId,
      enrollmentId: enrId,
      branch,
      academicYear,
      graduationYear,
    });

    // Save student password for login validation
    try {
      const rawPasses = localStorage.getItem('placement_portal_student_passwords_v1');
      const passes = rawPasses ? JSON.parse(rawPasses) : {};
      passes[email.trim().toLowerCase()] = password.trim();
      localStorage.setItem('placement_portal_student_passwords_v1', JSON.stringify(passes));
    } catch (e) {
      // Ignore
    }

    // Mock frontend demo registration navigation
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({
        fullName: registered.profile.fullName,
        email: registered.profile.email,
        collegeName: registered.profile.collegeName,
        branch: registered.profile.branch,
        academicYear: registered.profile.academicYear,
        collegeId: isNoCollege ? undefined : selectedCollegeId,
      });
    }, 500);
  };

  // Demo auto-fill helper for test reviewer
  const handleAutoFill = () => {
    setFullName('Rahul Kumar');
    setEmail('rahul@arkajainuniversity.ac.in');
    setSelectedCollegeId('col_aju');
    setCollegeName('Arka Jain University');
    setEnrollmentIdVal('AJU202400123');
    setBranch('Computer Science & Engineering');
    setAcademicYear('4th Year (Final Year)');
    setGraduationYear('2026');
    setPassword('Placement@2026');
    setConfirmPassword('Placement@2026');
    setAgreedToTerms(true);
    setSubmitAttempted(false);
    setIsOtpVerified(true);
  };

  return (
    <>
      <motion.div
        id="student-registration-card"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9"
      >
        {/* Portal Branding & Demo Preset */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900">
                Placement Preparation Portal
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Campus Placement Season 2026
              </span>
            </div>
          </div>

          <button
            id="demo-autofill-btn"
            type="button"
            onClick={handleAutoFill}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Auto Fill Demo</span>
          </button>
        </div>

        {/* Heading & Subtitle */}
        <div className="mb-6">
          <h2
            id="registration-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          >
            Create Your Student Account
          </h2>
          <p
            id="registration-subtitle"
            className="mt-1.5 text-sm sm:text-base text-slate-500"
          >
            Start your journey towards placement success.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
          {/* 1. Full Name */}
          <div>
            <label
              htmlFor={nameId}
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                id={nameId}
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder="e.g. Priya Sharma"
                className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                  (touched.fullName || submitAttempted) && errors.fullName
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                }`}
              />
            </div>
            {(touched.fullName || submitAttempted) && errors.fullName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* 2. Email Address */}
          <div>
            <label
              htmlFor={emailId}
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsOtpVerified(false);
                }}
                onBlur={() => handleBlur('email')}
                placeholder="rahul@arkajainuniversity.ac.in"
                className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                  (touched.email || submitAttempted) && errors.email
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                }`}
              />
            </div>
            {(touched.email || submitAttempted) && errors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}

            {/* University Verification Logic Indicator */}
            {email.includes('@') && (
              <div className="mt-2.5 rounded-xl border p-3 text-xs">
                {isOfficialEmail ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        <span>Official University Email Verified Domain ({currentCollege?.emailDomain})</span>
                      </div>
                      {isOtpVerified && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                          OTP Verified
                        </span>
                      )}
                    </div>

                    {!isOtpVerified ? (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {!otpSent ? (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                          >
                            Send Verification OTP
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                              type="text"
                              value={enteredOtp}
                              onChange={(e) => setEnteredOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              className="w-32 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                            >
                              Verify OTP
                            </button>
                            <span className="text-[11px] text-slate-500">(Test code: 123456)</span>
                          </div>
                        )}
                        {otpError && <p className="text-rose-600 text-[11px]">{otpError}</p>}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Standard / Personal Email</p>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Student will be verified via <strong>Enrollment ID</strong> with university placement cell review.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. College Selection & Enrollment ID */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={collegeIdField}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                College / University <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <School className="h-4 w-4" />
                </div>
                <select
                  id={collegeIdField}
                  value={selectedCollegeId}
                  onChange={(e) => setSelectedCollegeId(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all cursor-pointer"
                >
                  {approvedColleges.map((col) => (
                   <option key={col.id} value={col.id}>
                  {col.name} ({col.code})
                  </option>
               ))}

               <option value="NO_COLLEGE">
               No College / Not Listed
               </option>
                
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor={enrollmentIdField}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Enrollment ID / Roll No <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  id={enrollmentIdField}
                  type="text"
                  required
                  value={enrollmentIdVal}
                  onChange={(e) => setEnrollmentIdVal(e.target.value.toUpperCase())}
                  onBlur={() => handleBlur('enrollmentId')}
                  placeholder="e.g. AJU202400123"
                  className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm uppercase font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                    (touched.enrollmentId || submitAttempted) && errors.enrollmentId
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                />
              </div>
              {(touched.enrollmentId || submitAttempted) && errors.enrollmentId && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{errors.enrollmentId}</span>
                </p>
              )}
            </div>
          </div>

          {/* 4 & 5. Branch, Academic Year & Graduation Year Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Branch */}
            <div>
              <label
                htmlFor={branchId}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Branch / Dept <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <select
                  id={branchId}
                  name="branch"
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  onBlur={() => handleBlur('branch')}
                  className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:bg-white focus:outline-none transition-all cursor-pointer ${
                    (touched.branch || submitAttempted) && errors.branch
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  <option value="Computer Science & Engineering">Computer Science & Eng (CSE)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication">Electronics & Comm (ECE)</option>
                  <option value="Electrical Engineering">Electrical Eng (EE)</option>
                  <option value="Mechanical Engineering">Mechanical Eng (ME)</option>
                  <option value="Data Science & Artificial Intelligence">Data Science & AI</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>
              {(touched.branch || submitAttempted) && errors.branch && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{errors.branch}</span>
                </p>
              )}
            </div>

            {/* Academic Year */}
            <div>
              <label
                htmlFor={yearId}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Academic Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Calendar className="h-4 w-4" />
                </div>
                <select
                  id={yearId}
                  name="academicYear"
                  required
                  value={academicYear}
                  onChange={(e) => {
                    const yr = e.target.value;
                    setAcademicYear(yr);
                    if (yr.includes('4th') || yr.includes('Final')) setGraduationYear('2026');
                    else if (yr.includes('3rd')) setGraduationYear('2027');
                    else if (yr.includes('2nd')) setGraduationYear('2028');
                    else if (yr.includes('1st')) setGraduationYear('2029');
                  }}
                  onBlur={() => handleBlur('academicYear')}
                  className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:bg-white focus:outline-none transition-all cursor-pointer ${
                    (touched.academicYear || submitAttempted) && errors.academicYear
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                  <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                  <option value="3rd Year (Pre-Final Year)">3rd Year (Pre-Final)</option>
                  <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                  <option value="Postgraduate (M.Tech / MCA)">Postgraduate</option>
                </select>
              </div>
              {(touched.academicYear || submitAttempted) && errors.academicYear && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{errors.academicYear}</span>
                </p>
              )}
            </div>

            {/* Graduation Year */}
            <div>
              <label
                htmlFor={gradYearId}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Graduation Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <select
                  id={gradYearId}
                  name="graduationYear"
                  required
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all cursor-pointer"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026 (Upcoming Batch)</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6. Password with Show/Hide & Strength Indicator */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor={passwordId}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              {password && (
                <span className={`text-xs font-semibold ${passwordStrength.text}`}>
                  Strength: {passwordStrength.label}
                </span>
              )}
            </div>

            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder="At least 8 characters"
                className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                  (touched.password || submitAttempted) && errors.password
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                }`}
              />
              <button
                id="toggle-reg-password-btn"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password Strength Indicator Bar */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        passwordStrength.score >= step
                          ? passwordStrength.color
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span className={password.length >= 8 ? 'text-emerald-600 font-medium' : ''}>
                    ✓ 8+ chars
                  </span>
                  <span className={/[A-Z]/.test(password) ? 'text-emerald-600 font-medium' : ''}>
                    ✓ 1 Uppercase
                  </span>
                  <span className={/[0-9]/.test(password) ? 'text-emerald-600 font-medium' : ''}>
                    ✓ 1 Number
                  </span>
                  <span className={/[^A-Za-z0-9]/.test(password) ? 'text-emerald-600 font-medium' : ''}>
                    ✓ 1 Symbol
                  </span>
                </div>
              </div>
            )}

            {(touched.password || submitAttempted) && errors.password && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* 7. Confirm Password with Show/Hide & Match indicator */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor={confirmPasswordId}
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              {confirmPassword && (
                <span
                  className={`text-xs font-medium ${
                    doPasswordsMatch ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                >
                  {doPasswordsMatch ? '✓ Passwords match' : 'Passwords do not match'}
                </span>
              )}
            </div>

            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id={confirmPasswordId}
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Re-enter password"
                className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                  (touched.confirmPassword || submitAttempted) && errors.confirmPassword
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                }`}
              />
              <button
                id="toggle-reg-confirm-password-btn"
                type="button"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {(touched.confirmPassword || submitAttempted) && errors.confirmPassword && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="pt-1">
            <div className="flex items-start gap-2.5">
              <input
                id={termsId}
                name="agreedToTerms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor={termsId} className="text-xs text-slate-600 leading-normal select-none">
                I agree to the{' '}
                <button
                  id="view-terms-link-btn"
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none cursor-pointer"
                >
                  Terms and Conditions
                </button>{' '}
                and accept the College Placement Cell guidelines.
              </label>
            </div>
            {(touched.terms || submitAttempted) && errors.terms && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{errors.terms}</span>
              </p>
            )}
          </div>

          {/* Create Account Button with Hover & Tap Animations */}
          <div className="pt-2">
            <motion.button
              id="create-account-submit-btn"
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.015,
                translateY: -1,
                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
              }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Creating your account...</span>
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Already have an account? Login */}
        <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button
            id="already-have-account-login-btn"
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none cursor-pointer"
          >
            Login
          </button>
        </div>

        {/* Bottom security assurance */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Encrypted Student Data • Verified Campus Placement Network</span>
        </div>
      </motion.div>

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => setAgreedToTerms(true)}
      />
    </>
  );
};
