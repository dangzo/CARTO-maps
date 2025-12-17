import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DataSourcesState, CreateAsyncThunkProps } from './dataSourcesSlice.props';
import type {
  VectorTilesetSourceResponse,
  VectorTableSourceResponse,
  SchemaField,
} from '@carto/api-client';


const initialState: DataSourcesState = {
  retailStoresSchema: null,
  tilesetSchema: null,
  tilesetTilestats: null,
  loading: false,
  error: null,
};

// Helper to extract a list of fields (name/type) from response
const getLayerSchema = (data: VectorTilesetSourceResponse | VectorTableSourceResponse) => {
  if (!data.schema) {
    return data.tilestats?.layers?.[0]?.attributes?.map(field => {
      return {
        name: field.attribute,
        type: field.type.toLowerCase(),
      } as SchemaField;
    });
  }
  return data.schema;
};

export const fetchDataSourceSchemas = createAsyncThunk(
  'dataSources/fetchSchemas',
  async ({ retailStoresDataSource, tilesetDataSource }: CreateAsyncThunkProps, {
    rejectWithValue,
  }) => {
    try {
      const [retailStores, tileset] = await Promise.all([
        retailStoresDataSource,
        tilesetDataSource,
      ]);

      return {
        retailStoresSchema: getLayerSchema(retailStores),
        tilesetSchema: getLayerSchema(tileset),
        tilesetTilestats: tileset.tilestats,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {
    resetSchemas: (state) => {
      state.retailStoresSchema = null;
      state.tilesetSchema = null;
      state.tilesetTilestats = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSourceSchemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDataSourceSchemas.fulfilled,
        (state, action) => {
          state.loading = false;
          state.retailStoresSchema = action.payload.retailStoresSchema;
          state.tilesetSchema = action.payload.tilesetSchema;
          state.tilesetTilestats = action.payload.tilesetTilestats;
        }
      )
      .addCase(fetchDataSourceSchemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSchemas } = dataSourcesSlice.actions;
export default dataSourcesSlice.reducer;
