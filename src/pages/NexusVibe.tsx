import React, { useState, useRef,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { 
  MessageSquare, Users, Plus, Search, Send, Home, TrendingUp, 
  Moon, GraduationCap, X, Image, FileVideo, Smile, 
  Info, MoreHorizontal, Bell, Heart, Repeat, Share2,
  Sparkles, Zap, Flame, Activity, Star, Clock, Code, Music, UserCircle, ThumbsUp, ThumbsDown,Paperclip, Gamepad2
} from 'lucide-react';
import { MainNavbar } from '../components/MainNavbar';
import { FeatureNavigation } from '../components/FeatureNavigation';
import { CreateGroup } from '../components/CreateGroup';
import { FilterDropdown } from '../components/FilterDropdown';

import { ChatRoom, ChatMessage } from '../types/chat';
import { sampleGroups } from '../data/groupsData';

// Placeholder avatar data
const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8"
];

// Sample user data
const currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: "https://i.pravatar.cc/150?img=1"
};

type View = 'home' | 'trending' | 'darkroom' | 'campus';

export default function NexusVibe() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  
  const [selectedGroup, setSelectedGroup] = useState<ChatRoom | null>(null);
  const [message, setMessage] = useState('');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularGroups, setShowPopularGroups] = useState(false);
  const [showThemePopup, setShowThemePopup] = useState(false);
const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
const [customTheme, setCustomTheme] = useState<string | null>(null);
const themePopupRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (!showThemePopup) return;
  function handleClick(e: MouseEvent) {
    if (themePopupRef.current && !themePopupRef.current.contains(e.target as Node)) {
      setShowThemePopup(false);
    }
  }
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick);
}, [showThemePopup]);

// List of static backgrounds
const staticThemes = [
  'https://images.wondershare.com/virtulook/articles/random-background-generator-13.jpg',
  'https://tse1.mm.bing.net/th/id/OIP.2cNk9zKYv8gIxHAWNEfIGgHaEo?pid=Api&P=0&h=180',
  'https://wallpaperaccess.com/full/1107091.jpg'
];

