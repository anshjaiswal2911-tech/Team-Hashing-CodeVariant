import React, { useState } from 'react';
import { SalvageModule } from '../../types';
import { downloadSalvageZip } from '../../utils/exportArchive';

interface ExportRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  basketModules: SalvageModule[];
}

export const ExportRepoModal: React.FC<ExportRepoModalProps> = ({
  isOpen,
  onClose,
  basketModules,
}) => {
  const [repoName, setRepoName] = useState('graveyard-graft-project');
  const [githubUser, setGithubUser] = useState('username');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const scaffoldCmd = `npx degit project-graveyard/botanical-scaffold ${repoName}\ncd ${repoName}\nnpm install`;

  const gitScript = `# 1. Initialize Git repository
git init
git add .
git commit -m "chore: initial graft from Project Graveyard conservatory"

# 2. Branch and remote setup
git branch -M main
git remote add origin https://github.com/${githubUser}/${repoName}.git

# 3. Push initial graft
git push -u origin main`;

  const fullWorkflowScript = `# Project Graveyard Grafting Scaffold Workflow
# Specimen donor count: ${basketModules.length}

${scaffoldCmd}

# Place downloaded salvage archive files into src/modules/
mkdir -p src/modules

${gitScript}
`;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadSalvageZip(basketModules, `${repoName}-salvage.zip`);
    } catch (err) {
      alert((err as Error).message || 'Failed to download salvage files.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-2xl bg-surface-container rounded-xl shadow-2xl border border-secondary/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">fork_right</span>
            <span className="font-mono text-xs uppercase tracking-widest text-outline">
              Git Repository Scaffolding Guide
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs text-on-surface-variant">
          {/* Top Title & Premise */}
          <div>
            <h2 className="font-serif text-2xl text-on-surface">
              Export to New Repository
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Initialize a clean repository host for your harvested modules. Everything has been cleansed
              of legacy dependencies and is ready for fresh soil.
            </p>
          </div>

          {/* Repo Config Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg bg-surface-container-low border border-surface-container-high/40">
            <div>
              <label className="font-sans text-[11px] font-semibold text-on-surface block mb-1">
                New Repository Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) =>
                  setRepoName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))
                }
                placeholder="my-graveyard-graft"
                className="w-full px-3 py-2 rounded bg-surface-container text-on-surface font-mono text-xs border border-surface-container-high focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="font-sans text-[11px] font-semibold text-on-surface block mb-1">
                GitHub / Git Username
              </label>
              <input
                type="text"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value.trim())}
                placeholder="username"
                className="w-full px-3 py-2 rounded bg-surface-container text-on-surface font-mono text-xs border border-surface-container-high focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Harvested Modules Pill List */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-outline uppercase tracking-wider">
                Harvested Modules to Graft ({basketModules.length})
              </span>
              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={isDownloading || basketModules.length === 0}
                className="text-secondary hover:text-secondary-fixed font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>{isDownloading ? 'Downloading...' : 'Download Code Bundle (.zip)'}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {basketModules.length === 0 ? (
                <span className="text-outline italic">No modules currently in basket.</span>
              ) : (
                basketModules.map((m) => (
                  <span
                    key={m.id}
                    className="px-2.5 py-1 rounded bg-surface-container font-mono text-[11px] text-primary border border-surface-container-high flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-xs text-secondary">eco</span>
                    <span>{m.title}</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Step 1: Scaffold Directory */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                <span>Create Clean Project Directory</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(scaffoldCmd, 'scaffold')}
                className="text-secondary hover:text-secondary-fixed font-mono text-[11px] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedSection === 'scaffold' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedSection === 'scaffold' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-lowest font-mono text-xs text-on-surface-variant overflow-x-auto border border-surface-container-high/40">
              <pre><code>{scaffoldCmd}</code></pre>
            </div>
          </div>

          {/* Step 2: Initialize Git and Push */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <span>Git Initialization & Remote Connection</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(gitScript, 'git')}
                className="text-secondary hover:text-secondary-fixed font-mono text-[11px] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedSection === 'git' ? 'check' : 'content_copy'}
                </span>
                <span>{copiedSection === 'git' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-lowest font-mono text-xs text-on-surface-variant overflow-x-auto border border-surface-container-high/40">
              <pre><code>{gitScript}</code></pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(fullWorkflowScript, 'all')}
            className="px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {copiedSection === 'all' ? 'check' : 'terminal'}
            </span>
            <span>{copiedSection === 'all' ? 'Script Copied to Clipboard!' : 'Copy Full Terminal Script'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
