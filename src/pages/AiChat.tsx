import React, { useState, useEffect, useMemo } from "react";
import {
  Bot,
  Search,
  ArrowLeft,
  MessageSquare,
  Heart,
  Share2,
  Star,
  X,
  Crown,
  ChevronDown,
  ChevronUp,
  Filter,
  Minus,
  Smile,
  Zap,
  Radio,
  Award,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreateCharacterModal } from "../components/CreateCharacterModal";
import { SupportBotIcon } from "../components/SupportBotIcon";
import { FeatureNavigation } from "../components/FeatureNavigation";
import { PricingModal } from "../components/PricingModal";
import { ProfileButton } from "../components/ProfileButton";
import { CharacterLeaderboard } from "../components/CharacterLeaderboard";
import { useCharacterViews } from "../utils/viewsManager";
import CharacterCreatedNotification from "../components/CharacterCreatedNotification";
import TrendingCharacters from "../components/TrendingCharacters";
import CharacterCategory from "../components/CharacterCategory";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";

import { useCharacterContext } from "../contexts/CharacterContext"; // ✅ Import global context
import { menuItems, announcements } from "../data/AI-chat-data/data";

// Add genre categories
const genreCategories = [
  {
    id: "waifu",
    name: "Waifu",
    description: "Female anime characters you can chat with",
    slugs: [
      "hinata",
      "mikasa",
      "asuna",
      "zero-two",
      "marin-kitagawa",
      "misato",
      "rem",
      "mai-sakurajima",
      "winry-rockbell",
      "tsunade-senju",
      "rukia-kuchiki",
      "albedo",
      "historia-reiss",
      "annie-leonhart",
      "farnese-berserk",
      "android-18",
      "fern",
      "darkness",
      "aqua",
      "megumin",
      "yor-forger",
      "makima",
      "power",
      "saber",
      "rin-tohsaka",
      "violet-evergarden",
      "ryuko-matoi",
      "toga-himiko",
      "ochaco-uraraka",
      "momo-yaoyorozu",
      "lucy-heartfilia",
      "erza-scarlet",
      "nezuko",
      "bulma",
      "hestia",
      "roxy-migurdia",
      "yuno-gasai",
      "revy",
      "nami",
      "nico-robin",
    ],
    bgColor: "from-pink-900/30 to-purple-900/30",
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    tagline: "Anime Female Characters",
  },
  {
    id: "hubby",
    name: "Hubby",
    description: "Hot male anime characters",
    slugs: [
      "naruto",
      "sasuke",
      "levi",
      "gojo",
      "eren",
      "kakashi",
      "goku",
      "luffy",
      "zoro",
      "sanji",
      "guts",
      "griffith",
      "light-yagami",
      "lelouch",
      "hisoka",
      "alucard",
      "kirito",
      "itachi",
      "vegeta",
      "minato",
      "jiraiya",
      "kira-yamato",
      "archer-emiya",
      "gilgamesh",
      "edward-elric",
      "roy-mustang",
      "kaneki-ken",
      "tanjiro",
      "zenitsu",
      "inosuke",
      "subaru",
      "kazuma",
      "jean-kirstein",
      "l-lawliet",
      "yagami-light",
      "spike-spiegel",
      "vash",
      "mugen",
      "usopp",
    ],
    bgColor: "from-blue-900/30 to-indigo-900/30",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    tagline: "Hot Anime Males",
  },
  {
    id: "dark-romance",
    name: "Dark Romance",
    description:
      "Intense and passionate romantic characters with darker themes",
    slugs: [
      "edward-cullen",
      "harry-styles",
      "mafia-boss",
      "billionaire-ceo",
      "bad-boy",
      "vampire-prince",
      "alpha-werewolf",
      "college-quarterback",
      "mysterious-neighbor",
      "bodyguard",
      "rockstar",
      "college-professor",
      "surgeon",
      "best-friends-brother",
      "celebrity-crush",
      "arranged-marriage",
      "childhood-enemy",
    ],
    bgColor: "from-red-900/30 to-orange-900/30",
    icon: <Smile className="w-5 h-5 text-red-400" />,
    tagline: "Intense Romantic Characters",
  },
  {
    id: "helpers",
    name: "Helpers",
    description: "Productivity AI characters to assist you",
    slugs: [
      "professor",
      "life-coach",
      "therapist",
      "fitness-trainer",
      "study-buddy",
      "career-advisor",
      "math-tutor",
      "writing-assistant",
      "language-teacher",
      "chess-master",
      "meditation-guide",
      "nutrition-expert",
      "financial-advisor",
      "coding-mentor",
      "research-assistant",
      "productivity-expert",
      "science-teacher",
      "learning-companion",
      "history-professor",
      "philosophy-mentor",
      "personal-assistant",
      "business-consultant",
      "marketing-strategist",
      "design-mentor",
      "project-manager",
      "data-scientist",
      "startup-advisor",
      "job-interview-coach",
      "resume-writer",
      "time-management-coach",
      "public-speaking-coach",
      "debate-coach",
      "language-learning-partner",
      "book-summarizer",
      "technical-writer",
      "quantum-physics-teacher",
      "statistics-tutor",
      "chemistry-lab-assistant",
      "astronomy-professor",
      "ai-ethics-expert",
    ],
    bgColor: "from-green-900/30 to-emerald-900/30",
    icon: <ThumbsUp className="w-5 h-5 text-green-400" />,
    tagline: "Productivity Assistants",
  },
];

function AiChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { characters, loading: loadingCharacters } = useCharacterContext(); // ✅ Use global shared characters
  const [showFavorites, setShowFavorites] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [views, setViews] = useState<Record<string, number>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [tagSearch, setTagSearch] = useState("");
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { user: string; ai: string }[]
  >([]);
  const [newCharacter, setNewCharacter] = useState<string | null>(null);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [showGenres, setShowGenres] = useState(false);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (!bannerVisible) return;

    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) =>
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerVisible]);

  // Check URL for new character creation notification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newChar = params.get("newCharacter");
    if (newChar) {
      setNewCharacter(newChar);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Get all unique tags from all characters
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(characters).forEach((character) => {
      if (character.tags) {
        character.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [characters]);

  // Count how many characters have each tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTags.forEach((tag) => {
      counts[tag] = Object.values(characters).filter(
        (character) => character.tags && character.tags.includes(tag)
      ).length;
    });
    return counts;
  }, [allTags, characters]);

  // Sort tags by popularity (count)
  const popularTags = useMemo(() => {
    return allTags.sort((a, b) => tagCounts[b] - tagCounts[a]).slice(0, 20); // Show top 20 tags
  }, [allTags, tagCounts]);

  // Updated activeMenuItems to include Genres
  const activeMenuItems = useMemo(() => {
    return menuItems.map((item) => ({
      ...item,
      active:
        (item.label === "Home" && location.pathname === "/ai") ||
        (item.label === "Showdown" && location.pathname === "/showdown") ||
        (item.label === "Create Buddy" &&
          location.pathname === "/create-buddy") ||
        (item.label === "Companion" && location.pathname === "/companion") ||
        (item.label === "My Chats" && location.pathname === "/my-chats") ||
        (item.label === "Settings" && location.pathname === "/settings") ||
        (item.label === "Genres" && showGenres) ||
        (item.label === "Favorites" && showFavorites),
    }));
  }, [location.pathname, showFavorites, showGenres]);

  const handleMenuClick = (label: string) => {
    console.log("Menu clicked:", label);
    switch (label) {
      case "Settings":
        navigate("/settings");
        break;
      case "Favorites":
        setShowFavorites((prev) => {
          const newValue = !prev;
          if (newValue) {
            setShowGenres(false);
            setActiveGenre(null);
          }
          return newValue;
        });
        break;
      case "Genres":
        setShowGenres((prev) => {
          const newValue = !prev;
          if (newValue) {
            setShowFavorites(false);
          }
          return newValue;
        });
        break;
      case "My Chats":
        navigate("/my-chats");
        break;
      case "Home":
        navigate("/ai");
        break;
      case "Create Buddy":
        navigate("/create-buddy");
        break;
      case "Companion":
        navigate("/companion");
        break;
      case "Showdown":
        navigate("/showdown");
        break;
    }
  };

  // Initialize random views and likes for each character
  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");

    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    } else {
      const initialLikes: Record<string, number> = {};

      Object.entries(characters).forEach(([slug, character]) => {
        initialLikes[slug] = Math.floor(Math.random() * 1000);
      });

      setLikes(initialLikes);
    }
  }, []);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  // Use the custom hook to manage character views with initial random data
  useCharacterViews(
    setViews,
    useMemo(() => {
      const initialViews: Record<string, number> = {};
      Object.entries(characters).forEach(([slug]) => {
        initialViews[slug] = Math.floor(Math.random() * 5000) + 1000;
      });
      return initialViews;
    }, [])
  );

  const toggleFavorite = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    console.log("Toggle favorite for:", slug, "Current favorites:", favorites);

    // Get the most up-to-date favorites from localStorage if possible
    let currentFavorites = [...favorites];
    if (isLocalStorageAvailable()) {
      try {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          currentFavorites = JSON.parse(storedFavorites);
        }
      } catch (error) {
        console.error("Error reading favorites before toggle:", error);
      }
    }

    // Update favorites state
    const newFavorites = currentFavorites.includes(slug)
      ? currentFavorites.filter((id) => id !== slug)
      : [...currentFavorites, slug];

    console.log("New favorites state:", newFavorites);

    // Update state
    setFavorites(newFavorites);

    // Directly update localStorage to ensure it's updated immediately
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites during toggle:", error);
      }
    }
  };

  const handleLike = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [slug]: (prev[slug] || 0) + 1,
    }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreateCharacter = (character: any) => {
    const slug = character.name.toLowerCase().replace(/\s+/g, "-");
    const newCharacter = {
      id: Object.keys(characters).length + 1,
      name: character.name,
      role: character.tags[0] || "AI Character",
      image:
        character.image ||
        "https://images.unsplash.com/photo-1675789652575-0a5d2425b6c2?auto=format&fit=crop&w=300&h=300",
      description: character.description,
      languages: {
        primary: "English",
        style: "Natural and conversational",
        greeting: character.greeting,
      },
      personality: {
        traits: character.tags,
        quirks: [],
        emotionalStyle: "Adaptive and responsive",
        speakingStyle: "Clear and engaging",
        interests: character.tags,
        background: character.description,
      },
    };

    // Add the new character to the characters object
    Object.assign(characters, { [slug]: newCharacter });

    setShowCreateModal(false);
  };

  const handleViewAllRankings = () => {
    setShowFullLeaderboard(true);
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const testKey = "__test_key__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error("localStorage is not available:", e);
      return false;
    }
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.error("Cannot load favorites: localStorage is not available");
      return;
    }

    try {
      const storedFavorites = localStorage.getItem("favorites");
      console.log("Loading favorites from localStorage:", storedFavorites);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.error("Cannot save favorites: localStorage is not available");
      return;
    }

    try {
      console.log("Saving favorites to localStorage:", favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  // Helper function to create character objects for category components
  const createCategoryCharacters = (charactersList: [string, any][]) => {
    return charactersList.map(([slug, character]) => ({
      slug,
      character,
      views: views[slug] || 0,
      likes: likes[slug] || 0,
    }));
  };

  // Get character lists for each category
  const categoryCharacters = useMemo(() => {
    if (!characters || Object.keys(characters).length === 0) return {};

    const allCharacters = Object.entries(characters);
    const randomizedCharacters = [...allCharacters].sort(
      () => Math.random() - 0.5
    );

    // Get trending slugs to avoid duplication
    const trendingSlugs = Object.entries(characters)
      .map(([slug, _]) => ({
        slug,
        views: views[slug] || 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 4)
      .map((item) => item.slug);

    // For You - Random selection of characters with diverse tags
    const forYouCharacters = randomizedCharacters
      .filter(([slug, _]) => !trendingSlugs.includes(slug))
      .slice(0, 10);

    // Helper function to ensure we have enough characters in each category
    const ensureSufficientCharacters = (filteredList: [string, any][]) => {
      if (filteredList.length >= 5) return filteredList.slice(0, 10);

      // If we don't have enough characters matching the criteria,
      // pad with random characters not already in the list
      const existingSlugs = new Set(filteredList.map(([slug, _]) => slug));
      const additionalCharacters = randomizedCharacters
        .filter(
          ([slug, _]) =>
            !existingSlugs.has(slug) && !trendingSlugs.includes(slug)
        )
        .slice(0, 10 - filteredList.length);

      return [...filteredList, ...additionalCharacters];
    };

    // Boredom Buster - Entertainment, Fun tags
    const boredomBusterFiltered = allCharacters.filter(
      ([_, character]) =>
        character.tags &&
        character.tags.some((tag: string) =>
          ["entertainment", "fun", "comedy", "adventure", "games"].includes(
            tag.toLowerCase()
          )
        )
    );
    const boredomBusterCharacters = ensureSufficientCharacters(
      boredomBusterFiltered
    );

    // Action - Action, Adventure, Fighting tags
    const actionFiltered = allCharacters.filter(
      ([_, character]) =>
        character.tags &&
        character.tags.some((tag: string) =>
          [
            "action",
            "adventure",
            "warrior",
            "fighter",
            "hero",
            "battle",
          ].includes(tag.toLowerCase())
        )
    );
    const actionCharacters = ensureSufficientCharacters(actionFiltered);

    // Comedy Carnival - Comedy, Humor tags
    const comedyFiltered = allCharacters.filter(
      ([_, character]) =>
        character.tags &&
        character.tags.some((tag: string) =>
          ["comedy", "humor", "funny", "joke", "laugh"].includes(
            tag.toLowerCase()
          )
        )
    );
    const comedyCharacters = ensureSufficientCharacters(comedyFiltered);

    // Most Loved - Characters with highest likes
    const mostLovedCharacters = allCharacters
      .map(([slug, character]) => ({
        slug,
        character,
        likes: likes[slug] || 0,
      }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10)
      .map(({ slug, character }) => [slug, character] as [string, any]);

    // Crowd Pleasers - High view count that aren't trending
    const crowdPleasersCharacters = allCharacters
      .filter(([slug, _]) => !trendingSlugs.includes(slug))
      .map(([slug, character]) => ({
        slug,
        character,
        views: views[slug] || 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
      .map(({ slug, character }) => [slug, character] as [string, any]);

    return {
      trendingSlugs,
      forYou: createCategoryCharacters(forYouCharacters),
      boredomBuster: createCategoryCharacters(boredomBusterCharacters),
      action: createCategoryCharacters(actionCharacters),
      comedy: createCategoryCharacters(comedyCharacters),
      mostLoved: createCategoryCharacters(mostLovedCharacters),
      crowdPleasers: createCategoryCharacters(crowdPleasersCharacters),
    };
  }, [characters, views, likes]);

  // Add a function to handle genre selection
  const handleGenreSelect = (genreId: string) => {
    setActiveGenre(genreId === activeGenre ? null : genreId);
  };

  if (loadingCharacters) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <CharacterCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Side Menu */}
      <nav className="fixed left-0 top-0 h-screen w-56 backdrop-blur-sm border-r border-zinc-800 bg-zinc-900/50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 relative overflow-hidden group">
              <span className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform">
                N
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 animate-shimmer" />
            </div>
            <span className="text-xl font-bold text-gold">Nexus</span>
          </div>

          <div className="space-y-2 mb-6">
            {activeMenuItems.slice(0, 5).map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-gold text-zinc-900"
                    : "text-zinc-400 hover:bg-zinc-700/50"
                }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Leaderboard Button */}
            <button
              onClick={handleViewAllRankings}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-zinc-400 hover:bg-zinc-700/50">
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Leaderboard</span>
            </button>

            {activeMenuItems.slice(5).map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-gold text-zinc-900"
                    : "text-zinc-400 hover:bg-zinc-700/50"
                }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm fixed left-56 right-0 top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="text-gold hover:text-gold/80 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Bot className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">
                  {showFavorites ? "My Favorites" : "Nexus AI"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative w-96">
                <Search className="absolute left-3 top-2.5 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-gold"
                />
              </div>
              {!showFavorites && (
                <div className="relative">
                  <button
                    onClick={() => setFiltersExpanded(!filtersExpanded)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      filtersExpanded
                        ? "bg-gold text-zinc-900 hover:bg-gold/90"
                        : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700/80"
                    }`}>
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                    {filtersExpanded ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                  {filtersExpanded && (
                    <div className="absolute top-full left-0 mt-1 w-64 p-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        placeholder="Search tags..."
                        value={tagSearch}
                        onChange={(e) => setTagSearch(e.target.value)}
                        className="w-full mb-2 px-3 py-1 rounded bg-zinc-700 border border-zinc-600 text-white focus:outline-none"
                      />
                      <div className="flex flex-col space-y-1">
                        {popularTags
                          .filter((tag) =>
                            tag.toLowerCase().includes(tagSearch.toLowerCase())
                          )
                          .map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center justify-between">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedTags.includes(tag)}
                                  onChange={() => toggleTag(tag)}
                                  className="w-4 h-4 text-gold bg-zinc-800 border border-zinc-700 rounded focus:ring-gold"
                                />
                                <span className="text-white text-sm">
                                  {tag}
                                </span>
                              </label>
                              {selectedTags.includes(tag) && (
                                <button
                                  onClick={() => toggleTag(tag)}
                                  className="text-zinc-400 hover:text-gold">
                                  <Minus className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => setShowPricingModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-colors font-medium">
                <Crown className="w-5 h-5" />
                <span>Upgrade</span>
              </button>
              <ProfileButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-56 px-6 pt-24 pb-12">
        <div className="container mx-auto">
          {/* Genres View */}
          {showGenres && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Character Genres
                </h2>
                <p className="text-zinc-400">
                  Explore different categories of AI companions
                </p>
              </div>

              {/* Genre Selector Tabs */}
              <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                {genreCategories.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`px-5 py-3 rounded-lg whitespace-nowrap transition-colors ${
                      activeGenre === genre.id
                        ? "bg-gold text-zinc-900 font-medium"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}>
                    <div className="flex items-center space-x-2">
                      {genre.icon}
                      <span>{genre.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Genre Content */}
              {activeGenre ? (
                <div>
                  {genreCategories.map(
                    (genre) =>
                      genre.id === activeGenre && (
                        <div key={genre.id} className="animate-fadeIn">
                          <div className="flex items-center mb-6">
                            <div
                              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${genre.bgColor} flex items-center justify-center mr-4`}>
                              {genre.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white">
                                {genre.name}
                              </h3>
                              <p className="text-zinc-400">
                                {genre.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {Object.entries(characters)
                              .filter(([slug]) => genre.slugs.includes(slug))
                              .map(([slug, character]) => (
                                <div
                                  key={slug}
                                  onClick={() => navigate(`/chat/${slug}`)}
                                  className={`group relative bg-gradient-to-br ${genre.bgColor} rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-all duration-300`}>
                                  <div className="absolute top-3 left-3 z-10 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                    {genre.icon}
                                    <span className="ml-1">
                                      {genre.tagline}
                                    </span>
                                  </div>

                                  {/* Image with gradient overlay */}
                                  <div className="aspect-[2/3] relative overflow-hidden">
                                    <img
                                      src={character.image}
                                      alt={character.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                  </div>

                                  {/* Favorite Button */}
                                  <button
                                    onClick={(e) => toggleFavorite(e, slug)}
                                    className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-colors ${
                                      favorites.includes(slug)
                                        ? "bg-gold/90 text-zinc-900"
                                        : "bg-black/40 text-white hover:bg-black/60"
                                    }`}>
                                    <Star
                                      className="w-4 h-4"
                                      fill={
                                        favorites.includes(slug)
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </button>

                                  {/* Character info at bottom */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                    <h3 className="text-white text-xl font-bold mb-1">
                                      {character.name}
                                    </h3>
                                    <p className="text-amber-400 text-sm mb-3">
                                      {character.role}
                                    </p>

                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center text-zinc-300 text-sm">
                                        <Heart className="w-4 h-4 mr-1 text-red-400" />
                                        <span>{likes[slug] || 0}</span>
                                      </div>
                                      <div className="flex items-center text-zinc-300 text-sm">
                                        <span>{views[slug] || 0} views</span>
                                      </div>
                                    </div>

                                    <button className="w-full bg-black/50 hover:bg-black/70 text-white py-2 rounded-lg font-medium transition-colors text-sm backdrop-blur-sm">
                                      Chat Now
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                // Show all genres when none is selected
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {genreCategories.map((genre) => (
                    <div
                      key={genre.id}
                      onClick={() => handleGenreSelect(genre.id)}
                      className={`bg-gradient-to-br ${genre.bgColor} p-6 rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300 shadow-lg`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mr-3">
                          {genre.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {genre.name}
                        </h3>
                      </div>
                      <p className="text-white/80 mb-4">{genre.description}</p>
                      <div className="flex -space-x-2 mb-4">
                        {Object.entries(characters)
                          .filter(([slug]) => genre.slugs.includes(slug))
                          .slice(0, 5)
                          .map(([slug, character], index) => (
                            <div
                              key={slug}
                              className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                              style={{ zIndex: 5 - index }}>
                              <img
                                src={character.image}
                                alt={character.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        {genre.slugs.length > 5 && (
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white bg-black/70 flex items-center justify-center text-xs text-white font-bold"
                            style={{ zIndex: 0 }}>
                            +{genre.slugs.length - 5}
                          </div>
                        )}
                      </div>
                      <button className="w-full bg-black/50 hover:bg-black/70 text-white py-2 rounded-lg font-medium transition-colors text-sm backdrop-blur-sm">
                        Explore {genre.name}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Original content - only show when not in Genres view */}
          {!showGenres && !showFavorites && (
            <>
              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gold/20 text-gold rounded-lg text-sm">
                      <span>{tag}</span>
                      <button
                        onClick={() => toggleTag(tag)}
                        className="hover:text-gold/80 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Announcement Banner - removed close button */}
              {bannerVisible && (
                <div className="relative w-full h-96 mb-12 -mx-6 overflow-hidden">
                  {/* Indicator dots */}
                  <div className="absolute bottom-6 right-8 z-30 flex space-x-2">
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAnnouncementIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentAnnouncementIndex
                            ? "bg-white"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Banner content with Netflix-style animation */}
                  {announcements.map((announcement, index) => (
                    <div
                      key={announcement.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentAnnouncementIndex
                          ? "opacity-100 z-20"
                          : "opacity-0 z-10"
                      }`}>
                      {/* Background image with gradient overlay */}
                      <div className="absolute inset-0 w-full h-full">
                        <img
                          src={announcement.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {/* Removed color overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 flex items-center z-20">
                        <div className="container mx-auto px-12">
                          <div className="max-w-lg">
                            <div className="mb-3">
                              <span className="px-2 py-1 bg-gold text-xs font-bold text-zinc-900 rounded">
                                {announcement.tagline}
                              </span>
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                              {announcement.title}
                            </h2>
                            <p className="text-lg text-white/90 mb-8 max-w-md">
                              {announcement.description}
                            </p>
                            <div>
                              <button
                                onClick={() => {
                                  if (announcement.ctaLink === "#upgrade") {
                                    setShowPricingModal(true);
                                  } else {
                                    navigate(announcement.ctaLink);
                                  }
                                }}
                                className="px-8 py-3 bg-gold hover:bg-gold/90 text-zinc-900 rounded font-bold text-lg transition-colors">
                                {announcement.cta}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Popular Tags Horizontal Scroll */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Popular Tags
                </h2>
                <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                  {popularTags.slice(0, 12).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-gold text-zinc-900 font-medium"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}>
                      {tag} ({tagCounts[tag]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Hot Characters Section */}
              <div className="mb-12">
                <div className="flex items-center mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-800/80 mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Hot Characters
                    </h2>
                    <div className="h-1 w-12 mt-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-full"></div>
                    <p className="text-zinc-400 text-sm mt-1">
                      Characters everyone's talking about
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Object.entries(characters)
                    .filter(([slug]) =>
                      [
                        "hinata",
                        "batman",
                        "naruto",
                        "sasuke",
                        "joker",
                        "harry-potter",
                        "wonder-woman",
                        "darth-vader",
                        "iron-man",
                        "goku",
                        "vegeta",
                        "luffy",
                        "zoro",
                        "eren",
                        "mikasa",
                        "kakashi",
                        "itachi",
                        "light-yagami",
                        "l",
                        "tony-stark",
                        "thor",
                        "loki",
                        "thanos",
                        "deadpool",
                        "superman",
                        "spiderman",
                        "captain-america",
                      ].includes(slug)
                    )
                    .slice(0, 8)
                    .map(([slug, character]) => (
                      <div
                        key={slug}
                        onClick={() => navigate(`/chat/${slug}`)}
                        className="group relative bg-gradient-to-br from-red-900/30 to-amber-900/30 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:from-red-900/40 hover:to-amber-900/40 transition-all duration-300">
                        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Zap className="w-3 h-3 mr-1" />
                          HOT
                        </div>

                        {/* Image with gradient overlay */}
                        <div className="aspect-[2/3] relative overflow-hidden">
                          <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(e, slug)}
                          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-colors ${
                            favorites.includes(slug)
                              ? "bg-gold/90 text-zinc-900"
                              : "bg-black/40 text-white hover:bg-black/60"
                          }`}>
                          <Star
                            className="w-4 h-4"
                            fill={
                              favorites.includes(slug) ? "currentColor" : "none"
                            }
                          />
                        </button>

                        {/* Character info at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                          <h3 className="text-white text-xl font-bold mb-1">
                            {character.name}
                          </h3>
                          <p className="text-amber-400 text-sm mb-3">
                            {character.role}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-zinc-300 text-sm">
                              <Heart className="w-4 h-4 mr-1 text-red-400" />
                              <span>{likes[slug] || 0}</span>
                            </div>
                            <div className="flex items-center text-zinc-300 text-sm">
                              <div className="flex -space-x-1 mr-1">
                                <div className="w-4 h-4 rounded-full bg-red-400 border border-red-900"></div>
                                <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-900"></div>
                                <div className="w-4 h-4 rounded-full bg-green-400 border border-green-900"></div>
                              </div>
                              <span>{views[slug] || 0} views</span>
                            </div>
                          </div>

                          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                            Chat Now
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* TrendingCharacters component */}
              <TrendingCharacters
                characters={characters}
                views={views}
                likes={likes}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              {/* Add the new character categories */}
              <CharacterCategory
                title="For You"
                characters={categoryCharacters.forYou || []}
                icon={<ThumbsUp className="w-5 h-5 text-nexus-blue-500" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              <CharacterCategory
                title="Boredom Buster"
                characters={categoryCharacters.boredomBuster || []}
                icon={<Smile className="w-5 h-5 text-nexus-purple-500" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              <CharacterCategory
                title="Action"
                characters={categoryCharacters.action || []}
                icon={<Zap className="w-5 h-5 text-yellow-500" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              <CharacterCategory
                title="Comedy Carnival"
                characters={categoryCharacters.comedy || []}
                icon={<Radio className="w-5 h-5 text-nexus-blue-400" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              <CharacterCategory
                title="Most Loved"
                characters={categoryCharacters.mostLoved || []}
                icon={<Heart className="w-5 h-5 text-red-500" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              <CharacterCategory
                title="Crowd Pleasers"
                characters={categoryCharacters.crowdPleasers || []}
                icon={<Award className="w-5 h-5 text-nexus-purple-400" />}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                handleLike={handleLike}
              />

              {/* Explore All Characters Section */}
              <div className="mt-16 mb-8">
                <div className="flex justify-between items-center mb-6 border-t border-nexus-neutral-800 pt-8">
                  <div>
                    <h2 className="text-2xl font-poppins font-medium text-white">
                      Explore All Characters
                    </h2>
                    <p className="text-nexus-neutral-400 mt-1">
                      Discover more characters beyond our curated selections
                    </p>
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {selectedTags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-nexus-blue-500/20 text-nexus-blue-300 rounded-lg text-sm">
                          <span>{tag}</span>
                          <button
                            onClick={() => toggleTag(tag)}
                            className="hover:text-nexus-blue-200 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => setSelectedTags([])}
                        className="px-3 py-1.5 bg-nexus-neutral-800 text-nexus-neutral-300 rounded-lg text-sm hover:bg-nexus-neutral-700">
                        Clear All
                      </button>
                    </div>
                  )}
                </div>

                {/* Characters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(characters)
                    // Filter out characters already shown in categories
                    .filter(([slug]) => {
                      // Get all category slugs to avoid duplication
                      const categorySlugs = new Set([
                        ...(categoryCharacters.trendingSlugs || []),
                        ...(categoryCharacters.forYou || []).map((c) => c.slug),
                        ...(categoryCharacters.boredomBuster || []).map(
                          (c) => c.slug
                        ),
                        ...(categoryCharacters.action || []).map((c) => c.slug),
                        ...(categoryCharacters.comedy || []).map((c) => c.slug),
                        ...(categoryCharacters.mostLoved || []).map(
                          (c) => c.slug
                        ),
                        ...(categoryCharacters.crowdPleasers || []).map(
                          (c) => c.slug
                        ),
                      ]);

                      // When viewing filtered tags, don't exclude category characters
                      if (selectedTags.length > 0) {
                        return true;
                      }

                      // Otherwise exclude characters already shown in categories
                      return !categorySlugs.has(slug);
                    })
                    .filter(([slug, character]) => {
                      // If no tags selected, show all characters
                      if (selectedTags.length === 0) {
                        return true;
                      }

                      // Check if character matches any of the selected tags
                      return selectedTags.some((tag) => {
                        const lowerTag = tag.toLowerCase();
                        return (
                          // Check tags array first
                          (character.tags &&
                            character.tags.some((t: string) =>
                              t.toLowerCase().includes(lowerTag)
                            )) ||
                          // Check role
                          character.role.toLowerCase().includes(lowerTag) ||
                          // Check traits if they exist
                          (character.personality?.traits &&
                            character.personality.traits.some((trait: string) =>
                              trait.toLowerCase().includes(lowerTag)
                            )) ||
                          // Check interests if they exist
                          (character.personality?.interests &&
                            character.personality.interests.some(
                              (interest: string) =>
                                interest.toLowerCase().includes(lowerTag)
                            )) ||
                          // Gender tags
                          (lowerTag === "male" &&
                            !character.role.toLowerCase().includes("female")) ||
                          (lowerTag === "female" &&
                            character.role.toLowerCase().includes("female")) ||
                          // Media type tags
                          (lowerTag === "anime" && slug.includes("anime")) ||
                          // Generic matches in name or description
                          character.name.toLowerCase().includes(lowerTag) ||
                          character.description.toLowerCase().includes(lowerTag)
                        );
                      });
                    })
                    .map(([slug, character]) => (
                      <div
                        key={slug}
                        onClick={() => navigate(`/chat/${slug}`)}
                        className="bg-nexus-neutral-800/50 rounded-xl overflow-hidden group cursor-pointer hover:bg-nexus-neutral-700/50 transition-colors shadow-soft flex flex-col">
                        <div className="relative h-80">
                          <button
                            onClick={(e) => toggleFavorite(e, slug)}
                            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-sm transition-all ${
                              favorites.includes(slug)
                                ? "bg-gold/90 text-zinc-900"
                                : "bg-black/50 text-white hover:bg-black/70"
                            }`}>
                            <Star
                              className="w-4 h-4"
                              fill={
                                favorites.includes(slug)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>

                          <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />

                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-lg font-bold text-white">
                              {character.name}
                            </h3>
                            <p className="text-gold text-xs">
                              {character.role}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 flex flex-col flex-grow">
                          <p className="text-zinc-400 text-sm mb-2 line-clamp-2">
                            {character.description}
                          </p>

                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={(e) => handleLike(e, slug)}
                              className="flex items-center space-x-1 text-zinc-400 hover:text-gold transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">
                                {likes[slug]?.toLocaleString() || 0}
                              </span>
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="text-zinc-400 hover:text-gold transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-auto pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/chat/${slug}`);
                              }}
                              className="flex items-center justify-center space-x-2 px-3 py-2 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-all w-full duration-200 text-sm">
                              <MessageSquare className="w-4 h-4" />
                              <span>Chat Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* FAVORITES VIEW */}
          {showFavorites && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  My Starred Characters
                </h2>
                <p className="text-zinc-400">
                  All your favorite characters in one place
                </p>
              </div>

              {favorites.length === 0 ? (
                <div className="bg-zinc-800/50 rounded-xl p-8 text-center">
                  <Star className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    No Favorites Yet
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Click the star icon on any character to add them to your
                    favorites
                  </p>
                  <button
                    onClick={() => setShowFavorites(false)}
                    className="px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-all font-medium">
                    Browse Characters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(characters)
                    .filter(([slug]) => favorites.includes(slug))
                    .map(([slug, character]) => (
                      <div
                        key={slug}
                        onClick={() => navigate(`/chat/${slug}`)}
                        className="bg-zinc-800/50 rounded-xl overflow-hidden group cursor-pointer hover:bg-zinc-700/50 transition-colors shadow-lg">
                        <div className="relative aspect-square">
                          {/* Favorite Button */}
                          <button
                            onClick={(e) => toggleFavorite(e, slug)}
                            className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 bg-gold/90 text-zinc-900">
                            <Star className="w-5 h-5" fill="currentColor" />
                          </button>

                          <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />

                          {/* Stats */}
                          <div className="absolute top-3 left-3 flex items-center space-x-2 text-white text-sm">
                            <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                              {views[slug]?.toLocaleString() || 0} views
                            </div>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white mb-1">
                              {character.name}
                            </h3>
                            <p className="text-gold text-sm">
                              {character.role}
                            </p>

                            {/* Tags */}
                            {character.tags && character.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {character.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-zinc-700/80 text-xs text-zinc-300 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                                {character.tags.length > 3 && (
                                  <span className="px-2 py-0.5 bg-zinc-700/80 text-xs text-zinc-300 rounded-full">
                                    +{character.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-zinc-400 text-sm mb-4">
                            {character.description}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <button
                              onClick={(e) => handleLike(e, slug)}
                              className="flex items-center space-x-1 text-zinc-400 hover:text-gold transition-colors">
                              <Heart className="w-5 h-5" />
                              <span>{likes[slug]?.toLocaleString() || 0}</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Share functionality would go here
                              }}
                              className="text-zinc-400 hover:text-gold transition-colors">
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/chat/${slug}`);
                              }}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-all duration-200 font-medium group">
                              <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                              <span>Chat Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <FeatureNavigation />

      {/* Support Bot Icon */}
      <div className="fixed right-6 bottom-24 z-50">
        <button
          className="group relative"
          onClick={() => {
            // Support bot functionality will go here
            alert("Support bot coming soon!");
          }}>
          <SupportBotIcon size="lg" />

          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Need help? Click to chat!
          </div>
        </button>
      </div>

      {/* Create Character Modal */}
      <CreateCharacterModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCharacter}
      />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />

      {/* Full Leaderboard Modal */}
      <CharacterLeaderboard
        characters={characters}
        views={views}
        isOpen={showFullLeaderboard}
        onClose={() => setShowFullLeaderboard(false)}
      />

      {/* Character Created Notification */}
      {newCharacter && (
        <CharacterCreatedNotification
          characterName={newCharacter}
          onClose={() => setNewCharacter(null)}
        />
      )}
    </div>
  );
}

export default AiChat;
