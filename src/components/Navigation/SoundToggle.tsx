import React, { useState } from 'react';

interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? 'Mute 432Hz conservatory chime' : 'Play 432Hz ambient botanical soundscape'}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
        isPlaying
          ? 'bg-secondary text-on-secondary border-secondary font-bold shadow-sm'
          : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border-outline-variant/60'
      } ${className}`}
    >
      <span className="material-symbols-outlined text-xs">
        {isPlaying ? 'graphic_eq' : 'volume_up'}
      </span>
      <span>{isPlaying ? '432Hz Active' : 'Sound'}</span>
      {isPlaying && (
        <span className="w-1.5 h-1.5 rounded-full bg-on-secondary animate-pulse" />
      )}
    </button>
  );
};
