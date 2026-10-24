import React from 'react';

interface RootCauseBreakdownProps {
  causeCategory: string;
  rootCause: string;
  unfinishedNotes: string;
  className?: string;
}

export const RootCauseBreakdown: React.FC<RootCauseBreakdownProps> = ({
  causeCategory,
  rootCause,
  unfinishedNotes,
  className = '',
}) => {
  return (
    <div className={`p-4 rounded-2xl bg-surface-container/60 border border-outline-variant/60 space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-secondary">
            biotech
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface">
            Forensic Demise Verdict
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-[11px] font-mono font-semibold">
          {causeCategory}
        </span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase text-on-surface-variant tracking-wider">
          Root Cause Analysis:
        </span>
        <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
          {rootCause}
        </p>
      </div>

      {unfinishedNotes && (
        <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/50 space-y-1">
          <span className="text-[10px] font-mono uppercase text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">notes</span>
            Last Unfinished Note:
          </span>
          <p className="text-xs font-mono text-on-surface italic">
            "{unfinishedNotes}"
          </p>
        </div>
      )}
    </div>
  );
};
