import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  Briefcase,
  X,
  Menu,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { NotificationItem } from '../types';

interface TopNavbarProps {
  studentName?: string;
  studentRole?: string;
  onToggleMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateSection?: (section: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  studentName = 'Khushi Kumari',
  studentRole = 'B.Tech CSE • 4th Year',
  onToggleMobileSidebar,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const getInitials = (nameStr: string): string => {
    if (!nameStr) return 'KK';
    const parts = nameStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'KK';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'TCS NQT 2026 Registration Open',
      message: 'Registration deadline is approaching in 4 days. Verify your hall ticket details.',
      time: '2 hours ago',
      unread: true,
      type: 'drive',
    },
    {
      id: 'notif-2',
      title: 'Mock Coding Assessment Evaluated',
      message: 'Your score for Graph & Tree Algorithms: 92/100. Review detailed solutions.',
      time: '5 hours ago',
      unread: true,
      type: 'test',
    },
    {
      id: 'notif-3',
      title: 'Infosys SP Drive Announced',
      message: 'Specialist Programmer role CTC ₹9.5 LPA drive scheduled for next Saturday.',
      time: '1 day ago',
      unread: false,
      type: 'drive',
    },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-30 h-16 w-full border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md transition-all sm:px-6 lg:px-8"
    >
      <div className="flex h-full items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Menu Toggle & Portal Logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-sidebar-toggle-btn"
            type="button"
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Placement Preparation Portal Logo */}
          <div
            id="portal-logo"
            onClick={() => onNavigateSection?.('Dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/25 transition-transform group-hover:scale-105">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                  Placement Preparation Portal
                </span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                  PRO
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                Training & Placement Cell
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="navbar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search companies, mock tests, topics..."
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-12 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:flex items-center pr-3">
                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 shadow-xs">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right: Notifications & Student Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Icon */}
          <div className="relative" ref={notifRef}>
            <button
              id="navbar-notification-btn"
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span
                  id="notification-unread-badge"
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div
                id="notifications-dropdown-menu"
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl ring-1 ring-slate-900/5 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-2 py-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Placement Notifications
                    </h4>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 py-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex gap-3 p-2.5 rounded-xl transition-colors ${
                        notif.unread ? 'bg-indigo-50/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs mt-0.5">
                        {notif.type === 'drive' ? <Briefcase className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                          {notif.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                          {notif.message}
                        </p>
                        <span className="mt-1 block text-[10px] text-slate-400">
                          {notif.time}
                        </span>
                      </div>
                      {notif.unread && (
                        <div className="h-2 w-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigateSection?.('Events & Challenges');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View all placement calendar updates
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Avatar & Name */}
          <div
            id="student-profile-header"
            onClick={() => onNavigateSection?.('Profile')}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-1.5 pr-3 hover:bg-slate-100 transition-colors cursor-pointer select-none"
          >
            {/* Student Profile Avatar */}
            <div
              id="student-avatar"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-xs ring-1 ring-indigo-500/20"
            >
              <span>{getInitials(studentName)}</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* Authenticated Student Identity */}
            <div className="hidden sm:block text-left">
              <p
                id="student-name"
                className="text-xs font-bold text-slate-900 leading-tight"
              >
                {studentName}
              </p>
              <p className="text-[10px] font-medium text-slate-500 leading-tight">
                {studentRole}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};
