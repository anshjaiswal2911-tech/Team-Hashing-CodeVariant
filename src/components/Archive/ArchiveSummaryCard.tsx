import { Archive, ArrowRight } from 'lucide-react';
import type { ProjectSpecimen } from '../../types';

interface ArchiveSummaryCardProps {
  specimens: ProjectSpecimen[];
  onReviewCandidates: () => void;
  onBrowseProjects: () => void;
  onAddProject: () => void;
}

export function ArchiveSummaryCard({
  specimens, onReviewCandidates, onBrowseProjects, onAddProject,
}: ArchiveSummaryCardProps) {
  const candidateCount = specimens.filter((specimen) => specimen.revivalScore >= 70).length;
  const moduleCount = specimens.reduce((total, specimen) => total + specimen.preservedSalvageModules.length, 0);
  const isEmpty = specimens.length === 0;

  return (
    <section aria-labelledby="archive-summary-title" className="min-w-0 rounded-[20px] border border-outline-variant/70 bg-surface-container p-6 sm:p-7 flex flex-col">
      <header className="flex items-center justify-between gap-4">
        <h2 id="archive-summary-title" className="text-sm font-semibold tracking-tight text-on-surface">Archive at a glance</h2>
        <Archive size={18} strokeWidth={1.6} className="shrink-0 text-secondary" aria-hidden="true" />
      </header>

      <dl className="mt-6">
        <div className="flex items-baseline gap-3">
          <dt className="text-sm text-on-surface-variant">{specimens.length === 1 ? 'project preserved' : 'projects preserved'}</dt>
          <dd className="order-first text-5xl font-semibold tracking-[-0.05em] tabular-nums leading-none text-on-surface">{specimens.length}</dd>
        </div>
      </dl>

      {isEmpty ? (
        <p className="mt-5 mb-6 text-sm leading-relaxed text-on-surface-variant">Keep your unfinished work and its useful parts together. Start with your first project.</p>
      ) : (
        <dl className="my-6 grid grid-cols-2 divide-x divide-outline-variant/60 border-y border-outline-variant/60 py-4">
          <div className="pr-4">
            <dt className="text-xs leading-relaxed text-on-surface-variant">Revival candidates</dt>
            <dd className="mt-1.5">
              <span className="text-2xl font-semibold tracking-tight tabular-nums text-on-surface">{candidateCount}</span>
              <span className="mt-1 block text-xs text-on-surface-variant">Revival score 70+</span>
            </dd>
          </div>
          <div className="pl-5">
            <dt className="text-xs leading-relaxed text-on-surface-variant">Reusable modules</dt>
            <dd className="mt-1.5">
              <span className="text-2xl font-semibold tracking-tight tabular-nums text-on-surface">{moduleCount}</span>
              <span className="mt-1 block text-xs text-on-surface-variant">In this archive</span>
            </dd>
          </div>
        </dl>
      )}

      <button type="button"
        onClick={isEmpty ? onAddProject : candidateCount > 0 ? onReviewCandidates : onBrowseProjects}
        className="mt-auto -mx-2 flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <span>{isEmpty ? 'Preserve a project' : candidateCount > 0 ? 'Review candidates' : 'Browse your projects'}</span>
        <ArrowRight size={17} strokeWidth={1.7} className="shrink-0 text-secondary" aria-hidden="true" />
      </button>
    </section>
  );
}
