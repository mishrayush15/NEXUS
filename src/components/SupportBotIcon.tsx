import React from 'react';
import { Bot } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext'; // ✅ NEW IMPORT

interface SupportBotIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export function SupportBotIcon({
  size = 'md',
  animated = true,
  className = ''
}: SupportBotIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const { incognitoMode } = useSettings(); // ✅ USE INCÓGNITO MODE

  const accentColor = incognitoMode ? 'orange-500' : 'gold';
  const textColor = incognitoMode ? 'text-orange-500' : 'text-gold';
  const bgColor = incognitoMode ? 'bg-orange-500/10' : 'bg-gold/10';
  const borderColor = incognitoMode ? 'border-orange-500/20' : 'border-gold/20';
  const shimmer = incognitoMode
    ? 'from-orange-500/0 via-orange-500/10 to-orange-500/0'
    : 'from-gold/0 via-gold/10 to-gold/0';

  return (
    <div className={`relative ${className}`}>
      {/* Outer Ring */}
      <div
        className={`${sizeClasses[size]} rounded-xl ${bgColor} flex items-center justify-center ${borderColor} border relative overflow-hidden group`}
      >
        {/* Bot Icon */}
        <Bot className={`w-1/2 h-1/2 ${textColor} group-hover:scale-110 transition-transform`} />

        {/* Animated Gradient */}
        {animated && (
          <div className={`absolute inset-0 bg-gradient-to-r ${shimmer} animate-shimmer`} />
        )}
      </div>

      {/* Animated Pulse Ring */}
      {animated && (
        <div className={`absolute inset-0 rounded-xl ${borderColor} border animate-ping`} />
      )}
    </div>
  );
}
