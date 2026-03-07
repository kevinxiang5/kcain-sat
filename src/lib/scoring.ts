export type Section = "math" | "reading_writing";

// Digital SAT style: each section 200–800, total 400–1600.
// This is an approximation that maps raw score percentage to the scaled band.
export function estimateSectionScore(rawCorrect: number, maxRaw: number, section: Section): number {
  if (maxRaw <= 0 || Number.isNaN(rawCorrect)) return 200;
  const clamped = Math.max(0, Math.min(rawCorrect, maxRaw));
  const p = clamped / maxRaw;

  // Base linear scale from 200 to 800
  let scaled = 200 + Math.round(600 * p);

  // Slight curve at the top end to better match official score bands:
  // make very high raw scores a bit more rewarding.
  if (p > 0.9) {
    const extra = Math.round(20 * (p - 0.9) * 10); // up to ~20 extra points near perfect
    scaled += extra;
  }

  // Clamp to 200–800
  if (scaled < 200) scaled = 200;
  if (scaled > 800) scaled = 800;

  return scaled;
}

