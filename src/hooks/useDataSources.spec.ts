import { renderHookWithProviders } from '@/utils/test-utils';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import type { VectorTableSourceResponse, VectorTilesetSourceResponse } from '@carto/api-client';
import useDataSources from './useDataSources';
import { storesSource, tilesetSource } from '@/data/sources';

vi.mock('@carto/api-client');

const mockVectorTableSource = vi.mocked(vectorTableSource);
const mockVectorTilesetSource = vi.mocked(vectorTilesetSource);

describe('useDataSources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVectorTableSource.mockReturnValue({} as Promise<VectorTableSourceResponse>);
    mockVectorTilesetSource.mockReturnValue({} as Promise<VectorTilesetSourceResponse>);
  });

  it('should create data sources with correct parameters', () => {
    renderHookWithProviders(() => useDataSources());

    expect(mockVectorTableSource).toHaveBeenCalledWith({
      apiBaseUrl: expect.any(String),
      accessToken: expect.any(String),
      connectionName: storesSource.connectionName,
      tableName: storesSource.tableName,
    });

    expect(mockVectorTilesetSource).toHaveBeenCalledWith({
      apiBaseUrl: expect.any(String),
      accessToken: expect.any(String),
      connectionName: tilesetSource.connectionName,
      tableName: tilesetSource.tableName,
    });
  });

  it('should return data sources', () => {
    const mockRetailData = { type: 'retail' };
    const mockTilesetData = { type: 'tileset' };

    // @ts-expect-error Mocked data is missing properties
    mockVectorTableSource.mockReturnValue(mockRetailData);
    // @ts-expect-error Mocked data is missing properties
    mockVectorTilesetSource.mockReturnValue(mockTilesetData);

    const { result } = renderHookWithProviders(() => useDataSources());

    expect(result.current.retailStoresData).toBe(mockRetailData);
    expect(result.current.tilesetData).toBe(mockTilesetData);
  });
});
