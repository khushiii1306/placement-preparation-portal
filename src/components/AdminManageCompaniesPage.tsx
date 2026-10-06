import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  X,
  CheckCircle2,
  Briefcase,
  Layers,
} from 'lucide-react';
import { AdminCompany } from '../data/adminData';

interface AdminManageCompaniesPageProps {
  companies: AdminCompany[];
  onAddCompany: (company: Omit<AdminCompany, 'id'>) => void;
  onEditCompany: (id: string, updated: Omit<AdminCompany, 'id'>) => void;
  onDeleteCompany: (id: string) => void;
}

export const AdminManageCompaniesPage: React.FC<AdminManageCompaniesPageProps> = ({
  companies,
  onAddCompany,
  onEditCompany,
  onDeleteCompany,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<AdminCompany | null>(null);
  const [deletingCompany, setDeletingCompany] = useState<AdminCompany | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form inputs for Add / Edit
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    location: '',
    eligibility: '',
    requiredSkills: '',
    packageCTC: '',
    deadline: '',
    applyLink: '',
    status: 'Active' as 'Active' | 'Upcoming' | 'Closed',
  });

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [companies, searchQuery, statusFilter]);

  // Open modal to add company
  const handleOpenAddModal = () => {
    setEditingCompany(null);
    setFormData({
      companyName: '',
      jobRole: '',
      location: '',
      eligibility: '6.5+ CGPA in B.Tech (All Branches). Max 1 active backlog.',
      requiredSkills: 'DSA, Python, SQL, Problem Solving',
      packageCTC: '12 LPA',
      deadline: '2026-11-15',
      applyLink: 'https://careers.example.com',
      status: 'Active',
    });
    setIsFormModalOpen(true);
  };

  // Open modal to edit company
  const handleOpenEditModal = (comp: AdminCompany) => {
    setEditingCompany(comp);
    setFormData({
      companyName: comp.companyName,
      jobRole: comp.jobRole,
      location: comp.location,
      eligibility: comp.eligibility,
      requiredSkills: comp.requiredSkills.join(', '),
      packageCTC: comp.packageCTC,
      deadline: comp.deadline,
      applyLink: comp.applyLink,
      status: comp.status,
    });
    setIsFormModalOpen(true);
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.jobRole.trim()) return;

    const skillsArray = formData.requiredSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      companyName: formData.companyName.trim(),
      jobRole: formData.jobRole.trim(),
      location: formData.location.trim() || 'Pan India',
      eligibility: formData.eligibility.trim(),
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['Core CS', 'Analytical Skills'],
      packageCTC: formData.packageCTC.trim(),
      deadline: formData.deadline.trim(),
      applyLink: formData.applyLink.trim(),
      status: formData.status,
      logoColor: editingCompany?.logoColor || 'bg-indigo-600',
    };

    if (editingCompany) {
      onEditCompany(editingCompany.id, payload);
      setSuccessToast(`${formData.companyName} details updated successfully!`);
    } else {
      onAddCompany(payload);
      setSuccessToast(`New drive for ${formData.companyName} created successfully!`);
    }

    setIsFormModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deletingCompany) {
      onDeleteCompany(deletingCompany.id);
      setSuccessToast(`Company ${deletingCompany.companyName} removed from recruitment records.`);
      setDeletingCompany(null);
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
              Manage Companies
            </h1>
            <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold border border-emerald-100">
              {companies.length} Registered Recruiters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Oversee corporate campus placement drives, job descriptions, CTC packages, and student deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
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
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search Bar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search */}
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company name, role, skills, or location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-emerald-500 outline-none appearance-none cursor-pointer"
              >
                <option value="All">Drive Status: All</option>
                <option value="Active">Drive Status: Active</option>
                <option value="Upcoming">Drive Status: Upcoming</option>
                <option value="Closed">Drive Status: Closed</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Company</th>
                <th className="px-4 py-3.5">Job Role</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Eligibility</th>
                <th className="px-4 py-3.5">Package</th>
                <th className="px-4 py-3.5">Deadline</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    <Building2 className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="font-bold text-slate-600">No companies found matching criteria</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Check your filters or schedule a new company drive.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Company */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl text-white font-extrabold text-xs shadow-2xs ${
                            c.logoColor || 'bg-indigo-600'
                          }`}
                        >
                          {c.companyName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{c.companyName}</p>
                          <a
                            href={c.applyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-indigo-600 hover:underline mt-0.5"
                          >
                            <span>Application link</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Job Role */}
                    <td className="px-4 py-3.5 font-semibold text-slate-800 max-w-[180px]">
                      <p className="truncate" title={c.jobRole}>
                        {c.jobRole}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.requiredSkills.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {c.requiredSkills.length > 2 && (
                          <span className="text-[9px] text-slate-400 font-medium self-center">
                            +{c.requiredSkills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[120px]" title={c.location}>
                          {c.location}
                        </span>
                      </div>
                    </td>

                    {/* Eligibility */}
                    <td className="px-4 py-3.5 text-slate-600 max-w-[200px]">
                      <p className="line-clamp-2 text-[11px]" title={c.eligibility}>
                        {c.eligibility}
                      </p>
                    </td>

                    {/* Package */}
                    <td className="px-4 py-3.5 font-extrabold text-emerald-700 whitespace-nowrap">
                      <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs">
                        {c.packageCTC}
                      </span>
                    </td>

                    {/* Deadline */}
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>{c.deadline}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          c.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : c.status === 'Upcoming'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* Actions: Edit, Delete */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(c)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Edit Company"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingCompany(c)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Company"
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
            Displaying <strong className="text-slate-800">{filteredCompanies.length}</strong> of{' '}
            <strong className="text-slate-800">{companies.length}</strong> placement drives
          </span>
          <span className="text-[11px] text-slate-400">Campus Training & Placement Records</span>
        </div>
      </div>

      {/* Add / Edit Company Form Modal */}
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingCompany ? `Edit Company (${editingCompany.companyName})` : 'Add Visiting Company Drive'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Publish recruitment details, eligibility criteria, CTC package, and application portal links.
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
                {/* Company Name & Job Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Google India, Amazon AWS, Infosys"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Job Role <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.jobRole}
                      onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                      placeholder="e.g. Software Development Engineer (SDE-1)"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Location & Package CTC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Bengaluru / Hyderabad / Remote"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Package CTC <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.packageCTC}
                      onChange={(e) => setFormData({ ...formData, packageCTC: e.target.value })}
                      placeholder="e.g. 24.5 LPA"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Eligibility <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. 7.0+ CGPA in B.Tech (CSE, IT, ECE), 60% in 10th & 12th, no standing arrears"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs leading-relaxed focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Required Skills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Required Skills (comma separated) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.requiredSkills}
                    onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                    placeholder="e.g. Data Structures, Python, React, SQL, Problem Solving"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Deadline, Apply Link & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Deadline <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
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
                          status: e.target.value as 'Active' | 'Upcoming' | 'Closed',
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none bg-white font-medium"
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Apply Link <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.applyLink}
                      onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                      placeholder="https://careers.company.com/drive"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
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
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm cursor-pointer"
                  >
                    {editingCompany ? 'Update Company Drive' : 'Publish Drive'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal before Deleting */}
      <AnimatePresence>
        {deletingCompany && (
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
                  <h3 className="text-sm font-bold text-slate-900">Remove Company Drive</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Are you sure you want to remove{' '}
                    <strong className="text-slate-800">{deletingCompany.companyName}</strong> from active
                    campus recruitment drives?
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
                <div className="font-bold text-slate-900">{deletingCompany.jobRole}</div>
                <div className="flex gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span>Package: {deletingCompany.packageCTC}</span>
                  <span>•</span>
                  <span>Deadline: {deletingCompany.deadline}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingCompany(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm cursor-pointer"
                >
                  Confirm Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
