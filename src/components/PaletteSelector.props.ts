export type PaletteType = 'Burg' | 'OrYel' | 'Teal' | 'Purp' | 'Sunset';

export type Palette = Record<PaletteType, string[]>;

export interface PaletteSelectorProps {
  value: PaletteType;
  onChange: (palette: PaletteType) => void;
}
