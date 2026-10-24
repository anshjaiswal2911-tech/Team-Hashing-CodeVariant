import React from 'react';

interface ViabilityMetricCardProps {
  label: string;
  score: number;
  maxScore: number;
  description: string;
  icon: string;
  className?: string;
}

export const ViabilityMetricCard: React.FC<ViabilityMetricCardProps> = ({
  label,
  score,
  maxScore,
  description,
  icon,
  className = '',
}) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className={`p-4 rounded-2xl bg-surface-container/70 border border-outline-variant/60 space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-primary">{icon}</span>
          <span className="font-serif text-sm font-medium text-on-surface">{label}</span>
        </div>
        <span className="font-mono text-xs font-bold text-on-surface">
          {score} / {maxScore}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-[11px] text-on-surface-variant font-sans leading-tight">
        {description}
      </p>
    </div>
  );
};
