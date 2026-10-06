import React from 'react';
import {
  LayoutDashboard,
  Code2,
  FileCheck,
  Trophy,
  LineChart,
  Building2,
  Calendar,
  Target,
  User,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  School,
} from 'lucide-react';

export type SidebarSection =
  | 'Dashboard'
  | 'My University'
  | 'Practice'
  | 'Coding Practice'
  | 'Mock Tests'
  | 'Results'
  | 'Progress'
  | 'Companies & Jobs'
  | 'Events & Challenges'
  | 'Company Readiness'
  | 'Profile';

interface SidebarProps {
  activeSection: SidebarSection;
  onSelectSection: (section: SidebarSection) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  showUniversity?: boolean;
}

interface NavItem {
  name: SidebarSection;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  onLogout,
  mobileOpen,
  onCloseMobile,
  showUniversity = false,
}) => {
  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard },
    ...(showUniversity
      ? [{ name: 'My University' as SidebarSection, icon: School, badge: 'Campus', badgeColor: 'bg-indigo-100 text-indigo-700' }]
      : []),
    { name: 'Practice', icon: Code2, badge: 'MCQ' },
    { name: 'Coding Practice', icon: Sparkles, badge: '8 Problems' },
    { name: 'Mock Tests', icon: FileCheck, badge: 'Active' },
    { name: 'Results', icon: Trophy, badge: '78%', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Progress', icon: LineChart, badge: '64%', badgeColor: 'bg-purple-100 text-purple-700' },
    { name: 'Companies & Jobs', icon: Building2, badge: '6 Drives', badgeColor: 'bg-blue-100 text-blue-700' },
    { name: 'Events & Challenges', icon: Calendar, badge: 'Live' },
    { name: 'Company Readiness', icon: Target },
    { name: 'Profile', icon: User },
  ];

  const handleNavClick = (section: SidebarSection) => {
    onSelectSection(section);
    onCloseMobile();
  };

  const content = (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Mobile Header Close */}
        <div className="flex items-center justify-between lg:hidden border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Placement Navigation
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category Label */}
        <div className="px-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Preparation Menu
          </p>
        </div>

        {/* Navigation Links */}
        <nav id="sidebar-navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.name;

            return (
              <button
                key={item.name}
                id={`sidebar-item-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => handleNavClick(item.name)}
                className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live'
                        ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Placement Status & Logout */}
      <div className="space-y-3 pt-4 border-t border-slate-200/80">
        {/* Placement Season Mini Badge */}
        <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50/50 p-3">
          <div className="flex items-center justify-between text-indigo-900">
            <span className="text-[11px] font-bold">Drive Readiness</span>
            <span className="text-xs font-black text-indigo-700">64%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-indigo-100 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-[64%]" />
          </div>
          <p className="mt-1.5 text-[10px] text-slate-500">
            TCS & Infosys screening criteria met
          </p>
        </div>

        {/* Logout Button */}
        <button
          id="sidebar-logout-btn"
          type="button"
          onClick={onLogout}
          className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Logout</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-rose-300 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        id="desktop-left-sidebar"
        className="hidden lg:flex w-64 xl:w-72 flex-col border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] sticky top-16"
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
