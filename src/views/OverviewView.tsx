import React, { useState } from 'react';
import { ProjectSpecimen, ActivityItem, ScreenId } from '../types';

interface OverviewViewProps {
  specimens: ProjectSpecimen[];
  activities: ActivityItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectSpecimenForAutopsy: (specimen: ProjectSpecimen) => void;
  onSelectSpecimenForRevival: (specimen: ProjectSpecimen) => void;
  onSparkRevival: (specimen: ProjectSpecimen) => void;
  onOpenAiChat?: (specimen: ProjectSpecimen) => void;
  onDeleteSpecimen?: (id: string) => void;
  onOpenNewProject?: () => void;
  onOpenDigitalWill?: (specimen: ProjectSpecimen) => void;
  onStageSpecimen?: (specimen: ProjectSpecimen) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  specimens,
  onNavigate,
  onSelectSpecimenForAutopsy,
  onSelectSpecimenForRevival,
  onSparkRevival,
  onDeleteSpecimen,
  onOpenNewProject,
  onOpenDigitalWill,
  onStageSpecimen,
}) => {
  const [activeDraggedSpecimen, setActiveDraggedSpecimen] = useState<ProjectSpecimen | null>(null);
  const [stagedSpecimen, setStagedSpecimen] = useState<ProjectSpecimen | null>(null);
  const [hoveredZone, setHoveredZone] = useState<'center' | 'deploy' | 'submit' | 'save' | 'delete' | null>(null);
  const [lastActionNotice, setLastActionNotice] = useState<string | null>(null);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-potential' | 'rich-salvage' | 'pure-archival'>('all');

  const filteredCatalogSpecimens = specimens.filter((s) => {
    if (activeFilter === 'high-potential') return s.revivalScore >= 70;
    if (activeFilter === 'rich-salvage') return s.preservedSalvageModules.length >= 3;
    if (activeFilter === 'pure-archival') return s.revivalScore < 60;
    return true;
  });

  const notifyAction = (msg: string) => {
    setLastActionNotice(msg);
    setTimeout(() => setLastActionNotice(null), 4000);
  };

  const handleDropOnZone = (zone: 'center' | 'deploy' | 'submit' | 'save' | 'delete', e: React.DragEvent) => {
    e.preventDefault();
    setHoveredZone(null);
    let specimenToAct: ProjectSpecimen | null = activeDraggedSpecimen;

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        if (parsed.specimen) specimenToAct = parsed.specimen;
      }
    } catch {}

    if (!specimenToAct && stagedSpecimen) {
      specimenToAct = stagedSpecimen;
    }

    if (!specimenToAct) return;

    if (zone === 'center') {
      setStagedSpecimen(specimenToAct);
      notifyAction(`"${specimenToAct.title}" staged on the Canvas. Drag to any Action Zone to execute.`);
      if (onStageSpecimen) onStageSpecimen(specimenToAct);
      return;
    }

    if (zone === 'deploy') {
      notifyAction(`🚀 Deploying "${specimenToAct.title}" into the Revival Crucible!`);
      onSparkRevival(specimenToAct);
    } else if (zone === 'submit') {
      notifyAction(`🔬 Commencing Memorial Autopsy for "${specimenToAct.title}"...`);
      onSelectSpecimenForAutopsy(specimenToAct);
    } else if (zone === 'save') {
      notifyAction(`💾 Drafting Reincarnation Will for "${specimenToAct.title}"...`);
      if (onOpenDigitalWill) {
        onOpenDigitalWill(specimenToAct);
      } else {
        onSelectSpecimenForAutopsy(specimenToAct);
      }
    } else if (zone === 'delete') {
      if (
        window.confirm(
          `Canvas Protocol: Exhume and remove "${specimenToAct.title}" permanently from this workspace?`
        )
      ) {
        if (onDeleteSpecimen) onDeleteSpecimen(specimenToAct.id);
        if (stagedSpecimen?.id === specimenToAct.id) setStagedSpecimen(null);
        notifyAction(`⚰️ Exhumed "${specimenToAct.title}" from the workspace.`);
      }
    }
  };

  // Helper to determine icon & style for project card in list
  const getProjectIcon = (title: string, category: string) => {
    const t = title.toLowerCase();
    const c = category.toLowerCase();
    if (t.includes('spot') || t.includes('ev') || c.includes('clean') || c.includes('bio')) {
      return { icon: 'electric_bolt', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' };
    }
    if (t.includes('link') || t.includes('lost') || c.includes('campus') || c.includes('util')) {
      return { icon: 'inventory_2', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' };
    }
    if (t.includes('placement') || t.includes('drive') || c.includes('career') || c.includes('edtech')) {
      return { icon: 'business_center', bg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400' };
    }
    if (t.includes('aethra') || t.includes('ai') || c.includes('ai')) {
      return { icon: 'psychology', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400' };
    }
    return { icon: 'layers', bg: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300' };
  };

  const getStatusBadge = (specimen: ProjectSpecimen) => {
    if (specimen.title === 'E-VSpot') {
      return { text: 'Active', dotColor: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' };
    }
    if (specimen.title === 'LOSTLINK' || specimen.title === 'Placement Drive Manager') {
      return { text: 'In Progress', dotColor: 'bg-amber-500', textColor: 'text-amber-600 dark:text-amber-400' };
    }
    if (specimen.title === 'AI-AETHRA') {
      return { text: 'Planning', dotColor: 'bg-blue-500', textColor: 'text-blue-600 dark:text-blue-400' };
    }
    if (specimen.primeCandidate) {
      return { text: 'Revival Ready', dotColor: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' };
    }
    if (specimen.status === 'dormant') {
      return { text: 'Dormant', dotColor: 'bg-amber-500', textColor: 'text-amber-600 dark:text-amber-400' };
    }
    return { text: 'Resting', dotColor: 'bg-stone-400', textColor: 'text-on-surface-variant' };
  };

  return (
    <div className="overview-page flex flex-col w-full space-y-6 pb-16">
      {/* ─────────────────────────────────────────────────────────────
          CANVAS PROTOCOL TOP BANNER (Matching Reference Image 1)
         ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-surface-container border border-outline-variant/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 clay-card">
        {/* Subtle decorative gradient aura */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl z-10">
          {/* Large Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface font-bold tracking-tight leading-[1.08]">
            Drag. Drop. Revive.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base text-on-surface-variant font-normal leading-relaxed">
            Every dormant repository holds valuable engineering. Drag any project to uncover its root cause, salvage reusable components into your stack, or drop into an action zone to spark its revival.
          </p>
        </div>

        {/* Right Illustrated Doodle / Sketch Graphic */}
        <div className="hidden md:flex items-center justify-end z-10 shrink-0">
          <svg className="w-64 lg:w-72 h-28 text-secondary/75 overflow-visible" viewBox="0 0 300 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hand holding a card */}
            <g transform="translate(10, 15)">
              <rect x="18" y="6" width="50" height="32" rx="6" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.08" />
              <line x1="24" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="24" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              {/* Hand silhouette path */}
              <path d="M4 55 C12 42, 18 34, 24 28 C26 25, 29 25, 30 28 C31 32, 28 36, 26 40 C32 38, 38 39, 37 43 C36 47, 28 50, 20 54" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Target Slot (Dashed Box) */}
            <g transform="translate(118, 16)">
              <rect x="0" y="0" width="54" height="38" rx="6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
              <path d="M27 12 L27 24 M21 18 L27 24 L33 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Organic Pebble contour */}
            <path d="M196 22 C214 16, 226 24, 222 38 C218 50, 202 54, 192 44 C186 36, 188 26, 196 22 Z" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" fill="currentColor" fillOpacity="0.04" />

            {/* Curving arrows */}
            <path d="M78 30 C90 24, 102 24, 114 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M109 22 L115 26 L110 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M178 40 C186 50, 192 62, 198 72" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 3" />
            <path d="M193 72 L199 73 L200 67" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Handwritten style labels */}
            <text x="240" y="36" fontFamily="serif" fontStyle="italic" fontSize="13" fill="currentColor" fontWeight="600">Drag</text>
            <text x="240" y="52" fontFamily="serif" fontStyle="italic" fontSize="13" fill="currentColor" fontWeight="600">Drop</text>
            <text x="240" y="68" fontFamily="serif" fontStyle="italic" fontSize="13" fill="currentColor" fontWeight="600">Create</text>
          </svg>
        </div>
      </div>

      {/* Action Notification Toast Banner if active */}
      {lastActionNotice && (
        <div className="p-3.5 px-5 rounded-2xl bg-secondary text-on-secondary shadow-lg flex items-center justify-between gap-3 text-sm font-sans font-medium animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{lastActionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setLastActionNotice(null)}
            className="text-on-secondary/80 hover:text-on-secondary p-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: 3-COLUMN INTERACTIVE CANVAS WORKSPACE
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ─── COLUMN 1: YOUR PROJECTS (Left, 4 cols) ─── */}
        <section className="lg:col-span-4 bg-surface-container rounded-[28px] p-5 sm:p-6 border border-outline-variant/60 shadow-sm flex flex-col gap-4 clay-card">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-surface-container-high pb-3">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-xl">open_with</span>
              <div>
                <h2 className="font-serif text-xl text-on-surface font-semibold leading-tight">Your Projects</h2>
                <p className="font-sans text-xs text-on-surface-variant font-light">Drag project cards to the action zones</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onOpenNewProject) onOpenNewProject();
                else onNavigate('bury-a-project');
              }}
              title="Add a new project"
              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>

          {/* Projects Stack */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[580px] pr-1">
            {specimens.map((item) => {
              const iconMeta = getProjectIcon(item.title, item.category);
              const status = getStatusBadge(item);
              const isSelected = stagedSpecimen?.id === item.id;
              const isDragging = activeDraggedSpecimen?.id === item.id;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'specimen', specimen: item }));
                    e.dataTransfer.effectAllowed = 'copyMove';
                    setActiveDraggedSpecimen(item);
                  }}
                  onDragEnd={() => setActiveDraggedSpecimen(null)}
                  className={`p-3.5 sm:p-4 rounded-[22px] bg-surface-container-low border transition-all duration-200 flex items-start justify-between gap-3 cursor-grab active:cursor-grabbing hover:-translate-y-0.5 select-none relative ${
                    isDragging
                      ? 'border-secondary scale-[0.98] opacity-50 shadow-inner'
                      : isSelected
                      ? 'border-secondary ring-2 ring-secondary/20 shadow-md'
                      : 'border-outline-variant/60 hover:border-secondary/60 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Circle Avatar Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs ${iconMeta.bg}`}>
                      <span className="material-symbols-outlined text-lg">{iconMeta.icon}</span>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-sans font-bold text-sm text-on-surface truncate">
                        {item.title}
                      </h3>
                      {/* Status indicator */}
                      <div className="flex items-center gap-1.5 my-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
                        <span className={`font-sans text-[11px] font-medium ${status.textColor}`}>
                          {status.text}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* 6-dot Drag Handle on Right */}
                  <div className="text-outline hover:text-on-surface transition-colors p-1 shrink-0 self-center" title="Drag to Action Zone">
                    <span className="material-symbols-outlined text-base">drag_indicator</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── COLUMN 2: CENTRAL AI DIAGNOSTIC WORKBENCH (Center, 4 cols) ─── */}
        <section
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            setHoveredZone('center');
          }}
          onDragLeave={() => setHoveredZone(null)}
          onDrop={(e) => handleDropOnZone('center', e)}
          className={`lg:col-span-4 rounded-[28px] border-2 transition-all duration-300 p-5 sm:p-6 flex flex-col relative min-h-[520px] clay-card select-none ${
            stagedSpecimen ? 'justify-between' : 'items-center justify-center'
          } ${
            hoveredZone === 'center'
              ? 'border-secondary bg-secondary/15 ring-4 ring-secondary/30 scale-[1.01] shadow-2xl'
              : stagedSpecimen
              ? 'border-secondary/40 bg-surface-container/70 shadow-md'
              : 'border-dashed border-outline-variant/80 bg-surface-container/30'
          }`}
        >
          {/* Subtle Topographical Contours / Organic rings background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            </svg>
          </div>

          {stagedSpecimen ? (
            /* ─── CLEAN FORENSIC INSPECTION WORKBENCH ─── */
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify({ type: 'specimen', specimen: stagedSpecimen }));
                e.dataTransfer.effectAllowed = 'copyMove';
                setActiveDraggedSpecimen(stagedSpecimen);
              }}
              onDragEnd={() => setActiveDraggedSpecimen(null)}
              className="z-10 w-full flex flex-col gap-4 animate-in fade-in zoom-in-95 cursor-grab active:cursor-grabbing"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between gap-3 border-b border-outline-variant/50 pb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-surface-container-high text-on-surface flex items-center justify-center shrink-0 border border-outline-variant/60 shadow-xs">
                    <span className="material-symbols-outlined text-lg">folder_open</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant/60 text-[10px] font-mono font-medium uppercase tracking-wider">
                        {stagedSpecimen.category}
                      </span>
                      <span className="text-outline-variant text-xs">•</span>
                      <span className="font-mono text-[11px] text-on-surface-variant">
                        {stagedSpecimen.folioNumber}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-on-surface font-semibold truncate mt-0.5">
                      {stagedSpecimen.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStagedSpecimen(null)}
                  title="Clear workbench"
                  className="p-1 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {/* Vital Signs Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/40 flex flex-col justify-center">
                  <div className="font-mono text-base font-bold text-secondary">
                    {stagedSpecimen.revivalScore}/100
                  </div>
                  <div className="font-sans text-[10px] text-on-surface-variant font-medium">Viability Score</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/40 flex flex-col justify-center">
                  <div className="font-mono text-base font-bold text-primary">
                    {stagedSpecimen.completionPercentage}%
                  </div>
                  <div className="font-sans text-[10px] text-on-surface-variant font-medium">Code Complete</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/40 flex flex-col justify-center">
                  <div className="font-mono text-xs font-bold text-on-surface truncate">
                    {stagedSpecimen.dormantDuration}
                  </div>
                  <div className="font-sans text-[10px] text-on-surface-variant font-medium">In Cemetery</div>
                </div>
              </div>

              {/* Autopsy Diagnosis */}
              <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-left space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-on-surface">
                  <span>Cause of Demise</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-mono border border-outline-variant/40">
                    {stagedSpecimen.causeCategory}
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {stagedSpecimen.rootCause}
                </p>
              </div>

              {/* Preserved Reusable Modules */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-on-surface">
                  <span>Preserved Salvage Modules</span>
                  <span className="text-[11px] text-on-surface-variant font-mono">
                    {stagedSpecimen.preservedSalvageModules.length} Modules
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stagedSpecimen.preservedSalvageModules.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-surface-container border border-outline-variant/50 text-[11px] font-mono text-on-surface shadow-2xs"
                    >
                      {mod.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curator Assessment */}
              <div className="p-3.5 rounded-2xl bg-surface-container border border-outline-variant/50 text-left space-y-1.5">
                <div className="text-xs font-mono font-semibold text-on-surface">
                  Curator Assessment
                </div>
                <p className="font-sans text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                  {stagedSpecimen.curatorAnalysis ||
                    `High preservation integrity. Decoupling the frontend interface and swapping dormant webhooks enables a seamless sprint back to life.`}
                </p>
              </div>

              {/* Action Canvas Directives */}
              <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-secondary font-mono text-[11px] font-semibold">
                  <span>Drag into Right Action Zones ➔</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStagedSpecimen(null)}
                  className="text-[11px] font-mono text-outline hover:text-on-surface underline"
                >
                  Clear Stage
                </button>
              </div>
            </div>
          ) : (
            /* ─── DEFAULT IDLE STATE (Matching Image 1) ─── */
            <div className="z-10 w-full flex flex-col items-center justify-center space-y-4 text-center my-auto">
              {/* Hand Tapping Card Doodle */}
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant/80 border border-outline-variant/60 shadow-xs mb-1">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="5" width="20" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M18 13 L18 22 C18 24, 16 26, 14 26 C12 26, 11 24, 11 22 L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Headline */}
              <div className="space-y-1 text-center">
                <h3 className="font-serif text-2xl text-on-surface font-semibold text-center">
                  Drop a project card here
                </h3>
                <p className="font-sans text-xs text-on-surface-variant font-light max-w-xs mx-auto text-center">
                  to view project autopsy, salvage modules & viability score
                </p>
              </div>

              {/* Feature Pill Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono text-on-surface-variant">
                  Root Cause
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono text-on-surface-variant">
                  Salvage Modules
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono text-on-surface-variant">
                  Viability Meter
                </span>
              </div>

              {/* Curvy arrow doodle */}
              <div className="pt-2 flex flex-col items-center">
                <div className="font-serif italic text-xs text-on-surface-variant flex items-center gap-1.5">
                  <span>Turn your ideas into impact</span>
                  <span className="material-symbols-outlined text-sm text-secondary">north_east</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── COLUMN 3: ACTION ZONES (Right, 4 cols) ─── */}
        <section className="lg:col-span-4 flex flex-col gap-3.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-xl">track_changes</span>
              <div>
                <h2 className="font-serif text-xl text-on-surface font-semibold leading-tight">Action Zones</h2>
                <p className="font-sans text-xs text-on-surface-variant font-light">Drop cards here to perform required actions</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-base">unfold_more</span>
          </div>

          {/* Action Zone 1: Deploy / Launch (Green) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setHoveredZone('deploy');
            }}
            onDragLeave={() => setHoveredZone(null)}
            onDrop={(e) => handleDropOnZone('deploy', e)}
            className={`rounded-[22px] p-4 transition-all duration-200 flex items-center justify-between border-2 select-none cursor-pointer ${
              hoveredZone === 'deploy'
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 scale-[1.02] shadow-xl ring-4 ring-emerald-500/30'
                : 'bg-[#ecf7f1] dark:bg-[#12281d] border-emerald-300/60 dark:border-emerald-700/40 hover:border-emerald-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-emerald-950 dark:text-emerald-100">
                  Deploy / Launch
                </h3>
                <p className="font-sans text-xs text-emerald-700 dark:text-emerald-300 font-light">
                  Make your project live
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl border border-emerald-300/70 dark:border-emerald-600/50 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0">
              <span className="material-symbols-outlined text-lg">rocket_launch</span>
            </div>
          </div>

          {/* Action Zone 2: Submit / Publish (Orange/Amber) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setHoveredZone('submit');
            }}
            onDragLeave={() => setHoveredZone(null)}
            onDrop={(e) => handleDropOnZone('submit', e)}
            className={`rounded-[22px] p-4 transition-all duration-200 flex items-center justify-between border-2 select-none cursor-pointer ${
              hoveredZone === 'submit'
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 scale-[1.02] shadow-xl ring-4 ring-amber-500/30'
                : 'bg-[#fef4ed] dark:bg-[#281b14] border-amber-300/60 dark:border-amber-700/40 hover:border-amber-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-xl">cloud_upload</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-amber-950 dark:text-amber-100">
                  Submit / Publish
                </h3>
                <p className="font-sans text-xs text-amber-700 dark:text-amber-300 font-light">
                  Share with the world
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl border border-amber-300/70 dark:border-amber-600/50 flex items-center justify-center text-amber-600 dark:text-amber-300 shrink-0">
              <span className="material-symbols-outlined text-lg">publish</span>
            </div>
          </div>

          {/* Action Zone 3: Save / Archive (Purple) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setHoveredZone('save');
            }}
            onDragLeave={() => setHoveredZone(null)}
            onDrop={(e) => handleDropOnZone('save', e)}
            className={`rounded-[22px] p-4 transition-all duration-200 flex items-center justify-between border-2 select-none cursor-pointer ${
              hoveredZone === 'save'
                ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-500 scale-[1.02] shadow-xl ring-4 ring-purple-500/30'
                : 'bg-[#f5f0ff] dark:bg-[#21182c] border-purple-300/60 dark:border-purple-700/40 hover:border-purple-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-xl">save</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-purple-950 dark:text-purple-100">
                  Save / Archive
                </h3>
                <p className="font-sans text-xs text-purple-700 dark:text-purple-300 font-light">
                  Keep it for later
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl border border-purple-300/70 dark:border-purple-600/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0">
              <span className="material-symbols-outlined text-lg">save</span>
            </div>
          </div>

          {/* Action Zone 4: Delete / Remove (Blue/Red) */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setHoveredZone('delete');
            }}
            onDragLeave={() => setHoveredZone(null)}
            onDrop={(e) => handleDropOnZone('delete', e)}
            className={`rounded-[22px] p-4 transition-all duration-200 flex items-center justify-between border-2 select-none cursor-pointer ${
              hoveredZone === 'delete'
                ? 'bg-sky-100 dark:bg-rose-950/60 border-rose-500 scale-[1.02] shadow-xl ring-4 ring-rose-500/30'
                : 'bg-[#f0f7ff] dark:bg-[#24171a] border-sky-300/60 dark:border-rose-700/40 hover:border-rose-500 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-sky-100 dark:bg-rose-900/60 text-sky-700 dark:text-rose-300 flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-xl">delete</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm text-sky-950 dark:text-rose-100">
                  Delete / Remove
                </h3>
                <p className="font-sans text-xs text-sky-700 dark:text-rose-300 font-light">
                  Remove from workspace
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl border border-sky-300/70 dark:border-rose-600/50 flex items-center justify-center text-sky-600 dark:text-rose-300 shrink-0">
              <span className="material-symbols-outlined text-lg">delete</span>
            </div>
          </div>
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: QUICK GUIDE & STATUS TOAST (Bottom Strip)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Quick Guide (8 Cols) */}
        <div className="lg:col-span-8 p-4 sm:p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-wrap items-center justify-between gap-4 clay-card">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-xl">lightbulb</span>
            <span className="font-serif font-bold text-sm text-on-surface">Quick Guide</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary font-mono font-bold flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Drag a project card</span>
            </div>
            <span className="text-outline">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary font-mono font-bold flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Drop it to perform the action</span>
            </div>
            <span className="text-outline">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary font-mono font-bold flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Watch it happen!</span>
            </div>
          </div>
        </div>

        {/* Floating Dark Toast (4 Cols) */}
        <div className="lg:col-span-4 p-4 rounded-[22px] bg-[#16211c] text-white shadow-lg border border-emerald-900/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-emerald-400 text-xl shrink-0">check_circle</span>
            <div className="min-w-0">
              <h4 className="font-sans font-bold text-xs text-white truncate">
                Ready to build something amazing?
              </h4>
              <p className="font-sans text-[11px] text-emerald-300/80 truncate">
                Your ideas are safe. Let's bring them to life.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onOpenNewProject) onOpenNewProject();
              else onNavigate('revival-compass');
            }}
            title="Create new project or jump to Revival"
            className="w-8 h-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: ARCHIVE VITRINES & FULL CATALOG (Collapsible)
         ───────────────────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-outline-variant/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">inventory_2</span>
            <h3 className="font-serif text-lg text-on-surface">Archive Vitrines & Detailed Folios</h3>
          </div>
          <button
            type="button"
            onClick={() => setShowFullCatalog(!showFullCatalog)}
            className="px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-sans font-medium border border-outline-variant/80 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>{showFullCatalog ? 'Collapse Catalog' : 'View Full Catalog & Stats'}</span>
            <span className="material-symbols-outlined text-sm">
              {showFullCatalog ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {showFullCatalog && (
          <div className="mt-6 space-y-6 animate-in fade-in">
            {/* 4 Archive Vitrines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                    Archive 01
                  </span>
                  <span className="material-symbols-outlined text-secondary text-base">calendar_today</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
                    <span>14</span>
                    <span className="text-xs font-mono text-primary font-normal">+2 this month</span>
                  </div>
                  <div className="font-sans text-xs font-semibold text-on-surface mt-1">Total Projects Preserved</div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Dormant ideas safely archived in the quiet soil.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                    Archive 02
                  </span>
                  <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
                    <span>4</span>
                    <span className="text-xs font-mono text-secondary font-normal">28% revival rate</span>
                  </div>
                  <div className="font-sans text-xs font-semibold text-on-surface mt-1">Projects Revived</div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Re-sprouted into active, thriving production.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                    Archive 03
                  </span>
                  <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
                    <span>38</span>
                    <span className="text-xs font-mono text-primary font-normal">Specimens ready</span>
                  </div>
                  <div className="font-sans text-xs font-semibold text-on-surface mt-1">Reusable Parts Recovered</div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    UI components, auth flows & database schemas saved.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-[24px] bg-surface-container border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-3 clay-card">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                    Archive 04
                  </span>
                  <span className="material-symbols-outlined text-secondary text-base">insights</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 font-sans font-bold text-3xl text-on-surface">
                    <span>9</span>
                    <span className="text-xs font-mono text-primary font-normal">Root archetypes</span>
                  </div>
                  <div className="font-sans text-xs font-semibold text-on-surface mt-1">Patterns Discovered</div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Recurring abandonment symptoms identified and mapped.
                  </p>
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCatalogSpecimens.map((specimen) => (
                <div
                  key={specimen.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'specimen', specimen }));
                    e.dataTransfer.effectAllowed = 'copyMove';
                    setActiveDraggedSpecimen(specimen);
                  }}
                  onDragEnd={() => setActiveDraggedSpecimen(null)}
                  className="bg-surface-container rounded-[26px] p-5 border border-outline-variant/60 hover:border-secondary transition-all flex flex-col justify-between space-y-4 clay-card cursor-grab active:cursor-grabbing hover:-translate-y-1 select-none"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        {specimen.folioNumber} · {specimen.specimenNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-mono font-semibold">
                        DRAG CARD
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-sans font-bold text-on-surface">
                        {specimen.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                        {specimen.description}
                      </p>
                    </div>

                    <div className="relative h-28 rounded-2xl overflow-hidden bg-surface-container-high border border-outline-variant/50">
                      <img
                        src={specimen.plateImage}
                        alt={specimen.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                        <div className="flex items-center justify-between w-full text-white text-[11px] font-mono">
                          <span>Score: {specimen.revivalScore}/100</span>
                          <span>{specimen.completionPercentage}% Done</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-[11px] font-mono text-secondary">
                    <span>✥ Drag card to Action Zones above</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
