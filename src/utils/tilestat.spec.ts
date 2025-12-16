import { getTilestatsDomain } from '@/utils/tilestats';
import type { Tilestats } from '@carto/api-client';

describe('getTilestatsDomain', () => {
  const mockTilestats: Tilestats = {
    layerCount: 1,
    layers: [
      {
        attributes: [
          {
            attribute: 'population',
            min: 100,
            max: 1000,
            type: ''
          },
          {
            attribute: 'elevation',
            min: 0,
            max: 500,
            type: ''
          },
        ],
        layer: '',
        count: 0,
        attributeCount: 0
      },
    ],
  };

  it('should return empty array if tilestats is null', () => {
    const domain = getTilestatsDomain(null, 'population');
    expect(domain).toEqual([]);
  });

  it('should return empty array if attribute not found', () => {
    const domain = getTilestatsDomain(mockTilestats, 'nonexistent');
    expect(domain).toEqual([]);
  });

  it('should return correct domain bins for a given attribute', () => {
    const domain = getTilestatsDomain(mockTilestats, 'population', 4);
    expect(domain).toEqual([100, 325, 550, 775, 1000]);
  });

  it('should handle attributes with zero min and max', () => {
    const domain = getTilestatsDomain(mockTilestats, 'elevation', 5);
    expect(domain).toEqual([0, 100, 200, 300, 400, 500]);
  });
});
