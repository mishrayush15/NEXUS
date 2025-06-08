import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Sparkles } from 'lucide-react';
import { useCompanion } from '../contexts/CompanionContext';

// Empty navigation items array - removed all buttons
const navItems = [];

export function MainNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCompanion } = useCompanion();

  // Only render a minimal navbar without any buttons
  return (
    <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Brand/logo could go here if needed */}
          </div>
          
          <div className="flex items-center">
            {/* Removed companion indicator */}
          </div>
        </div>
      </div>
    </div>
  );
} 