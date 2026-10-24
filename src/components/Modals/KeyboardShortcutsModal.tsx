import React from 'react';

interface ShortcutItem {
  keys: string[];
  description: string;
  category: 'Navigation' | 'Actions' | 'Forensics';
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ['⌘', 'K'], description: 'Open omni-search for vaults & code snippets', category: 'Navigation' },
  { keys: ['G', 'O'], description: 'Navigate to Overview Dashboard', category: 'Navigation' },
  { keys: ['G', 'A'], description: 'Navigate to Memorial Archive', category: 'Navigation' },
  { keys: ['G', 'S'], description: 'Navigate to Salvage Yard', category: 'Navigation' },
  { keys: ['G', 'R'], description: 'Navigate to Revival Compass', category: 'Navigation' },
  { keys: ['B'], description: 'Bury a new abandoned repository', category: 'Actions' },
  { keys: ['T'], description: 'Cycle ambience theme (Dark / Ivory / Terracotta)', category: 'Actions' },
  { keys: ['M'], description: 'Toggle 432Hz ambient soundscape', category: 'Actions' },
  { keys: ['Esc'], description: 'Close current modal or overlay plate', category: 'Actions' },
  { keys: ['?'], description: 'Display this keyboard shortcuts cheatsheet', category: 'Actions' },
  { keys: ['E'], description: 'Export full JSON vault backup', category: 'Forensics' },
  { keys: ['S'], description: 'Trigger spark revival celebration', category: 'Forensics' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const categories = ['Navigation', 'Actions', 'Forensics'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-xl bg-surface-container rounded-xl shadow-2xl border border-secondary/30 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-xl">keyboard</span>
            <div>
              <h3 className="font-serif text-base font-bold text-on-surface leading-tight">
                Keyboard Shortcuts Cheatsheet
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-outline">
                Conservatory Rapid Hotkeys // Vim & Power User Bindings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {categories.map((cat) => {
            const items = SHORTCUTS.filter((s) => s.category === cat);
            return (
              <div key={cat} className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-semibold">
                  {cat} Hotkeys
                </span>
                <div className="rounded-lg bg-surface-container-lowest border border-surface-container-high/40 divide-y divide-surface-container-high/30">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2.5 flex items-center justify-between gap-4 text-xs"
                    >
                      <span className="text-on-surface-variant font-sans">
                        {item.description}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-[11px] font-semibold border border-outline-variant/60 shadow-xs"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="font-mono text-[11px] text-outline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface border border-outline-variant text-[10px]">Esc</kbd> anytime to dismiss
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors border border-outline-variant/60"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
