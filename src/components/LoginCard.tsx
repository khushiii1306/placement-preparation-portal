import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { UserRole } from '../types';
import { getCollegeByEmail, getCollegesList } from '../utils/collegeStorage';
import { authenticateWithRole } from '../utils/rbac';
import { getRegisteredStudentsList } from '../utils/studentStorage';

interface LoginCardProps {
  onLoginSuccess: (email: string, role?: UserRole, collegeData?: any, noticeMsg?: string) => void;
  onOpenForgotPassword: (currentEmail: string) => void;
  onSwitchToRegister: () => void;
  onSwitchToCollegeRegister?: () => void;
  initialRole?: UserRole;
  initialErrorMsg?: string;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  onLoginSuccess,
  onOpenForgotPassword,
  onSwitchToRegister,
  onSwitchToCollegeRegister,
  initialRole = 'student',
  initialErrorMsg = '',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('rahul@arkajainuniversity.ac.in');
  const [password, setPassword] = useState('aju@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg);
  const [pendingWarning, setPendingWarning] = useState<string | null>(null);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    setPendingWarning(null);

    if (role === 'student') {
      setEmail('rahul@arkajainuniversity.ac.in');
      setPassword('aju@2026');
    } else if (role === 'college') {
      setEmail('placement@arkajainuniversity.ac.in');
      setPassword('aju@2026');
    } else if (role === 'admin') {
      setEmail('admin@placement.edu');
      setPassword('admin@2026');
    }
  };

  // Sync initialRole ONLY when the prop changes from outside
  const prevInitialRoleRef = React.useRef(initialRole);
  React.useEffect(() => {
    if (initialRole && initialRole !== prevInitialRoleRef.current) {
      prevInitialRoleRef.current = initialRole;
      handleRoleChange(initialRole as UserRole);
    }
  }, [initialRole]);

