import { useMemo } from 'react';
import { VectorTileLayer, colorContinuous, colorCategories, colorBins } from '@deck.gl/carto';
import { useAppSelector } from '@/store/hooks';
import { hexToRgbA } from '@/utils/colors';
import { getTilestatsDomain } from '@/utils/tilestats';
import { storesSource } from '@/data/sources';
import useQueryDomain from '@/hooks/useQueryDomain';
import useDataSources from '@/hooks/useDataSources';

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
  const tilesetTilestats = useAppSelector(state => state.dataSources.tilesetTilestats);


  /**
   * Data Sources
   */

  const { retailStoresData, tilesetData } = useDataSources();


  /**
   * Domains
   */

  const [retailsDomain, retailsMode] = useQueryDomain({
    attr: retailStoreStyles.fillBy,
    tableName: storesSource.tableName,
  });


  /**
   * Fill colors
   */

  const retailStoresFillColor = useMemo(
    () => {
      if (retailStoreStyles.fillBy === 'solid_color') {
        return hexToRgbA(retailStoreStyles.fillColor);
      }

      if (retailsMode === 'categories') {
        return colorCategories({
          attr: retailStoreStyles.fillBy,
          domain: retailsDomain as string[],
          colors: retailStoreStyles.palette,
        });
      }

      return colorContinuous({
        attr: retailStoreStyles.fillBy,
        domain: retailsDomain as [number, number],
        colors: retailStoreStyles.palette,
      });
    },
    [retailsDomain, retailsMode, retailStoreStyles.palette, retailStoreStyles.fillBy, retailStoreStyles.fillColor]
  );

  const tilesetFillColor = useMemo(
    () => {
      if (tilesetStyles.fillBy === 'solid_color') {
        return hexToRgbA(tilesetStyles.fillColor);
      }

      const domain = getTilestatsDomain(tilesetTilestats, tilesetStyles.fillBy, 6);

      return colorBins({
        attr: tilesetStyles.fillBy,
        domain: domain,
        colors: tilesetStyles.palette,
      });
    },
    [tilesetStyles.fillBy, tilesetStyles.palette, tilesetStyles.fillColor, tilesetTilestats]
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
    pickable: true,
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
    pickable: true,
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
