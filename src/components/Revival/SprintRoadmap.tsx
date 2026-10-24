import React from 'react';

export interface SprintMilestone {
  timeBlock: string;
  phase: string;
  task: string;
  deliverable: string;
}

interface SprintRoadmapProps {
  projectTitle: string;
  milestones?: SprintMilestone[];
  className?: string;
}

const DEFAULT_MILESTONES: SprintMilestone[] = [
  {
    timeBlock: '00 - 30 min',
    phase: 'Phase 1: Environment Unthaw',
    task: 'Clone specimen, bump node dependencies to LTS, run type check audit.',
    deliverable: 'Clean build & zero deprecation warnings',
  },
  {
    timeBlock: '30 - 60 min',
    phase: 'Phase 2: Core Loop Revival',
    task: 'Patch primary cause of demise; replace deprecated API bindings with standard mocks.',
    deliverable: 'Interactive single-user demo functioning',
  },
  {
    timeBlock: '60 - 90 min',
    phase: 'Phase 3: Component Grafting',
    task: 'Harvest zero-dependency UI tokens and DB schemas from Salvage Yard.',
    deliverable: 'Polished dashboard layout & mock database',
  },
  {
    timeBlock: '90 - 120 min',
    phase: 'Phase 4: Launch Vitrine',
    task: 'Configure deployment configuration, update README documentation, launch staging preview.',
    deliverable: 'Live public demonstration URL',
  },
];

export const SprintRoadmap: React.FC<SprintRoadmapProps> = ({
  projectTitle,
  milestones = DEFAULT_MILESTONES,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-secondary">
              timer
            </span>
            120-Minute Revival Blueprint
          </h4>
          <p className="text-[11px] text-on-surface-variant font-sans">
            Action roadmap for resurrecting <strong className="text-on-surface">{projectTitle}</strong>
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/40 text-[10px] font-mono font-bold">
          2-Hour Sprint
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-surface-container/70 border border-outline-variant/60 hover:border-primary/50 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center justify-between text-mono">
              <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">
                {m.timeBlock}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                Step 0{idx + 1}
              </span>
            </div>

            <h5 className="font-serif text-sm font-medium text-on-surface">
              {m.phase}
            </h5>

            <p className="text-[11px] text-on-surface-variant leading-relaxed font-sans">
              {m.task}
            </p>

            <div className="pt-1.5 border-t border-outline-variant/40 flex items-center gap-1 text-[10px] font-mono text-primary font-medium">
              <span className="material-symbols-outlined text-xs">flag</span>
              <span>Target: {m.deliverable}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
