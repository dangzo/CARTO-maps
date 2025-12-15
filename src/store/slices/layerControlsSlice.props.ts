export interface LayerStyle {
  fillColor: string;
  outlineSize: number;
  outlineColor: string;
  radius: number;
  fillBy: string;
}

export interface LayerControlsState {
  layers: LayerStyle[];
}

export interface UpdatePayload<T> {
  layerIndex: 0 | 1;
  value: T;
}