  // Sync initialErrorMsg if changed
  React.useEffect(() => {
    if (initialErrorMsg) {
      setErrorMsg(initialErrorMsg);
    }
  }, [initialErrorMsg]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg(
        selectedRole === 'college'
          ? 'Please enter your official university/college email.'
          : selectedRole === 'admin'
          ? 'Please enter your administrator email.'
          : 'Please enter your email or portal ID.'
      );
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg('');
    setPendingWarning(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Enforce strict Role-Based Authentication verification (email + password + stored role)
      const authResult = authenticateWithRole(cleanEmail, password, selectedRole);

      if (!authResult.success) {
        setErrorMsg(
          authResult.error || 'Account not found. Please create an account first.'
        );
        return;
      }

      // If user credentials belonged to a non-ADMIN stored role, redirect them to their own dashboard!
      if (authResult.redirected && authResult.redirectedToRole) {
        if (authResult.redirectedToRole === 'student') {
          onLoginSuccess(cleanEmail, 'student', undefined, authResult.message);
        } else if (authResult.redirectedToRole === 'college') {
          const colData = authResult.collegeData || getCollegeByEmail(cleanEmail);
          onLoginSuccess(cleanEmail, 'college', colData, authResult.message);
        } else if (authResult.redirectedToRole === 'admin') {
          onLoginSuccess(cleanEmail, 'admin', undefined, authResult.message);
        }
        return;
      }

      if (selectedRole === 'college') {
        const foundCollege = getCollegeByEmail(cleanEmail);
        onLoginSuccess(cleanEmail, 'college', foundCollege);
      } else if (selectedRole === 'admin') {
        onLoginSuccess(cleanEmail, 'admin');
      } else {
        // Student login
        onLoginSuccess(cleanEmail, 'student');
      }
    }, 350);
  };

  return (
    <motion.div
      id="login-card-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5 text-slate-900"
    >
      {/* 3 ROLE SELECTOR BAR: [ Student ] [ College / University ] [ Admin ] */}
      <div className="mb-6">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 text-center">
          Select Login Role
        </label>
        <div
          id="role-selection-tabs"
          className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/80"
        >
          <button
            type="button"
            id="role-select-student"
            onClick={() => handleRoleChange('student')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'student'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className="h-4 w-4 mb-0.5" />
            <span>Student</span>
          </button>

          <button
            type="button"
            id="role-select-college"
            onClick={() => handleRoleChange('college')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'college'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="h-4 w-4 mb-0.5" />
            <span>College Admin</span>
          </button>

          <button
            type="button"
            id="role-select-admin"
            onClick={() => handleRoleChange('admin')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-white text-purple-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="h-4 w-4 mb-0.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-1.5 rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 flex-shrink-0" />
          <span className="font-semibold text-slate-800">Demo Fill:</span>
        </div>

        {selectedRole === 'student' && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setEmail('rahul@arkajainuniversity.ac.in');
                setPassword('aju@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-indigo-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Rahul (Arka Jain)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('priya@arkajainuniversity.ac.in');
                setPassword('placement@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-slate-700 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Priya
            </button>
          </div>
        )}

        {selectedRole === 'college' && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setEmail('placement@arkajainuniversity.ac.in');
                setPassword('aju@2026');
                setErrorMsg('');
                setPendingWarning(null);
              }}
              className="rounded-md bg-blue-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Arka Jain (Approved)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@xaviertech.edu');
                setPassword('xavier@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-amber-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-amber-700 transition-colors cursor-pointer"
            >
              St. Xavier (Pending)
            </button>
          </div>
        )}

        {selectedRole === 'admin' && (
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setEmail('khushiii1306@gmail.com');
                setPassword('placement@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-purple-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Owner (ADMIN)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@placement.edu');
                setPassword('admin@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-purple-800 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-purple-900 transition-colors cursor-pointer"
            >
              Board Admin (ADMIN)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('rahul@arkajainuniversity.ac.in');
                setPassword('aju@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-indigo-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
              title="Test Student redirection when logging in via Admin portal"
            >
              Test Student Redirect
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('placement@arkajainuniversity.ac.in');
                setPassword('aju@2026');
                setErrorMsg('');
              }}
              className="rounded-md bg-blue-600 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
              title="Test College redirection when logging in via Admin portal"
            >
              Test College Redirect
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Role-Specific Login Form with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRole}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Role-Specific Branding Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${
                selectedRole === 'college'
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-600 shadow-blue-600/30'
                  : selectedRole === 'admin'
                  ? 'bg-gradient-to-tr from-purple-700 to-indigo-700 shadow-purple-600/30'
                  : 'bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-indigo-600/30'
              }`}
            >
              {selectedRole === 'college' ? (
                <Building2 className="h-6 w-6" />
              ) : selectedRole === 'admin' ? (
                <ShieldCheck className="h-6 w-6" />
              ) : (
                <GraduationCap className="h-6 w-6" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                {selectedRole === 'college'
                  ? 'College Admin Login'
                  : selectedRole === 'admin'
                  ? 'Admin Login'
                  : 'Student Login'}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                {selectedRole === 'college'
                  ? 'Placement Cell & Corporate Relations'
                  : selectedRole === 'admin'
                  ? 'Central Placement Governance'
                  : 'Training & Placement Preparation Portal'}
              </p>
            </div>
          </div>

          {/* Pending Warning Banner */}
          {pendingWarning && (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-950">Approval Required</p>
                <p className="mt-0.5 leading-relaxed">{pendingWarning}</p>
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className="mt-2 inline-flex items-center gap-1 rounded bg-amber-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-amber-700"
                >
                  Switch to Admin Portal to Approve
                </button>
              </div>
            </div>
          )}

          {/* Admin Role Strict Verification Guidance */}
          {selectedRole === 'admin' && !errorMsg && (
            <div className="mb-4 rounded-xl border border-purple-200 bg-purple-50/70 p-3 text-[11px] text-purple-900 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-purple-950">Strict Admin Authentication: </span>
                <span>Access is strictly restricted to accounts whose stored role is &quot;ADMIN&quot;. Non-ADMIN accounts (Students and Colleges) will be verified and redirected to their respective dashboards.</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {errorMsg}
            </div>
          )}

          {/* Role-Specific Form Container */}
          <form
            id={`${selectedRole}-login-form`}
            onSubmit={handleLoginSubmit}
            className="space-y-4"
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                {selectedRole === 'college'
                  ? 'College Admin Email'
                  : selectedRole === 'admin'
                  ? 'Administrator Email'
                  : 'Student Email / College ID'}
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'college'
                      ? 'placement@arkajainuniversity.ac.in'
                      : selectedRole === 'admin'
                      ? 'admin@placement.edu'
                      : 'rahul@arkajainuniversity.ac.in'
                  }
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                />
                <button
                  id="toggle-password-visibility-btn"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label
                htmlFor="remember-me"
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-600">Remember Me</span>
              </label>

              <button
                id="forgot-password-link"
                type="button"
                onClick={() => onOpenForgotPassword(email)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none cursor-pointer transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Action Button: [ Login ] */}
            <div className="pt-2">
              <motion.button
                id="login-button"
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`group relative flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-md transition-all cursor-pointer ${
                  selectedRole === 'college'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                    : selectedRole === 'admin'
                    ? 'bg-purple-700 hover:bg-purple-800 shadow-purple-700/25'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
                }`}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>
                      Authenticating{' '}
                      {selectedRole === 'college'
                        ? 'College Admin'
                        : selectedRole === 'admin'
                        ? 'Admin'
                        : 'Student'}
                      ...
                    </span>
                  </span>
                ) : (
                  <>
                    <span>
                      {selectedRole === 'college'
                        ? 'Login as College Admin'
                        : selectedRole === 'admin'
                        ? 'Login as Admin'
                        : 'Login as Student'}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Separated Links for College vs Student */}
          {selectedRole === 'college' ? (
            <div className="mt-6 border-t border-slate-100 pt-4 text-center space-y-2">
              <p className="text-xs text-slate-500">New university or college?</p>
              <button
                id="register-institution-link"
                type="button"
                onClick={onSwitchToCollegeRegister || onSwitchToRegister}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Register your Institution</span>
              </button>
            </div>
          ) : selectedRole === 'student' ? (
            <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-500">
              Don&apos;t have a student account?{' '}
              <button
                id="create-student-account-link"
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none cursor-pointer"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
              Placement Board Administrative Access (Restricted)
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
