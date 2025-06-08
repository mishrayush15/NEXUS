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

import { animeCharacters } from './animeCharacters';

export const characters: Record<string, Character> = animeCharacters;


