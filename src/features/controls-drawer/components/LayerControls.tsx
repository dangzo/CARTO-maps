
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
import type { LayerControlsProps } from './LayerControls.props';

const metricOptions = [
  { value: 'revenue', label: 'Revenue (retail_stores)' },
  { value: 'population', label: 'Population (sociodemographics)' }
];

export const LayerControls = ({ title }: LayerControlsProps) => {
  const selectId = `${title.toLowerCase().replace(/\s+/g, '-')}-fill-by`;

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>

      <TextField
        label="Fill color"
        type="color"
        defaultValue="#4caf50"
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Outline size
        </Typography>
        <Slider defaultValue={1} step={0.5} min={0} max={10} valueLabelDisplay="auto" />
      </Stack>

      <TextField
        label="Outline color"
        type="color"
        defaultValue="#1b5e20"
        size="small"
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
					Radius
        </Typography>
        <Slider defaultValue={12} step={1} min={0} max={50} valueLabelDisplay="auto" />
      </Stack>

      <FormControl size="small" fullWidth>
        <InputLabel id={selectId}>Fill by</InputLabel>
        <Select labelId={selectId} defaultValue="revenue" label="Fill by">
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
