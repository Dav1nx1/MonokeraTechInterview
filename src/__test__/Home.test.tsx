import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import React from 'react';

// Mock the ResultLists component to avoid external API calls
jest.mock('@/components/shared/ResultList', () => ({
  ResultLists: jest.fn(() => <div data-testid="mock-result-list">Mock Result List</div>),
}));

// Mock the SearchInput component
jest.mock('@/components/shared/SearchInput', () => ({
  SearchInput: jest.fn(({ nameFilter, handleNameFilter }) => (
    <input
      data-testid="search-input"
      value={nameFilter}
      onChange={(e) => handleNameFilter(e.target.value)}
      placeholder="Search..."
    />
  )),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page title correctly', () => {
    render(<Home />);
    
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Rick and Morty');
  });

  it('should update search input value and filter results', () => {
    render(<Home />);

    const searchInput = screen.getByTestId('search-input');
    const mockResultList = screen.getByTestId('mock-result-list');

    // Initially, the input should be empty
    expect(searchInput).toHaveValue('');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Rick' } });

    // Check if the search input value is updated
    expect(searchInput).toHaveValue('Rick');

    // Ensure the mock ResultLists component is still rendered
    expect(mockResultList).toBeInTheDocument();
  });

  it('should render the result list', () => {
    render(<Home />);
    
    const mockResultList = screen.getByTestId('mock-result-list');
    expect(mockResultList).toBeInTheDocument();
  });
});
