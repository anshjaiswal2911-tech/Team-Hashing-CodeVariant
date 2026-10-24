import React, { useState, useEffect } from 'react';
import aiBotImg from '../../assets/ai-bot.png';

interface MeetAiAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  onOpenCopilot?: () => void;
}

export const MeetAiAgentModal: React.FC<MeetAiAgentModalProps> = ({
  isOpen,
  onClose,
  userName = 'Curator',
  onOpenCopilot,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-all duration-200 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="meet-ai-title"
    >
      {/* Soft warm backdrop blur over the dashboard */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 -z-10"
        onClick={handleConfirm}
      />

      {/* Main Claymorphic Card Popup (Uncluttered, compact, warm Pivora Soft UI) */}
      <div className="relative w-full max-w-md bg-[#FAF6F0] text-[#2C241E] rounded-[32px] p-6 sm:p-8 border border-white/90 shadow-[10px_20px_45px_-8px_rgba(120,95,70,0.22),-8px_-8px_24px_rgba(255,255,255,0.95),inset_1.5px_1.5px_3px_rgba(255,255,255,0.95)] my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* 3D Ceramic AI Bot in Floating Motion on Top of the Card */}
        <div className="flex flex-col items-center -mt-20 mb-3">
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

        {/* Header & Title */}
        <div className="text-center space-y-1.5 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DD] border border-white text-[#7A5A43] text-xs font-medium shadow-[2px_3px_6px_rgba(130,105,80,0.08),-2px_-2px_4px_rgba(255,255,255,0.9)]">
            <span>AI Forensic Curator</span>
          </div>

          <h2
            id="meet-ai-title"
            className="font-serif text-2xl sm:text-[26px] font-bold text-[#2C241E] tracking-tight"
          >
            Meet Our AI Agent
          </h2>

          <p className="font-sans text-xs text-[#6B5A4D] leading-relaxed max-w-xs mx-auto">
            Welcome, <strong className="text-[#2C241E]">{userName}</strong>! I am your companion in the conservatory. Here is how I help you:
          </p>
        </div>

        {/* 3 Clean, Minimal Clay Feature Points (No Cluster, No Clutter) */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F6F1EA] border border-white/80 shadow-[2px_3px_8px_rgba(120,95,70,0.06),-2px_-2px_6px_rgba(255,255,255,0.9)]">
            <div className="w-8 h-8 rounded-xl bg-[#E8DFD3] text-[#557857] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">biotech</span>
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[#2C241E]">Repo Autopsies</div>
              <div className="text-[#7A695C] text-[11px]">Pinpoint why abandoned projects stalled.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F6F1EA] border border-white/80 shadow-[2px_3px_8px_rgba(120,95,70,0.06),-2px_-2px_6px_rgba(255,255,255,0.9)]">
            <div className="w-8 h-8 rounded-xl bg-[#E8DFD3] text-[#DE8553] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">inventory_2</span>
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[#2C241E]">Salvage Code</div>
              <div className="text-[#7A695C] text-[11px]">Harvest reusable components into your yard.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F6F1EA] border border-white/80 shadow-[2px_3px_8px_rgba(120,95,70,0.06),-2px_-2px_6px_rgba(255,255,255,0.9)]">
            <div className="w-8 h-8 rounded-xl bg-[#E8DFD3] text-[#4E7682] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">chat</span>
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[#2C241E]">Bottom-Right Copilot</div>
              <div className="text-[#7A695C] text-[11px]">Chat anytime with the floating icon below.</div>
            </div>
          </div>
        </div>

        {/* Clean OK Action Button (Claymorphic Warm Terracotta Accent) */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#DE8553] hover:bg-[#D47844] active:scale-[0.98] text-white font-semibold text-sm sm:text-base shadow-[0_6px_18px_rgba(222,133,83,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.5),inset_0_-1.5px_2px_rgba(0,0,0,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>OK, Got It!</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>

          <p className="text-[11px] text-[#8C7A6D] text-center font-sans">
            Press OK to explore your conservatory dashboard
          </p>
        </div>

      </div>
    </div>
  );
};
