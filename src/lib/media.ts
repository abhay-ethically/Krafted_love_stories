export interface MediaItem {
  filename: string;
  post_id: string;
  user_id: string;
  seq: string;
  ext: 'jpg' | 'mp4';
  thumb?: string;
  lqip?: string;
  alt?: string;
  group?: MediaItem[];
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const raw: MediaItem[] = require('./media.json');

let _cache: MediaItem[] | null = null;

export async function getMedia(): Promise<MediaItem[]> {
  if (_cache) return _cache;
  _cache = raw.map((m) => ({
    ...m,
    alt: m.alt || `krafted Love Stories – photo ${m.post_id}`,
    thumb: m.thumb || `/images/original/${m.filename}`,
    lqip: m.lqip || 'data:image/webp;base64,',
  }));
  return _cache;
}

export async function getMediaBySlug(slug: string): Promise<(MediaItem & { group: MediaItem[] }) | null> {
  const [post_id, user_id] = slug.split('_u_');
  const media = await getMedia();
  const group = media.filter((m) => m.post_id === post_id && m.user_id === user_id);
  if (!group.length) return null;
  const video = group.find((m) => m.ext === 'mp4');
  if (video) return { ...video, group };
  return { ...group[0], group };
}

export async function getAllSlugs(): Promise<string[]> {
  const media = await getMedia();
  const seen = new Set<string>();
  for (const m of media) {
    seen.add(`${m.post_id}_u_${m.user_id}`);
  }
  return Array.from(seen);
}

export async function getFeatured(): Promise<MediaItem[]> {
  const media = await getMedia();
  return media.filter((m) => m.ext === 'jpg').slice(0, 8);
}
