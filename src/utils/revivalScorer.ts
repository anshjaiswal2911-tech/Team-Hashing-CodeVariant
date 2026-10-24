import { ProjectSpecimen } from '../types';

export interface RevivalBreakdown {
  totalScore: number;
  grade: 'Prime' | 'Viable' | 'Challenging' | 'Decayed';
  factors: {
    techStackFreshness: number; // 0 - 30
    causeSolvability: number;    // 0 - 30
    salvageReusability: number;  // 0 - 25
    gitCompleteness: number;     // 0 - 15
  };
  recommendations: string[];
}

export function calculateRevivalViability(
  specimen: Partial<ProjectSpecimen> & { gitHistory?: Array<{ hash?: string; message?: string }> }
): RevivalBreakdown {
  let techScore = 20;
  const modernTech = ['TypeScript', 'React', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Node.js', 'Go', 'Python'];
  const deprecatedTech = ['PHP 5', 'AngularJS', 'jQuery', 'Flash', 'CoffeeScript'];

  if (specimen.techStack) {
    const modernCount = specimen.techStack.filter((t) => modernTech.some((m) => t.includes(m))).length;
    const deprecatedCount = specimen.techStack.filter((t) => deprecatedTech.some((d) => t.includes(d))).length;
    techScore = Math.min(30, Math.max(5, 15 + modernCount * 4 - deprecatedCount * 8));
  }

  let causeScore = 20;
  const highSolvabilityCauses = ['Team Disbanded', 'Market Timing', 'Budget Exhaustion', 'Scope Creep'];
  const lowSolvabilityCauses = ['Security Breach', 'Patent Litigation', 'Fundamental Flaw'];

  if (specimen.causeCategory) {
    if (highSolvabilityCauses.some((c) => specimen.causeCategory?.includes(c))) {
      causeScore = 28;
    } else if (lowSolvabilityCauses.some((c) => specimen.causeCategory?.includes(c))) {
      causeScore = 10;
    }
  }

  let salvageScore = 15;
  if (specimen.preservedSalvageModules) {
    salvageScore = Math.min(25, specimen.preservedSalvageModules.length * 8);
  }

  let gitScore = 10;
  if (specimen.gitHistory) {
    gitScore = Math.min(15, specimen.gitHistory.length * 3);
  }

  const totalScore = Math.min(100, techScore + causeScore + salvageScore + gitScore);

  let grade: 'Prime' | 'Viable' | 'Challenging' | 'Decayed' = 'Viable';
  if (totalScore >= 80) grade = 'Prime';
  else if (totalScore >= 60) grade = 'Viable';
  else if (totalScore >= 40) grade = 'Challenging';
  else grade = 'Decayed';

  const recommendations: string[] = [];
  if (techScore < 15) {
    recommendations.push('Upgrade deprecated build tooling and modern frontend dependencies.');
  }
  if (salvageScore >= 16) {
    recommendations.push('Extract sanitized UI and auth modules to jumpstart revival sprint.');
  }
  if (causeScore >= 25) {
    recommendations.push('Core idea is sound; previous failure was purely external/coordination.');
  }

  return {
    totalScore,
    grade,
    factors: {
      techStackFreshness: techScore,
      causeSolvability: causeScore,
      salvageReusability: salvageScore,
      gitCompleteness: gitScore,
    },
    recommendations,
  };
}
