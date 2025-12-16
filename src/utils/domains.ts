import type { SchemaField } from '@carto/api-client';
import type { DomainModeType } from '@/api/domains';

// Helper to determine mode based on field type
export const getModeForField = (schema: SchemaField[] | null, fieldName: string): DomainModeType => {
  if (!schema || fieldName === 'solid_color') {
    return 'continuous';
  }

  const field = schema.find(f => f.name === fieldName);
  if (!field) {
    return 'continuous';
  }

  const type = field.type.toLowerCase();
  // Use categories for string types, continuous for numbers
  return type === 'string' ? 'categories' : 'continuous';
};
