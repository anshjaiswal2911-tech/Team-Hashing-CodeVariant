import React, { useState } from 'react';
import { ProjectSpecimen, ScreenId } from '../types';
import { CAUSE_OF_DEATH_OPTIONS } from '../data/mockData';

interface BuryProjectViewProps {
  onProjectBuried: (newProject: ProjectSpecimen) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const BuryProjectView: React.FC<BuryProjectViewProps> = ({
  onProjectBuried,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(3); // Default to Step 3 as shown in Image 3

  // Form State
  const [title, setTitle] = useState('Campus Connect');
  const [category, setCategory] = useState('EdTech & Community');
  const [description, setDescription] = useState(
    'A localized peer tutoring and club coordination matrix designed to reduce campus isolation.'
  );
  const [completion, setCompletion] = useState<number>(62);
  const [selectedMaturity, setSelectedMaturity] = useState<string[]>([
    'Working Prototype',
    'Production Database Schema',
    'Design System Complete',
  ]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'Authentication Flow',
    'Database Migrations & Prisma Schema',
    'Custom Component Library',
  ]);
  const [unfinishedNotes, setUnfinishedNotes] = useState(
    "Push notification service had permission bugs on iOS Safari; mobile navbar layout wasn't polished for smaller breakpoints."
  );
  const [selectedCauses, setSelectedCauses] = useState<string[]>(['Time Shortage']);
  const [epitaph, setEpitaph] = useState(
    '“Buried with honors on October 14, 2023 • Awaiting eventual graft”'
  );
  const [showSavedToast, setShowSavedToast] = useState(false);

  const toggleMaturity = (marker: string) => {
    if (selectedMaturity.includes(marker)) {
      setSelectedMaturity(selectedMaturity.filter((m) => m !== marker));
    } else {
      setSelectedMaturity([...selectedMaturity, marker]);
    }
  };

  const toggleComponent = (comp: string) => {
    if (selectedComponents.includes(comp)) {
      setSelectedComponents(selectedComponents.filter((c) => c !== comp));
    } else {
      setSelectedComponents([...selectedComponents, comp]);
    }
  };

  const toggleCause = (causeLabel: string) => {
    if (selectedCauses.includes(causeLabel)) {
      setSelectedCauses(selectedCauses.filter((c) => c !== causeLabel));
    } else {
      setSelectedCauses([...selectedCauses, causeLabel]);
    }
  };

  const handleFinalBurial = () => {
    const newSpecimen: ProjectSpecimen = {
      id: `SPEC-${Date.now().toString().slice(-4)}`,
      specimenNumber: `SPECIMEN #${Math.floor(Math.random() * 800 + 100)}`,
      folioNumber: `Folio #${title.slice(0, 2).toUpperCase()}-24`,
      title: title || 'Unnamed Idea',
      category: category || 'General Exploration',
      description: description || 'A preserved seedling awaiting future revival.',
      buriedDate: 'Today',
      dormantDuration: 'Just preserved',
      status: 'resting',
      completionPercentage: completion,
      revivalScore: Math.round(completion * 0.9 + 15),
      rootCause: `${selectedCauses.join(', ') || 'Scope Shift'}: ${unfinishedNotes}`,
      causeCategory: selectedCauses[0] || 'Time Shortage',
      techStack: ['React', 'TypeScript', 'TailwindCSS'],
      preservedSalvageModules: selectedComponents.map((c) => ({
        name: c,
        icon: 'extension',
      })),
      unfinishedNotes: unfinishedNotes,
      epitaph: epitaph || '“Resting with honor in the quiet soil.”',
      plateImage:
        'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
      salvageViability: {
        level: `High (${selectedComponents.length} Modules)`,
        score: Math.min(95, 60 + selectedComponents.length * 8),
      },
      curatorAnalysis: `Archived with ${completion}% functional velocity. Contains valuable components that may be grafted into upcoming builds without recreating from scratch.`,
    };

    onProjectBuried(newSpecimen);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Botanical Ambient Background Flares */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="pointer-events-none absolute top-48 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>

      {/* Page Header & Archival Premise */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
        <div>
          <div className="flex items-center gap-1.5 text-secondary font-sans text-xs uppercase tracking-widest mb-1">
            <span className="material-symbols-outlined text-sm">filter_vintage</span>
            <span>Conservatory Archival Ritual • Specimen No. 104</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface tracking-tight">
            Bury a Project
          </h1>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            Every resting idea leaves seeds for the future. Take five minutes to preserve its history
            and recover what was built.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-surface-container-low px-4 py-1.5 rounded-xl border border-surface-container-high/60 shadow-sm">
          <span className="material-symbols-outlined text-primary text-base">multiple_airports</span>
          <span className="font-sans text-xs text-on-surface-variant">Est. 4 min remaining</span>
        </div>
      </div>

      {/* Dignified Minimalist Progress Stepper */}
      <div className="max-w-5xl mx-auto mb-8 bg-surface-container rounded-2xl p-4 border border-outline-variant/80 shadow-sm w-full">
        <div className="grid grid-cols-5 relative items-center gap-2">
          {/* Step 1 */}
          <div
            onClick={() => setCurrentStep(1)}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-1.5 shadow-sm transition-transform group-hover:scale-105 ${
                currentStep > 1
                  ? 'bg-primary-container text-on-primary-container'
                  : currentStep === 1
                  ? 'bg-primary text-on-primary ring-4 ring-primary/20 font-bold'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {currentStep > 1 ? 'check' : 'edit'}
              </span>
            </div>
            <span className="font-sans text-xs text-on-surface font-medium">1. The Beginning</span>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest hidden sm:block">
              {currentStep > 1 ? 'Preserved' : 'Current'}
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setCurrentStep(2)}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-1.5 shadow-sm transition-transform group-hover:scale-105 ${
                currentStep > 2
                  ? 'bg-primary-container text-on-primary-container'
                  : currentStep === 2
                  ? 'bg-primary text-on-primary ring-4 ring-primary/20 font-bold'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {currentStep > 2 ? 'check' : 'visibility'}
              </span>
            </div>
            <span className="font-sans text-xs text-on-surface font-medium">2. The Vision</span>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest hidden sm:block">
              {currentStep > 2 ? 'Catalogued' : currentStep === 2 ? 'Current' : 'Upcoming'}
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setCurrentStep(3)}
            className="flex flex-col items-center text-center relative cursor-pointer"
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full mb-1.5 shadow-md transition-transform ${
                currentStep === 3
                  ? 'bg-primary text-on-primary ring-4 ring-primary/20 shadow-lg'
                  : currentStep > 3
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {currentStep > 3 ? 'check' : 'energy_savings_leaf'}
              </span>
            </div>
            <span
              className={`font-sans text-xs font-semibold ${
                currentStep === 3 ? 'text-on-surface' : 'text-on-surface-variant'
              }`}
            >
              3. What Remains
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest hidden sm:block">
              {currentStep === 3 ? 'Harvesting' : currentStep > 3 ? 'Harvested' : 'Upcoming'}
            </span>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => setCurrentStep(4)}
            className={`flex flex-col items-center text-center cursor-pointer ${
              currentStep < 4 ? 'opacity-70' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-1.5 ${
                currentStep === 4
                  ? 'bg-primary text-on-primary ring-4 ring-primary/20 font-bold'
                  : currentStep > 4
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {currentStep > 4 ? 'check' : 'psychology_alt'}
              </span>
            </div>
            <span className="font-sans text-xs text-on-surface-variant font-medium">
              4. Cause of Death
            </span>
            <span className="font-mono text-[10px] text-outline uppercase tracking-widest hidden sm:block">
              {currentStep === 4 ? 'Diagnosing' : 'Next'}
            </span>
          </div>

          {/* Step 5 */}
          <div
            onClick={() => setCurrentStep(5)}
            className={`flex flex-col items-center text-center cursor-pointer ${
              currentStep < 5 ? 'opacity-70' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-1.5 ${
                currentStep === 5
                  ? 'bg-secondary text-on-secondary ring-4 ring-secondary/20 font-bold'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
            </div>
            <span className="font-sans text-xs text-on-surface-variant font-medium">
              5. The Epitaph
            </span>
            <span className="font-mono text-[10px] text-outline uppercase tracking-widest hidden sm:block">
              {currentStep === 5 ? 'Resting' : 'Final'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace (7 cols input + 5 cols live preview) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* STEP 1: The Beginning */}
          {currentStep === 1 && (
            <div className="bg-surface-container-low p-6 rounded-xl shadow-md space-y-5 border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/80">
                    Step 1 // Botanical Registry
                  </span>
                  <h2 className="font-serif text-2xl text-on-surface">The Beginning</h2>
                </div>
                <span className="material-symbols-outlined text-primary/40 text-2xl">inventory_2</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                    Project Specimen Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Campus Connect"
                    className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-sm border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                    Taxonomy / Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. EdTech & Community"
                    className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-sm border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                    Short Memorial Pitch
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the initiative's original premise..."
                    className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-sm border border-surface-container-high focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: The Vision */}
          {currentStep === 2 && (
            <div className="bg-surface-container-low p-6 rounded-xl shadow-md space-y-5 border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/80">
                    Step 2 // Original Ambition
                  </span>
                  <h2 className="font-serif text-2xl text-on-surface">The Vision</h2>
                </div>
                <span className="material-symbols-outlined text-primary/40 text-2xl">visibility</span>
              </div>

              <div className="space-y-4 text-xs text-on-surface-variant">
                <p>
                  Recall what sparked this project initially. Capturing the vision honors the creative
                  spark that gave it life.
                </p>

                <div>
                  <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                    Who was this meant to serve?
                  </label>
                  <input
                    type="text"
                    defaultValue="University student clubs and cross-major study groups"
                    className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-sm border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                    The Dream Outcome (Before Reality Intervened)
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Create a frictionless campus graph where any student could form a study sprint in two clicks without social anxiety."
                    className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-sm border border-surface-container-high focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Specimen Remnants (Primary Screen in Screenshot) */}
          {currentStep === 3 && (
            <div className="bg-surface-container-low p-6 rounded-xl shadow-md space-y-6 border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-medium">
                    Inventory & Salvage
                  </span>
                  <h2 className="font-serif text-2xl text-on-surface">Specimen Remnants</h2>
                </div>
                <span className="material-symbols-outlined text-primary/40 text-2xl">inventory_2</span>
              </div>

              {/* Completion Slider Section */}
              <div className="space-y-2 bg-surface-container p-4 rounded-lg border border-surface-container-high/30">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="completionRange" className="font-sans text-sm text-on-surface font-semibold">
                    Estimated Completion Level
                  </label>
                  <span className="font-serif text-2xl text-secondary font-bold">
                    {completion}%
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/80">
                  How far did the realization reach before entering dormancy?
                </p>
                <div className="pt-2">
                  <input
                    id="completionRange"
                    type="range"
                    min="0"
                    max="100"
                    value={completion}
                    onChange={(e) => setCompletion(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-outline pt-1 uppercase tracking-wider">
                    <span>0% Concept</span>
                    <span>25% Prototype</span>
                    <span>50% Architecture</span>
                    <span>75% Pre-Launch</span>
                    <span>100% Shipped</span>
                  </div>
                </div>
              </div>

              {/* Segmented Status Badges / Maturity Markers */}
              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-on-surface">
                  Maturity Markers reached
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Working Prototype',
                    'Production Database Schema',
                    'Design System Complete',
                    'Pending Frontend Integration',
                  ].map((marker) => {
                    const isSelected = selectedMaturity.includes(marker);
                    return (
                      <button
                        key={marker}
                        type="button"
                        onClick={() => toggleMaturity(marker)}
                        className={`px-3 py-1.5 rounded-full font-sans text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                          isSelected
                            ? 'bg-primary-container text-on-primary-container font-semibold'
                            : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-xs">check</span>
                        )}
                        <span>{marker}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-select Asset Extractor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-sans text-xs font-semibold text-on-surface">
                    What reusable components survived?
                  </label>
                  <span className="font-mono text-xs text-secondary">
                    {selectedComponents.length} Selected for Salvage Yard
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/80">
                  These will be indexed automatically for your future graft projects.
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    {
                      title: 'Authentication Flow',
                      subtitle: 'NextAuth, Google OAuth provider & JWT refresh logic',
                    },
                    {
                      title: 'Database Migrations & Prisma Schema',
                      subtitle: 'Full relational model for campus clubs, events & RSVPs',
                    },
                    {
                      title: 'Custom Component Library',
                      subtitle: 'Tailwind UI styled badges, modals, tab switchers',
                    },
                    {
                      title: 'Audio / Video Processing Pipeline',
                      subtitle: 'FFmpeg worker integration and HLS transcoding',
                    },
                    {
                      title: 'Payment & Stripe Webhooks',
                      subtitle: 'Subscription tiers, billing portal and automated invoices',
                    },
                  ].map((item) => {
                    const isChecked = selectedComponents.includes(item.title);
                    return (
                      <label
                        key={item.title}
                        onClick={() => toggleComponent(item.title)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer group border ${
                          isChecked
                            ? 'bg-surface-container hover:bg-surface-container-high border-primary/20'
                            : 'bg-surface-container/50 hover:bg-surface-container border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-primary-container bg-surface-container-lowest focus:ring-0 cursor-pointer accent-primary"
                        />
                        <div className="flex flex-col flex-1">
                          <span
                            className={`font-sans text-xs font-semibold transition-colors ${
                              isChecked
                                ? 'text-on-surface group-hover:text-primary'
                                : 'text-on-surface-variant group-hover:text-on-surface'
                            }`}
                          >
                            {item.title}
                          </span>
                          <span
                            className={`font-sans text-xs ${
                              isChecked ? 'text-on-surface-variant' : 'text-outline'
                            }`}
                          >
                            {item.subtitle}
                          </span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-base ${
                            isChecked ? 'text-primary' : 'text-outline'
                          }`}
                        >
                          {isChecked ? 'verified' : 'bookmark_add'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Unfinished Details */}
              <div className="space-y-2">
                <label htmlFor="unfinishedNotes" className="font-sans text-xs font-semibold text-on-surface">
                  What was left unfinished?
                </label>
                <p className="font-sans text-xs text-on-surface-variant/80">
                  Detailing where the trail stopped helps clear mental weight and prevents repeated
                  hurdles.
                </p>
                <textarea
                  id="unfinishedNotes"
                  rows={3}
                  value={unfinishedNotes}
                  onChange={(e) => setUnfinishedNotes(e.target.value)}
                  placeholder="e.g., Push notification service, mobile responsiveness, deployment scripts..."
                  className="w-full p-3 rounded-lg bg-surface-container text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-1 focus:ring-primary shadow-inner resize-none border border-surface-container-high/40"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Cause of Death */}
          {currentStep === 4 && (
            <div className="bg-surface-container-low p-6 rounded-xl shadow-md space-y-6 border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-secondary font-medium">
                    Step 4 // Cause of Dormancy
                  </span>
                  <h2 className="font-serif text-2xl text-on-surface">Honest Reflection Without Remorse</h2>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl">hourglass_top</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Projects rarely end because developers lack skill. What specific currents led this
                initiative to pause?
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {CAUSE_OF_DEATH_OPTIONS.map((c) => {
                  const isSelected = selectedCauses.includes(c.label);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCause(c.label)}
                      className={`p-3 rounded-lg text-left text-xs transition-all flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-surface-container-high text-on-surface font-semibold border-secondary/40 shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 border-transparent'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${c.color}`}></span>
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                  Post-Mortem Chronicle / Specific Hurdle
                </label>
                <textarea
                  rows={3}
                  value={unfinishedNotes}
                  onChange={(e) => setUnfinishedNotes(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-container text-on-surface text-xs border border-surface-container-high focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 5: The Epitaph */}
          {currentStep === 5 && (
            <div className="bg-surface-container-low p-6 rounded-xl shadow-md space-y-6 border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-medium">
                    Step 5 // Final Resting Dedication
                  </span>
                  <h2 className="font-serif text-2xl text-on-surface">The Heartfelt Epitaph</h2>
                </div>
                <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Give this effort its ceremonial closure. Write one sincere line honoring what was
                attempted.
              </p>

              <div>
                <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                  Memorial Epitaph Quote
                </label>
                <textarea
                  rows={3}
                  value={epitaph}
                  onChange={(e) => setEpitaph(e.target.value)}
                  placeholder="e.g. “Buried with honors on October 14, 2023 • Awaiting eventual graft”"
                  className="w-full p-3 rounded-lg bg-surface-container text-on-surface font-serif italic text-sm border border-secondary/30 focus:outline-none focus:border-secondary resize-none"
                />
              </div>

              <div className="p-4 rounded-lg bg-secondary-container/20 border border-secondary/30 text-secondary text-xs flex items-start gap-2.5">
                <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">verified_user</span>
                <div>
                  <strong className="block mb-0.5">Vault Guarantee</strong>
                  <span>
                    Your code modules will remain indexed in the Salvage Yard. Whenever you start a
                    future project, these 3 preserved components will be ready for instant grafting.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Foreshadowing Preview: Step 4 Cause of Death teaser (shown on Step 3) */}
          {currentStep === 3 && (
            <div className="bg-surface-container-low/60 rounded-xl p-5 backdrop-blur-sm border border-surface-container-high/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    hourglass_top
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    Step 4 Preview • Cause of Dormancy
                  </span>
                </div>
                <span className="font-sans text-[11px] text-outline">
                  Multi-select available next
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant mb-3">
                Honest reflection without remorse. What currents led this initiative to pause?
              </p>
              <div className="flex flex-wrap gap-2 opacity-80">
                {CAUSE_OF_DEATH_OPTIONS.map((c) => (
                  <span
                    key={c.id}
                    className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-sans text-xs flex items-center gap-1.5 shadow-sm border border-surface-container-high/20"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.color}`}></span>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Action Bar */}
          <div className="flex items-center justify-between pt-1 pb-4">
            <button
              type="button"
              onClick={() => {
                setShowSavedToast(true);
                setTimeout(() => setShowSavedToast(false), 2500);
              }}
              className="text-outline hover:text-on-surface font-sans text-xs transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">bookmark</span>
              <span>Save as Draft</span>
            </button>

            {showSavedToast && (
              <span className="text-secondary font-mono text-xs animate-pulse">
                ✓ Specimen draft saved to vault
              </span>
            )}

            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-sans text-xs font-semibold flex items-center gap-1 border border-surface-container-highest"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>
                    Back: {currentStep === 2 ? 'The Beginning' : currentStep === 3 ? 'The Vision' : currentStep === 4 ? 'What Remains' : 'Cause of Death'}
                  </span>
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-5 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all font-sans text-xs font-semibold flex items-center gap-2 shadow-[0_4px_16px_rgba(242,189,121,0.35)]"
                >
                  <span>
                    Continue to {currentStep === 1 ? 'The Vision' : currentStep === 2 ? 'What Remains' : currentStep === 3 ? 'Cause of Death' : 'The Epitaph'}
                  </span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalBurial}
                  className="px-6 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all font-sans text-xs font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(242,189,121,0.45)]"
                >
                  <span className="material-symbols-outlined text-base">inventory_2</span>
                  <span>Bury with Honors & Harvest Modules</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: The Archival Memorial Live Preview */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-base">visibility</span>
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                Live Cemetery Preview
              </span>
            </div>
            <span className="font-mono text-[11px] text-outline">Specimen Vitrine #08</span>
          </div>

          {/* Tombstone Specimen Card */}
          <div className="bg-surface-container-high rounded-xl overflow-hidden shadow-2xl relative group border border-surface-container-highest">
            {/* Herbarium Specimen Visual Top */}
            <div className="relative h-44 w-full overflow-hidden bg-surface-container-highest">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80"
                alt="Botanical specimen herbarium sheet"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-surface-container-high/40 to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-mono text-[10px] tracking-wider uppercase shadow-sm border border-primary/20">
                  SPEC-2023-094
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[11px] font-sans font-semibold uppercase tracking-wide backdrop-blur-sm border border-secondary/30">
                  Preserved
                </span>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-base">eco</span>
              </div>
            </div>

            {/* Memorial Content */}
            <div className="p-6 space-y-4 -mt-4 relative">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary/80 font-medium">
                  {category}
                </span>
                <h3 className="font-serif text-3xl text-on-surface tracking-tight mt-0.5">
                  {title}
                </h3>
                <p className="font-sans text-xs text-on-surface-variant/90 line-clamp-2 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Technology Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React 18', 'Node.js', 'Prisma ORM', 'TailwindCSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[11px] border border-surface-container-highest"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress Meter */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center font-sans text-xs">
                  <span className="text-on-surface-variant">Archived Completion</span>
                  <span className="text-secondary font-mono font-semibold">{completion}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </div>

              {/* Reusable Yield / Salvage Score Metric */}
              <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/40 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">join_inner</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-outline uppercase tracking-wider block">
                      Salvage Viability
                    </span>
                    <span className="font-sans text-xs text-on-surface font-bold">
                      High ({selectedComponents.length} Modules)
                    </span>
                  </div>
                </div>

                {/* Mini SVG Ring Chart for Salvage Index */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="w-11 h-11 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      className="text-surface-container-high"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <circle
                      className="text-secondary"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="14"
                      stroke="currentColor"
                      strokeDasharray="88"
                      strokeDashoffset="14"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-mono text-[10px] font-bold text-on-surface">
                    84
                  </span>
                </div>
              </div>

              {/* Specimen Inscription Note */}
              <div className="pt-1 text-center">
                <span className="font-serif italic text-xs text-outline block">
                  {epitaph}
                </span>
              </div>
            </div>
          </div>

          {/* Dignified Archival Quote Box */}
          <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3 shadow-sm border border-surface-container-high/40">
            <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">
              format_quote
            </span>
            <div>
              <p className="font-serif text-sm text-on-surface italic leading-relaxed">
                Resting projects retain over 70% of their learning value and code utility. What lies
                dormant today feeds tomorrow’s harvest.
              </p>
              <span className="font-mono text-[10px] text-primary/70 tracking-wider uppercase block mt-2">
                — The Conservatory Manifesto
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
