import React, { useEffect, useState } from 'react';
import { ProjectSpecimen } from '../../types';

const isProjectDormantOver2Months = (dormantDuration?: string): boolean => {
  if (!dormantDuration) return false;
  const text = dormantDuration.toLowerCase().trim();
  if (text.includes('yr') || text.includes('year')) return true;
  const match = text.match(/(\d+)\s*(mos|mo|month|m)/);
  if (match) {
    const months = parseInt(match[1], 10);
    return months >= 2;
  }
  return false;
};

interface DormancyAlertToastProps {
  specimen: ProjectSpecimen | null;
  onClose: () => void;
  onNavigateToCompass?: (specimen: ProjectSpecimen) => void;
}

export const DormancyAlertToast: React.FC<DormancyAlertToastProps> = ({
  specimen,
  onClose,
  onNavigateToCompass,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (specimen && isProjectDormantOver2Months(specimen.dormantDuration)) {
      setIsVisible(true);

      // Play soft subtle chime via Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch {
        // AudioContext disabled or blocked by browser policy; fail silently
      }

      // Auto dismiss after 9 seconds if untouched
      const timer = setTimeout(() => {
        handleDismiss();
      }, 9000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [specimen]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  if (!specimen || !isProjectDormantOver2Months(specimen.dormantDuration)) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed top-18 right-4 sm:right-6 z-50 max-w-xs w-[88vw] sm:w-[310px] transition-all duration-300 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-surface-container rounded-xl p-2.5 sm:p-3 shadow-xl border border-secondary/40 backdrop-blur-xl relative overflow-hidden clay-card">
        {/* Soft amber top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

        <div className="flex items-center justify-between gap-2.5">
          {/* Left: Clock Icon + Title + Dormancy note */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
              <span className="material-symbols-outlined text-base">history_toggle_off</span>
            </div>
            <div className="min-w-0 flex flex-col">
              <h4 className="font-sans font-bold text-xs text-on-surface truncate">
                {specimen.title}
              </h4>
              <p className="font-sans text-[11px] text-on-surface-variant truncate">
                Dormant for {specimen.dormantDuration}
              </p>
            </div>
          </div>

          {/* Right: Inline Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onNavigateToCompass && (
              <button
                type="button"
                onClick={() => {
                  onNavigateToCompass(specimen);
                  handleDismiss();
                }}
                className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-[11px] font-sans font-semibold transition-all shadow-2xs flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <span>Revive</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleDismiss}
              title="Dismiss"
              className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
