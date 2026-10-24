export interface SprintEstimate {
  estimatedHours: number;
  complexityLevel: 'Sprint (2h)' | 'Moderate (4-6h)' | 'Major (1-2 days)';
  primaryBlockers: string[];
  recommendedTeamSize: number;
}

export function estimateRevivalEffort(
  completionPercentage: number,
  techStackCount: number,
  causeCategory: string
): SprintEstimate {
  let baseHours = 4;

  if (completionPercentage >= 80) {
    baseHours = 2;
  } else if (completionPercentage < 40) {
    baseHours = 12;
  } else {
    baseHours = 6;
  }

  // Adjust for tech stack complexity
  if (techStackCount > 6) {
    baseHours += 3;
  }

  // Adjust for failure cause
  const blockers: string[] = [];
  if (causeCategory.includes('Security') || causeCategory.includes('Litigation')) {
    baseHours += 10;
    blockers.push('Architectural security audit required');
  }
  if (causeCategory.includes('Complexity') || causeCategory.includes('Microservices')) {
    baseHours += 4;
    blockers.push('Refactoring distributed boundaries into modular monolith');
  }
  if (blockers.length === 0) {
    blockers.push('Clean environment unthaw & dependency upgrade');
  }

  let complexity: 'Sprint (2h)' | 'Moderate (4-6h)' | 'Major (1-2 days)' = 'Moderate (4-6h)';
  if (baseHours <= 3) complexity = 'Sprint (2h)';
  else if (baseHours > 8) complexity = 'Major (1-2 days)';

  return {
    estimatedHours: baseHours,
    complexityLevel: complexity,
    primaryBlockers: blockers,
    recommendedTeamSize: baseHours > 8 ? 3 : 1,
  };
}
