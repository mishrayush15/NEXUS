import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

export function ProfileButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/profile')}
      className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center"
    >
      <UserCircle className="w-6 h-6 text-zinc-400" />
    </button>
  );
}