import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, CheckCircle2, GraduationCap, TrendingUp, Users, Sparkles } from 'lucide-react';
import heroIllustration from '../assets/images/placement_career_hero_1789113447994.jpg';

export const SplitHero: React.FC = () => {
  return (
    <div
      id="hero-section"
      className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-8 text-white lg:p-12 xl:p-16"
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Top University Placement Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 p-2.5 backdrop-blur-md ring-1 ring-white/20 shadow-inner">
          <GraduationCap className="h-6 w-6 text-indigo-300" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">
            Campus Career Development Cell
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">
            Placement Preparation Portal
          </h2>
        </div>
      </div>

      {/* Centerpiece: Text & Illustration */}
      <div className="relative z-10 my-8 flex flex-col items-start gap-6 lg:my-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300 animate-pulse" />
            <span>Campus Recruitment Season 2026</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            Prepare Today. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-cyan-200 to-white">
              Get Placed Tomorrow.
            </span>
          </h1>

          <p className="max-w-lg text-base text-slate-300 sm:text-lg font-normal">
            Your complete placement preparation platform.
          </p>
        </motion.div>

        {/* Attractive Placement Illustration Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-800/40 p-2.5 shadow-2xl backdrop-blur-md"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
            <img
              src={heroIllustration}
              alt="Placement & Career Preparation illustration"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Floating Live Badge Over Image */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-900/80 p-2.5 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-medium text-slate-200">
                  52 On-Campus Drives Scheduled This Month
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <Award className="h-3.5 w-3.5" />
                <span>94.6% Placed in 2025</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlight Feature Badges */}
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Recruiters</p>
              <p className="text-sm font-bold text-white">450+ Companies</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Avg. Package</p>
              <p className="text-sm font-bold text-white">₹14.2 LPA</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Mock Sessions</p>
              <p className="text-sm font-bold text-white">1-on-1 Mentors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pill */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>Accredited Training & Placement Cell</span>
        </div>
        <span className="hidden sm:inline text-slate-500">v3.4 Portal</span>
      </div>
    </div>
  );
};
