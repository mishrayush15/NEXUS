import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bot, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../utils/characters';
import { Character } from '../utils/characters';

function AISettings() {
  const navigate = useNavigate();
  const [name, setName] = useState('Nexus AI');
  const [title, setTitle] = useState('AI Companion');
  const [greeting, setGreeting] = useState('Hello! How can I help you today?');
  const [tone, setTone] = useState('friendly');
  const [chatMode, setChatMode] = useState('casual');
  const [avatar, setAvatar] = useState('default');
  const [visibility, setVisibility] = useState('public');
  const [activeSection, setActiveSection] = useState('personality');
  const [saved, setSaved] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([]);

  // Create particle effect
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 1,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed > 0 ? p.y - p.speed : 100,
        opacity: (p.y / 100) * 0.5
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate('/ai');
  };

  const handleSave = () => {
    // Create a unique slug from the name
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    // Create a new character object that conforms to the Character interface
    const newCharacter: Character = {
      id: Object.keys(characters).length + 1,
      name: name,
      role: title,
      image: avatar !== 'default' && avatar !== 'robot' && avatar !== 'human' && avatar !== 'anime' 
        ? avatar 
        : 'https://images.unsplash.com/photo-1675789652575-0a5d2425b6c2?auto=format&fit=crop&w=300&h=300',
      description: `A ${tone} AI buddy with ${chatMode} capabilities.`,
      tags: [tone, chatMode],
      languages: {
        primary: 'English',
        style: tone,
        greeting: greeting
      },
      personality: {
        traits: [tone, chatMode],
        quirks: [],
        emotionalStyle: tone,
        speakingStyle: tone,
        interests: [chatMode],
        background: `Created with ${visibility} visibility.`
      }
    };

    // Add the character to the characters object
    characters[slug] = newCharacter;
    
    // Show success message
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      // Navigate back to AI page with new character parameter
      navigate(`/ai?newCharacter=${encodeURIComponent(name)}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute rounded-full bg-gold/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="border-b border-zinc-700/20 bg-zinc-900/80 backdrop-blur-2xl fixed left-0 right-0 top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="text-gold hover:text-gold/80 transition-colors duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center border border-gold/20 relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Bot className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-500"></div>
              </div>
              <div>
                <span className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-400 to-gold">Create Buddy</span>
                <p className="text-zinc-400 text-sm">Customize your AI buddy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 animate-fade-in">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-6xl font-black text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold">
            Create Your Buddy
          </h1>

          {/* Navigation tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-black/30 backdrop-blur-md rounded-full p-1.5 shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-zinc-800/50">
              <button 
                onClick={() => setActiveSection('personality')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeSection === 'personality' 
                    ? 'bg-gradient-to-r from-gold to-amber-500 text-zinc-900 shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Personality
              </button>
              <button 
                onClick={() => setActiveSection('appearance')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeSection === 'appearance' 
                    ? 'bg-gradient-to-r from-gold to-amber-500 text-zinc-900 shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Appearance
              </button>
              <button 
                onClick={() => setActiveSection('behavior')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeSection === 'behavior' 
                    ? 'bg-gradient-to-r from-gold to-amber-500 text-zinc-900 shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Behavior
              </button>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-zinc-700/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 blur-xl opacity-20"></div>
            {/* Inner content with glass effect */}
            <div className="relative z-10 p-10">
              {activeSection === 'personality' && (
                <div className="space-y-8 animate-fade-slide-up">
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Sparkles className="w-7 h-7 text-gold mr-3" />
                    <span>Define Your AI's Personality</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 placeholder-zinc-500 shadow-inner"
                          placeholder="Enter AI name"
                        />
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Title</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={title} 
                          onChange={(e) => setTitle(e.target.value)} 
                          className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 placeholder-zinc-500 shadow-inner"
                          placeholder="Enter AI title"
                        />
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Greeting</label>
                    <div className="relative">
                      <textarea 
                        value={greeting} 
                        onChange={(e) => setGreeting(e.target.value)} 
                        className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 placeholder-zinc-500 shadow-inner"
                        placeholder="What will they say to start a conversation?"
                        rows={4}
                      />
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2 ml-2">This is what your AI will say when starting a new conversation.</p>
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="space-y-8 animate-fade-slide-up">
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Sparkles className="w-7 h-7 text-gold mr-3" />
                    <span>Visual Identity</span>
                  </h2>
                  
                  <div className="flex items-start gap-8">
                    <div className="flex-1 group">
                      <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Avatar</label>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAvatar(URL.createObjectURL(e.target.files[0]));
                            }
                          }} 
                          className="w-full bg-zinc-800/50 text-white rounded-xl p-4 file:mr-5 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-zinc-900 file:bg-gold hover:file:bg-amber-400 file:transition-all file:duration-300 file:cursor-pointer transition-all duration-300 shadow-inner"
                        />
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                      </div>
                      <p className="text-zinc-400 text-sm mt-2 ml-2">Choose an image to represent your AI.</p>
                    </div>
                    
                    <div className="w-40 h-40 relative">
                      {avatar !== 'default' && avatar !== 'robot' && avatar !== 'human' && avatar !== 'anime' ? (
                        <img 
                          src={avatar} 
                          alt="Avatar Preview" 
                          className="w-40 h-40 rounded-2xl object-cover border-2 border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-2xl bg-zinc-800/80 flex flex-col items-center justify-center border border-zinc-700/50 text-zinc-400">
                          <Bot className="w-16 h-16 mb-2 opacity-50" />
                          <span className="text-sm">No avatar selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Definition Visibility</label>
                    <div className="relative">
                      <select 
                        value={visibility} 
                        onChange={(e) => setVisibility(e.target.value)} 
                        className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC40NSA2LjQ1TDggMTBMIDExLjU1IDYuNCIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] shadow-inner"
                      >
                        <option value="public">Public - Everyone can see</option>
                        <option value="private">Private - Only I can see</option>
                        <option value="friends">Friends - Only my friends can see</option>
                      </select>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                    </div>
                    <p className="text-zinc-400 text-sm mt-2 ml-2">Controls who can view your AI's personality settings.</p>
                  </div>
                </div>
              )}

              {activeSection === 'behavior' && (
                <div className="space-y-8 animate-fade-slide-up">
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <Sparkles className="w-7 h-7 text-gold mr-3" />
                    <span>Interaction Style</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Conversation Tone</label>
                      <div className="relative">
                        <select 
                          value={tone} 
                          onChange={(e) => setTone(e.target.value)} 
                          className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC40NSA2LjQ1TDggMTBMIDExLjU1IDYuNCIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] shadow-inner"
                        >
                          <option value="friendly">Friendly</option>
                          <option value="professional">Professional</option>
                          <option value="witty">Witty</option>
                          <option value="casual">Casual</option>
                          <option value="empathetic">Empathetic</option>
                          <option value="enthusiastic">Enthusiastic</option>
                          <option value="sarcastic">Sarcastic</option>
                          <option value="formal">Formal</option>
                        </select>
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                      </div>
                      <p className="text-zinc-400 text-sm mt-2 ml-2">The emotional style of your AI's responses.</p>
                    </div>

                    <div className="group">
                      <label className="block text-gold font-medium mb-3 text-lg group-hover:text-amber-400 transition-colors">Chat Mode</label>
                      <div className="relative">
                        <select 
                          value={chatMode} 
                          onChange={(e) => setChatMode(e.target.value)} 
                          className="w-full bg-zinc-800/50 text-white rounded-xl p-4 pl-6 border border-zinc-700/50 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC40NSA2LjQ1TDggMTBMIDExLjU1IDYuNCIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] shadow-inner"
                        >
                          <option value="casual">Casual Chat - For everyday conversations</option>
                          <option value="tutor">Tutor Mode - For learning and educational support</option>
                          <option value="creative">Creative Mode - For storytelling and brainstorming</option>
                          <option value="problemSolving">Problem Solving - For analytical assistance</option>
                          <option value="entertainment">Entertainment - For fun and engaging activities</option>
                          <option value="therapy">Therapy - For emotional support and guidance</option>
                        </select>
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                      </div>
                      <p className="text-zinc-400 text-sm mt-2 ml-2">Specialized behavior for specific conversational goals.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gold/10 rounded-xl border border-gold/20">
                    <h3 className="font-medium text-gold mb-2 flex items-center">
                      <Check className="w-5 h-5 mr-2" /> Tip for best results
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      Matching the Conversation Tone with the Chat Mode creates a more consistent AI personality. For example, try "Enthusiastic" tone with "Entertainment" mode, or "Professional" tone with "Tutor" mode.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-10 relative">
                {saved && (
                  <div className="absolute right-0 bottom-16 bg-green-500/90 text-white px-6 py-3 rounded-xl animate-fade-slide-up flex items-center shadow-lg">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Settings saved successfully!</span>
                  </div>
                )}
                
                <div className="relative group">
                  <button 
                    onClick={handleSave} 
                    className="flex items-center bg-gradient-to-r from-gold to-amber-500 text-zinc-900 rounded-xl py-4 px-8 hover:from-gold/90 hover:to-amber-500/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-amber-500/20 hover:shadow-xl"
                  >
                    <span>Save Settings</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="absolute inset-0 rounded-xl -z-10 blur-md bg-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <button 
                  onClick={handleBack} 
                  className="bg-zinc-800/60 text-white rounded-xl py-4 px-8 hover:bg-zinc-700/60 transition-all duration-300 font-medium text-lg mr-4 border border-zinc-700/30 hover:shadow-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AISettings; 