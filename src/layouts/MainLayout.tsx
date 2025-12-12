import { Box, Drawer } from '@mui/material';
import type { ReactNode } from 'react';
import ControlsDrawer from '@/features/controls-drawer/ControlsDrawer';

const drawerWidth = 320;

export default function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        {children}
      </Box>

      {/* Right Drawer */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <ControlsDrawer />
      </Drawer>
    </Box>
  );
}
