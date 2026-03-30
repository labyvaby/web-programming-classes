import { useEffect, useState } from 'react';
import { loadMedia } from '../services/mediaStorage';

/**
 * Resolves a media URL:
 * - "idb:<key>" → loads data URL from IndexedDB
 * - any other string → returns as-is
 * - undefined/null → returns null
 */
export function useMediaUrl(url: string | undefined | null): string | null {
  const [resolved, setResolved] = useState<string | null>(() => {
    if (!url) return null;
    if (url.startsWith('idb:')) return null;
    return url;
  });

  useEffect(() => {
    if (!url) {
      setResolved(null);
      return;
    }
    if (!url.startsWith('idb:')) {
      setResolved(url);
      return;
    }
    const key = url.slice(4);
    let cancelled = false;
    loadMedia(key).then((data) => {
      if (!cancelled) setResolved(data);
    }).catch(() => {
      if (!cancelled) setResolved(null);
    });
    return () => { cancelled = true; };
  }, [url]);

  return resolved;
}
