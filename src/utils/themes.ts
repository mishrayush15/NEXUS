interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'anime' | 'movie' | 'nature' | 'emotion';
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    border: string;
  };
  gradients?: {
    primary: string;
    surface: string;
  };
}

export const themes: Record<string, Theme> = {
  // Anime Themes
  'demon-slayer': {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    description: 'Inspired by the vibrant world of Demon Slayer',
    category: 'anime',
    colors: {
      background: '#1a1a1f',
      surface: '#2a2a30',
      primary: '#16a085',
      secondary: '#ff5555',
      text: '#ffffff',
      textMuted: '#94a3b8',
      border: '#2d3748'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #16a085 0%, #2ecc71 100%)',
      surface: 'linear-gradient(180deg, rgba(42,42,48,0.8) 0%, rgba(26,26,31,0.9) 100%)'
    }
  },
  'attack-titan': {
    id: 'attack-titan',
    name: 'Attack on Titan',
    description: 'Dark and intense theme inspired by Attack on Titan',
    category: 'anime',
    colors: {
      background: '#1c1917',
      surface: '#292524',
      primary: '#b91c1c',
      secondary: '#854d0e',
      text: '#fafaf9',
      textMuted: '#a8a29e',
      border: '#44403c'
    }
  },
  'one-piece': {
    id: 'one-piece',
    name: 'One Piece',
    description: 'Vibrant and adventurous One Piece theme',
    category: 'anime',
    colors: {
      background: '#172554',
      surface: '#1e3a8a',
      primary: '#fbbf24',
      secondary: '#ef4444',
      text: '#ffffff',
      textMuted: '#93c5fd',
      border: '#1e40af'
    }
  },

  // Movie Themes
  'matrix': {
    id: 'matrix',
    name: 'The Matrix',
    description: 'Digital rain inspired by The Matrix',
    category: 'movie',
    colors: {
      background: '#0a0f0d',
      surface: '#1a1f1d',
      primary: '#00ff00',
      secondary: '#003300',
      text: '#00ff00',
      textMuted: '#00cc00',
      border: '#001a00'
    }
  },
  'blade-runner': {
    id: 'blade-runner',
    name: 'Blade Runner',
    description: 'Neon-noir cyberpunk aesthetic',
    category: 'movie',
    colors: {
      background: '#0f0f1a',
      surface: '#1a1a2e',
      primary: '#ff00ff',
      secondary: '#00ffff',
      text: '#ffffff',
      textMuted: '#a0a0c0',
      border: '#2a2a3e'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      surface: 'linear-gradient(180deg, rgba(26,26,46,0.8) 0%, rgba(15,15,26,0.9) 100%)'
    }
  },
  'harry-potter': {
    id: 'harry-potter',
    name: 'Hogwarts',
    description: 'Magical theme inspired by Harry Potter',
    category: 'movie',
    colors: {
      background: '#1c1917',
      surface: '#292524',
      primary: '#b45309',
      secondary: '#4c1d95',
      text: '#fafaf9',
      textMuted: '#a8a29e',
      border: '#44403c'
    }
  },

  // Nature Themes
  'ocean': {
    id: 'ocean',
    name: 'Deep Ocean',
    description: 'Serene underwater depths',
    category: 'nature',
    colors: {
      background: '#0c4a6e',
      surface: '#075985',
      primary: '#0ea5e9',
      secondary: '#22d3ee',
      text: '#f0f9ff',
      textMuted: '#bae6fd',
      border: '#0369a1'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)',
      surface: 'linear-gradient(180deg, rgba(7,89,133,0.8) 0%, rgba(12,74,110,0.9) 100%)'
    }
  },
  'forest': {
    id: 'forest',
    name: 'Mystic Forest',
    description: 'Deep within the enchanted woods',
    category: 'nature',
    colors: {
      background: '#14532d',
      surface: '#166534',
      primary: '#22c55e',
      secondary: '#facc15',
      text: '#f0fdf4',
      textMuted: '#bbf7d0',
      border: '#15803d'
    }
  },
  'aurora': {
    id: 'aurora',
    name: 'Northern Lights',
    description: 'Inspired by the aurora borealis',
    category: 'nature',
    colors: {
      background: '#0f172a',
      surface: '#1e293b',
      primary: '#4ade80',
      secondary: '#818cf8',
      text: '#f8fafc',
      textMuted: '#cbd5e1',
      border: '#334155'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4ade80 0%, #818cf8 100%)',
      surface: 'linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)'
    }
  },

  // Emotion Themes
  'serenity': {
    id: 'serenity',
    name: 'Serenity',
    description: 'Calm and peaceful vibes',
    category: 'emotion',
    colors: {
      background: '#1e1b4b',
      surface: '#312e81',
      primary: '#818cf8',
      secondary: '#c084fc',
      text: '#f5f3ff',
      textMuted: '#c7d2fe',
      border: '#4338ca'
    }
  },
  'passion': {
    id: 'passion',
    name: 'Passion',
    description: 'Intense and energetic',
    category: 'emotion',
    colors: {
      background: '#7f1d1d',
      surface: '#991b1b',
      primary: '#f87171',
      secondary: '#fbbf24',
      text: '#fef2f2',
      textMuted: '#fecaca',
      border: '#dc2626'
    }
  },
  'tranquility': {
    id: 'tranquility',
    name: 'Tranquility',
    description: 'Peaceful zen garden',
    category: 'emotion',
    colors: {
      background: '#064e3b',
      surface: '#065f46',
      primary: '#34d399',
      secondary: '#fbbf24',
      text: '#ecfdf5',
      textMuted: '#a7f3d0',
      border: '#059669'
    }
  },

  // New eye-friendly themes
  'foliage': {
    id: 'foliage',
    name: 'Foliage',
    description: 'Soothing leafy greens reminiscent of nature',
    category: 'nature',
    colors: {
      background: '#2f4f4f',
      surface: '#3b5d3b',
      primary: '#88b04b',
      secondary: '#aed581',
      text: '#f0fdf4',
      textMuted: '#a7f3d0',
      border: '#336633'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #88b04b 0%, #aed581 100%)',
      surface: 'linear-gradient(180deg, rgba(59,93,59,0.8) 0%, rgba(47,79,79,0.9) 100%)'
    }
  },

  'library': {
    id: 'library',
    name: 'Library',
    description: 'Warm earth tones inspired by cozy libraries',
    category: 'emotion',
    colors: {
      background: '#fdf6e3',
      surface: '#eee8d5',
      primary: '#b58900',
      secondary: '#2aa198',
      text: '#586e75',
      textMuted: '#93a1a1',
      border: '#839496'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #b58900 0%, #2aa198 100%)',
      surface: 'linear-gradient(180deg, rgba(238,232,213,0.8) 0%, rgba(253,246,227,0.9) 100%)'
    }
  },

  'cozy-cafe': {
    id: 'cozy-cafe',
    name: 'Cozy Cafe',
    description: 'Warm browns and cream tones like a favorite coffee shop',
    category: 'emotion',
    colors: {
      background: '#5d4037',
      surface: '#6d4c41',
      primary: '#bcaaa4',
      secondary: '#d7ccc8',
      text: '#efebe9',
      textMuted: '#b0bec5',
      border: '#4e342e'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #5d4037 0%, #bcaaa4 100%)',
      surface: 'linear-gradient(180deg, rgba(109,76,65,0.8) 0%, rgba(93,64,55,0.9) 100%)'
    }
  },

  'pastel-love': {
    id: 'pastel-love',
    name: 'Pastel Love',
    description: 'Soft pastel pinks and blues for gentle relaxation',
    category: 'emotion',
    colors: {
      background: '#ffebee',
      surface: '#ffcdd2',
      primary: '#f8bbd0',
      secondary: '#b2ebf2',
      text: '#4a4a4a',
      textMuted: '#9e9e9e',
      border: '#ec407a'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
      surface: 'linear-gradient(180deg, rgba(255,204,210,0.8) 0%, rgba(255,235,238,0.9) 100%)'
    }
  },

  'cat-cuddle': {
    id: 'cat-cuddle',
    name: 'Cat Cuddle',
    description: 'Warm and soft palette inspired by cuddling kittens',
    category: 'emotion',
    colors: {
      background: '#37474f',
      surface: '#455a64',
      primary: '#ffca28',
      secondary: '#cfd8dc',
      text: '#eceff1',
      textMuted: '#b0bec5',
      border: '#2f3b45'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #455a64 0%, #37474f 100%)',
      surface: 'linear-gradient(180deg, rgba(69,90,100,0.8) 0%, rgba(55,71,79,0.9) 100%)'
    }
  },

  // Geometric Themes
  'geometric-neon': {
    id: 'geometric-neon',
    name: 'Neon Geometry',
    description: 'Bold geometric patterns with neon colors',
    category: 'emotion',
    colors: {
      background: '#0f0f1a',
      surface: '#1a1a2e',
      primary: '#ff00ff',
      secondary: '#00ffff',
      text: '#ffffff',
      textMuted: '#a0a0c0',
      border: '#2a2a3e'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      surface: 'linear-gradient(180deg, rgba(26,26,46,0.8) 0%, rgba(15,15,26,0.9) 100%)'
    }
  },
  'geometric-minimal': {
    id: 'geometric-minimal',
    name: 'Minimal Geometry',
    description: 'Clean, minimalist design with subtle geometric accents',
    category: 'emotion',
    colors: {
      background: '#f8fafc',
      surface: '#f1f5f9',
      primary: '#0f172a',
      secondary: '#334155',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#cbd5e1'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      surface: 'linear-gradient(180deg, rgba(241,245,249,0.8) 0%, rgba(248,250,252,0.9) 100%)'
    }
  },
  'geometric-sunset': {
    id: 'geometric-sunset',
    name: 'Geometric Sunset',
    description: 'Warm gradient colors inspired by sunset skies',
    category: 'nature',
    colors: {
      background: '#7c2d12',
      surface: '#9a3412',
      primary: '#f97316',
      secondary: '#f59e0b',
      text: '#fffbeb',
      textMuted: '#fed7aa',
      border: '#c2410c'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      surface: 'linear-gradient(180deg, rgba(154,52,18,0.8) 0%, rgba(124,45,18,0.9) 100%)'
    }
  },
  'geometric-arctic': {
    id: 'geometric-arctic',
    name: 'Arctic Geometry',
    description: 'Cool blues and whites with geometric patterns',
    category: 'nature',
    colors: {
      background: '#0c4a6e',
      surface: '#0369a1',
      primary: '#38bdf8',
      secondary: '#e0f2fe',
      text: '#f0f9ff',
      textMuted: '#bae6fd',
      border: '#0284c7'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #38bdf8 0%, #e0f2fe 100%)',
      surface: 'linear-gradient(180deg, rgba(3,105,161,0.8) 0%, rgba(12,74,110,0.9) 100%)'
    }
  },
};

// Add dark room theme
export const getDarkRoomTheme = () => ({
  colors: {
    background: '#0F0A1F', // Deep purple background
    surface: '#1A1433', // Lighter purple surface
    primary: '#6B4DFF', // Bright purple primary
    secondary: '#9D89FF', // Light purple secondary
    text: '#FFFFFF',
    textMuted: '#9D89FF',
    border: '#2D2152' // Dark purple border
  },
  gradients: {
    primary: 'linear-gradient(135deg, #6B4DFF 0%, #9D89FF 100%)',
    surface: 'linear-gradient(180deg, rgba(26,20,51,0.8) 0%, rgba(15,10,31,0.9) 100%)'
  }
});