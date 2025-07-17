// src/contexts/CharacterContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Character, loadCharacters } from "../utils/characters";

interface CharacterContextType {
  characters: Record<string, Character>;
  loading: boolean;
}

const CharacterContext = createContext<CharacterContextType>({
  characters: {},
  loading: true,
});

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await loadCharacters();
        setCharacters(data);
      } catch (err) {
        console.error("Failed to load characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <CharacterContext.Provider value={{ characters, loading }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => useContext(CharacterContext);
