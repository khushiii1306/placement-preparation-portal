import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface TestSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  duration?: string;
  questionsCount?: number;
}

export const TestSimulatorModal: React.FC<TestSimulatorModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  duration = '30 Mins',
  questionsCount = 20,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample assessment question
  const sampleQuestions = [
    {
      q: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      options: ['65 seconds', '89 seconds', '100 seconds', '150 seconds'],
      answerIndex: 1,
      explanation: 'Speed = 240/24 = 10 m/s. Total distance = 240 + 650 = 890 m. Time = 890 / 10 = 89 seconds.',
    },
    {
      q: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answerIndex: 1,
      explanation: 'In a balanced BST, the maximum depth is log2(N), hence search takes O(log N) comparisons.',
    },
  ];

  const currentQ = sampleQuestions[currentQuestionIndex % sampleQuestions.length];

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          id="test-simulator-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative flex flex-col max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-indigo-600">
                    <Clock className="h-3 w-3" /> {duration}
                  </span>
                </div>
              </div>
            </div>
            <button
              id="close-test-modal-btn"
              type="button"
              onClick={handleReset}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {!isCompleted ? (
              <div className="space-y-5">
                {/* Question Progress Tracker */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">
                    Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-bold text-indigo-700">
                    Live Placement Drill
                  </span>
                </div>

                {/* Question Statement */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {currentQ.q}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOption(idx)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 ring-1 ring-indigo-600'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Completion Screen */
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Drill Completed!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your answers were recorded and mapped to your company readiness metrics.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 inline-flex items-center gap-4">
                  <div>
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Accuracy</p>
                    <p className="text-xl font-extrabold text-emerald-700">100%</p>
                  </div>
                  <div className="h-8 w-px bg-emerald-200" />
                  <div>
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Readiness Gain</p>
                    <p className="text-xl font-extrabold text-indigo-600">+1.5%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50/40">
            <span className="text-[11px] text-slate-400">
              Placement Cell Automated Proctoring
            </span>
            {!isCompleted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
              >
                <span>{currentQuestionIndex === sampleQuestions.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
