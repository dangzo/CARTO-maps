import type { VectorTilesetSourceResponse, VectorTableSourceResponse } from '@carto/api-client';

export interface DataSourceSchema {
  fields?: Array<{ name: string; type: string }>;
  // Using wildcard to match any other properties
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface DataSourcesState {
  retailStoresSchema: DataSourceSchema | null;
  socioDemographicsSchema: DataSourceSchema | null;
  loading: boolean;
  error: string | null;
}

export interface CreateAsyncThunkProps {
  retailStoresData: Promise<VectorTableSourceResponse>;
  socioDemographicsData: Promise<VectorTilesetSourceResponse>;
}
