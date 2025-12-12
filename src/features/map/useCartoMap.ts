import { VectorTileLayer } from '@deck.gl/carto';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import { useMemo } from 'react';

export const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

export default function useCartoMap() {
  // Retail Stores data layer
  const retailStoresLayer = useMemo(() => {
    const retailStoresData = vectorTableSource({
      apiBaseUrl,
      accessToken,
      connectionName: 'carto_dw',
      tableName: 'carto-demo-data.demo_tables.retail_stores',
    });

    return new VectorTileLayer({
      id: 'retail-stores-layer',
      data: retailStoresData,
      pointRadiusMinPixels: 2,
      getLineColor: [0, 0, 0, 200],
      getFillColor: [238, 77, 90],
      lineWidthMinPixels: 1
    });
  }, []);

  // SocioDemographics tileset layer
  const socioDemographicsLayer = useMemo(() => {
    const socioDemographicsData = vectorTilesetSource({
      apiBaseUrl,
      accessToken,
      connectionName: 'carto_dw',
      tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    });

    return new VectorTileLayer({
      id: 'socio-demographics-layer',
      data: socioDemographicsData,
      pointRadiusMinPixels: 2,
      getLineColor: [0, 0, 0, 200],
      getFillColor: [208, 247, 240],
      lineWidthMinPixels: 1
    });
  }, []);

  return {
    layers: [socioDemographicsLayer, retailStoresLayer],
  };
};
