import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: 'square' | 'circle' | 'sparkle';
  rotation: number;
  vx: number;
  vy: number;
}

interface ConfettiBurstProps {
  trigger: boolean;
  onComplete?: () => void;
  particleCount?: number;
}

const COLORS = [
  '#4ade80', // emerald / secondary
  '#22d3ee', // cyan / primary
  '#fbbf24', // amber / warning
  '#a855f7', // purple / tertiary
  '#f43f5e', // rose
  '#e2e8f0', // on-surface
];

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  trigger,
  onComplete,
  particleCount = 40,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 40 + Math.random() * 80;
      return {
        id: i,
        x: 0,
        y: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: i % 3 === 0 ? 'sparkle' : i % 2 === 0 ? 'circle' : 'square',
        rotation: Math.random() * 360,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 20,
      };
    });

    setParticles(newParticles);
    setIsActive(true);

    const timer = setTimeout(() => {
      setIsActive(false);
      setParticles([]);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [trigger, particleCount, onComplete]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="relative w-0 h-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.shape !== 'sparkle' ? p.color : undefined,
              borderRadius: p.shape === 'circle' ? '9000px' : p.shape === 'square' ? '2px' : '0',
              transform: `translate(${p.vx * 1.5}px, ${p.vy * 1.5}px) rotate(${p.rotation}deg)`,
              transition: 'all 1.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              opacity: 0.9,
            }}
          >
            {p.shape === 'sparkle' && (
              <svg
                viewBox="0 0 24 24"
                fill={p.color}
                style={{ width: `${p.size * 1.6}px`, height: `${p.size * 1.6}px` }}
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
