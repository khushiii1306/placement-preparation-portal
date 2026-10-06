import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  School,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Plus,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  User,
  X,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { College } from '../types';
import {
  getAllCollegesForAdmin,
  approveCollegeByAdmin,
  suspendCollegeByAdmin,
  activateCollegeByAdmin,
  registerCollege,
} from '../utils/collegeStorage';

export const AdminManageCollegesPage: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>(() => getAllCollegesForAdmin());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'SUSPENDED'>('ALL');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New college form
  const [newCollegeForm, setNewCollegeForm] = useState({
    name: '',
    code: '',
    email: '',
    password: 'Password@123',
    website: 'https://',
    country: 'India',
    state: '',
    city: '',
    officerName: '',
    officerPhone: '',
    about: 'Institutional placement and career training cell.',
  });

  const refreshColleges = () => {
    setColleges(getAllCollegesForAdmin());
  };

  const handleApprove = (collegeId: string) => {
    approveCollegeByAdmin(collegeId);
    refreshColleges();
    if (selectedCollege && selectedCollege.id === collegeId) {
      setSelectedCollege(null);
    }
  };

  const handleSuspend = (collegeId: string) => {
    suspendCollegeByAdmin(collegeId);
    refreshColleges();
    if (selectedCollege && selectedCollege.id === collegeId) {
      setSelectedCollege(null);
    }
  };

  const handleActivate = (collegeId: string) => {
    activateCollegeByAdmin(collegeId);
    refreshColleges();
    if (selectedCollege && selectedCollege.id === collegeId) {
      setSelectedCollege(null);
    }
  };

  const handleCreateCollege = (e: React.FormEvent) => {
    e.preventDefault();
    registerCollege(newCollegeForm);
    refreshColleges();
    setIsAddModalOpen(false);
    setNewCollegeForm({
      name: '',
      code: '',
      email: '',
      password: 'Password@123',
      website: 'https://',
      country: 'India',
      state: '',
      city: '',
      officerName: '',
      officerPhone: '',
      about: 'Institutional placement and career training cell.',
    });
  };

  // Filtered colleges
  const filteredColleges = colleges.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.officerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || col.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = colleges.filter((c) => c.status === 'PENDING').length;
  const approvedCount = colleges.filter((c) => c.status === 'APPROVED').length;
  const suspendedCount = colleges.filter((c) => c.status === 'SUSPENDED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <School className="h-6 w-6 text-indigo-600" />
            <span>Manage Colleges & Universities</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Approve institutional registrations, monitor official placement cells, and manage RBAC access.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Institution</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Colleges
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{colleges.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Institutions Onboarded</p>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Approved
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{approvedCount}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Can Publish Drives</p>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            Pending Approval
          </span>
          <p className="text-2xl font-black text-amber-700 mt-1">{pendingCount}</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Require Admin Verification</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Suspended
          </span>
          <p className="text-2xl font-black text-slate-700 mt-1">{suspendedCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Access Restricted</p>
        </div>
      </div>

      {/* Pending Warning Banner if pending institutions exist */}
      {pendingCount > 0 && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 flex items-start gap-3 text-amber-900">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="font-bold text-amber-950">
              {pendingCount} Institution Application(s) Pending Review:
            </strong>{' '}
            Review institutional credentials, officer verification, and domain matching before granting publication authorization.
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by college name, code, officer..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {(['ALL', 'APPROVED', 'PENDING', 'SUSPENDED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Colleges Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Institution Name & Code</th>
                <th className="py-3 px-4">Placement Officer</th>
                <th className="py-3 px-4">Official Email & Domain</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredColleges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No colleges match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredColleges.map((col) => (
                  <tr key={col.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold">
                          <School className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{col.name}</p>
                          <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                            {col.code}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{col.officerName}</p>
                      <p className="text-[11px] text-slate-500">{col.officerPhone}</p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-mono text-slate-700">{col.email}</p>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        Domain: {col.emailDomain}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      {col.city}, {col.state}
                    </td>

                    <td className="py-3 px-4">
                      {col.status === 'APPROVED' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          APPROVED
                        </span>
                      ) : col.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                          <Clock className="h-3 w-3" />
                          PENDING APPROVAL
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                          <ShieldAlert className="h-3 w-3" />
                          SUSPENDED
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCollege(col)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 inline mr-1" />
                          Details
                        </button>

                        {col.status === 'PENDING' && (
                          <button
                            onClick={() => handleApprove(col.id)}
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 cursor-pointer shadow-xs"
                          >
                            Approve
                          </button>
                        )}

                        {col.status === 'APPROVED' && (
                          <button
                            onClick={() => handleSuspend(col.id)}
                            className="rounded-lg bg-amber-100 text-amber-800 px-2.5 py-1 text-[11px] font-semibold hover:bg-amber-200 cursor-pointer"
                          >
                            Suspend
                          </button>
                        )}

                        {col.status === 'SUSPENDED' && (
                          <button
                            onClick={() => handleActivate(col.id)}
                            className="rounded-lg bg-blue-600 text-white px-2.5 py-1 text-[11px] font-bold hover:bg-blue-700 cursor-pointer shadow-xs"
                          >
                            Re-activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* College Details Modal */}
      <AnimatePresence>
        {selectedCollege && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Institution Verification Dossier</h3>
                </div>
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedCollege.name}</h4>
                    <p className="text-slate-500 font-mono">Code: {selectedCollege.code}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      selectedCollege.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedCollege.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {selectedCollege.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div className="rounded-xl border border-slate-100 p-3">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Placement Officer</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedCollege.officerName}</p>
                    <p className="text-[11px] text-slate-500">{selectedCollege.officerPhone}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Official Email</span>
                    <p className="font-mono text-slate-900 mt-0.5">{selectedCollege.email}</p>
                    <p className="text-[11px] text-emerald-600 font-bold">Domain: {selectedCollege.emailDomain}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 p-3 space-y-1 text-slate-700">
                  <p><strong>Campus Location:</strong> {selectedCollege.city}, {selectedCollege.state}, {selectedCollege.country}</p>
                  <p><strong>Website:</strong> <a href={selectedCollege.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{selectedCollege.website}</a></p>
                  <p><strong>Registered On:</strong> {new Date(selectedCollege.registeredAt).toLocaleDateString()}</p>
                  <p className="pt-1 text-slate-600 leading-relaxed"><strong>About:</strong> {selectedCollege.about}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

                <div className="flex gap-2">
                  {selectedCollege.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(selectedCollege.id)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                    >
                      Approve Institution
                    </button>
                  )}
                  {selectedCollege.status === 'APPROVED' && (
                    <button
                      onClick={() => handleSuspend(selectedCollege.id)}
                      className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 shadow-xs"
                    >
                      Suspend Access
                    </button>
                  )}
                  {selectedCollege.status === 'SUSPENDED' && (
                    <button
                      onClick={() => handleActivate(selectedCollege.id)}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
                    >
                      Re-activate
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add College Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Add New Institution Directly</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCollege} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">College / University Name *</label>
                  <input
                    type="text"
                    required
                    value={newCollegeForm.name}
                    onChange={(e) => setNewCollegeForm({ ...newCollegeForm, name: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">University Code *</label>
                    <input
                      type="text"
                      required
                      value={newCollegeForm.code}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, code: e.target.value.toUpperCase() })}
                      placeholder="NIT001"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 uppercase font-mono focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={newCollegeForm.email}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, email: e.target.value })}
                      placeholder="placement@nit.edu"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={newCollegeForm.city}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, city: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={newCollegeForm.state}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, state: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Officer Name *</label>
                    <input
                      type="text"
                      required
                      value={newCollegeForm.officerName}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, officerName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Officer Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newCollegeForm.officerPhone}
                      onChange={(e) => setNewCollegeForm({ ...newCollegeForm, officerPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Official Website</label>
                  <input
                    type="url"
                    value={newCollegeForm.website}
                    onChange={(e) => setNewCollegeForm({ ...newCollegeForm, website: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-slate-900 focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 shadow-xs"
                  >
                    Register Institution
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
