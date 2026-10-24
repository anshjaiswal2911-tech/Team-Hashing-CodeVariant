export interface CemeteryTelemetry {
  vaultedSpecimensCount: number;
  extractedModulesCount: number;
  revivalSuccessRate: string;
  harmonicResonanceHz: number;
  activeSanitizers: number;
  recentPings: Array<{
    id: string;
    action: string;
    target: string;
    timestamp: string;
    category: 'salvage' | 'burial' | 'revival';
  }>;
}

export const initialCemeteryTelemetry: CemeteryTelemetry = {
  vaultedSpecimensCount: 142,
  extractedModulesCount: 418,
  revivalSuccessRate: '87.4%',
  harmonicResonanceHz: 432,
  activeSanitizers: 16,
  recentPings: [
    {
      id: 'ping-1',
      action: 'Extracted module',
      target: 'zero-dep-audio-recorder.ts',
      timestamp: '2 mins ago',
      category: 'salvage',
    },
    {
      id: 'ping-2',
      action: 'Buried specimen',
      target: 'SPECIMEN #004 • OmniFlow Engine',
      timestamp: '14 mins ago',
      category: 'burial',
    },
    {
      id: 'ping-3',
      action: 'Revival Compass sparked',
      target: 'SPECIMEN #001 • SynthFlow Canvas',
      timestamp: '42 mins ago',
      category: 'revival',
    },
    {
      id: 'ping-4',
      action: 'Exported bundle',
      target: '3 modules (JWT Auth, Glass Pills, SVG Radar)',
      timestamp: '1 hour ago',
      category: 'salvage',
    },
  ],
};
