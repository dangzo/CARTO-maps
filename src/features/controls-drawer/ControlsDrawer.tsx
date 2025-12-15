import { LayerControls } from './components/LayerControls';
import { Box, Divider, Typography } from '@mui/material';

export default function ControlsDrawer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <Typography variant="h6" fontWeight={700}>
				Controls
      </Typography>

      <LayerControls title="Layer 1: Retail Stores" layerIndex={0} />

      <Divider flexItem />

      <LayerControls title="Layer 2: Tilemap" layerIndex={1} />
    </Box>
  );
}
