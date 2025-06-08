import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { getRankedCharacters } from '../utils/viewsManager';

interface CompactLeaderboardProps {
  characters: Record<string, any>;
  onOpenFull: () => void;
}

export function CompactLeaderboard({ characters, onOpenFull }: CompactLeaderboardProps) {
  const navigate = useNavigate();
  const [topCharacters, setTopCharacters] = useState<{
    slug: string;
    character: any;
    views: number;
    rank: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get top 10 characters by views from the viewsManager
    const rankedCharacters = getRankedCharacters(10);
    
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
    setLoading(false);
  }, [characters]);

  if (loading) {
    return (
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-gold" />
            <h3 className="text-sm font-medium text-white">Top Characters</h3>
          </div>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-gold" />
          <h3 className="text-sm font-medium text-white">Top Characters</h3>
        </div>
        <button 
          onClick={onOpenFull}
          className="text-xs text-zinc-400 hover:text-white transition-colors"
          aria-label="View all ranked characters"
        >
          View All
        </button>
      </div>

      <div className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 pr-1">
        {topCharacters.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-zinc-500 text-sm">No character views yet</p>
          </div>
        ) : (
          topCharacters.map((item) => (
            <div 
              key={item.slug}
              onClick={() => navigate(`/chat/${item.slug}`)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer mb-2"
            >
              <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                item.rank === 1 ? 'bg-gold text-zinc-900' : 
                item.rank === 2 ? 'bg-zinc-300 text-zinc-900' : 
                item.rank === 3 ? 'bg-amber-700 text-white' : 
                'bg-zinc-700 text-zinc-300'
              } font-bold`}>
                {item.rank}
              </div>
              
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={item.character.image} 
                  alt={item.character.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">{item.character.name}</div>
                <div className="text-xs text-zinc-400 truncate">{item.character.role}</div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-zinc-300 text-xs">{item.views.toLocaleString()}</div>
                <div className="text-xs text-zinc-500">views</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 