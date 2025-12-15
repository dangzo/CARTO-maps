
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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
} from '@/store/slices/layerControlsSlice';

const metricOptions = [
  { value: 'revenue', label: 'Revenue (retail_stores)' },
  { value: 'population', label: 'Population (sociodemographics)' }
];

export interface LayerControlsProps {
  title: string;
  layerIndex: 0 | 1;
}

export const LayerControls = ({ title, layerIndex }: LayerControlsProps) => {
  const dispatch = useAppDispatch();
  const selectId = `${title.toLowerCase().replace(/\s+/g, '-')}-fill-by`;

  const layerStyle = useAppSelector(state => state.layerControls.layers[layerIndex]);

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>

      <TextField
        label="Fill color"
        type="color"
        value={layerStyle.fillColor}
        onChange={(e) => dispatch(updateLayerFillColor({ layerIndex, value: e.target.value }))}
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Outline size
        </Typography>
        <Slider
          value={layerStyle.outlineSize}
          onChange={(_, value) => dispatch(updateLayerOutlineSize({ layerIndex, value: value as number }))}
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
        onChange={(e) => dispatch(updateLayerOutlineColor({ layerIndex, value: e.target.value }))}
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Radius
        </Typography>
        <Slider
          value={layerStyle.radius}
          onChange={(_, value) => dispatch(updateLayerRadius({ layerIndex, value: value as number }))}
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
          onChange={(e) => dispatch(updateLayerFillBy({ layerIndex, value: e.target.value }))}
        >
          {metricOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
