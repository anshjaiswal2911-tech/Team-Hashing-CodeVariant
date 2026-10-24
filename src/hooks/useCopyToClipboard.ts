import { useState, useCallback } from 'react';

export const useCopyToClipboard = (resetDelay = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        setError(new Error('Clipboard API unsupported'));
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Copy failed'));
        setCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { copied, error, copy };
};
