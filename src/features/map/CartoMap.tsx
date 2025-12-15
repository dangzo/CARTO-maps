import { DeckGL } from '@deck.gl/react';
import useCartoMap from './useCartoMap';

// Base map
import { Map } from '@vis.gl/react-maplibre';
import { BASEMAP } from '@carto/api-client';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CartoMap () {
  const { layers, initialViewState } = useCartoMap();

  return (
    <DeckGL
      id="deck-gl"
      initialViewState={initialViewState}
      controller
      layers={layers}
    >
      <Map mapStyle={BASEMAP.POSITRON} />
    </DeckGL>
  );
};
