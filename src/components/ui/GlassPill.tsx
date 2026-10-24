import React from 'react';

interface GlassPillProps {
  label: string;
  subLabel?: string;
  icon?: string;
  accentColor?: 'primary' | 'secondary' | 'neutral';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const GlassPill: React.FC<GlassPillProps> = ({
  label,
  subLabel,
  icon,
  accentColor = 'neutral',
  interactive = false,
  onClick,
  className = '',
}) => {
  const accentClasses = {
    primary: 'border-primary/30 text-on-surface bg-primary-container/20',
    secondary: 'border-secondary/30 text-on-surface bg-secondary/10',
    neutral: 'border-outline-variant/60 text-on-surface bg-surface-container/60',
  }[accentColor];

  const Component = interactive ? 'button' : 'div';

  return (
    <Component
      type={interactive ? 'button' : undefined}
      onClick={interactive ? onClick : undefined}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-mono shadow-sm transition-all ${accentClasses} ${
        interactive ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:border-outline' : ''
      } ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-sm opacity-80">{icon}</span>}
      <span className="font-medium">{label}</span>
      {subLabel && (
        <>
          <span className="opacity-40">•</span>
          <span className="opacity-75">{subLabel}</span>
        </>
      )}
    </Component>
  );
};
