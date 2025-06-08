import React, { useState } from 'react';
import { MessageSquare, Users, Plus, Search, Send, Home, TrendingUp, Compass, Moon, GraduationCap } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  messages: Message[];
}

type View = 'home' | 'trending' | 'discover' | 'darkroom' | 'campus';

export function GroupChat() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [message, setMessage] = useState('');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Anime Enthusiasts',
      description: 'Discuss your favorite anime and manga',
      members: 128,
      category: 'Anime',
      messages: []
    },
    {
      id: '2',
      name: 'Tech Talk',
      description: 'Latest in technology and programming',
      members: 256,
      category: 'Technology',
      messages: []
    },
    {
      id: '3',
      name: 'Movie Buffs',
      description: 'Movie reviews and discussions',
      members: 89,
      category: 'Movies',
      messages: []
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedGroup) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'You',
      timestamp: new Date()
    };

    setSelectedGroup({
      ...selectedGroup,
      messages: [...selectedGroup.messages, newMessage]
    });
    setMessage('');
  };

  const handleCreateGroup = (groupData: { name: string; description: string; category: string }) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupData.name,
      description: groupData.description,
      category: groupData.category,
      members: 1,
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
      return group.members > 100;
    }
    if (currentView === 'discover') {
      // Filter based on search query
      return group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             group.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const renderSidebarContent = () => {
    switch (currentView) {
      case 'discover':
        return (
          <div className="space-y-4">
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
          </div>
        );
      case 'darkroom':
        return (
          <div className="text-center p-4">
            <Moon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Dark Room</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Chat anonymously with other users. Your identity will be hidden.
            </p>
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Enter Dark Room
            </button>
          </div>
        );
      case 'campus':
        return (
          <div className="text-center p-4">
            <GraduationCap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Campus Mode</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Connect with students from your campus. Share experiences and make new friends.
            </p>
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Join Campus Network
            </button>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            {filteredGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedGroup?.id === group.id
                    ? 'bg-purple-500/10 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-zinc-500">{group.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{group.members}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-80 border-r border-zinc-800 bg-zinc-900">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Group Chat</h2>
            <button 
              onClick={() => setIsCreateGroupOpen(true)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-6">
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

          {/* Content based on current view */}
          {renderSidebarContent()}
        </div>
      </div>

      {/* Chat Area */}
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
                        {msg.sender[0]}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{msg.sender}</span>
                          <span className="text-sm text-zinc-500">
                            {msg.timestamp.toLocaleTimeString()}
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
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800">
              <div className="flex space-x-4">
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
          <div className="h-full flex items-center justify-center text-zinc-500">
            <MessageSquare className="w-8 h-8 mr-2" />
            <p>Select a group to start chatting</p>
          </div>
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

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup?: (group: any) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ isOpen, onClose, onCreateGroup }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl overflow-hidden p-6">
        <h2 className="text-xl font-bold text-white mb-4">Create New Group</h2>
        <p className="text-zinc-400 mb-6">Group creation is currently unavailable.</p>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 