import { useQuery } from '@tanstack/react-query';
import { RickAndMortyRepository } from '@/infraestructure/repositories/RickAndMortyRepository.ts';
import { CharacterContext } from '@/context/CharacterContext';
import { useContext } from 'react';

export const useFetchCharacters = (page: number, nameFilter?: string) => {
  const { addCharacters } = useContext(CharacterContext)!;
  
  return useQuery({ 
    queryKey: ['characters', page, nameFilter], 
    queryFn: async () => {
      const response = await RickAndMortyRepository.fetchCharacters(page, nameFilter);
      addCharacters(response.results); // Update Zustand global state
      return response;
    },
  })
};