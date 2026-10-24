import React from 'react';

interface KbdShortcutProps {
  shortcut: string;
  description?: string;
  className?: string;
}

export const KbdShortcut: React.FC<KbdShortcutProps> = ({
  shortcut,
  description,
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {description && (
        <span className="text-xs text-on-surface-variant font-sans">{description}</span>
      )}
      <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-[10px] font-mono border border-outline-variant/70 shadow-inner tracking-wider">
        {shortcut}
      </kbd>
    </span>
  );
};
