import { renderHookWithProviders } from '@/utils/test-utils';
import { waitFor } from '@testing-library/react';
import useQueryDomain from './useQueryDomain';
import { fetchDomain } from '@/api/domains';
import { continuousQuery, categoriesQuery } from '@/api/queries';
import { getModeForField } from '@/utils/domains';
import type { FetchDomainResponse } from '@/api/domains';
import type { SchemaField, SchemaFieldType } from '@carto/api-client';

vi.mock('@/api/domains');
vi.mock('@/api/queries');
vi.mock('@/utils/domains');

const mockFetchDomain = vi.mocked(fetchDomain);
const mockContinuousQuery = vi.mocked(continuousQuery);
const mockCategoriesQuery = vi.mocked(categoriesQuery);
const mockGetModeForField = vi.mocked(getModeForField);

describe('useQueryDomain hook', () => {
  const mockSchema: SchemaField[] = [
    {
      name: 'field1',
      type: 'number' as SchemaFieldType
    },
    {
      name: 'field2',
      type: 'string' as SchemaFieldType
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return empty domain and continuous mode initially', () => {
    mockGetModeForField.mockReturnValue('continuous');

    const { result } = renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field1',
        tableName: 'test_table'
      }), {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null,
        },
      },
    });

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe('continuous');
  });

  it('should fetch continuous domain data', async () => {
    mockGetModeForField.mockReturnValue('continuous');
    mockContinuousQuery.mockReturnValue('SELECT MIN(field1), MAX(field1) FROM test_table');
    mockFetchDomain.mockResolvedValue([{ min: 0, max: 100 }] as unknown as FetchDomainResponse);

    const { result } = renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field1',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    await waitFor(() => {
      expect(result.current[0]).toEqual([0, 100]);
    });

    expect(mockContinuousQuery).toHaveBeenCalledWith('field1', 'test_table');
    expect(result.current[1]).toBe('continuous');
  });

  it('should fetch categories domain data', async () => {
    mockGetModeForField.mockReturnValue('categories');
    mockCategoriesQuery.mockReturnValue('SELECT DISTINCT field2 FROM test_table LIMIT 20');
    mockFetchDomain.mockResolvedValue([{ categories: ['A', 'B', 'C'] }] as unknown as FetchDomainResponse);

    const { result } = renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field2',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    await waitFor(() => {
      expect(result.current[0]).toEqual(['A', 'B', 'C']);
    });

    expect(mockCategoriesQuery).toHaveBeenCalledWith('field2', 'test_table', 20);
    expect(result.current[1]).toBe('categories');
  });

  it('should use custom limit for categories queries', async () => {
    mockGetModeForField.mockReturnValue('categories');
    mockCategoriesQuery.mockReturnValue('SELECT DISTINCT field2 FROM test_table LIMIT 10');
    mockFetchDomain.mockResolvedValue([{ categories: ['A', 'B'] }] as unknown as FetchDomainResponse);

    renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field2',
        tableName: 'test_table',
        limit: 10
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    await waitFor(() => {
      expect(mockCategoriesQuery).toHaveBeenCalledWith('field2', 'test_table', 10);
    });
  });

  it('should not fetch data when attr is solid_color', () => {
    mockGetModeForField.mockReturnValue('continuous');

    renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'solid_color',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    expect(mockFetchDomain).not.toHaveBeenCalled();
  });

  it('should not fetch data when attr is empty', () => {
    mockGetModeForField.mockReturnValue('continuous');

    renderHookWithProviders(() =>
      useQueryDomain({
        attr: '',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    expect(mockFetchDomain).not.toHaveBeenCalled();
  });

  it('should handle fetch errors gracefully', async () => {
    mockGetModeForField.mockReturnValue('continuous');
    mockContinuousQuery.mockReturnValue('SELECT MIN(field1), MAX(field1) FROM test_table');
    mockFetchDomain.mockRejectedValue(new Error('API Error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field1',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe('continuous');

    consoleSpy.mockRestore();
  });

  it('should not update state when rows are empty', async () => {
    mockGetModeForField.mockReturnValue('continuous');
    mockContinuousQuery.mockReturnValue('SELECT MIN(field1), MAX(field1) FROM test_table');
    mockFetchDomain.mockResolvedValue([] as unknown as FetchDomainResponse);

    const { result } = renderHookWithProviders(() =>
      useQueryDomain({
        attr: 'field1',
        tableName: 'test_table'
      }),
    {
      preloadedState: {
        dataSources: {
          retailStoresSchema: mockSchema,
          tilesetSchema: null,
          loading: false,
          error: null
        }
      }
    }
    );

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe('continuous');
  });
});
