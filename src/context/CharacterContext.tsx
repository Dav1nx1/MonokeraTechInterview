// src/context/CharacterContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Character } from '@/types/Entities'

export interface CharacterContextProps {
  characters: Character[];
  recentlyViewed: Character[];
  addCharacters: (newCharacters: Character[]) => void;
  addRecentlyViewed: (character: Character) => void;
}

export const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Character[]>([]);

  const addCharacters = (newCharacters: Character[]) => {
    setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
  };

  const addRecentlyViewed = (character: Character) => {
    setRecentlyViewed((prevRecentlyViewed) => {
      const alreadyViewed = prevRecentlyViewed.find((c) => c.id === character.id);
      if (alreadyViewed) return prevRecentlyViewed;
      return [character, ...prevRecentlyViewed.slice(0, 4)]; // Keep only the last 5
    });
  };

  return (
    <CharacterContext.Provider value={{ characters, recentlyViewed, addCharacters, addRecentlyViewed }}>
      {children}
    </CharacterContext.Provider>
  );
};
