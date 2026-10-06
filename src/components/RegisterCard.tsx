import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Hash,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface RegisterCardProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: (userData: { name: string; email: string; rollNumber: string; branch: string }) => void;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess({
        name: name.trim() || 'New Student',
        email: email.trim() || 'student@college.edu',
        rollNumber: rollNumber.trim() || 'CS2022999',
        branch: branch,
      });
    }, 600);
  };

  return (
    <motion.div
      id="register-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Placement Prep Portal
          </span>
          <span className="block text-[11px] font-medium text-slate-500">
            Student Placement Cell
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Create Account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Register to begin your on-campus recruitment prep.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative mt-1.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <User className="h-4 w-4" />
            </div>
            <input
              id="reg-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Sharma"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
          </div>
        </div>

        {/* College Roll Number & Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-roll" className="block text-xs font-semibold text-slate-700">
              College Roll No.
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Hash className="h-4 w-4" />
              </div>
              <input
                id="reg-roll"
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="CS2022419"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-branch" className="block text-xs font-semibold text-slate-700">
              Branch / Dept
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <select
                id="reg-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all cursor-pointer"
              >
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Information Technology">IT</option>
                <option value="Electronics & Communication">ECE</option>
                <option value="Electrical Engineering">EE</option>
                <option value="Mechanical Engineering">ME</option>
                <option value="Data Science & AI">DS & AI</option>
              </select>
            </div>
          </div>
        </div>

        {/* College Email */}
        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700">
            College Webmail / Email
          </label>
          <div className="relative mt-1.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.sharma@college.edu"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700">
            Create Password
          </label>
          <div className="relative mt-1.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
            <button
              id="reg-toggle-password"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            id="register-submit-btn"
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.01, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/35 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 disabled:opacity-75 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Setting up your account...
              </span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Switch Back to Login */}
      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button
          id="switch-to-login-btn"
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </motion.div>
  );
};
