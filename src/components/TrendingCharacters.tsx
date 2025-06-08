import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, TrendingUp, ArrowRight, X } from 'lucide-react';

interface TrendingCharactersProps {
  characters: Record<string, any>;
  views: Record<string, number>;
  likes: Record<string, number>;
  favorites: string[];
  toggleFavorite: (e: React.MouseEvent, slug: string) => void;
  handleLike: (e: React.MouseEvent, slug: string) => void;
}

export default function TrendingCharacters({
  characters,
  views,
  likes,
  favorites,
  toggleFavorite,
  handleLike
}: TrendingCharactersProps) {
  const navigate = useNavigate();
  const [showAllModal, setShowAllModal] = useState(false);
  
  // Get trending characters (top 4 by views)
  const trendingCharacters = Object.entries(characters)
    .map(([slug, character]) => ({
      slug,
      character,
      views: views[slug] || 0,
      likes: likes[slug] || 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);
    
  // Get all trending characters for the modal (top 20)
  const allTrendingCharacters = Object.entries(characters)
    .map(([slug, character]) => ({
      slug,
      character,
      views: views[slug] || 0,
      likes: likes[slug] || 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  // Color scheme for trending
  const colorScheme = {
    iconBg: 'bg-indigo-800/80',
    underline: 'bg-gradient-to-r from-indigo-500 to-nexus-blue-500',
    button: 'bg-gradient-to-r from-indigo-500 to-nexus-blue-500',
    tag: 'bg-indigo-800/80',
    highlight: 'text-indigo-300',
    badge: 'bg-indigo-500/90'
  };

  if (trendingCharacters.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorScheme.iconBg} mr-2`}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-poppins font-medium text-white">Trending Characters</h2>
            <div className={`h-1 w-12 mt-1 ${colorScheme.underline} rounded-full`}></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingCharacters.map(({ slug, character, views: viewCount }) => (
          <div
            key={slug}
            className="card relative group overflow-hidden"
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-neutral-900/20 to-nexus-neutral-900/80 z-10"></div>
            
            {/* Trending indicator */}
            <div className={`absolute top-3 left-3 z-20 flex items-center space-x-2 ${colorScheme.badge} text-white text-sm px-2 py-1 rounded-full backdrop-blur-sm`}>
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">Trending</span>
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={(e) => toggleFavorite(e, slug)}
              className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                favorites.includes(slug)
                  ? 'bg-nexus-purple-500 text-white'
                  : 'bg-nexus-neutral-800/70 text-nexus-neutral-300 hover:bg-nexus-neutral-700/70'
              }`}
            >
              <Star className="w-4 h-4" fill={favorites.includes(slug) ? "currentColor" : "none"} />
            </button>

            {/* Character image with overlay */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Character info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
              
              {/* Chat button */}
              <button 
                onClick={() => navigate(`/chat/${slug}`)}
                className={`w-full flex items-center justify-center space-x-1 px-3 py-2 ${colorScheme.button} text-white rounded-lg transition-all duration-200 text-sm font-medium hover:opacity-90`}
              >
                <span>Chat Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Trending Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nexus-neutral-900/80 backdrop-blur-sm p-4 md:p-8 overflow-hidden" style={{ isolation: 'isolate' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-nexus-neutral-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-soft animate-fade-in flex flex-col relative">
            {/* Header with prominent close button */}
            <div className="p-5 border-b border-nexus-neutral-700 flex items-center justify-between sticky top-0 bg-nexus-neutral-800 z-10">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorScheme.iconBg}`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-poppins font-medium text-white">All Trending Characters</h2>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="p-2.5 bg-nexus-neutral-700 hover:bg-nexus-neutral-600 rounded-full text-white transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content with improved scrolling */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allTrendingCharacters.map(({ slug, character, views: viewCount, likes: likeCount }) => (
                  <div
                    key={slug}
                    className="card relative group overflow-hidden"
                  >
                    {/* Trending rank indicator */}
                    <div className={`absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full ${colorScheme.button} text-white font-bold text-sm`}>
                      {allTrendingCharacters.findIndex(c => c.slug === slug) + 1}
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, slug)}
                      className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        favorites.includes(slug)
                          ? 'bg-nexus-purple-500 text-white'
                          : 'bg-nexus-neutral-800/70 text-nexus-neutral-300 hover:bg-nexus-neutral-700/70'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={favorites.includes(slug) ? "currentColor" : "none"} />
                    </button>

                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-neutral-900/20 to-nexus-neutral-900/80 z-10"></div>

                    {/* Character image with overlay */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Character info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                      
                      {/* Chat button */}
                      <button 
                        onClick={() => {
                          navigate(`/chat/${slug}`);
                          setShowAllModal(false);
                        }}
                        className={`w-full flex items-center justify-center space-x-1 px-3 py-2 ${colorScheme.button} text-white rounded-lg transition-all duration-200 text-sm font-medium hover:opacity-90`}
                      >
                        <span>Chat Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer with prominent close button */}
            <div className="border-t border-nexus-neutral-700 p-4 sticky bottom-0 bg-nexus-neutral-800 z-10">
              <button 
                onClick={() => setShowAllModal(false)}
                className={`w-full py-3 ${colorScheme.button} text-white rounded-lg hover:opacity-90 transition-colors font-medium flex items-center justify-center space-x-2`}
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 