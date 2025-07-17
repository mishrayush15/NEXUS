// src/pages/darkroom/AnonymousWelcome.tsx
import React from 'react';
import { Moon, Users } from 'lucide-react';

interface Group {
    id: string;
    name: string;
    description: string;
    members: number;
    messages: { alias: string; message: string; time: string }[];
    createdBy: string;
}

interface Props {
    groups: Group[];
    onSelect: (id: string) => void;
    alias: string;
}

const AnonymousWelcome: React.FC<Props> = ({ groups, onSelect, alias }) => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center md p-6">
                <div className="w-20 h-20 bg-[#0c0c0c] rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                    <Moon className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-3 font-mono">Welcome to the Dark Room</h2>
                <p className="text-zinc-400 mb-6 font-mono text-sm">
                    Select an anonymous group from the sidebar to join the conversation. Your identity will remain hidden as <span className="text-green-500 font-mono">{alias}</span>.
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {groups.map(group => (
                        <button
                            key={group.id}
                            onClick={() => onSelect(group.id)}
                            className="bg-[#0c0c0c] hover:bg-green-900/20 border border-green-500/30 rounded-lg p-3 text-left transition-colors"
                        >
                            <h3 className="text-green-400 font-medium mb-1 font-mono">{group.name}</h3>
                            <p className="text-zinc-300 mb-3 line-clamp-2 text-sm">{group.description}</p>
                            <div className="mt-2 text-xs text-green-500 font-mono flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {group.members} anonymous users
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnonymousWelcome;
