import React from 'react';
import { ProjectSpecimen } from '../../types';
import { ForensicTimeline, TechStackMatrix, RootCauseBreakdown } from '../Autopsy';

interface MemorialAutopsyModalProps {
  specimen: ProjectSpecimen | null;
  isOpen: boolean;
  onClose: () => void;
  onCalculateRevival: (specimen: ProjectSpecimen) => void;
  onSalvageModule: (moduleName: string, parentProject: string) => void;
  onOpenAiChat?: (specimen: ProjectSpecimen) => void;
}

export const MemorialAutopsyModal: React.FC<MemorialAutopsyModalProps> = ({
  specimen,
  isOpen,
  onClose,
  onCalculateRevival,
  onSalvageModule,
  onOpenAiChat,
}) => {
  if (!isOpen || !specimen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-3xl bg-surface-container rounded-xl shadow-2xl border border-secondary/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">inventory_2</span>
            <span className="font-mono text-xs uppercase tracking-widest text-outline">
              Archival Autopsy Plate // {specimen.folioNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onOpenAiChat && (
              <button
                type="button"
                onClick={() => onOpenAiChat(specimen)}
                className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>Ask AI Copilot</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Top Specimen Plate */}
          <div className="relative h-48 rounded-lg overflow-hidden bg-surface-container-lowest border border-surface-container-high/40">
            <img
              src={specimen.plateImage}
              alt={specimen.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-high/90 text-primary font-mono text-[10px] uppercase">
                  {specimen.specimenNumber}
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[11px] font-semibold">
                  {specimen.status === 'prime-candidate' ? 'Prime Candidate' : specimen.status.toUpperCase()}
                </span>
              </div>
              <h2 className="font-serif text-3xl text-on-surface font-normal">
                {specimen.title}
              </h2>
              <span className="text-xs text-on-surface-variant font-sans">
                {specimen.category} • Buried {specimen.buriedDate} ({specimen.dormantDuration})
              </span>
            </div>
          </div>

          {/* Autopsy Diagnosis & Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RootCauseBreakdown
              causeCategory={specimen.causeCategory}
              rootCause={specimen.rootCause}
              unfinishedNotes={specimen.unfinishedNotes}
            />

            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-high/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-mono text-outline">
                  Completion Level
                </span>
                <span className="font-mono text-base font-bold text-secondary">
                  {specimen.completionPercentage}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: `${specimen.completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2">
                <span>Revival Score:</span>
                <span className="font-mono font-semibold text-secondary">
                  {specimen.revivalScore} / 100
                </span>
              </div>
            </div>
          </div>

          {/* Curator's Official Notes */}
          <div className="p-4 rounded-lg bg-surface-container-low/60 border border-primary/20 space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              <span>Curator's Herbarium Analysis</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed italic">
              "{specimen.curatorAnalysis}"
            </p>
          </div>

          {/* Preserved Salvage Modules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-mono text-outline">
                Recoverable Salvage Modules ({specimen.preservedSalvageModules.length})
              </span>
              <span className="text-xs text-secondary">Click to harvest into Basket</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specimen.preservedSalvageModules.map((mod, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between group border border-surface-container-high/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">
                      {mod.icon}
                    </span>
                    <span className="text-xs text-on-surface font-medium">{mod.name}</span>
                  </div>
                  <button
                    onClick={() => onSalvageModule(mod.name, specimen.title)}
                    className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded bg-secondary/20 hover:bg-secondary text-secondary hover:text-on-secondary text-[10px] font-semibold transition-all flex items-center gap-1"
                  >
                    <span>Salvage</span>
                    <span className="material-symbols-outlined text-xs">add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Tech Stack Compatibility Matrix */}
          <TechStackMatrix technologies={specimen.techStack} />

          {/* Forensic Git Cadence & Demise Timeline */}
          <ForensicTimeline />

          {/* Heartfelt Epitaph */}
          <div className="p-4 rounded-lg bg-surface-container-lowest border border-surface-container-high text-center">
            <span className="font-serif italic text-sm text-on-surface-variant">
              {specimen.epitaph}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
          >
            Close Autopsy
          </button>
          <div className="flex items-center gap-2">
            {onOpenAiChat && (
              <button
                type="button"
                onClick={() => onOpenAiChat(specimen)}
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant/60 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
                <span>Ask AI Copilot</span>
              </button>
            )}
            <button
              onClick={() => {
                onCalculateRevival(specimen);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-sm">explore</span>
              <span>Calculate Revival in Compass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
