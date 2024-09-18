import { render, screen, fireEvent } from '@testing-library/react';
import { ResultLists } from '@/components/shared/ResultList';
import '@testing-library/jest-dom';
import React from 'react';
import { useFetchCharacters } from '@/useCases/fetchCharacters';
import { PaginationProps } from '@/components/shared/Pagination';

// Mocking the useFetchCharacters hook
jest.mock('@/useCases/fetchCharacters');

// Mock CharacterCard and Pagination components
jest.mock('@/components/shared/CharacterCard', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CharacterCard: ({ character }: { character: any }) => (
    <div data-testid="character-card">{character.name}</div>
  ),
}));

jest.mock('@/components/shared/Pagination', () => ({
  Pagination: ({ currentPage, handleNextPage, handlePreviousPage, pages }: PaginationProps) => (
    <div>
      <button data-testid="prev-page" onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button data-testid="next-page" onClick={handleNextPage} disabled={currentPage >= pages}>
        Next Page
      </button>
      <span data-testid="page-info">Page {currentPage} of {pages}</span>
    </div>
  ),
}));

describe('ResultLists Component', () => {
  it('should render loading state', () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<ResultLists nameFilter="Rick" />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('should render no results message if no characters found', () => {
    (useFetchCharacters as jest.Mock).mockReturnValue({
      data: { results: [], info: { pages: 0 } },
      isLoading: false,
    });

    render(<ResultLists nameFilter="Non-existent" />);
    expect(screen.getByText(/No results found/)).toBeInTheDocument();
  });

  it('should render a list of character cards', () => {
    const mockData = {
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      info: { pages: 2 },
    };

    (useFetchCharacters as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ResultLists nameFilter="Rick" />);

    // Check if the characters are rendered
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should handle pagination', () => {
    const mockData = {
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      info: { pages: 2, next: true },
    };

    (useFetchCharacters as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ResultLists nameFilter="Rick" />);

    // Check initial pagination state
    const prevButton = screen.getByTestId('prev-page');
    const nextButton = screen.getByTestId('next-page');
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 1 of 2');

    // Click next page
    fireEvent.click(nextButton);
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 2 of 2');

    // Click previous page
    fireEvent.click(prevButton);
    expect(screen.getByTestId('page-info')).toHaveTextContent('Page 1 of 2');
  });

  it('should disable next button on the last page', () => {
    const mockData = {
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      info: { pages: 1 },
    };

    (useFetchCharacters as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ResultLists nameFilter="Rick" />);
    const nextButton = screen.getByTestId('next-page');

    // Next button should be disabled on the last page
    expect(nextButton).toBeDisabled();
  });
});
