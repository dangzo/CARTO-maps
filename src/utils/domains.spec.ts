import { getModeForField } from '@/utils/domains';
import type { SchemaField, SchemaFieldType } from '@carto/api-client';

describe('getModeForField', () => {
  const mockSchema: SchemaField[] = [
    { name: 'age', type: 'number' as SchemaFieldType },
    { name: 'name', type: 'string' as SchemaFieldType },
    { name: 'height', type: 'number' as SchemaFieldType },
    { name: 'category', type: 'string' as SchemaFieldType },
  ];

  it('should return "continuous" for numeric fields', () => {
    expect(getModeForField(mockSchema, 'age')).toBe('continuous');
    expect(getModeForField(mockSchema, 'height')).toBe('continuous');
  });

  it('should return "categories" for string fields', () => {
    expect(getModeForField(mockSchema, 'name')).toBe('categories');
    expect(getModeForField(mockSchema, 'category')).toBe('categories');
  });

  it('should return "continuous" for unknown fields', () => {
    expect(getModeForField(mockSchema, 'unknownField')).toBe('continuous');
  });

  it('should return "continuous" when schema is null', () => {
    expect(getModeForField(null, 'age')).toBe('continuous');
  });

  it('should return "continuous" when field name is "solid_color"', () => {
    expect(getModeForField(mockSchema, 'solid_color')).toBe('continuous');
  });
});
