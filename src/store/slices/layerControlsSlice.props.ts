import type { PaletteType } from '@/components/PaletteSelector.props';

export interface LayerStyle {
  fillColor: string;
  outlineSize: number;
  outlineColor: string;
  radius: number;
  fillBy: string;
  palette: PaletteType;
}

export interface LayerControlsState {
  layers: LayerStyle[];
}

export interface UpdatePayload<T> {
  layerIndex: 0 | 1;
  value: T;
}
