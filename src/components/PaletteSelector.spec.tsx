import { render, screen, fireEvent } from '@testing-library/react';
import { PaletteSelector } from './PaletteSelector';
import { PALETTE_DEFINITIONS } from './PaletteSelector.props';

describe('PaletteSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all palette options', () => {
    render(<PaletteSelector value="" onChange={mockOnChange} />);

    const paletteNames = Object.keys(PALETTE_DEFINITIONS);
    paletteNames.forEach(paletteName => {
      expect(screen.getByTestId(paletteName)).toBeInTheDocument();
    });
  });

  it('renders color boxes for each palette', () => {
    render(<PaletteSelector value="" onChange={mockOnChange} />);

    const firstPalette = Object.entries(PALETTE_DEFINITIONS)[0];
    const [paletteName, colors] = firstPalette;

    colors.forEach((_, idx) => {
      const colorBox = screen.getByTestId(`${paletteName}-${idx}`);
      expect(colorBox).toBeInTheDocument();
    });
  });

  it('calls onChange when a palette is selected', () => {
    render(<PaletteSelector value="" onChange={mockOnChange} />);

    const firstPaletteName = Object.keys(PALETTE_DEFINITIONS)[0];
    const paletteButton = screen.getByTestId(firstPaletteName);

    fireEvent.click(paletteButton);

    expect(mockOnChange).toHaveBeenCalledWith(firstPaletteName);
  });

  it('does not call onChange when the same palette is clicked', () => {
    const selectedPalette = Object.keys(PALETTE_DEFINITIONS)[0];
    render(<PaletteSelector value={selectedPalette} onChange={mockOnChange} />);

    const paletteButton = screen.getByTestId(selectedPalette);
    fireEvent.click(paletteButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('shows selected palette with correct styling', () => {
    const selectedPalette = Object.keys(PALETTE_DEFINITIONS)[0];
    render(<PaletteSelector value={selectedPalette} onChange={mockOnChange} />);

    const paletteButton = screen.getByTestId(selectedPalette);
    expect(paletteButton).toHaveClass('Mui-selected');
  });
});
