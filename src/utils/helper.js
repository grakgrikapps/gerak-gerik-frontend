export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function getYouTubeIdFromEmbedUrl(url) {
  const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
  return match ? match[1] : null;
}
