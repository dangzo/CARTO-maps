import { LayerControls } from './LayerControls';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';

const initialValues = {
  fillColor: '#0f87e9',
  outlineSize: 1,
  outlineColor: '#2f3964',
  radius: 3,
  fillBy: 'solid_color',
  palette: 'Purp',
};

describe('LayerControls', () => {
  describe('Rendering', () => {
    it('should render LayerControls component with given title', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    it('should render all control elements', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      expect(screen.getByLabelText('Fill color')).toBeInTheDocument();
      expect(screen.getByLabelText('Outline color')).toBeInTheDocument();
      expect(screen.getByLabelText('Outline size')).toBeInTheDocument();
      expect(screen.getByLabelText('Radius')).toBeInTheDocument();
      expect(screen.getByLabelText('Fill by')).toBeInTheDocument();
    });

    it('should have correct initial values for controls', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      expect(screen.getByLabelText('Fill color')).toHaveValue(initialValues.fillColor);
      expect(screen.getByLabelText('Outline color')).toHaveValue(initialValues.outlineColor);
      expect(screen.getByLabelText('Outline size')).toHaveValue(initialValues.outlineSize.toString());
      expect(screen.getByLabelText('Radius')).toHaveValue(initialValues.radius.toString());
      expect(screen.getByText('Solid color')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should update fill color on change', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';
      const newFillColor = '#ff0000';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      const fillColorInput = screen.getByLabelText('Fill color') as HTMLInputElement;
      fillColorInput.value = newFillColor;
      fillColorInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(fillColorInput).toHaveValue(newFillColor);
    });

    it('should update outline size on change', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';
      const newOutlineSize = 3;

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      const outlineSizeSlider = screen.getByLabelText('Outline size') as HTMLInputElement;
      outlineSizeSlider.value = newOutlineSize.toString();
      outlineSizeSlider.dispatchEvent(new Event('input', { bubbles: true }));

      expect(outlineSizeSlider).toHaveValue(newOutlineSize.toString());
    });

    it('should update outline color on change', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';
      const newOutlineColor = '#00ff00';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      const outlineColorInput = screen.getByLabelText('Outline color') as HTMLInputElement;
      outlineColorInput.value = newOutlineColor;
      outlineColorInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(outlineColorInput).toHaveValue(newOutlineColor);
    });

    it('should update radius on change', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';
      const newRadius = 10;
      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      const radiusSlider = screen.getByLabelText('Radius') as HTMLInputElement;
      radiusSlider.value = newRadius.toString();
      radiusSlider.dispatchEvent(new Event('input', { bubbles: true }));

      expect(radiusSlider).toHaveValue(newRadius.toString());
    });

    it('should update fill by on change', () => {
      const layerIndex = 0;
      const title = 'Layer 1: Retail Stores';
      const newFillBy = 'Customers (retail_stores)';

      renderWithProviders(<LayerControls title={title} layerIndex={layerIndex} />);

      const fillBySelect = screen.getByLabelText('Fill by') as HTMLInputElement;
      fillBySelect.value = newFillBy;
      fillBySelect.dispatchEvent(new Event('change', { bubbles: true }));

      expect(fillBySelect).toHaveValue(newFillBy);
    });
  });
});
