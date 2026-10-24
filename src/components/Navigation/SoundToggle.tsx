import React, { useState, useEffect, useRef } from 'react';

interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const startTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz restorative tone

      // Soft envelope
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;
      oscRef.current = osc;
    } catch {
      // AudioContext may be restricted by autoplay policy
    }
  };

  const stopTone = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        setTimeout(() => {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          gainNodeRef.current = null;
          oscRef.current = null;
        }, 550);
      }
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopTone();
      setIsPlaying(false);
    } else {
      startTone();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopTone();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? 'Mute 432Hz restorative ambient tone' : 'Play 432Hz ambient botanical soundscape'}
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
