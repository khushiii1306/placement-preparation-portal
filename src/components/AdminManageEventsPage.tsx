import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Trophy,
  ExternalLink,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  CheckCircle2,
  Users,
  Award,
} from 'lucide-react';
import { AdminEvent } from '../data/adminData';

interface AdminManageEventsPageProps {
  events: AdminEvent[];
  onAddEvent: (event: Omit<AdminEvent, 'id'>) => void;
  onEditEvent: (id: string, updated: Omit<AdminEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
  onTogglePublishEvent: (id: string) => void;
}

export const AdminManageEventsPage: React.FC<AdminManageEventsPageProps> = ({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onTogglePublishEvent,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<AdminEvent | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: 'Quiz' as 'Quiz' | 'Coding Challenge' | 'Hiring Challenge',
    description: '',
    date: '',
    time: '10:00 AM - 12:00 PM',
    registrationDeadline: '',
    eligibility: '',
    rules: '',
    registrationLink: '',
    status: 'Published' as 'Published' | 'Upcoming' | 'Draft' | 'Completed',
  });

  const eventTypes: Array<'All' | 'Quiz' | 'Coding Challenge' | 'Hiring Challenge'> = [
    'All',
    'Quiz',
    'Coding Challenge',
    'Hiring Challenge',
  ];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.eventType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All' || e.eventType === typeFilter;
      const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, searchQuery, typeFilter, statusFilter]);

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      eventName: '',
      eventType: 'Coding Challenge',
      description: 'An exciting challenge designed to test your algorithmic problem solving skills and campus competitive coding benchmark.',
      date: '2026-11-05',
      time: '02:00 PM - 05:00 PM',
      registrationDeadline: '2026-11-01',
      eligibility: 'Open to all 3rd & 4th year B.Tech, M.Tech, and MCA students with zero active disciplinary backlogs.',
      rules: '1. Plagiarism will lead to immediate cancellation.\n2. Submissions evaluated using test case coverage and time/space complexity.\n3. Proctored browser session mandatory.',
      registrationLink: 'https://placement.edu/events/register',
      status: 'Published',
    });
    setIsFormModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (evt: AdminEvent) => {
    setEditingEvent(evt);
    setFormData({
      eventName: evt.eventName,
      eventType: evt.eventType,
      description: evt.description,
      date: evt.date,
      time: evt.time,
      registrationDeadline: evt.registrationDeadline,
      eligibility: evt.eligibility,
      rules: evt.rules,
      registrationLink: evt.registrationLink,
      status: evt.status,
    });
    setIsFormModalOpen(true);
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName.trim()) return;

    const payload = {
      eventName: formData.eventName.trim(),
      eventType: formData.eventType,
      description: formData.description.trim(),
      date: formData.date.trim(),
      time: formData.time.trim(),
      registrationDeadline: formData.registrationDeadline.trim(),
      eligibility: formData.eligibility.trim(),
      rules: formData.rules.trim(),
      registrationLink: formData.registrationLink.trim(),
      status: formData.status,
      participantsCount: editingEvent?.participantsCount || 0,
    };

    if (editingEvent) {
      onEditEvent(editingEvent.id, payload);
      setSuccessToast(`Event "${payload.eventName}" updated successfully!`);
    } else {
      onAddEvent(payload);
      setSuccessToast(`New event "${payload.eventName}" published successfully!`);
    }

    setIsFormModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingEvent) {
      onDeleteEvent(deletingEvent.id);
      setSuccessToast(`Event "${deletingEvent.eventName}" removed.`);
      setDeletingEvent(null);
      setTimeout(() => setSuccessToast(null), 3500);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Manage Events & Challenges
            </h1>
            <span className="rounded-full bg-amber-50 text-amber-700 px-2.5 py-0.5 text-xs font-bold border border-amber-100">
              {events.length} Campus Challenges
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Organize competitive hackathons, company hiring sprints, and college-wide aptitude quizzes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-xs font-bold">{successToast}</p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessToast(null)}
              className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title, guidelines, or type..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none appearance-none cursor-pointer"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    Type: {t}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none appearance-none cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Published">Status: Published</option>
                <option value="Upcoming">Status: Upcoming</option>
                <option value="Draft">Status: Draft</option>
                <option value="Completed">Status: Completed</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Event Name</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Deadline</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="font-bold text-slate-600">No events found matching criteria</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Clear filters or publish a new challenge.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Event Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl text-white font-bold shrink-0 ${
                            evt.eventType === 'Quiz'
                              ? 'bg-blue-600'
                              : evt.eventType === 'Coding Challenge'
                              ? 'bg-purple-600'
                              : 'bg-amber-600'
                          }`}
                        >
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{evt.eventName}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {evt.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          evt.eventType === 'Quiz'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : evt.eventType === 'Coding Challenge'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {evt.eventType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-700">
                      <div className="flex items-center gap-1 font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{evt.time}</div>
                    </td>

                    {/* Deadline */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-700">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{evt.registrationDeadline}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          evt.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : evt.status === 'Upcoming'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : evt.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            evt.status === 'Published'
                              ? 'bg-emerald-500'
                              : evt.status === 'Upcoming'
                              ? 'bg-blue-500'
                              : evt.status === 'Draft'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {evt.status}
                      </span>
                    </td>

                    {/* Actions: Edit, Delete, Publish/Unpublish */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* Publish / Unpublish */}
                        <button
                          type="button"
                          onClick={() => onTogglePublishEvent(evt.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            evt.status === 'Published'
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={evt.status === 'Published' ? 'Unpublish Event' : 'Publish Event'}
                        >
                          {evt.status === 'Published' ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(evt)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Edit Event"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeletingEvent(evt)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Displaying <strong className="text-slate-800">{filteredEvents.length}</strong> of{' '}
            <strong className="text-slate-800">{events.length}</strong> campus events
          </span>
          <span className="text-[11px] text-slate-400">Campus Hackathons & Competitions</span>
        </div>
      </div>

      {/* Add / Edit Event Form Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingEvent ? `Edit Event (${editingEvent.eventName})` : 'Add Campus Event & Challenge'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Configure challenge format, rules, registration cutoff, and student eligibility.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Event Name & Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Event Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.eventName}
                      onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                      placeholder="e.g. CodeStorm 2026 Inter-College Hackathon"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Event Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eventType: e.target.value as 'Quiz' | 'Coding Challenge' | 'Hiring Challenge',
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none bg-white font-medium"
                    >
                      <option value="Quiz">Quiz</option>
                      <option value="Coding Challenge">Coding Challenge</option>
                      <option value="Hiring Challenge">Hiring Challenge</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide context on challenge structure, prize pool, or recruiter evaluation..."
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs leading-relaxed focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Event Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Event Time <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g. 10:00 AM - 01:00 PM"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Registration Deadline & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Registration Deadline <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.registrationDeadline}
                      onChange={(e) =>
                        setFormData({ ...formData, registrationDeadline: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as 'Published' | 'Upcoming' | 'Draft' | 'Completed',
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none bg-white font-medium"
                    >
                      <option value="Published">Published (Live)</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Draft">Draft (Internal)</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Eligibility <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. Open to 3rd & 4th year B.Tech students from all engineering branches."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Rules */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Rules & Guidelines <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    placeholder="1. Plagiarism will lead to immediate disqualification.\n2. Automated test suites evaluate submissions.\n3. Keep cameras enabled."
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs leading-relaxed focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Registration Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Registration Link <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    placeholder="https://placement.edu/events/register"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Form Footer Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white hover:bg-amber-700 shadow-sm cursor-pointer"
                  >
                    {editingEvent ? 'Update Event' : 'Publish Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal before Deleting */}
      <AnimatePresence>
        {deletingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Delete Campus Event</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Are you sure you want to permanently cancel and delete{' '}
                    <strong className="text-slate-800">{deletingEvent.eventName}</strong>? Registered
                    participants will be notified.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
                <div className="font-bold text-slate-900">{deletingEvent.eventType}</div>
                <div className="flex gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span>Date: {deletingEvent.date}</span>
                  <span>•</span>
                  <span>Deadline: {deletingEvent.registrationDeadline}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingEvent(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
