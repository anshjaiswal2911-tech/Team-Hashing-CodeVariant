import React, { useState, useEffect, useRef } from 'react';
import { ProjectSpecimen } from '../../types';
import aiBotImg from '../../assets/ai-bot.png';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  actions?: {
    label: string;
    icon: string;
    actionType: 'salvage' | 'revival' | 'compass';
  }[];
}

interface ProjectAiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  specimen: ProjectSpecimen | null;
  allSpecimens: ProjectSpecimen[];
  onSelectSpecimen: (specimen: ProjectSpecimen) => void;
  onNavigateToRevival?: (specimen: ProjectSpecimen) => void;
  onNavigateToSalvage?: () => void;
  onReplayIntro?: () => void;
}

export const ProjectAiChatbot: React.FC<ProjectAiChatbotProps> = ({
  isOpen,
  onClose,
  specimen,
  allSpecimens,
  onSelectSpecimen,
  onNavigateToRevival,
  onNavigateToSalvage,
  onReplayIntro,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // Active specimen fallback
  const currentSpecimen = specimen || allSpecimens[0];

  // Initialize or update greeting when specimen changes
  useEffect(() => {
    if (!currentSpecimen) return;

    const initialGreeting: Message = {
      id: `welcome-${currentSpecimen.id}`,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Hello! I am your **Conservatory Forensic Copilot**. I have loaded the complete archival autopsy and AST nodes for **${currentSpecimen.title}** (${currentSpecimen.category} • ${currentSpecimen.specimenNumber}).\n\nI can answer questions regarding why this project was abandoned, which zero-dependency code modules you can salvage, or produce an AI revival blueprint. What would you like to explore?`,
      actions: [
        { label: 'Why did this fail?', icon: 'search', actionType: 'compass' },
        { label: 'View Salvageable Modules', icon: 'inventory_2', actionType: 'salvage' },
        { label: 'Generate 2-Hr Revival Plan', icon: 'explore', actionType: 'revival' },
      ],
    };

    setMessages([initialGreeting]);
  }, [currentSpecimen?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Generate contextual AI answers based on the specimen's real data
  const generateAiResponse = (userPrompt: string): Message => {
    const promptLower = userPrompt.toLowerCase();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Failure / Root Cause / Demise
    if (
      promptLower.includes('why') ||
      promptLower.includes('fail') ||
      promptLower.includes('kyu') ||
      promptLower.includes('cause') ||
      promptLower.includes('reason') ||
      promptLower.includes('dormant') ||
      promptLower.includes('abandon')
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeNow,
        text: `### 🔍 Forensic Autopsy Report: ${currentSpecimen.title}\n\n**Primary Root Cause:** **${currentSpecimen.causeCategory}**\n${currentSpecimen.rootCause}\n\n**Unfinished Technical Trails:**\n${currentSpecimen.unfinishedNotes}\n\n**Curatorial Verdict:**\n> "${currentSpecimen.curatorAnalysis}"\n\n**Key Takeaway:** The idea did not fail due to a defective premise, but due to friction during the final 38% execution phase. It is currently vaulted with **${currentSpecimen.completionPercentage}% completion preserved**.`,
        actions: [
          { label: 'Calculate Revival Viability', icon: 'explore', actionType: 'revival' },
          { label: 'Inspect Salvage Modules', icon: 'inventory_2', actionType: 'salvage' },
        ],
      };
    }

    // 2. Salvageable Modules / Reuse / Code
    if (
      promptLower.includes('salvage') ||
      promptLower.includes('module') ||
      promptLower.includes('reuse') ||
      promptLower.includes('extract') ||
      promptLower.includes('component') ||
      promptLower.includes('code')
    ) {
      const moduleList = currentSpecimen.preservedSalvageModules
        .map((m, i) => `${i + 1}. **${m.name}** (Icon: \`${m.icon}\`) — Cleansed of private API keys.`)
        .join('\n');

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeNow,
        text: `### 🌾 Salvage Yard Extraction: ${currentSpecimen.title}\n\nWe have indexed **${currentSpecimen.preservedSalvageModules.length} reusable modules** with **${currentSpecimen.salvageViability.level}** viability:\n\n${moduleList}\n\nHere is a zero-dependency excerpt ready to graft into your current application:`,
        codeSnippet: {
          language: 'typescript',
          filename: `${currentSpecimen.title.replace(/\s+/g, '')}Module.ts`,
          code: `// Extracted from ${currentSpecimen.title} (${currentSpecimen.specimenNumber})\n// Sanitized of proprietary credentials • Ready for graft\n\nexport interface PreservedConfig {\n  specimenId: "${currentSpecimen.id}";\n  category: "${currentSpecimen.category}";\n  completionVelocity: ${currentSpecimen.completionPercentage};\n}\n\nexport async function initializeModule(config: PreservedConfig) {\n  console.log("Grafting ${currentSpecimen.title} module into new canvas...");\n  return {\n    status: "active",\n    harvestedDate: "${new Date().toISOString()}",\n    reclaimedHours: 18,\n  };\n}`,
        },
        actions: [
          { label: 'Go to Salvage Yard', icon: 'inventory_2', actionType: 'salvage' },
          { label: 'Start Revival Compass', icon: 'explore', actionType: 'revival' },
        ],
      };
    }

    // 3. Revival / How to Revive / 2-Hour Sprint
    if (
      promptLower.includes('revive') ||
      promptLower.includes('revival') ||
      promptLower.includes('sprint') ||
      promptLower.includes('plan') ||
      promptLower.includes('roadmap') ||
      promptLower.includes('kaise') ||
      promptLower.includes('how')
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeNow,
        text: `### 🧭 120-Minute Revival Blueprint\n\n**Revival Viability Score:** **${currentSpecimen.revivalScore}/100 (${currentSpecimen.status === 'prime-candidate' ? 'Prime Candidate' : 'High Potential'})**\n\n**Recommended 2-Hour Focus Roadmap:**\n\n1. **Minutes 00–25 [Prune Dead Limbs]:** Remove unmaintained dependencies from \`${currentSpecimen.techStack.join(', ')}\` and clean configuration.\n2. **Minutes 25–65 [Core Circuit Repair]:** Resolve the unfinished trail: *"${currentSpecimen.unfinishedNotes}"*.\n3. **Minutes 65–95 [Graft Modern UI]:** Apply the responsive Neo-Tactile / Galactic Glass tokens to the primary workflow.\n4. **Minutes 95–120 [Deploy & Verify]:** Ship to staging with live client-side validation.\n\n*Estimated engineering hours saved by revival: ~48 dev hours.*`,
        actions: [
          { label: 'Launch 2-Hour Graft Sprint Modal', icon: 'timer', actionType: 'revival' },
        ],
      };
    }

    // 4. Tech Stack & Modernization
    if (
      promptLower.includes('tech') ||
      promptLower.includes('stack') ||
      promptLower.includes('modern') ||
      promptLower.includes('migrate')
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeNow,
        text: `### 🛠️ Architecture & Tech Stack Modernization\n\n**Preserved Legacy Stack:**\n${currentSpecimen.techStack.map((t) => `• \`${t}\``).join('\n')}\n\n**2026 Recommended Upgrade Path:**\n• Replace bundler with **Vite 8 + React 19** for instant HMR.\n• Switch styling to **Tailwind CSS v4** tokenized CSS variables.\n• Replace legacy backend with **Supabase Edge Functions** or local SQLite vector storage.\n• Integrate **Gemini Nano / WebLLM** for local client-side inference.`,
      };
    }

    // 5. Default Curatorial Assistant Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      timestamp: timeNow,
      text: `Regarding **${currentSpecimen.title}**:\n\n${currentSpecimen.curatorAnalysis}\n\n• **Folio:** ${currentSpecimen.folioNumber}\n• **Category:** ${currentSpecimen.category}\n• **Buried:** ${currentSpecimen.buriedDate} (${currentSpecimen.dormantDuration})\n• **Completion Level:** ${currentSpecimen.completionPercentage}%\n• **Viability Score:** ${currentSpecimen.revivalScore}/100\n\nYou can ask me specific technical questions like *"Why did this fail?"*, *"Show me the salvageable code"*, or *"Generate a 2-hour revival roadmap"*.`,
      actions: [
        { label: 'Why did this fail?', icon: 'help_outline', actionType: 'compass' },
        { label: 'Salvage Code Bricks', icon: 'inventory_2', actionType: 'salvage' },
      ],
    };
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage.trim(),
    };

    const promptText = inputMessage.trim();
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic AI thought deliberation
    setTimeout(() => {
      const aiReply = generateAiResponse(promptText);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (actionType: 'salvage' | 'revival' | 'compass') => {
    if (actionType === 'revival' && onNavigateToRevival) {
      onNavigateToRevival(currentSpecimen);
    } else if (actionType === 'salvage' && onNavigateToSalvage) {
      onNavigateToSalvage();
    } else {
      // Trigger prompt
      setInputMessage('Explain the exact reasons why this project was vaulted.');
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dim backdrop when maximized or on mobile */}
      {(isMaximized || (typeof window !== 'undefined' && window.innerWidth < 640)) && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => {
            if (isMaximized) setIsMaximized(false);
            else onClose();
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          Bottom-Right Anchored AI Forensic Copilot (Large & Expandable)
         ───────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed z-50 bg-surface-container/95 backdrop-blur-2xl flex flex-col shadow-[-12px_24px_60px_rgba(0,0,0,0.35)] border border-outline-variant/80 transition-all duration-300 ease-out overflow-hidden ${
          isMaximized
            ? 'inset-3 sm:inset-6 rounded-3xl'
            : 'bottom-22 right-4 sm:right-6 w-[95vw] sm:w-[460px] md:w-[500px] lg:w-[540px] max-h-[calc(100vh-105px)] h-[660px] rounded-[28px] animate-in slide-in-from-bottom-6 zoom-in-95'
        }`}
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* 1. Tool Window Top Bar (Android Studio / Antigravity Style) */}
        <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant/60 flex items-center justify-between gap-2 flex-shrink-0 cursor-default select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#DE8553]/40 shadow-sm flex-shrink-0 flex items-center justify-center">
              <img
                src={aiBotImg}
                alt="AI Copilot"
                className="w-full h-full object-cover object-[50%_15%]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-sm font-semibold text-on-surface truncate">
                  AI Forensic Copilot
                </span>
                <span className="px-1.5 py-0.2 rounded bg-primary-container text-on-primary-container font-mono text-[9px] font-bold uppercase">
                  ACTIVE
                </span>
              </div>
              <div className="font-sans text-[11px] text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="truncate">Context: {currentSpecimen.title}</span>
              </div>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-surface-container transition-colors"
                title="Meet Our AI Agent (Showcase)"
              >
                <span className="material-symbols-outlined text-base">neurology</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMessages([])}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Clear Conversation History"
            >
              <span className="material-symbols-outlined text-base">delete_sweep</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMaximized((prev) => !prev)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title={isMaximized ? 'Restore Window (Bottom Right)' : 'Maximize Copilot (Full Screen)'}
            >
              <span className="material-symbols-outlined text-base">
                {isMaximized ? 'close_fullscreen' : 'open_in_full'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Minimize Copilot Window"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* 2. Specimen Context Switcher Strip */}
        <div className="px-4 py-2 bg-surface-container-high/60 border-b border-outline-variant/40 flex items-center justify-between gap-2 text-xs flex-shrink-0">
          <div className="flex items-center gap-1.5 min-w-0 text-[11px]">
            <span className="material-symbols-outlined text-secondary text-sm flex-shrink-0">
              folder_zip
            </span>
            <span className="font-mono text-on-surface-variant flex-shrink-0">Specimen:</span>
            <select
              value={currentSpecimen.id}
              onChange={(e) => {
                const found = allSpecimens.find((s) => s.id === e.target.value);
                if (found) onSelectSpecimen(found);
              }}
              className="bg-surface-container-high border border-outline-variant/60 rounded-md px-2 py-0.5 text-[11px] font-semibold text-on-surface focus:outline-none focus:border-primary truncate max-w-[200px]"
            >
              {allSpecimens.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.title} ({spec.specimenNumber})
                </option>
              ))}
            </select>
          </div>

          <span className="font-mono text-[10px] text-secondary font-bold flex-shrink-0">
            {currentSpecimen.revivalScore}% Viable
          </span>
        </div>

        {/* 3. Quick Suggested Action Chips */}
        <div className="px-4 py-2 border-b border-outline-variant/30 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 bg-surface-container/40">
          <button
            type="button"
            onClick={() => {
              setInputMessage('Why did this project fail? What was the cause of death?');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface text-[10px] font-medium whitespace-nowrap border border-outline-variant/50 transition-all shadow-xs flex items-center gap-1"
          >
            <span>🔍 Cause of Demise</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInputMessage('What reusable code modules can I salvage right now?');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface text-[10px] font-medium whitespace-nowrap border border-outline-variant/50 transition-all shadow-xs flex items-center gap-1"
          >
            <span>🌾 Salvageable Bricks</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInputMessage('Generate a 120-minute revival plan for this project.');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface text-[10px] font-medium whitespace-nowrap border border-outline-variant/50 transition-all shadow-xs flex items-center gap-1"
          >
            <span>🧭 2-Hour Plan</span>
          </button>
        </div>

        {/* 4. Scrollable Chat Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              } space-y-1.5`}
            >
              {/* Message Header */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant px-1">
                {msg.sender === 'assistant' ? (
                  <>
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-[#FAF6F0] border border-[#DE8553]/40 shadow-xs inline-block shrink-0 flex items-center justify-center">
                      <img
                        src={aiBotImg}
                        alt="AI Bot"
                        className="w-full h-full object-cover object-[50%_15%]"
                      />
                    </div>
                    <span className="font-bold text-on-surface">AI Curator</span>
                  </>
                ) : (
                  <span>You</span>
                )}
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-xs font-medium'
                    : 'clay-card bg-surface-container-low border border-outline-variant/60 text-on-surface rounded-tl-xs'
                }`}
              >
                {/* Formatted Markdown-style Content */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className="font-serif text-sm font-bold text-secondary">
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote
                          key={pIdx}
                          className="pl-2.5 border-l-2 border-secondary/60 italic text-on-surface-variant font-serif text-[11px]"
                        >
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                {/* Formatted Code Block (if attached) */}
                {msg.codeSnippet && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-outline-variant/80 bg-surface-container-lowest">
                    <div className="px-3 py-1.5 bg-surface-container-high/70 border-b border-outline-variant/60 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-secondary font-bold">{msg.codeSnippet.filename}</span>
                      <button
                        type="button"
                        onClick={() => copyCode(msg.codeSnippet!.code, msg.id)}
                        className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedCodeId === msg.id ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedCodeId === msg.id ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="p-3 overflow-x-auto text-[11px] font-mono text-on-surface bg-surface-container-lowest/80 leading-snug">
                      <code>{msg.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Quick Action Chips inside AI response */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-2 border-t border-outline-variant/40">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => handleActionClick(act.actionType)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-high/80 hover:bg-surface-container text-on-surface font-sans text-[10px] font-semibold flex items-center gap-1 border border-outline-variant/50 transition-all hover:scale-[1.02]"
                      >
                        <span className="material-symbols-outlined text-xs text-primary">
                          {act.icon}
                        </span>
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface-variant w-fit animate-pulse">
              <span className="material-symbols-outlined text-sm text-primary animate-spin">
                progress_activity
              </span>
              <span className="font-mono text-[11px]">
                Analyzing AST nodes for {currentSpecimen.title}...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 5. Rich Input Dock (Android Studio / Antigravity Style) */}
        <div className="p-3 sm:p-4 bg-surface-container-low border-t border-outline-variant/60 flex-shrink-0 space-y-2">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask about ${currentSpecimen.title}... (e.g. why did this fail?)`}
              className="w-full pl-3.5 pr-11 py-2.5 rounded-xl neo-tactile-well text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-1.5 w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant px-1">
            <span>Press Enter to send</span>
            <span className="text-secondary font-semibold">
              Folio #{currentSpecimen.folioNumber}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
