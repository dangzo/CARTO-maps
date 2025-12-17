import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LayerStyle, LayerControlsState, UpdatePayload } from './layerControlsSlice.props';
import type { PaletteType } from '@/components/PaletteSelector.props';

export const INITIAL_LAYER_1_STYLE: LayerStyle = {
  fillColor: '#0f87e9',
  outlineSize: 1,
  outlineColor: '#2f3964',
  radius: 3,
  fillBy: 'solid_color',
  palette: 'Purp',
};

export const INITIAL_LAYER_2_STYLE: LayerStyle = {
  fillColor: '#ffcbbb',
  outlineSize: 1,
  outlineColor: '#754314',
  radius: 2,
  fillBy: 'solid_color',
  palette: 'Teal',
};

const initialState: LayerControlsState = {
  layers: [INITIAL_LAYER_1_STYLE, INITIAL_LAYER_2_STYLE],
};

const layerControlsSlice = createSlice({
  name: 'layerControls',
  initialState,
  reducers: {
    updateLayerFillColor: (state, action: PayloadAction<UpdatePayload<string>>) => {
      state.layers[action.payload.layerIndex].fillColor = action.payload.value;
    },
    updateLayerOutlineSize: (state, action: PayloadAction<UpdatePayload<number>>) => {
      state.layers[action.payload.layerIndex].outlineSize = action.payload.value;
    },
    updateLayerOutlineColor: (state, action: PayloadAction<UpdatePayload<string>>) => {
      state.layers[action.payload.layerIndex].outlineColor = action.payload.value;
    },
    updateLayerRadius: (state, action: PayloadAction<UpdatePayload<number>>) => {
      state.layers[action.payload.layerIndex].radius = action.payload.value;
    },
    updateLayerFillBy: (state, action: PayloadAction<UpdatePayload<string>>) => {
      state.layers[action.payload.layerIndex].fillBy = action.payload.value;
    },
    updateLayerPalette: (state, action: PayloadAction<UpdatePayload<PaletteType>>) => {
      state.layers[action.payload.layerIndex].palette = action.payload.value;
    },
  },
});

export const {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
  updateLayerPalette,
} = layerControlsSlice.actions;

export default layerControlsSlice.reducer;
