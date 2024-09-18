/* eslint-disable @typescript-eslint/no-unused-vars */
import { CharacterRepository } from '../Repositories';
import { Character } from '../Entities';

describe('CharacterRepository Interface', () => {
  class DummyCharacterRepository implements CharacterRepository {
    fetchCharacters(page: number, nameFilter?: string): Promise<Character[]> {
      return Promise.resolve([]);
    }

    fetchCharacterById(id: number): Promise<Character> {
      return Promise.resolve({ 
        id: 1, 
        name: 'Rick Sanchez', 
        status: 'Alive', 
        species: 'Human', 
        type: '', 
        gender: 'Male', 
        origin: { name: 'Earth', type: 'Planet', dimension: 'Dimension C-137' },
        location: { name: 'Earth', type: 'Planet', dimension: 'Dimension C-137' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      });
    }
  }

  it('should implement fetchCharacters method', async () => {
    const repo = new DummyCharacterRepository();
    const characters = await repo.fetchCharacters(1);
    expect(characters).toEqual([]);
  });

  it('should implement fetchCharacterById method', async () => {
    const repo = new DummyCharacterRepository();
    const character = await repo.fetchCharacterById(1);
    expect(character).toEqual({ 
      id: 1, 
      name: 'Rick Sanchez', 
      status: 'Alive', 
      species: 'Human', 
      type: '', 
      gender: 'Male', 
      origin: { name: 'Earth', type: 'Planet', dimension: 'Dimension C-137' },
      location: { name: 'Earth', type: 'Planet', dimension: 'Dimension C-137' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    });
  });
});