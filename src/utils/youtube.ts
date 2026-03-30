export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1].split('?')[0];
      return u.searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
}

export function toEmbedUrl(url: string): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}`;
}

export function isYouTubeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'youtu.be' || u.hostname.includes('youtube.com');
  } catch {
    return false;
  }
}
