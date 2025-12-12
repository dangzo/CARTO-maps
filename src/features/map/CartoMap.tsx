import { DeckGL } from '@deck.gl/react';
import { BASEMAP } from '@carto/api-client';

// Base map
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';


const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0
};

export default function CartoMap () {


  return (
    <DeckGL
      id="deck-gl"
      initialViewState={INITIAL_VIEW_STATE}
      controller={{ doubleClickZoom: false }}
    >
      <Map
        mapStyle={BASEMAP.POSITRON}
        attributionControl={false}
      />
    </DeckGL>
  );
};
