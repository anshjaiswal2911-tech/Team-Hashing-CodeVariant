import React from 'react';
import { ScreenId } from '../types';
import { MortalityPieChart } from '../components/Insights/MortalityPieChart';

interface PatternInsightsViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const PatternInsightsView: React.FC<PatternInsightsViewProps> = ({ onNavigate }) => {
  const causes = [
    { name: 'Scope Creep', count: 5, pct: 36, desc: 'Feature requests outpacing core stabilization' },
    { name: 'Time Shortage', count: 4, pct: 29, desc: 'Academic terms, job changes, or life events' },
    { name: 'Technical Blocker', count: 3, pct: 21, desc: 'Upstream breaking changes or unsolvable edge performance' },
    { name: 'Better Idea Came', count: 1, pct: 7, desc: 'Sudden paradigm shifts and AI pivots' },
    { name: 'Hackathon Ended', count: 1, pct: 7, desc: 'Clock expired before store submission' },
  ];

  return (
    <div className="flex flex-col w-full space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs uppercase tracking-widest font-semibold">
          <span className="material-symbols-outlined text-sm">insights</span>
          <span>Archive Folio // Pattern Insights</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Why We Stop: The Anatomy of Dormancy
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Aggregated learnings across 14 preserved repositories. Mapping abandonment symptoms removes
          guilt and reveals reusable patterns for your next sprint.
        </p>
      </div>

      {/* Top 3 Analytical Vitrines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-[26px] bg-surface-container border border-outline-variant/80 shadow-sm space-y-2 clay-card">
          <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Median Velocity Before Stall
          </span>
          <div className="font-sans text-4xl font-bold text-on-surface tracking-tight">3.4 Weeks</div>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Projects peak in initial momentum around day 24 before hitting architectural fatigue.
          </p>
        </div>

        <div className="p-6 rounded-[26px] bg-surface-container border border-outline-variant/80 shadow-sm space-y-2 clay-card">
          <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Average Code Harvest Yield
          </span>
          <div className="font-sans text-4xl font-bold text-on-surface tracking-tight">68.4%</div>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Over two-thirds of written code (auth, schemas, custom hooks) remains directly reusable.
          </p>
        </div>

        <div className="p-6 rounded-[26px] bg-surface-container border border-outline-variant/80 shadow-sm space-y-2 clay-card">
          <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Solo vs Collaborative Stall
          </span>
          <div className="font-sans text-4xl font-bold text-on-surface tracking-tight">82% Solo</div>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Isolation is the biggest driver of dormancy; collaborative accountability prolongs viability.
          </p>
        </div>
      </div>

      {/* Cause of Dormancy Stratification */}
      <div className="bg-surface-container rounded-[28px] p-6 lg:p-7 border border-outline-variant/80 shadow-sm space-y-6 clay-card">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/50">
          <div>
            <h2 className="font-sans text-xl font-bold text-on-surface tracking-tight">Recurring Dormancy Archetypes</h2>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">
              Breakdown across all 14 catalogued specimens
            </p>
          </div>
          <span className="font-mono text-xs text-on-surface-variant font-semibold">9 Root Archetypes</span>
        </div>

        <div className="space-y-4">
          {causes.map((c) => (
            <div key={c.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary clay-pill shadow-sm"></span>
                  <span className="font-semibold text-on-surface">{c.name}</span>
                  <span className="font-mono text-on-surface-variant text-[11px]">({c.count} specimens)</span>
                </div>
                <span className="font-mono font-bold text-on-surface">{c.pct}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden clay-inset">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Root Causes Distribution Chart */}
      <MortalityPieChart />

      {/* Curator’s Antidote Playbook in Deep Dark Luxury Panel */}
      <div className="panel-dark rounded-[28px] p-6 lg:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-xl text-secondary">medical_services</span>
          <h3 className="font-sans text-lg font-bold tracking-tight">The Conservatory Antidote Playbook</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/80 pt-1">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 leading-relaxed">
            <strong className="text-white block font-sans text-sm font-semibold mb-1">1. The One-Button Cut</strong>
            When scope begins to swell, remove three features before writing another line of code.
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 leading-relaxed">
            <strong className="text-white block font-sans text-sm font-semibold mb-1">2. Two-Hour Timeboxing</strong>
            Never revive a project with a grand weekend plan. Begin with a single 120-minute focus sprint.
          </div>
        </div>
      </div>
    </div>
  );
};
