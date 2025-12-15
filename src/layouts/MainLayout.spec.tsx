import MainLayout from './MainLayout';
import { render, screen } from '@testing-library/react';

describe('MainLayout', () => {
  it('renders main content and drawer content', () => {
    render(
      <MainLayout
        children={{
          main: <div>Main Content</div>,
          drawer: <div>Drawer Content</div>,
        }}
      />
    );

    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });
});
