import { SprintMilestone } from '../components/Revival';

export interface SpecimenBlueprint {
  specimenId: string;
  projectTitle: string;
  resurrectionDifficulty: 'Low Friction' | 'Medium Rebuild' | 'Deep Overhaul';
  primaryBottleneck: string;
  milestones: SprintMilestone[];
}

export const specimenRevivalBlueprints: Record<string, SpecimenBlueprint> = {
  'SPEC-2023-094': {
    specimenId: 'SPEC-2023-094',
    projectTitle: 'Campus Connect',
    resurrectionDifficulty: 'Low Friction',
    primaryBottleneck: 'Team graduation caused coordination vacuum; backend schemas are 100% intact.',
    milestones: [
      {
        timeBlock: '00 - 30 min',
        phase: 'Environment Unthaw',
        task: 'Clone repo, configure Supabase local emulator, verify Prisma migration state.',
        deliverable: 'Running database & authenticated dev session',
      },
      {
        timeBlock: '30 - 60 min',
        phase: 'Auth Provider Swap',
        task: 'Replace custom JWT boilerplate with turnkey modern OAuth provider.',
        deliverable: 'Google and GitHub login operational',
      },
      {
        timeBlock: '60 - 90 min',
        phase: 'Student Feed Reconnect',
        task: 'Wire React Query hooks to existing PostgreSQL post feed view.',
        deliverable: 'Interactive campus post timeline',
      },
      {
        timeBlock: '90 - 120 min',
        phase: 'Demo Staging Vitrine',
        task: 'Deploy preview to Vercel and generate QR code for student showcase.',
        deliverable: 'Shareable live URL',
      },
    ],
  },
  'SPEC-2023-007': {
    specimenId: 'SPEC-2023-007',
    projectTitle: 'CanvasCraft Studio',
    resurrectionDifficulty: 'Low Friction',
    primaryBottleneck: 'Scope creep in collaborative sync; core HTML5 canvas engine is flawless.',
    milestones: [
      {
        timeBlock: '00 - 30 min',
        phase: 'Headless Canvas Extraction',
        task: 'Decouple raw canvas rendering loop from experimental multiplayer socket server.',
        deliverable: 'Clean standalone drawing canvas package',
      },
      {
        timeBlock: '30 - 60 min',
        phase: 'Export Pipeline',
        task: 'Add SVG and PNG export actions using HTML5 Canvas toBlob API.',
        deliverable: '1-click export functioning',
      },
      {
        timeBlock: '60 - 90 min',
        phase: 'UI Modernization',
        task: 'Graft modern toolbar from Salvage Yard tokens.',
        deliverable: 'Clean floating tool palette',
      },
      {
        timeBlock: '90 - 120 min',
        phase: 'Packaging as NPM Stub',
        task: 'Bundle as `@graveyard/canvas-engine` with TypeScript declarations.',
        deliverable: 'Reusable zero-dep canvas brick',
      },
    ],
  },
};
