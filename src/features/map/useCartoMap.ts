import { useState, useEffect } from 'react';
import { fetchMap } from '@deck.gl/carto';
import type { Layer } from '@deck.gl/core';

export const INITIAL_VIEW_STATE = {
  longitude: -90,
  latitude: 20,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const {
  VITE_CARTO_MAP_ID: cartoMapId,
  VITE_API_BASE_URL: apiBaseUrl,
  VITE_API_ACCESS_TOKEN: accessToken
} = import.meta.env;

export default function useCartoMap() {
  const [layers, setLayers] = useState<Layer[]>([]);

  useEffect(() => {
    fetchMap({ cartoMapId, apiBaseUrl, accessToken }).then((map) => {
      setLayers(map.layers);
    });
  }, []);

  return {
    layers,
  };
};
