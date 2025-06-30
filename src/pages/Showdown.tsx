import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Plus,
  UserPlus,
  X,
  Users,
  MessageSquare,
  Trash2,
  Search,
  Check,
  Sparkles,
  RefreshCw,
  Image,
  Smile,
} from "lucide-react";
import { useCharacterContext } from "../contexts/CharacterContext"; // ✅ Import global context
import { FeatureNavigation } from "../components/FeatureNavigation";
// import { SupportBotIcon } from "../components/SupportBotIcon";
import { ProfileButton } from "../components/ProfileButton";
import { MainNavbar } from "../components/MainNavbar";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";

interface Message {
  id: string;
  text: string;
  sender: string; // 'user' or character slug
  timestamp: Date;
}

interface ShowdownParticipant {
  id: string;
  name: string;
  image: string;
  role: string;
  isActive: boolean;
  color?: string; // Added color property for character-specific styling
}

// Color palette for participants
const characterColors = [
  "#FF5D8F", // Pink
  "#4F9EFA", // Blue
  "#FFB156", // Orange
  "#9C6ADE", // Purple
  "#45D0A5", // Teal
  "#FF8A5B", // Coral
  "#5BD2FF", // Sky
  "#FFDE59", // Yellow
  "#54CA8F", // Green
  "#F85977", // Red
];

