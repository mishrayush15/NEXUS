export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  messages: ChatMessage[];
  timeSpent?: number; // Daily active minutes
  trending?: number; // Trending score (1-10)
  activeNow?: number; // People active now
  lastActive?: Date; // When was the last activity
} 