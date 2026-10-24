import React, { useState } from 'react';
import { GRAVEYARD_CHANGELOG, ChangelogRelease } from '../../data/changelog';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState<string>(
    GRAVEYARD_CHANGELOG[0]?.version || '2.4.0'
  );

  if (!isOpen) return null;

  const currentRelease: ChangelogRelease =
    GRAVEYARD_CHANGELOG.find((r) => r.version === selectedVersion) || GRAVEYARD_CHANGELOG[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-2xl bg-surface-container rounded-xl shadow-2xl border border-secondary/30 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-xl">history_edu</span>
            <div>
              <h3 className="font-serif text-base font-bold text-on-surface leading-tight">
                Graveyard Engine Changelog
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-outline">
                Continuous Build Milestones // Round 2
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

        {/* Version Selector Tabs */}
        <div className="px-6 py-2 bg-surface-container-lowest border-b border-surface-container-high/60 flex items-center gap-2 overflow-x-auto">
          {GRAVEYARD_CHANGELOG.map((rel) => (
            <button
              key={rel.version}
              type="button"
              onClick={() => setSelectedVersion(rel.version)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                rel.version === currentRelease.version
                  ? 'bg-secondary text-on-secondary shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span>v{rel.version}</span>
              {rel.isLatest && (
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-surface-container-lowest/80 text-on-surface font-sans">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Release Detail Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Release Title Banner */}
          <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-on-surface">
                  v{currentRelease.version} — {currentRelease.codename}
                </span>
                {currentRelease.isLatest && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-secondary/20 text-secondary border border-secondary/30">
                    LATEST BUILD
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-outline mt-1">
                Preserved Release Date: {currentRelease.releaseDate}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
              <span className="material-symbols-outlined text-lg">deployed_code</span>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-secondary font-semibold mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span>Release Highlights</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {currentRelease.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-surface-container-lowest/70 border border-surface-container-high/40 flex items-center gap-2.5 text-xs text-on-surface"
                >
                  <span className="material-symbols-outlined text-secondary text-base shrink-0">
                    check_circle
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Changes by Category */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-outline font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
              <span>Detailed Breakdown</span>
            </h4>

            {currentRelease.changes.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="inline-block px-2.5 py-1 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-surface-container-high text-primary">
                  {cat.category}
                </span>
                <ul className="space-y-1.5 pl-2">
                  {cat.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-xs text-on-surface-variant flex items-start gap-2"
                    >
                      <span className="text-secondary select-none mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="font-mono text-[11px] text-outline">
            Build 01 • Round 2 Live Repository
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors border border-outline-variant/60"
          >
            Close Changelog
          </button>
        </div>
      </div>
    </div>
  );
};
