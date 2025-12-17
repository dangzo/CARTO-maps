import type { BaseSelectProps } from '@mui/material/Select';

export interface LayerControlsProps {
  title: string;
  layerIndex: 0 | 1;
}

export type FillBySelectItem = {
  value: string;
  label: string;
} & BaseSelectProps<string>;
