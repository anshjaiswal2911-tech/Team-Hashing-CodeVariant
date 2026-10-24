import { calculateRevivalViability } from '../src/utils/revivalScorer';
import { ProjectSpecimen } from '../src/types';

describe('calculateRevivalViability', () => {
  it('should score high for modern tech stack and solvable cause', () => {
    const mockSpecimen: Partial<ProjectSpecimen> = {
      techStack: ['TypeScript', 'React', 'Tailwind CSS', 'PostgreSQL'],
      causeCategory: 'Team Disbanded due to graduation',
      preservedSalvageModules: [
        { id: '1', name: 'Auth', category: 'auth', icon: 'lock', language: 'ts', linesOfCode: 100, sanitized: true, codeSnippet: '', description: '', exportable: true },
        { id: '2', name: 'UI', category: 'ui', icon: 'palette', language: 'tsx', linesOfCode: 80, sanitized: true, codeSnippet: '', description: '', exportable: true },
      ],
      gitHistory: [
        { hash: 'abc1234', message: 'Initial commit', author: 'Dev', timestamp: '2024-01-01', insertions: 100, deletions: 0 },
        { hash: 'def5678', message: 'Feature complete', author: 'Dev', timestamp: '2024-02-01', insertions: 200, deletions: 10 },
      ],
    };

    const result = calculateRevivalViability(mockSpecimen);
    expect(result.totalScore).toBeGreaterThanOrEqual(70);
    expect(['Prime', 'Viable']).toContain(result.grade);
    expect(result.factors.techStackFreshness).toBeGreaterThan(15);
    expect(result.factors.causeSolvability).toBe(28);
  });

  it('should penalize deprecated tech stack and security breach causes', () => {
    const legacySpecimen: Partial<ProjectSpecimen> = {
      techStack: ['Flash', 'CoffeeScript', 'AngularJS'],
      causeCategory: 'Fundamental Security Breach in encryption layer',
    };

    const result = calculateRevivalViability(legacySpecimen);
    expect(result.totalScore).toBeLessThan(50);
    expect(['Challenging', 'Decayed']).toContain(result.grade);
  });

  it('should clamp score between 0 and 100', () => {
    const emptySpecimen: Partial<ProjectSpecimen> = {};
    const result = calculateRevivalViability(emptySpecimen);
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(100);
  });
});
