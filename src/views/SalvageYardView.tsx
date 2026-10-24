import React, { useState, useRef } from 'react';
import { SalvageModule, ScreenId } from '../types';
import { downloadSalvageZip, downloadSalvageTarGz } from '../utils/exportArchive';
import { ExportRepoModal } from '../components/Modals/ExportRepoModal';
import { CodeBundlePreview, DependencyGraph } from '../components/Salvage';
import { EmptyState } from '../components/Common/EmptyState';

interface SalvageYardViewProps {
  modules: SalvageModule[];
  basket: string[]; // array of module IDs
  onToggleBasket: (moduleId: string) => void;
  onRemoveFromBasket: (moduleId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SalvageYardView: React.FC<SalvageYardViewProps> = ({
  modules,
  basket,
  onToggleBasket,
  onRemoveFromBasket,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStackFilter, setActiveStackFilter] = useState<string>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [inspectingModule, setInspectingModule] = useState<SalvageModule | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isExportRepoOpen, setIsExportRepoOpen] = useState<boolean>(false);
  const [isGeneratingArchive, setIsGeneratingArchive] = useState<boolean>(false);
  const [archiveToast, setArchiveToast] = useState<string | null>(null);
  const [archiveFormat, setArchiveFormat] = useState<'zip' | 'tar.gz'>('zip');
  const [isBasketDropHovered, setIsBasketDropHovered] = useState(false);

  // Web Audio ambient synthesizer reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  const toggleAmbientAudio = () => {
    if (isPlayingAudio) {
      // Stop
      try {
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
          setTimeout(() => {
            oscNodesRef.current.forEach((osc) => {
              try { osc.stop(); } catch {}
            });
            oscNodesRef.current = [];
            setIsPlayingAudio(false);
          }, 500);
          return;
        }
      } catch {}
      setIsPlayingAudio(false);
    } else {
      // Start calming ambient soundscape
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm conservatory chords (F maj9: F2, C3, A3, E4)
        const freqs = [87.31, 130.81, 220.0, 329.63];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO detune
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setIsPlayingAudio(true);
      } catch {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleDownloadTarball = async (formatOverride?: 'zip' | 'tar.gz') => {
    const fmt = formatOverride || archiveFormat;
    if (basketModules.length === 0) {
      setArchiveToast('⚠️ Salvage basket is empty. Add modules to download an archive.');
      setTimeout(() => setArchiveToast(null), 3000);
      return;
    }

    try {
      setIsGeneratingArchive(true);
      const filename = `salvage-bundle-${new Date().toISOString().slice(0, 10)}.${fmt}`;
      if (fmt === 'tar.gz') {
        await downloadSalvageTarGz(basketModules, filename);
      } else {
        await downloadSalvageZip(basketModules, filename);
      }
      setArchiveToast(`✓ Generated & downloaded ${filename} (${basketModules.length} modules, manifest.json included)`);
      setTimeout(() => setArchiveToast(null), 4500);
    } catch (err) {
      setArchiveToast(`Export error: ${(err as Error).message}`);
      setTimeout(() => setArchiveToast(null), 4000);
    } finally {
      setIsGeneratingArchive(false);
    }
  };

  const filteredModules = modules.filter((m) => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (activeStackFilter !== 'all') {
      const match = m.tags.some((t) => t.toLowerCase().includes(activeStackFilter.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  const basketModules = modules.filter((m) => basket.includes(m.id));

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Specimen Drawer Atmosphere Flares */}
      <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute top-48 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

      {/* Editorial Botanical Header */}
      <div className="relative flex flex-col gap-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-on-surface tracking-tight leading-tight">
              Nothing valuable needs to{' '}
              <span className="italic font-serif text-primary">go to waste.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl font-light leading-relaxed">
              Recover modular components, battle-tested schemas, API connectors, and design tokens
              preserved from resting projects. Dissected with precision, cleaned for immediate grafting.
            </p>
          </div>

          {/* Ledger Top Metric Strip */}
          <div className="lg:col-span-4 bg-surface-container-low p-4 rounded-xl shadow-md space-y-2 border border-surface-container-high/40">
            <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              <span>Repository Yield</span>
              <span className="material-symbols-outlined text-secondary text-sm">balance</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-surface-container-high/30">
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-primary font-normal">38</span>
                <span className="font-mono text-[10px] text-on-surface-variant/70 leading-tight">
                  Preserved Assets
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-secondary font-normal">12</span>
                <span className="font-mono text-[10px] text-on-surface-variant/70 leading-tight">
                  Regrafted Live
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-tertiary font-normal">~140h</span>
                <span className="font-mono text-[10px] text-on-surface-variant/70 leading-tight">
                  Hours Spared
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Herbarium Filter & Query Strip */}
      <div className="bg-surface-container p-4 rounded-2xl shadow-sm mb-8 space-y-4 border border-outline-variant/80">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Asset Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Preserved (38)' },
              { id: 'ui-components', label: 'UI Components [14]' },
              { id: 'schemas-db', label: 'Schemas & DB [8]' },
              { id: 'api-integrations', label: 'API Integrations [6]' },
              { id: 'design-tokens', label: 'Design Tokens [5]' },
              { id: 'research-docs', label: 'Research Docs [5]' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm border border-outline-variant/60'
                    : 'bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tech Stack Selector Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="font-sans text-xs text-on-surface-variant">Stack Filter:</span>
            <div className="flex items-center gap-1.5 bg-surface-container-high/60 px-3 py-1.5 rounded-full border border-outline-variant/60">
              {['React', 'TypeScript', 'Tailwind', 'Prisma'].map((stk, i) => (
                <React.Fragment key={stk}>
                  {i > 0 && <span className="text-outline-variant/40">•</span>}
                  <button
                    onClick={() =>
                      setActiveStackFilter(activeStackFilter === stk ? 'all' : stk)
                    }
                    className={`font-mono text-xs transition-colors ${
                      activeStackFilter === stk
                        ? 'text-on-surface font-bold underline'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {stk}
                  </button>
                </React.Fragment>
              ))}
              <span
                onClick={() => setActiveStackFilter('all')}
                className="material-symbols-outlined text-sm text-on-surface-variant hover:text-on-surface cursor-pointer ml-1"
                title="Reset stack filter"
              >
                tune
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Catalog Grid / Specimen Cards Column (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {filteredModules.length === 0 ? (
            <EmptyState
              icon="inventory_2"
              title="No salvage modules found"
              description="No extracted components matched your current category or stack filters. Try clearing active filters."
              actionLabel="Reset All Filters"
              onAction={() => {
                setSelectedCategory('all');
                setActiveStackFilter('all');
              }}
            />
          ) : (
            filteredModules.map((item) => {
              const inBasket = basket.includes(item.id);

            return (
              <article
                key={item.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify({ type: 'salvage-module', module: item }));
                  e.dataTransfer.effectAllowed = 'copyMove';
                }}
                className={`group relative bg-surface-container rounded-[26px] p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 clay-card cursor-grab active:cursor-grabbing hover:-translate-y-1 select-none ${
                  inBasket ? 'border-primary/50' : 'border-outline-variant/60 hover:border-secondary/60'
                }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-outline">{item.id}</span>
                        <span className="text-outline-variant">•</span>
                        <span className="font-sans text-xs text-secondary font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">forest</span>
                          Ex: {item.parentProject}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl text-on-surface group-hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-xs ${
                        item.badge.type === 'instant'
                          ? 'bg-secondary-container/30 text-secondary'
                          : item.badge.type === 'zero-dep'
                          ? 'bg-tertiary-container/40 text-tertiary font-medium'
                          : item.badge.type === 'strategic'
                          ? 'bg-secondary-container/20 text-secondary'
                          : 'bg-primary-container/20 text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {item.badge.icon}
                      </span>
                      <span>{item.badge.label}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dynamic Custom Preview Elements */}
                  {/* Color Swatches Preview for SPEC-0109 */}
                  {item.colorSwatches && (
                    <div className="grid grid-cols-6 gap-2 p-3 bg-surface-container-lowest rounded-lg border border-surface-container-high/30">
                      {item.colorSwatches.map((swatch) => (
                        <div
                          key={swatch.name}
                          className="h-10 rounded flex items-end p-1 text-[9px] font-mono shadow-sm"
                          style={{ backgroundColor: swatch.bg }}
                        >
                          <span className={swatch.textClass}>{swatch.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Audio Synthesizer Waveform for SPEC-0318 */}
                  {item.id === 'SPEC-0318' && (
                    <div className="bg-[#080808] text-white p-3.5 rounded-2xl flex items-center justify-between gap-4 border border-white/10 shadow-lg">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={toggleAmbientAudio}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            isPlayingAudio
                              ? 'bg-white text-black shadow-md'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <div>
                          <span className="font-sans text-xs text-white block font-semibold">
                            Ambient Generator Node
                          </span>
                          <span className="text-[10px] text-white/60 font-mono">
                            {isPlayingAudio
                              ? 'Synthesizing F-maj9 ambient chord waves...'
                              : 'Real-time Web Audio API node preview'}
                          </span>
                        </div>
                      </div>

                      <svg
                        className={`h-6 w-48 transition-opacity duration-300 ${
                          isPlayingAudio ? 'text-white opacity-100 animate-pulse' : 'text-white/40 opacity-50'
                        }`}
                        fill="none"
                        viewBox="0 0 192 24"
                      >
                        <path
                          d="M0 12 Q 16 2, 32 12 T 64 12 T 96 16 T 128 8 T 160 14 T 192 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Code Snippet Window if available */}
                  {item.codeSnippet && (
                    <div className="rounded-lg bg-surface-container-lowest p-4 font-mono text-xs text-tertiary space-y-1 overflow-x-auto shadow-inner border border-surface-container-high/40">
                      <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/40 text-outline text-[11px]">
                        <span>{item.codeSnippet.filename}</span>
                        <span className="text-secondary/80 font-mono">
                          {item.codeSnippet.exportName}
                        </span>
                      </div>
                      <pre className="pt-2 text-on-surface-variant/90 leading-relaxed overflow-x-auto">
                        <code>{item.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Metadata & Technical Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-xs border border-surface-container-highest"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto font-mono text-xs text-outline font-medium">
                      {item.sizeOrTests}
                    </span>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1.5 rounded-lg bg-secondary/15 text-secondary font-mono text-xs font-semibold flex items-center gap-1.5 border border-secondary/35 cursor-grab active:cursor-grabbing"
                          title="Drag this module into the Salvage Basket on the right"
                        >
                          <span className="material-symbols-outlined text-sm">drag_indicator</span>
                          <span>DRAG TO BASKET</span>
                        </span>
                        {inBasket && (
                          <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-mono text-[11px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            <span>In Basket</span>
                          </span>
                        )}
                      </div>

                      {item.codeSnippet ? (
                        <button
                          type="button"
                          onClick={() => handleCopyCode(item.id, item.codeSnippet!.code)}
                          className="px-4 py-2 rounded bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-sans text-xs transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">
                            {copiedSnippetId === item.id ? 'check' : 'content_copy'}
                          </span>
                          <span>{copiedSnippetId === item.id ? 'Copied!' : 'Copy Module'}</span>
                        </button>
                      ) : item.colorSwatches ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyCode(
                              item.id,
                              JSON.stringify(item.colorSwatches, null, 2)
                            )
                          }
                          className="px-4 py-2 rounded bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-sans text-xs transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">
                            {copiedSnippetId === item.id ? 'check' : 'download'}
                          </span>
                          <span>{copiedSnippetId === item.id ? 'Copied JSON!' : 'Export JSON'}</span>
                        </button>
                      ) : item.synopsisDoc ? (
                        <button
                          type="button"
                          onClick={() => setInspectingModule(item)}
                          className="px-4 py-2 rounded bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-sans text-xs transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                          <span>Read Synopsis</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setInspectingModule(item)}
                          className="px-4 py-2 rounded bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-sans text-xs transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">code</span>
                          <span>Inspect Handler</span>
                        </button>
                      )}
                    </div>

                    <span className="font-sans text-xs text-outline italic">
                      {item.devTimeSaved}
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

        {/* Action Sidebar: Salvage Basket & Grafting Dock (4 Cols Sticky) */}
        <aside className="xl:col-span-4 sticky top-20 flex flex-col gap-6">
          {/* Basket Vitrine Card - Canvas Protocol Action Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setIsBasketDropHovered(true);
            }}
            onDragLeave={() => setIsBasketDropHovered(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsBasketDropHovered(false);
              try {
                const dataStr = e.dataTransfer.getData('application/json');
                if (dataStr) {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.module && parsed.module.id && !basket.includes(parsed.module.id)) {
                    onToggleBasket(parsed.module.id);
                  }
                }
              } catch {}
            }}
            className={`rounded-[28px] p-6 shadow-lg flex flex-col gap-4 border-2 transition-all clay-card select-none ${
              isBasketDropHovered
                ? 'bg-secondary/15 border-secondary ring-4 ring-secondary/30 scale-[1.02] shadow-2xl'
                : 'bg-surface-container border-outline-variant/60'
            }`}
          >
            <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">shopping_basket</span>
                <h3 className="font-serif text-xl text-on-surface">Salvage Basket</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full font-mono text-xs bg-secondary text-on-secondary font-semibold shadow-sm">
                {basket.length} Selected Items
              </span>
            </div>

            {/* Canvas Protocol Drop Banner */}
            <div
              className={`p-3 rounded-xl border text-xs font-mono transition-all flex items-center gap-2.5 ${
                isBasketDropHovered
                  ? 'bg-secondary text-on-secondary border-secondary animate-pulse shadow-md'
                  : 'bg-surface-container-high/40 text-on-surface-variant border-dashed border-outline-variant/60'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isBasketDropHovered ? 'add_circle' : 'drag_indicator'}
              </span>
              <span>
                {isBasketDropHovered
                  ? 'Release to harvest module into Basket!'
                  : 'Canvas Action Zone: Drag & drop module cards here'}
              </span>
            </div>

            <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
              These modular artifacts will be extracted from the dormant vault, cleansed of specific
              project dependencies, and packaged with standard interfaces.
            </p>

            {/* Basket Itemized List */}
            <ul className="flex flex-col gap-2 my-1 max-h-64 overflow-y-auto">
              {basketModules.length === 0 ? (
                <li className="p-4 rounded-lg bg-surface-container/40 text-center text-outline text-xs">
                  Your salvage basket is currently empty. Drag any module card from the left and drop it here to harvest it.
                </li>
              ) : (
                basketModules.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 rounded-lg bg-surface-container/60 flex items-center justify-between gap-2 border border-surface-container-high/20"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-primary text-base">
                        filter_vintage
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-xs text-on-surface truncate font-semibold">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] text-outline">
                          {item.id} • Ex: {item.parentProject}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFromBasket(item.id)}
                      className="text-outline hover:text-error transition-colors p-1"
                      title="Remove specimen"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            {/* Bundle Dispatch Actions */}
            <div className="flex flex-col gap-2 pt-3 border-t border-surface-container-high/40">
              <button
                type="button"
                onClick={() => onNavigate('graft-studio')}
                className="w-full py-2.5 px-4 rounded bg-secondary hover:bg-secondary-fixed text-on-secondary font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">join_inner</span>
                <span>Send to Graft Studio</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={isGeneratingArchive}
                  onClick={() => handleDownloadTarball(archiveFormat)}
                  className="flex-1 py-2 px-3 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-sans text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-surface-container-highest disabled:opacity-50"
                  title={`Download real ${archiveFormat.toUpperCase()} archive of all selected modules`}
                >
                  <span className={`material-symbols-outlined text-base ${isGeneratingArchive ? 'animate-spin' : ''}`}>
                    {isGeneratingArchive ? 'sync' : 'inventory_2'}
                  </span>
                  <span>
                    {isGeneratingArchive
                      ? 'Compiling Archive...'
                      : `Download Clean Archive (.${archiveFormat})`}
                  </span>
                </button>

                {/* Format toggle: ZIP vs TAR.GZ */}
                <div className="flex rounded bg-surface-container border border-surface-container-highest p-0.5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setArchiveFormat('zip')}
                    className={`px-1.5 py-1 rounded transition-colors ${
                      archiveFormat === 'zip'
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    ZIP
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchiveFormat('tar.gz')}
                    className={`px-1.5 py-1 rounded transition-colors ${
                      archiveFormat === 'tar.gz'
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    TAR.GZ
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExportRepoOpen(true)}
                className="w-full py-2 px-4 rounded bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-sans text-xs flex items-center justify-center gap-2 transition-colors border border-surface-container-high/60"
              >
                <span className="material-symbols-outlined text-base">fork_right</span>
                <span>Export to New Repository</span>
              </button>
            </div>

            {archiveToast && (
              <div className="p-2.5 rounded bg-primary-container/20 text-primary text-xs font-mono text-center border border-primary/30 animate-in fade-in">
                {archiveToast}
              </div>
            )}

            {/* Micro Archival Certificate Note */}
            <div className="p-3 rounded bg-surface-container-lowest/80 flex items-start gap-2 text-outline text-[11px] border border-surface-container-high/30">
              <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">
                verified_user
              </span>
              <span>
                All salvaged modules are stripped of hardcoded credentials and proprietary secrets
                prior to export.
              </span>
            </div>
          </div>

          {/* Archival Context / Curatorial Tip Drawer */}
          <div className="bg-surface-container-low/70 rounded-xl p-5 shadow-sm space-y-2 border border-surface-container-high/40">
            <div className="flex items-center gap-1.5 text-secondary font-mono text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">tips_and_updates</span>
              <span>Curator's Note</span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
              "When a tree falls in the forest, its heartwood nourishes saplings for decades. Treat
              code and models with identical reverence. Don't rewrite what you have already
              perfected."
            </p>
            <div className="text-right font-serif italic text-primary/80 text-xs pt-1">
              — Aryan Jaiswal, Software Developer
            </div>
          </div>
        </aside>
      </div>

      {/* Inspect Module Drawer Modal */}
      {inspectingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="fixed inset-0 -z-10" onClick={() => setInspectingModule(null)} />
          <div className="w-full max-w-2xl bg-surface-container rounded-xl shadow-2xl border border-surface-container-high p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div>
                <span className="font-mono text-xs text-outline">{inspectingModule.id}</span>
                <h3 className="font-serif text-2xl text-on-surface">{inspectingModule.title}</h3>
              </div>
              <button
                onClick={() => setInspectingModule(null)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {inspectingModule.description}
            </p>

            <DependencyGraph
              moduleName={inspectingModule.title}
              linesOfCode={inspectingModule.codeSnippet ? inspectingModule.codeSnippet.code.split('\n').length : 120}
              externalDepsCount={0}
            />

            {inspectingModule.codeSnippet && (
              <CodeBundlePreview
                filename={inspectingModule.codeSnippet.filename}
                code={inspectingModule.codeSnippet.code}
                exportName={inspectingModule.codeSnippet.exportName}
              />
            )}

            {inspectingModule.synopsisDoc && (
              <div className="p-4 rounded-lg bg-surface-container-lowest font-mono text-xs text-on-surface-variant whitespace-pre-wrap border border-surface-container-high">
                {inspectingModule.synopsisDoc}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-outline font-mono">
                {inspectingModule.tags.join(' • ')}
              </span>
              <button
                onClick={() => {
                  if (!basket.includes(inspectingModule.id)) {
                    onToggleBasket(inspectingModule.id);
                  }
                  setInspectingModule(null);
                }}
                className="px-4 py-2 rounded bg-secondary text-on-secondary text-xs font-semibold"
              >
                {basket.includes(inspectingModule.id) ? 'Already in Basket' : 'Add to Salvage Basket'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Dedicated Repository Scaffolding & Git Setup Modal */}
      <ExportRepoModal
        isOpen={isExportRepoOpen}
        onClose={() => setIsExportRepoOpen(false)}
        basketModules={basketModules}
      />
    </div>
  );
};
