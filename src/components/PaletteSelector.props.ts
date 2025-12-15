export type PaletteType = 'yellow' | 'orange' | 'red' | 'green' | 'blue';

export type Palette = Record<PaletteType, string[]>;

export const PALETTE_DEFINITIONS: Palette = {
  yellow: ['#fff9c4', '#fff176', '#ffeb3b', '#fbc02d'],
  orange: ['#ffe0b2', '#ffb74d', '#ff9800', '#f57c00'],
  red: ['#ffcdd2', '#e57373', '#f44336', '#c62828'],
  green: ['#c8e6c9', '#81c784', '#4caf50', '#2e7d32'],
  blue: ['#bbdefb', '#42a5f5', '#1976d2', '#0d47a1'],
};

export interface PaletteSelectorProps {
  value: string;
  onChange: (palette: string) => void;
}
