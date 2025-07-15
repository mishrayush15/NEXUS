// src/pages/darkroom/DarkRoom.tsx
import React, { useState, useEffect } from 'react';
import { X, Moon } from 'lucide-react';
import AnonymousChat from './AnonymousChat';
import AnonymousSidebar from './AnonymousSidebar';
import { generateAnonymousGroups } from './groupData';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

interface Group {
    id: string;
    name: string;
    description: string;
    members: number;
    messages: { alias: string; message: string; time: string }[];
    createdBy: string;
}

const socket: Socket = io('http://localhost:5000');

const DarkRoom = ({ alias, onClose }: { alias: string; onClose: () => void }) => {
    const [groups, setGroups] = useState<Group[]>(() => {
        const saved = localStorage.getItem('darkroom-groups');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map((g: any) => ({
                    ...g,
                    createdBy: g.createdBy || 'system', // 👈 fallback if missing
                }));
            } catch (e) {
                console.error("Failed to parse saved groups:", e);
            }
        }
        return generateAnonymousGroups();
    });
    const refreshGroups = () => {
        const saved = localStorage.getItem('darkroom-groups');
        const parsed = saved ? JSON.parse(saved) : [];
        setGroups(parsed);
    };


    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDesc, setNewGroupDesc] = useState('');
    const [searchParams] = useSearchParams();
    const [showJoinInput, setShowJoinInput] = useState(false);
    const [joinGroupId, setJoinGroupId] = useState('');

    useEffect(() => {
        localStorage.setItem('darkroom-groups', JSON.stringify(groups));
    }, [groups]);

    // console.log(groups);


    useEffect(() => {
        const groupIdFromURL = searchParams.get('group');
        if (groupIdFromURL) {
            const found = groups.find(g => g.id === groupIdFromURL);
            if (found) {
                setSelectedGroup(found);
            } else {
                console.warn('Group not found from URL:', groupIdFromURL);
            }
        }
    }, [groups, searchParams]);

    useEffect(() => {
        if (selectedGroup) {
            socket.emit('join-room', selectedGroup.id);
        }
    }, [selectedGroup]);

    useEffect(() => {
        const handleReceiveMessage = (data: { groupId: string; alias: string; message: string; time: string }) => {
            const { groupId, alias, message, time } = data;
            setGroups(prev => {
                const updated = prev.map(g => {
                    if (g.id === groupId) {
                        return {
                            ...g,
                            messages: [...g.messages, { alias, message, time }]
                        };
                    }
                    return g;
                });
                if (selectedGroup?.id === groupId) {
                    const updatedGroup = updated.find(g => g.id === groupId);
                    if (updatedGroup) setSelectedGroup(updatedGroup);
                }
                return updated;
            });
        };
        socket.on('receive-message', handleReceiveMessage);
        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [selectedGroup?.id]);

    const handleSend = () => {
        if (!message.trim() || !selectedGroup) return;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msg = { groupId: selectedGroup.id, alias, message, time };
        socket.emit('send-message', msg);
        setMessage('');
    };

    return (
        <div className="fixed inset-0 z-40 bg-black flex flex-col">
            <div className="p-4 border-b border-green-500/30 bg-zinc-900/90 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white mr-4"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center">
                        <Moon className="w-5 h-5 text-green-500 mr-2" />
                        <h2 className="text-lg font-bold text-white">Dark Room</h2>
                    </div>
                </div>
                <div className="bg-green-900/30 px-3 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                    <span className="text-green-500 text-sm font-mono">Anonymous Mode</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <AnonymousSidebar
                    groups={groups}
                    selectedId={selectedGroup?.id || null}
                    setSelectedId={(id) => {
                        const found = groups.find(g => g.id === id);
                        if (found) setSelectedGroup(found);
                    }}
                    alias={alias}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    refreshGroups={refreshGroups}

                />

                {selectedGroup ? (
                    <AnonymousChat
                        group={selectedGroup}
                        message={message}
                        setMessage={setMessage}
                        alias={alias}
                        onBack={() => setSelectedGroup(null)}
                        socket={socket}
                        onSend={handleSend}
                        setGroups={setGroups}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center p-6 w-full max-w-md">
                            <div className="w-20 h-20 bg-[#0c0c0c] rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                                <Moon className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-400 mb-3 font-mono">Welcome to the Dark Room</h2>
                            <p className="text-zinc-400 mb-6 font-mono text-sm">
                                Select an anonymous group from the sidebar or create/join a new one.
                            </p>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                                >
                                    + Create Group
                                </button>
                                <button
                                    onClick={() => setShowJoinInput(true)}
                                    className="px-4 py-2 bg-zinc-800 text-green-400 rounded hover:bg-zinc-700 text-sm"
                                >
                                    🔗 Join via Link
                                </button>
                            </div>

                            {showJoinInput && (
                                <div className="mt-4 space-y-2 text-left">
                                    <input
                                        type="text"
                                        value={joinGroupId}
                                        onChange={(e) => setJoinGroupId(e.target.value)}
                                        placeholder="Paste group link or ID"
                                        className="w-full px-3 py-2 rounded bg-zinc-800 text-white font-mono"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowJoinInput(false)}
                                            className="px-3 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-600 text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                let id = joinGroupId.trim();
                                                if (id.includes('?group=')) {
                                                    try {
                                                        const url = new URL(id);
                                                        id = url.searchParams.get('group') || '';
                                                    } catch {
                                                        alert('Invalid link');
                                                        return;
                                                    }
                                                }
                                                if (!id) return alert('Enter valid group ID or link');
                                                const found = groups.find(g => g.id === id);
                                                if (found) {
                                                    setSelectedGroup(found);
                                                    setShowJoinInput(false);
                                                    setJoinGroupId('');
                                                } else {
                                                    alert('Group not found!');
                                                }
                                            }}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                                        >
                                            Join
                                        </button>
                                    </div>
                                </div>
                            )}

                            {showForm && (
                                <div className="mt-6 space-y-4 text-left">
                                    <input
                                        type="text"
                                        placeholder="Group Name"
                                        value={newGroupName}
                                        onChange={(e) => setNewGroupName(e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={newGroupDesc}
                                        onChange={(e) => setNewGroupDesc(e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowForm(false)}
                                            className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (!newGroupName.trim()) return alert('Enter group name!');
                                                const newGroup: Group = {
                                                    id: crypto.randomUUID(),
                                                    name: newGroupName.trim(),
                                                    description: newGroupDesc.trim(),
                                                    members: 1,
                                                    messages: [],
                                                    createdBy: alias,
                                                };
                                                setGroups(prev => [...prev, newGroup]);
                                                setSelectedGroup(newGroup);
                                                setShowForm(false);
                                                setNewGroupName('');
                                                setNewGroupDesc('');
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 text-sm"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DarkRoom;
