import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
          {label}
        </span>
        <span className="material-symbols-outlined text-secondary text-base">
          {icon}
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
          <span>{value}</span>
        </div>
        {subValue && (
          <div className="flex items-center gap-1 text-[11px] font-sans text-on-surface-variant pt-1">
            {trend === 'up' && (
              <span className="material-symbols-outlined text-xs text-secondary">trending_up</span>
            )}
            {trend === 'down' && (
              <span className="material-symbols-outlined text-xs text-error">trending_down</span>
            )}
            <span>{subValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};
