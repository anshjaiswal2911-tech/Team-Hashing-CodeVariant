import React from 'react';
import { ProjectSpecimen } from '../../types';

interface ArchiveFolioCardProps {
  specimen: ProjectSpecimen;
  onInspect: (specimen: ProjectSpecimen) => void;
  className?: string;
}

export const ArchiveFolioCard: React.FC<ArchiveFolioCardProps> = ({
  specimen,
  onInspect,
  className = '',
}) => {
  return (
    <div className={`p-4 rounded-3xl bg-surface-container/70 border border-outline-variant/60 hover:border-primary/50 transition-all flex flex-col justify-between space-y-3 group clay-card ${className}`}>
      <div className="space-y-3">
        {/* Specimen Plate Preview */}
        <div className="relative h-36 rounded-2xl overflow-hidden border border-outline-variant/60">
          <img
            src={specimen.plateImage}
            alt={specimen.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-[10px] font-mono">
            <span className="text-secondary font-bold uppercase">{specimen.folioNumber}</span>
            <span>{specimen.dormantDuration}</span>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-lg font-normal text-on-surface">
            {specimen.title}
          </h4>
          <p className="text-xs text-on-surface-variant font-sans line-clamp-2 leading-relaxed">
            {specimen.description}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
        <span className="text-[11px] font-mono text-secondary font-semibold">
          Viability: {specimen.revivalScore}%
        </span>
        <button
          type="button"
          onClick={() => onInspect(specimen)}
          className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-mono font-medium border border-outline-variant/50 transition-all flex items-center gap-1 group-hover:border-primary/50"
        >
          <span>Examine</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
