import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bot, Camera, Edit, Link, Mail, MapPin, 
  Calendar, Shield, UserCircle, Plus, X, Image
} from 'lucide-react';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    username: "@alexthompson",
    bio: "Digital explorer and tech enthusiast. Always learning, always creating.",
    location: "San Francisco, CA",
    email: "alex@example.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300",
    joinDate: "March 2024",
    interests: ["Technology", "AI", "Design", "Music", "Travel"],
    stats: {
      companions: 12,
      communities: 8,
      contributions: 156
    }
  });

  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Side Menu */}
      <nav className="fixed left-0 top-0 h-screen w-56 bg-zinc-800/50 backdrop-blur-sm border-r border-zinc-800">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 relative overflow-hidden group">
              <span className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform">N</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 animate-shimmer" />
            </div>
            <span className="text-xl font-bold text-gold">Nexus</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-56">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <UserCircle className="w-8 h-8 text-gold" />
                  <span className="text-2xl font-bold text-gold">Profile</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isEditing
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gold text-zinc-900 hover:bg-gold/90'
                }`}
              >
                {isEditing ? 'Done' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8 flex items-center space-x-6">
              <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-900 overflow-hidden relative">
                <img
                  src={profileData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer p-4 rounded-full bg-gold text-zinc-900 hover:bg-gold/90 transition-colors">
                      <Camera className="w-6 h-6" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-medium text-zinc-300">Profile Picture</h3>
                  <p className="text-xs text-zinc-500">
                    Recommended: Square image, at least 300x300 pixels
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowImagePicker(true)}
                      className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors flex items-center space-x-2"
                    >
                      <Image className="w-4 h-4" />
                      <span>Choose from Album</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div>
              {/* Basic Info */}
              <div className="space-y-4 mb-8">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="block w-full text-2xl font-bold bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold"
                    />
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={e => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      className="block w-full text-gold bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    />
                    <textarea
                      value={profileData.bio}
                      onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      className="block w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-300 focus:outline-none focus:border-gold resize-none"
                      rows={3}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                    <p className="text-gold">{profileData.username}</p>
                    <p className="text-zinc-300">{profileData.bio}</p>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{profileData.stats.companions}</div>
                  <div className="text-zinc-400 text-sm">Nexus AI</div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{profileData.stats.communities}</div>
                  <div className="text-zinc-400 text-sm">Communities</div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{profileData.stats.contributions}</div>
                  <div className="text-zinc-400 text-sm">Contributions</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-2 text-zinc-300">
                  <MapPin className="w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={e => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 focus:outline-none focus:border-gold"
                    />
                  ) : (
                    <span>{profileData.location}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-zinc-300">
                  <Mail className="w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 focus:outline-none focus:border-gold"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-zinc-300">
                  <Calendar className="w-5 h-5" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map(interest => (
                    <div
                      key={interest}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg flex items-center space-x-2"
                    >
                      <span>{interest}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="text-zinc-500 hover:text-zinc-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={e => setNewInterest(e.target.value)}
                        placeholder="Add interest..."
                        className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                      />
                      <button
                        onClick={addInterest}
                        className="p-1 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Picker Modal */}
        {showImagePicker && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-zinc-900 rounded-xl w-[800px] max-h-[90vh] flex flex-col animate-fade-in">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Choose Profile Picture</h2>
                <button
                  onClick={() => setShowImagePicker(false)}
                  className="text-zinc-400 hover:text-zinc-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?auto=format&fit=crop&w=300&h=300',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300'
                  ].map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setProfileData(prev => ({ ...prev, image }));
                        setShowImagePicker(false);
                      }}
                      className="aspect-square rounded-lg overflow-hidden group relative"
                    >
                      <img
                        src={image}
                        alt={`Album image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-2 rounded-full bg-gold text-zinc-900">
                          <Plus className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;