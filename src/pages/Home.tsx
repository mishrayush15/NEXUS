import React, { useState, useEffect } from 'react';
import { Users, Bot, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainNavbar } from '../components/MainNavbar';
import { FeatureNavigation } from '../components/FeatureNavigation';
import { useSettings } from '../contexts/SettingsContext';

const showcaseItems = [
  {
    title: "Nexus AI",
    description: "Nexus AI: Redefining Chat with Intelligence!",
    icon: Bot,
    image:
      "https://i.pinimg.com/736x/25/70/d2/2570d220650e80e06a6bfcab4eaa6db4.jpg",
    route: "/ai",
  },
  {
    title: "AI Companions",
    description:
      "Join group chats and communities, connect with people who share your interests",
    icon: MessageSquare,
    image:
      "https://i.pinimg.com/originals/70/9c/67/709c6785848066f55d7a74af5d18cb3d.jpg",
    route: "/nexus-vibe",
  },
  {
    title: "Social Features",
    description: "Connect with like-minded individuals",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
    route: "/connect",
  },
];

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
   const { incognitoMode } = useSettings(); 
    const accentText = incognitoMode ? 'text-orange-500' : 'text-gold';
  const accentBg = incognitoMode ? 'bg-orange-500/10' : 'bg-gold/10';
  const accentBorder = incognitoMode ? 'border-orange-500/20' : 'border-gold/20';
  const accentGradient = incognitoMode
    ? 'from-orange-500/0 via-orange-500/10 to-orange-500/0'
    : 'from-gold/0 via-gold/10 to-gold/0';
  const mainBg = incognitoMode ? 'bg-black' : 'bg-zinc-900';
  const sideMenuBg = incognitoMode ? 'bg-black/80' : 'bg-zinc-800/50';
  const borderColor = incognitoMode ? 'border-black' : 'border-zinc-800';

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === 0 ? showcaseItems.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === showcaseItems.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen ${mainBg} flex flex-col`}>
      <MainNavbar />
      <nav className={`fixed left-0 top-0 h-screen w-56 ${sideMenuBg} backdrop-blur-sm border-r ${borderColor}`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className={`w-10 h-10 rounded-xl ${accentBg} flex items-center justify-center border ${accentBorder} relative overflow-hidden group`}>
              <span className={`text-2xl font-bold ${accentText} group-hover:scale-110 transition-transform`}>N</span>
              <div className={`absolute inset-0 bg-gradient-to-r ${accentGradient} animate-shimmer`} />
            </div>
            <span className={`text-xl font-bold ${accentText}`}>Nexus AI</span>
          </div>
        </div>
      </nav>


      {/* Hero Section with Showcase */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Slides */}
        {showcaseItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 to-zinc-900" />
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className={`text-8xl font-bold ${accentText} text-center mb-16 animate-fade-in`}>
        Nexus
      </h1>

          {/* Showcase Content */}
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {showcaseItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4 relative">
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="w-20 h-20 bg-gold/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                        <item.icon className="w-12 h-12 text-gold" />
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-4">
                        {item.title}
                      </h2>
                      <p className="text-xl text-zinc-300 mb-8">
                        {item.description}
                      </p>
                      <button
        onClick={() => navigate(item.route)}
        className={`relative z-10 px-8 py-3 ${accentBg.replace('/10', '')} ${accentText.replace('text-', 'bg-')} rounded-lg hover:${accentBg.replace('/10', '/90')} transition-colors font-medium`}
      >
        Explore Now
      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 transition-colors z-20">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 transition-colors z-20">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {showcaseItems.map((_, index) => (
                <button
  key={index}
  onClick={() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }}
  className={`w-2 h-2 rounded-full transition-all duration-300 ${
    index === currentSlide
      ? `w-8 ${accentBg.replace('/10', '')}`
      : 'bg-zinc-500 hover:bg-zinc-400'
  }`}
/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FeatureNavigation />
    </div>
  );
}

export default Home;
