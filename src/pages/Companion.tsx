import React, { useState, useEffect } from 'react';
import { 
  User, Bot, Heart, MessageSquare, Sparkles, Settings, X, 
  ChevronLeft, ChevronRight, Star, Zap, Search, Filter,
  Brain, Smile, Lightbulb, BookOpen, Music, Code, Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { companions, Companion } from '../utils/companions';
import { useCompanion } from '../contexts/CompanionContext';
import { MainNavbar } from '../components/MainNavbar';
import { FeatureNavigation } from '../components/FeatureNavigation';
import { FilterDropdown } from '../components/FilterDropdown';
import { CompanionOnboarding, UserPreferences } from '../components/CompanionOnboarding';

export default function CompanionPage() {
  const { selectedCompanionId, setSelectedCompanionId } = useCompanion();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [personalityFilter, setPersonalityFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companionsPerPage = 6;
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Personality traits for filtering
  const personalityTraits = [
    'Supportive', 'Creative', 'Analytical', 'Empathetic', 
    'Adventurous', 'Calm', 'Energetic', 'Witty'
  ];

  // Interest categories with icons
  const interestCategories = {
    'Technology': <Code className="w-5 h-5" />,
    'Art': <Camera className="w-5 h-5" />,
    'Music': <Music className="w-5 h-5" />,
    'Learning': <BookOpen className="w-5 h-5" />,
    'Creativity': <Lightbulb className="w-5 h-5" />,
    'Psychology': <Brain className="w-5 h-5" />,
    'Humor': <Smile className="w-5 h-5" />
  };

  const handleSelectCompanion = (companionId: string) => {
    setSelectedCompanion(companionId);
    setShowDetails(true);
  };

  const handleStartChatting = () => {
    if (selectedCompanion) {
      setSelectedCompanionId(selectedCompanion);
      navigate('/ai');
    }
  };

  const filteredCompanions = companions.filter((companion: Companion) => {
    const matchesSearch = companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         companion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPersonality = personalityFilter.length === 0 ||
                              personalityFilter.some((trait: string) => 
                                companion.personality.traits.includes(trait.toLowerCase()));
    return matchesSearch && matchesPersonality;
  });

  const totalPages = Math.ceil(filteredCompanions.length / companionsPerPage);
  const currentCompanions = filteredCompanions.slice(
    (currentPage - 1) * companionsPerPage,
    currentPage * companionsPerPage
  );

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('companionOnboardingCompleted');
    setHasCompletedOnboarding(!!onboardingCompleted);
  }, []);

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    // Save preferences to localStorage or your backend
    localStorage.setItem('companionOnboardingCompleted', 'true');
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setHasCompletedOnboarding(true);
    
    // Here you would typically use the preferences to find the best matching companion
    // For now, we'll just navigate to the companion selection
    navigate('/companion/select');
  };

  if (!hasCompletedOnboarding) {
    return <CompanionOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <MainNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent p-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect AI Companion</h1>
            <p className="text-zinc-300 text-lg max-w-2xl mb-6">
              Discover AI companions that match your personality and interests. Each companion is uniquely designed to provide meaningful interactions and support.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-zinc-900 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Discover Companions</span>
              </button>
              <button
                onClick={() => setActiveTab('my-companions')}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>My Companions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search companions by name, interests, or personality..."
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>
            <FilterDropdown
              filters={personalityTraits}
              selectedFilters={personalityFilter}
              onFilterChange={setPersonalityFilter}
            />
          </div>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCompanions.map((companion) => (
            <div
              key={companion.id}
              className="group relative bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:border-gold/50 transition-all duration-300"
            >
              {/* Companion Card Content */}
              <div className="relative">
                {/* Avatar Section */}
                <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-zinc-700 overflow-hidden border-4 border-zinc-600 relative group-hover:border-gold/50 transition-colors">
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        <User className="w-16 h-16" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Personality Tags */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {companion.personality.traits.slice(0, 3).map((trait: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-zinc-900/80 backdrop-blur-sm text-xs text-gold rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                        {companion.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">{companion.description}</p>
                    </div>
                    <button
                      onClick={() => handleSelectCompanion(companion.id)}
                      className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
                      <div className="text-gold font-semibold">98%</div>
                      <div className="text-xs text-zinc-400">Match</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
                      <div className="text-gold font-semibold">4.9</div>
                      <div className="text-xs text-zinc-400">Rating</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
                      <div className="text-gold font-semibold">1.2k</div>
                      <div className="text-xs text-zinc-400">Users</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectCompanion(companion.id)}
                      className="flex-1 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Star className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCompanion(companion.id);
                        handleStartChatting();
                      }}
                      className="flex-1 px-4 py-2 bg-gold hover:bg-gold/90 text-zinc-900 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat Now</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <h4 className="font-semibold mb-2">Quick Preview</h4>
                  <p className="text-sm text-zinc-300 line-clamp-2">
                    {companion.personality.background}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-gold text-zinc-900'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Companion Details Modal */}
      {showDetails && selectedCompanion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Companion Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {(() => {
                  const companion = companions.find((c: Companion) => c.id === selectedCompanion);
                  if (!companion) return null;

                  return (
                    <div className="space-y-8">
                      {/* Profile Section */}
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                          <div className="aspect-square bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-48 h-48 rounded-full bg-zinc-700 overflow-hidden border-4 border-zinc-600">
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                                  <User className="w-24 h-24" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3 space-y-6">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-3">{companion.name}</h3>
                            <p className="text-zinc-300 text-lg">{companion.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-800 rounded-lg p-4">
                              <div className="text-sm text-zinc-400 mb-1">Personality</div>
                              <div className="text-white font-medium">{companion.personality.emotionalStyle}</div>
                            </div>
                            <div className="bg-zinc-800 rounded-lg p-4">
                              <div className="text-sm text-zinc-400 mb-1">Speaking Style</div>
                              <div className="text-white font-medium">{companion.personality.speakingStyle}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Traits Section */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Personality Traits</h4>
                        <div className="flex flex-wrap gap-2">
                          {companion.personality.traits.map((trait: string, index: number) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-zinc-800 text-gold rounded-full text-sm"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interests Section */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Interests & Expertise</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {companion.personality.interests.map((interest: string, index: number) => (
                            <div
                              key={index}
                              className="bg-zinc-800 rounded-lg p-4 flex items-center space-x-3 group hover:bg-zinc-700 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                                {interestCategories[interest as keyof typeof interestCategories] || <Sparkles className="w-6 h-6 text-gold" />}
                              </div>
                              <span className="text-white font-medium">{interest}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Background Section */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Background Story</h4>
                        <div className="bg-zinc-800 rounded-lg p-6">
                          <p className="text-zinc-300 leading-relaxed">{companion.personality.background}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            setSelectedCompanionId(selectedCompanion);
                            navigate('/ai');
                          }}
                          className="flex-1 px-6 py-3 bg-gold hover:bg-gold/90 text-zinc-900 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Start Chatting</span>
                        </button>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      <FeatureNavigation />
    </div>
  );
} 