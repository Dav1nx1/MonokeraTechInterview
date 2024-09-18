import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchInput } from '@/components/shared/SearchInput';
import '@testing-library/jest-dom';
import { CharacterContext, CharacterContextProps } from '@/context/CharacterContext';
import React from 'react';
import { Character } from '@/types/Entities';

// Mock the handleNameFilter function
const mockHandleNameFilter = jest.fn();

describe('SearchInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); 
  });
  
  // Provide complete character data
  const mockRecentlyViewed: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: '/_next/image?url=%2Frick.png&w=828&q=75',
      type: 'human',
      gender: 'male',
      origin: {
        name: 'earth'
      },
      location: { 
        name: 'Earth', 
        type: 'any', 
        dimension: 'any' 
      },
    },
    {
      id: 1,
      name: "Morty Smith",
      status: 'Alive',
      species: 'Human',
      image: '/_next/image?url=%2Frick.png&w=828&q=75',
      type: 'human',
      gender: 'male',
      origin: {
        name: 'earth'
      },
      location: { 
        name: 'Earth', 
        type: 'any', 
        dimension: 'any' 
      },
    }
  ];

  // Define mock functions for context methods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockAddCharacters = (newCharacters: Character[]) => {
    // Logic for adding new characters
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockAddRecentlyViewed = (character: Character) => {
    // Logic for adding recently viewed character
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockContextValue: CharacterContextProps = {
    characters: [], // Add your initial characters if any
    recentlyViewed: mockRecentlyViewed,
    addCharacters: mockAddCharacters,
    addRecentlyViewed: mockAddRecentlyViewed,
  };
  
  // Your component rendering logic
  const renderComponent = () => {
    return render(
      <CharacterContext.Provider value={mockContextValue}>
        <SearchInput nameFilter="" handleNameFilter={mockHandleNameFilter} />
      </CharacterContext.Provider>
    );
  };

  it('should render search input with placeholder text', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should trigger handleNameFilter when typing more than 2 characters', async () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search...');

    // Simulate typing more than 2 characters
    fireEvent.change(searchInput, { target: { value: 'Rick' } });

    // Fast-forward time for debounce to resolve
    act(() => {
      jest.runAllTimers();
    });

    // Now check if the function was called
    expect(mockHandleNameFilter).toHaveBeenCalledTimes(1);
    expect(mockHandleNameFilter).toHaveBeenCalledWith('rick');
  });

  it('should not trigger handleNameFilter when typing fewer than 3 characters', async () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search...');

    // Simulate typing fewer than 3 characters
    fireEvent.change(searchInput, { target: { value: 'Ri' } });

    // Fast-forward time for debounce to resolve
    act(() => {
      jest.runAllTimers();
    });

    // Since the input is less than 3 characters, the function should not be called
    expect(mockHandleNameFilter).toHaveBeenCalledTimes(1); // It is initially called with empty string.
    expect(mockHandleNameFilter).toHaveBeenCalledWith('');
  });

  it('should render recently viewed buttons', () => {
    renderComponent();

    // Check that the recently viewed buttons are rendered
    const recentlyViewedButtons = screen.getAllByRole('button');
    expect(recentlyViewedButtons).toHaveLength(mockRecentlyViewed.length);
    expect(recentlyViewedButtons[0]).toHaveTextContent('Rick Sanchez');
    expect(recentlyViewedButtons[1]).toHaveTextContent('Morty Smith');
  });

  it('should trigger handleQuickSearch when a recently viewed item is clicked', () => {
    renderComponent();
    const recentlyViewedButton = screen.getByText('Rick Sanchez');

    // Simulate a click on the recently viewed item
    fireEvent.click(recentlyViewedButton);

    // Fast-forward time for debounce to resolve
    act(() => {
      jest.runAllTimers();
    });

    // Check if handleNameFilter is called with the correct value
    expect(mockHandleNameFilter).toHaveBeenCalledTimes(1);
    expect(mockHandleNameFilter).toHaveBeenCalledWith('rick sanchez');
  });
});
