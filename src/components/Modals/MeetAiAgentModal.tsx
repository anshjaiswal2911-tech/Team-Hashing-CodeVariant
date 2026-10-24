import React, { useEffect } from 'react';
import { Archive, ArrowUpRight, Compass, Package, X } from 'lucide-react';
import aiBotImg from '../../assets/ai-bot.png';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface MeetAiAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  onOpenCopilot?: () => void;
}

const capabilities = [
  { icon: Archive, title: 'Understand what stalled', description: 'Review project context and the decisions behind it.' },
  { icon: Package, title: 'Recover useful work', description: 'Find components worth carrying into your next project.' },
  { icon: Compass, title: 'Choose a next step', description: 'Explore revival options with your project in context.' },
];

export const MeetAiAgentModal: React.FC<MeetAiAgentModalProps> = ({
  isOpen, onClose, userName = 'Curator', onOpenCopilot,
}) => {
  const dialogRef = useFocusTrap(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="meet-ai-title" aria-describedby="meet-ai-description"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-3xl border border-outline-variant bg-surface-container p-6 sm:p-8 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close introduction" className="absolute top-4 right-4 rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high">
          <X size={18} aria-hidden="true" />
        </button>
        <div className="flex flex-col items-center mt-2 mb-6">
          {/* Animated 3D Robot Figurine */}
          <div className="relative w-24 sm:w-28 h-28 sm:h-32 rounded-[28px] p-1 bg-[#FAF6F0] border-2 border-white/95 shadow-[0_14px_30px_rgba(120,95,70,0.22),-4px_-4px_16px_rgba(255,255,255,0.95),inset_0_2px_4px_rgba(255,255,255,0.95)] overflow-hidden flex items-center justify-center animate-bot-float">
            <img
              src={aiBotImg}
              alt="Meet Our AI Agent"
              className="w-full h-full object-cover object-[50%_16%] rounded-[24px]"
            />
            {/* Glowing Amber Visor Halo Aura */}
            <div className="absolute top-2 w-12 h-12 rounded-full bg-amber-400/25 blur-md pointer-events-none animate-pulse" />
          </div>
          {/* Ground Shadow */}
          <div className="w-16 h-2.5 rounded-full bg-black/15 blur-[2px] animate-bot-shadow -mt-1.5" />
        </div>
        <p className="editorial-eyebrow mb-3">A little direction for what comes next</p>
        <h2 id="meet-ai-title" className="font-serif text-3xl text-on-surface">Your project assistant.</h2>
        <p id="meet-ai-description" className="mt-3 text-sm leading-relaxed text-on-surface-variant">Welcome, {userName}. Revisit unfinished ideas with a fresh perspective. Your assistant is always a click away.</p>
        <div className="my-7 divide-y divide-outline-variant">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-3 py-4">
              <Icon size={19} strokeWidth={1.7} className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
              <div><p className="text-sm font-semibold text-on-surface">{title}</p><p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{description}</p></div>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose} className="w-full rounded-xl bg-secondary text-on-secondary py-3 text-sm font-semibold">Explore my workspace</button>
        {onOpenCopilot && <button type="button" onClick={() => { onClose(); onOpenCopilot(); }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm text-on-surface-variant hover:bg-surface-container-high">Open assistant <ArrowUpRight size={16} aria-hidden="true" /></button>}
      </div>
    </div>
  );
};
