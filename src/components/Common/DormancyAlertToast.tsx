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
      className={`fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-[92vw] sm:w-[380px] transition-all duration-300 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-surface-container rounded-2xl p-4 shadow-2xl border border-secondary/40 backdrop-blur-xl relative overflow-hidden clay-card">
        {/* Soft amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Animated Dormancy Clock Icon */}
            <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 shadow-xs mt-0.5 border border-secondary/25">
              <span className="material-symbols-outlined text-xl animate-pulse">
                history_toggle_off
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <h4 className="font-sans font-bold text-sm text-on-surface truncate">
                {specimen.title}
              </h4>
              <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5 leading-relaxed">
                This project has been dormant for <span className="font-semibold text-on-surface">{specimen.dormantDuration}</span>. Run a viability check or salvage reusable modules before code decay sets in.
              </p>
            </div>
          </div>

          {/* Close button (top right) */}
          <button
            type="button"
            onClick={handleDismiss}
            title="Dismiss notification"
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-outline-variant/40">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-lg text-xs font-sans text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>

          {onNavigateToCompass && (
            <button
              type="button"
              onClick={() => {
                onNavigateToCompass(specimen);
                handleDismiss();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-sans font-semibold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-xs">explore</span>
              <span>Check Revival</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
