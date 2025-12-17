import { renderHookWithProviders } from '@/utils/test-utils';
import useLayerControls from './useLayerControls';

describe('useLayerControls hook', () => {
  it('should return correct layerStyle and fillByOptions for layerIndex 0', () => {
    const { result } = renderHookWithProviders(() => useLayerControls(0));

    expect(result.current.layerStyle).toBeDefined();
    expect(Array.isArray(result.current.fillByOptions)).toBe(true);
    expect(result.current.fillByOptions.length).toBeGreaterThan(0);
  });

  it('should return correct layerStyle and fillByOptions for layerIndex 1', () => {
    const { result } = renderHookWithProviders(() => useLayerControls(1));

    expect(result.current.layerStyle).toBeDefined();
    expect(Array.isArray(result.current.fillByOptions)).toBe(true);
    expect(result.current.fillByOptions.length).toBeGreaterThan(0);
  });

  it('should always include "Solid color" option in fillByOptions', () => {
    const { result } = renderHookWithProviders(() => useLayerControls(0));

    const solidColorOption = result.current.fillByOptions.find(
      option => option.value === 'solid_color'
    );

    expect(solidColorOption).toBeDefined();
    expect(solidColorOption?.label).toBe('Solid color');
  });

  it('should return correct layerSchema based on layerIndex', () => {
    const { result: result0 } = renderHookWithProviders(() => useLayerControls(0));
    const { result: result1 } = renderHookWithProviders(() => useLayerControls(1));

    expect(result0.current.layerSchema).toBeDefined();
    expect(result1.current.layerSchema).toBeDefined();
  });
});
