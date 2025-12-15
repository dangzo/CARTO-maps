import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LayerStyle, LayerControlsState, UpdatePayload } from './layerControlsSlice.props';

const initialLayer1Style: LayerStyle = {
  fillColor: '#4caf50',
  outlineSize: 1,
  outlineColor: '#1b5e20',
  radius: 4,
  fillBy: 'revenue',
};

const initialLayer2Style: LayerStyle = {
  fillColor: '#fcac50',
  outlineSize: 1,
  outlineColor: '#5b1e50',
  radius: 4,
  fillBy: 'revenue',
};

const initialState: LayerControlsState = {
  layers: [initialLayer1Style, initialLayer2Style],
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
  },
});

export const {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
} = layerControlsSlice.actions;

export default layerControlsSlice.reducer;
