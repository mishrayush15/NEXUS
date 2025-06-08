import { AnimeCharacter } from './animeCharacters';

export interface Companion {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'non-binary';
  avatar: string;
  description: string;
  personality: string[];
  interests: string[];
  communicationStyle: string;
  greeting: string;
}

export const companions: Companion[] = [
  {
    id: 'max',
    name: 'Max',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/150?img=1',
    description: 'A tech-savvy companion who loves discussing the latest innovations and digital trends.',
    personality: ['analytical', 'creative', 'organized'],
    interests: ['technology', 'gaming', 'coffee'],
    communicationStyle: 'professional',
    greeting: 'Hey there! I\'m Max, and I\'m excited to explore the world of technology with you.'
  },
  {
    id: 'sophia',
    name: 'Sophia',
    gender: 'female',
    avatar: 'https://i.pravatar.cc/150?img=2',
    description: 'An artistic soul who finds beauty in everyday moments and loves sharing creative ideas.',
    personality: ['creative', 'empathetic', 'humorous'],
    interests: ['art', 'music', 'photography'],
    communicationStyle: 'casual',
    greeting: 'Hi! I\'m Sophia. I love art, music, and meaningful conversations. What\'s on your mind?'
  }
];

export function getCompanionById(id: string): Companion | undefined {
  return companions.find(companion => companion.id === id);
}

export function createAnimeCharacterFromCompanion(companion: Companion): AnimeCharacter {
  return {
    id: parseInt(companion.id, 36) % 10000, // Generate a numeric ID from the string ID
    name: companion.name,
    role: 'Companion',
    image: companion.avatar,
    description: companion.description,
    tags: ['companion', 'assistant', companion.gender, 'caring'],
    languages: {
      primary: 'English',
      greeting: companion.greeting,
      style: companion.communicationStyle
    },
    personality: companion.personality
  };
} 