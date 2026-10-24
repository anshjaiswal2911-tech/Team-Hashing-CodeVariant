import React from 'react';
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
    { id: 'overview' as ScreenId, label: 'Overview / Cemetery', icon: 'grid_view' },
    { id: 'bury-a-project' as ScreenId, label: '+ Add / New Project', icon: 'add_circle_outline' },
    { id: 'revival-compass' as ScreenId, label: 'Revival Compass', icon: 'explore' },
    { id: 'salvage-yard' as ScreenId, label: 'Salvage Yard', icon: 'inventory_2' },
    { id: 'graft-studio' as ScreenId, label: 'Graft Studio', icon: 'hub' },
    { id: 'pattern-insights' as ScreenId, label: 'Pattern Insights', icon: 'bar_chart' },
    { id: 'archive' as ScreenId, label: 'Archive', icon: 'folder_open' },
    { id: 'settings' as ScreenId, label: 'Settings', icon: 'settings' },
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
        className={`fixed left-0 top-0 h-full w-64 lg:w-68 bg-surface-container-low/95 backdrop-blur-2xl z-50 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)] border-r border-outline-variant/60 transition-transform duration-300 ease-in-out ${
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
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                onNavigate('overview');
                onCloseMobile?.();
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center text-lg">
                <span className="material-symbols-outlined text-xl text-secondary">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[17px] font-normal text-on-surface">
                  Project Graveyard
                </span>
                <span className="font-sans text-[10px] text-on-surface-variant italic -mt-0.5">
                  Not dead. Just waiting for another beginning.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Desktop slide away / collapse button */}
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title="Slide Left Navigation Away (Full Screen Mode)"
                  className="hidden lg:flex p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">keyboard_double_arrow_left</span>
                </button>
              )}

              {/* Mobile close button */}
              <button
                className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface"
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-2">
            <div className="h-px w-full bg-outline-variant/30" />
          </div>

          {/* Navigation Items with sleek pills matching reference */}
          <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full text-left flex items-center gap-3.5 px-4 py-2.5 rounded-full text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-medium shadow-sm translate-x-0.5 border border-outline-variant/60'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/80 font-normal'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[19px] ${
                      isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Section matching reference */}
        <div className="p-4 border-t border-outline-variant/40">
          <div className="p-2.5 rounded-full bg-surface-container-high/50 mb-3 flex items-center justify-between border border-outline-variant/30 px-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                {restingCount} Resting • {revivedCount} Revived
              </span>
            </div>
            <span className="material-symbols-outlined text-secondary text-xs">spa</span>
          </div>

          <div
            className="flex items-center justify-between p-2 rounded-2xl hover:bg-surface-container-high/70 transition-colors cursor-pointer group"
            onClick={() => onNavigate('settings')}
          >
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
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
            </div>

            {onLogout ? (
              <button
                type="button"
                onClick={onLogout}
                className="p-1 rounded-lg text-on-surface-variant hover:text-error hover:bg-surface-container-highest transition-colors"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-base">logout</span>
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
