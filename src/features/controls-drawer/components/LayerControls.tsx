
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
import { useAppDispatch } from '@/store/hooks';
import {
  updateLayerFillColor,
  updateLayerOutlineSize,
  updateLayerOutlineColor,
  updateLayerRadius,
  updateLayerFillBy,
  updateLayerPalette,
} from '@/store/slices/layerControlsSlice';
import { PaletteSelector } from '@/components/PaletteSelector';
import useLayerControls from './useLayerControls';
import type { PaletteType } from '@/components/PaletteSelector.props';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { LayerControlsProps } from './LayerControls.props';


export const LayerControls = ({ title, layerIndex }: LayerControlsProps) => {
  const dispatch = useAppDispatch();
  const selectId = `${title.toLowerCase().replace(/\s+/g, '-')}-fill-by`;

  const { layerStyle, fillByOptions } = useLayerControls(layerIndex);

  function onFillColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateLayerFillColor({
        layerIndex,
        value: event.target.value,
      }),
    );
  }

  function onOutlineColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateLayerOutlineColor({
        layerIndex,
        value: event.target.value,
      }),
    );
  }

  function onOutlineSizeChange(_event: Event, value: number | number[]) {
    dispatch(
      updateLayerOutlineSize({
        layerIndex,
        value: typeof value === 'number' ? value : value[0],
      }),
    );
  }

  function onRadiusChange(_event: Event, value: number | number[]) {
    dispatch(
      updateLayerRadius({
        layerIndex,
        value: typeof value === 'number' ? value : value[0],
      }),
    );
  }

  function onFillByChange(event: SelectChangeEvent<string>) {
    dispatch(
      updateLayerFillBy({
        layerIndex,
        value: event.target.value as string,
      }),
    );
  }

  function onPaletteChange(palette: string) {
    dispatch(
      updateLayerPalette({
        layerIndex,
        value: palette as PaletteType,
      }),
    );
  }

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} sx={{ marginBottom: '14px' }}>
        {title}
      </Typography>

      <FormControl
        size="small"
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
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

        {layerStyle.fillBy === 'solid_color' ? (
          <TextField
            label="Fill color"
            type="color"
            value={layerStyle.fillColor}
            onChange={onFillColorChange}
            size="small"
            fullWidth
          />
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Color palette
            </Typography>
            <PaletteSelector
              value={layerStyle.palette}
              onChange={onPaletteChange}
            />
          </Box>
        )}
      </FormControl>

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
    </Box>
  );
};
