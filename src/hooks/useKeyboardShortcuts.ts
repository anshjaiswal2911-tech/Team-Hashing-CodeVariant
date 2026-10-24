import { useEffect } from 'react';

interface ShortcutMap {
  [key: string]: () => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutMap) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Avoid hotkeys when typing in input or textarea
      const target = event.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      // Allow Escape even inside input
      if (event.key === 'Escape' && shortcuts['Escape']) {
        event.preventDefault();
        shortcuts['Escape']();
        return;
      }

      if (isInput) return;

      // Check Meta/Ctrl combinations
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && shortcuts['meta+k']) {
        event.preventDefault();
        shortcuts['meta+k']();
        return;
      }

      if (shortcuts[event.key]) {
        event.preventDefault();
        shortcuts[event.key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
