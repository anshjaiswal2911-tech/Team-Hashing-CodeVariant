import React, { useState, useEffect } from 'react';
import { ScreenId, ProjectSpecimen, SalvageModule, ActivityItem } from './types';
import {
  INITIAL_SPECIMENS,
  SALVAGE_MODULES,
  RECENT_ACTIVITIES,
} from './data/mockData';
import { Sidebar } from './components/Navigation/Sidebar';
import { Header } from './components/Navigation/Header';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { MemorialAutopsyModal } from './components/Modals/MemorialAutopsyModal';
import { GraftSprintModal } from './components/Modals/GraftSprintModal';
import { MeetAiAgentModal } from './components/Modals/MeetAiAgentModal';
import { KeyboardShortcutsModal } from './components/Modals/KeyboardShortcutsModal';
import { NewProjectModal } from './components/Modals/NewProjectModal';
import { ProjectAiChatbot } from './components/AiChatbot/ProjectAiChatbot';
import { AssistantLauncher } from './components/AiChatbot/AssistantLauncher';

import { OverviewView } from './views/OverviewView';
import { LandingPageView } from './views/LandingPageView';
import { LoginView, UserProfile } from './views/LoginView';
import { BuryProjectView } from './views/BuryProjectView';
import { SalvageYardView } from './views/SalvageYardView';
import { RevivalCompassView } from './views/RevivalCompassView';
import { GraftStudioView } from './views/GraftStudioView';
import { PatternInsightsView } from './views/PatternInsightsView';
import { ArchiveView } from './views/ArchiveView';
import { SettingsView } from './views/SettingsView';
import { useKeyboardShortcuts } from './hooks';
import { QuickJumpMenu } from './components/Navigation/QuickJumpMenu';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');

  // Authentication State with persistent storage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('graveyard_auth') === 'true';
  });

  // "Meet Our AI Agent" Welcome Showcase Modal (shows upon login with blurred background)
  const [showAgentWelcome, setShowAgentWelcome] = useState<boolean>(() => {
    const isAuth = localStorage.getItem('graveyard_auth') === 'true';
    const hasSeen = sessionStorage.getItem('graveyard_seen_ai_agent') === 'true';
    return isAuth && !hasSeen;
  });

  const handleCloseAgentWelcome = () => {
    setShowAgentWelcome(false);
    sessionStorage.setItem('graveyard_seen_ai_agent', 'true');
  };

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('graveyard_user');
    const savedUser: UserProfile | null = saved ? JSON.parse(saved) : null;
    // Refresh the old demo display name for users who are already signed in.
    if (savedUser?.name === 'Eleni Vance') {
      savedUser.name = 'Aryan';
      localStorage.setItem('graveyard_user', JSON.stringify(savedUser));
    }
    return savedUser
      ? savedUser
      : {
          name: 'Aryan',
          email: 'eleni@graveyard.dev',
          role: 'Master Curator',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        };
  });

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('graveyard_auth', 'true');
    localStorage.setItem('graveyard_user', JSON.stringify(user));
    setCurrentScreen('overview');
    setShowAgentWelcome(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('graveyard_auth');
    sessionStorage.removeItem('graveyard_seen_ai_agent');
    setShowAgentWelcome(false);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe navigation interceptor: protects inner screens from unauthenticated access
  const navigateWithAuth = (targetScreen: ScreenId) => {
    if (targetScreen === 'landing' || targetScreen === 'login') {
      setCurrentScreen(targetScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isAuthenticated) {
      setCurrentScreen('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [specimens, setSpecimens] = useState<ProjectSpecimen[]>(INITIAL_SPECIMENS);
  const [salvageModules, setSalvageModules] = useState<SalvageModule[]>(SALVAGE_MODULES);
  const [activities, setActivities] = useState<ActivityItem[]>(RECENT_ACTIVITIES);

  // Pre-populate with the 3 items shown in screenshot 3 / HTML 3
  const [basket, setBasket] = useState<string[]>(['SPEC-0841', 'SPEC-0109', 'SPEC-0492']);

  // Modals state
  const [autopsySpecimen, setAutopsySpecimen] = useState<ProjectSpecimen | null>(null);
  const [isAutopsyOpen, setIsAutopsyOpen] = useState(false);

  const [revivalSpecimen, setRevivalSpecimen] = useState<ProjectSpecimen | null>(null);
  const [isGraftSprintOpen, setIsGraftSprintOpen] = useState(false);

  // Large AI Forensic Copilot (Right-Side Android Studio / Antigravity Style Tool Window)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatSpecimen, setAiChatSpecimen] = useState<ProjectSpecimen | null>(null);

  const openAiChat = (specimen?: ProjectSpecimen | null) => {
    if (specimen) {
      setAiChatSpecimen(specimen);
    } else if (!aiChatSpecimen && specimens.length > 0) {
      setAiChatSpecimen(specimens[0]);
    }
    setIsAiChatOpen(true);
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Full Screen / Collapsible Left Navigation (Zen Focus Mode)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Keyboard Shortcuts
  useKeyboardShortcuts({
    'meta+k': () => setIsSearchOpen((prev) => !prev),
    'j': () => setIsQuickJumpOpen((prev) => !prev),
    'b': () => setIsNewProjectModalOpen(true),
    'n': () => setIsNewProjectModalOpen(true),
    '?': () => setIsShortcutsOpen((prev) => !prev),
    'Escape': () => {
      setIsSearchOpen(false);
      setIsQuickJumpOpen(false);
      setIsAutopsyOpen(false);
      setIsGraftSprintOpen(false);
      setIsShortcutsOpen(false);
      setIsNewProjectModalOpen(false);
    },
  });

  // Basket actions
  const toggleBasket = (moduleId: string) => {
    if (basket.includes(moduleId)) {
      setBasket(basket.filter((id) => id !== moduleId));
    } else {
      setBasket([...basket, moduleId]);
    }
  };

  const removeFromBasket = (moduleId: string) => {
    setBasket(basket.filter((id) => id !== moduleId));
  };

  const handleSalvageFromAutopsy = (moduleName: string, parentProject: string) => {
    // Check if an existing module matches or create a new salvage module
    const existing = salvageModules.find((m) => m.title.toLowerCase() === moduleName.toLowerCase());
    if (existing) {
      if (!basket.includes(existing.id)) {
        setBasket([...basket, existing.id]);
      }
    } else {
      const newModule: SalvageModule = {
        id: `SPEC-${Math.floor(Math.random() * 800 + 100)}`,
        title: moduleName,
        category: 'ui-components',
        parentProject: parentProject,
        description: `Dissected module recovered from ${parentProject} during conservatory autopsy.`,
        tags: ['TypeScript', 'Modular'],
        sizeOrTests: '8.4 kB clean',
        devTimeSaved: 'Saved 18 hrs dev time',
        badge: {
          label: 'Harvested Specimen',
          icon: 'inventory_2',
          type: 'verified',
        },
      };
      setSalvageModules([newModule, ...salvageModules]);
      setBasket([...basket, newModule.id]);
    }

    // Add activity
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      icon: 'move_to_inbox',
      iconBg: 'bg-primary-container/40',
      iconColor: 'text-primary',
      timeAgo: 'Just now',
      headline: `Recovered ${moduleName} from ${parentProject} into Salvage Yard.`,
      projectHighlight: parentProject,
      subtext: 'Module indexed • Cleansed of proprietary keys',
      type: 'module',
    };
    setActivities([newAct, ...activities]);
  };

  // Navigations & Handlers
  const openAutopsy = (specimen: ProjectSpecimen) => {
    setAutopsySpecimen(specimen);
    setIsAutopsyOpen(true);
  };

  const navigateToRevivalCompass = (specimen: ProjectSpecimen) => {
    setRevivalSpecimen(specimen);
    setCurrentScreen('revival-compass');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sparkRevivalSprint = (specimen: ProjectSpecimen) => {
    setRevivalSpecimen(specimen);
    setIsGraftSprintOpen(true);
  };

  const handleProjectBuried = (newSpecimen: ProjectSpecimen) => {
    setSpecimens([newSpecimen, ...specimens]);

    // Record activity
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      icon: 'inventory_2',
      iconBg: 'bg-secondary-container/60',
      iconColor: 'text-secondary',
      timeAgo: 'Just now',
      headline: `Buried ${newSpecimen.title} with honors into Vault No. ${Math.floor(
        Math.random() * 50 + 10
      )}.`,
      projectHighlight: newSpecimen.title,
      subtext: `${newSpecimen.completionPercentage}% completion preserved • ${newSpecimen.preservedSalvageModules.length} modules saved`,
      type: 'module',
    };
    setActivities([newActivity, ...activities]);

    setCurrentScreen('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = (id: string) => {
    const target = specimens.find((s) => s.id === id);
    setSpecimens((prev) => prev.filter((s) => s.id !== id));
    if (target) {
      const deleteActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        icon: 'delete',
        iconBg: 'bg-error/20',
        iconColor: 'text-error',
        timeAgo: 'Just now',
        headline: `Exhumed and removed ${target.title} from the graveyard vaults.`,
        projectHighlight: target.title,
        subtext: 'Project record catalog deleted',
        type: 'epitaph',
      };
      setActivities((prev) => [deleteActivity, ...prev]);
    }
  };

  const restingCount = specimens.filter((s) => s.status === 'resting' || s.status === 'dormant').length;
  const revivedCount = 2;

  // Render Full-Bleed Login View
  if (currentScreen === 'login') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onNavigate={navigateWithAuth}
      />
    );
  }

  // Render Full-Bleed World-Class Landing Page
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary-container selection:text-on-primary-container">
        <LandingPageView
          onNavigate={navigateWithAuth}
          onSelectSpecimenForAutopsy={openAutopsy}
          specimens={specimens}
          salvageModules={salvageModules}
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Global ⌘K Command Palette */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          specimens={specimens}
          salvageModules={salvageModules}
          onSelectSpecimen={(spec) => {
            openAutopsy(spec);
            setIsSearchOpen(false);
          }}
          onNavigate={(screen) => {
            navigateWithAuth(screen);
            setIsSearchOpen(false);
          }}
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        />

        {/* Memorial Autopsy Vitrine Modal */}
        <MemorialAutopsyModal
          specimen={autopsySpecimen}
          isOpen={isAutopsyOpen}
          onClose={() => setIsAutopsyOpen(false)}
          onCalculateRevival={navigateToRevivalCompass}
          onSalvageModule={handleSalvageFromAutopsy}
          onOpenAiChat={openAiChat}
        />

        {/* 2-Hour Revival Sprint Roadmap Modal */}
        <GraftSprintModal
          specimen={revivalSpecimen}
          isOpen={isGraftSprintOpen}
          onClose={() => setIsGraftSprintOpen(false)}
          onStartSprint={() => {
            alert(
              `Revival Sprint started for ${revivalSpecimen?.title}! 120-minute focus session initialized.`
            );
          }}
        />

        {/* Project assistant launcher */}
        <AssistantLauncher isOpen={isAiChatOpen} onClick={() => {
          if (!isAuthenticated) { navigateWithAuth('login'); return; }
          if (isAiChatOpen) setIsAiChatOpen(false); else openAiChat();
        }} />

        {/* Large AI Forensic Copilot Tool Window (Bottom-Right Anchored) */}
        <ProjectAiChatbot
          isOpen={isAiChatOpen}
          onClose={() => setIsAiChatOpen(false)}
          specimen={aiChatSpecimen}
          allSpecimens={specimens}
          onSelectSpecimen={(s) => setAiChatSpecimen(s)}
          onNavigateToRevival={navigateToRevivalCompass}
          onNavigateToSalvage={() => {
            navigateWithAuth('salvage-yard');
          }}
        />
      </div>
    );
  }

  // Access Control Guard: User must be authenticated to enter inner conservatory views
  if (!isAuthenticated) {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onNavigate={navigateWithAuth}
      />
    );
  }

  return (
    <>
      <div
        className={`min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary-container selection:text-on-primary-container flex transition-all duration-500 ${
          showAgentWelcome ? 'filter blur-[5px] pointer-events-none select-none brightness-75' : ''
        }`}
      >
      {/* Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={navigateWithAuth}
        restingCount={restingCount}
        revivedCount={revivedCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Workspace Frame */}
      <div
        className={`flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-68'
        }`}
      >
        {/* Top Header */}
        <Header
          onNavigate={navigateWithAuth}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          unreadNotificationsCount={2}
          currentUser={currentUser}
          onLogout={handleLogout}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* View Main Content */}
        <main className="min-w-0 w-full pt-24 px-4 sm:px-6 lg:px-8 pb-6 flex-1 max-w-[1440px] mx-auto">
          {currentScreen === 'overview' && (
            <OverviewView
              specimens={specimens}
              activities={activities}
              onNavigate={setCurrentScreen}
              onSelectSpecimenForAutopsy={openAutopsy}
              onSelectSpecimenForRevival={navigateToRevivalCompass}
              onSparkRevival={sparkRevivalSprint}
              onOpenAiChat={openAiChat}
              onDeleteSpecimen={handleDeleteProject}
              onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            />
          )}

          {currentScreen === 'bury-a-project' && (
            <BuryProjectView
              onProjectBuried={handleProjectBuried}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'salvage-yard' && (
            <SalvageYardView
              modules={salvageModules}
              basket={basket}
              onToggleBasket={toggleBasket}
              onRemoveFromBasket={removeFromBasket}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'revival-compass' && (
            <RevivalCompassView
              specimens={specimens}
              selectedSpecimen={revivalSpecimen}
              onSelectSpecimen={setRevivalSpecimen}
              onOpenGraftSprint={sparkRevivalSprint}
            />
          )}

          {currentScreen === 'graft-studio' && (
            <GraftStudioView
              salvagedModules={salvageModules}
              basket={basket}
              onRemoveFromBasket={removeFromBasket}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'pattern-insights' && (
            <PatternInsightsView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'archive' && (
            <ArchiveView
              specimens={specimens}
              onSelectSpecimenForAutopsy={openAutopsy}
              onSelectSpecimenForRevival={navigateToRevivalCompass}
              onOpenAiChat={openAiChat}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              specimens={specimens}
              salvageModules={salvageModules}
              activities={activities}
              basket={basket}
            />
          )}
        </main>
      </div>

      {/* Global ⌘K Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        specimens={specimens}
        salvageModules={salvageModules}
        onSelectSpecimen={(spec) => {
          openAutopsy(spec);
          setIsSearchOpen(false);
        }}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setIsSearchOpen(false);
        }}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
      />

      {/* Memorial Autopsy Vitrine Modal */}
      <MemorialAutopsyModal
        specimen={autopsySpecimen}
        isOpen={isAutopsyOpen}
        onClose={() => setIsAutopsyOpen(false)}
        onCalculateRevival={navigateToRevivalCompass}
        onSalvageModule={handleSalvageFromAutopsy}
        onOpenAiChat={openAiChat}
      />

      {/* 2-Hour Revival Sprint Roadmap Modal */}
      <GraftSprintModal
        specimen={revivalSpecimen}
        isOpen={isGraftSprintOpen}
        onClose={() => setIsGraftSprintOpen(false)}
        onStartSprint={() => {
          alert(
            `Revival Sprint started for ${revivalSpecimen?.title}! 120-minute focus session initialized.`
          );
        }}
      />

      {/* Floating Left Nav Restore Pill when in Full Screen Mode */}
      {isSidebarCollapsed && (
        <button
          type="button"
          onClick={() => setIsSidebarCollapsed(false)}
          className="fixed left-5 bottom-6 z-40 px-3.5 py-2.5 rounded-full bg-surface-container-high/95 hover:bg-surface-container-highest text-on-surface border border-outline-variant/80 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold hover:border-primary/60 transition-all cursor-pointer animate-in fade-in select-none group"
          title="Restore Left Navigation Sidebar"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">
            menu_open
          </span>
          <span>Show Nav Menu</span>
        </button>
      )}

      {/* Project assistant launcher */}
      <AssistantLauncher isOpen={isAiChatOpen} onClick={() => {
        if (isAiChatOpen) setIsAiChatOpen(false); else openAiChat();
      }} />

      {/* Large AI Forensic Copilot Tool Window */}
      <ProjectAiChatbot
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        specimen={aiChatSpecimen}
        allSpecimens={specimens}
        onSelectSpecimen={(s) => setAiChatSpecimen(s)}
        onNavigateToRevival={navigateToRevivalCompass}
        onNavigateToSalvage={() => {
          setCurrentScreen('salvage-yard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReplayIntro={() => setShowAgentWelcome(true)}
      />
    </div>

    {/* "Meet Our AI Agent" Post-Login Showcase Modal (Crisp overlay over blurred background) */}
    <MeetAiAgentModal
      isOpen={showAgentWelcome}
      onClose={handleCloseAgentWelcome}
      userName={currentUser?.name || 'Curator'}
      onOpenCopilot={() => {
        handleCloseAgentWelcome();
        openAiChat();
      }}
    />

    {/* Quick Jump Navigation Modal */}
    <QuickJumpMenu
      currentScreen={currentScreen}
      onNavigate={navigateWithAuth}
      isOpen={isQuickJumpOpen}
      onClose={() => setIsQuickJumpOpen(false)}
    />

    {/* Keyboard Shortcuts Cheatsheet Modal */}
    <KeyboardShortcutsModal
      isOpen={isShortcutsOpen}
      onClose={() => setIsShortcutsOpen(false)}
    />

    {/* Add / New Project Modal with GitHub Importer */}
    <NewProjectModal
      isOpen={isNewProjectModalOpen}
      onClose={() => setIsNewProjectModalOpen(false)}
      onAddProject={handleProjectBuried}
      existingSpecimens={specimens}
    />
  </>
  );
}
