import React from 'react';
import { ProjectSpecimen } from '../../types';

interface GraftSprintModalProps {
  specimen: ProjectSpecimen | null;
  isOpen: boolean;
  onClose: () => void;
  onStartSprint: () => void;
}

export const GraftSprintModal: React.FC<GraftSprintModalProps> = ({
  specimen,
  isOpen,
  onClose,
  onStartSprint
}) => {
  if (!isOpen || !specimen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-xl bg-surface-container rounded-xl shadow-2xl border border-secondary/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              The First 2-Hour Revival Sprint
            </span>
          </div>
          <button onClick={onClose} className="text-outline hover:text-on-surface">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-on-surface-variant">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
              Target Specimen
            </span>
            <h3 className="font-serif text-2xl text-on-surface mt-0.5">
              {specimen.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              To avoid repeating the conditions of dormancy, do not attempt to finish the entire project. Commit only to the single highest-leverage 120-minute action block:
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <span className="font-semibold text-on-surface text-sm block">
                  Minute 0 – 30: Cut the Deadwood (Aggressive Pruning)
                </span>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Disable unpolished routes, non-essential third-party plugins, and edge cases. Narrow down to one single unbroken end-to-end user loop.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <span className="font-semibold text-on-surface text-sm block">
                  Minute 30 – 90: Fix the Primary Blocker
                </span>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Target: <strong className="text-secondary">{specimen.unfinishedNotes}</strong>. Implement the simplest working alternative or mock.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <span className="font-semibold text-on-surface text-sm block">
                  Minute 90 – 120: Smoke Test & One-Click Deploy
                </span>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Push live to Vercel, Cloud Run, or GitHub Pages. Do not polish UI beyond functionality. Celebrate the revival spark!
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary-container/20 border border-secondary/30 text-secondary text-[11px] flex items-center gap-2">
            <span className="material-symbols-outlined text-base">psychiatry</span>
            <span>
              Rule of the Conservatory: If momentum wanes after 2 hours, return the specimen to gentle rest without guilt.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onStartSprint();
              onClose();
            }}
            className="px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-base">timer</span>
            <span>Start 120-Min Timer & Enter Focus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
