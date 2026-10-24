import React, { useState } from 'react';
import { ProjectSpecimen, ActivityItem, ScreenId } from '../types';
import { Badge, KbdShortcut, TelemetryChip } from '../components/ui';

interface OverviewViewProps {
  specimens: ProjectSpecimen[];
  activities: ActivityItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectSpecimenForAutopsy: (specimen: ProjectSpecimen) => void;
  onSelectSpecimenForRevival: (specimen: ProjectSpecimen) => void;
  onSparkRevival: (specimen: ProjectSpecimen) => void;
  onOpenAiChat?: (specimen: ProjectSpecimen) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  specimens,
  activities,
  onNavigate,
  onSelectSpecimenForAutopsy,
  onSelectSpecimenForRevival,
  onSparkRevival,
  onOpenAiChat,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-potential' | 'rich-salvage' | 'pure-archival'>('all');
  const [timeRange, setTimeRange] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
  const [selectedDate, setSelectedDate] = useState('JUNE 1, 2026');
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const featuredSpecimen = specimens.find((s) => s.id === 'SPEC-2023-094') || specimens[0];

  const filteredCatalogSpecimens = specimens.filter((s) => {
    if (activeFilter === 'high-potential') return s.revivalScore >= 70;
    if (activeFilter === 'rich-salvage') return s.preservedSalvageModules.length >= 3;
    if (activeFilter === 'pure-archival') return s.revivalScore < 60;
    return true;
  });

  const filesList = [
    { name: 'Licence on Figma templaters.pdf', type: 'pdf', size: '2.4 MB', date: 'May 28' },
    { name: 'Devspire_UI-Kit.fig', type: 'fig', size: '48.1 MB', date: 'Jun 01' },
    { name: 'Devspire redesign.word', type: 'doc', size: '1.2 MB', date: 'Jun 02' },
    { name: 'National Bank.fig', type: 'fig', size: '32.6 MB', date: 'Jun 03' },
  ];

