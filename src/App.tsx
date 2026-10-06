import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplitHero } from './components/SplitHero';
import { LoginCard } from './components/LoginCard';
import { StudentRegistrationCard } from './components/StudentRegistrationCard';
import { CollegeRegistrationCard } from './components/CollegeRegistrationCard';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { StudentDashboard } from './components/StudentDashboard';
import { SidebarSection } from './components/Sidebar';
import { AdminDashboard, AdminSidebarItem } from './components/AdminDashboard';
import { CollegeDashboard } from './components/CollegeDashboard';
import { PublicLandingPage } from './components/PublicLandingPage';
import { ArrowLeft, ShieldAlert, X } from 'lucide-react';
import { getStudentProfile } from './utils/studentStorage';
import { getCollegesList } from './utils/collegeStorage';
import { UserRole } from './types';
import {
  getAuthSession,
  saveAuthSession,
  clearAuthSession,
  verifyAdminAuthorization,
  isAdminAccount,
  getAccountStoredRole,
} from './utils/rbac';

export type AppView = 'landing' | 'auth' | 'student' | 'admin' | 'college';

export default function App() {
  // Navigation & Authentication state
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [authView, setAuthView] = useState<'login' | 'register' | 'college-register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('student');
  const [authErrorMsg, setAuthErrorMsg] = useState<string>('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);
  const [studentInitialSection, setStudentInitialSection] = useState<SidebarSection>('Dashboard');
  const [adminInitialSection, setAdminInitialSection] = useState<AdminSidebarItem>('Dashboard');

  // Security Toast State for RBAC Interception
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // College Context State
  const [currentCollegeId, setCurrentCollegeId] = useState<string | undefined>(undefined);

  // Student Profile State
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
 const [collegeName, setCollegeName] = useState<string>('');
  const [branch, setBranch] = useState<string>('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState<string>('4th Year (Final Year)');

  const showSecurityNotice = useCallback((message: string) => {
    setSecurityAlert(message);
    setTimeout(() => {
      setSecurityAlert((curr) => (curr === message ? null : curr));
    }, 5500);
  }, []);

  // Map Admin URL Sub-path to AdminSidebarItem
  const parseAdminSection = (pathname: string): AdminSidebarItem => {
    const lower = pathname.toLowerCase();
    if (lower.includes('/admin/students')) return 'Students';
    if (lower.includes('/admin/companies')) return 'Companies';
    if (lower.includes('/admin/results')) return 'Results';
    if (lower.includes('/admin/colleges') || lower.includes('/admin/manage-colleges')) return 'Manage Colleges';
    if (lower.includes('/admin/questions')) return 'Questions';
    if (lower.includes('/admin/mock-tests')) return 'Mock Tests';
    if (lower.includes('/admin/events')) return 'Events';
    return 'Dashboard';
  };

  /**
   * Route Guard & RBAC URL Evaluator
   * Enforces Rule 1, 2, 3, 5:
   * Direct URL access to /admin, /admin/dashboard, /admin/students, /admin/companies, /admin/results
   * is strictly forbidden for non-admins.
   */
  const evaluateRoute = useCallback((pathname: string) => {
    const session = getAuthSession();
    const effectiveRole: UserRole = session ? session.role : userRole;
    const effectiveLoggedIn = !!session || isLoggedIn;

    const normalized = pathname.toLowerCase();
    const isAdminPath = normalized === '/admin' || normalized.startsWith('/admin/') || normalized.startsWith('/admin?');

    if (isAdminPath) {
      const storedRole = session?.email ? getAccountStoredRole(session.email) : null;

      // 1. If student tries to access admin route, redirect to Student Dashboard
      if (effectiveLoggedIn && (effectiveRole === 'student' || storedRole === 'STUDENT')) {
        window.history.replaceState(null, '', '/dashboard');
        setCurrentView('student');
        showSecurityNotice('Access denied. Non-ADMIN accounts cannot access the Admin Dashboard. Redirected to your Student Dashboard.');
        return;
      }

      // 2. If college user tries to access admin route, redirect to College Dashboard
      if (effectiveLoggedIn && (effectiveRole === 'college' || storedRole === 'COLLEGE')) {
        window.history.replaceState(null, '', '/college');
        setCurrentView('college');
        showSecurityNotice('Access denied. Non-ADMIN accounts cannot access the Admin Dashboard. Redirected to your College Dashboard.');
        return;
      }

      // 3. If genuine ADMIN: ONLY allowed if stored role is strictly 'ADMIN' and authorized
      if (effectiveLoggedIn && effectiveRole === 'admin' && storedRole === 'ADMIN' && verifyAdminAuthorization(session)) {
        const targetSection = parseAdminSection(normalized);
        setAdminInitialSection(targetSection);
        setCurrentView('admin');
        return;
      }

      // 4. If not logged in as Admin with stored role ADMIN, redirect to Login with Admin role selected & error
      window.history.replaceState(null, '', '/login');
      setCurrentView('auth');
      setAuthView('login');
      setAuthInitialRole('admin');
      setAuthErrorMsg('Access denied. Admin Dashboard requires an account whose stored role is "ADMIN".');
      return;
    }

    if (normalized === '/dashboard' || normalized === '/student') {
      if (effectiveLoggedIn && effectiveRole === 'student') {
        setCurrentView('student');
      } else if (effectiveLoggedIn && effectiveRole === 'college') {
        setCurrentView('college');
      } else if (effectiveLoggedIn && effectiveRole === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('landing');
      }
      return;
    }

    if (normalized === '/college') {
      if (effectiveLoggedIn && effectiveRole === 'college') {
        setCurrentView('college');
      } else if (effectiveLoggedIn && effectiveRole === 'student') {
        setCurrentView('student');
      } else if (effectiveLoggedIn && effectiveRole === 'admin') {
        setCurrentView('admin');
      } else {
        setAuthInitialRole('college');
        setAuthView('login');
        setCurrentView('auth');
      }
      return;
    }

    if (normalized === '/login') {
      setCurrentView('auth');
      setAuthView('login');
      return;
    }

    if (normalized === '/register') {
      setCurrentView('auth');
      setAuthView('register');
      return;
    }

    if (normalized === '/college-register') {
      setCurrentView('auth');
      setAuthView('college-register');
      return;
    }

    // Default to Landing
    if (normalized === '/' || normalized === '') {
      setCurrentView('landing');
    }
  }, [isLoggedIn, userRole, showSecurityNotice]);

  // Initial mount: load persistent session and evaluate initial URL
  useEffect(() => {
    const session = getAuthSession();
    if (session) {
      setIsLoggedIn(true);
      setUserRole(session.role);
      setUserEmail(session.email);

      if (session.role === 'college') {
        setCurrentCollegeId(session.collegeId);
      } else if (session.role === 'student') {
        const savedProfile = getStudentProfile(session.email);
        if (savedProfile) {
          setUserName(savedProfile.fullName);
          setCollegeName(savedProfile.collegeName);
          setBranch(savedProfile.branch);
          setAcademicYear(savedProfile.academicYear);
          setCurrentCollegeId(savedProfile.collegeId);
        }
      }
    }

    evaluateRoute(window.location.pathname);

    // Listen to browser forward/back buttons
    const handlePopState = () => {
      evaluateRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [evaluateRoute]);

  // Handle successful login
  const handleLoginSuccess = (email: string, role?: UserRole, collegeData?: any, noticeMsg?: string) => {
    const validEmail = email.trim().toLowerCase();
    setUserEmail(validEmail);
    setAuthErrorMsg('');

    if (noticeMsg) {
      showSecurityNotice(noticeMsg);
    }

    const storedRole = getAccountStoredRole(validEmail);

    if (role === 'admin') {
      // Must verify that this account's stored role is "ADMIN"
      if (storedRole !== 'ADMIN') {
        if (storedRole === 'COLLEGE') {
          showSecurityNotice('Access denied to Admin Dashboard. Redirected to your College Dashboard.');
          const colId = collegeData?.id;
          setCurrentCollegeId(colId);
          setUserRole('college');
          setIsLoggedIn(true);
          window.history.pushState(null, '', '/college');
          setCurrentView('college');
          return;
        } else {
          showSecurityNotice('Access denied to Admin Dashboard. Redirected to your Student Dashboard.');
          setUserRole('student');
          setIsLoggedIn(true);
          window.history.pushState(null, '', '/dashboard');
          setCurrentView('student');
          return;
        }
      }

      // Authenticated genuine admin whose stored role is "ADMIN"
      setUserRole('admin');
      setIsLoggedIn(true);
      window.history.pushState(null, '', '/admin');
      setCurrentView('admin');
    } else if (role === 'college') {
      const colId = collegeData?.id;
      setCurrentCollegeId(colId);
      setUserRole('college');
      setIsLoggedIn(true);
      window.history.pushState(null, '', '/college');
      setCurrentView('college');
    } else {
      // Student login
      const savedProfile = getStudentProfile(validEmail);
      if (savedProfile) {
        setUserName(savedProfile.fullName);
        setCollegeName(savedProfile.collegeName);
        setBranch(savedProfile.branch);
        setAcademicYear(savedProfile.academicYear);
        if (savedProfile.collegeId) {
          setCurrentCollegeId(savedProfile.collegeId);
        }
      }
      setUserRole('student');
      setIsLoggedIn(true);
      window.history.pushState(null, '', '/dashboard');
      setCurrentView('student');
    }
  };

  // Handle registration success (creates student account)
  const handleRegisterSuccess = (data: {
    fullName: string;
    email: string;
    collegeName: string;
    branch: string;
    academicYear: string;
    collegeId?: string;
  }) => {
    setUserName(data.fullName);
    setUserEmail(data.email);
    setCollegeName(data.collegeName);
    setBranch(data.branch);
    setAcademicYear(data.academicYear);
    setCurrentCollegeId(data.collegeId);

    saveAuthSession({
      email: data.email,
      role: 'student',
      name: data.fullName,
      collegeId: data.collegeId,
      token: `student_token_${Date.now()}`,
      loginTime: Date.now(),
    });

    setIsLoggedIn(true);
    setUserRole('student');
    window.history.pushState(null, '', '/dashboard');
    setCurrentView('student');
  };

  // Handle Logout
  const handleLogout = () => {
    clearAuthSession();
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setCollegeName('');
    setCurrentCollegeId(undefined);
    setUserRole('student');
    window.history.pushState(null, '', '/');
    setCurrentView('landing');
  };

  // Admin Section Navigation Handler (updates URL to /admin/section)
  const handleAdminSectionChange = (section: AdminSidebarItem) => {
    let sub = '';
    if (section === 'Students') sub = '/students';
    else if (section === 'Companies') sub = '/companies';
    else if (section === 'Results') sub = '/results';
    else if (section === 'Manage Colleges') sub = '/colleges';
    else if (section === 'Questions') sub = '/questions';
    else if (section === 'Mock Tests') sub = '/mock-tests';
    else if (section === 'Events') sub = '/events';
    else sub = '/dashboard';

    window.history.pushState(null, '', `/admin${sub}`);
    setAdminInitialSection(section);
  };

  return (
    <>
      {/* RBAC Security Interception Notice Toast */}
      <AnimatePresence>
        {securityAlert && (
          <motion.div
            id="rbac-security-alert-toast"
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 shadow-lg shadow-rose-900/10 text-rose-900 max-w-md w-[92%]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-rose-950">Security Notice: Access Restricted</p>
              <p className="text-rose-700 mt-0.5">{securityAlert}</p>
            </div>
            <button
              type="button"
              onClick={() => setSecurityAlert(null)}
              className="text-rose-500 hover:text-rose-700 transition-colors p-1"
              aria-label="Close alert"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. PUBLIC LANDING PAGE (First view shown when user opens site) */}
      {currentView === 'landing' && (
        <PublicLandingPage
          onNavigateLogin={() => {
            setAuthInitialRole('student');
            setAuthView('login');
            window.history.pushState(null, '', '/login');
            setCurrentView('auth');
          }}
          onNavigateRegister={() => {
            setAuthView('register');
            window.history.pushState(null, '', '/register');
            setCurrentView('auth');
          }}
          isLoggedIn={isLoggedIn}
          onGoToDashboard={(section?: string) => {
            if (section) {
              setStudentInitialSection(section as SidebarSection);
            }
            if (userRole === 'admin' && verifyAdminAuthorization()) {
              window.history.pushState(null, '', '/admin');
              setCurrentView('admin');
            } else if (userRole === 'college') {
              window.history.pushState(null, '', '/college');
              setCurrentView('college');
            } else {
              window.history.pushState(null, '', '/dashboard');
              setCurrentView('student');
            }
          }}
          onNavigateAdmin={() => {
            // Check if user is already authenticated as admin
            if (isLoggedIn && userRole === 'admin' && verifyAdminAuthorization()) {
              window.history.pushState(null, '', '/admin');
              setCurrentView('admin');
            } else if (isLoggedIn && userRole === 'student') {
              // Student cannot access admin
              showSecurityNotice('Access denied. Only administrators can access the Admin Portal.');
              window.history.pushState(null, '', '/dashboard');
              setCurrentView('student');
            } else if (isLoggedIn && userRole === 'college') {
              // College cannot access admin
              showSecurityNotice('Access denied. Only administrators can access the Admin Portal.');
              window.history.pushState(null, '', '/college');
              setCurrentView('college');
            } else {
              // Direct unauthenticated user to Admin Login tab
              setAuthInitialRole('admin');
              setAuthView('login');
              setAuthErrorMsg('');
              window.history.pushState(null, '', '/login');
              setCurrentView('auth');
            }
          }}
        />
      )}

      {/* 2. ADMIN PORTAL (Accessible ONLY for role === "ADMIN") */}
      {currentView === 'admin' && isLoggedIn && userRole === 'admin' && verifyAdminAuthorization() && (
        <div className="min-h-screen bg-slate-50">
          <AdminDashboard
            onLogout={handleLogout}
            onSwitchToStudent={() => {
              window.history.pushState(null, '', '/dashboard');
              setCurrentView('student');
            }}
            onRedirectToCollege={() => {
              window.history.pushState(null, '', '/college');
              setCurrentView('college');
            }}
            initialSection={adminInitialSection}
            onSectionChange={handleAdminSectionChange}
          />
        </div>
      )}

      {/* 3. COLLEGE / UNIVERSITY PORTAL (Institution & Placement Cell Management) */}
      {currentView === 'college' && isLoggedIn && userRole === 'college' && currentCollegeId && (
        <div className="min-h-screen bg-slate-50">
          <CollegeDashboard
            collegeId={currentCollegeId}
            onLogout={handleLogout}
            onSwitchView={(v) => {
              if (v === 'landing') {
                window.history.pushState(null, '', '/');
                setCurrentView('landing');
              } else if (v === 'student') {
                window.history.pushState(null, '', '/dashboard');
                setCurrentView('student');
              }
            }}
          />
        </div>
      )}

      {/* 4. STUDENT PORTAL (Strictly NO Admin links visible in Student UI) */}
      {currentView === 'student' && (
        <div className="min-h-screen bg-slate-50">
          <StudentDashboard
            userEmail={userEmail}
            userName={userName}
            collegeName={collegeName}
            collegeId={currentCollegeId}
            branch={branch}
            academicYear={academicYear}
            onLogout={handleLogout}
            initialSection={studentInitialSection}
          />
        </div>
      )}

      {/* 5. AUTH VIEW (Login and Registration Cards with SplitHero) */}
      {currentView === 'auth' && (
        <div className="relative min-h-screen w-full bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-indigo-600 selection:text-white">
          {/* Top Demo View Selector Bar with Back to Home button */}
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-2.5 text-xs backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                window.history.pushState(null, '', '/');
                setCurrentView('landing');
              }}
              className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  id="nav-to-register-tab"
                  type="button"
                  onClick={() => {
                    setAuthView('register');
                    window.history.pushState(null, '', '/register');
                  }}
                  className={`rounded-lg px-2.5 sm:px-3 py-1 font-semibold transition-all cursor-pointer text-xs ${
                    authView === 'register'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student Register
                </button>
                <button
                  id="nav-to-college-register-tab"
                  type="button"
                  onClick={() => {
                    setAuthView('college-register');
                    window.history.pushState(null, '', '/college-register');
                  }}
                  className={`rounded-lg px-2.5 sm:px-3 py-1 font-semibold transition-all cursor-pointer text-xs ${
                    authView === 'college-register'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  College Register
                </button>
                <button
                  id="nav-to-login-tab"
                  type="button"
                  onClick={() => {
                    setAuthView('login');
                    window.history.pushState(null, '', '/login');
                  }}
                  className={`rounded-lg px-2.5 sm:px-3 py-1 font-semibold transition-all cursor-pointer text-xs ${
                    authView === 'login'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Portal Login
                </button>
              </div>
            </div>
          </div>

          <div className="grid min-h-[calc(100vh-49px)] grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Placement Career Illustration, Headline & Highlights */}
            <div className="lg:col-span-6 xl:col-span-6 flex">
              <SplitHero />
            </div>

            {/* Right Side: Centered Registration / Login Card */}
            <div
              id="auth-pane"
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center bg-slate-50/70 p-4 sm:p-8 lg:p-10 xl:p-12 overflow-y-auto"
            >
              <div className="w-full max-w-xl flex flex-col items-center my-auto py-6">
                <AnimatePresence mode="wait">
                  {authView === 'register' && (
                    <StudentRegistrationCard
                      key="student-registration-card"
                      onSwitchToLogin={() => {
                        setAuthInitialRole('student');
                        setAuthView('login');
                        window.history.pushState(null, '', '/login');
                      }}
                      onRegisterSuccess={handleRegisterSuccess}
                    />
                  )}

                  {authView === 'college-register' && (
                    <CollegeRegistrationCard
                      key="college-registration-card"
                      onSwitchToLogin={() => {
                        setAuthInitialRole('college');
                        setAuthView('login');
                        window.history.pushState(null, '', '/login');
                      }}
                      onRegisterSuccess={() => {
                        setAuthInitialRole('college');
                        setAuthView('login');
                        window.history.pushState(null, '', '/login');
                      }}
                    />
                  )}

                  {authView === 'login' && (
                    <LoginCard
                      key="login-card"
                      initialRole={authInitialRole}
                      initialErrorMsg={authErrorMsg}
                      onLoginSuccess={handleLoginSuccess}
                      onOpenForgotPassword={(email) => {
                        setUserEmail(email);
                        setForgotPasswordOpen(true);
                      }}
                      onSwitchToRegister={() => {
                        setAuthView('register');
                        window.history.pushState(null, '', '/register');
                      }}
                      onSwitchToCollegeRegister={() => {
                        setAuthView('college-register');
                        window.history.pushState(null, '', '/college-register');
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Quick Portal Assurance Note */}
                <div className="mt-5 text-center">
                  <p className="text-xs text-slate-400">
                    Placement Preparation Portal • Empowering College Students for Dream Careers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forgot Password Modal */}
          <ForgotPasswordModal
            isOpen={forgotPasswordOpen}
            defaultEmail={userEmail}
            onClose={() => setForgotPasswordOpen(false)}
          />
        </div>
      )}
    </>
  );
}
