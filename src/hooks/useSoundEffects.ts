import { useState, useRef, useCallback } from 'react';

export const useSoundEffects = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // 432Hz Botanical Harmonic Chime
  const playHarmonicChime = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(864, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1800);
    } catch {
      // AudioContext not allowed or unsupported
    }
  }, [getAudioContext]);

  // Click / Ratchet sound for salvage module selection
  const playClick = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore audio error
    }
  }, [getAudioContext]);

  // Success / Revival Triumph chord
  const playRevivalTriumph = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const freqs = [432, 540, 648]; // Major chord tuned to 432Hz base

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2 + idx * 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + 1.2 + idx * 0.1);
      });
    } catch {
      // Ignore audio error
    }
  }, [getAudioContext]);

  return {
    isPlaying,
    playHarmonicChime,
    playClick,
    playRevivalTriumph,
  };
};
