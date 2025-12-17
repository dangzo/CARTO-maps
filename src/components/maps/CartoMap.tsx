import { DeckGL } from '@deck.gl/react';
import useCartoMap from './useCartoMap';
import useTooltip from '@/hooks/useTooltips';
// Base map
import { Map } from '@vis.gl/react-maplibre';
import { BASEMAP } from '@carto/api-client';
import 'maplibre-gl/dist/maplibre-gl.css';
// Widgets
import { RetailStoresWidget } from '@/components/widgets/RetailStoresWidget';
import useDataSources from '@/hooks/useDataSources';


export default function CartoMap () {
  // init data sources
  const { retailStoresDataSource, tilesetDataSource } = useDataSources();
  // init layers
  const { layers, initialViewState } = useCartoMap({ retailStoresDataSource, tilesetDataSource });
  const { getTooltip } = useTooltip();

  return (
    <DeckGL
      id="deck-gl"
      initialViewState={initialViewState}
      controller
      layers={layers}
      getTooltip={getTooltip}
    >
      <Map mapStyle={BASEMAP.VOYAGER} />

      <RetailStoresWidget />
    </DeckGL>
  );
};
