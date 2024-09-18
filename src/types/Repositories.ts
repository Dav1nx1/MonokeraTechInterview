import { Character } from './Entities';

export interface CharacterRepository {
  // Fetches a list of characters with pagination support
  fetchCharacters(page: number, nameFilter?: string): Promise<Character[]>;

  // Fetches detailed information about a specific character by ID
  fetchCharacterById(id: number): Promise<Character>;
}