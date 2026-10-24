import React from 'react';

interface SpecimenRadarScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export const SpecimenRadarScore: React.FC<SpecimenRadarScoreProps> = ({
  score,
  size = 56,
  strokeWidth = 5,
  showLabel = true,
  className = '',
}) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return '#4E6E5D'; // Secondary / lush botanical
    if (val >= 50) return '#2D5A43'; // Primary botanical
    if (val >= 30) return '#DE8553'; // Warm amber warning
    return '#BA1A1A'; // Error / critical decay
  };

  const color = getScoreColor(normalizedScore);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-outline-variant/30"
          fill="none"
        />
        {/* Progress bar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xs font-bold text-on-surface leading-none">
            {normalizedScore}
          </span>
          <span className="text-[8px] font-mono text-on-surface-variant uppercase tracking-tighter">
            SCORE
          </span>
        </div>
      )}
    </div>
  );
};
