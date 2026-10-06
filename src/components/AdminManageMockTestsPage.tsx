import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCheck,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Clock,
  HelpCircle,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  CheckCircle2,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AdminMockTest, AdminQuestion } from '../data/adminData';

interface AdminManageMockTestsPageProps {
  mockTests: AdminMockTest[];
  availableQuestions: AdminQuestion[];
  onCreateTest: (test: Omit<AdminMockTest, 'id'>) => void;
  onEditTest: (id: string, updated: Omit<AdminMockTest, 'id'>) => void;
  onDeleteTest: (id: string) => void;
  onTogglePublishTest: (id: string) => void;
}

export const AdminManageMockTestsPage: React.FC<AdminManageMockTestsPageProps> = ({
  mockTests,
  availableQuestions,
  onCreateTest,
  onEditTest,
  onDeleteTest,
  onTogglePublishTest,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<AdminMockTest | null>(null);
  const [deletingTest, setDeletingTest] = useState<AdminMockTest | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    testName: '',
    category: 'Full Mock Test',
    durationMinutes: 60,
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    status: 'Published' as 'Published' | 'Draft' | 'Unpublished',
    selectedQuestionIds: [] as string[],
  });

  const categories = [
    'All',
    'Full Mock Test',
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Technical & Coding',
  ];

  // Filtered mock tests
  const filteredTests = useMemo(() => {
    return mockTests.filter((t) => {
      const matchesSearch =
        t.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [mockTests, searchQuery, categoryFilter, statusFilter]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingTest(null);
    setFormData({
      testName: '',
      category: 'Full Mock Test',
      durationMinutes: 60,
      difficulty: 'Medium',
      status: 'Published',
      selectedQuestionIds: availableQuestions.slice(0, 5).map((q) => q.id),
    });
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (test: AdminMockTest) => {
    setEditingTest(test);
    setFormData({
      testName: test.testName,
      category: test.category,
      durationMinutes: test.durationMinutes,
      difficulty: test.difficulty,
      status: test.status,
      selectedQuestionIds: test.selectedQuestionIds || [],
    });
    setIsFormModalOpen(true);
  };

  // Toggle single question in the form picker
  const handleToggleQuestionSelect = (qId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedQuestionIds.includes(qId);
      if (exists) {
        return {
          ...prev,
          selectedQuestionIds: prev.selectedQuestionIds.filter((id) => id !== qId),
        };
      } else {
        return {
          ...prev,
          selectedQuestionIds: [...prev.selectedQuestionIds, qId],
        };
      }
    });
  };

  // Select all / clear questions in the form
  const handleSelectAllQuestions = () => {
    if (formData.selectedQuestionIds.length === availableQuestions.length) {
      setFormData((prev) => ({ ...prev, selectedQuestionIds: [] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedQuestionIds: availableQuestions.map((q) => q.id),
      }));
    }
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.testName.trim()) return;

    const payload = {
      testName: formData.testName.trim(),
      category: formData.category,
      questionsCount: formData.selectedQuestionIds.length || 15,
      durationMinutes: Number(formData.durationMinutes) || 60,
      difficulty: formData.difficulty,
      status: formData.status,
      selectedQuestionIds: formData.selectedQuestionIds,
      totalAttempts: editingTest?.totalAttempts || 0,
      avgScore: editingTest?.avgScore || 0,
    };

    if (editingTest) {
      onEditTest(editingTest.id, payload);
      setSuccessToast(`Mock test "${payload.testName}" updated successfully!`);
    } else {
      onCreateTest(payload);
      setSuccessToast(`New mock test "${payload.testName}" created successfully!`);
    }

    setIsFormModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deletingTest) {
      onDeleteTest(deletingTest.id);
      setSuccessToast(`Mock test "${deletingTest.testName}" deleted successfully.`);
      setDeletingTest(null);
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
              Manage Mock Tests
            </h1>
            <span className="rounded-full bg-purple-50 text-purple-700 px-2.5 py-0.5 text-xs font-bold border border-purple-100">
              {mockTests.length} Assessment Modules
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build timed tests, pick questions from the question bank, and publish for candidate batches.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Create Mock Test</span>
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
              placeholder="Search mock test name or category..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-100 outline-none transition-all"
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

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-purple-500 outline-none appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-purple-500 outline-none appearance-none cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Published">Status: Published</option>
                <option value="Draft">Status: Draft</option>
                <option value="Unpublished">Status: Unpublished</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mock Tests Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Test Name</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Questions</th>
                <th className="px-4 py-3.5">Duration</th>
                <th className="px-4 py-3.5">Difficulty</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <FileCheck className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="font-bold text-slate-600">No mock tests found matching criteria</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Clear your filters or create a new test.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Test Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold shrink-0">
                          <FileCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{test.testName}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                            <span>ID: {test.id}</span>
                            {test.totalAttempts !== undefined && (
                              <>
                                <span>•</span>
                                <span>{test.totalAttempts} Submissions</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[10px] font-bold border border-slate-200">
                        {test.category}
                      </span>
                    </td>

                    {/* Questions */}
                    <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-slate-800">
                      <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 text-[11px] font-bold">
                        {test.questionsCount} Qs
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{test.durationMinutes} mins</span>
                      </div>
                    </td>

                    {/* Difficulty */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                          test.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : test.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {test.difficulty}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          test.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : test.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            test.status === 'Published'
                              ? 'bg-emerald-500'
                              : test.status === 'Draft'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {test.status}
                      </span>
                    </td>

                    {/* Actions: Create, Edit, Delete, Publish/Unpublish */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* Publish / Unpublish Toggle */}
                        <button
                          type="button"
                          onClick={() => onTogglePublishTest(test.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            test.status === 'Published'
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={test.status === 'Published' ? 'Unpublish Test' : 'Publish Test'}
                        >
                          {test.status === 'Published' ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(test)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                          title="Edit Mock Test"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeletingTest(test)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Mock Test"
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
            Displaying <strong className="text-slate-800">{filteredTests.length}</strong> of{' '}
            <strong className="text-slate-800">{mockTests.length}</strong> test suites
          </span>
          <span className="text-[11px] text-slate-400">Real-time candidate testing system</span>
        </div>
      </div>

      {/* Create / Edit Test Modal */}
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 font-bold">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingTest ? `Edit Test (${editingTest.testName})` : 'Create New Mock Test'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Assemble questions from the question bank, set timer duration, and publish for testing.
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
                {/* Test Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Test Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.testName}
                    onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                    placeholder="e.g. TCS NQT Full-Length National Qualifier Mock 3"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-purple-500 outline-none"
                  />
                </div>

                {/* Category & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-purple-500 outline-none bg-white font-medium"
                    >
                      <option value="Full Mock Test">Full Mock Test</option>
                      <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                      <option value="Verbal Ability">Verbal Ability</option>
                      <option value="Technical & Coding">Technical & Coding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Duration (Minutes) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={240}
                      value={formData.durationMinutes}
                      onChange={(e) =>
                        setFormData({ ...formData, durationMinutes: Number(e.target.value) })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>

                {/* Difficulty & Initial Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Difficulty <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard',
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-purple-500 outline-none bg-white font-medium"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
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
                          status: e.target.value as 'Published' | 'Draft' | 'Unpublished',
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-purple-500 outline-none bg-white font-medium"
                    >
                      <option value="Published">Published (Live for students)</option>
                      <option value="Draft">Draft (Hidden)</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
                  </div>
                </div>

                {/* Select Questions Picker & Selected Count */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Select Questions for Test Pool
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Pick items from your question bank.
                      </p>
                    </div>

                    {/* Show selected question count as requested */}
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-extrabold border border-purple-200">
                        Selected: {formData.selectedQuestionIds.length} /{' '}
                        {availableQuestions.length} Questions
                      </span>
                      <button
                        type="button"
                        onClick={handleSelectAllQuestions}
                        className="text-xs font-bold text-purple-600 hover:underline cursor-pointer"
                      >
                        {formData.selectedQuestionIds.length === availableQuestions.length
                          ? 'Deselect All'
                          : 'Select All'}
                      </button>
                    </div>
                  </div>

                  {/* Question Picker List */}
                  <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/50 p-1">
                    {availableQuestions.map((q) => {
                      const isSelected = formData.selectedQuestionIds.includes(q.id);

                      return (
                        <div
                          key={q.id}
                          onClick={() => handleToggleQuestionSelect(q.id)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-purple-50/80 border border-purple-200'
                              : 'hover:bg-slate-100/70'
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                              isSelected
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-slate-500">
                                {q.id}
                              </span>
                              <span className="rounded bg-slate-200/70 px-1.5 py-0.2 text-[9px] font-semibold text-slate-700">
                                {q.category}
                              </span>
                              <span
                                className={`text-[9px] font-bold ${
                                  q.difficulty === 'Easy'
                                    ? 'text-emerald-600'
                                    : q.difficulty === 'Medium'
                                    ? 'text-amber-600'
                                    : 'text-rose-600'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-slate-800 line-clamp-1 mt-0.5 font-medium">
                              {q.question}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
                    className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white hover:bg-purple-700 shadow-sm cursor-pointer"
                  >
                    {editingTest ? 'Update Mock Test' : 'Create & Save Test'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal before Deleting */}
      <AnimatePresence>
        {deletingTest && (
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
                  <h3 className="text-sm font-bold text-slate-900">Delete Mock Test</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Are you sure you want to permanently delete{' '}
                    <strong className="text-slate-800">{deletingTest.testName}</strong>? Student
                    submission histories for this test will be archived.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
                <div className="font-bold text-slate-900">{deletingTest.category}</div>
                <div className="flex gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span>Questions: {deletingTest.questionsCount}</span>
                  <span>•</span>
                  <span>Duration: {deletingTest.durationMinutes} mins</span>
                  <span>•</span>
                  <span>Difficulty: {deletingTest.difficulty}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingTest(null)}
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
