import React, { useState } from 'react';

interface CodeBundlePreviewProps {
  filename: string;
  code: string;
  language?: string;
  exportName?: string;
  className?: string;
}

export const CodeBundlePreview: React.FC<CodeBundlePreviewProps> = ({
  filename,
  code,
  language = 'typescript',
  exportName,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`rounded-2xl border border-outline-variant/70 bg-surface-container-lowest overflow-hidden shadow-lg font-mono text-xs ${className}`}>
      {/* File Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-container border-b border-outline-variant/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary">data_object</span>
          <span className="font-semibold text-on-surface">{filename}</span>
          {exportName && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-mono">
              export {exportName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[11px] font-mono border border-outline-variant/50 transition-all hover:scale-105 active:scale-95"
            title="Copy snippet to clipboard"
          >
            <span className="material-symbols-outlined text-xs">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Code viewport with line numbers */}
      <div className="p-3 max-h-72 overflow-y-auto overflow-x-auto space-y-0.5">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-start gap-3 group hover:bg-surface-container/40 rounded px-1">
            <span className="w-6 select-none opacity-30 text-right font-mono text-[11px] group-hover:opacity-60">
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre text-on-surface/90 font-mono">
              {line || ' '}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
