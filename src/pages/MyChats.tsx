import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Trash2,
  Clock,
  Star,
} from "lucide-react";
import { ProfileButton } from "../components/ProfileButton";
import { FeatureNavigation } from "../components/FeatureNavigation";
import { formatDistanceToNow } from "date-fns";
import { useCharacterContext } from "../contexts/CharacterContext";
import { getAuth } from "firebase/auth";
import axios from "axios";

interface ChatHistoryItem {
  id: string;
  characterId: string;
  characterName: string;
  characterImage: string;
  lastMessage: string;
  timestamp: number | Date;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { characters } = useCharacterContext();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.warn("No authenticated Firebase user found");
          return;
        }

        const userId = user.uid;

        const response = await axios.post(
          "http://localhost:8000/api/v1/chat/ai/get-saved-chat",
          { user_id: userId }
        );

        const backendChats = response.data?.data || [];

        const formattedChats: ChatHistoryItem[] = backendChats.map(
          (chat: any) => {
            const messages = Array.isArray(chat.messages) ? chat.messages : [];
            const lastMessageObj = messages[messages.length - 1] || {};
            const characterInfo = characters[chat.character_id] || {};

            return {
              id: chat.id,
              characterId: chat.character_id,
              characterName: characterInfo.name || `AI Character`,
              characterImage:
                characterInfo.image ||
                "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&h=150",
              lastMessage:
                lastMessageObj.ai || lastMessageObj.message || "No message",
              timestamp: chat.updated_at
                ? new Date(chat.updated_at)
                : new Date(),
              messages: messages.map((msg: any) => ({
                user: msg.user || "",
                ai: msg.ai || "",
                timestamp: msg.timestamp || Date.now(),
              })),
              role: characterInfo.role,
            };
          }
        );

        setChatHistory(formattedChats);

        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to fetch chat history from backend:", error);
        setChatHistory([]);
      }
    };

    fetchChatHistory();
  }, [characters]);

  const deleteSingleChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:8000/api/v1/chat/ai/delete-chat", {
        chat_id: chatId,
      });
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const deleteAllChats = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn("No authenticated Firebase user found");
      return;
    }

    const userId = user.uid;

    try {
      await axios.post(
        "http://localhost:8000/api/v1/chat/ai/delete-all-chats",
        { user_id: userId }
      );
      setChatHistory([]);
    } catch (error) {
      console.error("Failed to delete all chats:", error);
    }
  };

  const filteredChats = chatHistory.filter((chat) => {
    const matchesSearch =
      !searchQuery ||
      chat.characterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFavorites =
      !showFavorites || favorites.includes(chat.characterId);

    return matchesSearch && matchesFavorites;
  });

  const formatTimestamp = (timestamp: number | Date) => {
    const date =
      typeof timestamp === "number" ? new Date(timestamp) : timestamp;
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const toggleFavorite = (e: React.MouseEvent, characterId: string) => {
    e.stopPropagation();

    const newFavorites = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm fixed left-0 right-0 top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/ai")}
                className="text-gold hover:text-gold/80 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-8 h-8 text-gold" />
                <span className="text-2xl font-bold text-gold">
                  Previous Conversations
                </span>
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
                    ? "bg-gold text-zinc-900 hover:bg-gold/90"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700/80"
                }`}>
                <Star className="w-5 h-5" />
                <span>Favorites</span>
              </button>

              <ProfileButton />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Previous Conversations
              </h2>
              <p className="text-zinc-400 mt-1">
                Your past chats with AI characters
              </p>
            </div>
            {filteredChats.length > 0 && (
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to delete all conversation history?"
                    )
                  ) {
                    deleteAllChats();
                  }
                }}
                className="px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors">
                Clear History
              </button>
            )}
          </div>

          {filteredChats.length === 0 ? (
            <div className="bg-zinc-800/50 rounded-xl p-8 text-center">
              <MessageSquare className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                No Conversations Found
              </h3>
              <p className="text-zinc-400 mb-6">
                {searchQuery
                  ? "No conversations match your search query"
                  : showFavorites
                  ? "You don't have any favorite conversations yet"
                  : "You don't have any previous conversations with AI characters"}
              </p>
              <button
                onClick={() => navigate("/ai")}
                className="px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-all font-medium">
                Start Chatting
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.characterId}`)}
                  className="bg-zinc-800/50 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-700/50 transition-colors p-4 flex items-start">
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
                            ? "bg-gold text-zinc-900"
                            : "bg-zinc-700 text-zinc-300"
                        }`}>
                        <Star
                          className="w-3 h-3"
                          fill={
                            favorites.includes(chat.characterId)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-white truncate">
                        {chat.characterName}
                      </h3>
                      <div className="flex items-center space-x-2 text-zinc-400 text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(chat.timestamp)}</span>
                      </div>
                    </div>

                    {chat.role && (
                      <p className="text-gold text-xs mb-1">{chat.role}</p>
                    )}

                    <p className="text-zinc-300 mb-3 line-clamp-1">
                      {chat.lastMessage}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-zinc-500 text-xs">
                        <MessageSquare className="w-3 h-3" />
                        <span>{chat.messages.length} messages</span>
                      </div>

                      <button
                        onClick={(e) => deleteSingleChat(e, chat.id)}
                        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
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
