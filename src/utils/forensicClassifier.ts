export type ForensicCategory =
  | 'Architecture Complexity'
  | 'Market Timing Mismatch'
  | 'Solo Founder Burnout'
  | 'Over-Engineering'
  | 'API Deprecation'
  | 'Funding Exhaustion';

export interface ForensicDiagnosis {
  category: ForensicCategory;
  symptoms: string[];
  postMortemLesson: string;
  salvageReadiness: 'High' | 'Medium' | 'Low';
}

const FORENSIC_KNOWLEDGE_BASE: Record<ForensicCategory, ForensicDiagnosis> = {
  'Architecture Complexity': {
    category: 'Architecture Complexity',
    symptoms: ['Over 15 microservices for MVP', 'Circular dependency graphs', 'Long build and compile times'],
    postMortemLesson: 'Favor monolithic modular design before premature distributed distribution.',
    salvageReadiness: 'Medium',
  },
  'Market Timing Mismatch': {
    category: 'Market Timing Mismatch',
    symptoms: ['High technological capability but low user demand', 'Required consumer habits that did not exist yet'],
    postMortemLesson: 'Validate demand with paper prototypes and waitlists before full protocol implementation.',
    salvageReadiness: 'High',
  },
  'Solo Founder Burnout': {
    category: 'Solo Founder Burnout',
    symptoms: ['Single committer on git log', 'Commit volume spike followed by complete radio silence'],
    postMortemLesson: 'Form collaborative teams and establish strict sprint pacing boundaries.',
    salvageReadiness: 'High',
  },
  'Over-Engineering': {
    category: 'Over-Engineering',
    symptoms: ['Custom state machines for simple forms', '50+ abstract interfaces without multiple implementations'],
    postMortemLesson: 'Keep abstractions grounded until at least 3 concrete duplicate implementations emerge.',
    salvageReadiness: 'Medium',
  },
  'API Deprecation': {
    category: 'API Deprecation',
    symptoms: ['Upstream third-party API shutdown', 'Deprecated OAuth 1.0 protocols', 'Breaking breaking schema shifts'],
    postMortemLesson: 'Design clean adapter boundary layers to isolate third-party vendor dependencies.',
    salvageReadiness: 'Low',
  },
  'Funding Exhaustion': {
    category: 'Funding Exhaustion',
    symptoms: ['Cloud infrastructure burn exceeded monthly recurring revenue', 'Enterprise features built before product-market fit'],
    postMortemLesson: 'Deploy serverless or zero-cost hosting tiers until monetization loop is closed.',
    salvageReadiness: 'High',
  },
};

export function diagnoseProjectDemise(causeText: string): ForensicDiagnosis {
  const lower = causeText.toLowerCase();

  if (lower.includes('burnout') || lower.includes('solo') || lower.includes('team') || lower.includes('abandoned')) {
    return FORENSIC_KNOWLEDGE_BASE['Solo Founder Burnout'];
  }
  if (lower.includes('over-engineer') || lower.includes('complex') || lower.includes('abstraction')) {
    return FORENSIC_KNOWLEDGE_BASE['Over-Engineering'];
  }
  if (lower.includes('market') || lower.includes('timing') || lower.includes('traction') || lower.includes('users')) {
    return FORENSIC_KNOWLEDGE_BASE['Market Timing Mismatch'];
  }
  if (lower.includes('api') || lower.includes('deprecated') || lower.includes('vendor')) {
    return FORENSIC_KNOWLEDGE_BASE['API Deprecation'];
  }
  if (lower.includes('fund') || lower.includes('budget') || lower.includes('money') || lower.includes('cost')) {
    return FORENSIC_KNOWLEDGE_BASE['Funding Exhaustion'];
  }

  return FORENSIC_KNOWLEDGE_BASE['Architecture Complexity'];
}
