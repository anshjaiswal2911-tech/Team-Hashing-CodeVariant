export interface GraftMatchPair {
  id: string;
  donorProject: string;
  recipientProject: string;
  donorModule: string;
  graftBenefit: string;
  compatibilityScore: number; // 0-100
  timeSavedHours: number;
}

export const sampleGraftMatches: GraftMatchPair[] = [
  {
    id: 'graft-01',
    donorProject: 'SynthFlow Canvas',
    recipientProject: 'Campus Connect',
    donorModule: 'zero-dep-audio-recorder.ts',
    graftBenefit: 'Enables voice notes and podcast snippets on campus discussion boards without external speech APIs.',
    compatibilityScore: 94,
    timeSavedHours: 14,
  },
  {
    id: 'graft-02',
    donorProject: 'PulseSync Mobile',
    recipientProject: 'CanvasCraft Studio',
    donorModule: 'offline-indexeddb-vault.ts',
    graftBenefit: 'Provides automatic local canvas drafting and offline sketch persistence with zero cloud server cost.',
    compatibilityScore: 91,
    timeSavedHours: 18,
  },
  {
    id: 'graft-03',
    donorProject: 'OmniFlow Analytics',
    recipientProject: 'SynthFlow Canvas',
    donorModule: 'svg-radar-gauge.tsx',
    graftBenefit: 'Visualizes frequency resonance metrics in real-time without bulky d3 or chart.js dependencies.',
    compatibilityScore: 88,
    timeSavedHours: 10,
  },
];
