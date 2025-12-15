/**
 * Converts a hex color string to an RGB tuple.
 * @param hex - The hex color string (e.g., '#ff5733').
 * @returns A tuple representing the RGB values.
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const bigint = parseInt(hex.replace('#', ''), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};
