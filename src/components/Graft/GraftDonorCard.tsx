import React from 'react';

interface GraftDonorCardProps {
  moduleName: string;
  donorProject: string;
  category: string;
  compatibilityScore: number;
  timeSavedHours: number;
  onTransplant?: () => void;
  className?: string;
}

export const GraftDonorCard: React.FC<GraftDonorCardProps> = ({
  moduleName,
  donorProject,
  category,
  compatibilityScore,
  timeSavedHours,
  onTransplant,
  className = '',
}) => {
  return (
    <div className={`p-4 rounded-2xl bg-surface-container/70 border border-outline-variant/60 hover:border-primary/50 transition-all space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant">
            From {donorProject}
          </span>
          <h4 className="font-mono text-sm font-bold text-on-surface">
            {moduleName}
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/40 text-[10px] font-mono font-bold whitespace-nowrap">
          {compatibilityScore}% Fit
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono pt-1">
        <span className="capitalize">{category}</span>
        <span className="text-secondary font-semibold">Saves ~{timeSavedHours}h Dev</span>
      </div>

      {onTransplant && (
        <button
          type="button"
          onClick={onTransplant}
          className="w-full py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-mono font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">content_cut</span>
          <span>Transplant Module</span>
        </button>
      )}
    </div>
  );
};
