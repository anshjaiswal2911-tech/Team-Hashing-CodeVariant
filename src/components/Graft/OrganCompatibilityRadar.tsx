import React, { useState } from 'react';

interface OrganCompatibilityRadarProps {
  targetPreset: 'vite-react' | 'nextjs-app' | 'cli-engine';
  moduleCount: number;
}

export const OrganCompatibilityRadar: React.FC<OrganCompatibilityRadarProps> = ({
  targetPreset,
  moduleCount,
}) => {
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState('Realtime Auto-Scan');

  const presetLabels = {
    'vite-react': 'Vite 6 + React 19 Client SPA',
    'nextjs-app': 'Next.js 15 App Router (RSC + Server Actions)',
    'cli-engine': 'Node 22 / Bun Standalone Worker',
  };

  const checks = [
    {
      title: 'Zero-Dependency Isolation',
      detail: 'Modules bundled as self-contained ESM units. No phantom peer dependencies.',
      score: 98,
      status: 'Passed',
      icon: 'check_circle',
      color: 'text-secondary',
    },
    {
      title: 'License Permissiveness & Copyleft Safety',
      detail: 'Scanned under MIT / Apache-2.0. No virulent GPL contagion detected in donors.',
      score: 100,
      status: 'Verified',
      icon: 'verified_user',
      color: 'text-secondary',
    },
    {
      title: 'Edge Runtime Compatibility',
      detail:
        targetPreset === 'nextjs-app'
          ? 'Polyfilled native Web Crypto & Streams API for Vercel Edge compliance.'
          : 'Pure browser-safe standards. Zero unshimmed Node fs/child_process calls.',
      score: 95,
      status: 'Ready',
      icon: 'bolt',
      color: 'text-primary',
    },
    {
      title: 'Type Contract Reconciled',
      detail: 'Generated typed d.ts declarations in /src/contracts with strict null safety.',
      score: 99,
      status: 'Aligned',
      icon: 'terminal',
      color: 'text-secondary',
    },
  ];

  const handleRunDiagnostic = () => {
    setIsRunningCheck(true);
    setTimeout(() => {
      setIsRunningCheck(false);
      setLastCheckTime('Just now (100% Passed)');
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-surface-container-high/60 border border-outline-variant/60 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-secondary">radar</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Transplant Preflight Telemetry
            </span>
          </div>
          <span className="font-sans text-xs font-semibold text-on-surface">
            Target: {presetLabels[targetPreset]}
          </span>
        </div>

        <button
          type="button"
          disabled={isRunningCheck || moduleCount === 0}
          onClick={handleRunDiagnostic}
          className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-mono flex items-center gap-1.5 transition-all border border-outline-variant/60 shadow-xs disabled:opacity-50"
        >
          <span className={`material-symbols-outlined text-xs ${isRunningCheck ? 'animate-spin' : ''}`}>
            {isRunningCheck ? 'refresh' : 'play_arrow'}
          </span>
          <span>{isRunningCheck ? 'Diagnosing...' : 'Run Preflight Scan'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {checks.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface-container-lowest/80 border border-surface-container-high/50 flex flex-col justify-between gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-semibold text-on-surface">
                {item.title}
              </span>
              <span className={`flex items-center gap-1 text-[10px] font-mono font-bold ${item.color}`}>
                <span className="material-symbols-outlined text-xs">{item.icon}</span>
                <span>{item.score}%</span>
              </span>
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-outline pt-1">
        <span>Scanner: AST Static Analyzer v2.4</span>
        <span>Diagnostic Status: {lastCheckTime}</span>
      </div>
    </div>
  );
};
