import { renderHookWithProviders } from '@/utils/test-utils';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import type { VectorTableSourceResponse, VectorTilesetSourceResponse } from '@carto/api-client';
import useDataSources from './useDataSources';

vi.mock('@carto/api-client');

const mockVectorTableSource = vi.mocked(vectorTableSource);
const mockVectorTilesetSource = vi.mocked(vectorTilesetSource);

describe('useDataSources', () => {
  const mockProps = {
    connectionName: 'test-connection',
    retailStoresTable: 'retail_stores',
    tilesetTileset: 'socio_demographics',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockVectorTableSource.mockReturnValue({} as Promise<VectorTableSourceResponse>);
    mockVectorTilesetSource.mockReturnValue({} as Promise<VectorTilesetSourceResponse>);
  });

  it('should create data sources with correct parameters', () => {
    renderHookWithProviders(() => useDataSources(mockProps));

    expect(mockVectorTableSource).toHaveBeenCalledWith({
      apiBaseUrl: expect.any(String),
      accessToken: expect.any(String),
      connectionName: 'test-connection',
      tableName: 'retail_stores',
    });

    expect(mockVectorTilesetSource).toHaveBeenCalledWith({
      apiBaseUrl: expect.any(String),
      accessToken: expect.any(String),
      connectionName: 'test-connection',
      tableName: 'socio_demographics',
    });
  });

  it('should return data sources', () => {
    const mockRetailData = { type: 'retail' };
    const mockSocioData = { type: 'socio' };

    // @ts-expect-error Mocked data is missing properties
    mockVectorTableSource.mockReturnValue(mockRetailData);
    // @ts-expect-error Mocked data is missing properties
    mockVectorTilesetSource.mockReturnValue(mockSocioData);

    const { result } = renderHookWithProviders(() => useDataSources(mockProps));

    expect(result.current.retailStoresData).toBe(mockRetailData);
    expect(result.current.tilesetData).toBe(mockSocioData);
  });
});
