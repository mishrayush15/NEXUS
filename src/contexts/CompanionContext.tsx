import React, { createContext, useContext, useState, useEffect } from 'react';
import { Companion } from '../utils/companions';

interface CompanionContextType {
  selectedCompanion: Companion | null;
  setSelectedCompanion: (companion: Companion | null) => void;
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export function useCompanion() {
  const context = useContext(CompanionContext);
  if (context === undefined) {
    throw new Error('useCompanion must be used within a CompanionProvider');
  }
  return context;
}

export function CompanionProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);

  useEffect(() => {
    // Load selected companion from localStorage on mount
    const savedCompanion = localStorage.getItem('selectedCompanion');
    if (savedCompanion) {
      try {
        setSelectedCompanion(JSON.parse(savedCompanion));
      } catch (error) {
        console.error('Error loading companion from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save selected companion to localStorage when it changes
    if (selectedCompanion) {
      localStorage.setItem('selectedCompanion', JSON.stringify(selectedCompanion));
    } else {
      localStorage.removeItem('selectedCompanion');
    }
  }, [selectedCompanion]);

  return (
    <CompanionContext.Provider value={{ selectedCompanion, setSelectedCompanion }}>
      {children}
    </CompanionContext.Provider>
  );
} 