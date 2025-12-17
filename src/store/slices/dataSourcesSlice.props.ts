import type { VectorTilesetSourceResponse, VectorTableSourceResponse, SchemaField } from '@carto/api-client';
import type { Tilestats } from '@carto/api-client';

export interface DataSourcesState {
  retailStoresSchema: SchemaField[] | null;
  tilesetSchema: SchemaField[] | null;
  tilesetTilestats: Tilestats | null;
  loading: boolean;
  error: string | null;
}

export interface CreateAsyncThunkProps {
  retailStoresDataSource: Promise<VectorTableSourceResponse>;
  tilesetDataSource: Promise<VectorTilesetSourceResponse>;
}
