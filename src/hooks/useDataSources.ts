import { useEffect } from 'react';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import { useAppDispatch } from '@/store/hooks';
import { fetchDataSourceSchemas } from '@/store/slices/dataSourcesSlice';
import { storesSource, tilesetSource } from '@/data/sources';

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

export default function useDataSources() {
  const dispatch = useAppDispatch();

  // Create data sources
  const retailStoresDataSource = vectorTableSource({
    apiBaseUrl,
    accessToken,
    ...storesSource,
  });

  const tilesetDataSource = vectorTilesetSource({
    apiBaseUrl,
    accessToken,
    ...tilesetSource,
  });

  // Fetch schemas once data sources are available
  useEffect(() => {
    dispatch(
      fetchDataSourceSchemas({
        retailStoresDataSource,
        tilesetDataSource,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    retailStoresDataSource,
    tilesetDataSource,
  };
};
