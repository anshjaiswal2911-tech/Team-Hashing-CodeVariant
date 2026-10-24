import { INITIAL_SPECIMENS } from '../src/data/mockData';
import { createArchiveReply } from '../src/components/AiChatbot/chatMessages';

describe('archive-bound assistant replies', () => {
  const project = INITIAL_SPECIMENS[0];

  it('uses the selected project cause and completion without inventing a fixed execution gap', () => {
    const reply = createArchiveReply('Why did it fail?', { ...project, completionPercentage: 91 });
    expect(reply.text).toContain(project.rootCause);
    expect(reply.text).toContain('91% completion');
    expect(reply.text).not.toContain('38%');
  });

  it('lists only the selected project modules and labels the attached data as context', () => {
    const selected = { ...project, title: 'Quoted "project"', preservedSalvageModules: [{ name: 'Reusable auth', icon: 'lock' }] };
    const reply = createArchiveReply('Show reusable modules', selected);
    expect(reply.text).toContain('1 preserved module');
    expect(reply.text).toContain('Reusable auth');
    expect(JSON.parse(reply.codeSnippet!.code)).toEqual({ project: selected.title, specimenId: project.id, modules: ['Reusable auth'] });
    expect(reply.text).not.toContain('Cleansed');
  });

  it('handles a project with no preserved modules without fabricating code', () => {
    const reply = createArchiveReply('Show code', { ...project, preservedSalvageModules: [] });
    expect(reply.text).toContain('No reusable modules');
    expect(reply.codeSnippet).toBeUndefined();
  });

  it('reports low revival scores without labeling them high potential', () => {
    const reply = createArchiveReply('Create a revival plan', { ...project, revivalScore: 24 });
    expect(reply.text).toContain('24/100');
    expect(reply.text).not.toContain('High Potential');
    expect(reply.text).not.toContain('48 dev hours');
  });

  it('treats show/how questions about the stack as technical context, rather than a restart plan', () => {
    for (const prompt of ['Show the tech stack', 'How should I modernize the architecture?']) {
      const reply = createArchiveReply(prompt, project);
      expect(reply.text).toContain('Recorded stack');
      expect(reply.text).not.toContain('two-hour restart');
    }
  });
});
