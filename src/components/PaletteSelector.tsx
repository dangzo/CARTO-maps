import { css } from '@emotion/react';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemo } from 'react';
import { PALETTES } from '@/data/constants/colors';
import type { PaletteSelectorProps } from './PaletteSelector.props';

export const PaletteSelector = ({ value, onChange }: PaletteSelectorProps) => {
  const palettes = useMemo(() => Object.entries(PALETTES), []);

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
        '& .MuiToggleButtonGroup-grouped': {
          margin: 0,
          border: 'none',
          borderRadius: '0',
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
            justifyContent: 'flex-start',
            padding: '8px',
            '&.Mui-selected': {
              backgroundColor: '#dadad5af',
            },
            '&:hover': {
              backgroundColor: '#dadad5af',
            },
          }}
        >
          <Stack
            direction="row"
            sx={{
              flex: 1,
              minHeight: '24px',
            }}
          >
            <span css={css`padding-right: 8px;`}>{paletteName}</span>

            {colors.map((color, idx) => (
              <Box
                key={`${paletteName}-${idx}`}
                data-testid={`${paletteName}-${idx}`}
                sx={{
                  flex: 1,
                  backgroundColor: color,
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
