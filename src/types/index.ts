export type ScreenId =
  | 'landing'
  | 'login'
  | 'overview'
  | 'bury-a-project'
  | 'revival-compass'
  | 'salvage-yard'
  | 'graft-studio'
  | 'pattern-insights'
  | 'archive'
  | 'settings';

export type ProjectStatus = 'resting' | 'dormant' | 'revived' | 'prime-candidate';

export interface SalvageModule {
  id: string; // e.g. "SPEC-0841"
  title: string;
  category: 'ui-components' | 'schemas-db' | 'api-integrations' | 'design-tokens' | 'research-docs';
  parentProject: string; // e.g. "Campus Connect"
  description: string;
  tags: string[];
  sizeOrTests: string; // e.g. "18.4 kB unpacked" or "32 tests passing"
  badge: {
    label: string;
    icon: string;
    type: 'verified' | 'instant' | 'zero-dep' | 'strategic';
  };
  devTimeSaved?: string;
  codeSnippet?: {
    filename: string;
    exportName: string;
    code: string;
  };
  colorSwatches?: { name: string; bg: string; textClass: string }[];
  synopsisDoc?: string;
}

export interface ProjectSpecimen {
  id: string; // e.g. "SPEC-2023-094" or "SPEC-008"
  specimenNumber: string; // e.g. "SPECIMEN #008" or "SPEC-0841"
  folioNumber: string; // e.g. "Folio #CC-23"
  title: string;
  category: string; // e.g. "EdTech & Community"
  description: string;
  buriedDate: string; // e.g. "Oct 14, 2023"
  dormantDuration: string; // e.g. "8 mos ago"
  status: ProjectStatus;
  completionPercentage: number;
  revivalScore: number;
  primeCandidate?: boolean;
  rootCause: string;
  causeCategory: string; // e.g. "Time Shortage", "Scope Creep"
  techStack: string[];
  preservedSalvageModules: {
    name: string;
    icon: string;
  }[];
  unfinishedNotes: string;
  epitaph: string;
  plateImage: string;
  salvageViability: {
    level: string; // "High (3 Modules)"
    score: number; // 84
  };
  curatorAnalysis: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  timeAgo: string;
  headline: string;
  projectHighlight?: string;
  scoreHighlight?: string;
  subtext: string;
  type: 'module' | 'compass' | 'epitaph';
}

export interface RevivalBreakdown {
  codeCompletion: { wt: number; score: number; pts: number; desc: string };
  ideaStrength: { wt: number; score: number; pts: number; desc: string };
  causeFixability: { wt: number; score: number; pts: number; desc: string };
  rekindledInterest: { wt: number; score: number; pts: number; desc: string };
  skillGrowth: { wt: number; score: number; pts: number; desc: string };
  effortToMvp: { wt: number; score: number; pts: number; desc: string };
}
