import dataSourcesReducer, { fetchDataSourceSchemas } from './dataSourcesSlice';
import type { CreateAsyncThunkProps } from './dataSourcesSlice.props';
import type { Tilestats, SchemaFieldType } from '@carto/api-client';


describe('dataSourcesSlice', () => {
  const initialState = {
    retailStoresSchema: null,
    tilesetSchema: null,
    tilesetTilestats: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(dataSourcesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchDataSourceSchemas.pending', () => {
    const state = dataSourcesReducer(initialState, fetchDataSourceSchemas.pending('', {} as CreateAsyncThunkProps));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchDataSourceSchemas.fulfilled', () => {
    const retailStoresSchema = [
      {
        name: 'id',
        type: 'number' as SchemaFieldType,
        attribute: 'id',
      },
    ];

    const tilesetSchema = [
      {
        name: 'population',
        type: 'number' as SchemaFieldType,
        attribute: 'population',
      },
    ];

    const state = dataSourcesReducer(
      {
        ...initialState,
        loading: true,
      },
      fetchDataSourceSchemas.fulfilled(
        {
          retailStoresSchema,
          tilesetSchema,
          tilesetTilestats: {} as Tilestats,
        },
        '',
        {} as CreateAsyncThunkProps
      )
    );

    expect(state.loading).toBe(false);
    expect(state.retailStoresSchema).toEqual(retailStoresSchema);
    expect(state.tilesetSchema).toEqual(tilesetSchema);
  });

  it('should handle fetchDataSourceSchemas.rejected', () => {
    const errorMessage = 'Failed to fetch schemas';
    const state = dataSourcesReducer(
      {
        ...initialState,
        loading: true,
      },
      fetchDataSourceSchemas.rejected(new Error(), '', {} as CreateAsyncThunkProps, errorMessage)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
