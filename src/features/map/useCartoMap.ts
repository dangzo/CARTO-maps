import { useEffect, useMemo } from 'react';
import { VectorTileLayer } from '@deck.gl/carto';
import { vectorTilesetSource, vectorTableSource } from '@carto/api-client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchDataSourceSchemas } from '@/store/slices/dataSourcesSlice';
import { hexToRgb } from '@/utils/colors';

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
  const dispatch = useAppDispatch();
  const retailStoreStyles = useAppSelector(state => state.layerControls.layers[0]);
  const socioDemographicsStyles = useAppSelector(state => state.layerControls.layers[1]);

  // Data sources (memoized to avoid recreation on each render)
  const retailStoresData = useMemo(() => vectorTableSource({
    apiBaseUrl,
    accessToken,
    connectionName: 'carto_dw',
    tableName: 'carto-demo-data.demo_tables.retail_stores',
  }), []);
  const socioDemographicsData = useMemo(() => vectorTilesetSource({
    apiBaseUrl,
    accessToken,
    connectionName: 'carto_dw',
    tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
  }), []);

  // Fetch schemas once data sources are available
  useEffect(() => {
    dispatch(fetchDataSourceSchemas({
      retailStoresData,
      socioDemographicsData,
    }));
  }, [dispatch, retailStoresData, socioDemographicsData]);

  // Retail Stores data layer (recreate only when style inputs change)
  const retailStoresLayer = useMemo(() => new VectorTileLayer({
    id: 'retail-stores-layer',
    data: retailStoresData,
    pointRadiusMinPixels: retailStoreStyles.radius || 2,
    getLineColor: hexToRgb(retailStoreStyles.outlineColor || '#000000'),
    getFillColor: hexToRgb(retailStoreStyles.fillColor || '#a00000'),
    lineWidthMinPixels: retailStoreStyles.outlineSize || 1,
  }), [
    retailStoresData,
    retailStoreStyles.fillColor,
    retailStoreStyles.outlineColor,
    retailStoreStyles.outlineSize,
    retailStoreStyles.radius
  ]);

  // SocioDemographics tileset layer (recreate only when style inputs change)
  const socioDemographicsLayer = useMemo(() => new VectorTileLayer({
    id: 'socio-demographics-layer',
    data: socioDemographicsData,
    pointRadiusMinPixels: socioDemographicsStyles.radius || 2,
    getLineColor: hexToRgb(socioDemographicsStyles.outlineColor || '#000000'),
    getFillColor: hexToRgb(socioDemographicsStyles.fillColor || '#4a00f0'),
    lineWidthMinPixels: socioDemographicsStyles.outlineSize || 1
  }), [
    socioDemographicsData,
    socioDemographicsStyles.fillColor,
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
