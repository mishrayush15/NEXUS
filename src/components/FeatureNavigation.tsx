import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Eye, EyeOff, Layers, MessageSquare, Video } from 'lucide-react';
import { useState } from 'react';
import { useCompanion } from '../contexts/CompanionContext';

// Features list
const features = [
  {
    name: 'AI Chat',
    icon: Bot,
    route: '/ai',
    description: 'Chat with AI companions'
  },
  {
    name: 'Nexus Vibe',
    icon: MessageSquare,
    route: '/nexus-vibe',
    description: 'Chat with other users in groups'
  },
  {
    name: 'Connect',
    icon: Video,
    route: '/connect',
    description: 'Start a random video chat'
  }
];

export function FeatureNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const { selectedCompanion } = useCompanion();

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-32'
      }`}>
      {/* Controls */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-2 bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setOpacity(prev => prev === 1 ? 0.1 : prev + 0.3)}
          className="p-2 bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Bar */}
      <div
        className="bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 rounded-2xl p-2 shadow-xl transition-opacity duration-300"
        style={{ opacity }}
      >
        <div className="flex items-center space-x-2">
          {features.map((feature) => {
            const isActive = location.pathname.startsWith(feature.route);
            return (
              <button
                key={feature.route}
                onClick={() => {
                  if (feature.name === "Connect") {
                    // Replace with your ngrok or localhost  URL
                    window.location.href = "http://localhost:3000";
                  } else {
                    navigate(feature.route);
                  }
                }}
                className={`group relative px-4 py-2 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-gold text-zinc-900'
                  : 'text-zinc-400 hover:bg-zinc-700/50'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <feature.icon className="w-5 h-5" />
                  <span className="font-medium">{feature.name}</span>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {feature.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}