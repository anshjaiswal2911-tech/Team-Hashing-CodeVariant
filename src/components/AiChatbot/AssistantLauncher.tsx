import React, { useState, useRef, useEffect } from 'react';
import aiBotImg from '../../assets/ai-bot.png';

interface AssistantLauncherProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AssistantLauncher({ isOpen, onClick }: AssistantLauncherProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const dragInfoRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasMoved: false,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const rect = asideRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: rect.left,
      initialY: rect.top,
      hasMoved: false,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragInfoRef.current.startX;
    const dy = e.clientY - dragInfoRef.current.startY;

    if (!dragInfoRef.current.hasMoved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      dragInfoRef.current.hasMoved = true;
    }

    if (dragInfoRef.current.hasMoved) {
      const maxX = Math.max(10, window.innerWidth - 120);
      const maxY = Math.max(10, window.innerHeight - 150);
      const newX = Math.max(10, Math.min(maxX, dragInfoRef.current.initialX + dx));
      const newY = Math.max(10, Math.min(maxY, dragInfoRef.current.initialY + dy));

      setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already released
    }

    if (!dragInfoRef.current.hasMoved) {
      onClick();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const maxX = Math.max(10, window.innerWidth - 120);
        const maxY = Math.max(10, window.innerHeight - 150);
        return {
          x: Math.max(10, Math.min(maxX, prev.x)),
          y: Math.max(10, Math.min(maxY, prev.y)),
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dynamicStyle: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        right: 'auto',
      }
    : {};

  return (
    <aside
      ref={asideRef}
      aria-label="Ask AI Assistant"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={dynamicStyle}
      className={`fixed z-50 flex flex-col items-center select-none touch-none transition-shadow ${
        position ? '' : 'bottom-5 right-5 sm:bottom-6 sm:right-6'
      } ${isDragging ? 'cursor-grabbing scale-105 opacity-90' : 'cursor-grab'}`}
    >
      <div
        className="relative flex flex-col items-center group bg-transparent border-0 p-0 focus:outline-none"
        title={isOpen ? 'Drag to move • Click to close' : 'Drag to move anywhere • Click to open AI Chat'}
      >
        {/* Cute Floating "Ask AI Chat" speech pill over Robot head */}
        <div className="mb-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] hover:bg-[#F4ECE0] border border-white/95 shadow-[0_4px_12px_rgba(120,95,70,0.18),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-1.5 transform group-hover:scale-105 transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold text-[#2C241E] font-sans tracking-tight">Ask AI Chat</span>
        </div>

        {/* Animated 3D Robot Figurine in Live Floating Motion inside Claymorphic Capsule */}
        <div className="relative w-22 sm:w-26 h-28 sm:h-32 rounded-[28px] p-1 bg-[#FAF6F0] border-2 border-white/95 shadow-[0_12px_28px_rgba(120,95,70,0.22),-4px_-4px_16px_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(255,255,255,0.95)] overflow-hidden flex items-center justify-center animate-bot-float group-hover:scale-105 transition-transform duration-300">
          <img
            src={aiBotImg}
            alt="Ask AI Chat"
            draggable={false}
            className="w-full h-full object-cover object-[50%_16%] rounded-[24px] pointer-events-none"
          />
          {/* Glowing Amber Visor Halo Aura */}
          <div className="absolute top-2 w-12 h-12 rounded-full bg-amber-400/25 blur-md pointer-events-none animate-pulse" />
        </div>

        {/* Dynamic 3D Ground Shadow that scales with the float */}
        <div className="w-14 h-2.5 rounded-full bg-black/20 blur-[2px] animate-bot-shadow -mt-1" />
      </div>
    </aside>
  );
}
