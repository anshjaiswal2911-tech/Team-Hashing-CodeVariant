export interface ChangelogRelease {
  version: string;
  codename: string;
  releaseDate: string;
  isLatest?: boolean;
  highlights: string[];
  changes: {
    category: 'Features' | 'Enhancements' | 'Fixes' | 'Forensics';
    items: string[];
  }[];
}

export const GRAVEYARD_CHANGELOG: ChangelogRelease[] = [
  {
    version: '2.4.0',
    codename: 'Necromancer Core',
    releaseDate: 'October 24, 2026',
    isLatest: true,
    highlights: [
      'Interactive specimen shareable folio modals with direct copy link',
      'Confetti milestone burst on 120-minute revival sprint commit',
      'Forensic autopsy cause-of-death breakdowns with mortality pie charts',
      'Sound atmosphere toggle in top navigation for focus acoustics',
    ],
    changes: [
      {
        category: 'Features',
        items: [
          'Added Share Specimen Modal with direct link generator & folio tags',
          'Sound toggle integration with ambient audio engine in navigation bar',
          'Confetti celebration on revival verdict confirmation',
        ],
      },
      {
        category: 'Enhancements',
        items: [
          'Filter utility pipeline for multi-field search and tag matching',
          'Refined empty states across Archive and Salvage Yard views',
          'Added quick stat metric cards across overview dashboard',
        ],
      },
      {
        category: 'Forensics',
        items: [
          'Expanded project specimen database with edge SQLite and vault prototypes',
          'Autopsy visual plates upgraded with deep forensic timelines',
        ],
      },
    ],
  },
  {
    version: '2.2.0',
    codename: 'Salvage Crucible',
    releaseDate: 'October 24, 2026',
    highlights: [
      'Code donor extraction sandbox with reusable component export',
      'Graft blueprint engine to inject archived code into active stacks',
    ],
    changes: [
      {
        category: 'Features',
        items: [
          'Salvage Yard browser with module extraction drawer',
          'Dependency conflict analysis for extracted TypeScript modules',
        ],
      },
      {
        category: 'Enhancements',
        items: [
          'Visual code inspector with syntax highlights and license verification',
          'Viability scoring metric per salvaged subsystem',
        ],
      },
    ],
  },
  {
    version: '2.0.0',
    codename: 'Revival Compass',
    releaseDate: 'October 23, 2026',
    highlights: [
      'Multidimensional revival score gauge with customizable momentum weights',
      '2-Hour revival sprint action planner and timebox cards',
    ],
    changes: [
      {
        category: 'Features',
        items: [
          'Algorithmic decision tree for project survival vs. organ donation',
          'Curator analysis breakdowns for all preserved repositories',
        ],
      },
      {
        category: 'Fixes',
        items: [
          'Resolved mobile viewport overflow on specimen memorial plate cards',
          'Fixed dark theme contrast ratios on forensic graphs',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    codename: 'First Inscription',
    releaseDate: 'October 22, 2026',
    highlights: [
      'Digital memorial cemetery for abandoned developer repositories',
      'Epitaph and autopsy cataloging system',
    ],
    changes: [
      {
        category: 'Features',
        items: [
          'Project graveyard directory with memorial tombstone cards',
          'Cause-of-death taxonomy and mortality forensics',
        ],
      },
    ],
  },
];
