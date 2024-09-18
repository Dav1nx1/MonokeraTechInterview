import { render, screen } from '@testing-library/react';
import { Header } from '@/components/shared/Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('should render the app title correctly', () => {
    render(<Header />);
    
    // Check if the title is rendered
    const title = screen.getByText('Monokera');
    expect(title).toBeInTheDocument();
  });

  it('should render the technical interview subheading', () => {
    render(<Header />);
    
    // Check if the subheading is rendered
    const subheading = screen.getByText('Public Technical Interview');
    expect(subheading).toBeInTheDocument();
  });
});
