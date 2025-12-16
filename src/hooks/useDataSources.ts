import { useEffect } from 'react';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import { useAppDispatch } from '@/store/hooks';
import { fetchDataSourceSchemas } from '@/store/slices/dataSourcesSlice';

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

interface UseDataSourcesProps {
  connectionName: string;
  retailStoresTable: string;
  socioDemographicsTileset: string;
}

export default function useDataSources({
  connectionName,
  retailStoresTable,
  socioDemographicsTileset,
}: UseDataSourcesProps) {
  const dispatch = useAppDispatch();

  // Create data sources
  const retailStoresData = vectorTableSource({
    apiBaseUrl,
    accessToken,
    connectionName,
    tableName: retailStoresTable,
  });

  const socioDemographicsData = vectorTilesetSource({
    apiBaseUrl,
    accessToken,
    connectionName,
    tableName: socioDemographicsTileset,
  });

  // Fetch schemas once data sources are available
  useEffect(() => {
    dispatch(
      fetchDataSourceSchemas({
        retailStoresData,
        socioDemographicsData,
      })
    );
  }, [dispatch, retailStoresData, socioDemographicsData]);

  return {
    retailStoresData,
    socioDemographicsData,
  };
};
