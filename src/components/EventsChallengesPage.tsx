import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Check,
  Search,
  Filter,
  Sparkles,
  Award,
  Trophy,
  Code2,
  HelpCircle,
  Briefcase,
  Users,
  ChevronRight,
  Flame,
  ArrowRight,
  X,
  Tag,
  Share2,
} from 'lucide-react';
import { CampusEvent, EventType, EVENTS_CATALOG } from '../data/eventsData';

interface EventsChallengesPageProps {
  onSelectEvent: (event: CampusEvent) => void;
  registeredEventsMap: Record<string, boolean>;
  onRegisterEvent: (eventId: string) => void;
  onBackToDashboard: () => void;
}

export const EventsChallengesPage: React.FC<EventsChallengesPageProps> = ({
  onSelectEvent,
  registeredEventsMap,
  onRegisterEvent,
  onBackToDashboard,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | EventType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options as required: All, Quiz, Coding Challenge, Hiring Challenge
  const filterOptions: Array<'All' | EventType> = [
    'All',
    'Quiz',
    'Coding Challenge',
    'Hiring Challenge',
  ];

  const filteredEvents = useMemo(() => {
    return EVENTS_CATALOG.filter((evt) => {
      const matchesFilter = selectedFilter === 'All' || evt.type === selectedFilter;
      const matchesSearch =
        evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'Quiz':
        return <HelpCircle className="h-5 w-5 text-amber-600" />;
      case 'Coding Challenge':
        return <Code2 className="h-5 w-5 text-indigo-600" />;
      case 'Hiring Challenge':
        return <Briefcase className="h-5 w-5 text-emerald-600" />;
      default:
        return <Trophy className="h-5 w-5 text-blue-600" />;
    }
  };

  const getEventIconBg = (type: EventType) => {
    switch (type) {
      case 'Quiz':
        return 'bg-amber-50 border-amber-100 text-amber-700';
      case 'Coding Challenge':
        return 'bg-indigo-50 border-indigo-100 text-indigo-700';
      case 'Hiring Challenge':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      default:
        return 'bg-blue-50 border-blue-100 text-blue-700';
    }
  };

  const getCountdownBadge = (evt: CampusEvent) => {
    if (evt.deadlineDaysLeft <= 3) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 text-[10px] font-bold text-red-700">
          <Flame className="h-3 w-3 text-red-500 animate-pulse" />
          <span>{evt.deadlineDaysLeft} Days Left</span>
        </span>
      );
    }
    if (evt.deadlineDaysLeft <= 14) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
          <Clock className="h-3 w-3 text-amber-600" />
          <span>Starts in {evt.deadlineDaysLeft}d</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
        <Calendar className="h-3 w-3 text-blue-600" />
        <span>Registration Open</span>
      </span>
    );
  };

  const handleRegister = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    onRegisterEvent(eventId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-10">
      {/* Page Header as requested */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Events & Challenges
            </h1>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
              {filteredEvents.length} Available
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Participate in quizzes, coding contests and hiring challenges.
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

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filters: All, Quiz, Coding Challenge, Hiring Challenge */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {filter === 'All' ? 'All Events' : filter}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, topics, or skills..."
            className="w-full rounded-xl border border-slate-200 pl-10 pr-8 py-2 text-xs placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <Trophy className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="font-bold text-slate-900 text-base">
            No events match your filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try choosing a different event type or clearing your search keywords to browse active opportunities.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('All');
              setSearchQuery('');
            }}
            className="mt-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
          >
            Show All Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt, idx) => {
            const isRegistered = Boolean(registeredEventsMap[evt.id]);

            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectEvent(evt)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
              >
                <div>
                  {/* Top Bar: Icon, Type Badge & Countdown Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${getEventIconBg(
                          evt.type
                        )} shadow-2xs`}
                      >
                        {getEventIcon(evt.type)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {evt.type}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {evt.name}
                        </h3>
                      </div>
                    </div>

                    {/* Countdown Badge */}
                    <div className="shrink-0">
                      {getCountdownBadge(evt)}
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.shortDescription}
                  </p>

                  {/* Card Metadata Box: Date, Deadline, Status */}
                  <div className="mt-4 rounded-xl bg-slate-50/70 p-3.5 border border-slate-100 space-y-2 text-xs">
                    {/* Date */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Date:</span>
                      </span>
                      <span className="font-semibold text-slate-900">
                        {evt.date}
                      </span>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Deadline:</span>
                      </span>
                      <span className="font-semibold text-amber-700 truncate max-w-[170px]">
                        {evt.deadline}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Status:</span>
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${evt.statusColor}`}>
                        {evt.status}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {evt.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {evt.tags.length > 3 && (
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                        +{evt.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls: View Details & Register Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectEvent(evt)}
                    className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Details</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleRegister(e, evt.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer ${
                      isRegistered
                        ? 'bg-emerald-600 text-white shadow-none ring-1 ring-emerald-400 cursor-default'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Registered ✓</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Register Now</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
