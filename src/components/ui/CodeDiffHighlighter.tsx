import React, { useState } from 'react';

interface CodeDiffLine {
  type: 'add' | 'delete' | 'context';
  text: string;
}

interface CodeDiffHighlighterProps {
  filename?: string;
  lines: CodeDiffLine[];
  className?: string;
}

export const CodeDiffHighlighter: React.FC<CodeDiffHighlighterProps> = ({
  filename,
  lines,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const rawText = lines.map((l) => `${l.type === 'add' ? '+' : l.type === 'delete' ? '-' : ' '} ${l.text}`).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl border border-outline-variant/70 bg-surface-container-lowest overflow-hidden font-mono text-xs shadow-md ${className}`}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-container border-b border-outline-variant/60 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span className="font-semibold text-on-surface">{filename}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-xs">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}

      <div className="p-3 overflow-x-auto space-y-0.5">
        {lines.map((line, idx) => {
          const isAdd = line.type === 'add';
          const isDel = line.type === 'delete';
          const bg = isAdd
            ? 'bg-secondary/15 text-secondary'
            : isDel
            ? 'bg-error-container/60 text-error'
            : 'text-on-surface-variant';
          const prefix = isAdd ? '+' : isDel ? '-' : ' ';

          return (
            <div key={idx} className={`flex items-center gap-2 px-2 py-0.5 rounded font-mono ${bg}`}>
              <span className="w-4 select-none opacity-50 font-bold">{prefix}</span>
              <span className="w-6 select-none opacity-30 text-right">{idx + 1}</span>
              <span className="flex-1 whitespace-pre">{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
