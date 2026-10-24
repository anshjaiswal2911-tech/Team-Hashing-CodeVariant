import React, { useState } from 'react';
import { ProjectSpecimen, SalvageModule, ActivityItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SettingsViewProps {
  specimens?: ProjectSpecimen[];
  salvageModules?: SalvageModule[];
  activities?: ActivityItem[];
  basket?: string[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  specimens = [],
  salvageModules = [],
  activities = [],
  basket = [],
}) => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [curatorName, setCuratorName] = useState('Eleni Vance');
  const [curatorRole, setCuratorRole] = useState('Master Curator');
  const [whisperFrequency, setWhisperFrequency] = useState('daily');
  const [autoIndexSalvage, setAutoIndexSalvage] = useState(true);
  const [ambientSounds, setAmbientSounds] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [backupToast, setBackupToast] = useState<string | null>(null);

  // Pivora Neo-Tactile Component Studio Interactive States
  const [isSending, setIsSending] = useState(false);
  const [activeTactileTab, setActiveTactileTab] = useState<'overview' | 'details' | 'settings'>('overview');
  const [tactileSwitch, setTactileSwitch] = useState(true);
  const [tactileEmail, setTactileEmail] = useState('');
  const [tactileCheckbox, setTactileCheckbox] = useState(true);
  const [tactileRadio, setTactileRadio] = useState<'opt1' | 'opt2'>('opt1');
  const [tactileSlider, setTactileSlider] = useState(75);

  const handleSimulateSubmit = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleExportVaultJson = () => {
    try {
      const vaultPayload = {
        $schema: 'https://project-graveyard.dev/schema/vault-v1.json',
        vaultName: 'Project Graveyard Conservatory Vault',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        curator: {
          name: curatorName,
          title: curatorRole,
        },
        preferences: {
          whisperFrequency,
          autoIndexSalvage,
          ambientSounds,
        },
        vaultSummary: {
          totalSpecimensPreserved: specimens.length,
          reusableModulesIndexed: salvageModules.length,
          salvageBasketCount: basket.length,
          journalEntries: activities.length,
        },
        specimens,
        salvageModules,
        salvageBasket: basket,
        activityStream: activities,
      };

      const jsonStr = JSON.stringify(vaultPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `project-graveyard-vault-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setBackupToast(`✓ Downloaded ${link.download} (${specimens.length} specimens, ${salvageModules.length} modules)`);
      setTimeout(() => setBackupToast(null), 4000);
    } catch (err) {
      alert(`Export failed: ${(err as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-outline font-mono text-xs uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm">settings</span>
          <span>Conservatory Protocol // Preferences</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-on-surface">Curator Settings</h1>
        <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
          Configure vault telemetry, reminder cadences for dormant seeds, and archival display
          parameters.
        </p>
      </div>

      <div className="space-y-6">
        {/* Curator Profile Section */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-high/50 space-y-4">
          <h2 className="font-serif text-xl text-on-surface">Curator Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                Curator Name
              </label>
              <input
                type="text"
                value={curatorName}
                onChange={(e) => setCuratorName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container text-xs text-on-surface border border-surface-container-high focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-semibold text-on-surface block mb-1">
                Official Title / Rank
              </label>
              <input
                type="text"
                value={curatorRole}
                onChange={(e) => setCuratorRole(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-surface-container text-xs text-on-surface border border-surface-container-high focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Conservatory Visual Ambience & Theme Protocol */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-high/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl text-on-surface">Visual Ambience & Theme Protocol</h2>
              <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                Select between Midnight Botanical (Original Dark), Botanical Ivory (Pitch Deck), and Monochrome Enterprise.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-sans font-semibold text-secondary flex items-center gap-1.5 border border-surface-container-highest transition-colors shadow-sm self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-base">
                {theme === 'dark' ? 'dark_mode' : theme === 'botanical-light' ? 'eco' : 'wb_sunny'}
              </span>
              <span>
                Cycle Theme (
                {theme === 'dark'
                  ? 'Original Dark'
                  : theme === 'botanical-light'
                  ? 'Botanical Ivory PPT'
                  : theme === 'claymorphic'
                  ? 'Claymorphic 3D'
                  : theme === 'glassmorphic'
                  ? 'Galactic Glass'
                  : 'Monochrome Light'}
                )
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 pt-1">
            {/* Theme 1: Botanical Ivory (Pitch Deck Theme) */}
            <div
              onClick={() => setTheme('botanical-light')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-3 ${
                theme === 'botanical-light'
                  ? 'bg-surface-container border-primary shadow-md ring-2 ring-primary/40'
                  : 'bg-surface-container/60 border-outline-variant hover:border-outline opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">eco</span>
                  <span className="font-sans text-xs font-semibold text-on-surface">
                    Botanical Ivory (PPT)
                  </span>
                </div>
                {theme === 'botanical-light' && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-mono text-[10px] font-bold uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                Warm ivory canvas (#F7FAF7), pure white cards, deep pine text (#132E20), soft sage pills, and golden amber (#C9862B).
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F7FAF7] border border-[#E0E9DF]" title="Warm Ivory Canvas"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border border-[#E0E9DF]" title="Pure White Surface"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#132E20]" title="Deep Pine Text"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#DDEBDD]" title="Soft Sage Pill"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#C9862B]" title="Warm Golden Amber"></span>
              </div>
            </div>

            {/* Theme 2: Neo-Tactile Soft UI (Pivora Kit) */}
            <div
              onClick={() => setTheme('claymorphic')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-3 ${
                theme === 'claymorphic'
                  ? 'bg-surface-container border-[#0E332E] shadow-md ring-2 ring-[#0E332E]/40'
                  : 'bg-surface-container/60 border-outline-variant hover:border-outline opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0E332E] text-lg">view_in_ar</span>
                  <span className="font-sans text-xs font-semibold text-on-surface">
                    Neo-Tactile Soft UI
                  </span>
                </div>
                {theme === 'claymorphic' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#0E332E] text-white font-mono text-[10px] font-bold uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                Pivora design system: Calm sand (#EFE8DE), deep pine 'Submit Now' teal (#0E332E), raised cream buttons, and inset wells.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EFE8DE] border border-[#DFD5C6]" title="Calm Sand Canvas"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FAF6F0] border border-[#DFD5C6]" title="Raised Cream Layer"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#0E332E]" title="Deep Pine Teal Button"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#E8E0D4]" title="Sunken Inset Well"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#DE8553]" title="Terracotta Accent"></span>
              </div>
            </div>

            {/* Theme 3: Galactic Glass (Dark Glassmorphism - Pinterest Reference) */}
            <div
              onClick={() => setTheme('glassmorphic')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-3 ${
                theme === 'glassmorphic'
                  ? 'bg-surface-container border-[#34D399] shadow-md ring-2 ring-[#34D399]/40'
                  : 'bg-surface-container/60 border-outline-variant hover:border-outline opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#34D399] text-lg">blur_on</span>
                  <span className="font-sans text-xs font-semibold text-on-surface">
                    Galactic Glass
                  </span>
                </div>
                {theme === 'glassmorphic' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#34D399] text-[#051A11] font-mono text-[10px] font-bold uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                Obsidian deep space void (#0B1310), frosted smoky emerald glass, neon mint (#34D399) & topaz glow.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#0B1310] border border-[#34D399]/30" title="Obsidian Void"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[rgba(16,29,23,0.8)] border border-[#34D399]/40" title="Smoky Glass"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#34D399]" title="Neon Mint"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FBBF24]" title="Topaz Amber"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#2DD4BF]" title="Aqua Jade"></span>
              </div>
            </div>

            {/* Theme 3: Original Botanical Dark */}
            <div
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-3 ${
                theme === 'dark'
                  ? 'bg-surface-container border-primary shadow-md ring-2 ring-primary/40'
                  : 'bg-surface-container/60 border-outline-variant hover:border-outline opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">spa</span>
                  <span className="font-sans text-xs font-semibold text-on-surface">
                    Botanical Dark (Original)
                  </span>
                </div>
                {theme === 'dark' && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-mono text-[10px] font-bold uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                Deep forest green (#0A100D), sage accents (#B3CEB2), warm golden amber (#F2BD79), and parchment typography.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-4 h-4 rounded-full bg-[#0A100D] border border-[#23332A]" title="Deep Forest Background"></span>
                <span className="w-4 h-4 rounded-full bg-[#14211B]" title="Conservatory Container"></span>
                <span className="w-4 h-4 rounded-full bg-[#B3CEB2]" title="Sage Green Primary"></span>
                <span className="w-4 h-4 rounded-full bg-[#F2BD79]" title="Warm Amber Accent"></span>
              </div>
            </div>

            {/* Theme 4: Monochrome Enterprise Light */}
            <div
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-3 ${
                theme === 'light'
                  ? 'bg-surface-container border-on-surface shadow-md ring-2 ring-on-surface/30'
                  : 'bg-surface-container/60 border-outline-variant hover:border-outline opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface text-lg">wb_sunny</span>
                  <span className="font-sans text-xs font-semibold text-on-surface">
                    Monochrome Enterprise
                  </span>
                </div>
                {theme === 'light' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#050505] text-white font-mono text-[10px] font-bold uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                High-contrast luxury SaaS (#F1F1F1), pure white cards (#FFFFFF), dark panels, and jet-black buttons (#050505).
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-4 h-4 rounded-full bg-[#F1F1F1] border border-[#E2E2E2]" title="Canvas"></span>
                <span className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#E2E2E2]" title="Main Surface"></span>
                <span className="w-4 h-4 rounded-full bg-[#080808]" title="Dark Panels"></span>
                <span className="w-4 h-4 rounded-full bg-[#050505]" title="Primary Buttons"></span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Pivora Neo-Tactile Soft UI Component Studio (Pinterest Board)
           ───────────────────────────────────────────────────────────── */}
        <div className="clay-card p-6 sm:p-8 rounded-3xl bg-surface-container border border-outline-variant/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0E332E] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xl">view_in_ar</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl text-on-surface">
                    Neo-Tactile Soft UI Design Kit
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#0E332E]/10 text-[#0E332E] font-mono text-[9px] font-bold uppercase border border-[#0E332E]/20">
                    PIVORA KIT
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant">
                  Live interactive implementation of the Pinterest Neo-Tactile style guide & component baseline grid.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTheme('claymorphic')}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-medium self-start sm:self-auto shadow-sm"
            >
              Apply Theme Globally
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Controls & Action States */}
            <div className="space-y-4 p-4 rounded-2xl bg-surface-container-high/40 border border-outline-variant/40">
              <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                01. Controls & Buttons
              </div>

              {/* Primary 'Submit Now' / Pressed 'Sending...' */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Primary Button (Click to test pressed state):
                </span>
                <button
                  type="button"
                  onClick={handleSimulateSubmit}
                  className="w-full py-3 px-4 rounded-xl neo-tactile-btn-primary font-sans text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Now</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>

              {/* Raised Secondary Button */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Raised Layer Button:
                </span>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl neo-tactile-btn-secondary font-sans text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Base Layer (Raised)</span>
                </button>
              </div>

              {/* Checkbox & Switch Controls */}
              <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Tactile Checkbox:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tactileCheckbox}
                      onChange={(e) => setTactileCheckbox(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#0E332E] cursor-pointer"
                    />
                    <span className="text-xs text-on-surface font-medium">Option 1</span>
                  </label>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Tactile Switch:</span>
                  <button
                    type="button"
                    onClick={() => setTactileSwitch(!tactileSwitch)}
                    className={`w-12 h-6 rounded-full transition-all relative p-0.5 ${
                      tactileSwitch ? 'bg-[#0E332E]' : 'bg-[#E4DCD0]'
                    }`}
                    style={{
                      boxShadow: tactileSwitch
                        ? 'inset 1px 1px 3px rgba(0,0,0,0.4)'
                        : 'inset 2px 2px 4px rgba(120,95,70,0.2), inset -1px -1px 2px #FFFFFF',
                    }}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-all ${
                        tactileSwitch ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Slider:</span>
                    <span className="font-mono text-[10px] font-bold text-[#0E332E]">
                      {tactileSlider}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tactileSlider}
                    onChange={(e) => setTactileSlider(Number(e.target.value))}
                    className="w-full accent-[#0E332E] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Inset Wells & Navigation */}
            <div className="space-y-4 p-4 rounded-2xl bg-surface-container-high/40 border border-outline-variant/40">
              <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                02. Inset Wells & Navigation
              </div>

              {/* Inset Textfield */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Textfield (Inset Well):
                </span>
                <input
                  type="text"
                  placeholder="Email Address (e.g. curator@conservatory.io)"
                  value={tactileEmail}
                  onChange={(e) => setTactileEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl neo-tactile-well placeholder:text-on-surface-variant/60"
                />
              </div>

              {/* Segmented Tabs */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Navigation Tabs (Capsule Track):
                </span>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl neo-tactile-tabs text-[11px]">
                  {(['overview', 'details', 'settings'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTactileTab(tab)}
                      className={`py-1.5 px-2 rounded-xl capitalize transition-all ${
                        activeTactileTab === tab
                          ? 'neo-tactile-tab-active shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badges & Micro Pills */}
              <div className="space-y-1.5 pt-2 border-t border-outline-variant/40">
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Data Display Badges:
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full neo-tactile-badge font-mono text-[10px] font-bold text-on-surface">
                    New
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#0E332E] text-white font-mono text-[10px] font-bold shadow-sm">
                    Beta
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#DE8553]/15 text-[#873C13] border border-[#DE8553]/30 font-mono text-[10px] font-bold">
                    74 Salvaged
                  </span>
                </div>
              </div>

              {/* Breadcrumb Preview */}
              <div className="pt-2 text-xs font-sans text-on-surface-variant flex items-center gap-1.5">
                <span>Vault</span>
                <span>/</span>
                <span className="text-on-surface font-semibold">Specimen #0841</span>
                <span>/</span>
                <span className="text-[#0E332E] font-medium">Autopsy</span>
              </div>
            </div>

            {/* Column 3: Foundations & Elevation Levels */}
            <div className="space-y-4 p-4 rounded-2xl bg-surface-container-high/40 border border-outline-variant/40">
              <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                03. Elevation & Feedback
              </div>

              {/* Elevation Layers */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-center">
                <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/40 flex flex-col items-center justify-center">
                  <span className="font-bold">BASE LAYER</span>
                  <span className="text-on-surface-variant text-[9px]">Flat 0px</span>
                </div>
                <div className="p-3 rounded-xl neo-tactile-card flex flex-col items-center justify-center">
                  <span className="font-bold text-[#0E332E]">RAISED LAYER</span>
                  <span className="text-on-surface-variant text-[9px]">Elevated 3D</span>
                </div>
              </div>

              {/* Feedback Confirmation Snippet */}
              <div className="p-3 rounded-2xl bg-surface-container border border-outline-variant/50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">warning</span>
                  <span className="text-xs font-semibold text-on-surface">Confirm Graft Sprint?</span>
                </div>
                <p className="text-[10px] text-on-surface-variant">
                  Cross-pollinate selected AST modules into fresh repository branch.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-lg neo-tactile-btn-secondary text-[10px] font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-lg neo-tactile-btn-primary text-[10px] font-bold"
                  >
                    Proceed
                  </button>
                </div>
              </div>

              {/* Toast Pill */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0E332E]/10 border border-[#0E332E]/30 text-xs text-[#0E332E] font-medium">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Success: Specimen cleansed & vaulted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conservatory Routine Settings */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-high/50 space-y-4">
          <h2 className="font-serif text-xl text-on-surface">Conservatory Automation</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container/60">
              <div>
                <span className="font-sans text-xs font-semibold text-on-surface block">
                  Automatic Salvage Extraction
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant">
                  Automatically parse AST exports from buried repos into the Salvage Yard.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoIndexSalvage}
                onChange={(e) => setAutoIndexSalvage(e.target.checked)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container/60">
              <div>
                <span className="font-sans text-xs font-semibold text-on-surface block">
                  Today's Whisper Discovery Cadence
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant">
                  How often the herbarium unearths a high-viability dormant specimen.
                </span>
              </div>
              <select
                value={whisperFrequency}
                onChange={(e) => setWhisperFrequency(e.target.value)}
                className="bg-surface-container-high text-xs text-on-surface px-3 py-1.5 rounded border border-surface-container-highest"
              >
                <option value="daily">Every morning</option>
                <option value="weekly">Weekly Sunday Folio</option>
                <option value="quiet">Quiet contemplation (manual only)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container/60">
              <div>
                <span className="font-sans text-xs font-semibold text-on-surface block">
                  Botanical Ambient Tone Generator
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant">
                  Enable procedural synth audio nodes in the Salvage Yard player.
                </span>
              </div>
              <input
                type="checkbox"
                checked={ambientSounds}
                onChange={(e) => setAmbientSounds(e.target.checked)}
                className="w-4 h-4 accent-secondary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Vault Backup & Export */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-high/50 space-y-3">
          <h2 className="font-serif text-xl text-on-surface">Deep Soil Vault Backup</h2>
          <p className="font-sans text-xs text-on-surface-variant">
            Export a full JSON archive containing all {specimens.length} project memorials, custom autopsies, and
            salvaged snippet records.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportVaultJson}
              className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-sans font-semibold border border-surface-container-highest transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm text-secondary">download</span>
              <span>Export Full Vault JSON</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-sans font-semibold transition-colors shadow-sm"
            >
              Save Preferences
            </button>
            {showSavedToast && (
              <span className="text-secondary font-mono text-xs animate-in fade-in">
                ✓ Preferences updated
              </span>
            )}
          </div>
          {backupToast && (
            <div className="p-2.5 rounded bg-primary-container/20 border border-primary/30 text-primary font-mono text-xs animate-in fade-in">
              {backupToast}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
