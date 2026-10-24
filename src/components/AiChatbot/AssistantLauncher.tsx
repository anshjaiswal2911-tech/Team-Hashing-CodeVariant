import { MessageSquare, X } from 'lucide-react';
import aiBotImg from '../../assets/ai-bot.png';

interface AssistantLauncherProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AssistantLauncher({ isOpen, onClick }: AssistantLauncherProps) {
  const Icon = isOpen ? X : MessageSquare;
  return (
    <aside className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50" aria-label="Project assistant">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close project assistant' : 'Open project assistant'}
        className="group flex flex-col items-center gap-2 rounded-2xl text-on-surface"
      >
        <span className="assistant-launcher flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-3 py-2 text-xs font-semibold">
          <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
          <span>{isOpen ? 'Close assistant' : 'Project assistant'}</span>
        </span>
        {!isOpen && <span className="assistant-robot relative flex h-24 w-20 sm:h-28 sm:w-24 items-center justify-center overflow-hidden rounded-3xl border border-outline-variant bg-[#FAF6F0] p-1 shadow-lg transition-transform group-hover:-translate-y-1">
          <img src={aiBotImg} alt="" className="h-full w-full rounded-[20px] object-cover object-[50%_16%]" />
        </span>}
      </button>
    </aside>
  );
}
