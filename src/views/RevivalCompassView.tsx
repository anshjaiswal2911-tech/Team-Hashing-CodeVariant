import React, { useState, useEffect } from 'react';
import { ProjectSpecimen } from '../types';

interface RevivalCompassViewProps {
  specimens: ProjectSpecimen[];
  selectedSpecimen: ProjectSpecimen | null;
  onSelectSpecimen: (specimen: ProjectSpecimen) => void;
  onOpenGraftSprint: (specimen: ProjectSpecimen) => void;
}

export const RevivalCompassView: React.FC<RevivalCompassViewProps> = ({
  specimens,
  selectedSpecimen,
  onSelectSpecimen,
  onOpenGraftSprint,
}) => {
  const currentSpecimen = selectedSpecimen || specimens[0];

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [excitement, setExcitement] = useState<number>(80);
  const [skillGrowth, setSkillGrowth] = useState<number>(90);
  const [isSolo, setIsSolo] = useState<boolean>(true);
  const [lastCalculatedText, setLastCalculatedText] = useState('Just now');
  const [isCalculating, setIsCalculating] = useState(false);

  // Dynamic factor calculations
  // Fixed dimensions for the specimen:
  // Code completion: based on specimen.completionPercentage
  const codeWt = 0.25;
  const codeScore = Math.min(100, Math.round(currentSpecimen.completionPercentage * 1.35));
  const codePts = +(codeScore * codeWt).toFixed(1);

  const ideaWt = 0.2;
  const ideaScore = 85;
  const ideaPts = +(ideaScore * ideaWt).toFixed(1);

  const fixabilityWt = 0.2;
  const fixabilityScore = 80;
  const fixabilityPts = +(fixabilityScore * fixabilityWt).toFixed(1);

  const interestWt = 0.15;
  const interestPts = +(excitement * interestWt).toFixed(1);

  const skillWt = 0.1;
  const skillPts = +(skillGrowth * skillWt).toFixed(1);

  const effortWt = 0.1;
  const effortScore = 60;
  const effortPts = +(effortScore * effortWt).toFixed(1);

  const teamModifier = isSolo ? 0 : -3.5;
  const totalScore = Math.min(
    100,
    Math.max(
      15,
      Math.round(codePts + ideaPts + fixabilityPts + interestPts + skillPts + effortPts + teamModifier)
    )
  );

  // Circumference = 2 * PI * 82 = 515.22
  const circumference = 515.22;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  // Determination text & Archetype calculation
  let determinationTitle = 'CONTINUE WITH A SMALLER SCOPE';
  let determinationDesc =
    'Salvage the verified core; prune non-essential peripheral features to meet current energy limits.';
  let matchedArchetype = 2; // Archetype 02: Continue (Pruned)

  if (totalScore >= 90) {
    determinationTitle = 'FULL SPEED AHEAD (SPARK REVIVAL)';
    determinationDesc =
      'Exceptional momentum alignment. Minimal friction remains to ship this into production.';
    matchedArchetype = 2;
  } else if (totalScore >= 75) {
    determinationTitle = 'CONTINUE WITH A SMALLER SCOPE';
    determinationDesc =
      'Salvage the verified core; prune non-essential peripheral features to meet current energy limits.';
    matchedArchetype = 2;
  } else if (totalScore >= 60) {
    determinationTitle = 'CHANGE THE CORE AUDIENCE / ANGLE';
    determinationDesc =
      'Good operational mechanics, but targeted customer problem shifted. Reposition before coding.';
    matchedArchetype = 3;
  } else if (totalScore >= 45) {
    determinationTitle = 'REPURPOSE COMPONENT GEMS ONLY';
    determinationDesc =
      'The overarching product is dead. Dissect high-value modules into the Salvage Yard for future grafting.';
    matchedArchetype = 4;
  } else {
    determinationTitle = 'HONOR & ARCHIVE IN DEEP SOIL';
    determinationDesc =
      'The lesson was learned, emotional closure achieved. Let it rest in peace without guilt.';
    matchedArchetype = 5;
  }

  // Excitement label helper
  const getExcitementText = (val: number) => {
    if (val >= 85) return 'Passionate to build';
    if (val >= 70) return 'Eager to build';
    if (val >= 45) return 'Cautious curiosity';
    return 'Dreading the debt';
  };

  // Skill label helper
  const getSkillText = (val: number) => {
    if (val >= 85) return 'Significantly advanced';
    if (val >= 60) return 'Some new tricks';
    return 'Same toolkit';
  };

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setLastCalculatedText('Just now');
    }, 300);
  };

  return (
    <div className="flex flex-col w-full space-y-10 pb-16">
      {/* Top Specimen Folio Banner & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>Folio Specimen No. 048 // Revival Compass</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-on-surface leading-tight">
            Does this idea deserve another beginning?
          </h1>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Transparent, multidimensional evaluation for dormant projects. No black-box AI scores — only
            explainable weights based on your momentum, context shift, and code readiness.
          </p>
        </div>

        {/* Project Selector Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <div
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="bg-surface-container-high px-4 py-2.5 rounded-lg shadow-sm flex items-center justify-between gap-4 min-w-[280px] cursor-pointer border border-surface-container-highest hover:border-secondary/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(242,189,121,0.5)] flex-shrink-0"></span>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-xs font-semibold text-on-surface truncate">
                    {currentSpecimen.title}
                  </span>
                  <span className="font-sans text-[11px] text-on-surface-variant/70">
                    Resting for {currentSpecimen.dormantDuration} • {currentSpecimen.completionPercentage}% Finished
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-base text-on-surface-variant">
                unfold_more
              </span>
            </div>

            {/* Dropdown Menu */}
            {isSelectorOpen && (
              <div className="absolute top-full mt-1.5 left-0 right-0 rounded-lg bg-surface-container p-2 shadow-2xl border border-surface-container-high z-50 space-y-1">
                {specimens.map((spec) => (
                  <div
                    key={spec.id}
                    onClick={() => {
                      onSelectSpecimen(spec);
                      setIsSelectorOpen(false);
                    }}
                    className={`p-2 rounded-md flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      spec.id === currentSpecimen.id
                        ? 'bg-secondary/20 text-secondary font-semibold'
                        : 'hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <span>{spec.title}</span>
                    <span className="font-mono text-[10px] text-outline">
                      {spec.completionPercentage}% done
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => alert(`Archival log loaded for ${currentSpecimen.title} (3 versions catalogued).`)}
            className="px-4 py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg transition-colors flex items-center gap-2 font-sans text-xs border border-surface-container-high/60"
          >
            <span className="material-symbols-outlined text-sm">history_toggle_off</span>
            <span>Version Log</span>
          </button>
        </div>
      </div>

      {/* Primary Asymmetric Grid: Dial & Rationale (Left 5 Cols) + Factor Breakdown (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: The Revival Dial, Verdict, Specimen Plate (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Vitrine Card for Grand Revival Meter */}
          <div className="relative overflow-hidden bg-surface-container rounded-[28px] p-6 shadow-sm flex flex-col items-center text-center border border-outline-variant/80 clay-card">
            {/* Ambient Aura */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            {/* Specimen Code Top-Corner Tag */}
            <div className="w-full flex justify-between items-center mb-4">
              <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                {currentSpecimen.specimenNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-sans text-xs border border-outline-variant font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>Seedling Stage</span>
              </span>
            </div>

            {/* Radial Score Dial SVG */}
            <div className="relative my-2 flex items-center justify-center">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Track */}
                <circle
                  className="text-surface-container-high dark:text-[#18261F]"
                  cx="100"
                  cy="100"
                  fill="none"
                  r="82"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                {/* Foreground Progress */}
                <circle
                  className="text-secondary transition-all duration-700 ease-out"
                  cx="100"
                  cy="100"
                  fill="none"
                  r="82"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="9"
                />
                {/* Soft tick marks */}
                <circle
                  className="text-outline-variant/60"
                  cx="100"
                  cy="100"
                  fill="none"
                  r="68"
                  stroke="currentColor"
                  strokeDasharray="2 8"
                  strokeWidth="1"
                />
              </svg>

              {/* Inside Score Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
                  Viability Index
                </span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="font-sans text-5xl font-bold text-on-surface leading-none tracking-tight">
                    {totalScore}
                  </span>
                  <span className="font-sans text-2xl text-on-surface-variant/70">/ 100</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="font-sans text-xs tracking-wide font-semibold">
                    +{Math.max(4, totalScore - 64)} pts over baseline
                  </span>
                </div>
              </div>
            </div>

            {/* Verdict Banner in Premium Themed Panel */}
            <div className="w-full mt-4 p-4 rounded-2xl panel-dark text-center flex flex-col items-center gap-1 shadow-lg">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-75 font-semibold">
                Compass Determination
              </span>
              <h2 className="font-sans text-base font-bold tracking-tight">
                {determinationTitle}
              </h2>
              <p className="font-sans text-xs opacity-80 max-w-sm mt-1 leading-relaxed">
                {determinationDesc}
              </p>
            </div>

            {/* Specimen Executive Rationale */}
            <div className="w-full mt-4 text-left bg-surface-container-low p-4 rounded-lg border border-surface-container-high/40">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <span className="material-symbols-outlined text-base">psychiatry</span>
                <span className="font-sans text-xs font-semibold text-on-surface">
                  Curator's Analysis
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {currentSpecimen.curatorAnalysis}
              </p>
            </div>

            {/* Preserved Specimen Artifact Visual */}
            <div className="w-full mt-4 rounded-lg overflow-hidden relative group border border-surface-container-high/40">
              <img
                src={currentSpecimen.plateImage}
                alt="Botanical specimen sheet"
                className="w-full h-36 object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent flex items-end p-3">
                <span className="font-mono text-[10px] text-primary tracking-wider font-semibold">
                  ARCHIVAL_PLATE_{currentSpecimen.title.slice(0, 2).toUpperCase()}_v0.9.png
                </span>
              </div>
            </div>
          </div>

          {/* Quick Context Box: Burial Post-Mortem */}
          <div className="bg-surface-container-low rounded-lg p-4 flex flex-col space-y-2 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-outline">
                Burial Date: {currentSpecimen.buriedDate}
              </span>
              <span className="font-mono text-xs text-secondary bg-surface-container-highest px-2 py-0.5 rounded">
                {currentSpecimen.dormantDuration} Dormant
              </span>
            </div>
            <p className="font-serif italic text-xs text-on-surface-variant leading-relaxed">
              {currentSpecimen.epitaph}
            </p>
          </div>
        </div>

        {/* Right Column: Factor Breakdown & Interactive Pulse Check (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Explainable Factor Breakdown Module */}
          <div className="bg-surface-container rounded-[28px] p-6 shadow-md flex flex-col space-y-4 border border-outline-variant/60 clay-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
              <div>
                <h2 className="font-sans text-lg text-on-surface font-semibold">
                  Explainable Factor Breakdown
                </h2>
                <p className="font-sans text-xs text-on-surface-variant">
                  Weighted contributions summing transparently to {totalScore} / 100 points
                </p>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-surface-container-high text-primary font-mono text-xs">
                6 Dimensions
              </span>
            </div>

            {/* Factors List */}
            <div className="space-y-3 pt-1">
              {/* Factor 1: Code & Asset Completion */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">code_blocks</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Code & Asset Completion
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      25% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{codeScore} / 100</span>
                    <span className="text-secondary font-bold">+{codePts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${codeScore}%` }}></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Auth, schema, and core UI components are already built and preserved in the vault.
                </p>
              </div>

              {/* Factor 2: Core Idea Strength */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">lightbulb</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Core Idea Strength
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      20% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{ideaScore} / 100</span>
                    <span className="text-secondary font-bold">+{ideaPts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: `${ideaScore}%` }}></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Solves a verified coordination problem without direct modern alternatives.
                </p>
              </div>

              {/* Factor 3: Cause Fixability */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">build_circle</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Cause Fixability
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      20% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{fixabilityScore} / 100</span>
                    <span className="text-secondary font-bold">+{fixabilityPts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${fixabilityScore}%` }}></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Original road block was circumstantial ({currentSpecimen.causeCategory}), not an architectural flaw.
                </p>
              </div>

              {/* Factor 4: Rekindled Interest (Dynamic Slider) */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">local_fire_department</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Rekindled Interest
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      15% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{excitement} / 100</span>
                    <span className="text-secondary font-bold">+{interestPts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-300"
                    style={{ width: `${excitement}%` }}
                  ></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Driven by your live Pulse Check response ({getExcitementText(excitement)}).
                </p>
              </div>

              {/* Factor 5: Skill Growth (Dynamic Slider) */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">school</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Skill Growth Since Burial
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      10% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{skillGrowth} / 100</span>
                    <span className="text-secondary font-bold">+{skillPts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${skillGrowth}%` }}
                  ></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Increased mastery of modern frameworks since pausing; blockers are now routine.
                </p>
              </div>

              {/* Factor 6: Remaining Effort to MVP */}
              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-surface-container-high/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-base">timer</span>
                    <span className="font-sans text-xs font-semibold text-on-surface">
                      Remaining Effort to MVP
                    </span>
                    <span className="font-mono text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded">
                      10% wt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-on-surface font-semibold">{effortScore} / 100</span>
                    <span className="text-secondary font-bold">+{effortPts} pts</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-outline-variant rounded-full" style={{ width: `${effortScore}%` }}></div>
                </div>
                <p className="font-sans text-xs text-on-surface-variant/90 pt-0.5">
                  Requires ~16 focused hours to prune non-essential tabs and deliver a single clean workflow.
                </p>
              </div>
            </div>
          </div>

          {/* Pulse Check Module: Recalibrate */}
          <div className="bg-surface-container rounded-[28px] p-6 shadow-md flex flex-col space-y-4 border border-outline-variant/60 clay-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </div>
                <div>
                  <h3 className="font-sans text-base text-on-surface font-semibold">
                    Pulse Check: Recalibrate
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Update the diagnostic with your feelings today
                  </p>
                </div>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-medium">
                Dynamic Weights
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {/* Slider 1: Excitement */}
              <div className="space-y-2 bg-surface-container-low p-4 rounded-lg border border-surface-container-high/30">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="excitementRange" className="font-sans font-medium text-on-surface">
                    How excited are you to touch this codebase again?
                  </label>
                  <span className="font-mono font-semibold text-secondary">
                    {excitement}% — {getExcitementText(excitement)}
                  </span>
                </div>
                <input
                  id="excitementRange"
                  type="range"
                  min="10"
                  max="100"
                  value={excitement}
                  onChange={(e) => setExcitement(parseInt(e.target.value, 10))}
                  className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg appearance-none"
                />
                <div className="flex justify-between font-mono text-[10px] text-outline pt-0.5">
                  <span>Dreading the debt (10%)</span>
                  <span>Cautious curiosity (50%)</span>
                  <span>Can't stop thinking about it (100%)</span>
                </div>
              </div>

              {/* Slider 2: Technical Skills */}
              <div className="space-y-2 bg-surface-container-low p-4 rounded-lg border border-surface-container-high/30">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="skillsRange" className="font-sans font-medium text-on-surface">
                    How much stronger are your technical skills now?
                  </label>
                  <span className="font-mono font-semibold text-primary">
                    {skillGrowth}% — {getSkillText(skillGrowth)}
                  </span>
                </div>
                <input
                  id="skillsRange"
                  type="range"
                  min="10"
                  max="100"
                  value={skillGrowth}
                  onChange={(e) => setSkillGrowth(parseInt(e.target.value, 10))}
                  className="w-full accent-primary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg appearance-none"
                />
                <div className="flex justify-between font-mono text-[10px] text-outline pt-0.5">
                  <span>Same toolkit (10%)</span>
                  <span>Some new tricks (50%)</span>
                  <span>Way more senior (100%)</span>
                </div>
              </div>

              {/* Collaborative Toggle */}
              <div className="bg-surface-container-low p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container-high/30">
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-medium text-on-surface">
                    Working solo or with collaborators?
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    {isSolo
                      ? 'Solo execution reduces coordination overhead by 30%'
                      : 'Collaborative team requires sync & PR review bandwidth'}
                  </span>
                </div>

                <div className="inline-flex rounded-lg bg-surface-container-high p-1 self-start sm:self-auto border border-surface-container-highest">
                  <button
                    type="button"
                    onClick={() => setIsSolo(true)}
                    className={`px-4 py-1 text-xs font-sans rounded-md transition-all ${
                      isSolo
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Solo (Current)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSolo(false)}
                    className={`px-4 py-1 text-xs font-sans rounded-md transition-all ${
                      !isSolo
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Team
                  </button>
                </div>
              </div>

              {/* Recalculate Button CTA */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-sans text-xs text-on-surface-variant/70 italic flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock_clock</span>
                  Last verified {lastCalculatedText}
                </span>

                <button
                  type="button"
                  onClick={handleRecalculate}
                  className={`px-5 py-2.5 bg-primary-container hover:bg-tertiary-container text-on-primary-container font-sans text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm ${
                    isCalculating ? 'scale-95 opacity-80' : ''
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isCalculating ? 'animate-spin' : ''}`}>
                    restart_alt
                  </span>
                  <span>Recalculate Compass</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Standard Verdict Archetypes (Visual Summary Bar) */}
      <div className="bg-surface-container rounded-[28px] p-6 shadow-md space-y-4 border border-outline-variant/60 clay-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-1">
          <div>
            <h2 className="font-sans text-lg text-on-surface font-semibold">
              The Five Archetypes of Revival
            </h2>
            <p className="font-sans text-xs text-on-surface-variant">
              Every dormant repository settles into one of five honest paths
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-outline">
            Decision Spectrum
          </span>
        </div>

        {/* 5 Horizontal Archetype Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Archetype 1 */}
          <div
            className={`p-4 rounded-lg flex flex-col justify-between space-y-2 transition-all border ${
              matchedArchetype === 1
                ? 'bg-secondary-container/30 border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'bg-surface-container-low border-surface-container-high/30 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-base">cleaning_services</span>
                <span className="font-mono text-[10px] uppercase">Archetype 01</span>
              </div>
              <span className="font-sans text-xs font-semibold text-on-surface block">
                Restart from Scratch
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              Idea remains gold, but legacy tech stack is beyond salvage.
            </p>
            <span className="font-mono text-[10px] text-outline mt-2">Score Threshold: &lt;45</span>
          </div>

          {/* Archetype 2: Selected in screenshot */}
          <div
            className={`p-4 rounded-lg flex flex-col justify-between space-y-2 transition-all border relative ${
              matchedArchetype === 2
                ? 'bg-secondary-container/30 border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'bg-surface-container-low border-surface-container-high/30 opacity-70 hover:opacity-100'
            }`}
          >
            {matchedArchetype === 2 && (
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Current Match
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span className="font-mono text-[10px] uppercase font-semibold">Archetype 02</span>
              </div>
              <span className="font-sans text-xs font-semibold text-secondary block">
                Continue (Pruned)
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              High code readiness; prune secondary features for a clean cut.
            </p>
            <span className="font-mono text-[10px] text-secondary font-semibold mt-2">
              Score Range: 75 – 90
            </span>
          </div>

          {/* Archetype 3 */}
          <div
            className={`p-4 rounded-lg flex flex-col justify-between space-y-2 transition-all border ${
              matchedArchetype === 3
                ? 'bg-secondary-container/30 border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'bg-surface-container-low border-surface-container-high/30 opacity-70 hover:opacity-100'
            }`}
          >
            {matchedArchetype === 3 && (
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Current Match
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-base">alt_route</span>
                <span className="font-mono text-[10px] uppercase">Archetype 03</span>
              </div>
              <span className="font-sans text-xs font-semibold text-on-surface block">
                Change the Idea
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              Good operational mechanics, but targeted customer problem vanished.
            </p>
            <span className="font-mono text-[10px] text-outline mt-2">Score Range: 60 – 74</span>
          </div>

          {/* Archetype 4 */}
          <div
            className={`p-4 rounded-lg flex flex-col justify-between space-y-2 transition-all border ${
              matchedArchetype === 4
                ? 'bg-secondary-container/30 border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'bg-surface-container-low border-surface-container-high/30 opacity-70 hover:opacity-100'
            }`}
          >
            {matchedArchetype === 4 && (
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Current Match
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-base">join_inner</span>
                <span className="font-mono text-[10px] uppercase">Archetype 04</span>
              </div>
              <span className="font-sans text-xs font-semibold text-on-surface block">
                Repurpose Code
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              Product is dead; harvest specific auth or parsing gems into Graft Studio.
            </p>
            <span className="font-mono text-[10px] text-outline mt-2">Score Range: 45 – 59</span>
          </div>

          {/* Archetype 5 */}
          <div
            className={`p-4 rounded-lg flex flex-col justify-between space-y-2 transition-all border ${
              matchedArchetype === 5
                ? 'bg-secondary-container/30 border-secondary ring-1 ring-secondary/40 shadow-md'
                : 'bg-surface-container-low border-surface-container-high/30 opacity-70 hover:opacity-100'
            }`}
          >
            {matchedArchetype === 5 && (
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Current Match
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-base">spa</span>
                <span className="font-mono text-[10px] uppercase">Archetype 05</span>
              </div>
              <span className="font-sans text-xs font-semibold text-on-surface block">
                Honor & Archive
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              The lesson was learned, emotional closure achieved. Let it rest in peace.
            </p>
            <span className="font-mono text-[10px] text-outline mt-2">Score Threshold: &lt;35</span>
          </div>
        </div>

        {/* Final Action Banner */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-4 rounded-lg border border-surface-container-high/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
              <span className="material-symbols-outlined text-xl">footprint</span>
            </div>
            <div>
              <h4 className="font-sans text-xs font-semibold text-on-surface">
                Ready to test the waters?
              </h4>
              <p className="font-sans text-xs text-on-surface-variant">
                Commit to one 120-minute revival sprint before declaring full dedication.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenGraftSprint(currentSpecimen)}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary font-sans text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Proceed to Verdict & First 2-Hour Move</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
