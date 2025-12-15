import ControlsDrawer from "./ControlsDrawer";
import { screen, within } from '@testing-library/react';
import { setupStore } from "@/store";
import { renderWithProviders } from "@/utils/test-utils";

const layer1InitialState = {
  fillColor: '#4caf50',
  outlineSize: 1,
  outlineColor: '#1b5e20',
  radius: 2,
  fillBy: 'Revenue (retail_stores)',
};

const layer2InitialState = {
  fillColor: '#fcac50',
  outlineSize: 1,
  outlineColor: '#5b1e50',
  radius: 2,
  fillBy: 'Revenue (retail_stores)',
};

describe('ControlsDrawer', () => {
  it('should render the controls drawer', () => {
    renderWithProviders(<ControlsDrawer />, { store: setupStore() });
    expect(screen.getByRole('heading', { name: 'Controls' })).toBeInTheDocument();
  });

  it('should render two layers with correct initial values', () => {
    renderWithProviders(<ControlsDrawer />, { store: setupStore() });

    // Check for Layer 1 controls
    expect(screen.getByText('Layer 1: Retail Stores')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Fill color')[0]).toHaveValue(layer1InitialState.fillColor);
    expect(screen.getAllByLabelText('Outline size')[0]).toHaveValue(layer1InitialState.outlineSize.toString());
    expect(screen.getAllByLabelText('Outline color')[0]).toHaveValue(layer1InitialState.outlineColor);
    expect(screen.getAllByLabelText('Radius')[0]).toHaveValue(layer1InitialState.radius.toString());
    expect(
      within(screen.getAllByLabelText('Fill by')[0]).getByText(layer1InitialState.fillBy)
    ).toBeInTheDocument();

    // Check for Layer 2 controls
    expect(screen.getByText('Layer 2: Tilemap')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Fill color')[1]).toHaveValue(layer2InitialState.fillColor);
    expect(screen.getAllByLabelText('Outline size')[1]).toHaveValue(layer2InitialState.outlineSize.toString());
    expect(screen.getAllByLabelText('Outline color')[1]).toHaveValue(layer2InitialState.outlineColor);
    expect(screen.getAllByLabelText('Radius')[1]).toHaveValue(layer2InitialState.radius.toString());
    expect(
      within(screen.getAllByLabelText('Fill by')[1]).getByText(layer2InitialState.fillBy)
    ).toBeInTheDocument();
  });
});
