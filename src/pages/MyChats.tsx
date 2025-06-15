import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Bot, MessageSquare, Trash2, Clock, Calendar, User, Star } from 'lucide-react';
import { ProfileButton } from '../components/ProfileButton';
import { FeatureNavigation } from '../components/FeatureNavigation';
import { formatDistanceToNow } from 'date-fns';
import { characters } from '../utils/characters';

interface ChatHistoryItem {
  id: string;
  characterId: string;
  characterName: string;
  characterImage: string;
  lastMessage: string;
  timestamp: number;
  messages: {
    user: string;
    ai: string;
    timestamp: number;
  }[];
  role?: string;
}

function MyChats() {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    try {
      // Load favorites
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }

      // Load real chat history from localStorage
      const storedHistory = localStorage.getItem('chatHistory');
      const nexusChatHistory = localStorage.getItem('nexus_chat_history');
      let actualChats: ChatHistoryItem[] = [];

      if (storedHistory) {
        try {
          const parsedHistory = JSON.parse(storedHistory);
          
          // Process the chatHistory based on its structure
          // This assumes the structure might be an array of chat messages
          if (Array.isArray(parsedHistory)) {
            actualChats = parsedHistory.map((chat, index) => {
              const msgs = Array.isArray(chat) ? chat : [];
              const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
              
              return {
                id: `chat-${index}`,
                characterId: `character-${index}`,
                characterName: `Character ${index + 1}`,
                characterImage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&h=150',
                lastMessage: lastMsg?.ai || "No message",
                timestamp: Date.now() - (index * 3600000), // Just for display order
                messages: msgs.map(msg => ({
                  user: msg.user || "",
                  ai: msg.ai || "",
                  timestamp: Date.now() - ((msgs.indexOf(msg) + 1) * 60000)
                })),
                role: characters[`character-${index}`]?.role
              };
            }).filter(chat => chat.messages.length > 0);
          }
        } catch (error) {
          console.error('Error parsing chatHistory:', error);
        }
      }

      // If no chats were found or processed, check nexus_chat_history
      if (actualChats.length === 0 && nexusChatHistory) {
        try {
          const parsedNexusHistory = JSON.parse(nexusChatHistory);
          
          // Process nexus_chat_history based on its structure
          // This assumes a structure of { characterId: messages[] }
          if (parsedNexusHistory && typeof parsedNexusHistory === 'object') {
            actualChats = Object.entries(parsedNexusHistory).map(([charId, messages], index) => {
              const msgArray = Array.isArray(messages) ? messages : [];
              const lastMessage = msgArray.length > 0 ? msgArray[msgArray.length - 1] : null;
              
              return {
                id: `nexus-${index}`,
                characterId: charId,
                characterName: `AI Character ${charId}`,
                characterImage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&h=150',
                lastMessage: lastMessage?.message || "No message",
                timestamp: lastMessage?.timestamp || Date.now() - (index * 3600000),
                messages: msgArray.map(msg => ({
                  user: msg.fromUser ? msg.message : "",
                  ai: !msg.fromUser ? msg.message : "",
                  timestamp: msg.timestamp || Date.now() - (msgArray.indexOf(msg) * 60000)
                })),
                role: characters[charId]?.role
              };
            }).filter(chat => chat.messages.length > 0);
          }
        } catch (error) {
          console.error('Error parsing nexus_chat_history:', error);
        }
      }
      
      console.log('Loaded actual chat history:', actualChats);
      
      // Enhance chats with character information when available
      const enhancedChats = actualChats.map(enhanceChatWithCharacterInfo);
      setChatHistory(enhancedChats);
      
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([]);
    }
  }, []);

  // Filter chats based on search query and favorites filter
  const filteredChats = chatHistory.filter(chat => {
    const matchesSearch = !searchQuery || 
      chat.characterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFavorites = !showFavorites || favorites.includes(chat.characterId);
    
    return matchesSearch && matchesFavorites;
  });

  // Delete a chat from history
  const deleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    // In a real app, you would also update localStorage here
  };

  // Format timestamp to human-readable format
  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // Toggle favorite status for a character
  const toggleFavorite = (e: React.MouseEvent, characterId: string) => {
    e.stopPropagation();
    
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter(id => id !== characterId)
      : [...favorites, characterId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Get character info if available
  const getCharacterInfo = (characterId: string) => {
    // Check if we have this character in our characters object
    if (characters && characters[characterId]) {
      return {
        name: characters[characterId].name,
        image: characters[characterId].image,
        role: characters[characterId].role
      };
    }
    return null;
  };

  // Enhance chat data with character info when available
  const enhanceChatWithCharacterInfo = (chat: ChatHistoryItem): ChatHistoryItem => {
    const characterInfo = getCharacterInfo(chat.characterId);
    
    if (characterInfo) {
      return {
        ...chat,
        characterName: characterInfo.name,
        characterImage: characterInfo.image,
        role: characterInfo.role
      };
    }
    
    return chat;
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm fixed left-0 right-0 top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/ai')}
                className="text-gold hover:text-gold/80 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">Previous Conversations</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative w-96">
                <Search className="absolute left-3 top-2.5 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-gold"
                />
              </div>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  showFavorites 
                    ? 'bg-gold text-zinc-900 hover:bg-gold/90' 
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700/80'
                }`}
              >
                <Star className="w-5 h-5" />
                <span>Favorites</span>
              </button>
              
              <ProfileButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Previous Conversations</h2>
              <p className="text-zinc-400 mt-1">Your past chats with AI characters</p>
            </div>
            {filteredChats.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete all conversation history?')) {
                    setChatHistory([]);
                    localStorage.removeItem('chatHistory');
                    localStorage.removeItem('nexus_chat_history');
                  }
                }}
                className="px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Clear History
              </button>
            )}
          </div>

          {filteredChats.length === 0 ? (
            <div className="bg-zinc-800/50 rounded-xl p-8 text-center">
              <MessageSquare className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Conversations Found</h3>
              <p className="text-zinc-400 mb-6">
                {searchQuery 
                  ? "No conversations match your search query"
                  : showFavorites
                    ? "You don't have any favorite conversations yet"
                    : "You don't have any previous conversations with AI characters"}
              </p>
        <button 
          onClick={() => navigate('/ai')}
                className="px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-all font-medium"
              >
                Start Chatting
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.characterId}`)}
                  className="bg-zinc-800/50 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-700/50 transition-colors p-4 flex items-start"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative">
                      <img
                        src={chat.characterImage}
                        alt={chat.characterName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <button
                        onClick={(e) => toggleFavorite(e, chat.characterId)}
                        className={`absolute -top-1 -right-1 p-1.5 rounded-full ${
                          favorites.includes(chat.characterId)
                            ? 'bg-gold text-zinc-900'
                            : 'bg-zinc-700 text-zinc-300'
                        }`}
                      >
                        <Star className="w-3 h-3" fill={favorites.includes(chat.characterId) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-white truncate">{chat.characterName}</h3>
                      <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(chat.timestamp)}</span>
                      </div>
                    </div>
                    
                    {chat.role && (
                      <p className="text-gold text-xs mb-1">{chat.role}</p>
                    )}
                    
                    <p className="text-zinc-300 mb-3 line-clamp-1">{chat.lastMessage}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-zinc-500 text-xs">
                        <MessageSquare className="w-3 h-3" />
                        <span>{chat.messages.length} messages</span>
                      </div>
                      
                      <button
                        onClick={(e) => deleteChat(e, chat.id)}
                        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
        </button>
      </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <FeatureNavigation />
    </div>
  );
}

export default MyChats; 