import React, { useState } from 'react';
import { modernizeLegacySnippet } from '../../utils/astModernizer';

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
  const [viewMode, setViewMode] = useState<'raw' | 'modernized'>('modernized');
  const [copied, setCopied] = useState(false);

  const { modernCode, report } = modernizeLegacySnippet(code);
  const activeCode = viewMode === 'modernized' ? modernCode : code;
  const lines = activeCode.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl border border-outline-variant/70 bg-surface-container-lowest overflow-hidden shadow-lg font-mono text-xs ${className}`}>
      {/* File Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-surface-container border-b border-outline-variant/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary">data_object</span>
          <span className="font-semibold text-on-surface">{filename}</span>
          {exportName && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-mono">
              export {exportName}
            </span>
          )}
        </div>

        {/* View Mode Toggle Pill (Raw vs Modernized) */}
        <div className="flex items-center gap-1.5 bg-surface-container-high/60 p-1 rounded-lg border border-outline-variant/50">
          <button
            type="button"
            onClick={() => setViewMode('raw')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
              viewMode === 'raw'
                ? 'bg-surface-container-highest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Preserved Raw
          </button>
          <button
            type="button"
            onClick={() => setViewMode('modernized')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
              viewMode === 'modernized'
                ? 'bg-secondary text-on-secondary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[11px]">bolt</span>
            <span>2026 Transmuted</span>
          </button>
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
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Modernization Metadata Pill */}
      {viewMode === 'modernized' && (
        <div className="px-4 py-2 bg-secondary/10 border-b border-secondary/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-secondary font-semibold">
            <span className="material-symbols-outlined text-xs">code</span>
            <span>AST Modernization Score: {report.score}%</span>
            <span className="text-on-surface-variant font-normal">• Edge Runtime Ready</span>
          </div>
          <span className="text-[10px] text-outline">
            {report.transformations[0]}
          </span>
        </div>
      )}

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
