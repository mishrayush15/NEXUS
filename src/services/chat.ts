/**
 * Chat service using Firebase Firestore
 *
 * Requires env vars in .env:
 * VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
 * VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import type { QuerySnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

// Define Room and Message types
export interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  members: string[]; // array of user IDs
  campusTag?: string;
  trendingScore?: number;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  timestamp: number;
}

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app and Firestore
type FirestoreApp = ReturnType<typeof initializeApp>;
const app: FirestoreApp = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * List rooms based on view and filter
 */
export const listRooms = async (
  view: 'home' | 'discover' | 'trending' | 'campus',
  filter?: { search?: string; campusTag?: string; userId?: string; limit?: number; }
): Promise<Room[]> => {
  const roomsRef = collection(db, 'rooms');
  let q;

  switch (view) {
    case 'home':
      q = query(
        roomsRef,
        where('members', 'array-contains', filter?.userId || '')
      );
      break;
    case 'discover':
      if (filter?.search) {
        // Simple keyword search: assumes 'keywords' array field exists
        q = query(
          roomsRef,
          where('keywords', 'array-contains', filter.search.toLowerCase())
        );
      } else {
        q = query(roomsRef);
      }
      break;
    case 'trending':
      q = query(
        roomsRef,
        orderBy('trendingScore', 'desc'),
        limit(filter?.limit || 20)
      );
      break;
    case 'campus':
      if (filter?.campusTag) {
        q = query(
          roomsRef,
          where('campusTag', '==', filter.campusTag)
        );
      } else {
        q = query(roomsRef);
      }
      break;
    default:
      q = query(roomsRef);
  }

  const snapshot = await getDocs(q) as QuerySnapshot<DocumentData>;
  return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...(doc.data() as Omit<Room, 'id'>),
  }));
};

/**
 * Listen for real-time message updates in a room
 */
export const listenToRoomMessages = (
  roomId: string,
  callback: (messages: Message[]) => void
): Unsubscribe => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, 'id'>),
    }));
    callback(msgs);
  });
};

/**
 * Send a message to a room
 */
export const sendMessage = async (
  roomId: string,
  message: Omit<Message, 'id' | 'timestamp'>
): Promise<void> => {
  const messagesRef = collection(db, 'rooms', roomId, 'messages');
  await addDoc(messagesRef, {
    ...message,
    timestamp: Date.now(),
  });
};

/**
 * Create a new room
 */
export const createRoom = async (
  room: Omit<Room, 'id' | 'trendingScore'>
): Promise<void> => {
  const roomsRef = collection(db, 'rooms');
  await addDoc(roomsRef, {
    ...room,
    trendingScore: 0,
  });
}; 