import React from 'react';

export interface PathologySlice {
  label: string;
  percentage: number;
  count: number;
  color: string;
}

interface MortalityPieChartProps {
  slices?: PathologySlice[];
  className?: string;
}

const DEFAULT_SLICES: PathologySlice[] = [
  { label: 'Time & Graduation', percentage: 38, count: 18, color: '#4E6E5D' },
  { label: 'Scope Creep', percentage: 26, count: 12, color: '#2D5A43' },
  { label: 'Funding & Server Cost', percentage: 20, count: 9, color: '#DE8553' },
  { label: 'Technical Complexity', percentage: 16, count: 7, color: '#BA1A1A' },
];

export const MortalityPieChart: React.FC<MortalityPieChartProps> = ({
  slices = DEFAULT_SLICES,
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-3xl bg-surface-container/70 border border-outline-variant/60 space-y-4 clay-card ${className}`}>
      <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
        <div>
          <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-bold">
            Forensic Demise Taxonomy
          </span>
          <h4 className="font-serif text-lg text-on-surface">
            Root Causes of Death Distribution
          </h4>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-xs font-mono text-on-surface-variant">
          46 Projects Sampled
        </span>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-surface-container-lowest">
        {slices.map((slice, idx) => (
          <div
            key={idx}
            style={{ width: `${slice.percentage}%`, backgroundColor: slice.color }}
            title={`${slice.label}: ${slice.percentage}%`}
            className="h-full transition-all duration-500 hover:opacity-80"
          />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs font-mono">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: slice.color }}
            />
            <div className="flex-1 flex items-center justify-between min-w-0">
              <span className="text-on-surface truncate">{slice.label}</span>
              <span className="text-on-surface-variant font-bold ml-1">
                {slice.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
