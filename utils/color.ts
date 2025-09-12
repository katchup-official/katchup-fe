export const withAlpha = (hex: string, alpha: number) => {
  const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const a = clamp(alpha);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};