// Set background image on theme change

  // Initialize groups with our sample data
  const [groups, setGroups] = useState<ChatRoom[]>(sampleGroups);

  // Add these new states near the other state declarations
  const [showDarkRoomDisclaimer, setShowDarkRoomDisclaimer] = useState(false);
  const [showAliasInput, setShowAliasInput] = useState(false);
  const [darkRoomAlias, setDarkRoomAlias] = useState('');
  const [inDarkRoom, setInDarkRoom] = useState(false);

  // Add anonymous groups data near other state declarations
  const [anonymousGroups, setAnonymousGroups] = useState([
    {
      id: 'anon-1',
      name: 'Confessions',
      description: 'Share your secrets and confessions anonymously',
      members: 124,
      messages: []
    },
    {
      id: 'anon-2',
      name: 'Mental Health',
      description: 'A safe space to discuss mental health challenges',
      members: 98,
      messages: []
    },
    {
      id: 'anon-3',
      name: 'Career Advice',
      description: 'Get honest feedback about career decisions',
      members: 76,
      messages: []
    },
    {
      id: 'anon-4',
      name: 'Relationship Talk',
      description: 'Discuss relationship issues without judgment',
      members: 112,
      messages: []
    },
    {
      id: 'anon-5',
      name: 'Unpopular Opinions',
      description: 'Share opinions that might be controversial',
      members: 87,
      messages: []
    }
  ]);
  const [selectedAnonymousGroup, setSelectedAnonymousGroup] = useState<string | null>(null);
  const [anonymousMessage, setAnonymousMessage] = useState('');

  // Add new state variables for campus mode
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Sample colleges data
  const colleges = [
    {
      id: 'mit-adt',
      name: 'MIT ADT University',
      logo: 'https://mituniversity.ac.in/wp-content/uploads/2021/05/MIT-ADT-University-Logo.png',
      description: 'MIT Art, Design and Technology University'
    },
    {
      id: 'mit-wpu',
      name: 'MIT World Peace University',
      logo: 'https://mitwpu.edu.in/assets/images/mit-wpu-logo.png',
      description: 'MIT World Peace University'
    }
  ];

  // Update the useEffect to NOT auto-select a default group when in home view
  useEffect(() => {
    if (groupId) {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setSelectedGroup(group);
      }
    }
    // Remove the auto-selection for home view
  }, [groupId, groups]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedGroup) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: currentUser.name,
      timestamp: new Date(),
      avatar: currentUser.avatar
    };

    const updatedGroup = {
      ...selectedGroup,
      messages: [...selectedGroup.messages, newMessage]
    };

    setSelectedGroup(updatedGroup);
    
    // Update the group in the groups array
    setGroups(groups.map(g => g.id === selectedGroup.id ? updatedGroup : g));
    
    setMessage('');
  };

  const handleCreateGroup = (groupData: { name: string; description: string; category: string }) => {
    const newGroup: ChatRoom = {
      id: Date.now().toString(),
      name: groupData.name,
      description: groupData.description,
      category: groupData.category,
      members: 1,
      messages: []
    };

    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    navigate(`/nexus-vibe/${newGroup.id}`);
  };

  const filteredGroups = groups.filter(group => {
    if (searchQuery) {
      return (
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (currentView === 'trending') {
      // All groups are shown in trending but will be sorted by timeSpent
      return true;
    }
    
    // All groups are displayed on the home view
    return true;
  });

  // Helper function to get sorted trending groups
  const getTrendingGroups = () => {
    return [...groups].sort((a, b) => (b.timeSpent || 0) - (a.timeSpent || 0));
  };

  // Helper function to get most popular groups by member count
  const getPopularGroups = () => {
    return [...groups].sort((a, b) => b.members - a.members).slice(0, 3);
  };

  // Format time spent in a human readable format
  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Calculate average time per user
  const getAvgTimePerUser = (group: ChatRoom) => {
    if (!group.timeSpent || !group.members) return 0;
    return Math.round(group.timeSpent / group.members);
  };

  // Render trending groups list
  const renderTrendingGroupsList = () => (
    <div className="space-y-4 mt-6">
      {getTrendingGroups().map((group, index) => (
        <div 
          key={group.id}
          onClick={() => {
            setSelectedGroup(group);
            navigate(`/nexus-vibe/${group.id}`);
          }}
          className="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-700/80 transition-colors border border-zinc-700"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Rank and Group info */}
            <div className="flex p-4 flex-1">
              <div className="flex items-start mr-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/20 text-gold font-bold text-2xl">
                  #{index + 1}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-white font-semibold text-lg">{group.name}</h3>
                  {(group.trending || 0) >= 8 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gold/20 text-gold text-xs rounded-md flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> Hot
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-2 line-clamp-1">{group.description}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full">
                    {group.category}
                  </span>
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {group.members}
                  </span>
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {group.messages.length}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right side - Statistics */}
            <div className="bg-zinc-700/50 p-4 flex md:flex-col justify-between items-end md:w-48 md:border-l border-zinc-700">
              <div className="text-center md:w-full">
                <div className="text-lg font-bold text-gold">{formatTimeSpent(group.timeSpent || 0)}</div>
                <div className="text-xs text-zinc-400">Daily active time</div>
              </div>
              <div className="text-center md:w-full md:mt-3">
                <div className="text-md font-semibold text-zinc-300">{formatTimeSpent(getAvgTimePerUser(group))}</div>
                <div className="text-xs text-zinc-400">Avg per user</div>
              </div>
            </div>
          </div>
          
          {/* Trending indicator bar */}
          <div className="h-1 bg-zinc-700">
            <div 
              className="h-full bg-gold" 
              style={{ width: `${(group.trending || 0) * 10}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroupsList = () => (
    <div className="space-y-6 mt-6">
      {/* Featured/Recommended Group - Larger card to draw attention */}
      {filteredGroups.length > 0 && (
        <div className="mb-8 bg-zinc-800/60 rounded-2xl overflow-hidden border border-gold/10 shadow-lg shadow-gold/5 transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/5 mix-blend-overlay"></div>
            <div className="h-48 bg-gradient-to-br from-gold/60 via-gold/30 to-transparent relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover opacity-30 mix-blend-overlay"></div>
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs text-gold font-medium">Featured</span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 to-transparent p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-14 h-14 rounded-full bg-gold/30 flex items-center justify-center border border-gold/20">
                      <span className="font-bold text-2xl text-gold">{filteredGroups[0].name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h2 className="text-2xl font-bold text-white mr-2">{filteredGroups[0].name}</h2>
                      {(filteredGroups[0].trending || 0) >= 8 && (
                        <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Flame className="w-3 h-3 mr-1" /> Hot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-zinc-300 bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {filteredGroups[0].members}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-3">
              <p className="text-zinc-300 leading-relaxed mb-4">
                {filteredGroups[0].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {filteredGroups[0].messages.slice(0, 4).map((message, idx) => (
                    <div key={`featured-avatar-${idx}`} className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-zinc-900">
                      <img src={message.avatar || avatars[idx % avatars.length]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {filteredGroups[0].members > 4 && (
                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300 ring-2 ring-zinc-900">
                      +{filteredGroups[0].members - 4}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedGroup(filteredGroups[0]);
                    navigate(`/nexus-vibe/${filteredGroups[0].id}`);
                  }}
                  className="bg-gold hover:bg-gold/90 text-zinc-900 font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Conversation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Group listing with psychological engagement elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredGroups.slice(1).map((group) => (
          <div 
            key={group.id}
            onClick={() => {
              setSelectedGroup(group);
              navigate(`/nexus-vibe/${group.id}`);
            }}
            className="relative bg-zinc-800/70 rounded-xl overflow-hidden cursor-pointer border border-zinc-700/50 hover:border-gold/20 transition-all duration-300 flex flex-col group"
          >
            {/* Visual indicator for trending/hot content */}
            {(group.trending || 0) > 7 && (
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute rotate-45 bg-gold text-xs font-bold py-1 text-zinc-900 text-center w-24 top-3 right-[-6px]">
                  HOT
                </div>
              </div>
            )}
            
            <div className="p-4 flex-1">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-gold/30 flex items-center justify-center mr-3 border border-gold/20 flex-shrink-0">
                  <span className="font-semibold text-gold">{group.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-gold transition-colors">{group.name}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 mt-1 mb-3">{group.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {group.members}
                </span>
                <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 10) + 1} active now
                </span>
              </div>
              
              {/* Social proof and activity indicators */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-700/50">
                <div className="flex -space-x-2">
                  {group.messages.slice(0, 3).map((message, idx) => (
                    <div key={`avatar-${idx}`} className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-zinc-800">
                      <img src={message.avatar || avatars[idx % avatars.length]} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {group.messages.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300 ring-2 ring-zinc-800">
                      +{group.messages.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center text-xs text-zinc-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Active {Math.floor(Math.random() * 24) + 1}h ago</span>
                </div>
              </div>
            </div>
            
            {/* Hover effect - reveal join button */}
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-gold hover:bg-gold/90 text-zinc-900 font-medium px-4 py-2 rounded-lg transition-colors transform scale-95 group-hover:scale-100">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVibeView = () => {
    switch (currentView) {
      case 'darkroom':
        return (
          <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center h-full w-full">
            {/* Fixed header with solid background */}
            <header className="fixed top-0 left-0 p-4 pt-8 z-50 bg-black shadow-md">
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">Nexus Vibe</span>
              </h1>
            </header>
            
            {/* Terminal-like container */}
            <div className="w-full max-w-4xl max-h-[90vh] border border-green-500/30 rounded-md p-1 bg-black overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center bg-zinc-900 px-3 py-1.5 border-b border-green-500/30">
                <div className="flex items-center">
                  <div className="flex space-x-1.5 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:opacity-80" onClick={() => setCurrentView('home')}></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="mx-auto text-green-500 text-sm font-mono">DARKNET_ACCESS_v2.3.7</div>
                <button 
                  onClick={() => setCurrentView('home')} 
                  className="text-green-500 hover:text-green-400 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Terminal content */}
              <div className="font-mono text-sm text-green-500 p-4 h-[60vh] overflow-y-auto bg-[#0c0c0c]">
                <div className="terminal-text mb-4">
                  <div className="flex">
                    <span className="text-green-600 mr-2">root@nexus:~$</span>
                    <span className="typing-effect">ssh -p 1337 darkroom@nexus.vibe</span>
                  </div>
                  <div className="mt-1 text-zinc-500">Establishing secure connection...</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-red-500 mb-1">! WARNING: SECURE ACCESS ONLY !</div>
                  <div className="text-xs glitchy-text">
                    Connection established through encrypted proxy.
                    <br />All activity in the Dark Room is anonymized.
                    <br />Your digital fingerprint has been masked.
                  </div>
                </div>
                
                <div className="block mb-4 overflow-hidden">
                  <div className="text-center mb-2 glitchy-text">
                    <span className="text-red-500">[ UNAUTHORIZED ACCESS WILL BE TRACED ]</span>
                  </div>
                  
                  <div className="ascii-art text-center my-4">
                    <pre className="inline-block text-[8px] leading-[8px] text-green-500 font-mono">
{`
   ▓█████▄  ▄▄▄       ██▀███   ██ ▄█▀    ██▀███   ▒█████   ▒█████   ███▄ ▄███▓
   ▒██▀ ██▌▒████▄    ▓██ ▒ ██▒ ██▄█▒    ▓██ ▒ ██▒▒██▒  ██▒▒██▒  ██▒▓██▒▀█▀ ██▒
   ░██   █▌▒██  ▀█▄  ▓██ ░▄█ ▒▓███▄░    ▓██ ░▄█ ▒▒██░  ██▒▒██░  ██▒▓██    ▓██░
   ░▓█▄   ▌░██▄▄▄▄██ ▒██▀▀█▄  ▓██ █▄    ▒██▀▀█▄  ▒██   ██░▒██   ██░▒██    ▒██ 
   ░▒████▓  ▓█   ▓██▒░██▓ ▒██▒▒██▒ █▄   ░██▓ ▒██▒░ ████▓▒░░ ████▓▒░▒██▒   ░██▒
    ▒▒▓  ▒  ▒▒   ▓▒█░░ ▒▓ ░▒▓░▒ ▒▒ ▓▒   ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░   ░  ░
    ░ ▒  ▒   ▒   ▒▒ ░  ░▒ ░ ▒░░ ░▒ ▒░     ░▒ ░ ▒░  ░ ▒ ▒░   ░ ▒ ▒░ ░  ░      ░
    ░ ░  ░   ░   ▒     ░░   ░ ░ ░░ ░      ░░   ░ ░ ░ ░ ▒  ░ ░ ░ ▒  ░      ░   
      ░          ░  ░   ░     ░  ░         ░         ░ ░      ░ ░         ░   
    ░                                                                          
`}
                    </pre>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="typing-effect">Initializing anonymous protocol...</div>
                  <div className="typing-effect mt-1">Masking user identity...</div>
                  <div className="typing-effect mt-1">Configuring end-to-end encryption...</div>
                  <div className="text-white mt-2">Ready for secure connection.</div>
                </div>
                
                <div className="flex items-center space-x-2 animated-blink">
                  <span className="text-green-600">darkroom@nexus:~$</span>
                  <span className="h-4 w-2 bg-green-500 inline-block animate-blink"></span>
                </div>
              </div>
              
              {/* Access button */}
              <div className="bg-zinc-900 p-4 border-t border-green-500/30 flex justify-center">
                <button 
                  onClick={() => setShowDarkRoomDisclaimer(true)}
                  className="group relative overflow-hidden px-8 py-3 bg-black border border-green-500/50 text-green-500 font-mono hover:bg-green-950/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent glitch-effect"></div>
                  <span className="relative z-10 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    ESTABLISH CONNECTION
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'campus':
        return (
          <div className="flex flex-col h-full">
            {/* Campus header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-gold mr-3" />
                <h2 className="text-2xl font-bold text-white">Campus Connect</h2>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-4">
              {!isAuthenticated ? (
                <div className="max-w-4xl mx-auto">
                  {!selectedCollege ? (
                    // College Selection View
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Select Your College</h3>
                      <p className="text-zinc-400 mb-8">Choose your college to access campus features</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {colleges.map((college) => (
                          <button
                            key={college.id}
                            onClick={() => setSelectedCollege(college.id)}
                            className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left transition-all duration-300 hover:border-gold/30 group"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-16 h-16 bg-white rounded-lg p-2 mr-4">
                                <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                                  {college.name}
                                </h4>
                                <p className="text-sm text-zinc-400">{college.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-gold text-sm">
                              <span>Click to continue</span>
                              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Authentication Form
                    <div className="max-w-md mx-auto">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto mb-4">
                          <img 
                            src={colleges.find(c => c.id === selectedCollege)?.logo} 
                            alt="College Logo" 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {colleges.find(c => c.id === selectedCollege)?.name}
                        </h3>
                        <p className="text-zinc-400">Enter your credentials to continue</p>
                      </div>
                      
                      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          // Simple validation - password should be first name
                          if (password.toLowerCase() === 'john') { // Example validation
                            setIsAuthenticated(true);
                            setAuthError('');
                          } else {
                            setAuthError('Invalid credentials');
                          }
                        }}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Enrollment Number
                              </label>
                              <input
                                type="text"
                                value={enrollmentNumber}
                                onChange={(e) => setEnrollmentNumber(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                placeholder="Enter your enrollment number"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-zinc-400 mb-1">
                                Password (Your First Name)
                              </label>
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                placeholder="Enter your first name"
                                required
                              />
                            </div>
                            
                            {authError && (
                              <div className="text-red-500 text-sm">{authError}</div>
                            )}
                            
                            <div className="flex items-center justify-between pt-2">
                              <button
                                type="button"
                                onClick={() => setSelectedCollege(null)}
                                className="text-zinc-400 hover:text-white"
                              >
                                ← Back to Colleges
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2 bg-gold hover:bg-gold/90 text-zinc-900 font-medium rounded-lg transition-colors"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Authenticated Campus View
                <div className="text-center text-zinc-400">
                  <h3 className="text-2xl font-bold text-white mb-4">Welcome to Campus Connect</h3>
                  <p>You are now authenticated as a student of {colleges.find(c => c.id === selectedCollege)?.name}</p>
                  <p className="mt-2">Campus features coming soon...</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'trending':
        return (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trending groups..."
                  className="w-full pl-10 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              <button 
                onClick={() => setIsCreateGroupOpen(true)}
                className="px-4 py-2 bg-gold hover:bg-gold/90 rounded-lg text-zinc-900 font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Group</span>
              </button>
            </div>
            
            <div className="mb-6 border-b border-zinc-800 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                  <div className="text-xs text-zinc-500 mb-1">Top Active Group</div>
                  <div className="text-gold font-semibold">{getTrendingGroups()[0]?.name}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                  <div className="text-xs text-zinc-500 mb-1">Most Active Time</div>
                  <div className="text-gold font-semibold">{formatTimeSpent(getTrendingGroups()[0]?.timeSpent || 0)}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                  <div className="text-xs text-zinc-500 mb-1">Total Groups</div>
                  <div className="text-gold font-semibold">{groups.length}</div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                  <div className="text-xs text-zinc-500 mb-1">Your Groups</div>
                  <div className="text-gold font-semibold">{groups.length}</div>
                </div>
              </div>
            </div>
            
            {renderTrendingGroupsList()}
          </>
        );
        
      case 'home':
      default:
        return (
          <>
            {/* Hero section with eye-catching visuals and engagement metrics */}
            <div className="relative mb-10 bg-zinc-800/40 rounded-2xl border border-zinc-700/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent"></div>
              <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="md:mr-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Welcome to <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl">Nexus Vibe</span>
                    </h2>
                    <p className="text-zinc-400 md:text-lg mb-6 max-w-xl">
                      Connect with communities that share your interests, join conversations, and make new connections in real-time.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setIsCreateGroupOpen(true)}
                        className="px-4 py-2 bg-gold hover:bg-gold/90 rounded-lg text-zinc-900 font-medium transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Create Group</span>
                      </button>
                      
                      <button 
                        onClick={() => setShowPopularGroups(!showPopularGroups)}
                        className="px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-white transition-colors flex items-center space-x-2"
                      >
                        <Star className="w-5 h-5 text-gold" />
                        <span>Popular Groups</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:block ml-auto">
                    <div className="grid grid-cols-3 gap-3 mt-4 md:mt-0">
                      <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-xl border border-zinc-700">
                        <div className="text-3xl font-bold text-gold">{groups.length}</div>
                        <div className="text-xs text-zinc-400">Total Groups</div>
                      </div>
                      <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-xl border border-zinc-700">
                        <div className="text-3xl font-bold text-gold">
                          {groups.reduce((sum, group) => sum + group.members, 0)}
                        </div>
                        <div className="text-xs text-zinc-400">Community Members</div>
                      </div>
                      <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-xl border border-zinc-700">
                        <div className="text-3xl font-bold text-gold">
                          {groups.reduce((sum, group) => sum + group.messages.length, 0)}
                        </div>
                        <div className="text-xs text-zinc-400">Conversations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search section without filters */}
            <div className="sticky top-0 z-20 pt-2 pb-4 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search groups..."
                    className="w-full pl-10 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <button 
                  onClick={() => setIsCreateGroupOpen(true)}
                  className="px-4 py-2.5 bg-gold hover:bg-gold/90 rounded-lg text-zinc-900 font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Group</span>
                </button>
              </div>
            </div>
            
            {showPopularGroups && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
                <div className="w-full max-w-4xl p-6 rounded-2xl overflow-hidden relative">
                  {/* Blue gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-indigo-900/30"></div>
                  <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center">
                        <Star className="w-6 h-6 mr-2 text-gold" />
                        Most Popular Communities
                      </h2>
                      <button 
                        onClick={() => setShowPopularGroups(false)} 
                        className="p-2 rounded-full hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="text-zinc-300 mb-6">
                      Join these vibrant communities with the most active members on Nexus Vibe
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {getPopularGroups().map((group, index) => (
                        <div 
                          key={group.id}
                          onClick={() => {
                            setSelectedGroup(group);
                            setShowPopularGroups(false);
                            navigate(`/nexus-vibe/${group.id}`);
                          }}
                          className="group flex items-stretch bg-zinc-800/80 border border-blue-500/30 rounded-xl overflow-hidden hover:bg-zinc-700/80 transition-all duration-300 cursor-pointer"
                        >
                          {/* Rank indicator */}
                          <div className="flex-shrink-0 w-16 flex items-center justify-center bg-blue-600/30 border-r border-blue-500/30">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-white">#{index + 1}</div>
                              <div className="text-xs text-blue-300">RANK</div>
                            </div>
                          </div>
                          
                          {/* Group info */}
                          <div className="flex flex-1 p-4">
                            <div className="mr-4 flex-shrink-0">
                              <div className="w-16 h-16 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                                <span className="font-bold text-2xl text-white">{group.name.charAt(0)}</span>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors mb-1">
                                {group.name}
                              </h3>
                              <p className="text-zinc-300 mb-3 line-clamp-2">{group.description}</p>
                              
                              <div className="flex flex-wrap gap-3">
                                <div className="flex items-center text-sm">
                                  <Users className="w-4 h-4 mr-1.5 text-blue-300" />
                                  <span className="text-white font-semibold">{group.members}</span>
                                  <span className="text-zinc-400 ml-1">members</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                  <MessageSquare className="w-4 h-4 mr-1.5 text-blue-300" />
                                  <span className="text-white font-semibold">{group.messages.length}</span>
                                  <span className="text-zinc-400 ml-1">messages</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                  <Activity className="w-4 h-4 mr-1.5 text-blue-300" />
                                  <span className="text-white font-semibold">{Math.floor(Math.random() * 10) + 5}</span>
                                  <span className="text-zinc-400 ml-1">active now</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="self-center ml-4">
                              <button className="px-4 py-2 bg-gold hover:bg-gold/90 text-zinc-900 font-medium rounded-lg transition-colors">
                                Join Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setShowPopularGroups(false)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {renderGroupsList()}
          </>
        );
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // State for showing the games popup in the message input
    const [showGames, setShowGames] = useState(false);
    const gamePopupRef = React.useRef<HTMLDivElement | null>(null);

    // Optional: Close the popup if clicked outside
    useEffect(() => {
    if (!showGames) return;
    function handleClickOutside(event: MouseEvent) {
      if (gamePopupRef.current && !gamePopupRef.current.contains(event.target as Node)) {
      setShowGames(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showGames]);

    return (
    <div
  className="flex flex-col h-screen text-white overflow-x-hidden"
  style={
    selectedTheme
      ? {
          backgroundImage: `url('${selectedTheme}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : { backgroundColor: '#18181b' } // fallback to zinc-900
  }
>
      <MainNavbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Channel List */}
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-800">
            <h1 className="text-2xl font-extrabold text-gold flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-gold" />
              <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">Nexus</span>
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedGroup(null); // Clear selection when going to home
                navigate('/nexus-vibe');
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' && !selectedGroup
                  ? 'bg-gold/20 text-gold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('trending');
                setSelectedGroup(null);
                navigate('/nexus-vibe');
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'trending'
                  ? 'bg-gold/20 text-gold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('darkroom');
                setSelectedGroup(null);
                navigate('/nexus-vibe');
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'darkroom'
                  ? 'bg-gold/20 text-gold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>Dark Room</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('campus');
                setSelectedGroup(null);
                navigate('/nexus-vibe');
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'campus'
                  ? 'bg-gold/20 text-gold'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <span>Campus</span>
            </button>
          </nav>
          
          {/* Groups/Channels (Discord style) */}
          <div className="mt-4 p-4 border-t border-zinc-800 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-zinc-500">GROUPS</h3>
              <button 
                onClick={() => setIsCreateGroupOpen(true)}
                className="p-1 text-zinc-500 hover:text-zinc-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-0.5">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group);
                    navigate(`/nexus-vibe/${group.id}`);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedGroup?.id === group.id
                      ? 'bg-gold/20 text-gold'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{group.name}</span>
                  {group.messages.length > 0 && 
                    <span className="ml-auto bg-gold/90 text-zinc-900 rounded-full text-xs px-1.5 min-w-[1.25rem] flex justify-center">
                      {group.messages.length}
                    </span>
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content - Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden max-w-7xl w-full mx-auto">
          {selectedGroup ? (
            <>
              {/* Group Header */}
              <div className="h-16 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-900">
                <div className="flex items-center">
                  <button 
                    onClick={() => {
                      setSelectedGroup(null);
                      navigate('/nexus-vibe');
                    }}
                    className="mr-2 p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-gold/30 flex items-center justify-center mr-3 border border-gold/20">
                      <span className="font-semibold text-gold">{selectedGroup.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">{selectedGroup.name}</h2>
                      <div className="flex items-center text-xs text-zinc-500">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{selectedGroup.members} members</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                    <Info className="w-5 h-5" />
                  </button>
                  <button
  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300 relative"
  onClick={() => setShowThemePopup((v) => !v)}
>
  <MoreHorizontal className="w-5 h-5" />
  {/* Theme Popup */}
  {showThemePopup && (
    <div
      ref={themePopupRef}
      className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl p-4 z-50 flex flex-col space-y-4"
    >
      <div className="font-semibold text-white mb-2">Choose a Theme</div>
      <div className="grid grid-cols-3 gap-3">
        {staticThemes.map((url, idx) => (
          <button
            key={idx}
            className={`rounded-lg overflow-hidden border-2 ${selectedTheme === url ? 'border-gold' : 'border-transparent'} focus:outline-none`}
            onClick={() => {
              setSelectedTheme(url);
              setShowThemePopup(false);
            }}
          >
            <img src={url} alt={`Theme ${idx + 1}`} className="w-full h-16 object-cover" />
          </button>
        ))}
        {/* Custom upload */}
        <label className={`rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer h-16 ${selectedTheme === customTheme ? 'border-gold' : 'border-zinc-700'} bg-zinc-800 hover:bg-zinc-700 transition-colors`}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                setCustomTheme(url);
                setSelectedTheme(url);
                setShowThemePopup(false);
                 console.log('Custom theme URL:', url);
              }
            }}
          />
          <Image className="w-6 h-6 text-zinc-400 mb-1" />
          <span className="text-xs text-zinc-400">Custom</span>
        </label>
      </div>
      {/* Preview for custom theme */}
      {selectedTheme === customTheme && customTheme && (
        <div className="mt-2">
          <div className="text-xs text-zinc-400 mb-1">Preview:</div>
          <img src={customTheme} alt="Custom Theme Preview" className="w-full h-20 object-cover rounded-lg border border-zinc-700" />
        </div>
      )}
      <button
        className="mt-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        onClick={() => {
          setSelectedTheme(null);
          setCustomTheme(null);
          setShowThemePopup(false);
        }}
      >
        Reset to Default
      </button>
    </div>
  )}
</button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedGroup.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                    <p className="text-zinc-500 max-w-sm">
                      Be the first to start a conversation in this group!
                    </p>
                  </div>
                ) : (
                  selectedGroup.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] flex ${msg.sender === currentUser.name ? 'flex-row-reverse' : 'flex-row'}`}>
                        {msg.sender !== currentUser.name && (
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800">
                              <img src={msg.avatar || avatars[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                        <div>
                          {msg.sender !== currentUser.name && (
                            <div className="flex items-baseline mb-1">
                              <span className="font-medium text-sm text-white">{msg.sender}</span>
                              <span className="ml-2 text-xs text-zinc-500">{formatTime(msg.timestamp)}</span>
                            </div>
                          )}
                          <div className={`rounded-2xl px-4 py-2 ${
                            msg.sender === currentUser.name 
                              ? 'bg-gold text-zinc-900'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          
                          <div className={`flex mt-1 space-x-2 text-xs ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}>
                            <button className="text-zinc-500 hover:text-zinc-300">
                              <Heart className="w-3 h-3 inline mr-1" />
                              <span>Like</span>
                            </button>
                            <button className="text-zinc-500 hover:text-zinc-300">
                              <Repeat className="w-3 h-3 inline mr-1" />
                              <span>Reply</span>
                            </button>
                            <button className="text-zinc-500 hover:text-zinc-300">
                              <Share2 className="w-3 h-3 inline mr-1" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Message Input */}
               <div className="border-t border-zinc-800 p-3">
    <form onSubmit={handleSendMessage} className="flex items-center space-x-2 relative">
      {/* Game icon popup */}
      {showGames && (
        <div
          ref={gamePopupRef}
          className="absolute bottom-14 left-0 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-4 w-64 grid grid-cols-5 gap-3 z-20"
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
      <div className="flex items-center space-x-2">
        {/* Attachment icon */}
        <label className="cursor-pointer flex items-center">
          <input
            type="file"
            className="hidden"
            // TODO: Add your file upload handler here
          />
          <Paperclip className="w-5 h-5 text-zinc-400 hover:text-gold transition-colors" />
        </label>
        {/* Gaming console icon */}
        <button
          type="button"
          onClick={() => setShowGames((v) => !v)}
          className="flex items-center"
          tabIndex={0}
        >
          <Gamepad2 className="w-5 h-5 text-zinc-400 hover:text-gold transition-colors" />
        </button>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Message in #${selectedGroup.name}...`}
        className="flex-1 py-2 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`p-2 rounded-full ${
          message.trim()
            ? 'bg-gold hover:bg-gold/90 text-zinc-900'
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  </div>
             
            </>
          ) : (
            <div className="p-6 overflow-y-auto">
              {currentView !== 'home' && (
                <h1 className="text-2xl font-bold text-white mb-2">
                  {currentView === 'trending' && 'Trending Groups'}
                  {currentView === 'darkroom' && 'Dark Room'}
                  {currentView === 'campus' && 'Campus Connect'}
                </h1>
              )}
              <p className="text-zinc-400 mb-4">
                {currentView !== 'home' && (
                  <>
                    {currentView === 'trending' && 'Popular and active groups'}
                    {currentView === 'darkroom' && ''}
                    {currentView === 'campus' && 'Connect with your academic community'}
                  </>
                )}
              </p>
              
              {renderVibeView()}
            </div>
          )}
        </div>
        
        {/* Discord-like Members Sidebar (visible only when a group is selected) */}
        {selectedGroup && (
          <div className="w-60 border-l border-zinc-800 bg-zinc-900 hidden lg:flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-500">MEMBERS - {selectedGroup.members}</h3>
            </div>
            <div className="p-3 space-y-1 flex-1 overflow-y-auto">
              <div className="text-xs font-medium text-zinc-500 mb-2 pl-2">ONLINE - {Math.min(selectedGroup.members, 5)}</div>
              {/* Sample online users */}
              {Array.from({ length: Math.min(selectedGroup.members, 5) }).map((_, idx) => (
                <div key={idx} className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 group">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={avatars[idx % avatars.length]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                  </div>
                  <span className="text-zinc-400 group-hover:text-zinc-300">
                    {idx === 0 ? 'You' : ['Alex', 'Morgan', 'Taylor', 'Riley'][idx-1]}
                  </span>
                </div>
              ))}
              
              <div className="text-xs font-medium text-zinc-500 mb-2 mt-4 pl-2">OFFLINE - {selectedGroup.members - 5}</div>
              {/* Sample offline users */}
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 group opacity-70">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={avatars[(idx + 5) % avatars.length]} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-zinc-500 rounded-full border-2 border-zinc-900"></div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-zinc-400">
                    {['Jamie', 'Casey', 'Jordan'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Create Group Modal */}
      {isCreateGroupOpen && (
        <CreateGroup 
          isOpen={isCreateGroupOpen}
          onClose={() => setIsCreateGroupOpen(false)} 
          onCreateGroup={handleCreateGroup}
        />
      )}
      
      <FeatureNavigation />

      {/* Dark Room Disclaimer Modal */}
      {showDarkRoomDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="w-full max-w-lg p-6 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-black"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-[#0c0c0c] rounded-full flex items-center justify-center border border-green-500/30">
                  <Moon className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center font-mono">SYSTEM GUIDELINES</h2>
              
              <div className="mb-6 bg-[#0c0c0c] p-5 rounded-lg border border-green-500/30">
                <div className="text-green-500 font-mono text-xs mb-2">! WARNING: READ CAREFULLY !</div>
                <ul className="space-y-3 text-zinc-300 font-mono text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 pt-0.5 text-green-500">{'>'}</span>
                    <span>Your identity will remain <span className="text-green-400 font-semibold">completely anonymous</span> in the Dark Room.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 pt-0.5 text-green-500">{'>'}</span>
                    <span>Be respectful and considerate to all participants.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 pt-0.5 text-green-500">{'>'}</span>
                    <span>No harassment, hate speech, or illegal activities.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 pt-0.5 text-green-500">{'>'}</span>
                    <span>Messages in the Dark Room are <span className="text-green-400 font-semibold">not stored permanently</span>.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 pt-0.5 text-green-500">{'>'}</span>
                    <span>Violation of these guidelines may result in account restrictions.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    setShowDarkRoomDisclaimer(false);
                    setShowAliasInput(true);
                  }}
                  className="px-6 py-3 bg-green-900/30 hover:bg-green-900/50 text-green-400 font-mono rounded-lg transition-colors border border-green-500/30 group"
                >
                  <span className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    ACCEPT_TERMS
                  </span>
                </button>
                <button 
                  onClick={() => setShowDarkRoomDisclaimer(false)}
                  className="px-6 py-3 bg-[#0c0c0c] hover:bg-zinc-800 text-zinc-400 hover:text-green-400 font-mono rounded-lg transition-colors border border-green-500/20"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dark Room Alias Input */}
      {showAliasInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="w-full max-w-md p-6 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-black"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-[#0c0c0c] rounded-full flex items-center justify-center border border-green-500/30">
                  <span className="text-2xl font-mono text-green-500">&gt;_</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center font-mono">IDENTITY_PROTOCOL</h2>
              
              <p className="text-zinc-400 mb-6 text-center font-mono text-sm">
                Establish temporary encrypted identity token for this session.
              </p>
              
              <div className="bg-[#0c0c0c] p-4 rounded-lg border border-green-500/30 mb-6">
                <div className="text-green-500 font-mono text-xs mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span>ENTER_ALIAS</span>
                </div>
                <input
                  type="text"
                  value={darkRoomAlias}
                  onChange={(e) => setDarkRoomAlias(e.target.value)}
                  placeholder="user@anonymous:~$"
                  maxLength={20}
                  className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-green-400 placeholder-green-500/40 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono"
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    if (darkRoomAlias.trim()) {
                      setShowAliasInput(false);
                      setInDarkRoom(true);
                    }
                  }}
                  disabled={!darkRoomAlias.trim()}
                  className={`px-6 py-3 font-mono rounded-lg transition-colors border ${
                    darkRoomAlias.trim() 
                      ? 'bg-green-900/30 hover:bg-green-900/50 text-green-400 border-green-500/30' 
                      : 'bg-[#0c0c0c] text-green-500/40 cursor-not-allowed border-green-500/20'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {darkRoomAlias.trim() && <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>}
                    INITIALIZE_SESSION
                  </div>
                </button>
                <button 
                  onClick={() => setShowAliasInput(false)}
                  className="px-6 py-3 bg-[#0c0c0c] hover:bg-zinc-800 text-zinc-400 hover:text-green-400 font-mono rounded-lg transition-colors border border-green-500/20"
                >
                  ABORT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dark Room Interface */}
      {inDarkRoom && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col">
          {/* Dark Room Header */}
          <div className="p-4 border-b border-green-500/30 bg-zinc-900/90 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setInDarkRoom(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white mr-4"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center">
                <Moon className="w-5 h-5 text-green-500 mr-2" />
                <h2 className="text-lg font-bold text-white">Dark Room</h2>
              </div>
            </div>
            
            <div className="bg-green-900/30 px-3 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-green-500 text-sm font-mono">Anonymous Mode</span>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Anonymous Groups Sidebar */}
            <div className="w-64 bg-zinc-900/80 border-r border-green-500/30 flex flex-col">
              <div className="p-4 border-b border-green-500/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500/50" />
                  <input
                    type="text"
                    placeholder="Search anonymous groups..."
                    className="w-full pl-10 py-2 bg-[#0c0c0c] border border-green-500/30 rounded-lg text-zinc-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-green-500/50 text-sm font-mono"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="text-xs font-medium text-green-500/80 px-2 py-1 font-mono">ANONYMOUS GROUPS</div>
                
                {anonymousGroups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedAnonymousGroup(group.id)}
                    className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-sm transition-colors font-mono ${
                      selectedAnonymousGroup === group.id
                        ? 'bg-green-900/30 text-green-300'
                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-green-300'
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="truncate">{group.name}</span>
                    <span className="ml-auto text-xs bg-[#0c0c0c] text-green-500 rounded-full px-1.5 min-w-[1.25rem] flex justify-center border border-green-500/30">
                      {group.members}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="p-3 border-t border-green-500/30">
                <div className="bg-[#0c0c0c] rounded-lg p-3 text-sm border border-green-500/30">
                  <div className="flex items-center mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-500 font-mono">Your Alias</span>
                  </div>
                  <div className="px-2 py-1 bg-black rounded-md text-green-400 font-mono border border-green-500/20">
                    {darkRoomAlias}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {!selectedAnonymousGroup ? (
                // Welcome screen when no group is selected
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-md p-6">
                    <div className="w-20 h-20 bg-[#0c0c0c] rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                      <Moon className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400 mb-3 font-mono">Welcome to the Dark Room</h2>
                    <p className="text-zinc-400 mb-6 font-mono text-sm">
                      Select an anonymous group from the sidebar to join the conversation. Your identity will remain hidden as <span className="text-green-500 font-mono">{darkRoomAlias}</span>.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {anonymousGroups.slice(0, 4).map(group => (
                        <button
                          key={group.id}
                          onClick={() => setSelectedAnonymousGroup(group.id)}
                          className="bg-[#0c0c0c] hover:bg-green-900/20 border border-green-500/30 rounded-lg p-3 text-left transition-colors"
                        >
                          <h3 className="text-green-400 font-medium mb-1 font-mono">{group.name}</h3>
                          <p className="text-zinc-300 mb-3 line-clamp-2 text-sm">{group.description}</p>
                          <div className="mt-2 text-xs text-green-500 font-mono flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {group.members} anonymous users
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Group chat when a group is selected
                <>
                  {/* Group header */}
                  <div className="bg-zinc-900/80 border-b border-indigo-900/30 p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-indigo-400 font-semibold">
                          {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.name}
                        </h3>
                        <div className="text-zinc-500 flex items-center">
                          <Users className="w-3 h-3 mr-1 text-indigo-400/70" />
                          <span>
                            {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.members} anonymous users
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAnonymousGroup(null)}
                      className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Group header */}
                  <div className="bg-zinc-900/80 border-b border-green-500/30 p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#0c0c0c] rounded-lg flex items-center justify-center mr-3 border border-green-500/30">
                        <span className="text-green-500 font-mono">
                          {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-green-400 font-medium font-mono">
                          {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.name}
                        </h3>
                        <div className="text-zinc-500 flex items-center">
                          <Users className="w-3 h-3 mr-1 text-green-500/70" />
                          <span className="font-mono text-xs">
                            {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.members} anonymous users
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAnonymousGroup(null)}
                      className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-green-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
                    {/* Welcome message */}
                    <div className="bg-[#0c0c0c] border border-green-500/30 rounded-xl p-4 max-w-md mx-auto">
                      <div className="text-center text-green-400 mb-2 font-mono">
                        Welcome to {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.name}
                      </div>
                      <p className="text-zinc-400 text-sm text-center font-mono">
                        Your messages are anonymous. Remember to be respectful and follow our community guidelines.
                      </p>
                    </div>
                    
                    {/* Sample messages */}
                    <div className="flex justify-start max-w-[90%]">
                      <div className="bg-[#0c0c0c] text-zinc-300 px-4 py-2 rounded-xl border border-green-500/30 font-mono">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-semibold text-green-500">Anonymous</span>
                          <span className="text-xs text-zinc-500 ml-2">10:45 AM</span>
                        </div>
                        <p className="text-sm">This is a safe space to discuss {anonymousGroups.find(g => g.id === selectedAnonymousGroup)?.description.toLowerCase()}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start max-w-[90%]">
                      <div className="bg-[#0c0c0c] text-zinc-300 px-4 py-2 rounded-xl border border-green-500/30 font-mono">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-semibold text-green-500">Anonymous</span>
                          <span className="text-xs text-zinc-500 ml-2">10:47 AM</span>
                        </div>
                        <p className="text-sm">I'm glad we can talk about these topics without revealing our identities. It makes it easier to be honest.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end max-w-[90%] ml-auto">
                      <div className="bg-green-900/20 text-white px-4 py-2 rounded-xl border border-green-500/40 font-mono">
                        <div className="flex items-center justify-end mb-1">
                          <span className="text-xs font-semibold text-green-400">{darkRoomAlias}</span>
                          <span className="text-xs text-green-500/50 ml-2">Just now</span>
                        </div>
                        <p className="text-sm">Thanks for having me here. This is a great concept!</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 bg-black border-t border-green-500/30">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={anonymousMessage}
                          onChange={(e) => setAnonymousMessage(e.target.value)}
                          placeholder="Type anonymously..."
                          className="w-full px-4 py-3 bg-[#0c0c0c] border border-green-500/30 rounded-lg text-white placeholder-green-500/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-10 font-mono"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-green-500">
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <button 
                        className={`p-3 rounded-lg text-white ${
                          anonymousMessage.trim() 
                            ? 'bg-green-700 hover:bg-green-600' 
                            : 'bg-green-900/20 text-green-500/50 cursor-not-allowed'
                        }`}
                        disabled={!anonymousMessage.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-2">
                      <div className="text-xs text-zinc-500 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        <span className="font-mono">Speaking as: <span className="text-green-500">{darkRoomAlias}</span></span>
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {Math.floor(Math.random() * 20) + 5} anonymous users online
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
