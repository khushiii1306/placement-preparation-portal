import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          id="terms-modal"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative flex flex-col max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Terms & Placement Guidelines
                </h3>
                <p className="text-xs text-slate-500">
                  Training & Placement Cell Student Policy
                </p>
              </div>
            </div>
            <button
              id="close-terms-modal-btn"
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">1. Student Placement Eligibility</h4>
              <p>
                Students registering on this portal must be currently enrolled in an accredited undergraduate or postgraduate degree program. All academic data (CGPA, active backlogs) must be authentic.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">2. Code of Conduct in Recruitment Drives</h4>
              <p>
                Strict adherence to on-campus recruitment ethics is mandatory. Malpractice during coding screenings, virtual assessments, or technical interviews will result in permanent debarment from placement drives.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">3. One-Offer Policy & Dream Companies</h4>
              <p>
                Upon receiving an official job offer letter through on-campus recruitment, policies regarding dream / super-dream tier upgrades apply according to your institution&apos;s Training & Placement guidelines.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900">4. Data Privacy & Recruiter Sharing</h4>
              <p>
                Your resume and test assessment performance scores will be securely shared only with authorized company recruiters and college placement officers.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 p-4 bg-slate-50/50">
            <button
              id="dismiss-terms-btn"
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              id="accept-terms-btn"
              type="button"
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
            >
              <Check className="h-4 w-4" />
              I Agree & Accept
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
