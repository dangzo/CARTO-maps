import { render, screen, fireEvent } from '@testing-library/react';
import { PaletteSelector } from './PaletteSelector';
import { PALETTES } from '@/data/constants/colors';
import type { PaletteType } from './PaletteSelector.types';

describe('PaletteSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all palette options', () => {
    const initialPalette: PaletteType = Object.keys(PALETTES)[0] as PaletteType;
    render(<PaletteSelector value={initialPalette} onChange={mockOnChange} />);

    const paletteNames = Object.keys(PALETTES);
    paletteNames.forEach(paletteName => {
      expect(screen.getByTestId(paletteName)).toBeInTheDocument();
    });
  });

  it('renders color boxes for each palette', () => {
    const firstPalette = Object.entries(PALETTES)[0];
    const firstPaletteName: PaletteType = firstPalette[0] as PaletteType;
    render(<PaletteSelector value={firstPaletteName} onChange={mockOnChange} />);

    const [paletteName, colors] = firstPalette;

    colors.forEach((_, idx) => {
      const colorBox = screen.getByTestId(`${paletteName}-${idx}`);
      expect(colorBox).toBeInTheDocument();
    });
  });

  it('calls onChange when a palette is selected', () => {
    const palettes: PaletteType[] = Object.keys(PALETTES) as PaletteType[];
    render(<PaletteSelector value={palettes[0]} onChange={mockOnChange} />);

    const otherPaletteBtn = screen.getByTestId(palettes[1]);

    fireEvent.click(otherPaletteBtn);

    expect(mockOnChange).toHaveBeenCalledWith(palettes[1]);
  });

  it('does not call onChange when the same palette is clicked', () => {
    const selectedPalette: PaletteType = Object.keys(PALETTES)[0] as PaletteType;
    render(<PaletteSelector value={selectedPalette} onChange={mockOnChange} />);

    const paletteButton = screen.getByTestId(selectedPalette);
    fireEvent.click(paletteButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('shows selected palette with correct styling', () => {
    const selectedPalette = Object.keys(PALETTES)[0] as PaletteType;
    render(<PaletteSelector value={selectedPalette} onChange={mockOnChange} />);

    const paletteButton = screen.getByTestId(selectedPalette);
    expect(paletteButton).toHaveClass('Mui-selected');
  });
});
