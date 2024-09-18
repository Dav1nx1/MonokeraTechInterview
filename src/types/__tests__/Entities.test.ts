// types/__tests__/Entities.test.ts

import { Character, Location } from '../Entities';

describe('Domain Entities', () => {
  it('should create a valid Location entity', () => {
    const location: Location = {
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'Unknown'
    };

    expect(location).toEqual({
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'Unknown'
    });
  });

  it('should create a valid Character entity', () => {
    const character: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: {
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137'
      },
      origin: {
        name: 'test',
        type: 'test',
        dimension: 'test',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    };

    expect(character).toEqual({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      location: {
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137'
      },
      origin: {
        name: 'test',
        type: 'test',
        dimension: 'test',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    });
  });
});
