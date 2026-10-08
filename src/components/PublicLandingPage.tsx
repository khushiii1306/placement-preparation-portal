import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Calculator,
  Code2,
  FileCheck,
  Building2,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  ShieldCheck,
  Users,
  Compass,
  Zap,
  Target,
  ChevronRight,
  BookOpen,
  Send,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Flame,
  Check,
  Play,
  BarChart2,
} from 'lucide-react';
import { COMPANY_PREP_DATA, CompanyPreparationDetail } from '../data/companyPrepData';
import { PlacementHub3D } from './PlacementHub3D';
import { CompanyLogosMarquee } from './CompanyLogosMarquee';
import { CompanyPrepModal } from './CompanyPrepModal';

interface PublicLandingPageProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  isLoggedIn?: boolean;
  onGoToDashboard?: (section?: string) => void;
  onNavigateAdmin?: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onNavigateLogin,
  onNavigateRegister,
  isLoggedIn = false,
  onGoToDashboard,
  onNavigateAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState<CompanyPreparationDetail | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', department: 'Computer Science & Engineering', message: '' });
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCompany = (companyId: string) => {
    const found = COMPANY_PREP_DATA.find((c) => c.id === companyId);
    if (found) {
      setSelectedCompanyModal(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* =========================================================================
          1. PREMIUM STICKY NAVBAR (DARK THEME)
          Logo, Home, About, Features, Companies, Events, Contact, Login, Create Account
          Strictly NO Admin Portal link. Clean, responsive, royal-blue hover effects.
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full border-b border-indigo-900/60 bg-[#0a0e27]/90 backdrop-blur-md shadow-lg shadow-black/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 text-white font-black shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[11px] font-black uppercase tracking-wider text-blue-400">
                Placement Cell Portal
              </span>
              <span className="block text-sm sm:text-base font-extrabold text-white tracking-tight">
                PlacementHub
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-bold text-slate-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('arena')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Preparation
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('companies')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Companies
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
          </nav>

          {/* Auth Action Buttons: Login, Create Account */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoggedIn && onGoToDashboard ? (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="rounded-xl border border-indigo-900/80 bg-[#0e1738] px-4 py-2 text-xs font-bold text-slate-200 hover:text-white hover:border-blue-400/60 hover:bg-[#15204c] transition-all cursor-pointer"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] hover:shadow-blue-500/50 hover:opacity-95 transition-all cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>Create Account</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-blue-200" />
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-indigo-900/60 bg-[#0c1033] px-4 pt-2 pb-6 sm:hidden space-y-3"
            >
              <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-300">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('arena')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  Placement Arena
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('companies')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  Companies
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left py-1.5 hover:text-blue-400"
                >
                  How It Works
                </button>
              </nav>

              <div className="pt-4 border-t border-indigo-900/60 flex flex-col gap-2">
                {isLoggedIn && onGoToDashboard ? (
                  <button
                    type="button"
                    onClick={onGoToDashboard}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-center text-xs font-black text-white shadow-md shadow-blue-600/30"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateLogin();
                      }}
                      className="w-full rounded-xl border border-indigo-900/80 bg-[#0e1738] py-2.5 text-center text-xs font-bold text-slate-200"
                    >
                      Login to Student Portal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateRegister();
                      }}
                      className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-center text-xs font-black text-white shadow-lg shadow-blue-600/30"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          2. HERO SECTION (DARK THEME)
          Heading: "Prepare Smarter. Get Placement Ready."
          Supporting text: "Practice aptitude, improve coding skills, take mock tests and track your placement preparation — all in one place."
          Center: Large 3D laptop/dashboard visual with floating cards (No brain)
          Buttons: Start Preparing (Royal Blue) & Explore Platform (Transparent dark indigo with white border)
          Trending Preparation chips
         ========================================================================= */}
      <section
        id="hero"
        className="order-1 relative overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#0d1238] to-[#0f1742] text-white pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-indigo-900/60"
      >
        {/* Soft Blue Ambient Glow Spheres */}
        <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 -bottom-20 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Centered Header Block */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-[#0e1738]/90 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md shadow-lg shadow-blue-500/10">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              <span>Campus Placement Ecosystem 2026</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-200 font-bold">100% Free for Students</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Prepare Smarter.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">
                Get Placement Ready.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Practice aptitude, improve coding skills, take mock tests and track your placement preparation — all in one place.
            </p>
          </div>

          {/* CENTER: Large Visually Impressive 3D Placement Hub Scene (Laptop with Floating Cards) */}
          <div className="my-3 sm:my-5">
            <PlacementHub3D />
          </div>

          {/* Action CTAs: Start Preparing & Explore Platform */}
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-8 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Start Preparing</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-[#0e1738]/80 px-7 py-3.5 text-sm font-bold text-white hover:bg-[#15204c] hover:border-blue-400 hover:text-blue-300 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Explore Platform</span>
              </button>
            </div>

            {/* Trending Preparation Chips */}
            <div className="pt-2 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Flame className="h-4 w-4 text-blue-400" />
                <span>Trending Preparation:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
                {[
                  { label: 'TCS', action: () => handleOpenCompany('tcs') },
                  { label: 'Infosys', action: () => handleOpenCompany('infosys') },
                  { label: 'Accenture', action: () => handleOpenCompany('accenture') },
                  { label: 'Aptitude', action: () => scrollToSection('arena') },
                  { label: 'Coding', action: () => scrollToSection('arena') },
                  { label: 'Mock Tests', action: () => scrollToSection('arena') },
                  { label: 'Interview Preparation', action: () => scrollToSection('features') },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={chip.action}
                    className="rounded-full border border-indigo-800/80 bg-[#0e1738] px-3.5 py-1.5 text-xs font-semibold text-blue-200 hover:border-blue-500 hover:bg-blue-900/40 hover:text-white hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Highlights Metrics Bar */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738]/90 p-5 backdrop-blur-md shadow-xl grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-indigo-900/60">
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-white">450+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Campus Recruiters</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">94.6%</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Placement Rate</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-indigo-300">1,500+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Practice Questions</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">₹12.4 LPA</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Average Package</div>
              </div>
              <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-blue-300">65+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Proctored Mocks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT SECTION (DARK THEME)
          Institutional Career Development & Centralized Preparation
         ========================================================================= */}
      <section id="about" className="order-2 py-12 sm:py-16 bg-[#0c1033] border-b border-indigo-900/60 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              Institutional Career Development
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              About PlacementHub
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              PlacementHub is the campus Training & Placement Cell&apos;s centralized digital ecosystem.
              Designed specifically for engineering and college graduates, it bridges the gap between classroom academics and
              rigorous corporate hiring requirements across Fortune 500 and top technology recruiters.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 space-y-3 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 shadow-md">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Curriculum-Aligned Assessments</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Structured learning pathways covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Data Interpretation tailored to national hiring test patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 space-y-3 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 shadow-md">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Hands-on Technical Preparation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Coding problems ranging from basic programming to complex data structures with algorithmic intuition, complexity breakdowns, and multi-language solutions.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 space-y-3 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-300 shadow-md">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Real-Time Readiness Analytics</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Pinpoint strengths and weak areas across company-specific syllabi, monitor your accuracy curves, and benchmark your progress against college peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURES FOR STUDENTS AND COLLEGES (DARK THEME)
         ========================================================================= */}
      <section id="features" className="order-4 py-12 sm:py-16 bg-[#0e133c] border-b border-indigo-900/60 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              Complete Feature Suite
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Powerful Features for Students &amp; Colleges
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Preparation tools for students and centralized placement resources for colleges and universities.
            </p>
          </div>

          <div className="mt-10 mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-indigo-800/70" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-300">Student Features</h3>
            <span className="h-px flex-1 bg-indigo-800/70" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Aptitude Practice */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Practice &amp; Mock Tests</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Practice Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Interpretation and Coding, then take timed mock tests.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Speed Math</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Blood Relations</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Data Sufficiency</span>
              </div>
            </div>

            {/* 2. Coding Practice */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Coding Practice</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Master essential campus programming problems: Reverse a Number, Palindrome, Primes, Factorial, Sorting, Searching, Arrays, Strings and HashMaps with C++, Java and Python reference code.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Time & Space Analysis</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Test Cases</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Multi-Language</span>
              </div>
            </div>

            {/* 3. Mock Tests */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-300">
                <FileCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Mock Tests</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Experience real recruitment pressure with full-length timed mock tests. Company-specific patterns, sectional timers, question palettes, and instant review dashboards.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">TCS NQT Pattern</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Sectional Cutoffs</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Detailed Analytics</span>
              </div>
            </div>

            {/* 4. Company Preparation */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Company Preparation</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Prepare for company-specific placement processes, aptitude, coding and interview requirements.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Readiness Score</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Interview Tips</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Past Year Papers</span>
              </div>
            </div>

            {/* 5. Progress Tracking */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Progress Tracking</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Track questions attempted, mock test performance, accuracy, coding progress and overall preparation progress.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Overall Readiness</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Historical Scores</span>
                <span className="bg-[#0a0e27] border border-indigo-900/80 px-2 py-0.5 rounded-md">Peer Benchmark</span>
              </div>
            </div>

            {/* 6. Companies & Jobs */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Companies &amp; Jobs</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Explore company and job opportunities, eligibility, required skills, package or stipend details and deadlines.
                </p>
              </div>
            </div>

            {/* 7. Events & Challenges */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Events &amp; Challenges</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Participate in placement-related events, challenges and preparation activities.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-indigo-800/70" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-indigo-300">College / University Features</h3>
            <span className="h-px flex-1 bg-indigo-800/70" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* College Placement Dashboard */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">College Placement Dashboard</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Manage and monitor college-specific placement activities from one centralized dashboard.
                </p>
              </div>
            </div>

            {/* Student Verification */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Student Verification</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Verify registered-college students before providing access to college-specific placement information.
                </p>
              </div>
            </div>

            {/* Placement Drive Management */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Placement Drive Management</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Create and manage drives with company information, eligibility, deadlines and registration links.
                </p>
              </div>
            </div>

            {/* Placement Notices & Updates */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Placement Notices &amp; Updates</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Publish important placement announcements, notices, deadlines and updates for verified students.
                </p>
              </div>
            </div>

            {/* Placement Statistics */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg space-y-4 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                <BarChart2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Placement Statistics</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  View and manage college placement activity and placement-related statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. "PLACEMENT ARENA" SECTION (DARK THEME)
          Signature section: "Placement Arena"
          Subtitle: "Everything you need to prepare for your placement journey."
          Interactive cards: Aptitude Lab, Coding Zone, Company Preparation, Mock Arena, Progress Hub
         ========================================================================= */}
      <section
        id="arena"
        className="order-4 py-16 sm:py-24 bg-[#0a0e27] text-white relative overflow-hidden border-b border-indigo-900/60"
      >
        <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-950/60 px-3 py-1 text-xs font-bold text-blue-300">
                <Zap className="h-3.5 w-3.5 fill-current text-blue-400" />
                <span>The Interactive Training Grounds</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Placement Arena
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Everything you need to prepare for your placement journey. Step into specialized zones engineered to challenge your conceptual speed, technical depth, and test endurance.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateRegister}
              className="self-start md:self-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-600/25 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Enter Arena Now</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Asymmetric Arena Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Zone 1: Aptitude Lab */}
            <div className="lg:col-span-7 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-blue-500/15 border border-blue-400/30 px-3 py-1 text-xs font-bold text-blue-300">
                    Zone 01
                  </span>
                  <span className="text-xs text-blue-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> 1,200+ Practice MCQs
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Aptitude Lab</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Interactive diagnostic drills for Quantitative Formulas, Logical Patterns, Syllogisms, and Sentence Correction with instant formula hints and timed feedback.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-indigo-900/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Quantitative • Logical • Verbal • Data Interpretation</span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('practice')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1 cursor-pointer"
                >
                  Start Drill <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Zone 2: Coding Zone */}
            <div className="lg:col-span-5 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-500/15 border border-indigo-400/30 px-3 py-1 text-xs font-bold text-indigo-300">
                    Zone 02
                  </span>
                  <span className="text-xs text-blue-300 font-bold">C++, Java, Python</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Coding Zone</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    Solve essential DSA questions with problem statements, boundary constraints, and verified reference solutions.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-indigo-900/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">Arrays, Strings, HashMaps, Sorting</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('practice')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1 cursor-pointer"
                >
                  Solve Problems <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Zone 3: Company Preparation */}
            <div className="lg:col-span-4 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 transition-all">
              <div className="space-y-3">
                <span className="rounded-lg bg-blue-500/15 border border-blue-400/30 px-2.5 py-1 text-xs font-bold text-blue-300">
                  Zone 03
                </span>
                <h3 className="text-lg font-black text-white">Company Preparation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recruitment blueprints and past questions for TCS, Infosys, Accenture, Wipro, Deloitte and Cognizant.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-900/60">
                <button
                  type="button"
                  onClick={() => scrollToSection('companies')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1 cursor-pointer"
                >
                  Explore Companies <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Zone 4: Mock Arena */}
            <div className="lg:col-span-4 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 transition-all">
              <div className="space-y-3">
                <span className="rounded-lg bg-indigo-500/15 border border-indigo-400/30 px-2.5 py-1 text-xs font-bold text-indigo-300">
                  Zone 04
                </span>
                <h3 className="text-lg font-black text-white">Mock Arena</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full-length proctored simulations mirroring real campus recruitment assessment platforms with percentile scores.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-900/60">
                <button
                  type="button"
                  onClick={() => scrollToSection('mock-tests')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1 cursor-pointer"
                >
                  Take Simulation <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Zone 5: Progress Hub */}
            <div className="lg:col-span-4 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 transition-all">
              <div className="space-y-3">
                <span className="rounded-lg bg-blue-500/15 border border-blue-400/30 px-2.5 py-1 text-xs font-bold text-blue-300">
                  Zone 05
                </span>
                <h3 className="text-lg font-black text-white">Progress Hub</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Granular analytics calculating your placement readiness index, accuracy curves, and peer percentiles.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-900/60">
                <button
                  type="button"
                  onClick={() => scrollToSection('progress')}
                  className="text-xs font-bold text-blue-400 hover:text-blue-200 flex items-center gap-1 cursor-pointer"
                >
                  View Analytics <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. "PREPARE FOR YOUR DREAM COMPANY" (DARK THEME)
          Animated horizontal logo carousel (two opposing rows)
          TCS, Infosys, Accenture, Wipro, Deloitte, Cognizant, HCLTech, Capgemini
         ========================================================================= */}
      <section id="companies" className="order-5 py-16 sm:py-24 bg-[#0c1136] border-b border-indigo-900/60 overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              Campus Recruiter Alignment
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Prepare for Your Dream Company
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Practice company-specific aptitude, technical MCQ patterns, DSA coding rounds, and interview frameworks used by top tech and consulting firms.
            </p>
          </div>

          {/* Animated Horizontal Auto-Scrolling Company Logo Showcase (Two Opposing Rows) */}
          <div className="mt-10">
            <CompanyLogosMarquee onSelectCompany={handleOpenCompany} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. "TEST YOUR PREPARATION" (MOCK TESTS SECTION)
          Cards: Aptitude Assessment, Coding Assessment, TCS Placement Mock, General Placement Mock
          Questions, Duration, Difficulty, Start Test button
         ========================================================================= */}
      <section id="mock-tests" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
                Proctored Test Simulations
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Test Your Preparation
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Experience the exact interface, time constraints, and scoring metrics of real campus recruitment screening tests.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateRegister}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-200 cursor-pointer transition-colors"
            >
              <span>View All Mock Tests</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Aptitude Assessment',
                category: 'Diagnostic Drill',
                questions: '40 Questions',
                duration: '60 Mins',
                difficulty: 'Medium',
                diffColor: 'text-blue-300 border-blue-500/40 bg-blue-950/60',
                desc: 'Quant arithmetic, logical reasoning puzzles and reading comprehension with sectional timers.',
              },
              {
                title: 'Coding Assessment',
                category: 'Technical DSA',
                questions: '3 Problems',
                duration: '90 Mins',
                difficulty: 'Hard',
                diffColor: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/60',
                desc: 'Algorithmic DSA problems with hidden test cases, memory limits, and optimal complexity checks.',
              },
              {
                title: 'TCS Placement Mock',
                category: 'Company Pattern',
                questions: '80 Questions',
                duration: '120 Mins',
                difficulty: 'Placement Level',
                diffColor: 'text-blue-300 border-blue-500/40 bg-blue-950/60',
                desc: 'Official TCS Ninja & Digital model test format: Foundation section and Advanced coding section.',
              },
              {
                title: 'General Placement Mock',
                category: 'Full Simulation',
                questions: '60 Questions',
                duration: '90 Mins',
                difficulty: 'Moderate',
                diffColor: 'text-blue-300 border-blue-500/40 bg-blue-950/60',
                desc: 'Comprehensive multi-section simulation covering aptitude, verbal, technical MCQs and pseudo-code.',
              },
            ].map((mock) => (
              <div
                key={mock.title}
                className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg flex flex-col justify-between space-y-4 hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      {mock.category}
                    </span>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold ${mock.diffColor}`}>
                      {mock.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {mock.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {mock.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-indigo-900/60 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <FileCheck className="h-3.5 w-3.5 text-blue-400" />
                      <span>{mock.questions}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400" />
                      <span>{mock.duration}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onNavigateRegister}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-xs font-black text-white shadow-md shadow-blue-600/25 hover:shadow-blue-500/40 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. "TRACK YOUR PROGRESS" (PROGRESS SECTION)
          Overall Progress: 64%
          Aptitude: 72%, Reasoning: 68%, Verbal: 75%, Coding: 45%
          Questions Attempted: 240, Mock Tests: 5, Average Score: 78%
         ========================================================================= */}
      <section id="progress" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              Placement Readiness Index
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Track Your Progress
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Granular performance analytics to identify conceptual gaps, monitor speed improvements, and benchmark readiness.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Circular Overall Readiness Card */}
            <div className="lg:col-span-5 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 sm:p-8 shadow-xl flex flex-col items-center text-center space-y-6">
              <div className="relative flex items-center justify-center">
                {/* SVG Radial Progress Gauge */}
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="82"
                    className="text-indigo-950 stroke-current"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="82"
                    className="text-blue-500 stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="14"
                    strokeDasharray="515"
                    strokeDashoffset={515 * (1 - 0.64)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black text-white">64%</span>
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider mt-1">
                    Overall Readiness
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 px-3 py-1 text-xs font-bold text-blue-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>On Track for Campus Recruitment</span>
                </span>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Based on weighted scoring across 240 practice questions and 5 proctored mock assessments.
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-xs font-black text-white shadow-md shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
              >
                Access Detailed Diagnostic Report
              </button>
            </div>

            {/* Right: Domain Breakdown Bars & Summary Stats */}
            <div className="lg:col-span-7 space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-4 text-center">
                  <div className="text-2xl font-black text-white">240</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Questions Solved</div>
                </div>
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-4 text-center">
                  <div className="text-2xl font-black text-blue-400">5</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Mocks Completed</div>
                </div>
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-4 text-center">
                  <div className="text-2xl font-black text-indigo-300">78%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Average Score</div>
                </div>
                <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-4 text-center">
                  <div className="text-2xl font-black text-blue-300">91.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Campus Percentile</div>
                </div>
              </div>

              {/* Progress by Category Bars */}
              <div className="rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-400" />
                  <span>Subject Performance Breakdown</span>
                </h3>

                {[
                  { name: 'Quantitative Aptitude', score: 72, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Logical Reasoning', score: 68, color: 'from-indigo-500 to-blue-400' },
                  { name: 'Verbal Ability', score: 75, color: 'from-blue-400 to-indigo-400' },
                  { name: 'Coding Practice', score: 45, color: 'from-indigo-600 to-blue-500' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-blue-300 font-bold">{item.score}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-indigo-950/80 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. "UPCOMING EVENTS & CHALLENGES" SECTION (DARK THEME)
          Coding Challenge, Quiz, Hiring Challenge, Placement Challenge
          Event date, registration deadline, event type, register button
         ========================================================================= */}
      <section id="events" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
                Live Competitions & Hackathons
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Upcoming Events & Challenges
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Participate in campus coding contests, speed quizzes, and recruiter-sponsored hiring challenges to earn interview fast-tracks.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateRegister}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-200 cursor-pointer transition-colors"
            >
              <span>View All Challenges</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Event 1: Coding Challenge */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 text-[11px] font-bold text-blue-300">
                    Coding Challenge
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
                    <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" /> Live Now
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">National CodeSprint 2026</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  3 Algorithmic coding problems (Arrays, Dynamic Programming, Graphs) evaluated with strict runtime memory benchmarks.
                </p>
                <div className="pt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Event Date:</span>
                    <span className="text-white font-semibold">Mar 24, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reg Deadline:</span>
                    <span className="text-blue-300 font-semibold">Mar 22, 2026</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-xs font-bold text-white hover:opacity-95 transition-all cursor-pointer text-center"
              >
                Register & Participate
              </button>
            </div>

            {/* Event 2: Aptitude Quiz */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-bold text-indigo-300">
                    Speed Quiz
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">In 2 Days</span>
                </div>
                <h3 className="text-base font-bold text-white">Speed Math Blitz Championship</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  50 Fast-paced quantitative and logical questions with leaderboards and certificates for top campus performers.
                </p>
                <div className="pt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Event Date:</span>
                    <span className="text-white font-semibold">Mar 28, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reg Deadline:</span>
                    <span className="text-blue-300 font-semibold">Mar 26, 2026</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full rounded-xl border border-indigo-800 bg-[#0a0e27] py-2.5 text-xs font-bold text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-pointer text-center"
              >
                Register for Quiz
              </button>
            </div>

            {/* Event 3: Hiring Challenge */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 text-[11px] font-bold text-blue-300">
                    Hiring Challenge
                  </span>
                  <span className="text-[11px] font-bold text-blue-400">Direct Shortlist</span>
                </div>
                <h3 className="text-base font-bold text-white">FinTech SDE Hiring Hackathon</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-world backend and microservices problem statement evaluated directly by hiring managers with fast-track interviews.
                </p>
                <div className="pt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Event Date:</span>
                    <span className="text-white font-semibold">Apr 04, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reg Deadline:</span>
                    <span className="text-blue-300 font-semibold">Apr 02, 2026</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-2.5 text-xs font-bold text-white hover:opacity-95 transition-all cursor-pointer text-center"
              >
                View Hiring Challenge
              </button>
            </div>

            {/* Event 4: Placement Challenge */}
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-6 shadow-lg hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-bold text-indigo-300">
                    Placement Challenge
                  </span>
                  <span className="text-[11px] font-bold text-blue-300">All India Rank</span>
                </div>
                <h3 className="text-base font-bold text-white">Mega Mock Placement Olympiad</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  National scale proctored placement simulation mirroring multinational screening criteria with performance percentiles.
                </p>
                <div className="pt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Event Date:</span>
                    <span className="text-white font-semibold">Apr 12, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reg Deadline:</span>
                    <span className="text-blue-300 font-semibold">Apr 10, 2026</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onNavigateRegister}
                className="w-full rounded-xl border border-indigo-800 bg-[#0a0e27] py-2.5 text-xs font-bold text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-pointer text-center"
              >
                Register for Olympiad
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. "HOW IT WORKS" (DARK THEME)
          Create Account -> Practice -> Take Mock Tests -> Track Progress -> Get Placement Ready
         ========================================================================= */}
      <section id="how-it-works" className="order-6 py-16 sm:py-24 bg-[#0c1033] border-b border-indigo-900/60 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
              Structured Roadmap
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              A clear 5-step journey from day-one preparation to campus job offer.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Register with your college credentials, branch, and graduation batch in 30 seconds.',
                icon: GraduationCap,
              },
              {
                step: '02',
                title: 'Practice',
                description: 'Drill quantitative aptitude, logical puzzles, verbal MCQs, and hands-on coding problems.',
                icon: Calculator,
              },
              {
                step: '03',
                title: 'Take Mock Tests',
                description: 'Simulate official recruiting exams with sectional timers, negative marking, and real cutoffs.',
                icon: FileCheck,
              },
              {
                step: '04',
                title: 'Track Progress',
                description: 'Review analytical reports, identify conceptual weak spots, and benchmark peer percentiles.',
                icon: TrendingUp,
              },
              {
                step: '05',
                title: 'Get Placement Ready',
                description: 'Clear the technical and interview screening rounds with complete confidence.',
                icon: Award,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-2xl border border-indigo-900/60 bg-[#0e1738] p-5 shadow-lg relative flex flex-col justify-between space-y-4 hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-blue-500/30 group-hover:text-blue-400/80 transition-colors">
                        {item.step}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. CONTACT & T&P CELL INQUIRIES (DARK THEME)
         ========================================================================= */}
      <section id="contact" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
                  Contact & Assistance
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  Training & Placement Cell Helpline
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Have questions about your placement registration, drive schedules, or portal accounts? Our T&P student coordinators and placement officers are available to assist you.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0e1738] border border-indigo-900/60 text-white">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Placement Office</span>
                    <span className="text-slate-400">Central Academic Block, Level 3, University Campus</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0e1738] border border-indigo-900/60 text-white">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Email Inquiries</span>
                    <span className="text-slate-400">placement.cell@campus.edu • support@prep-portal.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0e1738] border border-indigo-900/60 text-white">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Helpline Hours</span>
                    <span className="text-slate-400">+91 (080) 4567-8900 (Mon - Fri: 9:00 AM - 5:30 PM)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 rounded-3xl border border-indigo-900/60 bg-[#0e1738] p-6 sm:p-8 shadow-xl text-white">
              <h3 className="text-lg font-bold text-white mb-1">Submit an Inquiry or Feedback</h3>
              <p className="text-xs text-slate-400 mb-6">
                Receive prompt guidance from our placement student coordinators.
              </p>

              {contactSubmitted ? (
                <div className="rounded-2xl border border-blue-500/40 bg-blue-950/40 p-6 text-center space-y-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="h-10 w-10 text-blue-400 mx-auto" />
                  <h4 className="text-base font-bold text-blue-200">Inquiry Received!</h4>
                  <p className="text-xs text-blue-300 max-w-md mx-auto">
                    Thank you! Your message has been routed to the Placement Assistance desk. A coordinator will respond to your registered email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Khushi Kumari"
                        className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-[#0c1136]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Student College Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. khushi@student.edu"
                        className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-[#0c1136]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Department / Branch</label>
                    <select
                      value={contactForm.department}
                      onChange={(e) => setContactForm({ ...contactForm, department: e.target.value })}
                      className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400 focus:bg-[#0c1136]"
                    >
                      <option value="Computer Science & Engineering" className="bg-[#0e1738] text-white">Computer Science & Engineering</option>
                      <option value="Information Technology" className="bg-[#0e1738] text-white">Information Technology</option>
                      <option value="Electronics & Communication" className="bg-[#0e1738] text-white">Electronics & Communication</option>
                      <option value="Electrical Engineering" className="bg-[#0e1738] text-white">Electrical Engineering</option>
                      <option value="Mechanical Engineering" className="bg-[#0e1738] text-white">Mechanical Engineering</option>
                      <option value="Civil Engineering" className="bg-[#0e1738] text-white">Civil Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Message or Query Details</label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Specify your question regarding company drives, syllabus or portal access..."
                      className="w-full rounded-xl border border-indigo-900/80 bg-[#0a0e27] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-[#0c1136] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-6 py-2.5 text-xs font-black text-white hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    <Send className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. FINAL CALL TO ACTION (DARK THEME)
          Heading: "Your Placement Journey Starts Here."
          Supporting text: "Build your skills, practice consistently and prepare with confidence."
          Button: "Create Your Free Account" (Royal blue gradient with subtle glow)
         ========================================================================= */}
      <section className="order-7 relative overflow-hidden bg-gradient-to-r from-[#0a0e27] via-[#0f1644] to-[#0a0e27] text-white py-12 sm:py-16 text-center border-b border-indigo-900/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0,transparent_70%)]" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-[#0e1738] px-3.5 py-1 text-xs font-bold text-blue-300 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Join 12,000+ College Candidates Preparing Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Your Placement Journey Starts Here.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Build your skills, practice consistently and prepare with confidence. Sign up in seconds and begin your preparation today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onNavigateRegister}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 px-8 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Create Your Free Account</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={onNavigateLogin}
              className="w-full sm:w-auto rounded-xl border border-indigo-800 bg-[#0e1738]/90 px-6 py-3.5 text-sm font-bold text-white hover:border-blue-400 hover:text-blue-300 transition-all cursor-pointer backdrop-blur-sm"
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. FOOTER (DARKEST INDIGO THEME)
          Clean & professional: Logo, About, Features, Companies, Events, Contact, Login, Register
          Strictly NO Admin link exposed to public users.
         ========================================================================= */}
      <footer className="order-8 bg-[#060919] text-slate-400 border-t border-indigo-950 text-xs py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-indigo-950">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-sm tracking-tight">PlacementHub</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Centralized placement training, aptitude practice, and recruitment readiness platform engineered for college students and campus career development cells.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2.5">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => scrollToSection('hero')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    About Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('features')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Core Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('arena')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Placement Arena
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('companies')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Companies
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    How It Works
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Modules & Tracks */}
            <div className="space-y-2.5">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Preparation Modules</h4>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => scrollToSection('arena')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Quantitative Aptitude
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('arena')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Coding Practice Lab
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('arena')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    TCS & Infosys Mock Tests
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('companies')} className="hover:text-blue-400 transition-colors cursor-pointer">
                    Company Readiness Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Portal Access Info */}
            <div className="space-y-2.5">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Portal Access</h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                Students must sign up using their university email ID. Verification is handled through campus placement records.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="rounded-lg bg-[#0a0e27] border border-indigo-900/80 py-1.5 px-3 text-white hover:bg-[#11183c] hover:border-blue-400/50 text-xs font-semibold cursor-pointer text-center transition-all"
                >
                  Student Login
                </button>
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-1.5 px-3 text-white font-black hover:opacity-95 text-xs cursor-pointer text-center transition-all shadow-md shadow-blue-600/30"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 PlacementHub. All rights reserved. Campus Training & Placement Cell.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Security</span>
              {onNavigateAdmin && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    className="hover:text-blue-400 text-slate-500 cursor-pointer transition-colors"
                  >
                    T&P Admin Portal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Company Preparation Detail & Syllabus Modal */}
      <CompanyPrepModal
        company={selectedCompanyModal}
        onClose={() => setSelectedCompanyModal(null)}
        onStartPreparation={(_companyId) => {
          setSelectedCompanyModal(null);
          if (isLoggedIn && onGoToDashboard) {
            onGoToDashboard('Company Readiness');
          } else {
            onNavigateRegister();
          }
        }}
      />
    </div>
  );
};
