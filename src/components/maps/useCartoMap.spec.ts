import useCartoMap, { INITIAL_VIEW_STATE } from './useCartoMap';
import { renderHookWithProviders } from '@/utils/test-utils';
import type { VectorTableSourceResponse, VectorTilesetSourceResponse } from '@carto/api-client';

// @ts-expect-error Mocked data is missing properties
const mockRetailStoresDataSource: Promise<VectorTableSourceResponse> = Promise.resolve({
  accessToken: 'mock-token',
  connectionName: 'carto_dw',
  type: 'table',
  data: [],
  schema: [
    { name: 'geom', type: 'geometry' },
    { name: 'cartodb_id', type: 'number' },
    { name: 'revenue', type: 'number' },
  ],
} as VectorTableSourceResponse);

// @ts-expect-error Mocked data is missing properties
const mockTilesetDataSource: Promise<VectorTilesetSourceResponse> = Promise.resolve({
  accessToken: 'mock-token',
  connectionName: 'carto_dw',
  type: 'tileset',
  data: [],
  tilestats: {
    layers: [
      {
        attributes: [
          {
            attribute: 'total_pop',
            type: 'number',
            min: 0,
            max: 1000,
            avg: 500,
          },
        ],
      },
    ],
  },
} as VectorTilesetSourceResponse);

describe('useCartoMap hook', () => {
  it('should return initial view state and layers', () => {
    const { result } = renderHookWithProviders(() =>
      useCartoMap({
        retailStoresDataSource: mockRetailStoresDataSource,
        tilesetDataSource: mockTilesetDataSource
      })
    );

    expect(result.current).toHaveProperty('layers');
    expect(result.current.layers).toBeInstanceOf(Array);
    expect(result.current).toHaveProperty('initialViewState', INITIAL_VIEW_STATE);
  });

  it('should create layers with correct properties', () => {
    const { result } = renderHookWithProviders(() =>
      useCartoMap({
        retailStoresDataSource: mockRetailStoresDataSource,
        tilesetDataSource: mockTilesetDataSource
      })
    );
    const { layers } = result.current;

    expect(layers.length).toBe(2);

    // tilesetLayer first, retailStoresLayer second, on top of it
    const [tilesetLayer, retailStoresLayer] = layers;

    // Check SocioDemographics Layer
    expect(tilesetLayer.id).toBe('socio-demographics-layer');
    expect(tilesetLayer.props).toHaveProperty('data');
    expect(tilesetLayer.props).toHaveProperty('getFillColor');
    expect(tilesetLayer.props).toHaveProperty('getLineColor');
    expect(tilesetLayer.props).toHaveProperty('pointRadiusMinPixels');
    expect(tilesetLayer.props).toHaveProperty('lineWidthMinPixels');

    // Check Retail Stores Layer
    expect(retailStoresLayer.id).toBe('retail-stores-layer');
    expect(retailStoresLayer.props).toHaveProperty('data');
    expect(retailStoresLayer.props).toHaveProperty('getFillColor');
    expect(retailStoresLayer.props).toHaveProperty('getLineColor');
    expect(retailStoresLayer.props).toHaveProperty('pointRadiusMinPixels');
    expect(retailStoresLayer.props).toHaveProperty('lineWidthMinPixels');
  });
});
