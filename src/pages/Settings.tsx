import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bot, Bell, Globe2, Lock, MessageSquare, 
  Volume2, Moon, Sun, Palette, Shield, UserCog, LogOut,
  Type, Eye, EyeOff, X, Check, BellOff, Sparkles, 
  RefreshCw, Laptop
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { FontSizeType } from '../utils/settings';

interface SettingItem {
  name: string;
  description: string;
  control: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

function Settings() {
  const navigate = useNavigate();
  const { 
    theme, 
    setTheme, 
    fontSize,
    setFontSize,
    primaryLanguage,
    setPrimaryLanguage,
    autoTranslate,
    setAutoTranslate,
    incognitoMode,
    setIncognitoMode,
    currentDisplayTheme,
  } = useSettings();
   const accentText = incognitoMode ? 'text-orange-500' : 'text-gold';
  const accentBg = incognitoMode ? 'bg-orange-500/10' : 'bg-gold/10';
  const accentBorder = incognitoMode ? 'border-orange-500/20' : 'border-gold/20';
  const accentGradient = incognitoMode
    ? 'from-orange-500/0 via-orange-500/10 to-orange-500/0'
    : 'from-gold/0 via-gold/10 to-gold/0';
    const mainBg = incognitoMode ? 'bg-black' : 'bg-zinc-900';
const sideMenuBg = incognitoMode ? 'bg-black/80' : 'bg-zinc-800/50';
const cardBg = incognitoMode ? 'bg-black' : 'bg-white dark:bg-zinc-900';
const borderColor = incognitoMode ? 'border-black' : 'border-zinc-800';
const cardBorder = incognitoMode ? 'border-black' : 'border-zinc-200 dark:border-zinc-800';
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [privacy, setPrivacy] = useState('public');
  const [messageHistory, setMessageHistory] = useState(true);
  const [voiceResponses, setVoiceResponses] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español (Spanish)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'de', name: 'Deutsch (German)' },
    { code: 'it', name: 'Italiano (Italian)' },
    { code: 'pt', name: 'Português (Portuguese)' },
    { code: 'ru', name: 'Русский (Russian)' },
    { code: 'zh', name: '中文 (Chinese)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'ko', name: '한국어 (Korean)' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
  ];

