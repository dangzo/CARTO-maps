import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DataSourcesState, CreateAsyncThunkProps } from './dataSourcesSlice.props';
import type { VectorTilesetSourceResponse, SchemaField } from '@carto/api-client';


const initialState: DataSourcesState = {
  retailStoresSchema: null,
  socioDemographicsSchema: null,
  loading: false,
  error: null,
};

// Helper to extract schema from tilestats response
const getTilestatsMainLayerSchema = (data: VectorTilesetSourceResponse) => {
  return data.tilestats?.layers?.[0]?.attributes?.map(field => {
    return {
      name: field.attribute,
      type: field.type.toLowerCase(),
    } as SchemaField;
  });
}

export const fetchDataSourceSchemas = createAsyncThunk(
  'dataSources/fetchSchemas',
  async ({ retailStoresData, socioDemographicsData }: CreateAsyncThunkProps, {
    rejectWithValue,
  }) => {
    try {
      const [retailStores, socioDemographics] = await Promise.all([
        retailStoresData,
        socioDemographicsData,
      ]);

      return {
        retailStoresSchema: retailStores.schema || null,
        socioDemographicsSchema: getTilestatsMainLayerSchema(socioDemographics) || null,
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
      state.socioDemographicsSchema = null;
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
          state.socioDemographicsSchema = action.payload.socioDemographicsSchema;
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
