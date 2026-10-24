import React from 'react';

interface DependencyGraphProps {
  moduleName: string;
  externalDepsCount?: number;
  linesOfCode: number;
  className?: string;
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({
  moduleName,
  externalDepsCount = 0,
  linesOfCode,
  className = '',
}) => {
  const isZeroDep = externalDepsCount === 0;

  return (
    <div className={`p-3.5 rounded-2xl bg-surface-container/60 border border-outline-variant/60 space-y-2.5 font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-sm text-secondary">
            hub
          </span>
          <span className="font-semibold text-xs">{moduleName}</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
            isZeroDep
              ? 'bg-secondary/15 text-secondary border-secondary/40'
              : 'bg-[#DE8553]/15 text-[#DE8553] border-[#DE8553]/40'
          }`}
        >
          {isZeroDep ? 'Zero Dependencies' : `${externalDepsCount} External Deps`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-xl bg-surface-container border border-outline-variant/40 space-y-0.5">
          <span className="text-[10px] text-on-surface-variant uppercase">Lines of Code</span>
          <div className="font-bold text-on-surface">{linesOfCode} LOC</div>
        </div>
        <div className="p-2 rounded-xl bg-surface-container border border-outline-variant/40 space-y-0.5">
          <span className="text-[10px] text-on-surface-variant uppercase">Purity Rating</span>
          <div className="font-bold text-secondary">100% Sanitized</div>
        </div>
      </div>
    </div>
  );
};
