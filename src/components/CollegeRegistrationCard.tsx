import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  MapPin,
  UserCheck,
  Phone,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  FileCheck2,
} from 'lucide-react';
import { registerInstitution } from '../utils/collegeStorage';

interface CollegeRegistrationCardProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: (collegeData: { name: string; email: string; code: string }) => void;
}

export const CollegeRegistrationCard: React.FC<CollegeRegistrationCardProps> = ({
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    email: '',
    emailDomain: '',
    city: '',
    state: '',
    country: 'India',
    website: '',
    officerName: '',
    officerPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);
  const [registeredCollegeName, setRegisteredCollegeName] = useState('');

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const handleDomainAutoFill = (emailVal: string) => {
    if (emailVal.includes('@')) {
      const parts = emailVal.split('@');
      if (parts[1] && !formData.emailDomain) {
        setFormData((prev) => ({ ...prev, emailDomain: '@' + parts[1] }));
      }
    }
  };

  const handleFillDemoAJU = () => {
    setFormData({
      name: 'Arka Jain University',
      code: 'AJU001',
      email: 'placement@arkajainuniversity.ac.in',
      emailDomain: '@arkajainuniversity.ac.in',
      city: 'Jamshedpur',
      state: 'Jharkhand',
      country: 'India',
      website: 'https://arkajainuniversity.ac.in',
      officerName: 'Prof. Animesh Sen',
      officerPhone: '+91 94311 88220',
      password: 'aju@password2026',
      confirmPassword: 'aju@password2026',
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return setErrorMsg('Please enter College / University Name.');
    if (!formData.code.trim()) return setErrorMsg('Please enter University / College Code (e.g. AJU001).');
    if (!formData.email.trim() || !formData.email.includes('@')) return setErrorMsg('Please enter a valid official university email.');
    if (!formData.emailDomain.trim()) return setErrorMsg('Please enter official email domain (e.g. @arkajainuniversity.ac.in).');
    if (!formData.city.trim()) return setErrorMsg('Please enter City.');
    if (!formData.state.trim()) return setErrorMsg('Please enter State.');
    if (!formData.officerName.trim()) return setErrorMsg('Please enter Placement Officer Name.');
    if (!formData.officerPhone.trim()) return setErrorMsg('Please enter Placement Officer Contact Number.');
    if (formData.password.length < 6) return setErrorMsg('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword) return setErrorMsg('Passwords do not match.');

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = registerInstitution({
        name: formData.name,
        code: formData.code,
        email: formData.email,
        emailDomain: formData.emailDomain,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        website: formData.website,
        officerName: formData.officerName,
        officerPhone: formData.officerPhone,
        password: formData.password,
      });

      setRegisteredCollegeName(res.college.name);
      setRegisteredSuccess(true);
      if (onRegisterSuccess) {
        onRegisterSuccess({
          name: res.college.name,
          email: res.college.email,
          code: res.college.code,
        });
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to register institution.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registeredSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-8 shadow-2xl text-slate-100"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30">
            <FileCheck2 className="h-8 w-8" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Status: PENDING ADMIN APPROVAL
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Registration Submitted!
          </h2>

          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            <strong className="text-white">{registeredCollegeName}</strong> has been registered with the placement portal.
          </p>

          <div className="rounded-xl border border-indigo-800/80 bg-[#0a0e27]/80 p-4 text-xs text-slate-300 text-left w-full space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-amber-300 font-semibold">Important Security Requirement:</strong>{' '}
                Admin must approve the institution before it can publish placement information or open student registration.
              </p>
            </div>
            <p className="text-[11px] text-slate-400 pl-6.5">
              Our placement board administrator will review your campus verification details. You can log into the Admin portal to approve immediately for demo evaluation.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Back to College Login</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="college-registration-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-2xl rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 sm:p-9 shadow-2xl text-slate-100"
    >
      {/* Header with Quick Fill Demo Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-indigo-900/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 text-white shadow-lg shadow-blue-600/30">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
              Register Institution
            </h1>
            <p className="text-xs font-semibold text-blue-400">
              College & University Placement Cell Onboarding
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFillDemoAJU}
          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Demo Fill (Arka Jain Univ)</span>
        </button>
      </div>

      {/* Guidance Pill */}
      <div className="mb-6 rounded-xl border border-indigo-800/80 bg-[#0a0e27]/80 p-3 text-xs text-slate-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Initial institution status: <strong className="text-amber-300">PENDING APPROVAL</strong></span>
        </div>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Already registered? Login</span>
        </button>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
          {errorMsg}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: College Name & University Code */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              College / University Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Arka Jain University"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              University Code *
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
              placeholder="e.g. AJU001"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white uppercase placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
            />
          </div>
        </div>

        {/* Row 2: Official University Email & Official Email Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-7">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Official University Email *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  handleChange('email', e.target.value);
                  handleDomainAutoFill(e.target.value);
                }}
                placeholder="placement@arkajainuniversity.ac.in"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Official Email Domain *
            </label>
            <input
              type="text"
              required
              value={formData.emailDomain}
              onChange={(e) => handleChange('emailDomain', e.target.value)}
              placeholder="@arkajainuniversity.ac.in"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
            />
          </div>
        </div>

        {/* Row 3: City, State, Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Jamshedpur"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              State *
            </label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="Jharkhand"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Country *
            </label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="India"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Row 4: Website */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
            Website URL
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Globe className="h-4 w-4" />
            </div>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://arkajainuniversity.ac.in"
              className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Row 5: Placement Officer Name & Contact Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Placement Officer Name *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <UserCheck className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={formData.officerName}
                onChange={(e) => handleChange('officerName', e.target.value)}
                placeholder="Prof. Animesh Sen"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Placement Officer Contact Number *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                required
                value={formData.officerPhone}
                onChange={(e) => handleChange('officerPhone', e.target.value)}
                placeholder="+91 94311 88220"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Row 6: Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Submitting institution verification...</span>
              </span>
            ) : (
              <>
                <span>Register Institution (Pending Admin Approval)</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
