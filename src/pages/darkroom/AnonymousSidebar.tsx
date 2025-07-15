// src/pages/darkroom/AnonymousSidebar.tsx
import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';

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
    selectedId: string | null;
    setSelectedId: (id: string) => void;
    alias: string;
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    refreshGroups: () => void;
}


const AnonymousSidebar: React.FC<Props> = ({ groups, selectedId, setSelectedId, alias, searchTerm, setSearchTerm, refreshGroups }) => {
    const [isSpinning, setIsSpinning] = useState(false);

    const handleRefreshClick = () => {
        setIsSpinning(true);
        refreshGroups(); // you already passed this function
        setTimeout(() => setIsSpinning(false), 500); // stop spinning after 0.5s
    };

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-64 bg-zinc-900/80 border-r border-green-500/30 flex flex-col">
            <div className="p-4 border-b border-green-500/30">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500/50" />
                    <input
                        type="text"
                        placeholder="Search anonymous groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 py-2 bg-[#0c0c0c] border border-green-500/30 rounded-lg text-zinc-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-green-500/50 text-sm font-mono"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                <div className="flex items-center justify-between text-xs font-medium text-green-500/80 px-2 py-1 font-mono">
                    <span>ANONYMOUS GROUPS</span>
                    <button
                        onClick={handleRefreshClick}
                        title="Refresh"
                        className="text-green-500 hover:text-green-400 transition"
                    >
                        <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {filteredGroups.map(group => (
                    <button
                        key={group.id}
                        onClick={() => setSelectedId(group.id)}
                        className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-sm transition-colors font-mono ${selectedId === group.id
                            ? 'bg-green-900/30 text-green-300'
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-green-300'}`}
                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="truncate">{group.name}</span>
                        <span className="ml-auto text-xs bg-[#0c0c0c] text-green-500 rounded-full px-1.5 min-w-[1.25rem] flex justify-center border border-green-500/30">
                            {group.members}
                        </span>
                    </button>
                ))}
            </div>

            <div className="p-3 border-t border-green-500/30">
                <div className="bg-[#0c0c0c] rounded-lg p-3 text-sm border border-green-500/30">
                    <div className="flex items-center mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-green-500 font-mono">Your Alias</span>
                    </div>
                    <div className="px-2 py-1 bg-zinc-900 rounded-md text-green-300 font-mono border border-green-500/40">
                        {alias || 'Unknown'}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnonymousSidebar;
