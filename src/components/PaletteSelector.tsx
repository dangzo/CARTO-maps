import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemo } from 'react';
import { PALETTE_DEFINITIONS, type PaletteSelectorProps } from './PaletteSelector.props';

export const PaletteSelector = ({ value, onChange }: PaletteSelectorProps) => {
  const palettes = useMemo(() => Object.entries(PALETTE_DEFINITIONS), []);

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      fullWidth
      size="small"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        '& .MuiToggleButtonGroup-grouped': {
          margin: 0,
          border: 'none',
          borderRadius: '4px',
        },
      }}
    >
      {palettes.map(([paletteName, colors]) => (
        <ToggleButton
          key={paletteName}
          data-testid={paletteName}
          value={paletteName}
          sx={{
            display: 'flex',
            gap: 0.5,
            justifyContent: 'flex-start',
            borderRadius: '4px',
            padding: '8px',
            '&.Mui-selected': {
              backgroundColor: '#e6e5e5ff',
              '&:hover': {
                backgroundColor: '#d6d5d5ff',
              },
            },
            '&:hover': {
              backgroundColor: '#fafafa',
            },
          }}
        >
          <Stack
            direction="row"
            spacing={0.3}
            sx={{
              flex: 1,
              minHeight: '21px',
            }}
          >
            {colors.map((color, idx) => (
              <Box
                key={`${paletteName}-${idx}`}
                data-testid={`${paletteName}-${idx}`}
                sx={{
                  flex: 1,
                  backgroundColor: color,
                  borderRadius: '3px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  minWidth: '20px',
                }}
              />
            ))}
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
