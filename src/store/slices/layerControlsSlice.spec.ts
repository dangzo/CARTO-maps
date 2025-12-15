import { describe, it, expect } from 'vitest';
import type { LayerControlsState } from './layerControlsSlice.props';
import layerControlsReducer, { updateLayerPalette } from './layerControlsSlice';
import {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
  INITIAL_LAYER_1_STYLE,
  INITIAL_LAYER_2_STYLE,
} from './layerControlsSlice';

describe('layerControlsSlice', () => {
  const initialState: LayerControlsState = {
    layers: [INITIAL_LAYER_1_STYLE, INITIAL_LAYER_2_STYLE],
  };

  it('should return initial state', () => {
    expect(layerControlsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should update layer fill color', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerFillColor({ layerIndex: 0,
        value: '#ff0000' })
    );
    expect(state.layers[0].fillColor).toBe('#ff0000');
    expect(state.layers[1].fillColor).toBe(INITIAL_LAYER_2_STYLE.fillColor);
  });

  it('should update layer outline size', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerOutlineSize({ layerIndex: 1,
        value: 3 })
    );
    expect(state.layers[1].outlineSize).toBe(3);
    expect(state.layers[0].outlineSize).toBe(INITIAL_LAYER_1_STYLE.outlineSize);
  });

  it('should update layer outline color', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerOutlineColor({ layerIndex: 0,
        value: '#00ff00' })
    );
    expect(state.layers[0].outlineColor).toBe('#00ff00');
  });

  it('should update layer radius', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerRadius({ layerIndex: 1,
        value: 5 })
    );
    expect(state.layers[1].radius).toBe(5);
  });

  it('should update layer fill by', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerFillBy({ layerIndex: 0,
        value: 'population' })
    );
    expect(state.layers[0].fillBy).toBe('population');
    expect(state.layers[1].fillBy).toBe(INITIAL_LAYER_2_STYLE.fillBy);
  });

  it('should update layer palette', () => {
    const state = layerControlsReducer(
      initialState,
      updateLayerPalette({
        layerIndex: 1,
        value: 'red',
      })
    );
    expect(state.layers[1].palette).toBe('red');
    expect(state.layers[0].palette).toBe(INITIAL_LAYER_1_STYLE.palette);
  });

  it('should handle multiple updates independently', () => {
    let state = layerControlsReducer(initialState, updateLayerFillColor({ layerIndex: 0,
      value: '#aabbcc' }));
    state = layerControlsReducer(state, updateLayerOutlineSize({ layerIndex: 1,
      value: 2 }));
    expect(state.layers[0].fillColor).toBe('#aabbcc');
    expect(state.layers[1].outlineSize).toBe(2);
  });
});
