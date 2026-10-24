import { ProjectSpecimen } from '../types';

export function exportSpecimenMarkdown(specimen: ProjectSpecimen): string {
  return `# Post-Mortem Autopsy Report: ${specimen.title}

**Specimen ID**: ${specimen.specimenNumber}  
**Folio Number**: ${specimen.folioNumber}  
**Burial Date**: ${specimen.buriedDate} (${specimen.dormantDuration})  
**Status**: ${specimen.status.toUpperCase()}  
**Revival Viability Score**: ${specimen.revivalScore} / 100  

---

## 1. Demise Pathology
- **Primary Root Cause**: ${specimen.rootCause}
- **Failure Category**: ${specimen.causeCategory}
- **Last Unfinished Note**: "${specimen.unfinishedNotes}"

---

## 2. Preserved Tech Stack
${specimen.techStack.map((tech) => `- ${tech}`).join('\n')}

---

## 3. Extracted Salvage Modules
${specimen.preservedSalvageModules.map((mod) => `- **${mod.name}** (Icon: \`${mod.icon}\`)`).join('\n')}

---

## 4. Archival Epitaph
> "${specimen.epitaph}"

---
*Preserved in Project Graveyard • Where dead projects become fertile ground.*
`;
}

export function downloadSpecimenReport(specimen: ProjectSpecimen): void {
  const content = exportSpecimenMarkdown(specimen);
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${specimen.specimenNumber.replace(/[^a-zA-Z0-9_-]/g, '_')}_autopsy_report.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
