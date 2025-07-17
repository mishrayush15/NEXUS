// src/components/CampusConnect.tsx
import React, { useState } from 'react';
import { GraduationCap, Bell, Info } from 'lucide-react';

interface College {
    id: string;
    name: string;
    description: string;
    logo: string;
}

interface Props {
    colleges: College[];
}

const VibecampusConnect: React.FC<Props> = ({ colleges }) => {
    const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Example auth logic: first name is "john"
        if (password.toLowerCase() === 'john') {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center">
                    <GraduationCap className="w-8 h-8 text-gold mr-3" />
                    <h2 className="text-2xl font-bold text-white">Campus Connect</h2>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                        <Bell className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300">
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {!isAuthenticated ? (
                    <div className="max-w-4xl mx-auto">
                        {!selectedCollege ? (
                            // College selection
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-4">Select Your College</h3>
                                <p className="text-zinc-400 mb-8">Choose your college to access campus features</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {colleges.map((college) => (
                                        <button
                                            key={college.id}
                                            onClick={() => setSelectedCollege(college.id)}
                                            className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left transition-all duration-300 hover:border-gold/30 group"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="w-16 h-16 bg-white rounded-lg p-2 mr-4">
                                                    <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                                                        {college.name}
                                                    </h4>
                                                    <p className="text-sm text-zinc-400">{college.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-gold text-sm">
                                                <span>Click to continue</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Login form
                            <div className="max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto mb-4">
                                        <img
                                            src={colleges.find(c => c.id === selectedCollege)?.logo}
                                            alt="College Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {colleges.find(c => c.id === selectedCollege)?.name}
                                    </h3>
                                    <p className="text-zinc-400">Enter your credentials to continue</p>
                                </div>

                                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
                                    <form onSubmit={handleLogin}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                                    Enrollment Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={enrollmentNumber}
                                                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                                    placeholder="Enter your enrollment number"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-400 mb-1">
                                                    Password (Your First Name)
                                                </label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                                                    placeholder="Enter your first name"
                                                    required
                                                />
                                            </div>

                                            {authError && (
                                                <div className="text-red-500 text-sm">{authError}</div>
                                            )}

                                            <div className="flex items-center justify-between pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCollege(null)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    ← Back to Colleges
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-gold hover:bg-gold/90 text-zinc-900 font-medium rounded-lg transition-colors"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Authenticated View
                    <div className="text-center text-zinc-400">
                        <h3 className="text-2xl font-bold text-white mb-4">Welcome to Campus Connect</h3>
                        <p>You are now authenticated as a student of {colleges.find(c => c.id === selectedCollege)?.name}</p>
                        <p className="mt-2">Campus features coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VibecampusConnect;
