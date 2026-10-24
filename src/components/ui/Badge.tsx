import React from 'react';

export type BadgeVariant = 'dormant' | 'preserved' | 'revived' | 'quarantined' | 'default' | 'primary' | 'secondary';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  dormant: 'bg-outline-variant/30 text-on-surface-variant border-outline-variant/60',
  preserved: 'bg-primary-container/80 text-on-primary-container border-primary/40',
  revived: 'bg-secondary/15 text-secondary border-secondary/40 font-semibold',
  quarantined: 'bg-error-container text-on-error-container border-error/40',
  default: 'bg-surface-container-high text-on-surface border-outline-variant/60',
  primary: 'bg-primary text-on-primary border-primary',
  secondary: 'bg-secondary text-on-secondary border-secondary',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 font-mono',
  md: 'text-xs px-2.5 py-1 font-mono',
  lg: 'text-sm px-3.5 py-1.5 font-sans font-medium',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'revived'
              ? 'bg-secondary'
              : variant === 'preserved'
              ? 'bg-primary'
              : variant === 'quarantined'
              ? 'bg-error'
              : 'bg-on-surface-variant'
          } ${pulse ? 'animate-pulse' : ''}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
