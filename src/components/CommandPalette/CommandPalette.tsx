import React, { useState, useEffect } from 'react';
import { ProjectSpecimen, SalvageModule, ScreenId } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  specimens: ProjectSpecimen[];
  salvageModules: SalvageModule[];
  onSelectSpecimen: (specimen: ProjectSpecimen) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  specimens,
  salvageModules,
  onSelectSpecimen,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // open triggered from outside or handled here
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSpecimens = specimens.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      s.causeCategory.toLowerCase().includes(query.toLowerCase())
  );

  const filteredModules = salvageModules.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase()) ||
      m.parentProject.toLowerCase().includes(query.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
      <div className="w-full max-w-2xl bg-surface-container rounded-xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-container-high/60 bg-surface-container-low">
          <span className="material-symbols-outlined text-outline text-xl">search</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dormant projects, reusable modules, epitaphs, tags..."
            className="w-full bg-transparent text-on-surface placeholder:text-outline text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
          <span className="text-[10px] text-outline font-mono px-1.5 py-0.5 rounded bg-surface-container-high">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 flex-1">
          {/* Quick Navigation Shortcuts */}
          {!query && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider px-2">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    onNavigate('bury-a-project');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-left text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
                  <span className="text-on-surface">Bury a New Project Ritual</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('revival-compass');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-left text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-base">explore</span>
                  <span className="text-on-surface">Revival Compass Diagnostic</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('salvage-yard');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-left text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-tertiary text-base">inventory_2</span>
                  <span className="text-on-surface">Browse Salvage Yard</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('graft-studio');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-left text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary text-base">join_inner</span>
                  <span className="text-on-surface">Open Graft Studio</span>
                </button>
              </div>
            </div>
          )}

          {/* Specimens */}
          {filteredSpecimens.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider px-2">
                Dormant Specimens ({filteredSpecimens.length})
              </span>
              <div className="space-y-1">
                {filteredSpecimens.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectSpecimen(item);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high/80 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-lg">filter_vintage</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-medium text-sm text-on-surface">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-outline">{item.specimenNumber}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-secondary font-semibold">
                      {item.completionPercentage}% done
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reusable Modules */}
          {filteredModules.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider px-2">
                Reusable Salvage Modules ({filteredModules.length})
              </span>
              <div className="space-y-1">
                {filteredModules.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigate('salvage-yard');
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high/80 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-lg">inventory_2</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-medium text-sm text-on-surface">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-outline">
                            Ex: {item.parentProject}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono">
                      {item.badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredSpecimens.length === 0 && filteredModules.length === 0 && query && (
            <div className="text-center py-8 text-on-surface-variant space-y-1">
              <span className="material-symbols-outlined text-3xl text-outline">search_off</span>
              <p className="text-sm">No specimens or modules match "{query}"</p>
              <p className="text-xs text-outline">Try searching for "React", "OAuth", "Stripe", or "Auth"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
