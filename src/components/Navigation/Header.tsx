import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenNewProject?: () => void;
  unreadNotificationsCount?: number;
  currentUser?: { name: string; email: string; role: string; avatar: string };
  onLogout?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenMobileMenu,
  onOpenNewProject,
  unreadNotificationsCount = 2,
  currentUser,
  onLogout,
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 right-0 h-18 bg-surface-container-low/90 backdrop-blur-2xl z-40 border-b border-outline-variant/60 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'left-0' : 'left-0 lg:left-64 xl:left-68'
      }`}
    >
      <div className="h-18 w-full px-4 lg:px-7 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger, Desktop Fullscreen/Nav toggle & Search bar */}
        <div className="flex items-center gap-2.5 flex-1 max-w-lg">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Desktop Full-Screen Zen Mode Toggle */}
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              title={
                isSidebarCollapsed
                  ? 'Restore Navigation Sidebar'
                  : 'Full Screen Mode: Slide Navigation Away'
              }
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface border border-outline-variant/70 hover:border-primary/60 transition-all font-sans text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-primary">
                {isSidebarCollapsed ? 'menu_open' : 'fullscreen'}
              </span>
              <span>{isSidebarCollapsed ? 'Show Nav' : 'Full Screen'}</span>
            </button>
          )}

          <div
            className="relative w-full cursor-pointer group"
            onClick={onOpenSearch}
          >
            <div className="w-full bg-surface-container-high/70 hover:bg-surface-container text-on-surface rounded-full flex items-center px-4 py-2 border border-outline-variant/70 shadow-sm transition-all group-hover:border-primary/40">
              <span className="material-symbols-outlined text-on-surface-variant text-lg mr-2.5">
                search
              </span>
              <span className="text-on-surface-variant/80 text-xs font-sans flex-1 truncate">
                Search dormant vaults, modules...
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] text-on-surface-variant bg-surface-container-lowest rounded-md font-mono border border-outline-variant">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Center / Right widgets matching AI Studio screenshot */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Action Pill Button: + Add / New Project */}
          <button
            type="button"
            onClick={onOpenNewProject || (() => onNavigate('bury-a-project'))}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/15 hover:bg-secondary/25 text-on-surface border border-secondary/35 hover:border-secondary/60 transition-all font-sans text-xs font-semibold shadow-xs cursor-pointer"
            title="Add New Project (Import from GitHub or Inscribe)"
          >
            <span className="material-symbols-outlined text-sm text-secondary">add_circle</span>
            <span className="tracking-tight text-on-surface font-semibold">+ Add / New Project</span>
          </button>

          {/* Theme Switcher Button & Dropdown Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-surface-container text-on-surface flex items-center justify-center border border-outline-variant/70 shadow-sm transition-all hover:scale-105 relative"
              title="Change Ambience Theme (Click to open menu)"
              aria-label={`Current theme: ${theme}. Click to choose theme.`}
            >
              <span
                className={`material-symbols-outlined text-[19px] ${
                  theme === 'dark'
                    ? 'text-secondary'
                    : theme === 'botanical-light'
                    ? 'text-primary'
                    : theme === 'claymorphic'
                    ? 'text-[#DE8553]'
                    : theme === 'glassmorphic'
                    ? 'text-[#34D399]'
                    : 'text-on-surface'
                }`}
              >
                {theme === 'dark'
                  ? 'dark_mode'
                  : theme === 'botanical-light'
                  ? 'eco'
                  : theme === 'claymorphic'
                  ? 'view_in_ar'
                  : theme === 'glassmorphic'
                  ? 'blur_on'
                  : 'wb_sunny'}
              </span>
            </button>

            {/* Theme Selection Popover Menu */}
            {showThemeMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemeMenu(false)}
                />
                <div className="absolute right-0 top-12 w-80 rounded-3xl glass-panel shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 border border-outline-variant/80">
                  <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-outline-variant/50 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-secondary">palette</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-on-surface">
                        Select Ambience Theme
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        setShowThemeMenu(false);
                      }}
                      className="text-[10px] font-mono text-primary hover:underline"
                    >
                      Cycle Next →
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {/* Option 1: Botanical Ivory (PPT Deck) */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('botanical-light');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                        theme === 'botanical-light'
                          ? 'bg-primary-container text-on-primary-container shadow-sm border border-outline-variant/70'
                          : 'hover:bg-surface-container-high/70 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#DDEBDD] text-[#144227] flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="material-symbols-outlined text-base">eco</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold leading-tight">Botanical Ivory</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60">
                              PPT DECK
                            </span>
                          </div>
                          <p className="font-sans text-[10px] opacity-80 mt-0.5 leading-snug">
                            Ivory canvas, deep pine text & warm golden amber
                          </p>
                        </div>
                      </div>
                      <div className="pl-2">
                        {theme === 'botanical-light' ? (
                          <div className="w-5 h-5 rounded-full bg-[#1E5E3A] text-white flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-outline-variant/80" />
                        )}
                      </div>
                    </button>

                    {/* Option 2: Claymorphic 3D (Pinterest Edition) */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('claymorphic');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                        theme === 'claymorphic'
                          ? 'bg-primary-container text-on-primary-container shadow-sm border border-outline-variant/70'
                          : 'hover:bg-surface-container-high/70 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#D6E8DE] text-[#0E332E] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#0E332E]/20">
                          <span className="material-symbols-outlined text-base">view_in_ar</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold leading-tight">Neo-Tactile Soft UI</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60">
                              PIVORA KIT
                            </span>
                          </div>
                          <p className="font-sans text-[10px] opacity-80 mt-0.5 leading-snug">
                            Calm sand (#EFE8DE), deep pine teal buttons & sunken wells
                          </p>
                        </div>
                      </div>
                      <div className="pl-2">
                        {theme === 'claymorphic' ? (
                          <div className="w-5 h-5 rounded-full bg-[#0E332E] text-white flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-outline-variant/80" />
                        )}
                      </div>
                    </button>

                    {/* Option 3: Galactic Glass (Dark Glassmorphism - Pinterest Reference) */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('glassmorphic');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                        theme === 'glassmorphic'
                          ? 'bg-primary-container text-on-primary-container shadow-sm border border-outline-variant/70'
                          : 'hover:bg-surface-container-high/70 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[rgba(52,211,153,0.18)] text-[#34D399] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#34D399]/30">
                          <span className="material-symbols-outlined text-base">blur_on</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold leading-tight">Galactic Glass</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60">
                              DARK GLASS
                            </span>
                          </div>
                          <p className="font-sans text-[10px] opacity-80 mt-0.5 leading-snug">
                            Obsidian void, frosted smoky emerald glass & neon mint
                          </p>
                        </div>
                      </div>
                      <div className="pl-2">
                        {theme === 'glassmorphic' ? (
                          <div className="w-5 h-5 rounded-full bg-[#34D399] text-[#051A11] flex items-center justify-center shadow-sm font-bold">
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-outline-variant/80" />
                        )}
                      </div>
                    </button>

                    {/* Option 4: Botanical Dark (Original Conservatory) */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('dark');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                        theme === 'dark'
                          ? 'bg-primary-container text-on-primary-container shadow-sm border border-outline-variant/70'
                          : 'hover:bg-surface-container-high/70 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#23382B] text-[#D3E8D2] flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="material-symbols-outlined text-base">dark_mode</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold leading-tight">Botanical Dark</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60">
                              ORIGINAL
                            </span>
                          </div>
                          <p className="font-sans text-[10px] opacity-80 mt-0.5 leading-snug">
                            Midnight forest depths (#0A100D), sage & golden glow
                          </p>
                        </div>
                      </div>
                      <div className="pl-2">
                        {theme === 'dark' ? (
                          <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-outline-variant/80" />
                        )}
                      </div>
                    </button>

                    {/* Option 4: Monochrome Enterprise Light */}
                    <button
                      type="button"
                      onClick={() => {
                        setTheme('light');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                        theme === 'light'
                          ? 'bg-primary-container text-on-primary-container shadow-sm border border-outline-variant/70'
                          : 'hover:bg-surface-container-high/70 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="material-symbols-outlined text-base">wb_sunny</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-xs font-bold leading-tight">Monochrome SaaS</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60">
                              MINIMAL
                            </span>
                          </div>
                          <p className="font-sans text-[10px] opacity-80 mt-0.5 leading-snug">
                            High-contrast luxury enterprise black & white
                          </p>
                        </div>
                      </div>
                      <div className="pl-2">
                        {theme === 'light' ? (
                          <div className="w-5 h-5 rounded-full bg-[#050505] text-white flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-xs">check</span>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-outline-variant/80" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications Circular Button with +9 Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-surface-container text-on-surface flex items-center justify-center border border-outline-variant/70 shadow-sm transition-all relative"
              title="Conservatory Alerts"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-secondary text-on-secondary light:bg-[#050505] light:text-white text-[9px] font-bold flex items-center justify-center border border-surface shadow-sm">
                  +9
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-surface-container p-4 shadow-2xl border border-outline-variant text-xs z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/70 mb-3">
                  <span className="font-semibold text-on-surface uppercase tracking-wider font-mono text-[11px]">
                    Conservatory Notifications
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      onNavigate('revival-compass');
                      setShowNotifications(false);
                    }}
                    className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-on-surface font-sans">SymphonyTab</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">Yesterday</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed">
                      Revival Compass scored this at <strong className="text-on-surface font-semibold">92/100 viability</strong>.
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      onNavigate('salvage-yard');
                      setShowNotifications(false);
                    }}
                    className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-on-surface font-sans">Salvage Harvest</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">2 hrs ago</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] leading-relaxed">
                      OAuth2 token exchange module indexed and packaged for clean grafting.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Sign Out */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/60">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-primary/40 shadow-sm"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-sans text-xs font-semibold text-on-surface leading-tight">
                  {currentUser.name}
                </span>
                <span className="font-mono text-[9px] text-on-surface-variant -mt-0.5">
                  {currentUser.role}
                </span>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-8 h-8 rounded-full bg-surface-container-high/60 hover:bg-error-container/30 text-on-surface-variant hover:text-error flex items-center justify-center transition-colors"
                  title="Sign Out of Conservatory"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
