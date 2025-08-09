export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function getYouTubeIdFromEmbedUrl(url) {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:embed\/|shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  return match ? match[1] : null;
}