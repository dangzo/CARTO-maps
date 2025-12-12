import { DeckGL } from '@deck.gl/react';
import { BASEMAP } from '@carto/api-client';
import useCartoMap, { INITIAL_VIEW_STATE } from './useCartoMap';

// Base map
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CartoMap () {
  const { layers } = useCartoMap();

  return (
    <DeckGL
      id="deck-gl"
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={layers}
    >
      <Map mapStyle={BASEMAP.POSITRON} />
    </DeckGL>
  );
};
