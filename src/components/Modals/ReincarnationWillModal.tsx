import React, { useState } from 'react';
import { ProjectSpecimen } from '../../types';

interface ReincarnationWillModalProps {
  specimen: ProjectSpecimen | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReincarnationWillModal: React.FC<ReincarnationWillModalProps> = ({
  specimen,
  isOpen,
  onClose,
}) => {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [organDonationType, setOrganDonationType] = useState('full-transplant');
  const [farewellNote, setFarewellNote] = useState(
    'I dedicate this code to the open-source soil. Take what works, modernize the rest, and finish what I started.'
  );

  if (!isOpen || !specimen) return null;

  const markdownBadge = `[![Resting in Project Graveyard](https://img.shields.io/badge/Resting%20In-Project%20Graveyard-144227?style=flat&logo=ghost)](https://project-graveyard.dev/folio/${specimen.folioNumber})`;

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(markdownBadge);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2200);
  };

  const handleDownloadCertificate = () => {
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1115"/>
      <stop offset="100%" stop-color="#151F28"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2BD79"/>
      <stop offset="100%" stop-color="#DE8553"/>
    </linearGradient>
  </defs>
  
  <rect width="800" height="520" rx="24" fill="url(#bg)" stroke="#DE8553" stroke-width="2"/>
  <rect x="24" y="24" width="752" height="472" rx="16" fill="none" stroke="#223544" stroke-width="1" stroke-dasharray="6 4"/>
  
  <text x="400" y="80" text-anchor="middle" font-family="serif" font-size="14" fill="#F2BD79" letter-spacing="4">THE CONSERVATORY OF RETIRED REPOSITORIES</text>
  <text x="400" y="125" text-anchor="middle" font-family="serif" font-size="28" font-weight="bold" fill="#F8F9F5">Certificate of Peaceful Rest &amp; Code Donation</text>
  
  <line x1="280" y1="145" x2="520" y2="145" stroke="#DE8553" stroke-width="1"/>
  
  <text x="400" y="195" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#94A3B8">This certifies that repository</text>
  <text x="400" y="235" text-anchor="middle" font-family="serif" font-size="32" font-weight="bold" fill="url(#gold)">${specimen.title}</text>
  <text x="400" y="265" text-anchor="middle" font-family="monospace" font-size="12" fill="#64748B">Folio // ${specimen.folioNumber} • Buried Duration: ${specimen.dormantDuration}</text>
  
  <rect x="100" y="300" width="600" height="90" rx="12" fill="#060C10" stroke="#1E293B"/>
  <text x="400" y="335" text-anchor="middle" font-family="sans-serif" font-style="italic" font-size="13" fill="#E2E8F0">"${farewellNote.slice(0, 85)}..."</text>
  <text x="400" y="365" text-anchor="middle" font-family="monospace" font-size="11" fill="#4ADE80">DECLARED ORGAN RIGHTS: UNRESTRICTED COMMUNITY REINCARNATION</text>
  
  <text x="140" y="445" font-family="monospace" font-size="11" fill="#64748B">ORIGINAL STACK: ${specimen.techStack.join(', ')}</text>
  <text x="140" y="465" font-family="monospace" font-size="11" fill="#64748B">FATAL VECTOR: ${specimen.causeCategory}</text>
  <text x="660" y="460" text-anchor="end" font-family="serif" font-size="14" fill="#F2BD79">Master Curator Seal</text>
</svg>`.trim();

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${specimen.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-digital-will.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-2xl bg-surface-container rounded-2xl shadow-2xl border border-secondary/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-xl">history_edu</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-on-surface leading-tight">
                Digital Will & Reincarnation Deed
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-outline">
                Preserved Specimen Folio // {specimen.folioNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Certificate Visual Preview Card */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-secondary/30 text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-7xl text-secondary">inventory_2</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-semibold">
              Permanent Testament
            </span>
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              {specimen.title}
            </h2>
            <p className="font-sans text-xs text-on-surface-variant max-w-md mx-auto italic">
              "{farewellNote}"
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-secondary/15 text-secondary border border-secondary/30">
                {specimen.dormantDuration} In Repose
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-surface-container-high text-on-surface">
                {specimen.completionPercentage}% Harvestable Code
              </span>
            </div>
          </div>

          {/* Organ Donation Intent Option */}
          <div className="space-y-2">
            <label className="font-sans text-xs font-semibold text-on-surface block">
              Declared Organ Donation Policy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'full-transplant',
                  label: 'Universal Code Transplant',
                  desc: 'All UI, backend engines, & schemas free to splice into any new repo.',
                },
                {
                  id: 'educational-only',
                  label: 'Forensic Autopsy Only',
                  desc: 'Code preserved for study; components not licensed for live production.',
                },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setOrganDonationType(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-left ${
                    organDonationType === opt.id
                      ? 'bg-secondary/15 border-secondary shadow-xs'
                      : 'bg-surface-container-low border-surface-container-high hover:border-secondary/40'
                  }`}
                >
                  <span className="font-sans text-xs font-bold text-on-surface block">
                    {opt.label}
                  </span>
                  <span className="font-sans text-[11px] text-on-surface-variant block mt-0.5 leading-relaxed">
                    {opt.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Farewell Note Input */}
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-on-surface block">
              Parting Words & Reincarnation Wish
            </label>
            <textarea
              rows={2}
              value={farewellNote}
              onChange={(e) => setFarewellNote(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary font-sans resize-none"
            />
          </div>

          {/* GitHub README Memorial Badge */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-outline font-semibold">
                GitHub README Memorial Badge
              </span>
              <button
                type="button"
                onClick={handleCopyBadge}
                className="px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[11px] font-mono flex items-center gap-1 border border-outline-variant/60 transition-colors"
              >
                <span className="material-symbols-outlined text-xs">
                  {copiedBadge ? 'done' : 'content_copy'}
                </span>
                <span>{copiedBadge ? 'Copied' : 'Copy Badge'}</span>
              </button>
            </div>
            <code className="block p-2 rounded bg-surface-container-lowest text-[11px] font-mono text-primary truncate border border-surface-container-high/40">
              {markdownBadge}
            </code>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleDownloadCertificate}
            className="px-5 py-2 rounded-lg bg-secondary hover:bg-secondary-fixed text-on-secondary text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Download Official SVG Deed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
