import { useQuery } from '@tanstack/react-query';
import { RickAndMortyRepository } from '@/infraestructure/repositories/RickAndMortyRepository.ts';

export const useFetchCharacterById = (id: number) => {
  return useQuery({ 
    queryKey: ['charactersById', id], 
    queryFn: () => RickAndMortyRepository.fetchCharacterById(id),
  })
};