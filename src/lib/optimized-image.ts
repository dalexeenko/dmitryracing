/** Widths accepted by worker `handleImageOptimization` (device + image presets). */
const GALLERY_WIDTHS = [256, 384, 640] as const;
const LIGHTBOX_WIDTHS = [1080, 1920] as const;

export function vinextImageUrl(path: string, w: number, q = 75): string {
  const u = encodeURIComponent(path);
  return `/_vinext/image?url=${u}&w=${w}&q=${q}`;
}

export function galleryThumbSrcSet(path: string, q = 75): string {
  return GALLERY_WIDTHS.map((w) => `${vinextImageUrl(path, w, q)} ${w}w`).join(", ");
}

export const galleryThumbSizes =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export function lightboxSrcSet(path: string, q = 80): string {
  return LIGHTBOX_WIDTHS.map((w) => `${vinextImageUrl(path, w, q)} ${w}w`).join(", ");
}

export const lightboxSizes = "(max-width: 1024px) 100vw, min(92vw, 1920px)";
