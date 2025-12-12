import { Deck } from '@deck.gl/core';
import { fetchMap } from '@deck.gl/carto';

const cartoMapId = '83d0b6c1-1c8d-4582-8ae2-ee2eb3a2154f';

export default function Map () {
  const res = fetchMap({cartoMapId}).then(map => new Deck(map));
  console.log(res)

  return <div>Map Component</div>;
};
