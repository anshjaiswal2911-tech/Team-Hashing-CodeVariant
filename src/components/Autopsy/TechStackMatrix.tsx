import React from 'react';

interface TechStackMatrixProps {
  technologies: string[];
  className?: string;
}

interface TechAudit {
  name: string;
  modernityStatus: 'cutting-edge' | 'stable' | 'deprecated';
  salvageEase: 'seamless' | 'moderate' | 'complex';
  yearStandard: string;
}

const auditTech = (tech: string): TechAudit => {
  const lower = tech.toLowerCase();
  if (lower.includes('typescript') || lower.includes('react') || lower.includes('tailwind') || lower.includes('next')) {
    return { name: tech, modernityStatus: 'cutting-edge', salvageEase: 'seamless', yearStandard: '2026 Ready' };
  }
  if (lower.includes('node') || lower.includes('postgres') || lower.includes('express') || lower.includes('python') || lower.includes('go')) {
    return { name: tech, modernityStatus: 'stable', salvageEase: 'seamless', yearStandard: 'LTS Standard' };
  }
  return { name: tech, modernityStatus: 'deprecated', salvageEase: 'complex', yearStandard: 'Legacy' };
};

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({
  technologies,
  className = '',
}) => {
  const audits = technologies.map(auditTech);

  const statusBadges = {
    'cutting-edge': 'bg-secondary/15 text-secondary border-secondary/40',
    'stable': 'bg-primary-container text-on-primary-container border-primary/30',
    'deprecated': 'bg-error-container text-on-error-container border-error/40',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
          Stack Modernity & Salvage Compatibility
        </h4>
        <span className="text-[10px] font-mono text-on-surface-variant">
          {technologies.length} components audited
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {audits.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container/70 border border-outline-variant/60 text-xs font-mono"
          >
            <div className="space-y-0.5">
              <span className="font-semibold text-on-surface">{item.name}</span>
              <div className="text-[10px] text-on-surface-variant">{item.yearStandard}</div>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full border text-[9px] uppercase font-semibold ${statusBadges[item.modernityStatus]}`}
            >
              {item.modernityStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
