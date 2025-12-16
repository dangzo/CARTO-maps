import type { Attribute, Tilestats } from '@carto/api-client';

/**
 * Extract domain bins from tilestats metadata for a given attribute
 * Generates bins using min, avg, and max values
 */
export const getTilestatsDomain = (
  tilestats: Tilestats | null,
  attribute: string,
  numBins: number = 6
): number[] => {
  if (!tilestats?.layers?.[0]?.attributes) {
    return [];
  }

  const field = tilestats.layers[0].attributes.find(
    (attr: Attribute) => attr.attribute === attribute
  );

  if (!field) {
    return [];
  }

  // Extract min, max, and avg from the field stats
  const min = field.min as number;
  const max = field.max as number;

  if (min === undefined || max === undefined) {
    return [];
  }

  // Generate evenly-spaced bins from min to max
  const domain: number[] = [];
  const step = (max - min) / numBins;

  for (let i = 0; i <= numBins; i++) {
    domain.push(min + i * step);
  }

  // Round to avoid floating point precision issues
  return domain.map(val => Math.round(val * 100) / 100);
};
