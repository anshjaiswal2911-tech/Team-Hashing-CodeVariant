import React, { useState } from 'react';
import { ProjectSpecimen } from '../../types';

interface ShareSpecimenModalProps {
  specimen: ProjectSpecimen | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareSpecimenModal: React.FC<ShareSpecimenModalProps> = ({
  specimen,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !specimen) return null;

  const shareUrl = `${window.location.origin}/?specimen=${specimen.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `Preserved "${specimen.title}" in Project Graveyard.\n\nDemise: ${specimen.causeCategory}\nRevival Viability: ${specimen.revivalScore}/100\n\nWhere dead projects become fertile ground.`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} />
      <div className="w-full max-w-md bg-surface-container rounded-3xl shadow-2xl border border-outline-variant/80 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">share</span>
            <h3 className="font-serif text-lg text-on-surface">Share Specimen Folio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-secondary font-bold">
            {specimen.specimenNumber} • {specimen.folioNumber}
          </span>
          <h4 className="font-serif text-xl text-on-surface">{specimen.title}</h4>
          <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
            "{specimen.epitaph}"
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-surface-container-high/60 border border-outline-variant/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-on-surface-variant">Direct Folio Link:</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-primary hover:underline font-bold"
            >
              {copied ? 'Copied Link!' : 'Copy Link'}
            </button>
          </div>
          <div className="p-2 rounded-xl bg-surface-container-lowest font-mono text-[11px] text-on-surface-variant truncate">
            {shareUrl}
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleTwitterShare}
            className="flex-1 py-2.5 rounded-2xl bg-[#000000] hover:bg-[#111111] text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>Share on X / Twitter</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs font-medium border border-outline-variant/60 transition-all"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
