import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  CheckCircle2,
  ArrowUpDown,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { AdminQuestion } from '../data/adminData';

interface AdminManageQuestionsPageProps {
  questions: AdminQuestion[];
  onAddQuestion: (question: Omit<AdminQuestion, 'id' | 'createdDate'>) => void;
  onEditQuestion: (id: string, updated: Omit<AdminQuestion, 'id' | 'createdDate'>) => void;
  onDeleteQuestion: (id: string) => void;
}

export const AdminManageQuestionsPage: React.FC<AdminManageQuestionsPageProps> = ({
  questions,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<AdminQuestion | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    category: 'Quantitative Aptitude',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 0 as 0 | 1 | 2 | 3,
    explanation: '',
  });

  const categories = [
    'All',
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Technical & Coding',
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Filtered List
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options.some((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [questions, searchQuery, selectedCategory, selectedDifficulty]);

  // Open Form for Adding
  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: 0,
      explanation: '',
    });
    setIsFormModalOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditModal = (q: AdminQuestion) => {
    setEditingQuestion(q);
    setFormData({
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      option1: q.options[0] || '',
      option2: q.options[1] || '',
      option3: q.options[2] || '',
      option4: q.options[3] || '',
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    });
    setIsFormModalOpen(true);
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) return;

    const payload = {
      category: formData.category,
      difficulty: formData.difficulty,
      question: formData.question.trim(),
      options: [
        formData.option1.trim(),
        formData.option2.trim(),
        formData.option3.trim(),
        formData.option4.trim(),
      ] as [string, string, string, string],
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation.trim(),
    };

    if (editingQuestion) {
      onEditQuestion(editingQuestion.id, payload);
      setSuccessToast(`Question ${editingQuestion.id} updated successfully!`);
    } else {
      onAddQuestion(payload);
      setSuccessToast('New question added to repository successfully!');
    }

    setIsFormModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Confirm Delete Handler
  const handleConfirmDelete = () => {
    if (deletingQuestion) {
      onDeleteQuestion(deletingQuestion.id);
      setSuccessToast(`Question ${deletingQuestion.id} deleted successfully.`);
      setDeletingQuestion(null);
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
              Manage Questions
            </h1>
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-0.5 text-xs font-bold border border-indigo-100">
              {questions.length} Total Questions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curate, categorize, and maintain placement aptitude & technical question banks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Success Notification */}
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

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Question */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question statement, ID, or keywords..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9.5 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all"
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

          {/* Filter Category */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
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

          {/* Filter Difficulty */}
          <div className="sm:col-span-3">
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    Difficulty: {diff}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-[11px]">
            <span className="font-semibold text-slate-500">Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 font-bold">
                {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('All')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedDifficulty !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-700 px-2 py-0.5 font-bold">
                {selectedDifficulty}
                <button type="button" onClick={() => setSelectedDifficulty('All')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="text-indigo-600 font-bold hover:underline ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Questions Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5 w-24">Question ID</th>
                <th className="px-4 py-3.5">Question</th>
                <th className="px-4 py-3.5 w-40">Category</th>
                <th className="px-4 py-3.5 w-28">Difficulty</th>
                <th className="px-4 py-3.5 w-48">Correct Answer</th>
                <th className="px-4 py-3.5 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <HelpCircle className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-500" />
                    <p className="font-bold text-slate-600">No questions found matching criteria</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try clearing search parameters or add a new question.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => {
                  const correctText = q.options[q.correctAnswer] || 'Option ' + (q.correctAnswer + 1);

                  return (
                    <tr key={q.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Question ID */}
                      <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                        <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[11px] font-mono border border-slate-200">
                          {q.id}
                        </span>
                      </td>

                      {/* Question Text */}
                      <td className="px-4 py-3.5 font-medium text-slate-800 max-w-md">
                        <p className="line-clamp-2 leading-relaxed">{q.question}</p>
                        {q.explanation && (
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 italic">
                            Hint: {q.explanation}
                          </p>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            q.category === 'Quantitative Aptitude'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : q.category === 'Logical Reasoning'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : q.category === 'Verbal Ability'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {q.category}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                            q.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Correct Answer */}
                      <td className="px-4 py-3.5 text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {['A', 'B', 'C', 'D'][q.correctAnswer]}
                          </span>
                          <span className="font-semibold text-slate-900 truncate max-w-[150px]">
                            {correctText}
                          </span>
                        </div>
                      </td>

                      {/* Actions: Edit, Delete */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(q)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Question"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingQuestion(q)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Question"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredQuestions.length}</strong> of{' '}
            <strong className="text-slate-800">{questions.length}</strong> questions
          </span>
          <span className="text-[11px] text-slate-400">Database synchronized</span>
        </div>
      </div>

      {/* Add / Edit Question Modal */}
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingQuestion ? `Edit Question (${editingQuestion.id})` : 'Add New Question'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Configure problem details, multiple-choice options, and full step-by-step solution.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Category & Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none bg-white font-medium"
                    >
                      <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                      <option value="Logical Reasoning">Logical Reasoning</option>
                      <option value="Verbal Ability">Verbal Ability</option>
                      <option value="Technical & Coding">Technical & Coding</option>
                    </select>
                  </div>

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
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-500 outline-none bg-white font-medium"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Question Statement */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Question Statement <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Enter the problem statement clearly..."
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs leading-relaxed focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none"
                  />
                </div>

                {/* 4 Options */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Options <span className="text-rose-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option 1 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Option 1 (A)</span>
                        {formData.correctAnswer === 0 && (
                          <span className="text-emerald-600 font-bold">Selected as Correct</span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.option1}
                        onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
                        placeholder="Option 1 text..."
                        className={`w-full rounded-xl border px-3 py-2 text-xs outline-none ${
                          formData.correctAnswer === 0
                            ? 'border-emerald-500 bg-emerald-50/30'
                            : 'border-slate-300 focus:border-indigo-500'
                        }`}
                      />
                    </div>

                    {/* Option 2 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Option 2 (B)</span>
                        {formData.correctAnswer === 1 && (
                          <span className="text-emerald-600 font-bold">Selected as Correct</span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.option2}
                        onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
                        placeholder="Option 2 text..."
                        className={`w-full rounded-xl border px-3 py-2 text-xs outline-none ${
                          formData.correctAnswer === 1
                            ? 'border-emerald-500 bg-emerald-50/30'
                            : 'border-slate-300 focus:border-indigo-500'
                        }`}
                      />
                    </div>

                    {/* Option 3 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Option 3 (C)</span>
                        {formData.correctAnswer === 2 && (
                          <span className="text-emerald-600 font-bold">Selected as Correct</span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.option3}
                        onChange={(e) => setFormData({ ...formData, option3: e.target.value })}
                        placeholder="Option 3 text..."
                        className={`w-full rounded-xl border px-3 py-2 text-xs outline-none ${
                          formData.correctAnswer === 2
                            ? 'border-emerald-500 bg-emerald-50/30'
                            : 'border-slate-300 focus:border-indigo-500'
                        }`}
                      />
                    </div>

                    {/* Option 4 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Option 4 (D)</span>
                        {formData.correctAnswer === 3 && (
                          <span className="text-emerald-600 font-bold">Selected as Correct</span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.option4}
                        onChange={(e) => setFormData({ ...formData, option4: e.target.value })}
                        placeholder="Option 4 text..."
                        className={`w-full rounded-xl border px-3 py-2 text-xs outline-none ${
                          formData.correctAnswer === 3
                            ? 'border-emerald-500 bg-emerald-50/30'
                            : 'border-slate-300 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Correct Answer Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Correct Answer <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { index: 0, label: 'Option 1 (A)' },
                      { index: 1, label: 'Option 2 (B)' },
                      { index: 2, label: 'Option 3 (C)' },
                      { index: 3, label: 'Option 4 (D)' },
                    ].map((item) => (
                      <button
                        key={item.index}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, correctAnswer: item.index as 0 | 1 | 2 | 3 })
                        }
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          formData.correctAnswer === item.index
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Explanation & Solution Hint
                  </label>
                  <textarea
                    rows={3}
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    placeholder="Explain step-by-step formula or reasoning behind the correct option..."
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs leading-relaxed focus:border-indigo-500 outline-none"
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
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm cursor-pointer"
                  >
                    {editingQuestion ? 'Update Question' : 'Save Question'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal Before Deleting */}
      <AnimatePresence>
        {deletingQuestion && (
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
                  <h3 className="text-sm font-bold text-slate-900">Delete Question</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Are you sure you want to permanently delete question{' '}
                    <strong className="text-slate-800">{deletingQuestion.id}</strong>? This action
                    cannot be undone and will remove it from all associated test pools.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700">
                <p className="font-semibold line-clamp-2">"{deletingQuestion.question}"</p>
                <div className="flex gap-2 mt-2 text-[10px] text-slate-500">
                  <span>Category: {deletingQuestion.category}</span>
                  <span>•</span>
                  <span>Difficulty: {deletingQuestion.difficulty}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingQuestion(null)}
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
