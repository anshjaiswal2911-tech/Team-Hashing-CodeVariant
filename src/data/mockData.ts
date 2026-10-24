import { ProjectSpecimen, SalvageModule, ActivityItem } from '../types';
import { EXTRA_SPECIMENS } from './mockSpecimensExtra';

export const INITIAL_SPECIMENS: ProjectSpecimen[] = [
  {
    id: 'SPEC-EV-01',
    specimenNumber: 'SPECIMEN #001',
    folioNumber: 'Folio #EV-01',
    title: 'E-VSpot',
    category: 'CleanTech & Mobility',
    description: 'EV station finder & routing app with smart recommendations.',
    buriedDate: 'Jan 12, 2024',
    dormantDuration: '3 mos ago',
    status: 'resting',
    completionPercentage: 82,
    revivalScore: 88,
    primeCandidate: true,
    rootCause: 'Scope Creep (Expanded into live grid load prediction).',
    causeCategory: 'Scope Creep',
    techStack: ['React', 'TypeScript', 'Mapbox GL', 'Node.js', 'PostGIS'],
    preservedSalvageModules: [
      { name: 'Station Routing Engine', icon: 'map' },
      { name: 'Charger Status WebSocket', icon: 'bolt' }
    ],
    unfinishedNotes: 'Route optimization algorithm finished, payment integration pending.',
    epitaph: '“Charged with ambition, paused at the final terminal.”',
    plateImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Prime (2 Core Modules)',
      score: 91
    },
    curatorAnalysis: 'High viability clean mobility app with ready Mapbox routing logic.'
  },
  {
    id: 'SPEC-LL-02',
    specimenNumber: 'SPECIMEN #002',
    folioNumber: 'Folio #LL-02',
    title: 'LOSTLINK',
    category: 'Campus Utilities',
    description: 'Lost & Found platform with real-time tracking.',
    buriedDate: 'Nov 04, 2023',
    dormantDuration: '5 mos ago',
    status: 'resting',
    completionPercentage: 65,
    revivalScore: 74,
    rootCause: 'Time Shortage (Developer graduated before launch).',
    causeCategory: 'Time Shortage',
    techStack: ['Next.js', 'Tailwind', 'Supabase', 'Leaflet'],
    preservedSalvageModules: [
      { name: 'Item Matcher AI', icon: 'search' },
      { name: 'Claim Verification Flow', icon: 'verified_user' }
    ],
    unfinishedNotes: 'Notification system needs push integration.',
    epitaph: '“Helping others find what was lost, until we lost our way.”',
    plateImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (Matcher AI)',
      score: 82
    },
    curatorAnalysis: 'Solid Supabase schema and clean item matching AI pipeline.'
  },
  {
    id: 'SPEC-PDM-03',
    specimenNumber: 'SPECIMEN #003',
    folioNumber: 'Folio #PDM-03',
    title: 'Placement Drive Manager',
    category: 'EdTech & Career',
    description: 'Manage placement drives and applications.',
    buriedDate: 'Feb 20, 2024',
    dormantDuration: '2 mos ago',
    status: 'dormant',
    completionPercentage: 70,
    revivalScore: 80,
    rootCause: 'Team Disbanded (Co-founder took corporate offer).',
    causeCategory: 'Team Disbanded',
    techStack: ['React', 'Express', 'MongoDB', 'TailwindCSS'],
    preservedSalvageModules: [
      { name: 'Resume Parser', icon: 'description' },
      { name: 'Drive Scheduling Grid', icon: 'calendar_month' }
    ],
    unfinishedNotes: 'Applicant filtering and spreadsheet export complete.',
    epitaph: '“Prepared thousands for careers, awaiting its own interview.”',
    plateImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (Resume Engine)',
      score: 85
    },
    curatorAnalysis: 'Resume parser and scheduling grid are zero-dependency ready.'
  },
  {
    id: 'SPEC-AET-04',
    specimenNumber: 'SPECIMEN #004',
    folioNumber: 'Folio #AET-04',
    title: 'AI-AETHRA',
    category: 'AI & Community',
    description: 'Club outreach & event management system.',
    buriedDate: 'Mar 01, 2024',
    dormantDuration: '1 mo ago',
    status: 'dormant',
    completionPercentage: 55,
    revivalScore: 79,
    rootCause: 'Better Idea Came (Pivoted to LLM hackathon project).',
    causeCategory: 'Better Idea Came',
    techStack: ['Python', 'FastAPI', 'React', 'Tailwind'],
    preservedSalvageModules: [
      { name: 'Smart Event Scheduler', icon: 'event' },
      { name: 'Discord Bot Sync', icon: 'smart_toy' }
    ],
    unfinishedNotes: 'Event registration form and automated follow-ups.',
    epitaph: '“Born from an ambitious night, preserved for a brighter dawn.”',
    plateImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (Discord Bot Sync)',
      score: 81
    },
    curatorAnalysis: 'Event scheduler and Discord sync module can easily be decoupled.'
  },
  {
    id: 'SPEC-2023-094',
    specimenNumber: 'SPECIMEN #008',
    folioNumber: 'Folio #CC-23',
    title: 'Campus Connect',
    category: 'EdTech & Community',
    description: 'Cross-department student discovery and study-group mesh designed to reduce campus isolation.',
    buriedDate: 'Oct 14, 2023',
    dormantDuration: '8 mos ago',
    status: 'resting',
    completionPercentage: 62,
    revivalScore: 78,
    rootCause: 'Time Shortage (Solo developer during final exam term).',
    causeCategory: 'Time Shortage',
    techStack: ['React', 'TypeScript', 'Firebase', 'Node.js', 'Prisma ORM', 'TailwindCSS'],
    preservedSalvageModules: [
      { name: 'Auth JWT Engine', icon: 'token' },
      { name: 'Directory API', icon: 'api' },
      { name: 'Schedule Parser', icon: 'data_object' },
      { name: 'Tailored Theme', icon: 'palette' }
    ],
    unfinishedNotes: "Push notification service had permission bugs on iOS Safari; mobile navbar layout wasn't polished for smaller breakpoints.",
    epitaph: '“Buried with honors on October 14, 2023 • Awaiting eventual graft”',
    plateImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (3 Modules)',
      score: 84
    },
    curatorAnalysis: 'Campus Connect maintains high technical completion (62%) and intact database architecture. Its original demise was student schedule friction rather than a defective premise. Now that scheduling constraints have normalized, execution friction is low.'
  },
  {
    id: 'SPEC-2023-014',
    specimenNumber: 'SPECIMEN #014',
    folioNumber: 'Folio #FS-14',
    title: 'FloraScan',
    category: 'BioTech & Agriculture',
    description: 'Mobile ML leaf disease detector. Blocked by edge model optimization during field tests.',
    buriedDate: 'Dec 18, 2023',
    dormantDuration: '4 mos ago',
    status: 'resting',
    completionPercentage: 48,
    revivalScore: 68,
    rootCause: 'Technical Blocker (TFLite quantisation degraded inference accuracy below acceptable agricultural thresholds).',
    causeCategory: 'Technical Blocker',
    techStack: ['React Native', 'TypeScript', 'TensorFlow.js', 'Tailwind'],
    preservedSalvageModules: [
      { name: 'Core ML Vision Pipeline', icon: 'psychology' },
      { name: 'Botanical Token System', icon: 'palette' },
      { name: 'Offline Storage DB', icon: 'database' }
    ],
    unfinishedNotes: 'Edge quantisation pipeline needed rewrite for WebAssembly SIMD or newer ONNX runtime.',
    epitaph: '“The leaves withered before the harvest, but the diagnostic eye remains sharp.”',
    plateImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Rich (Core Vision Pipeline)',
      score: 79
    },
    curatorAnalysis: 'FloraScan holds an exceptional visual classification dataset and custom botanical theme. Ideal for repurposing in modern WebLLM / Gemini Nano pipelines.'
  },
  {
    id: 'SPEC-2023-011',
    specimenNumber: 'SPECIMEN #011',
    folioNumber: 'Folio #MS-11',
    title: 'MicroSponsor',
    category: 'Fintech & Publishing',
    description: 'Micro-patronage embed widget for indie writers. Stalled following Stripe API deprecation and webhook rewrite delays.',
    buriedDate: 'Oct 30, 2023',
    dormantDuration: '6 mos ago',
    status: 'dormant',
    completionPercentage: 75,
    revivalScore: 72,
    rootCause: 'Technical Blocker & Scope Creep (Stripe API upgrade broke legacy webhooks; attempted to build custom invoicing engine instead).',
    causeCategory: 'Technical Blocker',
    techStack: ['TypeScript', 'Express', 'Stripe v14', 'PostgreSQL', 'Prisma ORM'],
    preservedSalvageModules: [
      { name: 'Stripe Connect + Ledger', icon: 'payments' },
      { name: 'Embed Iframe Messenger', icon: 'web' },
      { name: 'JWT Auth Tokens', icon: 'key' }
    ],
    unfinishedNotes: 'Webhook reconciliation cron job was half-written in Redis instead of Postgres queues.',
    epitaph: '“Pennies gathered with love, halted by upstream protocols.”',
    plateImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (Billing Core)',
      score: 86
    },
    curatorAnalysis: 'The billing engine and idempotent queue are completely robust. Pruning the custom invoicing portal would allow revival in under 8 hours.'
  },
  {
    id: 'SPEC-2023-009',
    specimenNumber: 'SPECIMEN #009',
    folioNumber: 'Folio #ST-09',
    title: 'SymphonyTab',
    category: 'Audio & Productivity',
    description: 'Browser extension for ambient focus sounds. Hackathon ended before Chrome Web Store verification was completed.',
    buriedDate: 'Feb 10, 2024',
    dormantDuration: '2 mos ago',
    status: 'prime-candidate',
    primeCandidate: true,
    completionPercentage: 90,
    revivalScore: 92,
    rootCause: 'Hackathon Ended (Timer ran out during Chrome Manifest v3 service worker packaging).',
    causeCategory: 'Hackathon Ended',
    techStack: ['Web Audio API', 'Vanilla ES6', 'Vite', 'Chrome MV3'],
    preservedSalvageModules: [
      { name: 'WebAudio Soundscapes', icon: 'graphic_eq' },
      { name: 'Focus Timer Engine', icon: 'timer' },
      { name: 'Zero-Dependency Synthesizer', icon: 'all_inclusive' }
    ],
    unfinishedNotes: 'Only requires MV3 background audio keep-alive and Chrome Web Store store assets packaging.',
    epitaph: '“Silent on the verge of its greatest song.”',
    plateImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Prime (92/100 Readiness)',
      score: 95
    },
    curatorAnalysis: 'Highest viability specimen in the entire conservatory. A single 2-hour revival sprint will ship this to production.'
  },
  {
    id: 'SPEC-2023-003',
    specimenNumber: 'SPECIMEN #003',
    folioNumber: 'Folio #RC-03',
    title: 'RetroCast',
    category: 'Podcasting & Media',
    description: 'Podcast chapter bookmarking PWA. Stalled from scope expansion and audiogram generation server overhead.',
    buriedDate: 'May 05, 2023',
    dormantDuration: '11 mos ago',
    status: 'resting',
    completionPercentage: 35,
    revivalScore: 42,
    rootCause: 'Scope Creep (Began as an RSS chapter marker, morphed into a full video audiogram rendering SaaS).',
    causeCategory: 'Scope Creep',
    techStack: ['React', 'TypeScript', 'Node.js', 'FFmpeg', 'PWA'],
    preservedSalvageModules: [
      { name: 'Waveform Audio Generator', icon: 'waves' },
      { name: 'RSS Parser Engine', icon: 'rss_feed' }
    ],
    unfinishedNotes: 'FFmpeg was running out of RAM on cheap cloud instances; needed cloud function delegate.',
    epitaph: '“Chased too many frequencies at once.”',
    plateImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Moderate (Waveform Module)',
      score: 65
    },
    curatorAnalysis: 'The audiogram generator is over-engineered, but the clean client-side waveform canvas parser is ripe for grafting.'
  },
  {
    id: 'SPEC-2023-007',
    specimenNumber: 'SPECIMEN #007',
    folioNumber: 'Folio #CC-07',
    title: 'CanvasCraft',
    category: 'Creative Tools & Canvas',
    description: 'Buried due to runaway scope creep. The vector rendering engine is 90% completed and could be extracted into a standalone headless canvas micro-library.',
    buriedDate: 'Aug 14, 2023',
    dormantDuration: '8 mos ago',
    status: 'resting',
    completionPercentage: 65,
    revivalScore: 84,
    rootCause: 'Scope Creep (Started as simple whiteboard, attempted to rebuild Figma plugin architecture).',
    causeCategory: 'Scope Creep',
    techStack: ['Canvas API', 'TypeScript', 'Web Workers', 'Zustand'],
    preservedSalvageModules: [
      { name: 'Vector Path Optimizer', icon: 'gesture' },
      { name: 'QuadTree Spatial Index', icon: 'grid_view' },
      { name: 'Infinite Pan/Zoom Canvas', icon: 'zoom_out_map' }
    ],
    unfinishedNotes: 'Undo/redo stack for multi-user WebSockets had edge-case conflict bugs.',
    epitaph: '“The brush was ready, but the canvas grew infinite.”',
    plateImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'High (Vector Engine)',
      score: 88
    },
    curatorAnalysis: 'Recommended for headless extraction. The rendering loop runs at solid 60fps on mobile.'
  },
  {
    id: 'SPEC-2023-002',
    specimenNumber: 'SPECIMEN #002',
    folioNumber: 'Folio #DP-02',
    title: 'DevPulse',
    category: 'Developer Tools',
    description: 'Developer habit & focus metrics tracker. Paused after market discovery showed saturation in generic pomodoro tools.',
    buriedDate: 'Apr 02, 2023',
    dormantDuration: '1 yr ago',
    status: 'resting',
    completionPercentage: 55,
    revivalScore: 58,
    rootCause: 'Better Idea Came (Pivoted focus to AI tooling during early LLM boom).',
    causeCategory: 'Better Idea Came',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind', 'OAuth2'],
    preservedSalvageModules: [
      { name: 'OAuth2 Modular Flow', icon: 'key' },
      { name: 'Customer Discovery Dossier', icon: 'notes' }
    ],
    unfinishedNotes: 'Desktop companion app in Tauri stalled on macOS notarization hurdles.',
    epitaph: '“Measured time with precision, lost track of the horizon.”',
    plateImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Solid (Auth Flow)',
      score: 74
    },
    curatorAnalysis: 'The customer interview database and OAuth module have already helped bootstrap two subsequent initiatives.'
  },
  {
    id: 'SPEC-2023-004',
    specimenNumber: 'SPECIMEN #004',
    folioNumber: 'Folio #HL-04',
    title: 'HyperLog',
    category: 'System Telemetry',
    description: 'Ultra-fast regex log aggregator with localized terminal TUI. Paused after Rust rewrite proved too demanding.',
    buriedDate: 'Sep 21, 2023',
    dormantDuration: '7 mos ago',
    status: 'resting',
    completionPercentage: 40,
    revivalScore: 38,
    rootCause: 'Technical Blocker (Memory ownership complexities in multi-threaded zero-copy pipe).',
    causeCategory: 'Technical Blocker',
    techStack: ['Rust', 'Tokio', 'Ratatui'],
    preservedSalvageModules: [
      { name: 'Regex Stream Parser', icon: 'code' },
      { name: 'ANSI Terminal Renderer', icon: 'terminal' }
    ],
    unfinishedNotes: 'Backpressure flow control in async worker pool caused thread hangs under peak load.',
    epitaph: '“Too ambitious for a single weekend, but the parser was pure poetry.”',
    plateImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    salvageViability: {
      level: 'Archival (Specialized Parser)',
      score: 52
    },
    curatorAnalysis: 'Pure archival artifact. The regex benchmark algorithms provide foundational learnings on stream parsing.'
  },
  ...EXTRA_SPECIMENS,
];