// Custom CSS for animations
const customStyles = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideDown {
    0% { transform: translateY(-20px) translateX(-50%); opacity: 0; }
    100% { transform: translateY(0) translateX(-50%); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes typing {
    0% { width: 0; }
    30% { width: 0; }
    100% { width: 100%; }
  }
  
  .animate-shimmer {
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 40%);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-slideDown {
    animation: slideDown 0.4s ease-out forwards;
  }
  
  .animate-pulse-slow {
    animation: pulse 2s infinite ease-in-out;
  }
  
  .animate-typing-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
    background: #888;
    animation: pulse 1s infinite ease-in-out;
  }
  
  .message-appear {
    animation: fadeIn 0.3s ease-out;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .card-hover-effect {
    transition: all 0.3s ease;
  }
  
  .card-hover-effect:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .glow {
    box-shadow: 0 0 15px var(--glow-color);
  }
  
  .mask-radial-gradient {
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
  }
`;

function Showdown() {
  const navigate = useNavigate();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [participants, setParticipants] = useState<ShowdownParticipant[]>([]);
  const [chatName, setChatName] = useState("AI Showdown");
  const [isEditingName, setIsEditingName] = useState(false);
  const [characterSearch, setCharacterSearch] = useState("");
  const [recentlyAddedCharacter, setRecentlyAddedCharacter] = useState<
    string | null
  >(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [animateIntro, setAnimateIntro] = useState(true);
  const { characters, loading: loadingCharacters } = useCharacterContext();

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Display notification when a new character is added
  useEffect(() => {
    if (recentlyAddedCharacter) {
      const timeoutId = setTimeout(() => {
        setRecentlyAddedCharacter(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [recentlyAddedCharacter]);

  // Remove intro animation after a delay
  useEffect(() => {
    if (animateIntro) {
      const timeoutId = setTimeout(() => {
        setAnimateIntro(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [animateIntro]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI responses with slight delays
    const activeParticipants = participants.filter((p) => p.isActive);
    let delay = 500;

    if (activeParticipants.length === 0) {
      setIsLoading(false);
      return;
    }

    activeParticipants.forEach((participant) => {
      setTimeout(() => {
        // Generate a response based on character personality
        const char = characters[participant.id];
        let responseText = "";

        if (char) {
          // Match the character's personality to the response
          const keywords = [
            char.name,
            ...(char.tags || []),
            ...(char.personality?.traits || []),
          ];

          const personality = char.personality || {};

          // Generate a contextual response
          if (
            input.toLowerCase().includes("hello") ||
            input.toLowerCase().includes("hi")
          ) {
            responseText = `Hello there! ${
              char.languages?.greeting || "Nice to meet you in this showdown!"
            }`;
          } else if (input.toLowerCase().includes("how are you")) {
            responseText = `I'm doing well, thanks for asking! As ${
              char.name
            }, ${
              personality.interests
                ? "I've been thinking about " + personality.interests[0]
                : "I'm always here to help."
            } How about you?`;
          } else if (input.toLowerCase().includes("?")) {
            responseText = `That's an interesting question! From my perspective as ${
              char.name
            }, I'd say ${
              personality.speakingStyle === "Technical"
                ? "it depends on several factors."
                : "there are many ways to look at it."
            }`;
          } else {
            // Generic response using character traits
            responseText = `I hear what you're saying. As ${char.name}, ${
              personality.traits
                ? "I tend to be " +
                  personality.traits[0].toLowerCase() +
                  ", so "
                : ""
            }I think that's ${
              Math.random() > 0.5
                ? "a fascinating point"
                : "an interesting perspective"
            }.`;
          }
        } else {
          responseText = `I understand what you mean. Let's explore that idea further.`;
        }

        const aiMessage: Message = {
          id: `${participant.id}-${Date.now()}`,
          text: responseText,
          sender: participant.id,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Set loading to false after the last AI responds
        if (
          participant.id ===
          activeParticipants[activeParticipants.length - 1].id
        ) {
          setIsLoading(false);
        }
      }, delay);

      // Stagger the responses
      delay += 1000 + Math.random() * 1000;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleCharacterSelector = () => {
    setShowCharacterSelector(!showCharacterSelector);
    if (!showCharacterSelector) {
      setCharacterSearch("");
    }
  };

  const addCharacterToChat = (slug: string) => {
    // Check if character is already in the chat
    if (participants.some((p) => p.id === slug)) {
      alert("This character is already in the showdown!");
      return;
    }

    // Check if we've reached the maximum (10)
    if (participants.length >= 10) {
      alert("You can have a maximum of 10 characters in a showdown.");
      return;
    }

    const char = characters[slug];
    const newParticipant: ShowdownParticipant = {
      id: slug,
      name: char.name,
      image: char.image,
      role: char.role,
      isActive: true,
      color: characterColors[participants.length % characterColors.length],
    };

    setParticipants((prev) => [...prev, newParticipant]);

    // Add a welcome message from the new character
    const welcomeMessage: Message = {
      id: `welcome-${slug}-${Date.now()}`,
      text: `Hi everyone! I'm ${char.name}. Ready to join this showdown!`,
      sender: slug,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, welcomeMessage]);
    setRecentlyAddedCharacter(char.name);
  };

  const removeCharacterFromChat = (id: string) => {
    // Add a goodbye message
    const char = participants.find((p) => p.id === id);
    if (char) {
      const goodbyeMessage: Message = {
        id: `goodbye-${id}-${Date.now()}`,
        text: `I need to go now. It was nice chatting with everyone!`,
        sender: id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, goodbyeMessage]);
    }

    // Remove from participants
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleCharacterActive = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );

    // Add a message about the status change
    const char = participants.find((p) => p.id === id);
    if (char) {
      const isCurrentlyActive = char.isActive;
      const statusMessage: Message = {
        id: `status-${id}-${Date.now()}`,
        text: isCurrentlyActive
          ? `I'll be quiet for a while and just listen.`
          : `I'm back! What did I miss?`,
        sender: id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, statusMessage]);
    }
  };

  // Get sender image
  const getSenderImage = (senderId: string) => {
    if (senderId === "user") {
      return "/images/avatar-placeholder.png"; // Replace with actual user avatar
    }

    const participant = participants.find((p) => p.id === senderId);
    return participant?.image || "/images/avatar-placeholder.png";
  };

  // Get sender name
  const getSenderName = (senderId: string) => {
    if (senderId === "user") {
      return "You";
    }

    const participant = participants.find((p) => p.id === senderId);
    return participant?.name || "Unknown";
  };

  // Get sender color
  const getSenderColor = (senderId: string) => {
    if (senderId === "user") {
      return "#FFD700"; // Gold color for user
    }

    const participant = participants.find((p) => p.id === senderId);
    return participant?.color || "#4F9EFA"; // Default blue if not found
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
    <>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>

      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col">
        <MainNavbar />
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-lg py-3 px-6 flex items-center justify-between z-10 shadow-lg">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/ai")}
              className="text-white hover:text-gold transition-colors bg-zinc-800 p-2 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center">
              <h1 className="text-xl font-bold flex items-center">
                <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-gold">AI Showdown</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors">
              <Users className="w-5 h-5" />
            </button>

            <button
              onClick={toggleCharacterSelector}
              className="flex items-center space-x-2 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-glow-amber">
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Add Character</span>
            </button>

            <ProfileButton />
          </div>
        </header>

        {/* Main Chat Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${
              participants.length === 0
                ? "flex items-center justify-center"
                : ""
            }`}
            style={{
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/cubes.png")',
              backgroundPosition: "center",
              backgroundSize: "auto",
            }}>
            {participants.length === 0 ? (
              <div
                className={`max-w-md text-center p-8 bg-zinc-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-700 ${
                  animateIntro ? "animate-fadeIn" : ""
                }`}>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-pulse-slow"></div>
                  <Sparkles
                    className="w-16 h-16 text-amber-500 relative z-10 animate-pulse-slow"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Start Your AI Showdown
                </h2>
                <p className="text-zinc-300 mb-8">
                  Create the ultimate conversation by bringing together up to 10
                  different AI characters. Watch them interact with you and each
                  other!
                </p>
                <button
                  onClick={toggleCharacterSelector}
                  className="px-5 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-zinc-900 rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center space-x-2 mx-auto font-semibold relative group overflow-hidden">
                  <div className="relative z-10 flex items-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Add AI Characters</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/30 to-amber-600/0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity"></div>
                </button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6 pt-4 pb-6">
                {/* Messages */}
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } relative message-appear`}>
                    {/* Time separator if needed */}
                    {index > 0 &&
                      new Date(message.timestamp).getTime() -
                        new Date(messages[index - 1].timestamp).getTime() >
                        300000 && (
                        <div className="w-full text-center my-4">
                          <span className="px-3 py-1 bg-zinc-800/80 rounded-full text-xs text-zinc-400">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      )}

                    <div
                      className={`max-w-[80%] flex ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      } items-start gap-3`}>
                      <div className="relative">
                        <div
                          className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 shadow-md"
                          style={{
                            borderColor: getSenderColor(message.sender),
                          }}>
                          <img
                            src={getSenderImage(message.sender)}
                            alt={getSenderName(message.sender)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {message.sender !== "user" && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                            <Sparkles
                              className="w-3 h-3"
                              style={{ color: getSenderColor(message.sender) }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        {message.sender !== "user" && (
                          <div className="font-medium mb-1 flex items-center space-x-1">
                            <span
                              className="text-white"
                              style={{
                                background: `linear-gradient(to right, white, ${getSenderColor(
                                  message.sender
                                )})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}>
                              {getSenderName(message.sender)}
                            </span>
                            <span className="text-xs text-zinc-500">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}

                        <div
                          className={`${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-zinc-900 rounded-tr-none shadow-amber-900/20"
                              : "bg-zinc-800/90 backdrop-blur-sm text-white rounded-tl-none border border-zinc-700 shadow-zinc-900/50"
                          } rounded-2xl px-4 py-3 shadow-lg`}
                          style={
                            message.sender !== "user"
                              ? {
                                  borderColor: `${getSenderColor(
                                    message.sender
                                  )}50`,
                                  boxShadow: `0 4px 15px ${getSenderColor(
                                    message.sender
                                  )}10`,
                                }
                              : {}
                          }>
                          <p className="whitespace-pre-wrap">{message.text}</p>

                          {message.sender === "user" && (
                            <div className="text-right">
                              <span className="text-xs text-zinc-800">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start message-appear">
                    <div className="max-w-[80%] flex flex-row items-start gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-zinc-500 animate-spin" />
                      </div>

                      <div className="bg-zinc-800/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-zinc-700 rounded-tl-none">
                        <div className="flex space-x-2">
                          <div
                            className="animate-typing-dot"
                            style={{ animationDelay: "0ms" }}></div>
                          <div
                            className="animate-typing-dot"
                            style={{ animationDelay: "500ms" }}></div>
                          <div
                            className="animate-typing-dot"
                            style={{ animationDelay: "1000ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty div for scroll reference */}
                <div ref={messageEndRef} />
              </div>
            )}
          </div>

          {/* Recently added notification */}
          {recentlyAddedCharacter && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-zinc-900 to-zinc-800 border-l-4 border-amber-500 rounded-lg px-4 py-3 text-white shadow-2xl z-50 flex items-center space-x-2 animate-slideDown">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>
                <span className="text-amber-500 font-bold">
                  {recentlyAddedCharacter}
                </span>{" "}
                has joined the showdown!
              </span>
            </div>
          )}

          {/* Participants Sidebar */}
          <div
            className={`transition-all duration-300 border-l border-zinc-800 bg-zinc-900/80 backdrop-blur-md overflow-y-auto flex flex-col ${
              sidebarExpanded ? "w-72" : "w-20"
            }`}>
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <h3
                className={`font-bold text-white flex items-center ${
                  sidebarExpanded ? "text-lg" : "sr-only"
                }`}>
                <Users className="w-5 h-5 mr-2" />
                <span>Characters</span>
              </h3>
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                {sidebarExpanded ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto custom-scrollbar ${
                sidebarExpanded ? "p-4" : "p-2"
              } space-y-3`}>
              {participants.length === 0 ? (
                <div
                  className={`text-center text-zinc-400 text-sm ${
                    !sidebarExpanded && "sr-only"
                  }`}>
                  No characters added yet
                </div>
              ) : (
                <>
                  <div
                    className={`bg-zinc-800/90 rounded-xl overflow-hidden shadow-inner ${
                      sidebarExpanded ? "p-3" : "p-2"
                    } border border-zinc-700 transition-all card-hover-effect`}>
                    <div
                      className={`flex items-center ${
                        sidebarExpanded ? "space-x-3" : "justify-center"
                      }`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg relative overflow-hidden">
                        <span className="text-zinc-900 font-bold relative z-10">
                          U
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/30 to-amber-600/0 animate-shimmer"></div>
                      </div>
                      {sidebarExpanded && (
                        <div>
                          <div className="font-medium text-white">You</div>
                          <div className="text-xs text-zinc-500">
                            Human User
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className={`${
                        participant.isActive
                          ? "bg-zinc-800/90"
                          : "bg-zinc-900/70"
                      } rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg group relative ${
                        sidebarExpanded ? "p-3" : "p-2"
                      } border border-zinc-700 card-hover-effect`}
                      style={
                        participant.isActive
                          ? {
                              borderColor: `${participant.color}50`,
                              boxShadow: `0 4px 15px ${participant.color}10`,
                            }
                          : {}
                      }>
                      <div
                        className={`flex items-center ${
                          sidebarExpanded ? "space-x-3" : "justify-center"
                        }`}>
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 shadow-lg ${
                              !participant.isActive && "grayscale opacity-70"
                            }`}
                            style={{
                              borderColor: participant.color || "#4F9EFA",
                            }}>
                            <img
                              src={participant.image}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: participant.color || "#4F9EFA",
                              opacity: participant.isActive ? 1 : 0.5,
                            }}>
                            <Sparkles className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        {sidebarExpanded && (
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-medium truncate"
                              style={{
                                background: `linear-gradient(to right, white, ${participant.color})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}>
                              {participant.name}
                            </div>
                            <div className="text-xs text-zinc-500 truncate">
                              {participant.role}
                            </div>
                          </div>
                        )}
                      </div>

                      {sidebarExpanded && (
                        <div className="absolute top-3 right-3 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              toggleCharacterActive(participant.id)
                            }
                            className={`p-1.5 rounded-full transition-colors ${
                              participant.isActive
                                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                                : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white"
                            }`}>
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              removeCharacterFromChat(participant.id)
                            }
                            className="p-1.5 rounded-full bg-zinc-800 text-zinc-500 hover:bg-red-900/50 hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {!sidebarExpanded && participants.length > 0 && (
              <div className="p-2 border-t border-zinc-800 flex justify-center">
                <button
                  onClick={toggleCharacterSelector}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-amber-600 hover:text-zinc-900 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full rounded-2xl bg-zinc-800/90 border border-zinc-700 overflow-hidden shadow-xl transition-all hover:border-zinc-600">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  } else if (e.key === "a" && e.altKey) {
                    e.preventDefault();
                    // Trigger auto reply
                    const lastMessages = messages
                      .slice(-3)
                      .map((m) => m.text)
                      .join(" ");
                    const autoReply = `Based on the context "${lastMessages}", I think we should explore this topic further. What are your thoughts?`;
                    setInput(autoReply);
                  }
                }}
                placeholder={
                  participants.length === 0
                    ? "Add characters to start chatting..."
                    : "Type a message... (Alt + A for auto-reply)"
                }
                className="w-full bg-transparent px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none resize-none min-h-[50px] max-h-[150px] transition-all duration-200 pr-36"
                rows={1}
                disabled={participants.length === 0}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const lastMessages = messages
                      .slice(-3)
                      .map((m) => m.text)
                      .join(" ");
                    const autoReply = `Based on the context "${lastMessages}", I think we should explore this topic further. What are your thoughts?`;
                    setInput(autoReply);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors flex items-center space-x-1"
                  title="Auto-reply (Alt + A)">
                  <span className="text-xs font-medium bg-zinc-700/50 px-2 py-1 rounded">
                    Auto (A)
                  </span>
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={
                    !input.trim() || isLoading || participants.length === 0
                  }
                  className={`p-2 rounded-full transition-all duration-200 ${
                    !input.trim() || isLoading || participants.length === 0
                      ? "text-zinc-500 bg-zinc-700/50 cursor-not-allowed"
                      : "text-white bg-nexus-blue-500 hover:bg-nexus-blue-600 hover:shadow-lg hover:shadow-nexus-blue-500/20"
                  }`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Character Selector Modal */}
        {showCharacterSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={toggleCharacterSelector}></div>

            <div className="relative w-full max-w-5xl max-h-[85vh] bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl animate-fadeIn flex flex-col">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-2 rounded-lg shadow-lg relative overflow-hidden group">
                    <Sparkles className="w-6 h-6 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/30 to-amber-600/0 animate-shimmer"></div>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Select AI Characters
                  </h2>
                </div>
                <button
                  onClick={toggleCharacterSelector}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 border-b border-zinc-800">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, role, or personality..."
                    value={characterSearch}
                    onChange={(e) => setCharacterSearch(e.target.value)}
                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg px-10 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  {characterSearch && (
                    <button
                      onClick={() => setCharacterSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-zinc-700/50 text-zinc-500 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {Object.keys(characters).length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 text-zinc-600 animate-spin mx-auto mb-4" />
                      <p className="text-zinc-400">Loading characters...</p>
                    </div>
                  </div>
                ) : Object.keys(characters).filter((id) => {
                    const char = characters[id];
                    const searchLower = characterSearch.toLowerCase();
                    return (
                      !characterSearch ||
                      char.name.toLowerCase().includes(searchLower) ||
                      char.role.toLowerCase().includes(searchLower) ||
                      (char.personality?.traits || []).some((trait) =>
                        trait.toLowerCase().includes(searchLower)
                      )
                    );
                  }).length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                      <p className="text-zinc-400">
                        No characters found matching your search
                      </p>
                      <button
                        onClick={() => setCharacterSearch("")}
                        className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                        Clear search
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(characters)
                      .filter((id) => {
                        const char = characters[id];
                        const searchLower = characterSearch.toLowerCase();
                        return (
                          !characterSearch ||
                          char.name.toLowerCase().includes(searchLower) ||
                          char.role.toLowerCase().includes(searchLower) ||
                          (char.personality?.traits || []).some((trait) =>
                            trait.toLowerCase().includes(searchLower)
                          )
                        );
                      })
                      .map((id) => {
                        const char = characters[id];
                        const isSelected = participants.some(
                          (p) => p.id === id
                        );
                        const participantCount = participants.length;
                        const hasReachedLimit = participantCount >= 10;

                        return (
                          <div
                            key={id}
                            className={`
                              relative overflow-hidden rounded-xl border transition-all card-hover-effect
                              ${
                                isSelected
                                  ? "border-amber-500 shadow-lg glow"
                                  : "border-zinc-700 hover:border-zinc-500"
                              }
                              ${
                                hasReachedLimit && !isSelected
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }
                            `}
                            style={
                              isSelected
                                ? ({
                                    "--glow-color": "rgba(245, 158, 11, 0.15)",
                                  } as React.CSSProperties)
                                : {}
                            }
                            onClick={() =>
                              !hasReachedLimit || isSelected
                                ? addCharacterToChat(id)
                                : null
                            }>
                            <div className="flex p-4 bg-zinc-800/90 relative">
                              <div className="mr-4">
                                <div
                                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shadow-lg ${
                                    isSelected
                                      ? "border-amber-500"
                                      : "border-zinc-600"
                                  }`}>
                                  <img
                                    src={char.image}
                                    alt={char.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3
                                      className={`font-bold text-lg ${
                                        isSelected
                                          ? "text-amber-500"
                                          : "text-white"
                                      }`}>
                                      {char.name}
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                      {char.role}
                                    </p>
                                  </div>

                                  {isSelected && (
                                    <div className="bg-amber-500 rounded-full p-1">
                                      <Check className="w-4 h-4 text-zinc-900" />
                                    </div>
                                  )}
                                </div>

                                <div className="mt-2 flex flex-wrap gap-1">
                                  {(char.tags || [])
                                    .slice(0, 3)
                                    .map((tag, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-0.5 bg-zinc-700/80 rounded-full text-xs text-zinc-300">
                                        {tag}
                                      </span>
                                    ))}
                                  {(char.tags || []).length > 3 && (
                                    <span className="px-2 py-0.5 bg-zinc-700/80 rounded-full text-xs text-zinc-300">
                                      +{(char.tags || []).length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="p-3 text-sm border-t border-zinc-700 bg-zinc-900/70 text-zinc-400 flex justify-between items-center">
                              <span className="flex items-center">
                                <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
                                {(char.personality?.traits || [])
                                  .slice(0, 1)
                                  .join(", ")}
                              </span>
                              <button
                                className={`
                                  px-2 py-1 rounded-md text-xs font-medium transition-colors
                                  ${
                                    isSelected
                                      ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
                                      : `${
                                          !hasReachedLimit
                                            ? "bg-zinc-700 text-zinc-300 hover:bg-amber-500 hover:text-zinc-900"
                                            : "bg-zinc-800 text-zinc-500"
                                        }`
                                  }
                                `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!hasReachedLimit || isSelected) {
                                    addCharacterToChat(id);
                                  }
                                }}>
                                {isSelected
                                  ? "Selected"
                                  : hasReachedLimit
                                  ? "Limit Reached"
                                  : "Add"}
                              </button>
                            </div>

                            {/* Highlight overlay for selected characters */}
                            {isSelected && (
                              <div className="absolute inset-0 bg-amber-500/5 pointer-events-none mask-radial-gradient" />
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/80">
                <div className="text-zinc-400">
                  {participants.length > 0 ? (
                    <span>
                      Selected:{" "}
                      <span className="text-amber-500 font-bold">
                        {participants.length}/10
                      </span>{" "}
                      characters
                    </span>
                  ) : (
                    <span>No characters selected</span>
                  )}
                </div>
                <button
                  onClick={toggleCharacterSelector}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-zinc-900 rounded-lg hover:opacity-90 transition-all shadow-lg font-medium text-sm relative group overflow-hidden">
                  <div className="relative z-10 flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>Done</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/30 to-amber-600/0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>
        )}

        <FeatureNavigation />
      </div>
    </>
  );
}

export default Showdown;
