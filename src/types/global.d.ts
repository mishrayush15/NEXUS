/// <reference types="vite/client" />

// Explicitly declare this as a web React project, not React Native
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Prevent React Native types from being included
declare module 'react-native' {
  // This module should not be used in this web project
  const ReactNative: never;
  export = ReactNative;
}

declare module '@react-native-community/async-storage' {
  // This module should not be used in this web project
  const AsyncStorage: never;
  export = AsyncStorage;
}

declare module 'react-native-vector-icons' {
  // This module should not be used in this web project
  const VectorIcons: never;
  export = VectorIcons;
}

declare module 'react-native-gesture-handler' {
  // This module should not be used in this web project
  const GestureHandler: never;
  export = GestureHandler;
}

declare module 'react-native-reanimated' {
  // This module should not be used in this web project
  const Reanimated: never;
  export = Reanimated;
}

export {}; 