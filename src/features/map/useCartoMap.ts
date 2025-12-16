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

export default function useCartoMap() {
  const retailStoreStyles = useAppSelector(state => state.layerControls.layers[0]);
  const tilesetStyles = useAppSelector(state => state.layerControls.layers[1]);


  /**
   * Data Sources
   */

  const { retailStoresData, tilesetData } = useDataSources();


  /**
   * Domains
   */

  useCartoDomain({
    attr: tilesetStyles.fillBy,
    mode: 'bins',
    bins: 6,
  });

  const retailsDomain = useCartoDomain({
    attr: retailStoreStyles.fillBy,
    mode: 'continuous',
  });


  /**
   * Fill colors
   */

  const retailStoresFillColor = useMemo(
    () => {
      if (retailStoreStyles.fillBy === 'solid_color') {
        return hexToRgbA(retailStoreStyles.fillColor);
      }
      return colorContinuous({
        attr: retailStoreStyles.fillBy,
        domain: retailsDomain,
        colors: 'Mint',
      });
    },
    [retailsDomain, retailStoreStyles.fillBy, retailStoreStyles.fillColor]
  );

  const tilesetFillColor = useMemo(
    () => {
      if (tilesetStyles.fillBy === 'solid_color') {
        return hexToRgbA(tilesetStyles.fillColor);
      }
      return colorBins({
        attr: tilesetStyles.fillBy,
        domain: [0, 1000],
        colors: 'Burg'
      });
    },
    [tilesetStyles.fillBy, tilesetStyles.fillColor]
  );


  /**
   * Layers
   */

  const retailStoresLayer = useMemo(() => new VectorTileLayer({
    id: 'retail-stores-layer',
    data: retailStoresData,
    pointRadiusMinPixels: retailStoreStyles.radius ?? 2,
    getLineColor: hexToRgbA(retailStoreStyles.outlineColor),
    getFillColor: retailStoresFillColor,
    lineWidthMinPixels: retailStoreStyles.outlineSize ?? 1,
  }), [
    retailStoresFillColor,
    retailStoresData,
    retailStoreStyles.outlineColor,
    retailStoreStyles.outlineSize,
    retailStoreStyles.radius
  ]);

  const tilesetLayer = useMemo(() => new VectorTileLayer({
    id: 'socio-demographics-layer',
    data: tilesetData,
    pointRadiusMinPixels: tilesetStyles.radius ?? 2,
    getLineColor: hexToRgbA(tilesetStyles.outlineColor),
    getFillColor: tilesetFillColor,
    lineWidthMinPixels: tilesetStyles.outlineSize ?? 1,
  }), [
    tilesetFillColor,
    tilesetData,
    tilesetStyles.outlineColor,
    tilesetStyles.outlineSize,
    tilesetStyles.radius
  ]);


  return {
    tilesetData,
    retailStoresData,
    initialViewState: INITIAL_VIEW_STATE,
    layers: [
      tilesetLayer,
      retailStoresLayer,
    ],
  };
};
