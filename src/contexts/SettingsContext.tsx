import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { 
  ThemeType, 
  FontSizeType, 
  applyTheme, 
  applyFontSize, 
  listenForSystemThemeChanges, 
  loadSettings,
  saveSetting
} from '../utils/settings';

export type SettingsContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  fontSize: FontSizeType;
  setFontSize: (size: FontSizeType) => void;
  primaryLanguage: string;
  setPrimaryLanguage: (language: string) => void;
  autoTranslate: boolean;
  setAutoTranslate: (autoTranslate: boolean) => void;
  incognitoMode: boolean;
  toggleIncognitoMode: () => void;
  setIncognitoMode: (enabled: boolean) => void;
  currentDisplayTheme: 'light' | 'dark';
};

export const SettingsContext = createContext<SettingsContextType>({
  theme: 'system',
  setTheme: () => {},
  fontSize: 'medium',
  setFontSize: () => {},
  primaryLanguage: 'en',
  setPrimaryLanguage: () => {},
  autoTranslate: false,
  setAutoTranslate: () => {},
  incognitoMode: false,
  toggleIncognitoMode: () => {},
  setIncognitoMode: () => {},
  currentDisplayTheme: 'light',
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // Load saved settings from localStorage
  const savedSettings = loadSettings();

  // State for all settings
  const [theme, setThemeState] = useState<ThemeType>(savedSettings.theme);
  const [fontSize, setFontSizeState] = useState<FontSizeType>(savedSettings.fontSize);
  const [primaryLanguage, setPrimaryLanguageState] = useState(savedSettings.primaryLanguage);
  const [autoTranslate, setAutoTranslateState] = useState(savedSettings.autoTranslate);
  const [incognitoMode, setIncognitoModeState] = useState(savedSettings.incognitoMode);

  // Track the actual theme being displayed (light or dark)
  const [currentDisplayTheme, setCurrentDisplayTheme] = useState<'light' | 'dark'>(
    theme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme as 'light' | 'dark'
  );

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme);
    saveSetting('theme', theme);
    
    // Update the current display theme
    if (theme !== 'system') {
      setCurrentDisplayTheme(theme as 'light' | 'dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      // Set up listener for system theme changes
      const removeListener = listenForSystemThemeChanges((isDark) => {
        setCurrentDisplayTheme(isDark ? 'dark' : 'light');
        applyTheme('system'); // Reapply system theme
      });
      
      // Cleanup listener
      return removeListener;
    }
  }, [theme]);

  // Apply font size when it changes
  useEffect(() => {
    applyFontSize(fontSize);
    saveSetting('fontSize', fontSize);
  }, [fontSize]);

  // Save primaryLanguage to localStorage when it changes
  useEffect(() => {
    saveSetting('primaryLanguage', primaryLanguage);
  }, [primaryLanguage]);

  // Save autoTranslate to localStorage when it changes
  useEffect(() => {
    saveSetting('autoTranslate', autoTranslate);
  }, [autoTranslate]);

  // Save incognitoMode to localStorage when it changes
  useEffect(() => {
    saveSetting('incognitoMode', incognitoMode);
  }, [incognitoMode]);

  // Wrapper functions to update state and localStorage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: FontSizeType) => {
    setFontSizeState(newSize);
  };

  const setPrimaryLanguage = (language: string) => {
    setPrimaryLanguageState(language);
  };

  const setAutoTranslate = (value: boolean) => {
    setAutoTranslateState(value);
  };

  const setIncognitoMode = (enabled: boolean) => {
    setIncognitoModeState(enabled);
  };

  const toggleIncognitoMode = () => {
    setIncognitoModeState(prev => !prev);
  };

  // Apply initial settings
  useEffect(() => {
    applyTheme(theme);
    applyFontSize(fontSize);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        primaryLanguage,
        setPrimaryLanguage,
        autoTranslate,
        setAutoTranslate,
        incognitoMode,
        toggleIncognitoMode,
        setIncognitoMode,
        currentDisplayTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};