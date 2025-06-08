import React, { useState, useEffect } from 'react';
import { Palette, X, CheckCircle2 } from 'lucide-react';
import { themes } from '../utils/themes';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (themeId: string) => void;
  activeTheme: string;
}

export const ThemeSelector = ({ isOpen, onClose, onSelectTheme, activeTheme }: ThemeSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('geometric');
  
  const categories = [
    { id: 'geometric', name: 'Geometric' },
    { id: 'nature', name: 'Nature' },
    { id: 'emotion', name: 'Emotion' },
    { id: 'anime', name: 'Anime' },
    { id: 'movie', name: 'Movie' }
  ];
  
  const themesByCategory = Object.values(themes).reduce((acc, theme) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof themes[keyof typeof themes][]>);

  // Special case for geometric themes (filter by ID)
  const geometricThemes = Object.values(themes).filter(theme => 
    theme.id.includes('geometric')
  );
  
  if (geometricThemes.length > 0) {
    themesByCategory['geometric'] = geometricThemes;
  }
  
  if (!isOpen) return null;
  
  const filteredThemes = themesByCategory[selectedCategory] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-zinc-900 rounded-xl border border-zinc-800 w-full max-w-2xl p-6 max-h-[80vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2 mb-6">
          <Palette className="w-6 h-6 text-gold" />
          <h2 className="text-xl font-bold text-white">Select Theme</h2>
        </div>
        
        {/* Category tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gold text-zinc-900 font-medium'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Themes grid */}
        <div className="overflow-y-auto max-h-[calc(80vh-180px)] pb-4 pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredThemes.map(theme => {
              const isActive = activeTheme === theme.id;
              
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`relative bg-zinc-800 rounded-lg p-4 text-left transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-gold' : 'hover:translate-y-[-2px]'
                  }`}
                  style={{
                    background: theme.gradients?.surface || theme.colors.surface,
                    color: theme.colors.text
                  }}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2 text-gold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <div 
                    className="w-full h-16 rounded-md mb-3" 
                    style={{
                      background: theme.gradients?.primary || theme.colors.primary,
                      borderColor: theme.colors.border,
                      borderWidth: '1px'
                    }}
                  />
                  <h3 className="font-medium mb-1">{theme.name}</h3>
                  <p className="text-xs opacity-80">{theme.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 