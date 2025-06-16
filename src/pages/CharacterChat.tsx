import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Send,
  Image,
  Smile,
  Paperclip,
  Info,
  MoreVertical,
  History,
  Palette,
  Plus,
  Moon,
  Sun,
  Trash,
  X,
  ChevronRight,
  Bot as BotIcon,
  Mic,
  MicOff,
} from "lucide-react";
import { characters } from "../utils/characters";
import { themes } from "../utils/themes";
import { incrementView } from "../utils/viewsManager";

// Define SpeechRecognition types
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult[];
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

// Extend the Window interface
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor | undefined;
    webkitSpeechRecognition: SpeechRecognitionConstructor | undefined;
  }
}

function CharacterChat() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showThemes, setShowThemes] = useState(false);
  const [activeTheme, setActiveTheme] = useState("demon-slayer");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [autoModeTimer, setAutoModeTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Add this useRef at the top of your component with other refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add this useEffect to handle auto-scrolling
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };

    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages, isLoading]); // Trigger on messages or loading state change
  // Track if this is the first message in the conversation
  const isFirstInteraction = useRef(true);

  // Initialize speech recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();

        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;

          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setMessage(transcript);
            // Use a direct function call instead of creating a synthetic event
            submitMessage(transcript);
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current.onerror = (
            event: SpeechRecognitionErrorEvent
          ) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
          };
        }
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Helper function to submit a message without needing an event
  const submitMessage = (text: string) => {
    if (!text.trim() || isLoading) return;

    // If this is the first message in the conversation, increment the view count again
    if (isFirstInteraction.current && characterId) {
      incrementView(characterId);
      isFirstInteraction.current = false;
    }

    setMessage("");
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsLoading(true);

    // Call the backend API using axios
    axios.post('http://localhost:8000/api/v1/chat/ai/gemini', {
      question: text,
      modelName: characterId
    })
      .then((response) => {
        // Extract the answer field from the response data
        const aiResponse = response.data.answer || response.data;
        setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      })
      .catch((error) => {
        console.error("Failed to get AI response:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "I apologize, but I'm having trouble responding right now. Please try again.",
            sender: "ai",
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(message);
  };

  const conversationContext = React.useRef({
    topics: new Set<string>(),
    sentiment: "neutral",
    questionCount: 0,
    lastResponseType: "",
  });

  // Common emojis for quick access
  const commonEmojis = [
    "😊",
    "😂",
    "🤔",
    "👍",
    "❤️",
    "🎉",
    "😎",
    "🤗",
    "😄",
    "🙌",
    "✨",
    "🔥",
    "👋",
    "🌟",
    "💪",
    "🙏",
    "👏",
    "💯",
    "🤩",
    "😃",
    "💖",
    "✅",
    "👌",
    "🎈",
  ];

  // Get character data
  const character = characterId ? characters[characterId] : null;

  // Increment view count when component mounts (user visits the page)
  useEffect(() => {
    if (characterId) {
      // Count the initial visit as a view
      incrementView(characterId);
    }
  }, [characterId]);

  // Redirect if character not found
  useEffect(() => {
    if (!character && characterId) {
      navigate("/ai");
    }
  }, [character, characterId, navigate]);

  // Auto mode effect
  useEffect(() => {
    if (isAutoMode && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "ai") {
        // Analyze the last AI response
        const response = lastMessage.text.toLowerCase();

        // Update conversation context
        const context = conversationContext.current;

        // Extract potential topics (simple keyword extraction)
        const words = response.split(" ");
        words.forEach((word) => {
          if (
            word.length > 4 &&
            !["about", "would", "could", "should", "their"].includes(word)
          ) {
            context.topics.add(word);
          }
        });

        // Determine response type
        if (response.includes("?")) {
          context.lastResponseType = "question";
          context.questionCount++;
        } else if (response.includes("!")) {
          context.lastResponseType = "exclamation";
        } else {
          context.lastResponseType = "statement";
        }

        // Analyze sentiment (simple)
        const positiveWords = [
          "happy",
          "great",
          "good",
          "wonderful",
          "excellent",
          "amazing",
        ];
        const negativeWords = [
          "sad",
          "bad",
          "terrible",
          "unfortunate",
          "sorry",
          "worried",
        ];

        if (positiveWords.some((word) => response.includes(word))) {
          context.sentiment = "positive";
        } else if (negativeWords.some((word) => response.includes(word))) {
          context.sentiment = "negative";
        }

        // No need to set state since we're using a ref

        // Generate contextual auto-message
        const generateAutoMessage = () => {
          const topics = Array.from(context.topics);
          const randomTopic = topics[Math.floor(Math.random() * topics.length)];

          const templates = {
            question: [
              "That's fascinating! Can you elaborate more on that?",
              "I'm curious to hear more about your perspective on this.",
              "What makes you think that way?",
            ],
            statement: [
              `Tell me more about ${randomTopic || "that"}?`,
              "How did you come to that conclusion?",
              "What else can you share about this?",
            ],
            exclamation: [
              "Your enthusiasm is contagious! Please continue.",
              "That's really interesting! What happened next?",
              "I'd love to hear more about this!",
            ],
          };

          const responsePool =
            templates[context.lastResponseType as keyof typeof templates] ||
            templates.statement;
          return responsePool[Math.floor(Math.random() * responsePool.length)];
        };

        const timer = setTimeout(async () => {
          const autoMessage = generateAutoMessage();
          setMessage("");
          setMessages((prev) => [
            ...prev,
            { text: autoMessage, sender: "user" },
          ]);
          setIsLoading(true);

          try {
            const response = await axios.post('http://localhost:3000/api/v1/chat/ai/gemini', {
              question: autoMessage,
              modelName: characterId
            });
            // Extract the answer field from the response data
            const aiResponse = response.data.answer || response.data;
            setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
          } catch (error) {
            console.error("Failed to get AI response:", error);
            setMessages((prev) => [
              ...prev,
              {
                text: "I apologize, but I'm having trouble responding right now. Please try again.",
                sender: "ai",
              },
            ]);
          } finally {
            setIsLoading(false);
          }
        }, 3000);
        setAutoModeTimer(timer);
      }
    }
    return () => {
      if (autoModeTimer) {
        clearTimeout(autoModeTimer);
      }
    };
  }, [messages, isAutoMode, characterId]);

  // Dynamic chat suggestions based on conversation context
  const generateChatSuggestions = () => {
    // Default suggestions for start of conversation
    if (messages.length === 0) {
      return (
        character?.tags?.slice(0, 3).map((tag) => `Tell me about ${tag}`) || [
          "Tell me about yourself",
          "What's your favorite thing to do?",
          "How are you today?",
        ]
      );
    }

    // Get last AI message to generate contextual suggestions
    const lastAiMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === "ai");
    if (!lastAiMessage) return [];

    const messageText = lastAiMessage.text.toLowerCase();
    const context = conversationContext.current;
    const suggestions: string[] = [];

    // Extract potential keywords (simplified for demonstration)
    const keywords = messageText
      .split(/\s+/)
      .filter((word) => word.length > 4)
      .filter(
        (word) =>
          ![
            "about",
            "would",
            "could",
            "should",
            "their",
            "there",
            "these",
            "those",
          ].includes(word)
      );

    // Get 2-3 unique keywords from the last message
    const uniqueKeywords = [...new Set(keywords)].slice(0, 3);

    // Generate question-based suggestions
    if (messageText.includes("?")) {
      suggestions.push("Yes, absolutely!");
      suggestions.push("I'm not sure about that");
      suggestions.push("Can you explain more?");
    }

    // Generate topic-based suggestions
    uniqueKeywords.forEach((keyword) => {
      suggestions.push(`Tell me more about ${keyword}`);
    });

    // Add character-specific suggestions
    if (
      character?.personality?.interests &&
      character.personality.interests.length > 0
    ) {
      const randomInterest =
        character.personality.interests[
          Math.floor(Math.random() * character.personality.interests.length)
        ];
      suggestions.push(`What do you think about ${randomInterest}?`);
    }

    // Add emotion-based suggestions
    if (
      messageText.includes("happy") ||
      messageText.includes("glad") ||
      messageText.includes("great")
    ) {
      suggestions.push("I'm happy to hear that!");
    } else if (
      messageText.includes("sad") ||
      messageText.includes("sorry") ||
      messageText.includes("unfortunate")
    ) {
      suggestions.push("I'm sorry to hear that");
    }

    // Filter out duplicates and limit to 4 suggestions
    return [...new Set(suggestions)].slice(0, 4);
  };

  // Generate suggestions when messages change
  const [chatSuggestions, setChatSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setChatSuggestions(generateChatSuggestions());
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    submitMessage(suggestion);
  };

  if (!character) {
    return null;
  }

  const handleNewChat = () => {
    if (
      window.confirm(
        "Start a new chat? This will clear the current conversation."
      )
    ) {
      setMessages([]);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear all chat history? This cannot be undone.")) {
      setMessages([]);
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const applyTheme = (themeId: string) => {
    setActiveTheme(themeId);
    setShowThemes(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview message for the file
      const fileMessage = `[File: ${file.name}] - ${(file.size / 1024).toFixed(
        2
      )}KB`;
      setMessages((prev) => [...prev, { text: fileMessage, sender: "user" }]);

      // Clear the input
      event.target.value = "";
    }
  };

  const getThemeStyles = () => {
    const selectedTheme = themes[activeTheme];
    if (!selectedTheme) return {};

    return {
      "--bg-color": selectedTheme.colors.background,
      "--surface-color": selectedTheme.colors.surface,
      "--primary-color": selectedTheme.colors.primary,
      "--secondary-color": selectedTheme.colors.secondary,
      "--text-color": selectedTheme.colors.text,
      "--text-muted": selectedTheme.colors.textMuted,
      "--border-color": selectedTheme.colors.border,
      "--gradient-primary": selectedTheme.gradients?.primary,
      "--gradient-surface": selectedTheme.gradients?.surface,
    } as React.CSSProperties;
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        ...getThemeStyles(),
        background: themes[activeTheme]?.colors.background || "#18181b",
      }}>
      {/* Character Info Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-80 backdrop-blur-sm transform transition-transform duration-300 ${
          showInfo ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://i.pinimg.com/originals/c1/7c/61/c17c61ce35457f5d10c30d6f2a4a0c3b.gif)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to bottom, ${
              themes[activeTheme]?.colors.surface || "#27272a"
            }cc, ${themes[activeTheme]?.colors.background || "#18181b"}ee)`,
            borderRight: `1px solid ${
              themes[activeTheme]?.colors.border || "#27272a"
            }`,
          }}
        />
        <div className="p-6 space-y-6 h-full overflow-y-auto relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{character.name}</h2>
              <p className="text-gold">{character.role}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">About</h3>
            <p className="text-zinc-300">{character.personality.background}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {character.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">
              Personality Traits
            </h3>
            <div className="flex flex-wrap gap-2">
              {character.personality.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-zinc-700/50 rounded-full text-sm text-zinc-300">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {character.personality.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-zinc-700/50 rounded-full text-sm text-zinc-300">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">
              Unique Quirks
            </h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              {character.personality.quirks.map((quirk) => (
                <li key={quirk}>{quirk}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold mb-3">
              Communication Style
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-zinc-400 text-sm">Emotional Style</p>
                <p className="text-zinc-300">
                  {character.personality.emotionalStyle}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Speaking Style</p>
                <p className="text-zinc-300">
                  {character.personality.speakingStyle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          showInfo ? "ml-80" : "ml-0"
        }`}>
        {/* Header */}
        <header
          className="fixed top-0 right-0 backdrop-blur-sm z-50 transition-all duration-300"
          style={{
            left: showInfo ? "320px" : "0",
            background: `${
              themes[activeTheme]?.colors.background || "#18181b"
            }95`,
            borderBottom: `1px solid ${
              themes[activeTheme]?.colors.border || "#27272a"
            }`,
          }}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/ai")}
                className="text-gold hover:text-gold/80 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {character.name}
                  </h1>
                  <p className="text-sm text-gold">{character.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`icon-button ${
                  showInfo ? "text-gold" : "text-zinc-400"
                }`}>
                <Info className="w-5 h-5" />
              </button>
              <div className="relative ml-2">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="icon-button text-zinc-400 hover:text-zinc-300">
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 rounded-lg bg-zinc-800 border border-zinc-700 shadow-xl animate-fade-in">
                    <div className="p-2 space-y-1">
                      <button
                        onClick={handleNewChat}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-700/50 transition-colors text-sm">
                        <Plus className="w-4 h-4" />
                        <span>New Chat</span>
                      </button>
                      <button
                        onClick={handleClearHistory}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-700/50 transition-colors text-sm">
                        <History className="w-4 h-4" />
                        <span>Clear History</span>
                      </button>
                      <button
                        onClick={() => setShowThemes(true)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-700/50 transition-colors text-sm">
                        <Palette className="w-4 h-4" />
                        <span>Change Theme</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Theme Selector Modal */}
        {showThemes && (
          <div
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
            }}>
            <div
              className="rounded-xl w-[800px] max-h-[90vh] flex flex-col animate-fade-in"
              style={{
                background: themes[activeTheme]?.colors.surface || "#27272a",
              }}>
              <div className="p-6 border-b border-zinc-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Choose Theme</h2>
                  <button
                    onClick={() => setShowThemes(false)}
                    className="text-zinc-400 hover:text-zinc-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                {/* Theme Categories */}
                {(["anime", "movie", "nature", "emotion"] as const).map(
                  (category) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-lg font-semibold text-gold mb-4 capitalize">
                        {category} Themes
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.values(themes)
                          .filter((theme) => theme.category === category)
                          .map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => applyTheme(theme.id)}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                activeTheme === theme.id
                                  ? "border-gold bg-zinc-700/50"
                                  : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
                              }`}
                              style={{
                                background:
                                  theme.gradients?.surface ||
                                  theme.colors.surface,
                                borderColor: theme.colors.primary,
                              }}>
                              <h4 className="text-white font-medium mb-1">
                                {theme.name}
                              </h4>
                              <p className="text-sm text-zinc-400">
                                {theme.description}
                              </p>
                            </button>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto pt-20 pb-40 relative"
          ref={messagesEndRef}>
          {/* Static Background Image */}
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: `url(${character.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              opacity: 0.15, // Reduced opacity for better readability
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6 pb-6">
            {/* Welcome Message */}
            <div
              key="welcome"
              className="message-bubble ai animate-fade-in text-base relative mr-auto"
              style={{
                maxWidth: "80%",
                background: themes[activeTheme]?.colors.surface || "#27272a",
              }}>
              <p>
                {character.languages?.greeting || "Greetings!"} I am{" "}
                {character.name}. {character.personality.background}
              </p>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 -translate-x-2"
                style={{
                  background: themes[activeTheme]?.colors.surface || "#27272a",
                }}
              />
            </div>

            {/* User Messages */}
            {messages.map((msg, index) => (
              <div
                key={`msg-${index}`}
                className={`message-bubble ${
                  msg.sender
                } animate-fade-in text-base relative ${
                  msg.sender === "user" ? "ml-auto" : "mr-auto"
                }`}
                style={{
                  maxWidth: "80%",
                  background:
                    msg.sender === "user"
                      ? themes[activeTheme]?.colors.primary || "#6366F1"
                      : themes[activeTheme]?.colors.surface || "#27272a",
                }}>
                <p>{msg.text}</p>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 ${
                    msg.sender === "user"
                      ? "right-0 translate-x-2"
                      : "left-0 -translate-x-2"
                  }`}
                  style={{
                    background:
                      msg.sender === "user"
                        ? themes[activeTheme]?.colors.primary || "#6366F1"
                        : themes[activeTheme]?.colors.surface || "#27272a",
                  }}
                />
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-zinc-400 animate-pulse mt-6">
                <div className="w-2 h-2 rounded-full bg-current" />
                <div className="w-2 h-2 rounded-full bg-current" />
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>
            )}

            {/* Invisible div to mark the end of messages for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div
          className="fixed bottom-0 right-0 backdrop-blur-lg transition-all duration-300"
          style={{
            left: showInfo ? "320px" : "0",
            background: `${
              themes[activeTheme]?.colors.background || "#18181b"
            }95`,
            borderTop: `1px solid ${
              themes[activeTheme]?.colors.border || "#27272a"
            }`,
          }}>
          <div className="max-w-3xl mx-auto px-6 py-3">
            {chatSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {chatSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-opacity-20 bg-white dark:bg-opacity-10 dark:bg-white px-3 py-1.5 rounded-full text-sm hover:bg-opacity-30 transition-all truncate max-w-[200px]">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center">
              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${character.name}...`}
                  className="w-full text-base px-4 py-3 rounded-lg pr-20 resize-none"
                  style={{
                    minHeight: "60px",
                    maxHeight: "120px",
                    background:
                      themes[activeTheme]?.colors.surface || "#27272a",
                    color: themes[activeTheme]?.colors.text || "#f8f8f8",
                    border: `1px solid ${
                      themes[activeTheme]?.colors.border || "#3f3f46"
                    }`,
                  }}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="p-2 rounded-full hover:bg-white/10">
                    {isListening ? (
                      <MicOff className="w-5 h-5 text-red-500" />
                    ) : (
                      <Mic className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmojis(!showEmojis)}
                    className="p-2 rounded-full hover:bg-white/10">
                    <Smile className="w-5 h-5 text-gray-400" />
                  </button>
                  <label className="p-2 rounded-full hover:bg-white/10 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </label>
                  <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className={`p-2 rounded-full ${
                      message.trim() && !isLoading
                        ? "text-white bg-nexus-blue-500 hover:bg-nexus-blue-600"
                        : "text-gray-400 bg-white/10"
                    }`}>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
            {showEmojis && (
              <div className="absolute bottom-16 right-0 bg-nexus-neutral-800 p-3 rounded-lg shadow-lg border border-nexus-neutral-700 z-20">
                <div className="grid grid-cols-6 gap-2">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-nexus-neutral-700 rounded">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CharacterChat;
