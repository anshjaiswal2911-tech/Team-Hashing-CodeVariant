import { MessageSquare } from 'lucide-react';
import aiBotImg from '../../assets/ai-bot.png';

interface AssistantLauncherProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AssistantLauncher({ isOpen, onClick }: AssistantLauncherProps) {
  return (
    <aside aria-label="Ask AI Assistant" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center select-none pointer-events-auto">
          <button
            type="button"
            onClick={onClick}
            className="relative flex flex-col items-center cursor-pointer group bg-transparent border-0 p-0"
            title={isOpen ? 'Close AI Chat' : 'Click to Open AI Chat'}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close project assistant' : 'Open project assistant'}
          >
            {/* Cute Floating "Ask AI Chat" speech pill over Robot head */}
            <div className="mb-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#F4ECE0] border border-white/95 shadow-[0_4px_12px_rgba(120,95,70,0.18),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-1.5 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold text-[#2C241E] font-sans tracking-tight">Ask AI Chat</span>
              <MessageSquare size={13} strokeWidth={1.7} className="text-[#DE8553]" aria-hidden="true" />
            </div>

            {/* Animated 3D Robot Figurine in Live Floating Motion inside Claymorphic Capsule */}
            <div className="relative w-22 sm:w-26 h-28 sm:h-32 rounded-[28px] p-1 bg-[#FAF6F0] border-2 border-white/95 shadow-[0_12px_28px_rgba(120,95,70,0.22),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.95)] overflow-hidden flex items-center justify-center animate-bot-float group-hover:scale-105 transition-transform duration-300">
              <img
                src={aiBotImg}
                alt="Ask AI Chat"
                className="w-full h-full object-cover object-[50%_16%] rounded-[24px]"
              />
              {/* Glowing Amber Visor Halo Aura */}
              <div className="absolute top-2 w-12 h-12 rounded-full bg-amber-400/25 blur-md pointer-events-none animate-pulse" />
            </div>

            {/* Dynamic 3D Ground Shadow that scales with the float */}
            <div className="w-14 h-2.5 rounded-full bg-black/20 blur-[2px] animate-bot-shadow -mt-1" />
          </button>
        </aside>
  );
}
