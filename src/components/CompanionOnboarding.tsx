import React, { useState } from 'react';
import { 
  User, Heart, Brain, Music, Book, Code, 
  Coffee, Gamepad, Camera, Palette, 
  ArrowRight, ArrowLeft, Sparkles, MessageSquare
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CompanionOnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  name: string;
  interests: string[];
  personality: string[];
  communicationStyle: string;
  preferredTopics: string[];
}

const steps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Nexus Companion',
    description: 'Let\'s find your perfect AI companion. We\'ll ask you a few questions to understand your preferences better.',
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 'name',
    title: 'What should we call you?',
    description: 'This helps us personalize your experience.',
    icon: <User className="w-8 h-8" />
  },
  {
    id: 'interests',
    title: 'What are your interests?',
    description: 'Select topics that interest you the most.',
    icon: <Heart className="w-8 h-8" />
  },
  {
    id: 'personality',
    title: 'What\'s your personality like?',
    description: 'Choose traits that best describe you.',
    icon: <Brain className="w-8 h-8" />
  },
  {
    id: 'communication',
    title: 'How do you prefer to communicate?',
    description: 'Select your preferred communication style.',
    icon: <MessageSquare className="w-8 h-8" />
  }
];

const interestOptions = [
  { id: 'music', label: 'Music', icon: <Music className="w-5 h-5" /> },
  { id: 'reading', label: 'Reading', icon: <Book className="w-5 h-5" /> },
  { id: 'technology', label: 'Technology', icon: <Code className="w-5 h-5" /> },
  { id: 'coffee', label: 'Coffee & Food', icon: <Coffee className="w-5 h-5" /> },
  { id: 'gaming', label: 'Gaming', icon: <Gamepad className="w-5 h-5" /> },
  { id: 'photography', label: 'Photography', icon: <Camera className="w-5 h-5" /> },
  { id: 'art', label: 'Art & Design', icon: <Palette className="w-5 h-5" /> }
];

const personalityTraits = [
  { id: 'analytical', label: 'Analytical' },
  { id: 'creative', label: 'Creative' },
  { id: 'empathetic', label: 'Empathetic' },
  { id: 'adventurous', label: 'Adventurous' },
  { id: 'organized', label: 'Organized' },
  { id: 'humorous', label: 'Humorous' },
  { id: 'introverted', label: 'Introverted' },
  { id: 'extroverted', label: 'Extroverted' }
];

const communicationStyles = [
  { id: 'casual', label: 'Casual & Friendly' },
  { id: 'professional', label: 'Professional & Formal' },
  { id: 'direct', label: 'Direct & Straightforward' },
  { id: 'detailed', label: 'Detailed & Thorough' }
];

export function CompanionOnboarding({ onComplete }: CompanionOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: '',
    interests: [],
    personality: [],
    communicationStyle: '',
    preferredTopics: []
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handlePersonalityToggle = (traitId: string) => {
    setPreferences(prev => ({
      ...prev,
      personality: prev.personality.includes(traitId)
        ? prev.personality.filter(id => id !== traitId)
        : [...prev.personality, traitId]
    }));
  };

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{step.title}</h2>
            <p className="text-zinc-400 mb-8">{step.description}</p>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gold hover:bg-gold/90 text-zinc-900 font-medium rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        );

      case 'name':
        return (
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h2>
            <p className="text-zinc-400 mb-8 text-center">{step.description}</p>
            <input
              type="text"
              value={preferences.name}
              onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
        );

      case 'interests':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h2>
            <p className="text-zinc-400 mb-8 text-center">{step.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interestOptions.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    preferences.interests.includes(interest.id)
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {interest.icon}
                    <span>{interest.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'personality':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h2>
            <p className="text-zinc-400 mb-8 text-center">{step.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personalityTraits.map(trait => (
                <button
                  key={trait.id}
                  onClick={() => handlePersonalityToggle(trait.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    preferences.personality.includes(trait.id)
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-gold/50'
                  }`}
                >
                  {trait.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h2>
            <p className="text-zinc-400 mb-8 text-center">{step.description}</p>
            <div className="space-y-4">
              {communicationStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setPreferences(prev => ({ ...prev, communicationStyle: style.id }))}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    preferences.communicationStyle === style.id
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-gold/50'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-zinc-800 rounded-2xl p-8 shadow-xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 bg-zinc-700 rounded-full">
            <div
              className="h-full bg-gold rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-zinc-500">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
        </div>

        {/* Step content */}
        {renderStep()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          <div className="ml-auto">
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !preferences.name) ||
                (currentStep === 2 && preferences.interests.length === 0) ||
                (currentStep === 3 && preferences.personality.length === 0) ||
                (currentStep === 4 && !preferences.communicationStyle)
              }
              className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
                (currentStep === 1 && !preferences.name) ||
                (currentStep === 2 && preferences.interests.length === 0) ||
                (currentStep === 3 && preferences.personality.length === 0) ||
                (currentStep === 4 && !preferences.communicationStyle)
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-gold hover:bg-gold/90 text-zinc-900'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 