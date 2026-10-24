import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const variantStyles = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4',
  }[variant];

  return (
    <div
      style={{ width, height }}
      className={`animate-pulse bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container bg-[length:200%_100%] ${variantStyles} ${className}`}
      aria-hidden="true"
    />
  );
};
