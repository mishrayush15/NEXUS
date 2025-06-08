import { useEffect } from 'react';

// Key for localStorage
const VIEWS_STORAGE_KEY = 'nexus_character_views';

// Interface for view data
export interface ViewsData {
  views: Record<string, number>;
  lastUpdated: number;
}

// Character ranking object
export interface RankedCharacter {
  id: string;
  views: number;
  rank: number;
}

// Initialize views from localStorage or create empty object
export const initializeViews = (): ViewsData => {
  const storedData = localStorage.getItem(VIEWS_STORAGE_KEY);
  
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored views data:', error);
    }
  }
  
  // Default empty data
  return {
    views: {},
    lastUpdated: Date.now()
  };
};

// Save views data to localStorage
export const saveViews = (data: ViewsData): void => {
  try {
    localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving views data to localStorage:', error);
  }
};

// Increment view count for a character
export const incrementView = (characterId: string): void => {
  const data = initializeViews();
  
  // Increment view count or initialize to 1 if not exists
  data.views[characterId] = (data.views[characterId] || 0) + 1;
  data.lastUpdated = Date.now();
  
  saveViews(data);
};

// Get all views
export const getAllViews = (): Record<string, number> => {
  const data = initializeViews();
  return data.views;
};

// Get ranked characters
export const getRankedCharacters = (limit?: number): RankedCharacter[] => {
  const views = getAllViews();
  
  // Convert to array and sort by views (descending)
  const rankedCharacters = Object.entries(views)
    .map(([id, viewCount], index) => ({
      id,
      views: viewCount,
      rank: 0 // Will be set after sorting
    }))
    .sort((a, b) => b.views - a.views);
  
  // Add ranking
  rankedCharacters.forEach((character, index) => {
    character.rank = index + 1;
  });
  
  // Apply limit if specified
  return limit ? rankedCharacters.slice(0, limit) : rankedCharacters;
};

// Hook to use character views
export const useCharacterViews = (
  setViews: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  initialRandomData?: Record<string, number>
): void => {
  useEffect(() => {
    // Get stored views
    const storedViews = getAllViews();
    
    if (Object.keys(storedViews).length === 0 && initialRandomData) {
      // If no stored views and initial data provided, use the initial data
      saveViews({ views: initialRandomData, lastUpdated: Date.now() });
      setViews(initialRandomData);
    } else {
      // Otherwise use stored views
      setViews(storedViews);
    }
  }, [setViews, initialRandomData]);
}; 