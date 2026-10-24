import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUp, Check, ChevronDown, Clock3, Compass, Copy, Info, LoaderCircle, Maximize2, Minimize2, Package, RotateCcw, Search, X } from 'lucide-react';
import type { ProjectSpecimen } from '../../types';
import aiBotImg from '../../assets/ai-bot.png';
import { ChatMessageContent } from './ChatMessageContent';
import { createArchiveReply, createGreeting, createMessage, type ChatAction, type ChatMessage } from './chatMessages';
import styles from './ProjectAiChatbot.module.css';

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

const suggestions = [
  { icon: Search, title: 'Why did it stall?', detail: 'Understand the recorded blockers', prompt: 'Why did this project stall?' },
  { icon: Package, title: 'Find reusable work', detail: 'Review the preserved modules', prompt: 'What modules can I salvage?' },
  { icon: Clock3, title: 'Plan a two-hour restart', detail: 'Turn the archive into a next step', prompt: 'Create a two-hour revival plan.' },
];
const actionIcons = { salvage: Package, revival: Compass, cause: Search };

export function ProjectAiChatbot({ isOpen, onClose, specimen, allSpecimens, onSelectSpecimen, onNavigateToRevival, onNavigateToSalvage, onReplayIntro }: ProjectAiChatbotProps) {
  const currentSpecimen = allSpecimens.find((project) => project.id === specimen?.id) || allSpecimens[0];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationProject, setConversationProject] = useState<string>();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingReply = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestProjectId = useRef(currentSpecimen?.id);
  latestProjectId.current = currentSpecimen?.id;
  const isModal = isMobile || isMaximized;
  const visibleMessages = conversationProject === currentSpecimen?.id ? messages : [];
  const hasConversation = visibleMessages.some((message) => message.sender === 'user');

  const cancelReply = () => {
    if (pendingReply.current !== null) clearTimeout(pendingReply.current);
    pendingReply.current = null;
  };

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    cancelReply();
    setConversationProject(currentSpecimen?.id);
    setMessages(currentSpecimen ? [createGreeting(currentSpecimen)] : []);
    setInputMessage(''); setIsTyping(false); setCopiedCodeId(null); setCopyError(false);
    if (copyTimer.current !== null) clearTimeout(copyTimer.current);
    return cancelReply;
  }, [currentSpecimen?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    inputRef.current?.focus({ preventScroll: true });
    return () => { previousFocus?.focus({ preventScroll: true }); };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isModal) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [isOpen, isModal]);

  useEffect(() => () => { cancelReply(); if (copyTimer.current !== null) clearTimeout(copyTimer.current); }, []);

  useEffect(() => {
    const feed = feedRef.current;
    if (!isOpen || !feed) return;
    const newestMessage = messages[messages.length - 1];
    const newestArticle = feed.querySelector<HTMLElement>('article:last-of-type');
    // Long replies open at their beginning so the assessment can be read in order.
    feed.scrollTop = newestMessage?.sender === 'assistant' && newestArticle && messages.length > 1
      ? Math.max(0, newestArticle.offsetTop - 12)
      : feed.scrollHeight;
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const input = inputRef.current;
    if (input) { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 132)}px`; }
  }, [inputMessage, isOpen]);

  function resetConversation() {
    cancelReply();
    setMessages(currentSpecimen ? [createGreeting(currentSpecimen)] : []);
    setIsTyping(false); setInputMessage(''); setCopiedCodeId(null); setCopyError(false);
    inputRef.current?.focus();
  }

  function sendMessage(prompt = inputMessage) {
    const text = prompt.trim();
    if (!text || !currentSpecimen || pendingReply.current !== null) return;
    const project = currentSpecimen;
    setMessages((previous) => [...previous, createMessage('user', text)]);
    setInputMessage(''); setIsTyping(true); setCopyError(false);
    pendingReply.current = setTimeout(() => {
      pendingReply.current = null;
      if (latestProjectId.current !== project.id) return;
      setMessages((previous) => [...previous, createArchiveReply(text, project)]);
      setIsTyping(false);
    }, 450);
    inputRef.current?.focus({ preventScroll: true });
  }

  function handleAction(action: ChatAction) {
    if (action === 'revival' && currentSpecimen && onNavigateToRevival) { onNavigateToRevival(currentSpecimen); onClose(); }
    else if (action === 'salvage' && onNavigateToSalvage) { onNavigateToSalvage(); onClose(); }
    else sendMessage(action === 'salvage' ? 'Show the preserved modules.' : action === 'revival' ? 'Create a revival plan.' : 'Why did this project stall?');
  }

  async function copyCode(message: ChatMessage) {
    if (!message.codeSnippet) return;
    setCopiedCodeId(null);
    try {
      await navigator.clipboard.writeText(message.codeSnippet.code);
      setCopiedCodeId(message.id); setCopyError(false);
      if (copyTimer.current !== null) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedCodeId(null), 2000);
    } catch { setCopyError(true); }
  }

  function handlePanelKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); }
    if (event.key !== 'Tab' || !isModal) return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]');
    if (!focusable?.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  if (!isOpen) return null;
  return <>
    <div className={styles.backdrop} data-expanded={isMaximized} onClick={onClose} aria-hidden="true" />
    <div ref={panelRef} role="dialog" aria-modal={isModal || undefined} aria-labelledby="copilot-title" aria-describedby="copilot-description"
      className={`${styles.panel} ${isMaximized ? styles.expanded : ''}`} onKeyDown={handlePanelKey}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <img src={aiBotImg} alt="" className={styles.avatar} />
          <div className={styles.identityText}><h2 id="copilot-title">Forensic copilot</h2><p id="copilot-description">A fresh look at unfinished work</p></div>
        </div>
        <div className={styles.controls}>
          {onReplayIntro && <button type="button" onClick={() => { onClose(); onReplayIntro(); }} aria-label="About your assistant" title="About your assistant"><Info size={17} aria-hidden="true" /></button>}
          <button type="button" onClick={resetConversation} aria-label="New conversation" title="New conversation"><RotateCcw size={17} aria-hidden="true" /></button>
          <button type="button" onClick={() => setIsMaximized((previous) => !previous)} aria-label={isMaximized ? 'Restore chat window' : 'Expand chat window'} title={isMaximized ? 'Restore chat window' : 'Expand chat window'} className={styles.expandControl}>{isMaximized ? <Minimize2 size={17} aria-hidden="true" /> : <Maximize2 size={17} aria-hidden="true" />}</button>
          <button type="button" onClick={onClose} aria-label="Close assistant" title="Close assistant"><X size={20} aria-hidden="true" /></button>
        </div>
      </header>

      {currentSpecimen ? <>
        <div className={styles.context}>
          <div className={styles.projectPicker}>
            <label htmlFor="copilot-project">Project context</label>
            <div className={styles.selectWrap}><select id="copilot-project" value={currentSpecimen.id} onChange={(event) => {
              const selected = allSpecimens.find((project) => project.id === event.target.value);
              if (selected) onSelectSpecimen(selected);
            }} aria-describedby="copilot-project-help">{allSpecimens.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></div>
            <span id="copilot-project-help" className={styles.srOnly}>Switching projects starts a fresh conversation.</span>
          </div>
          <div className={styles.score}><span>Revival score</span><strong>{currentSpecimen.revivalScore}<small>/100</small></strong></div>
        </div>

        <div ref={feedRef} className={styles.feed} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text" tabIndex={0}>
          {visibleMessages.map((message) => <article key={message.id} className={message.sender === 'user' ? styles.userMessage : styles.assistantMessage} aria-label={message.sender === 'user' ? 'Your message' : 'Assistant message'}>
            <div className={styles.messageMeta}><span>{message.sender === 'user' ? 'You' : 'Project assistant'}</span><time>{message.timestamp}</time></div>
            <div className={styles.messageBody}>{message.sender === 'user' ? <p className={styles.userText}>{message.text}</p> : <ChatMessageContent text={message.text} />}
              {message.codeSnippet && <div className={styles.codeBlock}>
                <div className={styles.codeHeader}><span>{message.codeSnippet.filename}</span><button type="button" onClick={() => copyCode(message)} aria-label="Copy project context">{copiedCodeId === message.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}{copiedCodeId === message.id ? 'Copied' : 'Copy'}</button></div>
                <pre tabIndex={0}><code>{message.codeSnippet.code}</code></pre>
              </div>}
              {message.actions && <div className={styles.messageActions}>{message.actions.map((action) => {
                const Icon = actionIcons[action.action];
                return <button key={action.label} type="button" onClick={() => handleAction(action.action)} disabled={isTyping}><Icon size={15} aria-hidden="true" /><span>{action.label}</span><ArrowRight size={14} aria-hidden="true" /></button>;
              })}</div>}
            </div>
          </article>)}
          {!hasConversation && <div className={styles.suggestions} aria-label="Suggested questions">{suggestions.map(({ icon: Icon, title, detail, prompt }) => <button key={title} type="button" onClick={() => sendMessage(prompt)} disabled={isTyping}><span className={styles.suggestionIcon}><Icon size={18} strokeWidth={1.7} aria-hidden="true" /></span><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={16} aria-hidden="true" /></button>)}</div>}
          {isTyping && <div className={styles.typing} role="status"><LoaderCircle size={15} className={styles.spinner} aria-hidden="true" /><span>Reviewing project notes...</span></div>}
        </div>

        <footer className={styles.footer}>
          {copyError && <p role="status" className={styles.copyError}>Couldn't copy. You can select the text in the code block instead.</p>}
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className={styles.composer}>
            <label htmlFor="copilot-message" className={styles.srOnly}>Message the project assistant</label>
            <textarea ref={inputRef} id="copilot-message" rows={1} value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} placeholder={`Ask about ${currentSpecimen.title}...`} onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); sendMessage(); }
            }} />
            <button type="submit" disabled={!inputMessage.trim() || isTyping} aria-label="Send message" title="Send message"><ArrowUp size={19} strokeWidth={2} aria-hidden="true" /></button>
          </form>
          <div className={styles.composerHelp}><span>Based on your archived project notes</span><span className={styles.keyboardHelp}>Enter to send <span aria-hidden="true">/</span> Shift + Enter for a new line</span></div>
        </footer>
      </> : <div className={styles.emptyState}><Package size={28} strokeWidth={1.5} aria-hidden="true" /><h3>No projects in your archive yet</h3><p>Preserve a project to give your assistant some context.</p><button type="button" onClick={onClose}>Back to workspace <ArrowRight size={16} aria-hidden="true" /></button></div>}
    </div>
  </>;
}
