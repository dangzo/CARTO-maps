import { Box, Drawer } from '@mui/material';
import type { ReactNode } from 'react';

const drawerWidth = 320;

interface MainLayoutProps {
  children?: {
    main?: ReactNode;
    drawer?: ReactNode;
  };
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Right Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {children?.drawer}
      </Drawer>

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
        {children?.main}
      </Box>
    </Box>
  );
}
