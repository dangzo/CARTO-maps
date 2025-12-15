import type { VectorTilesetSourceResponse, VectorTableSourceResponse, SchemaField } from '@carto/api-client';

export interface DataSourcesState {
  retailStoresSchema: SchemaField[] | null;
  socioDemographicsSchema: SchemaField[] | null;
  loading: boolean;
  error: string | null;
}

export interface CreateAsyncThunkProps {
  retailStoresData: Promise<VectorTableSourceResponse>;
  socioDemographicsData: Promise<VectorTilesetSourceResponse>;
}
