import React, { useState } from 'react';
import { ScreenId, ProjectSpecimen, SalvageModule } from '../types';
import { useTheme } from '../context/ThemeContext';

interface LandingPageViewProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectSpecimenForAutopsy: (specimen: ProjectSpecimen) => void;
  specimens: ProjectSpecimen[];
  salvageModules: SalvageModule[];
  isAuthenticated?: boolean;
  currentUser?: { name: string; email: string; role: string; avatar: string };
  onLogout?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigate,
  onSelectSpecimenForAutopsy,
  specimens,
  salvageModules,
  isAuthenticated = false,
  currentUser,
  onLogout,
}) => {
  const { setTheme } = useTheme();

  // Lock Landing Page strictly to Claymorphic theme as requested
  React.useEffect(() => {
    setTheme('claymorphic');
  }, [setTheme]);

  // Active specimen for interactive vitrine
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState(0);
  const activeSpecimen = specimens[activeSpecimenIndex] || specimens[0];

  // Active tab inside hero visual vitrine
  const [heroTab, setHeroTab] = useState<'autopsy' | 'salvage' | 'revival'>('autopsy');

  // Ambient sound state
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Play serene botanical ambient synthesizer sound via Web Audio API
  const handleToggleAmbient = () => {
    try {
      if (isPlayingSound) {
        setIsPlayingSound(false);
        return;
      }

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // 432Hz Botanical Harmonic Chime
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 1.2);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(216, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(270, ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 2.6);
      osc2.stop(ctx.currentTime + 2.6);

      setIsPlayingSound(true);
      setTimeout(() => setIsPlayingSound(false), 2600);
    } catch {
      // Audio context may require explicit user gesture in some browsers
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container pb-20">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION BAR (Fixed with Glassmorphism)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-surface/80 border-b border-outline-variant/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand Emblem */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-secondary/20">
              <span className="material-symbols-outlined text-xl text-secondary">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-normal tracking-wide text-on-surface">
                Project Graveyard
              </span>
              <span className="font-sans text-[10px] text-on-surface-variant font-medium tracking-wider uppercase -mt-0.5">
                Conservatory Protocol • Build 01
              </span>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#concept"
              className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              The Concept
            </a>
            <a
              href="#dilemma"
              className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Why It Matters
            </a>
            <a
              href="#pillars"
              className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              4 Pillars
            </a>
          </nav>

          {/* Right Action Cluster: Auth & Enter App */}
          <div className="flex items-center gap-2.5">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="h-9 px-3.5 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm text-secondary">login</span>
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="h-9 px-4 rounded-xl bg-primary text-on-primary font-medium text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Create Account</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/60">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-7 h-7 rounded-full object-cover border border-primary/40 shadow-sm"
                  />
                  <span className="hidden sm:inline text-xs font-medium text-on-surface">
                    {currentUser?.name}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="p-1 rounded-lg text-on-surface-variant hover:text-error transition-colors"
                    title="Sign Out"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="h-9 px-4 rounded-xl bg-primary text-on-primary font-medium text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Enter Conservatory</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION: PUNCHY PITCH + INTERACTIVE SPECIMEN VITRINE
         ───────────────────────────────────────────────────────────── */}
      <section id="concept" className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Vision & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-[1.1] tracking-tight">
                Where dead projects become{' '}
                <span className="italic font-normal text-secondary underline decoration-secondary/30 underline-offset-8">
                  fertile ground.
                </span>
              </h1>

              {/* Subtitle / Pitch from PPT Slide 1 & 2 */}
              <div className="space-y-2">
                <p className="font-serif text-lg sm:text-xl font-medium text-primary">
                  “Unfinished doesn't mean worthless. A second chance for abandoned ideas.”
                </p>
                <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                  People can store code on GitHub and ideas in docs, but they still lack clarity, direction, and momentum.
                  <strong className="text-on-surface font-semibold"> Project Graveyard</strong> turns abandoned prototypes into clear next steps — preserving context, extracting reusable code, and using the <strong className="text-secondary font-semibold">Revival Compass</strong> to eliminate restart friction.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="px-6 py-3.5 rounded-2xl bg-primary text-on-primary font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <span>Enter Cemetery & Dashboard</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('bury-a-project')}
                  className="px-5 py-3.5 rounded-2xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-on-surface font-medium text-sm flex items-center gap-2 transition-all shadow-sm hover:border-outline"
                >
                  <span className="material-symbols-outlined text-lg text-secondary">add_circle_outline</span>
                  <span>Bury a Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('salvage-yard')}
                  className="px-4 py-3.5 rounded-2xl border border-outline-variant/60 hover:border-primary/50 text-on-surface-variant hover:text-on-surface text-sm flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">inventory_2</span>
                  <span>Explore Salvage Yard</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (Specimen Glass Pod) */}
            <div className="lg:col-span-5 relative">
              {/* Decorative ambient leaf halo */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-secondary/15 blur-2xl pointer-events-none" />

              {/* Main Vitrine Card */}
              <div className="clay-card rounded-3xl p-5 sm:p-6 bg-surface-container border border-outline-variant/80 shadow-2xl relative overflow-hidden backdrop-blur-md">
                {/* Specimen Header & Status */}
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-on-surface tracking-wider uppercase">
                      {activeSpecimen.specimenNumber} • DORMANT
                    </span>
                  </div>

                  {/* Ambient Synthesizer Button */}
                  <button
                    type="button"
                    onClick={handleToggleAmbient}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 transition-all border ${
                      isPlayingSound
                        ? 'bg-secondary text-on-secondary border-secondary font-bold shadow-md'
                        : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border-outline-variant/60'
                    }`}
                    title="Play 432Hz Botanical Harmonic Chime"
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isPlayingSound ? 'graphic_eq' : 'volume_up'}
                    </span>
                    <span>{isPlayingSound ? '432Hz Sounding' : 'Chime'}</span>
                  </button>
                </div>

                {/* Specimen Profile Preview */}
                <div className="pt-4 space-y-3">
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-outline-variant/60 group">
                    <img
                      src={activeSpecimen.plateImage}
                      alt={activeSpecimen.title}
                      className="w-full h-full object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-secondary font-bold">
                          {activeSpecimen.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono">
                          {activeSpecimen.folioNumber}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-normal text-white mt-0.5">
                        {activeSpecimen.title}
                      </h3>
                    </div>
                  </div>

                  {/* Interactive Micro Tabs */}
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-surface-container-high/70 border border-outline-variant/50 text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setHeroTab('autopsy')}
                      className={`py-1.5 rounded-lg transition-all ${
                        heroTab === 'autopsy'
                          ? 'bg-surface-container text-on-surface font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Autopsy
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab('salvage')}
                      className={`py-1.5 rounded-lg transition-all ${
                        heroTab === 'salvage'
                          ? 'bg-surface-container text-on-surface font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Salvaged Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab('revival')}
                      className={`py-1.5 rounded-lg transition-all ${
                        heroTab === 'revival'
                          ? 'bg-surface-container text-on-surface font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      AI Revival
                    </button>
                  </div>

                  {/* Tab 1: Autopsy Breakdown */}
                  {heroTab === 'autopsy' && (
                    <div className="space-y-2 p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant">Primary Cause of Demise:</span>
                        <span className="font-mono font-semibold text-secondary">
                          {activeSpecimen.causeCategory}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {activeSpecimen.rootCause}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeSpecimen.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-surface-container-lowest text-[10px] font-mono text-on-surface-variant border border-outline-variant/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Salvaged Code */}
                  {heroTab === 'salvage' && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 animate-in fade-in">
                      <div className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider">
                        Extracted Zero-Dependency Modules:
                      </div>
                      <div className="space-y-1.5">
                        {activeSpecimen.preservedSalvageModules.map((mod) => (
                          <div
                            key={mod.name}
                            className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container border border-outline-variant/50 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-primary">
                                {mod.icon}
                              </span>
                              <span className="font-mono text-[11px] font-medium text-on-surface">
                                {mod.name}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-semibold">
                              Sanitized
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: AI Revival Radar */}
                  {heroTab === 'revival' && (
                    <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 animate-in fade-in space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-on-surface-variant">Revival Viability:</span>
                        <span className="text-xs font-mono font-bold text-primary">
                          {activeSpecimen.revivalScore}/100 (Prime)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                          style={{ width: `${activeSpecimen.revivalScore}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                        Intact database architecture & clear problem domain. 120-min revival sprint ready.
                      </p>
                    </div>
                  )}

                  {/* Bottom Action inside Chamber - visual showcase only */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-on-surface-variant">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span>Specimen Showcase • Live Preview</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {specimens.slice(0, 3).map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSpecimenIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            activeSpecimenIndex === idx
                              ? 'bg-primary w-5'
                              : 'bg-outline-variant hover:bg-outline'
                          }`}
                          title={`Inspect Specimen #${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THE DILEMMA: THE GITHUB CEMETERY VS. CONSERVATORY
         ───────────────────────────────────────────────────────────── */}
      <section id="dilemma" className="py-16 border-t border-outline-variant/50 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container font-mono text-xs font-bold uppercase tracking-wider">
              The Reality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
              Why do 90% of brilliant prototypes die in private repos?
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Every software engineer has a folder of unfinished side projects. When time runs out or
              priorities shift, valuable authentication systems, stripe pipelines, and domain knowledge
              get buried forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way: The Bleak Graveyard */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-surface-container border border-red-500/20 shadow-md space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl">
                  <span className="material-symbols-outlined">delete_forever</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    The Abandoned GitHub Repo
                  </h3>
                  <p className="text-xs text-on-surface-variant">The traditional fate of hackathon ideas</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-400 text-base flex-shrink-0 mt-0.5">
                    close
                  </span>
                  <span>
                    <strong>Code Rots Silently:</strong> Reusable auth logic, Prisma schemas, and UI components sit idle in private repos.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-400 text-base flex-shrink-0 mt-0.5">
                    close
                  </span>
                  <span>
                    <strong>Duplicate Effort:</strong> In every new hackathon or side-project, you waste 10+ hours rewriting the exact same boilerplate.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-400 text-base flex-shrink-0 mt-0.5">
                    close
                  </span>
                  <span>
                    <strong>Unresolved Grief:</strong> No post-mortem is documented. Was it bad market timing, scope creep, or developer burnout?
                  </span>
                </li>
              </ul>
            </div>

            {/* The New Way: Project Graveyard Conservatory */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-surface-container border border-primary/40 shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-on-primary font-mono text-[10px] font-bold uppercase rounded-bl-xl">
                The Solution
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-xl">
                  <span className="material-symbols-outlined">spa</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    The Project Graveyard Conservatory
                  </h3>
                  <p className="text-xs text-on-surface-variant">Regenerative code reclamation protocol</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-on-surface-variant">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Dignified Autopsy:</strong> Honor the engineering effort. Record the cause of death and preserve git commits as specimens.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Salvage Reusable Bricks:</strong> Dissect pure UI tokens, database schemas, and API wrappers for 1-click bundle export.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>AI Revival & Grafting:</strong> Calculate viability and cross-pollinate modules from two dead repos to spark an instant MVP.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FOUR PILLARS OF THE CONSERVATORY ECOSYSTEM
         ───────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-primary-container/70 text-on-primary-container font-mono text-xs font-bold uppercase tracking-wider">
              Core Architecture & Flow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
              Four tools. One clear purpose.
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto">
              Each feature helps users <strong>understand</strong>, <strong>evaluate</strong>, and <strong>restart</strong> an unfinished project — moving from <em>Capture ➔ Evaluate ➔ Act</em>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div
              onClick={() => onNavigate('overview')}
              className="clay-card p-6 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/60 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">
                    Pillar 01
                  </div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    The Crypt & Autopsy
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Preserve repos in vaulted specimens with epitaphs, git histories, root causes of death, and forensic failure classifications.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform">
                <span>Explore Cemetery</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onClick={() => onNavigate('salvage-yard')}
              className="clay-card p-6 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/60 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">precision_manufacturing</span>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">
                    Pillar 02
                  </div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    The Salvage Yard
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Harvest zero-dependency UI tokens, auth wrappers, and data pipelines cleansed of secret keys with 1-click JSZip package export.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform">
                <span>Browse Code Yard</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onClick={() => onNavigate('revival-compass')}
              className="clay-card p-6 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/60 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DE8553]/15 text-[#DE8553] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-[#DE8553] font-bold uppercase tracking-wider">
                    Pillar 03
                  </div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    The Revival Compass
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Multi-vector AI viability engine analyzing tech freshness, completion ratio, and market sentiment to produce 120-min revival sprints.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform">
                <span>Calculate Viability</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              onClick={() => onNavigate('graft-studio')}
              className="clay-card p-6 rounded-3xl bg-surface-container border border-outline-variant hover:border-primary/60 transition-all cursor-pointer group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#34D399]/15 text-[#34D399] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-[#34D399] font-bold uppercase tracking-wider">
                    Pillar 04
                  </div>
                  <h3 className="font-serif text-xl text-on-surface font-normal">
                    Graft Studio
                  </h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Cross-pollinate components from 2 dead repos onto an active graft canvas to synthesize brand new software architectures.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:translate-x-1 transition-transform">
                <span>Launch Graft Studio</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ─────────────────────────────────────────────────────────────
          7. FINAL CALL TO ACTION (Conservatory Gates)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-primary-container text-on-primary-container mx-auto flex items-center justify-center text-3xl shadow-lg border border-primary/30">
            <span className="material-symbols-outlined">spa</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-on-surface leading-tight">
            Your abandoned code isn't waste.
            <br />
            <span className="italic font-normal text-secondary">
              It's the fertile soil for your next breakthrough.
            </span>
          </h2>

          <div className="pt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="px-8 py-4 rounded-2xl bg-primary text-on-primary font-semibold text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>Create Account</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="pt-12 border-t border-outline-variant/40 text-xs text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">spa</span>
              <span className="font-serif text-sm text-on-surface font-semibold">Project Graveyard</span>
            </div>
            <span className="hidden sm:inline text-on-surface-variant/40">•</span>
            <span className="text-[11px] text-on-surface-variant">
              Developed by <strong className="text-on-surface">Team Hashing</strong> (Rajiv Jha, Mitesh Jha, Ansh Jaiswal, Aryan Jaiswal) • <span className="font-mono text-secondary">PS 05 • Build 01</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className="hover:text-on-surface transition-colors"
            >
              Theme Settings
            </button>
            <span className="text-on-surface-variant/40">•</span>
            <button
              type="button"
              onClick={() => onNavigate('archive')}
              className="hover:text-on-surface transition-colors"
            >
              Specimen Archive
            </button>
            <span className="text-on-surface-variant/40">•</span>
            <span className="font-mono text-[10px] text-secondary font-bold px-2 py-0.5 rounded bg-secondary/10">
              ROUND 2 READY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
