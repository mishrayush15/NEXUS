// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Room, Message, listRooms, listenToRoomMessages, sendMessage as chatSendMessage, createRoom as chatCreateRoom } from '../services/chat';
// import type { Unsubscribe } from 'firebase/firestore';
// import { useAuth } from './AuthContext';

// export interface ChatContextType {
//   rooms: Room[];
//   currentRoom: Room | null;
//   messages: Message[];
//   loadRooms: (
//     view: 'home' | 'discover' | 'trending' | 'campus',
//     filter?: { search?: string; campusTag?: string; limit?: number }
//   ) => Promise<void>;
//   selectRoom: (room: Room) => void;
//   sendMessage: (content: string) => Promise<void>;
//   createRoom: (data: { name: string; description: string; category: string; campusTag?: string }) => Promise<void>;
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { user } = useAuth();
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [messageUnsub, setMessageUnsub] = useState<Unsubscribe | null>(null);

//   // Load user's rooms on mount
//   useEffect(() => {
//     if (user) {
//       loadRooms('home', { userId: user.id });
//     }
//   }, [user]);

//   const loadRooms = async (
//     view: 'home' | 'discover' | 'trending' | 'campus',
//     filter?: { search?: string; campusTag?: string; limit?: number; userId?: string }
//   ) => {
//     if (!user) return;
//     const data = await listRooms(view, { ...filter, userId: user.id });
//     setRooms(data);
//   };

//   const selectRoom = (room: Room) => {
//     setCurrentRoom(room);
//     setMessages([]);
//     // unsubscribe previous
//     if (messageUnsub) {
//       messageUnsub();
//     }
//     // subscribe to new room
//     const unsub = listenToRoomMessages(room.id, msgs => setMessages(msgs));
//     setMessageUnsub(() => unsub);
//   };

//   const sendMessage = async (content: string) => {
//     if (!user || !currentRoom) return;
//     await chatSendMessage(currentRoom.id, {
//       roomId: currentRoom.id,
//       senderId: user.id,
//       content,
//     });
//   };

//   const createRoom = async (data: { name: string; description: string; category: string; campusTag?: string }) => {
//     if (!user) return;
//     await chatCreateRoom({ ...data, members: [user.id] });
//     // reload home view
//     await loadRooms('home');
//   };

//   return (
//     <ChatContext.Provider value={{ rooms, currentRoom, messages, loadRooms, selectRoom, sendMessage, createRoom }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) throw new Error('useChat must be used within ChatProvider');
//   return context;
// };