export const SALVAGE_MODULES: SalvageModule[] = [
  {
    id: 'SPEC-0841',
    title: 'Universal University SSO & Directory Scraper',
    category: 'api-integrations',
    parentProject: 'Campus Connect',
    description: 'Cached LDAP / SAML authentication adapter with fallback mock test fixture data for non-standard student portals. Decoupled session store with rolling cookie refresh logic.',
    tags: ['Node.js 18+', 'Cheerio', 'Redis PubSub', 'Vitest (98% Cov)'],
    sizeOrTests: '18.4 kB unpacked',
    devTimeSaved: 'Saved 34 hrs in dev',
    badge: {
      label: 'Plug & Play (Verified)',
      icon: 'check_circle',
      type: 'verified'
    },
    codeSnippet: {
      filename: 'adapter/campus-ldap-client.ts',
      exportName: 'export class CampusAuthAdapter',
      code: `export async function mountCampusSSO(config: SSOConfig): Promise<SessionAdapter> {
  // Fallback to simulated directory in non-production environments
  const provider = config.isDev ? new MockDirectoryDriver() : new SAML2Driver(config);
  return createResilientSession({ provider, cacheLayer: redisClient, ttlSeconds: 86400 });
}`
    }
  },
  {
    id: 'SPEC-0109',
    title: 'Botanical Dark Mode Token System',
    category: 'design-tokens',
    parentProject: 'FloraScan',
    description: 'Curated forest green palette with semantic surface hierarchy, high-contrast accessible parchment typography, and ready-to-inject CSS custom properties for rich dark themes.',
    tags: ['Tailwind CSS v3/v4', 'Figma Tokens Sync', 'WCAG AAA Contrast'],
    sizeOrTests: 'tokens.theme.js',
    devTimeSaved: 'Adopted by 3 active repos',
    badge: {
      label: 'Instant Export (Tailwind config)',
      icon: 'bolt',
      type: 'instant'
    },
    colorSwatches: [
      { name: 'Surface', bg: '#0c1512', textClass: 'text-outline' },
      { name: 'Cont.', bg: '#18211e', textClass: 'text-outline' },
      { name: 'Prime', bg: '#647d65', textClass: 'text-on-primary-container' },
      { name: 'Accent', bg: '#b3ceb2', textClass: 'text-on-primary' },
      { name: 'Amber', bg: '#f2bd79', textClass: 'text-on-secondary' },
      { name: 'Border', bg: '#2d3733', textClass: 'text-outline-variant' }
    ]
  },
  {
    id: 'SPEC-0492',
    title: 'Stripe Metered Webhook Dispatcher',
    category: 'schemas-db',
    parentProject: 'MicroSponsor',
    description: 'Idempotent billing event orchestrator with auto-migrated PostgreSQL retry queues, signature rotation verification, and exponential jitter backoff for micro-subscription apps.',
    tags: ['TypeScript', 'Express / Fastify', 'Stripe v14', 'Prisma ORM'],
    sizeOrTests: '32 tests passing',
    devTimeSaved: 'Saved 52 hrs dev time',
    badge: {
      label: 'Production Ready',
      icon: 'verified',
      type: 'verified'
    },
    codeSnippet: {
      filename: 'server/billing/webhook-dispatcher.ts',
      exportName: 'export class MeteredWebhookHandler',
      code: `export async function processStripeWebhook(payload: Buffer, sig: string): Promise<Result> {
  const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  const exists = await prisma.processedEvent.findUnique({ where: { eventId: event.id } });
  if (exists) return { status: 'already_processed' };
  return executeWithIdempotentRetry(event, { maxRetries: 5 });
}`
    }
  },
  {
    id: 'SPEC-0318',
    title: 'Browser Audio Synthesizer Engine',
    category: 'ui-components',
    parentProject: 'SymphonyTab',
    description: 'Procedural rain, white noise, and conservatory wind generator with linear gain smoothing and ambient sleep timers. Operates purely through native Web Audio nodes with negligible CPU draw.',
    tags: ['Web Audio API', 'Vanilla ES6+', '0kB Bundles'],
    sizeOrTests: 'audio-core.mjs',
    devTimeSaved: 'Ultra lightweight',
    badge: {
      label: 'Zero Dependencies',
      icon: 'all_inclusive',
      type: 'zero-dep'
    }
  },
  {
    id: 'SPEC-0056',
    title: 'Hackathon Pitch Deck & Problem Research Dossier',
    category: 'research-docs',
    parentProject: 'DevPulse',
    description: '42 customer discovery interview summaries, competitive analysis matrix for developer telemetry tools, and an 11-slide pitch deck blueprint with validated value propositions.',
    tags: ['Markdown (.md)', 'Notion JSON Export', 'Pitch Deck PDF'],
    sizeOrTests: '4.2 MB archive',
    devTimeSaved: 'Market research ready',
    badge: {
      label: 'Strategic Asset',
      icon: 'psychology',
      type: 'strategic'
    },
    synopsisDoc: `# Developer Telemetry & Flow Insights Dossier
- 42 in-depth founder and senior engineer interviews
- Key finding: 78% of context-switching is caused by broken cross-repo documentation
- Pitch deck structure: Hook -> Problem -> Modular Architecture -> Unit Economics`
  },
  {
    id: 'SPEC-0220',
    title: 'Headless Infinite Pan & Zoom Canvas',
    category: 'ui-components',
    parentProject: 'CanvasCraft',
    description: 'Hardware accelerated 2D transformation matrix with pinch gestures, inertial deceleration, and spatial QuadTree bounding box queries.',
    tags: ['TypeScript', 'Canvas2D', 'Web Workers'],
    sizeOrTests: '8.1 kB unpacked',
    devTimeSaved: 'Saved 26 hrs dev time',
    badge: {
      label: 'Production Ready',
      icon: 'verified',
      type: 'verified'
    }
  },
  {
    id: 'SPEC-0711',
    title: 'Prisma Multi-Tenant Organization Schema',
    category: 'schemas-db',
    parentProject: 'Campus Connect',
    description: 'Normalized database schema covering user roles, club permissions, recurring calendar recurrence rules, and soft-deletion tombstoning.',
    tags: ['Prisma 5+', 'PostgreSQL', 'Zod Validator'],
    sizeOrTests: 'schema.prisma',
    devTimeSaved: 'Saved 19 hrs dev time',
    badge: {
      label: 'Instant Export',
      icon: 'bolt',
      type: 'instant'
    }
  }
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    icon: 'move_to_inbox',
    iconBg: 'bg-primary-container/40',
    iconColor: 'text-primary',
    timeAgo: '2 hours ago',
    headline: 'Recovered OAuth2 modular flow from DevPulse into Salvage Yard.',
    projectHighlight: 'DevPulse',
    subtext: 'Module indexed • 14 exports available',
    type: 'module'
  },
  {
    id: 'act-2',
    icon: 'explore',
    iconBg: 'bg-secondary-container/60',
    iconColor: 'text-secondary',
    timeAgo: 'Yesterday',
    headline: 'Revival Compass calculated revival readiness score for SymphonyTab at 92/100.',
    projectHighlight: 'SymphonyTab',
    scoreHighlight: '92/100',
    subtext: 'Viability category: Imminent Quick Win',
    type: 'compass'
  },
  {
    id: 'act-3',
    icon: 'format_quote',
    iconBg: 'bg-surface-variant',
    iconColor: 'text-tertiary',
    timeAgo: '3 days ago',
    headline: 'Added heartfelt epitaph for HyperLog: “Too ambitious for a single weekend, but the parser was pure poetry.”',
    projectHighlight: 'HyperLog',
    subtext: 'Epitaph preserved in Vault No. 004',
    type: 'epitaph'
  }
];

export const CAUSE_OF_DEATH_OPTIONS = [
  { id: 'scope-creep', label: 'Scope Creep', color: 'bg-error' },
  { id: 'time-shortage', label: 'Time Shortage', color: 'bg-secondary' },
  { id: 'lost-motivation', label: 'Lost Motivation', color: 'bg-outline' },
  { id: 'technical-blocker', label: 'Technical Blocker', color: 'bg-error' },
  { id: 'team-dissolved', label: 'Team Dissolved', color: 'bg-outline' },
  { id: 'hackathon-ended', label: 'Hackathon Ended', color: 'bg-outline' },
  { id: 'better-idea-came', label: 'Better Idea Came', color: 'bg-secondary' },
  { id: 'idea-didnt-hold-up', label: 'Idea Didn’t Hold Up', color: 'bg-outline' }
];
