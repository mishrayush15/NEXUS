// src/utils/characters.ts
import axios from "axios";

export interface Character {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  tags: string[];
  languages: {
    primary: string;
    secondary?: string[];
    style?: string;
    greeting?: string;
  };
  personality: {
    traits: string[];
    quirks: string[];
    emotionalStyle: string;
    speakingStyle: string;
    interests: string[];
    background: string;
  };
  voice?: {
    name: string;
    pitch: number;
    rate: number;
    language: string;
  };
}

// Convert character name to slug for object key
const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

// Function to fetch and return as Record<string, Character>
export const loadCharacters = async (): Promise<Record<string, Character>> => {
  try {
    const response = await axios.get<Character[]>(
      "http://localhost:8000/api/v1/chat/models"
    );
    const charactersArray = response.data;

    const characters: Record<string, Character> = {};
    for (const character of charactersArray) {
      const slug = toSlug(character.name);
      characters[slug] = character;
    }

    return characters;
  } catch (err) {
    console.error("Failed to load characters from API", err);
    return {};
  }
};
