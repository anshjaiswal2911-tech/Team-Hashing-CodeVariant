import React, { useState } from 'react';
import { SalvageModule, ScreenId } from '../types';
import { downloadSalvageZip } from '../utils/exportArchive';
import { GraftDonorCard } from '../components/Graft';
import { sampleGraftMatches } from '../data/sampleGraftMatches';

interface GraftStudioViewProps {
  salvagedModules: SalvageModule[];
  basket: string[];
  onRemoveFromBasket: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const GraftStudioView: React.FC<GraftStudioViewProps> = ({
  salvagedModules,
  basket,
  onRemoveFromBasket,
  onNavigate,
}) => {
  const [targetProjectName, setTargetProjectName] = useState('New Initiative — Seedling v0.1');
  const [selectedPreset, setSelectedPreset] = useState<'vite-react' | 'nextjs-app' | 'cli-engine'>('vite-react');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);
  const [isSynthesized, setIsSynthesized] = useState(false);

  const activeModules = salvagedModules.filter((m) => basket.includes(m.id));

  const handleStartGraft = () => {
    setIsSynthesizing(true);
    setSynthesisProgress(10);
    const interval = setInterval(() => {
      setSynthesisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSynthesizing(false);
          setIsSynthesized(true);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col w-full space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm">join_inner</span>
          <span>Botanical Synthesis Chamber // Graft Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-on-surface">
          Graft Old Roots into New Soil
        </h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          The conservatory’s central purpose: taking proven modules from resting projects and splicing
          them into a clean, new codebase without copy-paste debris.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Graft Workbench (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-surface-container rounded-[28px] p-6 lg:p-7 border border-outline-variant/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/50">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Graft Target Initiative
                </span>
                <h2 className="font-sans text-xl font-bold tracking-tight text-on-surface">Target Substrate Setup</h2>
              </div>
              <span className="material-symbols-outlined text-on-surface text-xl">hub</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-sans text-xs font-semibold text-on-surface block mb-1.5">
                  New Initiative Working Title
                </label>
                <input
                  type="text"
                  value={targetProjectName}
                  onChange={(e) => setTargetProjectName(e.target.value)}
                  className="w-full p-3 rounded-full bg-surface-container-high/60 text-on-surface text-xs font-sans border border-outline-variant/80 focus:outline-none focus:border-on-surface px-4"
                />
              </div>

              <div>
                <label className="font-sans text-xs font-semibold text-on-surface block mb-2">
                  Target Host Architecture
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'vite-react', label: 'Vite + React 19', desc: 'SPA Micro-frontend' },
                    { id: 'nextjs-app', label: 'Next.js 15', desc: 'Full-stack RSC' },
                    { id: 'cli-engine', label: 'Node Headless', desc: 'Standalone Worker' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPreset(p.id as typeof selectedPreset)}
                      className={`p-3.5 rounded-2xl text-left transition-all border ${
                        selectedPreset === p.id
                          ? 'bg-primary text-on-primary border-transparent shadow-md'
                          : 'bg-surface-container-high/50 border-outline-variant/60 text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="font-sans text-xs font-bold block">{p.label}</span>
                      <span className="font-mono text-[10px] opacity-75 block mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grafting Matrix Synthesis Area */}
          <div className="bg-surface-container rounded-[28px] p-6 lg:p-7 border border-outline-variant/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/50">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Compatibility Matrix
                </span>
                <h3 className="font-sans text-xl font-bold tracking-tight text-on-surface">Dependency De-conflicting</h3>
              </div>
              <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold bg-surface-container-high text-on-surface border border-outline-variant">
                100% Cleared
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-outline-variant/60 font-mono text-xs text-on-surface-variant space-y-2">
              <div className="flex items-center gap-2 text-on-surface font-sans">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>All proprietary hardcoded secrets stripped</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-sans">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Type declarations reconciled into /src/contracts</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-sans">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Normalized environment variables mapped to .env.example</span>
              </div>
            </div>

            {isSynthesizing && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono text-on-surface">
                  <span>Synthesizing clean graft scaffold...</span>
                  <span>{synthesisProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${synthesisProgress}%` }}
                  />
                </div>
              </div>
            )}

            {isSynthesized && (
              <div className="p-4 rounded-2xl bg-[#080808] text-white border border-white/10 text-xs space-y-3 animate-in fade-in shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold font-sans text-sm">
                    <span className="material-symbols-outlined text-base">verified</span>
                    <span>Scaffold successfully generated!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const cleanSlug = targetProjectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
                      downloadSalvageZip(activeModules, `${cleanSlug}-graft.zip`);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-black font-sans font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download Scaffold (.zip)</span>
                  </button>
                </div>
                <p className="text-white/70">
                  {activeModules.length} donor modules have been synthesized into{' '}
                  <code className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">./dist/{targetProjectName.toLowerCase().replace(/\s+/g, '-')}-graft.zip</code>
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-on-surface-variant italic font-mono">
                {activeModules.length} Donor modules queued
              </span>

              <button
                type="button"
                disabled={activeModules.length === 0 || isSynthesizing}
                onClick={handleStartGraft}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary disabled:opacity-40 font-sans text-xs font-semibold flex items-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined text-base">join_inner</span>
                <span>Execute Botanical Graft</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Spliced Donor Basket (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-surface-container rounded-[28px] p-6 border border-outline-variant/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface">shopping_basket</span>
                <h3 className="font-sans text-lg font-bold text-on-surface">Attached Donor Modules</h3>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface">
                {activeModules.length} Active
              </span>
            </div>

            {activeModules.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-xs space-y-3">
                <span className="material-symbols-outlined text-3xl">inbox</span>
                <p>No modules in your salvage basket.</p>
                <button
                  type="button"
                  onClick={() => onNavigate('salvage-yard')}
                  className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-sans text-xs transition-colors"
                >
                  Browse Salvage Yard
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeModules.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-surface-container-high/60 border border-outline-variant/50 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-bold text-on-surface">
                          {item.title}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-on-surface-variant block">
                        {item.id} • Ex: {item.parentProject}
                      </span>
                      <p className="text-[11px] text-on-surface-variant line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromBasket(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Detach module"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-outline-variant/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('salvage-yard')}
                className="text-xs text-on-surface font-semibold hover:opacity-80 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add more modules from yard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Cross-Project Graft Pairings */}
      <div className="space-y-4 pt-6 border-t border-outline-variant/60">
        <div>
          <div className="flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            <span>Algorithmic Compatibility Index // Automated Pairings</span>
          </div>
          <h2 className="font-serif text-2xl text-on-surface mt-1">
            Recommended Donor-Recipient Slices
          </h2>
          <p className="text-xs text-on-surface-variant font-sans">
            AI-detected high compatibility modules from resting projects ready for zero-dependency transplantation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleGraftMatches.map((graft) => (
            <GraftDonorCard
              key={graft.id}
              moduleName={graft.donorModule}
              donorProject={graft.donorProject}
              category={graft.graftBenefit}
              compatibilityScore={graft.compatibilityScore}
              timeSavedHours={graft.timeSavedHours}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
