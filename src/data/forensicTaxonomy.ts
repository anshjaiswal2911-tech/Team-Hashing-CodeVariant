export interface ForensicTaxonomyItem {
  id: string;
  category: string;
  latinEpitaph: string;
  symbol: string;
  mortalityRate: string;
  primaryPathology: string;
  antidoteProtocol: string;
  recommendedNextSteps: string[];
}

export const forensicTaxonomyList: ForensicTaxonomyItem[] = [
  {
    id: 'tax-01',
    category: 'Architecture Over-Complexity',
    latinEpitaph: 'Mors per Complexitatem',
    symbol: 'account_tree',
    mortalityRate: '34% of early projects',
    primaryPathology: 'Premature microservices, distributed queues, and kubernetes clusters built for single-user validation.',
    antidoteProtocol: 'Modular Monolith Doctrine: Single deployment artifact, SQLite / Postgres, direct functional calls.',
    recommendedNextSteps: [
      'Collapse distributed services into a monolithic package',
      'Replace Kafka/RabbitMQ with in-process event emitters',
      'Extract zero-dependency UI tokens into Salvage Yard',
    ],
  },
  {
    id: 'tax-02',
    category: 'Solo Contributor Exhaustion',
    latinEpitaph: 'Solitudo Fatigatio',
    symbol: 'person_off',
    mortalityRate: '28% of early projects',
    primaryPathology: 'Carrying product design, frontend styling, backend reliability, and marketing alone without peer feedback.',
    antidoteProtocol: 'Open Specimen Handover: Preserving architectural decision records (ADRs) for team revival.',
    recommendedNextSteps: [
      'Publish specimen to Project Graveyard Cemetery',
      'Tag reusable modules for team salvage',
      'Generate 120-minute revival sprint blueprint',
    ],
  },
  {
    id: 'tax-03',
    category: 'Market Timing Mismatch',
    latinEpitaph: 'Tempus Immaturum',
    symbol: 'hourglass_disabled',
    mortalityRate: '21% of early projects',
    primaryPathology: 'Product built ahead of supporting browser APIs, payment rails, or developer ecosystem readiness.',
    antidoteProtocol: 'Cryogenic Code Freeze: Maintain test suites and dependencies ready for immediate unthaw.',
    recommendedNextSteps: [
      'Run Revival Compass scan against modern 2026 browser APIs',
      'Verify if required third-party services now offer turnkey SDKs',
      'Re-interview target users with updated prototypes',
    ],
  },
  {
    id: 'tax-04',
    category: 'Third-Party API Deprecation',
    latinEpitaph: 'Vindicta Extrinseca',
    symbol: 'link_off',
    mortalityRate: '17% of early projects',
    primaryPathology: 'Upstream vendor pricing spikes, deprecated endpoint formats, or sudden platform gatekeeping.',
    antidoteProtocol: 'Clean Adapter Isolation: Wrapping external API calls in swappable interface providers.',
    recommendedNextSteps: [
      'Audit external endpoints in Salvage Yard',
      'Swap proprietary LLM bindings with standard OpenAI-compatible endpoints',
      'Sanitize API credentials and generate mock fixtures',
    ],
  },
];
