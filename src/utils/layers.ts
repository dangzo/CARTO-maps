import { getDataFilterExtensionProps, type LayerDescriptor, type LayerType } from '@carto/api-client';

import {
  ClusterTileLayer,
  H3TileLayer,
  HeatmapTileLayer,
  VectorTileLayer,
  QuadbinTileLayer,
  RasterTileLayer
} from '@deck.gl/carto';

import { type _ConstructorOf, Layer } from '@deck.gl/core';
import { DataFilterExtension } from '@deck.gl/extensions';

const layerClasses: Record<LayerType, _ConstructorOf<Layer>> = {
  clusterTile: ClusterTileLayer,
  h3: H3TileLayer,
  heatmapTile: HeatmapTileLayer,
  mvt: VectorTileLayer,
  quadbin: QuadbinTileLayer,
  raster: RasterTileLayer,
  tileset: VectorTileLayer
};

// Courtesy of https://github.com/CartoDB/deck.gl-examples/blob/master/fetchmap/utils.ts
export function layerFactory(layers: LayerDescriptor[]) {
  return layers
    .map(({ type, props, filters }) => {
      const LayerClass = layerClasses[type];
      if (!LayerClass) {
        return null;
      }
      const filterProps = filters && {
        ...getDataFilterExtensionProps(filters),
        extensions: [new DataFilterExtension({ filterSize: 4 })]
      };
      return new LayerClass({ ...props, ...filterProps });
    })
    .filter(Boolean);
}
