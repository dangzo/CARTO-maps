import { fetchMap } from '@carto/api-client';
import { layerFactory } from '@/utils/layers';
import { useEffect, useRef } from 'react';
import { DeckGL, type DeckGLRef } from '@deck.gl/react';
import { BASEMAP } from '@carto/api-client';

// Base map
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const cartoMapId = '83d0b6c1-1c8d-4582-8ae2-ee2eb3a2154f';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0
};

export default function CartoMap () {
  const deckRef = useRef<DeckGLRef>(null);

  useEffect(() => {
    fetchMap({ cartoMapId, apiBaseUrl, accessToken }).then(cartoMap => {
      if (deckRef.current?.deck) {
        deckRef.current.deck.setProps({
          layers: layerFactory(cartoMap.layers)
        });
      }
    });
  }, []);

  return (
    <DeckGL
      ref={deckRef}
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