  const settingsSections: SettingSection[] = [
    {
      title: 'Appearance',
      items: [
        {
          name: 'Theme',
          description: 'Adjust the application theme',
          control: (
            <div className="flex gap-3 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === 'light' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-600 dark:text-zinc-400'
                }`}
                onClick={() => setTheme('light')}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === 'dark' ? 'bg-zinc-900 shadow-sm text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'
                }`}
                onClick={() => setTheme('dark')}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded ${
                  theme === 'system' ? (
                    currentDisplayTheme === 'dark' 
                      ? 'bg-zinc-900 shadow-sm text-zinc-100'
                      : 'bg-white shadow-sm text-zinc-900'
                  ) : 'text-zinc-600 dark:text-zinc-400'
                }`}
                onClick={() => setTheme('system')}
              >
                <Laptop size={18} />
                <span>System</span>
              </button>
            </div>
          ),
        },
        {
          name: 'Font Size',
          description: 'Adjust text size throughout the app',
          control: (
            <select
              className="rounded bg-zinc-100 dark:bg-zinc-800 border-none px-3 py-2 text-zinc-900 dark:text-zinc-100"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as FontSizeType)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">X-Large</option>
            </select>
          ),
        },
      ],
    },
    {
      title: 'Language & Translation',
      items: [
        {
          name: 'Primary Language',
          description: 'Choose your preferred language',
          control: (
            <select
              className="rounded bg-zinc-100 dark:bg-zinc-800 border-none px-3 py-2 text-zinc-900 dark:text-zinc-100"
              value={primaryLanguage}
              onChange={(e) => setPrimaryLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          ),
        },
        {
          name: 'Auto-translate',
          description: 'Automatically translate foreign language content',
          control: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoTranslate ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              onClick={() => setAutoTranslate(!autoTranslate)}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform ${
                  autoTranslate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          name: 'Notifications',
          description: 'Receive alerts for new messages and updates',
          control: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              onClick={() => setNotifications(!notifications)}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          ),
        },
        {
          name: 'Notification Sound',
          description: 'Play sound when new notifications arrive',
          disabled: !notifications,
          control: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSound && notifications ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              onClick={() => setNotificationSound(!notificationSound)}
              disabled={!notifications}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform ${
                  notificationSound && notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          name: 'Incognito Mode',
          description: 'Use app without saving history or data',
          control: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                incognitoMode ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              onClick={() => setIncognitoMode(!incognitoMode)}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform ${
                  incognitoMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          ),
          icon: incognitoMode ? <Eye size={18} className="text-indigo-600" /> : <EyeOff size={18} className="text-zinc-500" />,
        },
      ],
    },
    {
      title: 'AI Interactions',
      items: [
        {
          name: 'Voice Responses',
          description: 'Enable AI voice responses instead of text',
          disabled: true,
          control: (
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                Coming Soon
              </span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-zinc-300 dark:bg-zinc-700`}
                disabled
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform translate-x-1`}
                />
              </button>
            </div>
          ),
          icon: voiceResponses ? <Volume2 size={18} className="text-zinc-500" /> : <Volume2 size={18} className="text-zinc-500" />,
        },
        {
          name: 'Reset AI Preferences',
          description: 'Clear all AI personalization data',
          control: (
            <div className="flex items-center">
              {resetConfirm ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setResetConfirm(false)}
                    className="p-1 text-zinc-600 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                  <button
                    onClick={() => {
                      alert('AI preferences have been reset');
                      setResetConfirm(false);
                    }}
                    className="p-1 text-zinc-600 hover:text-green-500"
                  >
                    <Check size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setResetConfirm(true)}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-sm flex items-center gap-1.5"
                >
                  <RefreshCw size={14} />
                  Reset
                </button>
              )}
            </div>
          ),
          icon: <Sparkles size={18} className="text-zinc-500" />,
        },
      ],
    },
  ];

  return (
    <div className={`min-h-screen ${mainBg}`}>
  {/* Side Menu */}
  <nav className={`fixed left-0 top-0 h-screen w-56 ${sideMenuBg} backdrop-blur-sm ${borderColor}`}>
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className={`w-10 h-10 rounded-xl ${accentBg} flex items-center justify-center border ${accentBorder} relative overflow-hidden group`}>
          <span className={`text-2xl font-bold ${accentText} group-hover:scale-110 transition-transform`}>N</span>
          <div className={`absolute inset-0 bg-gradient-to-r ${accentGradient} animate-shimmer`} />
        </div>
        <span className={`text-xl font-bold ${accentText}`}>Nexus</span>
      </div>
    </div>
  </nav>

      {/* Main Content */}
      <main className="ml-56">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
             <button
  onClick={() => navigate('/ai')}
  className={`${accentText} hover:text-orange-400 transition-colors`}
>
  <ArrowLeft className="w-6 h-6" />
</button>
<div className="flex items-center space-x-2">
  <UserCog className={`w-8 h-8 ${accentText}`} />
  <span className={`text-2xl font-bold ${accentText}`}>Settings</span>
</div>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {settingsSections.map((section, i) => (
              <div key={i} className="space-y-5">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">{section.title}</h2>
                <div className="space-y-4 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow border border-zinc-200 dark:border-zinc-800">
                  {section.items.map((item, j) => (
                    <div
                      key={j} 
                      className={`flex items-center justify-between py-3 ${
                        j !== section.items.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
                      } ${item.disabled ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon}
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-0.5">{item.name}</h3>
                          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <div>{item.control}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Logout Button */}
      <div className="fixed bottom-8 left-6 z-50">
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Settings;