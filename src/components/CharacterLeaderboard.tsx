import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, Search, X } from 'lucide-react';
import { getRankedCharacters } from '../utils/viewsManager';

interface CharacterLeaderboardProps {
  characters: Record<string, any>;
  views: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterLeaderboard({ characters, views, isOpen, onClose }: CharacterLeaderboardProps) {
  const navigate = useNavigate();
  const [topCharacters, setTopCharacters] = useState<{
    slug: string;
    character: any;
    views: number;
    rank: number;
  }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Get all ranked characters from the persistent ranking - increased to 50
      const rankedCharacters = getRankedCharacters(50); 
      
      // Map ranked characters to include character data
      const mappedCharacters = rankedCharacters
        .map(ranked => ({
          slug: ranked.id,
          character: characters[ranked.id],
          views: ranked.views,
          rank: ranked.rank
        }))
        .filter(item => item.character); // Filter out any undefined characters
      
      setTopCharacters(mappedCharacters);
    } else {
      // Clear search when modal closes
      setSearchQuery('');
    }
  }, [characters, isOpen]);

  // Filter characters based on search query
  const filteredCharacters = searchQuery.trim() 
    ? topCharacters.filter(item => 
        item.character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.character.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topCharacters;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-nexus-neutral-900/80 backdrop-blur-sm p-4 md:p-0">
      <div className="relative bg-nexus-neutral-800 w-full max-w-xl rounded-xl overflow-hidden shadow-soft animate-fade-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-nexus-neutral-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-nexus-blue-500" />
            <h2 className="text-xl font-poppins font-medium text-white">Character Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-nexus-neutral-700/50 text-nexus-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-nexus-neutral-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-nexus-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search characters..."
              className="w-full pl-10 pr-4 py-3 bg-nexus-neutral-700/50 rounded-lg placeholder-nexus-neutral-500 text-nexus-neutral-200 focus:outline-none focus:ring-2 focus:ring-nexus-blue-500/50"
            />
          </div>
        </div>

        {/* Character List */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {filteredCharacters.length === 0 ? (
            <div className="text-center py-6">
              {searchQuery ? (
                <p className="text-nexus-neutral-400">No characters match your search</p>
              ) : (
                <>
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-nexus-blue-500 mx-auto mb-3"></div>
                  <p className="text-nexus-neutral-400">Loading leaderboard data...</p>
                </>
              )}
            </div>
          ) : (
            <div className="p-3">
              {filteredCharacters.map((item) => (
                <div 
                  key={item.slug}
                  onClick={() => {
                    navigate(`/chat/${item.slug}`);
                    onClose();
                  }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-nexus-neutral-700/50 transition-colors cursor-pointer mb-2"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    item.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-nexus-neutral-900' : 
                    item.rank === 2 ? 'bg-gradient-to-br from-nexus-neutral-300 to-nexus-neutral-400 text-nexus-neutral-900' : 
                    item.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' : 
                    'bg-nexus-neutral-700 text-nexus-neutral-300'
                  } font-bold text-sm`}>
                    {item.rank}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={item.character.image} 
                      alt={item.character.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-white">{item.character.name}</div>
                    <div className="text-xs text-nexus-neutral-400">{item.character.role}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-nexus-blue-300">{item.views.toLocaleString()}</div>
                    <div className="text-xs text-nexus-neutral-500">views</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Close button */}
        <div className="border-t border-nexus-neutral-700 p-4 flex-shrink-0">
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-nexus-blue-500 text-white rounded-lg hover:bg-nexus-blue-600 transition-colors"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
} 