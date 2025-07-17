import React, { useState, useRef, useEffect } from 'react';

import { MessageSquare, Users, Plus, Search, Send, Home, TrendingUp, Compass, Moon, GraduationCap, Paperclip, Gamepad2 } from 'lucide-react';
import { CreateGroup } from '../components/CreateGroup';
import { useChat } from '../contexts/ChatContext';
import type { Room as ChatRoom, Message as ChatMessage } from '../services/chat';

type View = 'home' | 'trending' | 'discover' | 'darkroom' | 'campus';

export default function GroupChat() {
  const [selectedGroup, setSelectedGroup] = useState<ChatRoom | null>(null);
  const [message, setMessage] = useState('');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
   const [showGames, setShowGames] = useState(false);
  const [groups, setGroups] = useState<ChatRoom[]>([
    {
      id: '1',
      name: 'Anime Enthusiasts',
      description: 'Discuss your favorite anime and manga',
      members: ['user1', 'user2', 'user3'],
      category: 'Anime',
      messages: []
    },
    {
      id: '2',
      name: 'Tech Talk',
      description: 'Latest in technology and programming',
      members: ['user1', 'user4', 'user5'],
      category: 'Technology',
      messages: []
    },
    {
      id: '3',
      name: 'Movie Buffs',
      description: 'Movie reviews and discussions',
      members: ['user2', 'user6'],
      category: 'Movies',
      messages: []
    }
  ]);
    const gamePopupRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
    if (!showGames) return;
    const handleClick = (e: MouseEvent) => {
      if (
        gamePopupRef.current &&
        !gamePopupRef.current.contains(e.target as Node)
      ) {
        setShowGames(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showGames]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedGroup) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      roomId: selectedGroup.id,
      content: message,
      senderId: 'You',
      timestamp: Date.now()
    };

    setSelectedGroup({
      ...selectedGroup,
      messages: [...selectedGroup.messages, newMessage]
    });
    setMessage('');
  };

  const handleCreateGroup = (groupData: { name: string; description: string; category: string }) => {
    const newGroup: ChatRoom = {
      id: Date.now().toString(),
      name: groupData.name,
      description: groupData.description,
      category: groupData.category,
      members: ['You'],
      messages: []
    };

    setGroups([...groups, newGroup]);
  };

  const filteredGroups = groups.filter(group => {
    if (currentView === 'home') {
      // In a real app, this would filter groups the user is a member of
      return true;
    }
    if (currentView === 'trending') {
      // Sort by member count
      return group.members.length > 100;
    }
    if (currentView === 'discover') {
      // Filter based on search query
      return group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             group.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const renderMainContent = () => {
    switch (currentView) {
      case 'discover':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Discover Groups</h2>
              <button 
                onClick={() => setIsCreateGroupOpen(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Group</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['Anime', 'Movies', 'Technology', 'Gaming', 'Music'].map((cat) => (
                  <button
                    key={cat}
                    className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-sm hover:bg-zinc-700 hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className="p-4 bg-zinc-800 rounded-lg text-left hover:bg-zinc-700 transition-colors"
                  >
                    <h3 className="font-medium text-white mb-1">{group.name}</h3>
                    <p className="text-sm text-zinc-400 mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">{group.category}</span>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-400">{group.members.length}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'darkroom':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <Moon className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Dark Room</h2>
              <p className="text-zinc-400 mb-8">
                Chat anonymously with other users. Your identity will be hidden.
                Share your thoughts freely in a safe and moderated environment.
              </p>
              <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Enter Dark Room
              </button>
            </div>
          </div>
        );

      case 'campus':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <GraduationCap className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Campus Mode</h2>
              <p className="text-zinc-400 mb-8">
                Connect with students from your campus. Share experiences, 
                organize events, and make new friends in your academic community.
              </p>
              <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                Join Campus Network
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {currentView === 'home' ? 'Your Groups' : 'Trending Groups'}
              </h2>
              <button 
                onClick={() => setIsCreateGroupOpen(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Group</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className="p-4 bg-zinc-800 rounded-lg text-left hover:bg-zinc-700 transition-colors"
                >
                  <h3 className="font-medium text-white mb-1">{group.name}</h3>
                  <p className="text-sm text-zinc-400 mb-2">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">{group.category}</span>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm text-zinc-400">{group.members}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar - Only Navigation */}
      <div className="w-64 border-r border-zinc-800 bg-zinc-900">
        <div className="p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'bg-purple-500/10 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentView('trending')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'trending'
                  ? 'bg-purple-500/10 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setCurrentView('discover')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'discover'
                  ? 'bg-purple-500/10 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Discover</span>
            </button>
            <button
              onClick={() => setCurrentView('darkroom')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'darkroom'
                  ? 'bg-purple-500/10 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>Dark Room</span>
            </button>
            <button
              onClick={() => setCurrentView('campus')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'campus'
                  ? 'bg-purple-500/10 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span>Campus Mode</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {selectedGroup ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">{selectedGroup.name}</h2>
              <p className="text-zinc-400">{selectedGroup.description}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedGroup.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-500">
                  <MessageSquare className="w-8 h-8 mr-2" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedGroup.messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        {msg.senderId[0]}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{msg.senderId}</span>
                          <span className="text-sm text-zinc-500">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-zinc-300">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

             {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 relative">
              {/* Game icon popup */}
              {showGames && (
                <div
                  ref={gamePopupRef}
                  className="absolute bottom-16 left-0 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-4 w-64 grid grid-cols-5 gap-3 z-20"
                >
                  {[
                    "🎲", "🎮", "🕹️", "♟️", "🧩",
                    "🏎️", "⚽", "🏀", "🀄", "🧸"
                  ].map((icon, idx) => (
                    <button
                      key={idx}
                      className="w-10 h-10 flex items-center justify-center rounded hover:bg-zinc-700 text-2xl"
                      type="button"
                      tabIndex={0}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex space-x-4 items-center">
                {/* Attachment icon */}
                <label className="cursor-pointer flex items-center">
                  <input
                    type="file"
                    className="hidden"
                    // TODO: Add your file upload handler here
                  />
                  <Paperclip className="w-5 h-5 text-zinc-400 hover:text-purple-400 transition-colors" />
                </label>
                {/* Gaming console icon */}
                <button
                  type="button"
                  onClick={() => setShowGames((v) => !v)}
                  className="flex items-center"
                  tabIndex={0}
                >
                  <Gamepad2 className="w-5 h-5 text-zinc-400 hover:text-purple-400 transition-colors" />
                </button>
                {/* Message input */}
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          renderMainContent()
        )}
      </div>
      <CreateGroup
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}


