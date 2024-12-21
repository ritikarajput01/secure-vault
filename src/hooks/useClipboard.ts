import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 3000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [timeout]);

  return { copied, copyToClipboard };
};