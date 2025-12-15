import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import type { FillBySelectItem, LayerControlsProps } from './LayerControls.props';

export default function useLayerControls(layerIndex: LayerControlsProps['layerIndex']) {
  const layerStyle = useAppSelector(state => state.layerControls.layers[layerIndex]);
  const layerSchema = useAppSelector(state => (
    layerIndex === 0
      ? state.dataSources.retailStoresSchema
      : state.dataSources.socioDemographicsSchema
  ));

  // An array of options for the "Fill by" select input
  // generated from the layer schema fields
  const fillByOptions = useMemo(() => {
    const solidColorOption: FillBySelectItem[] = [
      {
        value: 'solid_color',
        label: 'Solid color',
      }
    ];

    if (!layerSchema) {
      return solidColorOption;
    }

    const metricFields = layerSchema
      .filter(field => field.type === 'number' || field.type === 'string')
      .map((field) => ({
        value: field.name,
        label: `By ${field.name} (${field.type})`,
      }));

    return [...solidColorOption, ...metricFields];
  }, [layerSchema]);

  return {
    layerStyle,
    layerSchema,
    fillByOptions,
  };
};
