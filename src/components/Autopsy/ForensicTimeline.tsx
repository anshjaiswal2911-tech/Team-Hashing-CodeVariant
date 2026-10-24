import React from 'react';

export interface ForensicCommitEvent {
  hash: string;
  message: string;
  author: string;
  date: string;
  significance: 'milestone' | 'warning' | 'terminal';
}

interface ForensicTimelineProps {
  commits?: ForensicCommitEvent[];
  className?: string;
}

const DEFAULT_COMMITS: ForensicCommitEvent[] = [
  {
    hash: 'e3a8901',
    message: 'feat: initial canvas rendering engine & WebGL shader pipeline',
    author: 'Primary Architect',
    date: '3 weeks before demise',
    significance: 'milestone',
  },
  {
    hash: 'b712c44',
    message: 'refactor: attempt multi-tenant state isolation (unstable)',
    author: 'Primary Architect',
    date: '10 days before demise',
    significance: 'warning',
  },
  {
    hash: 'f94101e',
    message: 'chore: last commit before hiatus / team graduation',
    author: 'Primary Architect',
    date: 'Final day',
    significance: 'terminal',
  },
];

export const ForensicTimeline: React.FC<ForensicTimelineProps> = ({
  commits = DEFAULT_COMMITS,
  className = '',
}) => {
  const badgeStyles = {
    milestone: 'bg-secondary/15 text-secondary border-secondary/40',
    warning: 'bg-[#DE8553]/15 text-[#DE8553] border-[#DE8553]/40',
    terminal: 'bg-error-container text-on-error-container border-error/40',
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
          Forensic Git Cadence & Demise Timeline
        </h4>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant border border-outline-variant/60">
          Terminal Trace
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/60">
        {commits.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node icon */}
            <div
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-surface-container flex items-center justify-center ${
                event.significance === 'terminal'
                  ? 'border-error text-error'
                  : event.significance === 'warning'
                  ? 'border-[#DE8553] text-[#DE8553]'
                  : 'border-secondary text-secondary'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>

            <div className="p-3 rounded-2xl bg-surface-container/60 border border-outline-variant/60 space-y-1.5 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] font-bold text-on-surface">
                  {event.hash}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${badgeStyles[event.significance]}`}
                >
                  {event.significance}
                </span>
              </div>
              <p className="text-xs font-mono text-on-surface leading-tight">
                {event.message}
              </p>
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono pt-1">
                <span>{event.author}</span>
                <span>{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
