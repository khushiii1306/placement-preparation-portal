import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Check,
  Award,
  Trophy,
  Code2,
  HelpCircle,
  Briefcase,
  Users,
  ShieldAlert,
  ArrowLeft,
  Share2,
  Sparkles,
  Layers,
  FileCheck2,
  Flame,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { CampusEvent } from '../data/eventsData';

interface EventDetailsPageProps {
  event: CampusEvent;
  isRegistered: boolean;
  onRegister: (eventId: string) => void;
  onBack: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetDateStr: string): TimeRemaining {
  // If date string is invalid or in the past, provide fallback
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event,
  isRegistered,
  onRegister,
  onBack,
}) => {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(event.targetDate)
  );

  const [copiedLink, setCopiedLink] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(event.targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.targetDate]);

  const handleRegisterClick = () => {
    if (!isRegistered) {
      onRegister(event.id);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getEventIcon = () => {
    switch (event.type) {
      case 'Quiz':
        return <HelpCircle className="h-6 w-6 text-amber-600" />;
      case 'Coding Challenge':
        return <Code2 className="h-6 w-6 text-indigo-600" />;
      case 'Hiring Challenge':
        return <Briefcase className="h-6 w-6 text-emerald-600" />;
      default:
        return <Trophy className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-6xl mx-auto pb-12">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events & Challenges</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
          </button>
        </div>
      </div>

      {/* Registration Success Banner if Registered */}
      {isRegistered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 shadow-xs flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Check className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900">
                You are registered for this event!
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Confirmation sent to your student email. Passkey:{' '}
                <strong className="font-mono tracking-wider">
                  EVT-{event.id.toUpperCase().slice(0, 6)}-2026
                </strong>
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
            Seat Confirmed
          </span>
        </motion.div>
      )}

      {/* Main Hero Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-44 w-44 rounded-full bg-indigo-50/70 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Title, Badges, Summary */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  event.type === 'Quiz'
                    ? 'bg-amber-100 text-amber-800'
                    : event.type === 'Coding Challenge'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {getEventIcon()}
                <span>{event.type}</span>
              </span>

              <span className={`rounded-full px-3 py-1 text-xs font-semibold border ${event.statusColor}`}>
                {event.status}
              </span>

              {event.prizePool && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5 text-amber-600" />
                  <span>{event.prizePool}</span>
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                {event.name}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {event.shortDescription}
              </p>
            </div>

            {/* Quick Metadata Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Date
                </span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                  {event.date}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Time
                </span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  {event.time}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Registration Deadline
                </span>
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-600" />
                  {event.deadline}
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Eligibility
                </span>
                <span className="text-xs font-semibold text-slate-800 line-clamp-1" title={event.eligibility}>
                  {event.eligibility}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Countdown Timer & Large Registration Button */}
          <div className="lg:w-80 shrink-0 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Event Countdown</span>
                </span>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-white p-2.5 border border-slate-200 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
                </div>

                <div className="rounded-xl bg-white p-2.5 border border-slate-200 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Hours</span>
                </div>

                <div className="rounded-xl bg-white p-2.5 border border-slate-200 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mins</span>
                </div>

                <div className="rounded-xl bg-white p-2.5 border border-slate-200 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-black text-indigo-600 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Secs</span>
                </div>
              </div>

              <p className="text-[11px] text-center text-slate-500 mt-2.5">
                {event.registeredCount} students already enrolled
              </p>
            </div>

            {/* Large Registration Button as specified */}
            <div>
              <button
                type="button"
                onClick={handleRegisterClick}
                disabled={isRegistered}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm font-bold shadow-sm transition-all cursor-pointer ${
                  isRegistered
                    ? 'bg-emerald-600 text-white cursor-default shadow-none ring-2 ring-emerald-300'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-[0.99]'
                }`}
              >
                {isRegistered ? (
                  <>
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>Registered ✓</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Register Now</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Free enrollment • TPO Verified Entry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: About, Rules, Participation Process */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: About Event */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <FileCheck2 className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">About Event</h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {event.about.overview}
            </p>

            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Event Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {event.about.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-100"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
              <span>
                <strong>Organized by:</strong> {event.about.organizer}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                Mode: {event.about.mode}
              </span>
            </div>
          </div>

          {/* Section 2: Rules */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Rules & Guidelines</h2>
            </div>

            <div className="space-y-2.5">
              {event.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs text-slate-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Participation Process */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Layers className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Participation Process</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.participationProcess.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 font-extrabold text-white text-xs">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Stage {step.step} of {event.participationProcess.length}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm pt-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Benefits, Eligibility, Sticky Bottom CTA */}
        <div className="space-y-6">
          {/* Section 4: Benefits */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Award className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Benefits & Rewards</h2>
            </div>

            <div className="space-y-3">
              {event.benefits.map((benefit, bIdx) => (
                <div
                  key={bIdx}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 space-y-1 hover:border-indigo-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-indigo-600">
                      <Trophy className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal pl-8">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Eligibility & Prerequisites
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {event.eligibility}
            </p>
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>College Verification:</span>
                <strong className="text-slate-800">Required (ABES EC)</strong>
              </div>
              <div className="flex justify-between">
                <span>Participation Fee:</span>
                <strong className="text-emerald-700">₹0 (Sponsored)</strong>
              </div>
            </div>
          </div>

          {/* Sticky Quick Register Box */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-900">
                Ready to compete?
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Registrations close on <strong>{event.deadline}</strong>. Ensure your student details are up to date.
            </p>
            <button
              type="button"
              onClick={handleRegisterClick}
              disabled={isRegistered}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold shadow-xs transition-all cursor-pointer ${
                isRegistered
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isRegistered ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>Registered ✓</span>
                </>
              ) : (
                <>
                  <span>Register Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
