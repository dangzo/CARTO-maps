import { useEffect, useMemo } from 'react';
import { VectorTileLayer, colorContinuous, colorBins } from '@deck.gl/carto';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchDataSourceSchemas } from '@/store/slices/dataSourcesSlice';
import { hexToRgbA } from '@/utils/colors';

export const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const connectionMode = 'carto_dw';
const retailStoresTable = 'carto-demo-data.demo_tables.retail_stores';
const socioDemographicsTileset = 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup';

const {
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

export default function useCartoMap() {
  const dispatch = useAppDispatch();
  const retailStoreStyles = useAppSelector(state => state.layerControls.layers[0]);
  const socioDemographicsStyles = useAppSelector(state => state.layerControls.layers[1]);

  // Data sources
  const retailStoresData = vectorTableSource({
    apiBaseUrl,
    accessToken,
    connectionName: connectionMode,
    tableName: retailStoresTable,
  });
  const socioDemographicsData = vectorTilesetSource({
    apiBaseUrl,
    accessToken,
    connectionName: connectionMode,
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

  const layer1FillColor = useMemo(
    () => {
      if (retailStoreStyles.fillBy === 'solid_color') {
        return hexToRgbA(retailStoreStyles.fillColor ?? '#a00000');
      }
      return colorContinuous({
        attr: retailStoreStyles.fillBy,
        domain: [0, 250001],
        colors: 'Mint',
      });
    },
    [retailStoreStyles.fillBy, retailStoreStyles.fillColor]
  );

  const layer2FillColor = useMemo(
    () => {
      if (socioDemographicsStyles.fillBy === 'solid_color') {
        return hexToRgbA(socioDemographicsStyles.fillColor ?? '#4a00f0');
      }
      return colorBins({
        attr: socioDemographicsStyles.fillBy,
        domain: [0, 10000, 20000, 30000, 40000, 50000, 55407],
        colors: 'Burg'
      });
    },
    [socioDemographicsStyles.fillBy, socioDemographicsStyles.fillColor]
  );
  // Retail Stores data layer (recreate only when style inputs change)
  const retailStoresLayer = useMemo(() => new VectorTileLayer({
    id: 'retail-stores-layer',
    data: retailStoresData,
    pointRadiusMinPixels: retailStoreStyles.radius ?? 2,
    getLineColor: hexToRgbA(retailStoreStyles.outlineColor ?? '#000000'),
    getFillColor: layer1FillColor,
    lineWidthMinPixels: retailStoreStyles.outlineSize ?? 1,
  }), [
    layer1FillColor,
    retailStoresData,
    retailStoreStyles.outlineColor,
    retailStoreStyles.outlineSize,
    retailStoreStyles.radius
  ]);

  // SocioDemographics tileset layer (recreate only when style inputs change)
  const socioDemographicsLayer = useMemo(() => new VectorTileLayer({
    id: 'socio-demographics-layer',
    data: socioDemographicsData,
    pointRadiusMinPixels: socioDemographicsStyles.radius ?? 2,
    getLineColor: hexToRgbA(socioDemographicsStyles.outlineColor ?? '#000000'),
    getFillColor: layer2FillColor,
    lineWidthMinPixels: socioDemographicsStyles.outlineSize ?? 1,
  }), [
    layer2FillColor,
    socioDemographicsData,
    socioDemographicsStyles.outlineColor,
    socioDemographicsStyles.outlineSize,
    socioDemographicsStyles.radius
  ]);

  return {
    socioDemographicsData,
    retailStoresData,
    initialViewState: INITIAL_VIEW_STATE,
    layers: [
      socioDemographicsLayer,
      retailStoresLayer,
    ],
  };
};
