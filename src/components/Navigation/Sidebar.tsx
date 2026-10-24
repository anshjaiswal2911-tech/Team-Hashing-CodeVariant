import React from 'react';
import { Archive, LayoutDashboard, Plus, Compass, Package, GitBranch, ChartNoAxesColumn, FolderOpen, Settings, PanelLeftClose, X, LogOut } from 'lucide-react';
import { ScreenId } from '../../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  restingCount: number;
  revivedCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  currentUser?: { name: string; email: string; role: string; avatar: string };
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  restingCount,
  revivedCount,
  isOpenMobile = false,
  onCloseMobile,
  currentUser,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'overview' as ScreenId, label: 'Overview', icon: LayoutDashboard },
    { id: 'bury-a-project' as ScreenId, label: 'Bury a Project', icon: Plus },
    { id: 'revival-compass' as ScreenId, label: 'Revival Compass', icon: Compass },
    { id: 'salvage-yard' as ScreenId, label: 'Salvage Yard', icon: Package },
    { id: 'graft-studio' as ScreenId, label: 'Graft Studio', icon: GitBranch },
    { id: 'pattern-insights' as ScreenId, label: 'Pattern Insights', icon: ChartNoAxesColumn },
    { id: 'archive' as ScreenId, label: 'Archive', icon: FolderOpen },
    { id: 'settings' as ScreenId, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-68 bg-surface-container-low/95 backdrop-blur-2xl z-50 flex flex-col justify-between  border-r border-outline-variant/60 transition-transform duration-300 ease-in-out ${
          isOpenMobile
            ? 'translate-x-0'
            : isCollapsed
            ? '-translate-x-full'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Emblem & Header matching AI Studio reference */}
          <div className="px-6 pt-7 pb-5 flex items-center justify-between">
            <button type="button" className="flex items-center gap-3 text-left cursor-pointer group"
              onClick={() => {
                onNavigate('overview');
                onCloseMobile?.();
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center text-lg">
                <Archive size={20} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[18px] font-normal text-on-surface">
                  Project Graveyard
                </span>
                <span className="font-sans text-[10px] text-on-surface-variant -mt-0.5">
                  Your ideas, preserved.
                </span>
              </div>
            </button>

            <div className="flex items-center gap-1">
              {/* Desktop slide away / collapse button */}
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title="Slide Left Navigation Away (Full Screen Mode)"
                  className="hidden lg:flex p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <PanelLeftClose size={18} aria-hidden="true" />
                </button>
              )}

              {/* Mobile close button */}
              <button
                aria-label="Close navigation" className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface"
                onClick={onCloseMobile}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="px-6 pb-2">
            <div className="h-px w-full bg-outline-variant/30" />
          </div>

          {/* Navigation Items with sleek pills matching reference */}
          <p className="px-7 pt-5 pb-2 editorial-eyebrow">Workspace</p>
          <nav aria-label="Workspace" className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  aria-current={isActive ? 'page' : undefined}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full text-left flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold border border-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/80 font-normal'
                  }`}
                >
                  <item.icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Section matching reference */}
        <div className="p-4 border-t border-outline-variant/40">
          <div className="p-2.5 rounded-xl bg-surface-container-high/50 mb-3 flex items-center justify-between border border-outline-variant/30 px-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-sans text-xs text-on-surface-variant">
                {restingCount} Resting • {revivedCount} Revived
              </span>
            </div>
            <Archive size={15} strokeWidth={1.7} aria-hidden="true" />
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-high/70 transition-colors group">
            <button type="button" className="flex items-center gap-3 min-w-0 text-left flex-1"
              onClick={() => onNavigate('settings')}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant/80 flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans text-xs font-semibold text-on-surface truncate">
                  {currentUser?.name || "Eleni Vance"}
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant truncate">
                  {currentUser?.role || "Master Curator"}
                </span>
              </div>
            </button>

            {onLogout ? (
              <button
                type="button"
                onClick={onLogout}
                className="p-1 rounded-lg text-on-surface-variant hover:text-error hover:bg-surface-container-highest transition-colors"
                title="Sign Out"
              >
                <LogOut size={17} aria-hidden="true" />
              </button>
            ) : (
              <span className="material-symbols-outlined text-on-surface-variant text-base">
                more_horiz
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
