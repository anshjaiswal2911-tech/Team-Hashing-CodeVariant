import React from 'react';

interface TelemetryChipProps {
  label: string;
  value: string | number;
  status?: 'healthy' | 'warning' | 'standby';
  className?: string;
}

export const TelemetryChip: React.FC<TelemetryChipProps> = ({
  label,
  value,
  status = 'healthy',
  className = '',
}) => {
  const statusColors = {
    healthy: 'bg-secondary',
    warning: 'bg-[#DE8553]',
    standby: 'bg-outline-variant',
  }[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-container/70 border border-outline-variant/60 text-xs font-mono backdrop-blur-sm ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${statusColors} animate-pulse`} aria-hidden="true" />
      <span className="text-on-surface-variant uppercase text-[10px] tracking-wider">{label}:</span>
      <span className="font-semibold text-on-surface">{value}</span>
    </div>
  );
};
