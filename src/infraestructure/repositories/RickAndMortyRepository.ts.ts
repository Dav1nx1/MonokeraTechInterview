import { Character, Pagination } from '@/types/Entities';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const RickAndMortyRepository = {
  fetchCharacters: async (page: number, name?: string): Promise<Pagination<Character>> => {

    const params = new URLSearchParams();

  // Conditionally append `name` if it exists
  if (name) {
    params.append('name', name);
  }

  // Conditionally append `page` if it exists
  if (page && !name) {
    params.append('page', page.toString());
  }


    const response = await axios.get(`${API_URL}/character?${params.toString()}`);
    return response.data;
  },

  fetchCharacterById: async (id: number): Promise<Character> => {
    const response = await axios.get(`${API_URL}/character/${id}`);
    return response.data;
  },
};