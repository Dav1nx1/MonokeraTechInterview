import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '@/components/shared/CharacterCard';
import '@testing-library/jest-dom';
import React from 'react';
import { useRouter } from 'next/navigation';

// Mock the router from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('CharacterCard Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCharacter = {
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
  };

  it('should render the character card with correct information', () => {
    render(<CharacterCard character={mockCharacter} />);

    // Check if the image is rendered with the correct alt text
    const image = screen.getByAltText('Image of Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('loading', 'lazy');

    // Check if the character's name is rendered
    const name = screen.getByText('Rick Sanchez');
    expect(name).toBeInTheDocument();

    // Check if the character's status is rendered
    const status = screen.getByText('Alive');
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass('bg-green-500');

    // Check if the character's species and location are rendered
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Location: Earth')).toBeInTheDocument();
  });

  it('should call router.push with the correct character id when the button is clicked', () => {
    render(<CharacterCard character={mockCharacter} />);

    // Click the button
    fireEvent.click(screen.getByRole('button', { name: /View details for Rick Sanchez/i }));

    // Check if router.push is called with the correct URL
    expect(mockPush).toHaveBeenCalledWith('/character/1');
  });

  it('should apply hover effect on mouse enter and remove it on mouse leave', () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);

    const card = container.querySelector('.w-full');

    // Initially, it should not have hover classes
    expect(card).not.toHaveClass('shadow-lg', 'scale-105');

    // Simulate mouse enter
    fireEvent.mouseEnter(card!);
    expect(card).toHaveClass('shadow-lg', 'scale-105');

    // Simulate mouse leave
    fireEvent.mouseLeave(card!);
    expect(card).not.toHaveClass('shadow-lg', 'scale-105');
  });
});
