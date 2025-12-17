import { RetailStoresWidget } from './RetailStoresWidget';
import { act, render, screen } from '@testing-library/react';
import type { VectorTableSourceResponse } from '@carto/api-client';

vi.mock('@/hooks/useDataSources', () => ({
  default: vi.fn().mockReturnValue({
    retailStoresDataSource: {},
  }),
}));

// mock retailStoresDataSource
const mockRetailStoresDataSource = new Promise<VectorTableSourceResponse>((resolve) => {
  resolve({
    // @ts-expect-error Mocked data is missing properties
    widgetSource: {
      getFormula: vi.fn().mockResolvedValue({ value: 100 }),
      getCategories: vi.fn().mockResolvedValue([
        { name: 'Type A', value: 60100000 },
        { name: 'Type B', value: 40200000 },
      ]),
    },
  });
});

describe('RetailStoresWidget', () => {
  it('renders the widget title', async () => {
    render(<RetailStoresWidget retailStoresDataSource={mockRetailStoresDataSource} />);

    // Wait for loading to finish
    await act(async () => {
      await Promise.resolve();
    });

    const titleElement = screen.getByText(/Retail Stores/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the total stores and revenue by type sections', async () => {
    render(<RetailStoresWidget retailStoresDataSource={mockRetailStoresDataSource} />);

    // Wait for loading to finish
    await act(async () => {
      await Promise.resolve();
    });

    const totalStoresElement = screen.getByText(/Total Stores/i);
    const revenueByTypeElement = screen.getByText(/Revenue by Store Type/i);

    expect(totalStoresElement).toBeInTheDocument();
    expect(revenueByTypeElement).toBeInTheDocument();
  });

  it('displays correct total stores and revenue by type data', async () => {
    render(<RetailStoresWidget retailStoresDataSource={mockRetailStoresDataSource} />);

    // Wait for loading to finish
    await act(async () => {
      await Promise.resolve();
    });

    const totalStoresValue = screen.getByText('100');
    const typeAValue = screen.getByText('$60.1M');
    const typeBValue = screen.getByText('$40.2M');

    expect(totalStoresValue).toBeInTheDocument();
    expect(typeAValue).toBeInTheDocument();
    expect(typeBValue).toBeInTheDocument();
  });
});

