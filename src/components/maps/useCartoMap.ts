import { useMemo } from 'react';
import { VectorTileLayer, colorContinuous, colorCategories, colorBins } from '@deck.gl/carto';
import { useAppSelector } from '@/store/hooks';
import { hexToRgbA } from '@/utils/colors';
import { getTilestatsDomain } from '@/utils/tilestats';
import { storesSource } from '@/data/sources';
import useQueryDomain from '@/hooks/useQueryDomain';
import type { VectorTableSourceResponse, VectorTilesetSourceResponse } from '@carto/api-client';

export const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

interface UseCartoMapProps {
  retailStoresDataSource: Promise<VectorTableSourceResponse>;
  tilesetDataSource: Promise<VectorTilesetSourceResponse>;
}

export default function useCartoMap({ retailStoresDataSource, tilesetDataSource }: UseCartoMapProps) {
  const retailStoreStyles = useAppSelector(state => state.layerControls.layers[0]);
  const tilesetStyles = useAppSelector(state => state.layerControls.layers[1]);
  const tilesetTilestats = useAppSelector(state => state.dataSources.tilesetTilestats);

  /**
   * Domains
   */

  const [retailsDomain, retailsMode] = useQueryDomain({
    attr: retailStoreStyles.fillBy,
    tableName: storesSource.tableName,
  });


  /**
   * Fill colors, based on selected "fill by" style and attribute domain
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
    data: retailStoresDataSource,
    pointRadiusMinPixels: retailStoreStyles.radius ?? 2,
    getLineColor: hexToRgbA(retailStoreStyles.outlineColor),
    getFillColor: retailStoresFillColor,
    lineWidthMinPixels: retailStoreStyles.outlineSize ?? 1,
    pickable: true,
  }), [
    retailStoresFillColor,
    retailStoresDataSource,
    retailStoreStyles.outlineColor,
    retailStoreStyles.outlineSize,
    retailStoreStyles.radius
  ]);

  const tilesetLayer = useMemo(() => new VectorTileLayer({
    id: 'socio-demographics-layer',
    data: tilesetDataSource,
    pointRadiusMinPixels: tilesetStyles.radius ?? 2,
    getLineColor: hexToRgbA(tilesetStyles.outlineColor),
    getFillColor: tilesetFillColor,
    lineWidthMinPixels: tilesetStyles.outlineSize ?? 1,
    pickable: true,
  }), [
    tilesetFillColor,
    tilesetDataSource,
    tilesetStyles.outlineColor,
    tilesetStyles.outlineSize,
    tilesetStyles.radius
  ]);


  return {
    initialViewState: INITIAL_VIEW_STATE,
    layers: [
      tilesetLayer,
      retailStoresLayer,
    ],
  };
};
