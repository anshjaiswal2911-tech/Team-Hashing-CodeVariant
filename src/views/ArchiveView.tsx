import React, { useState } from 'react';
import { ProjectSpecimen } from '../types';
import { ArchiveFolioCard } from '../components/Archive';
import { EmptyState } from '../components/Common/EmptyState';

interface ArchiveViewProps {
  specimens: ProjectSpecimen[];
  onSelectSpecimenForAutopsy: (specimen: ProjectSpecimen) => void;
  onSelectSpecimenForRevival: (specimen: ProjectSpecimen) => void;
  onOpenAiChat?: (specimen: ProjectSpecimen) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  specimens,
  onSelectSpecimenForAutopsy,
  onSelectSpecimenForRevival,
  onOpenAiChat,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'standard' | 'folios'>('folios');

  const filtered = specimens.filter((s) => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    if (
      search &&
      !s.title.toLowerCase().includes(search.toLowerCase()) &&
      !s.description.toLowerCase().includes(search.toLowerCase()) &&
      !s.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm">inventory</span>
          <span>Conservatory Herbarium Folios // Complete Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-on-surface">
          Catalogued Repository Vault
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          The complete inventory of dormant, resting, and prime-candidate projects preserved in deep soil.
          Review autopsies or calculate revival readiness.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, technology, or keywords..."
            className="w-full bg-surface-container-high/60 pl-9 pr-4 py-2 rounded-full text-xs text-on-surface placeholder:text-on-surface-variant border border-outline-variant/60 focus:outline-none focus:border-on-surface"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Specimens' },
            { id: 'resting', label: 'Resting' },
            { id: 'dormant', label: 'Dormant' },
            { id: 'prime-candidate', label: 'Prime Candidates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-colors ${
                filterStatus === tab.id
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm border border-outline-variant/60'
                  : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface border border-outline-variant/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Archive Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="search_off"
          title="No archived specimens match your search"
          description="Try broadening your search query or reset the status filter."
          actionLabel="Clear Filter"
          onAction={() => {
            setSearch('');
            setFilterStatus('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((specimen) =>
          viewMode === 'folios' ? (
            <ArchiveFolioCard
              key={specimen.id}
              specimen={specimen}
              onInspect={onSelectSpecimenForAutopsy}
            />
          ) : (
            <div
              key={specimen.id}
              className="group rounded-[26px] bg-surface-container border border-outline-variant/80 hover:border-on-surface/40 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 clay-card"
            >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase block font-semibold">
                    {specimen.specimenNumber} • {specimen.folioNumber}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-on-surface group-hover:text-primary transition-colors mt-0.5">
                    {specimen.title}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-surface-container-high text-on-surface border border-outline-variant/60">
                  {specimen.status.toUpperCase()}
                </span>
              </div>

              <p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                {specimen.description}
              </p>

              {/* Progress & Revival score */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                  <span>Completion</span>
                  <span className="text-on-surface font-semibold">{specimen.completionPercentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${specimen.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {specimen.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-surface-container-high font-mono text-[10px] text-on-surface-variant border border-outline-variant/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-outline-variant/50 flex items-center justify-between">
              <span className="font-mono text-[11px] text-on-surface-variant">
                {specimen.dormantDuration}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSpecimenForAutopsy(specimen)}
                  className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-sans font-medium border border-outline-variant transition-colors"
                >
                  Autopsy
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSpecimenForRevival(specimen)}
                  className="px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-sans font-semibold shadow-sm hover:opacity-90 transition-all border border-outline-variant/60"
                >
                  Revival
                </button>
                {onOpenAiChat && (
                  <button
                    type="button"
                    onClick={() => onOpenAiChat(specimen)}
                    title="Ask AI Copilot about this project"
                    className="w-8 h-8 rounded-full bg-secondary/15 hover:bg-secondary/25 text-secondary flex items-center justify-center transition-all border border-secondary/30 shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
      </div>
    )}
    </div>
  );
};
