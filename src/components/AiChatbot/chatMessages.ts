import type { ProjectSpecimen } from '../../types';

export type ChatAction = 'salvage' | 'revival' | 'cause';
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  codeSnippet?: { filename: string; code: string };
  actions?: { label: string; action: ChatAction }[];
}

export function createMessage(sender: ChatMessage['sender'], text: string): ChatMessage {
  return {
    id: crypto.randomUUID(), sender, text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export function createGreeting(project: ProjectSpecimen): ChatMessage {
  return createMessage('assistant', `Let's revisit **${project.title}**.\n\nI can help you understand why it stalled, find reusable work, or plan a focused restart.`);
}

// This assistant summarizes the existing archive; it does not call an AI provider.
export function createArchiveReply(prompt: string, project: ProjectSpecimen): ChatMessage {
  const query = prompt.toLowerCase();
  const asksAboutTechnology = /tech|stack|modern|migrat|architecture/.test(query);
  const reply = (text: string, actions?: ChatMessage['actions']): ChatMessage => ({ ...createMessage('assistant', text), actions });

  if (/why|fail|kyu|cause|reason|dormant|abandon|stall/.test(query)) {
    return reply(`### Why ${project.title} stalled\n\n**Recorded cause: ${project.causeCategory}**\n\n${project.rootCause}\n\n### What remains unfinished\n\n${project.unfinishedNotes}\n\n### Curator's assessment\n\n> ${project.curatorAnalysis}\n\nThe archive records **${project.completionPercentage}% completion**. Use that preserved work as the starting point for your next review.`, [
      { label: 'Open Revival Compass', action: 'revival' }, { label: 'Explore reusable modules', action: 'salvage' },
    ]);
  }

  if (/salvage|module|reuse|extract|component|code/.test(query)) {
    const modules = project.preservedSalvageModules;
    const result = reply(`### Reusable work in ${project.title}\n\n${modules.length ? `The archive lists **${modules.length} preserved ${modules.length === 1 ? 'module' : 'modules'}**:\n\n${modules.map((module) => `- **${module.name}**`).join('\n')}\n\nReview the source and dependencies in the Salvage Yard before reusing a module.` : 'No reusable modules are listed for this project yet.'}`, [
      { label: 'Open Salvage Yard', action: 'salvage' },
    ]);
    if (modules.length) result.codeSnippet = {
      filename: 'project-context.json',
      code: JSON.stringify({ project: project.title, specimenId: project.id, modules: modules.map((module) => module.name) }, null, 2),
    };
    return result;
  }

  if (/reviv|sprint|plan|roadmap|kaise|restart/.test(query) || (/\bhow\b/.test(query) && !asksAboutTechnology)) {
    return reply(`### A focused two-hour restart\n\nThe archive gives **${project.title} a revival score of ${project.revivalScore}/100**. Treat this as a starting point for review, rather than a guarantee.\n\n1. **0–25 min · Establish a baseline**\n   Run the project locally and note blockers in its current stack: ${project.techStack.join(', ')}.\n2. **25–65 min · Choose one repair**\n   Start with the unfinished work: ${project.unfinishedNotes}\n3. **65–95 min · Complete one workflow**\n   Connect the repaired part to the smallest useful user journey.\n4. **95–120 min · Verify and record**\n   Test that journey and document what remains before planning a release.`, [
      { label: 'Continue in Revival Compass', action: 'revival' },
    ]);
  }

  if (asksAboutTechnology) {
    return reply(`### ${project.title}: technical context\n\n**Recorded stack**\n\n${project.techStack.map((technology) => `- \`${technology}\``).join('\n')}\n\n**Before changing the architecture**\n\nEstablish a working baseline, review dependency support, and choose one concrete blocker to address.\n\n**Recorded unfinished work**\n\n${project.unfinishedNotes}`);
  }

  return reply(`### From ${project.title}'s archive\n\n${project.curatorAnalysis}\n\n- **Category:** ${project.category}\n- **Preserved:** ${project.buriedDate}\n- **Completion:** ${project.completionPercentage}%\n- **Revival score:** ${project.revivalScore}/100\n\nI can summarize the project's recorded cause, reusable modules, technical context, or a restart plan.`, [
    { label: 'Why did it stall?', action: 'cause' }, { label: 'Explore reusable modules', action: 'salvage' },
  ]);
}
