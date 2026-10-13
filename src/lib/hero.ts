/* The hero photo is the largest thing on the first screen, so a page builds it
   once here and hands the result to both the layout (for the preload hint) and
   the Hero component (for the picture itself). */

import { getImage } from 'astro:assets';
import { photo, type PhotoId } from '../data/photos';

export interface HeroImage {
  alt: string;
  width: number;
  height: number;
  sizes: string;
  avif: string;
  webp: string;
  fallback: string;
  preload: { srcset: string; sizes: string; type: string };
}

const WIDTHS = [420, 640, 828, 1080, 1440];

export async function heroImage(id: PhotoId, opts: { ratio?: number; focus?: string; sizes?: string } = {}): Promise<HeroImage> {
  const p = photo(id);
  const native = p.src.width / p.src.height;
  const ratio = opts.ratio ?? native;
  const sizes = opts.sizes ?? '(min-width: 56rem) 60vw, 100vw';
  const widths = WIDTHS.filter((w) => w <= p.src.width);

  const build = async (format: 'avif' | 'webp' | 'jpeg', quality: number) => {
    const out = await Promise.all(
      widths.map(async (w) => {
        const img = await getImage({ src: p.src, width: w, height: Math.round(w / ratio), format, quality, fit: 'cover', position: opts.focus ?? 'center' });
        return `${img.src} ${w}w`;
      }),
    );
    return out.join(', ');
  };

  const [avif, webp] = await Promise.all([build('avif', 46), build('webp', 62)]);
  const last = widths[widths.length - 1];
  const mid = widths[Math.min(2, widths.length - 1)];
  const fb = await getImage({ src: p.src, width: mid, height: Math.round(mid / ratio), format: 'jpeg', quality: 70, fit: 'cover', position: opts.focus ?? 'center' });
  const fallback = fb.src;

  return {
    alt: p.alt,
    width: last,
    height: Math.round(last / ratio),
    sizes,
    avif,
    webp,
    fallback,
    preload: { srcset: avif, sizes, type: 'image/avif' },
  };
}
