import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GroupChats() {
  const navigate = useNavigate();

  // Redirect to home since this feature is removed
  useEffect(() => {
    navigate('/ai');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Group Chats Functionality Removed</h1>
        <p className="text-zinc-400 mb-6">The Group Chats feature is no longer available in Nexus AI.</p>
        <button 
          onClick={() => navigate('/ai')}
          className="px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 font-medium"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default GroupChats; 