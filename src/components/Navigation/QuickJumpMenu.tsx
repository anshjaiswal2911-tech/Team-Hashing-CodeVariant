import React from 'react';
import { ScreenId } from '../../types';

interface QuickJumpMenuProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SCREENS: Array<{ id: ScreenId; label: string; icon: string }> = [
  { id: 'overview', label: 'Conservatory Grounds', icon: 'grid_view' },
  { id: 'bury-a-project', label: 'Bury a Specimen', icon: 'inventory_2' },
  { id: 'salvage-yard', label: 'The Salvage Yard', icon: 'inventory_2' },
  { id: 'revival-compass', label: 'The Revival Compass', icon: 'explore' },
  { id: 'graft-studio', label: 'Grafting Studio', icon: 'alt_route' },
  { id: 'pattern-insights', label: 'Forensic Insights', icon: 'psychology' },
  { id: 'archive', label: 'The Archival Crypt', icon: 'inventory' },
];

export const QuickJumpMenu: React.FC<QuickJumpMenuProps> = ({
  currentScreen,
  onNavigate,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-md bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/80 p-4 space-y-2">
        <div className="flex items-center justify-between px-2 pb-2 border-b border-outline-variant/40">
          <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
            Quick Jump Navigation
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant">Esc to close</span>
        </div>

        <div className="space-y-1">
          {SCREENS.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  onNavigate(screen.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{screen.icon}</span>
                  <span>{screen.label}</span>
                </div>
                {isActive && <span className="material-symbols-outlined text-xs">check</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
