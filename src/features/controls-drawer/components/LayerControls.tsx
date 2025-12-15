
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
} from '@/store/slices/layerControlsSlice';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { LayerControlsProps, FillBySelectItem } from './LayerControls.props';


export const LayerControls = ({ title, layerIndex }: LayerControlsProps) => {
  const dispatch = useAppDispatch();
  const selectId = `${title.toLowerCase().replace(/\s+/g, '-')}-fill-by`;

  const layerStyle = useAppSelector(state => state.layerControls.layers[layerIndex]);
  const layerSchema = useAppSelector(state => {
    const dataSources = state.dataSources;
    return layerIndex === 0
      ? dataSources.retailStoresSchema
      : dataSources.socioDemographicsSchema;
  });

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

    const metricFields = layerSchema.map((field) => ({
      value: field.name,
      label: `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} (${field.type})`,
    }));

    return [...solidColorOption, ...metricFields];
  }, [layerSchema]);

  function onFillColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateLayerFillColor({ layerIndex, value: event.target.value }),
    );
  }

  function onOutlineColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateLayerOutlineColor({ layerIndex, value: event.target.value }),
    );
  }

  function onOutlineSizeChange(_event: Event, value: number | number[]) {
    dispatch(
      updateLayerOutlineSize({ layerIndex, value: typeof value === 'number' ? value : value[0] }),
    );
  }

  function onRadiusChange(_event: Event, value: number | number[]) {
    dispatch(
      updateLayerRadius({ layerIndex, value: typeof value === 'number' ? value : value[0] }),
    );
  }

  function onFillByChange(event: SelectChangeEvent<string>) {
    dispatch(
      updateLayerFillBy({ layerIndex, value: event.target.value as string }),
    );
  }

  return (
    <Box component="section" sx={{ display: 'flex',
      flexDirection: 'column',
      gap: 2 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>

      <TextField
        label="Fill color"
        type="color"
        value={layerStyle.fillColor}
        onChange={onFillColorChange}
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Outline size
        </Typography>
        <Slider
          aria-label='Outline size'
          value={layerStyle.outlineSize}
          onChange={onOutlineSizeChange}
          step={0.5}
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Stack>

      <TextField
        label="Outline color"
        type="color"
        value={layerStyle.outlineColor}
        onChange={onOutlineColorChange}
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Radius
        </Typography>
        <Slider
          aria-label='Radius'
          value={layerStyle.radius}
          onChange={onRadiusChange}
          step={1}
          min={0}
          max={50}
          valueLabelDisplay="auto"
        />
      </Stack>

      <FormControl size="small" fullWidth>
        <InputLabel id={selectId}>Fill by</InputLabel>
        <Select
          labelId={selectId}
          value={layerStyle.fillBy}
          label="Fill by"
          onChange={onFillByChange}
        >
          {fillByOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
