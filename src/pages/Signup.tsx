import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await signup(email, password, name);
    } catch (error) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[480px] p-8 flex flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-16">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 relative overflow-hidden group">
            <span className="text-4xl font-bold text-gold group-hover:scale-110 transition-transform">N</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 animate-shimmer" />
          </div>
          <span className="text-3xl font-bold text-gold">Nexus</span>
        </div>

        {/* Form */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-zinc-400 mb-8">Join Nexus and explore a new world of possibilities</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold pr-10"
                  placeholder="Enter your name"
                />
                <User className="absolute right-3 top-3.5 text-zinc-500 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold pr-10"
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-3 top-3.5 text-zinc-500 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-zinc-500 hover:text-zinc-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold pr-10"
                  placeholder="Confirm your password"
                />
                <Lock className="absolute right-3 top-3.5 text-zinc-500 w-5 h-5" />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-gold/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Nexus. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Hero Image */}
      <div className="hidden lg:block flex-1 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 h-full flex flex-col justify-center max-w-lg">
          <Bot className="w-12 h-12 text-gold mb-8" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Next Generation of Digital Interaction
          </h2>
          <p className="text-lg text-zinc-300">
            Create your account to unlock a world of AI companions, immersive content, and vibrant communities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;