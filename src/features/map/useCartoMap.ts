import { useMemo } from 'react';
import { VectorTileLayer, colorContinuous, colorBins } from '@deck.gl/carto';
import { useAppSelector } from '@/store/hooks';
import { hexToRgbA } from '@/utils/colors';
import useDataSources from '@/hooks/useDataSources';
import useCartoDomain from '@/hooks/useCartoDomain';

export const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const socioDemographicsTileset = 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup';

export default function useCartoMap() {
  const retailStoreStyles = useAppSelector(state => state.layerControls.layers[0]);
  const socioDemographicsStyles = useAppSelector(state => state.layerControls.layers[1]);

  const { retailStoresData, socioDemographicsData } = useDataSources();

  /**
   * Domains
   */

  const socioDomain = useCartoDomain({
    source: socioDemographicsTileset,
    attr: socioDemographicsStyles.fillBy,
    mode: 'bins',
    bins: 6
  });


  /**
   * Fill colors
   */

  const retailStoresFillColor = useMemo(
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

  const socioDemographicsFillColor = useMemo(
    () => {
      if (socioDemographicsStyles.fillBy === 'solid_color') {
        return hexToRgbA(socioDemographicsStyles.fillColor ?? '#4a00f0');
      }

      if (!socioDomain) {
        return new Uint8ClampedArray([200, 200, 200, 120]);
      }

      return colorBins({
        attr: socioDemographicsStyles.fillBy,
        domain: socioDomain,
        colors: 'Burg'
      });
    },
    [socioDemographicsStyles.fillBy, socioDemographicsStyles.fillColor, socioDomain]
  );


  /**
   * Layers
   */

  const retailStoresLayer = useMemo(() => new VectorTileLayer({
    id: 'retail-stores-layer',
    data: retailStoresData,
    pointRadiusMinPixels: retailStoreStyles.radius ?? 2,
    getLineColor: hexToRgbA(retailStoreStyles.outlineColor ?? '#000000'),
    getFillColor: retailStoresFillColor,
    lineWidthMinPixels: retailStoreStyles.outlineSize ?? 1,
  }), [
    retailStoresFillColor,
    retailStoresData,
    retailStoreStyles.outlineColor,
    retailStoreStyles.outlineSize,
    retailStoreStyles.radius
  ]);

  const socioDemographicsLayer = useMemo(() => new VectorTileLayer({
    id: 'socio-demographics-layer',
    data: socioDemographicsData,
    pointRadiusMinPixels: socioDemographicsStyles.radius ?? 2,
    getLineColor: hexToRgbA(socioDemographicsStyles.outlineColor ?? '#000000'),
    getFillColor: socioDemographicsFillColor,
    lineWidthMinPixels: socioDemographicsStyles.outlineSize ?? 1,
  }), [
    socioDemographicsFillColor,
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
