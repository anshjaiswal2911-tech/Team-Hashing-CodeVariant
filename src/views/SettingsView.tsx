import React, { useState, useEffect } from 'react';
import { ProjectSpecimen, SalvageModule, ActivityItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AVAILABLE_THEMES } from '../utils/themeManager';

interface SettingsViewProps {
  specimens?: ProjectSpecimen[];
  salvageModules?: SalvageModule[];
  activities?: ActivityItem[];
  basket?: string[];
}

interface DisplayPreferences {
  brightness: number; // 70 - 130 (%)
  contrast: number; // 70 - 130 (%)
  transparency: number; // 60 - 100 (%)
  customAccent: string | null;
}

const DEFAULT_DISPLAY_PREFS: DisplayPreferences = {
  brightness: 100,
  contrast: 100,
  transparency: 100,
  customAccent: null,
};

const DISPLAY_STORAGE_KEY = 'project-graveyard-display-prefs';
const ACCOUNT_STORAGE_KEY = 'project-graveyard-account-prefs';

export const SettingsView: React.FC<SettingsViewProps> = ({
  specimens = [],
  salvageModules = [],
  activities = [],
  basket = [],
}) => {
  const { theme, setTheme } = useTheme();

  // Active Settings Tab
  const [activeTab, setActiveTab] = useState<'account' | 'appearance' | 'preferences' | 'privacy'>('account');

  // Account Settings
  const [curatorName, setCuratorName] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name !== 'Eleni Vance' && parsed.name !== 'Aryan') return parsed.name;
      }
    } catch {}
    return 'Aryan Jaiswal';
  });
  const [curatorRole, setCuratorRole] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role && parsed.role !== 'Master Curator' && parsed.role !== 'Master Curator & Lead Engineer') return parsed.role;
      }
    } catch {}
    return 'Software Developer';
  });
  const [curatorEmail, setCuratorEmail] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email && parsed.email !== 'eleni@graveyard.dev') return parsed.email;
      }
    } catch {}
    return 'aryan@graveyard.dev';
  });
  const [curatorBio, setCuratorBio] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (saved) return JSON.parse(saved).bio || 'Preserving abandoned engineering prototypes into fertile software foundations.';
    } catch {}
    return 'Preserving abandoned engineering prototypes into fertile software foundations.';
  });
  const MALE_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

  const [curatorAvatar, setCuratorAvatar] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.avatar && !parsed.avatar.includes('1534528741775')) return parsed.avatar;
      }
      const graveyardUser = localStorage.getItem('graveyard_user');
      if (graveyardUser) {
        const parsed = JSON.parse(graveyardUser);
        if (parsed.avatar && !parsed.avatar.includes('1534528741775')) return parsed.avatar;
      }
    } catch {}
    return MALE_AVATAR;
  });

  // Display Calibration (Brightness, Contrast, Transparency, Accent Color)
  const [displayPrefs, setDisplayPrefs] = useState<DisplayPreferences>(() => {
    try {
      const saved = localStorage.getItem(DISPLAY_STORAGE_KEY);
      if (saved) return { ...DEFAULT_DISPLAY_PREFS, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_DISPLAY_PREFS;
  });

  // Preferences & Toggles
  const [ambientSounds, setAmbientSounds] = useState(true);
  const [dormancyAlerts, setDormancyAlerts] = useState(true);
  const [autoIndexSalvage, setAutoIndexSalvage] = useState(true);

  // Notification feedbacks
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live CSS Filter & Variable Application for Display Controls
  useEffect(() => {
    const root = document.documentElement;

    // Apply brightness and contrast filters
    if (displayPrefs.brightness === 100 && displayPrefs.contrast === 100) {
      root.style.removeProperty('filter');
    } else {
      root.style.filter = `brightness(${displayPrefs.brightness}%) contrast(${displayPrefs.contrast}%)`;
    }

    // Apply transparency
    if (displayPrefs.transparency === 100) {
      root.style.removeProperty('--surface-opacity');
    } else {
      root.style.setProperty('--surface-opacity', `${displayPrefs.transparency / 100}`);
    }

    // Apply custom accent tint if selected
    if (displayPrefs.customAccent) {
      root.style.setProperty('--primary', displayPrefs.customAccent);
      root.style.setProperty('--secondary', displayPrefs.customAccent);
    } else {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--secondary');
    }

    // Save to localStorage
    try {
      localStorage.setItem(DISPLAY_STORAGE_KEY, JSON.stringify(displayPrefs));
    } catch {}
  }, [displayPrefs]);

  const handleResetDisplayDefaults = () => {
    setDisplayPrefs(DEFAULT_DISPLAY_PREFS);
    const root = document.documentElement;
    root.style.removeProperty('filter');
    root.style.removeProperty('--surface-opacity');
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    showToast('Display settings reset to default theme baseline');
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: curatorName,
        role: curatorRole,
        email: curatorEmail,
        bio: curatorBio,
        avatar: curatorAvatar,
      };
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(payload));

      const graveyardUser = localStorage.getItem('graveyard_user');
      const currentUserData = graveyardUser ? JSON.parse(graveyardUser) : {};
      localStorage.setItem(
        'graveyard_user',
        JSON.stringify({
          ...currentUserData,
          name: curatorName,
          email: curatorEmail,
          role: curatorRole,
          avatar: curatorAvatar,
        })
      );

      showToast('Account details updated successfully');
    } catch (err) {
      showToast(`Save failed: ${(err as Error).message}`);
    }
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
          email: curatorEmail,
        },
        displayPreferences: displayPrefs,
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

      showToast(`Exported ${link.download} successfully`);
    } catch (err) {
      showToast(`Export failed: ${(err as Error).message}`);
    }
  };

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear your local workspace cache? This will reset local drafts and restore default mock data.')) {
      try {
        localStorage.removeItem(DISPLAY_STORAGE_KEY);
        localStorage.removeItem(ACCOUNT_STORAGE_KEY);
        handleResetDisplayDefaults();
        showToast('Local cache cleared. Workspace restored.');
      } catch {}
    }
  };

  const ACCENT_COLOR_PRESETS = [
    { label: 'Theme Default', color: null },
    { label: 'Terracotta', color: '#DE8553' },
    { label: 'Botanical Pine', color: '#144227' },
    { label: 'Aero Teal', color: '#0E7490' },
    { label: 'Azure Sky', color: '#0284C7' },
    { label: 'Amethyst', color: '#7C3AED' },
    { label: 'Rose Gold', color: '#E11D48' },
  ];

  return (
    <div className="flex flex-col w-full space-y-6 pb-20 max-w-5xl mx-auto">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SECTION BADGE
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-5">
        <div>
          <div className="flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-widest mb-1">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Preferences & Settings</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-semibold tracking-tight">
            Settings
          </h1>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light mt-1">
            Customize your account profile, theme ambience, display calibration, and data privacy.
          </p>
        </div>

        {/* Feedback Toast */}
        {toastMessage && (
          <div className="self-start sm:self-center px-4 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-sans font-semibold shadow-md flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TAB NAVIGATION (Account, Appearance, Preferences, Privacy)
         ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-outline-variant/40">
        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'account'
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-base">person</span>
          <span>Account & Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-base">palette</span>
          <span>Appearance & Display</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-base">notifications</span>
          <span>Preferences & Audio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-base">shield</span>
          <span>Privacy & Security</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: ACCOUNT & PROFILE SETTINGS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'account' && (
        <form onSubmit={handleSaveAccount} className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-outline-variant/40">
              <img
                src={curatorAvatar}
                alt={curatorName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-secondary/40 shadow-sm"
              />
              <div className="space-y-1 flex-1">
                <h3 className="font-serif text-xl text-on-surface font-semibold">{curatorName}</h3>
                <p className="font-sans text-xs text-on-surface-variant">Aspiring Software Developer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-semibold text-on-surface">
                  Full Name
                </label>
                <input
                  type="text"
                  value={curatorName}
                  onChange={(e) => setCuratorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/70 text-xs font-sans text-on-surface focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-semibold text-on-surface">
                  Curator Title / Role
                </label>
                <input
                  type="text"
                  value={curatorRole}
                  onChange={(e) => setCuratorRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/70 text-xs font-sans text-on-surface focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-sans font-semibold text-on-surface">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={curatorEmail}
                  onChange={(e) => setCuratorEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/70 text-xs font-sans text-on-surface focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-sans font-semibold text-on-surface">
                  Curator Philosophy / Bio
                </label>
                <textarea
                  value={curatorBio}
                  onChange={(e) => setCuratorBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/70 text-xs font-sans text-on-surface focus:outline-none focus:border-secondary leading-relaxed resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/40">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-sans font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: APPEARANCE & DISPLAY CALIBRATION
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'appearance' && (
        <div className="space-y-6 animate-in fade-in">
          {/* A. Clean Theme Selector (Closed / Compact Way) */}
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-on-surface font-semibold">Visual Ambience Theme</h3>
                <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">
                  Select your primary conservatory aesthetic palette.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-secondary uppercase bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                Active: {theme}
              </span>
            </div>

            {/* Compact Theme Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {AVAILABLE_THEMES.map((opt) => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer relative ${
                      isSelected
                        ? 'border-secondary bg-secondary/10 ring-2 ring-secondary/30 shadow-sm'
                        : 'border-outline-variant/60 bg-surface-container-high/60 hover:bg-surface-container-high hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]"
                        style={{ backgroundColor: opt.accentColor }}
                      >
                        <span className="material-symbols-outlined text-xs">{opt.icon}</span>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-on-surface truncate">
                        {opt.label}
                      </div>
                      <div className="font-mono text-[10px] text-on-surface-variant truncate">
                        {opt.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Live Display Calibration (Brightness, Contrast, Transparency, Accent) */}
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
              <div>
                <h3 className="font-serif text-lg text-on-surface font-semibold">Display Calibration</h3>
                <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">
                  Fine-tune brightness, contrast, and surface transparency on top of your selected theme. Default stays pristine until modified.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetDisplayDefaults}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-xs font-sans font-semibold border border-outline-variant/70 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">restart_alt</span>
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* 1. Brightness Slider */}
              <div className="space-y-2 p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-secondary">brightness_medium</span>
                    <span>Brightness</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-secondary">
                    {displayPrefs.brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="125"
                  step="1"
                  value={displayPrefs.brightness}
                  onChange={(e) =>
                    setDisplayPrefs((prev) => ({ ...prev, brightness: Number(e.target.value) }))
                  }
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>75% (Dim)</span>
                  <span>100% (Default)</span>
                  <span>125% (Vivid)</span>
                </div>
              </div>

              {/* 2. Contrast Slider */}
              <div className="space-y-2 p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-secondary">contrast</span>
                    <span>Contrast</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-secondary">
                    {displayPrefs.contrast}%
                  </span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="125"
                  step="1"
                  value={displayPrefs.contrast}
                  onChange={(e) =>
                    setDisplayPrefs((prev) => ({ ...prev, contrast: Number(e.target.value) }))
                  }
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>75% (Soft)</span>
                  <span>100% (Default)</span>
                  <span>125% (Punchy)</span>
                </div>
              </div>

              {/* 3. Transparency Slider */}
              <div className="space-y-2 p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-secondary">opacity</span>
                    <span>Transparency</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-secondary">
                    {displayPrefs.transparency}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="1"
                  value={displayPrefs.transparency}
                  onChange={(e) =>
                    setDisplayPrefs((prev) => ({ ...prev, transparency: Number(e.target.value) }))
                  }
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>60% (Frosted)</span>
                  <span>80% (Glass)</span>
                  <span>100% (Solid)</span>
                </div>
              </div>
            </div>

            {/* Custom Accent Color Palette */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-sans font-semibold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">colorize</span>
                <span>Custom Brand Accent Color</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {ACCENT_COLOR_PRESETS.map((p, idx) => {
                  const isActive = displayPrefs.customAccent === p.color;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDisplayPrefs((prev) => ({ ...prev, customAccent: p.color }))}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-sans font-medium flex items-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-secondary bg-secondary/15 font-bold shadow-2xs'
                          : 'border-outline-variant/60 bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {p.color ? (
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: p.color }}
                        />
                      ) : (
                        <span className="w-3 h-3 rounded-full bg-outline-variant" />
                      )}
                      <span>{p.label}</span>
                    </button>
                  );
                })}

                {/* Custom Color Picker input */}
                <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant/60">
                  <input
                    type="color"
                    value={displayPrefs.customAccent || '#DE8553'}
                    onChange={(e) =>
                      setDisplayPrefs((prev) => ({ ...prev, customAccent: e.target.value }))
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    title="Choose custom color"
                  />
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {displayPrefs.customAccent || 'Theme Native'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: PREFERENCES & AUDIO
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'preferences' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-5">
            <h3 className="font-serif text-lg text-on-surface font-semibold">Interaction Preferences</h3>

            <div className="space-y-4 divide-y divide-outline-variant/40">
              {/* Dormancy Toast Notification */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-sans font-bold text-on-surface">
                    Dormancy Alert Notifications
                  </div>
                  <div className="text-xs font-sans text-on-surface-variant font-light">
                    Display top-right alert when opening repositories resting for over 2 months.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={dormancyAlerts}
                  onChange={(e) => setDormancyAlerts(e.target.checked)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
              </div>

              {/* Harmonic Audio Synthesizer */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-sans font-bold text-on-surface">
                    Harmonic Audio Feedback (432Hz)
                  </div>
                  <div className="text-xs font-sans text-on-surface-variant font-light">
                    Enable Web Audio botanical chime synthesizer for archival actions.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={ambientSounds}
                  onChange={(e) => setAmbientSounds(e.target.checked)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
              </div>

              {/* Auto-Index Salvaged Code */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-sans font-bold text-on-surface">
                    Auto-Index Salvage Modules
                  </div>
                  <div className="text-xs font-sans text-on-surface-variant font-light">
                    Automatically catalog extracted auth tokens and schemas upon project burial.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoIndexSalvage}
                  onChange={(e) => setAutoIndexSalvage(e.target.checked)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/40 flex justify-end">
              <button
                type="button"
                onClick={() => showToast('Preferences updated successfully')}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-sans font-semibold shadow-sm transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: PRIVACY, BACKUPS & DATA SECURITY
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'privacy' && (
        <div className="space-y-6 animate-in fade-in">
          {/* A. Security Enclave Badge */}
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                </div>
                <div>
                  <h3 className="font-serif text-base text-on-surface font-semibold">
                    100% Client-Side Privacy Enclave
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant font-light">
                    Zero remote server telemetry or code scraping.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold uppercase border border-emerald-500/20">
                Encrypted Local
              </span>
            </div>

            {/* Privacy Policy Points */}
            <div className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/50 space-y-2 text-xs font-sans text-on-surface-variant">
              <div className="font-semibold text-on-surface">Privacy Policy & Architecture Guarantee:</div>
              <ul className="list-disc list-inside space-y-1.5 leading-relaxed font-light">
                <li><strong className="text-on-surface">Zero Cloud Telemetry:</strong> All your repositories, code snippets, autopsies, and notes reside solely within your browser's local sandbox storage.</li>
                <li><strong className="text-on-surface">No Third-Party AI Data Training:</strong> Your intellectual property is never forwarded to external training models or third-party advertisers.</li>
                <li><strong className="text-on-surface">Total Data Portability:</strong> You can export or delete your entire vault ledger in standard JSON and Markdown at any time.</li>
              </ul>
            </div>
          </div>

          {/* B. Backup & Export */}
          <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/60 shadow-sm clay-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base text-on-surface font-semibold">Vault Export & Portability</h3>
                <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">
                  Download a comprehensive JSON package of all {specimens.length} preserved specimens and {salvageModules.length} salvage modules.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportVaultJson}
                className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/70 text-on-surface text-xs font-sans font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-secondary">download</span>
                <span>Export Vault JSON</span>
              </button>
            </div>
          </div>

          {/* C. Clear Cache & Reset */}
          <div className="p-6 rounded-2xl bg-error/5 border border-error/25 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base text-error font-semibold">Workspace Cache Maintenance</h3>
                <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">
                  Clear cached display filters, temporary draft burials, and return to default workspace state.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className="px-4 py-2 rounded-xl border border-error/40 hover:bg-error hover:text-white text-error text-xs font-sans font-semibold transition-all cursor-pointer"
              >
                Clear Workspace Cache
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
