import React, { useState } from 'react';
import { ProjectSpecimen } from '../../types';

interface CanvasProtocolDockProps {
  onAutopsyDrop: (specimen: ProjectSpecimen) => void;
  onRevivalDrop: (specimen: ProjectSpecimen) => void;
  onDigitalWillDrop: (specimen: ProjectSpecimen) => void;
  onExhumeDrop: (specimen: ProjectSpecimen) => void;
  activeDraggedSpecimen: ProjectSpecimen | null;
  onClearDragged: () => void;
}

export const CanvasProtocolDock: React.FC<CanvasProtocolDockProps> = ({
  onAutopsyDrop,
  onRevivalDrop,
  onDigitalWillDrop,
  onExhumeDrop,
  activeDraggedSpecimen,
  onClearDragged,
}) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (activeZone !== zoneId) {
      setActiveZone(zoneId);
    }
  };

  const handleDragLeave = (_e: React.DragEvent, zoneId: string) => {
    if (activeZone === zoneId) {
      setActiveZone(null);
    }
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    setActiveZone(null);

    let specimen: ProjectSpecimen | null = activeDraggedSpecimen;
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        if (parsed.specimen) {
          specimen = parsed.specimen;
        }
      }
    } catch {
      // Fallback to activeDraggedSpecimen from state
    }

    if (!specimen) return;

    if (zoneId === 'autopsy') {
      setLastActionMessage(`Transferred ${specimen.title} to Forensic Autopsy Altar`);
      onAutopsyDrop(specimen);
    } else if (zoneId === 'revival') {
      setLastActionMessage(`Placed ${specimen.title} into Revival Compass Crucible`);
      onRevivalDrop(specimen);
    } else if (zoneId === 'will') {
      setLastActionMessage(`Inscribed Reincarnation Will for ${specimen.title}`);
      onDigitalWillDrop(specimen);
    } else if (zoneId === 'exhume') {
      setLastActionMessage(`Exhumed and removed ${specimen.title} from vaults`);
      onExhumeDrop(specimen);
    }

    onClearDragged();
    setTimeout(() => setLastActionMessage(null), 4000);
  };

  const isDraggingAny = Boolean(activeDraggedSpecimen);

  return (
    <aside
      aria-label="The Canvas Protocol Action Deck"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-5xl transition-all duration-300 ease-out select-none ${
        isMinimized ? 'translate-y-[calc(100%-42px)] opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-[#FAF6F0]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-outline-variant/80 shadow-[0_16px_36px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.08)] relative overflow-hidden clay-card">
        {/* Top Control Bar & Canvas Badge */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-outline-variant/50 gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-on-surface tracking-wider uppercase flex items-center gap-1.5">
              <span>🎨 THE CANVAS PROTOCOL</span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[9px] font-semibold">
                DRAG & DROP ACTION DOCK
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {lastActionMessage ? (
              <span className="text-[11px] font-mono text-primary font-medium animate-in fade-in flex items-center gap-1 truncate max-w-[200px] sm:max-w-none">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                <span>{lastActionMessage}</span>
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-sans text-on-surface-variant italic">
                {isDraggingAny
                  ? 'Release card inside any Action Zone below ⬇'
                  : 'Drag any project card here to perform actions'}
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-xs flex items-center gap-1"
              title={isMinimized ? 'Expand Canvas Dock' : 'Minimize Canvas Dock'}
            >
              <span className="material-symbols-outlined text-sm">
                {isMinimized ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </span>
              <span className="text-[10px] font-mono hidden sm:inline">
                {isMinimized ? 'Expand' : 'Dock'}
              </span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Drop Zones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pt-2.5 sm:pt-3">
          {/* ZONE 1: Forensic Autopsy Altar */}
          <div
            onDragOver={(e) => handleDragOver(e, 'autopsy')}
            onDragLeave={(e) => handleDragLeave(e, 'autopsy')}
            onDrop={(e) => handleDrop(e, 'autopsy')}
            className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group ${
              activeZone === 'autopsy'
                ? 'bg-primary/25 border-primary scale-[1.03] shadow-lg ring-2 ring-primary/40'
                : isDraggingAny
                ? 'bg-primary/10 border-primary/50 animate-pulse border-dashed'
                : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/60'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-base sm:text-lg">biotech</span>
            </div>
            <span className="font-serif text-xs font-bold text-on-surface block leading-tight">
              Autopsy Altar
            </span>
            <span className="text-[10px] font-sans text-on-surface-variant mt-0.5 leading-snug">
              {activeZone === 'autopsy' ? 'Release to Examine tissue' : 'Drop to view Autopsy'}
            </span>
          </div>

          {/* ZONE 2: Revival Crucible */}
          <div
            onDragOver={(e) => handleDragOver(e, 'revival')}
            onDragLeave={(e) => handleDragLeave(e, 'revival')}
            onDrop={(e) => handleDrop(e, 'revival')}
            className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group ${
              activeZone === 'revival'
                ? 'bg-secondary/25 border-secondary scale-[1.03] shadow-lg ring-2 ring-secondary/40'
                : isDraggingAny
                ? 'bg-secondary/10 border-secondary/50 animate-pulse border-dashed'
                : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/60'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-base sm:text-lg">explore</span>
            </div>
            <span className="font-serif text-xs font-bold text-on-surface block leading-tight">
              Revival Crucible
            </span>
            <span className="text-[10px] font-sans text-on-surface-variant mt-0.5 leading-snug">
              {activeZone === 'revival' ? 'Release to Ignite Sprint' : 'Drop to Revive & Sprint'}
            </span>
          </div>

          {/* ZONE 3: Digital Will Scribe */}
          <div
            onDragOver={(e) => handleDragOver(e, 'will')}
            onDragLeave={(e) => handleDragLeave(e, 'will')}
            onDrop={(e) => handleDrop(e, 'will')}
            className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group ${
              activeZone === 'will'
                ? 'bg-amber-500/25 border-amber-500 scale-[1.03] shadow-lg ring-2 ring-amber-500/40'
                : isDraggingAny
                ? 'bg-amber-500/10 border-amber-500/50 animate-pulse border-dashed'
                : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/60'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-base sm:text-lg">history_edu</span>
            </div>
            <span className="font-serif text-xs font-bold text-on-surface block leading-tight">
              Digital Will Scribe
            </span>
            <span className="text-[10px] font-sans text-on-surface-variant mt-0.5 leading-snug">
              {activeZone === 'will' ? 'Release to Inscribe Deed' : 'Drop to Mint Bequest'}
            </span>
          </div>

          {/* ZONE 4: Exhumation Kiln (Delete) */}
          <div
            onDragOver={(e) => handleDragOver(e, 'exhume')}
            onDragLeave={(e) => handleDragLeave(e, 'exhume')}
            onDrop={(e) => handleDrop(e, 'exhume')}
            className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer group ${
              activeZone === 'exhume'
                ? 'bg-error/25 border-error scale-[1.03] shadow-lg ring-2 ring-error/40'
                : isDraggingAny
                ? 'bg-error/10 border-error/50 animate-pulse border-dashed'
                : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/60'
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-error/15 text-error flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-base sm:text-lg">delete_forever</span>
            </div>
            <span className="font-serif text-xs font-bold text-error block leading-tight">
              Exhumation Kiln
            </span>
            <span className="text-[10px] font-sans text-on-surface-variant mt-0.5 leading-snug">
              {activeZone === 'exhume' ? 'Release to Incinerate Record' : 'Drop to Exhume / Delete'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