  const scrollToCemetery = () => {
    const el = document.getElementById('catalogued-remains');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full space-y-8 pb-16">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO HEADER & ATMOSPHERIC STATUS (Matching Original AI Studio Screen)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Chamber (8 Cols) */}
        <div className="lg:col-span-8 p-8 md:p-10 rounded-[28px] bg-surface-container border border-outline-variant/60 relative overflow-hidden flex flex-col justify-between shadow-sm clay-card">
          {/* Subtle botanical glow flare */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl z-10">
            {/* Folio Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/70 border border-outline-variant/60 text-[10px] font-mono tracking-widest text-secondary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>Conservatory Folio — No. IV</span>
            </div>

            {/* Hero Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-surface leading-[1.12] tracking-tight">
              Some ideas deserve another look.
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-on-surface-variant font-light leading-relaxed max-w-xl">
              Your unfinished work still has value. Discover what can grow again in quiet contemplation.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 z-10">
            <button
              type="button"
              onClick={() => onNavigate('bury-a-project')}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:brightness-110 active:scale-95 transition-all font-sans text-xs font-bold shadow-md flex items-center gap-2 border border-secondary/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-inherit">spa</span>
              <span className="text-inherit font-bold tracking-wide">Bury a Project</span>
            </button>
            <button
              type="button"
              onClick={scrollToCemetery}
              className="px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors font-sans text-xs font-medium border border-outline-variant/80 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-base text-secondary">explore</span>
              <span>Wander Through Cemetery</span>
            </button>
            <KbdShortcut shortcut="⌘K" description="Quick search remains" />
          </div>
        </div>

        {/* Right Atmospheric Status Card (4 Cols) */}
        <div className="lg:col-span-4 p-6 md:p-7 rounded-[28px] bg-surface-container border border-outline-variant/60 flex flex-col justify-between shadow-sm relative overflow-hidden clay-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                Atmospheric Status
              </span>
              <span className="material-symbols-outlined text-secondary text-lg">thermostat</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="font-sans text-base font-semibold text-on-surface">
                  Gentle Dormancy
                </h3>
              </div>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                14 projects preserved in deep soil. 3 prime specimens primed for revival grafting.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <TelemetryChip label="Soil Health" value="98.2%" status="healthy" />
              <TelemetryChip label="Resonance" value="432 Hz" status="healthy" />
            </div>
          </div>

          {/* Ambient Metric Footer */}
          <div className="pt-4 border-t border-outline-variant/50 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
            <span>Humus Index: <strong className="text-on-surface">94%</strong></span>
            <span className="text-secondary font-medium">Optimal Compost</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: 4 ARCHIVE STAT VITRINES (Exact Original AI Studio Cards)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Archive 01 */}
        <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Archive 01
            </span>
            <span className="material-symbols-outlined text-secondary text-base">calendar_today</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
              <span>14</span>
              <span className="text-xs font-mono text-primary font-normal">+2 this month</span>
            </div>
            <div className="font-sans text-xs font-semibold text-on-surface mt-1">
              Total Projects Preserved
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
              Dormant ideas safely archived in the quiet soil.
            </p>
          </div>
        </div>

        {/* Archive 02 */}
        <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Archive 02
            </span>
            <span className="material-symbols-outlined text-secondary text-base">spa</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
              <span>4</span>
              <span className="text-xs font-mono text-secondary font-normal">28% revival rate</span>
            </div>
            <div className="font-sans text-xs font-semibold text-on-surface mt-1">
              Projects Revived
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
              Re-sprouted into active, thriving production.
            </p>
          </div>
        </div>

        {/* Archive 03 */}
        <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Archive 03
            </span>
            <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
              <span>38</span>
              <span className="text-xs font-mono text-primary font-normal">Specimens ready</span>
            </div>
            <div className="font-sans text-xs font-semibold text-on-surface mt-1">
              Reusable Parts Recovered
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
              UI components, auth flows & database schemas saved.
            </p>
          </div>
        </div>

        {/* Archive 04 */}
        <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Archive 04
            </span>
            <span className="material-symbols-outlined text-secondary text-base">insights</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
              <span>9</span>
              <span className="text-xs font-mono text-primary font-normal">Root archetypes</span>
            </div>
            <div className="font-sans text-xs font-semibold text-on-surface mt-1">
              Patterns Discovered
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
              Recurring abandonment symptoms identified and mapped.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TODAY'S WHISPER BANNER (CanvasCraft Revisit Recommendation)
         ───────────────────────────────────────────────────────────── */}
      <div className="p-4 md:p-5 rounded-[22px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 clay-card">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-lg">hearing</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-wider">
                TODAY'S WHISPER
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-sans text-sm font-semibold text-on-surface">CanvasCraft</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-mono text-on-surface-variant">
                Buried 8 mos ago
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-mono font-semibold">
                Revisit Score: 84/100
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Buried due to runaway scope creep. The vector rendering engine is <strong className="text-on-surface font-semibold">90% completed</strong> and could be extracted into a standalone headless canvas micro-library.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const canvasCraft = specimens.find((s) => s.id === 'SPEC-2023-007') || specimens[0];
            onSelectSpecimenForRevival(canvasCraft);
          }}
          className="px-4 py-2 rounded-full bg-secondary text-on-secondary hover:opacity-90 font-sans text-xs font-semibold shadow-sm flex items-center gap-1.5 whitespace-nowrap self-end sm:self-center"
        >
          <span>Explore Whisper</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CATALOGUED SPECIMENS (The Cemetery Grounds)
         ───────────────────────────────────────────────────────────── */}
      <section id="catalogued-remains" className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">spa</span>
              <span>The Conservatory Grounds // Specimen Folios</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-on-surface tracking-tight mt-0.5">
              Preserved Specimens Catalog
            </h2>
          </div>

          {/* Filter Pills matching reference */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All (${specimens.length})` },
              { id: 'high-potential', label: 'Prime Viability (≥70%)' },
              { id: 'rich-salvage', label: 'Rich Salvage (≥3 modules)' },
              { id: 'pure-archival', label: 'Archival Resting' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm border border-outline-variant/60'
                    : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border border-outline-variant/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Specimens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalogSpecimens.map((specimen) => (
            <div
              key={specimen.id}
              className="bg-surface-container rounded-[26px] p-5 border border-outline-variant/80 hover:border-on-surface/40 shadow-sm transition-all flex flex-col justify-between space-y-4 group clay-card"
            >
              <div className="space-y-3">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    {specimen.folioNumber} · {specimen.specimenNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-mono border border-outline-variant font-medium">
                    {specimen.status.toUpperCase()}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-sans font-bold text-on-surface group-hover:text-primary transition-colors">
                    {specimen.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                    {specimen.description}
                  </p>
                </div>

                {/* Visual Specimen Plate Card */}
                <div className="relative h-32 rounded-2xl overflow-hidden bg-surface-container-high border border-outline-variant/50">
                  <img
                    src={specimen.plateImage}
                    alt={specimen.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <div className="flex items-center justify-between w-full text-white text-xs">
                      <span className="font-mono text-[11px]">Score: {specimen.revivalScore}/100</span>
                      <span className="font-mono text-[11px]">{specimen.completionPercentage}% Complete</span>
                    </div>
                  </div>
                </div>

                {/* Modules Saved Preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {specimen.preservedSalvageModules.slice(0, 3).map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant text-[10px] font-mono border border-outline-variant/40"
                    >
                      {m.name}
                    </span>
                  ))}
                  {specimen.preservedSalvageModules.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] text-on-surface-variant font-mono">
                      +{specimen.preservedSalvageModules.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons in modern rounded pills */}
              <div className="pt-2 border-t border-outline-variant/50 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSpecimenForAutopsy(specimen)}
                  className="flex-1 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-xs font-sans font-semibold text-on-surface border border-outline-variant transition-colors text-center"
                >
                  Autopsy
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSpecimenForRevival(specimen)}
                  className="flex-1 py-2 rounded-full bg-primary-container text-on-primary-container text-xs font-sans font-semibold shadow-sm hover:opacity-90 transition-all text-center border border-outline-variant/60"
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
          ))}
        </div>
      </section>
    </div>
  );
};
