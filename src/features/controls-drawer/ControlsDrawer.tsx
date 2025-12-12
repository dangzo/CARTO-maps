import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const metricOptions = [
  { value: 'revenue', label: 'Revenue (retail_stores)' },
  { value: 'population', label: 'Population (sociodemographics)' }
];

function LayerControls({ title }: { title: string }) {
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

export default function ControlsDrawer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <Typography variant="h6" fontWeight={700}>
				Controls
      </Typography>

      <LayerControls title="Layer 1: Retail Stores" />

      <Divider flexItem />

      <LayerControls title="Layer 2: SocioDemographics" />
    </Box>
  );
}
