import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface CharacterCategoryProps {
  title: string;
  characters: {
    slug: string;
    character: any;
    views: number;
    likes: number;
  }[];
  icon?: React.ReactNode;
  favorites: string[];
  toggleFavorite: (e: React.MouseEvent, slug: string) => void;
  handleLike: (e: React.MouseEvent, slug: string) => void;
}

interface ColorScheme {
  iconBg: string;
  underline: string;
  button: string;
  tag: string;
  highlight: string;
}

export default function CharacterCategory({
  title,
  characters,
  icon,
  favorites,
  toggleFavorite,
  handleLike
}: CharacterCategoryProps) {
  const navigate = useNavigate();
  const [showAllModal, setShowAllModal] = useState(false);

  // Main carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3; // Adjust as needed

  // Modal carousel state
  const [modalPage, setModalPage] = useState(0);
  const modalCardsPerPage = 8; // Adjust as needed (e.g., 2 rows of 4)
  const modalTotalPages = Math.ceil(characters.length / modalCardsPerPage);

  // Color scheme logic
  const colorScheme = useMemo((): ColorScheme => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('you')) {
      return {
        iconBg: 'bg-nexus-blue-800/80',
        underline: 'bg-nexus-blue-500',
        button: 'bg-gradient-to-r from-nexus-blue-500 to-nexus-blue-600',
        tag: 'bg-nexus-blue-800/80',
        highlight: 'text-nexus-blue-300'
      };
    } else if (lowerTitle.includes('boredom') || lowerTitle.includes('buster')) {
      return {
        iconBg: 'bg-emerald-800/80',
        underline: 'bg-emerald-500',
        button: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        tag: 'bg-emerald-800/80',
        highlight: 'text-emerald-300'
      };
    } else if (lowerTitle.includes('action')) {
      return {
        iconBg: 'bg-orange-800/80',
        underline: 'bg-orange-500',
        button: 'bg-gradient-to-r from-orange-500 to-orange-600',
        tag: 'bg-orange-800/80',
        highlight: 'text-orange-300'
      };
    } else if (lowerTitle.includes('comedy') || lowerTitle.includes('carnival')) {
      return {
        iconBg: 'bg-amber-800/80',
        underline: 'bg-amber-500',
        button: 'bg-gradient-to-r from-amber-500 to-amber-600',
        tag: 'bg-amber-800/80',
        highlight: 'text-amber-300'
      };
    } else if (lowerTitle.includes('loved') || lowerTitle.includes('most loved')) {
      return {
        iconBg: 'bg-red-800/80',
        underline: 'bg-red-500',
        button: 'bg-gradient-to-r from-red-500 to-red-600',
        tag: 'bg-red-800/80',
        highlight: 'text-red-300'
      };
    } else if (lowerTitle.includes('crowd') || lowerTitle.includes('pleas')) {
      return {
        iconBg: 'bg-nexus-purple-800/80',
        underline: 'bg-nexus-purple-500',
        button: 'bg-gradient-to-r from-nexus-purple-500 to-nexus-purple-600',
        tag: 'bg-nexus-purple-800/80',
        highlight: 'text-nexus-purple-300'
      };
    } else {
      return {
        iconBg: 'bg-nexus-neutral-800/80',
        underline: 'bg-gradient-blue-purple',
        button: 'bg-gradient-blue-purple',
        tag: 'bg-nexus-neutral-800/80',
        highlight: 'text-nexus-blue-300'
      };
    }
  }, [title]);

  if (characters.length === 0) return null;

  // Main carousel handlers
  const handleNext = () => {
    if (currentIndex + cardsPerPage < characters.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };
  const handlePrev = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  // Modal carousel handlers
  const handleModalNext = () => {
    if (modalPage < modalTotalPages - 1) setModalPage(modalPage + 1);
  };
  const handleModalPrev = () => {
    if (modalPage > 0) setModalPage(modalPage - 1);
  };

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {icon && (
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colorScheme.iconBg} mr-2`}>
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl font-poppins font-medium text-white">
              {title}
            </h2>
            <div className={`h-0.5 w-10 mt-1 ${colorScheme.underline} rounded-full`}></div>
          </div>
        </div>
        {/* Prev/Next buttons at top right */}
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
            aria-label="Previous"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + cardsPerPage >= characters.length}
            className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel (no navigation buttons here) */}
      <div className="relative">
        <div className="flex overflow-hidden w-full">
          <div
            className="flex space-x-4 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (208 + 16)}px)`,
              minWidth: 'max-content'
            }}
          >
            {characters.map(({ slug, character, views, likes: likeCount }) => (
              <div
                key={slug}
               className="card relative group overflow-hidden flex-shrink-0 w-52 transition-transform duration-300 hover:scale-105"
  >
                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(e, slug)}
                  className={`absolute top-2 right-2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    favorites.includes(slug)
                      ? 'bg-nexus-purple-500 text-white'
                      : 'bg-nexus-neutral-800/70 text-nexus-neutral-300 hover:bg-nexus-neutral-700/70'
                  }`}
                >
                  <Star className="w-3 h-3" fill={favorites.includes(slug) ? "currentColor" : "none"} />
                </button>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-neutral-900/20 to-nexus-neutral-900/80 z-10"></div>

                {/* Character image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover" // <-- remove group-hover:scale-110
      />
                </div>

                {/* Character info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <h3 className="text-base font-bold text-white mb-2">{character.name}</h3>
                  <button
                    onClick={() => navigate(`/chat/${slug}`)}
                    className={`w-full flex items-center justify-center space-x-1 px-2 py-1.5 ${colorScheme.button} text-white rounded-lg transition-all duration-200 text-xs font-medium hover:opacity-90`}
                  >
                    <span>Chat Now</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nexus-neutral-900/80 backdrop-blur-sm p-4 md:p-8 overflow-hidden" style={{ isolation: 'isolate' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-nexus-neutral-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-soft animate-fade-in flex flex-col relative">
            {/* Header with close and carousel controls */}
            <div className="p-5 border-b border-nexus-neutral-700 flex items-center justify-between sticky top-0 bg-nexus-neutral-800 z-10">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorScheme.iconBg}`}>
                    {icon}
                  </div>
                )}
                <h2 className="text-2xl font-poppins font-medium text-white">{title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleModalPrev}
                  disabled={modalPage === 0}
                  className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
                  aria-label="Previous page"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleModalNext}
                  disabled={modalPage >= modalTotalPages - 1}
                  className="p-2 bg-gray-700 text-white rounded-full disabled:opacity-50 flex items-center justify-center"
                  aria-label="Next page"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="p-2.5 bg-nexus-neutral-700 hover:bg-nexus-neutral-600 rounded-full text-white transition-colors flex items-center justify-center ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Paginated grid */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {characters
                  .slice(modalPage * modalCardsPerPage, (modalPage + 1) * modalCardsPerPage)
                  .map(({ slug, character, views, likes: likeCount }) => (
                  <div
                    key={slug}
                    className="card relative group overflow-hidden flex-shrink-0"
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, slug)}
                      className={`absolute top-2 right-2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        favorites.includes(slug)
                          ? 'bg-nexus-purple-500 text-white'
                          : 'bg-nexus-neutral-800/70 text-nexus-neutral-300 hover:bg-nexus-neutral-700/70'
                      }`}
                    >
                      <Star className="w-3 h-3" fill={favorites.includes(slug) ? "currentColor" : "none"} />
                    </button>

                    {/* Character image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Character info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <h3 className="text-base font-bold text-white mb-2">{character.name}</h3>
                      <button 
                        onClick={() => {
                          navigate(`/chat/${slug}`);
                          setShowAllModal(false);
                        }}
                        className={`w-full flex items-center justify-center space-x-1 px-2 py-1.5 ${colorScheme.button} text-white rounded-lg transition-all duration-200 text-xs font-medium hover:opacity-90`}
                      >
                        <span>Chat Now</span>
                        <ArrowRight className="w-2.5 h-2.5" />
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