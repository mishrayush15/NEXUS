import React, { useEffect, useRef, useState } from 'react';
import { X, Users, Smile, Send } from 'lucide-react';
import { Socket } from 'socket.io-client';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface Group {
    id: string;
    name: string;
    description: string;
    members: number;
    messages: { alias: string; message: string; time: string }[];
    createdBy: string;
}

interface Props {
    group: Group;
    message: string;
    setMessage: (val: string) => void;
    alias: string;
    onBack: () => void;
    socket: Socket;
    onSend: () => void;
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}
const AnonymousChat: React.FC<Props> = ({ group, message, setMessage, alias, onBack, socket, onSend, setGroups }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);



    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [group.messages]);

    console.log("Created By:", group.createdBy, "| Alias:", alias);
    return (
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
            <div className="bg-zinc-900/80 border-b border-green-500/30 p-4 flex items-start justify-between flex-wrap sm:flex-nowrap">
                <div className="flex items-start space-x-3 w-full sm:w-auto">
                    <div className="w-10 h-10 bg-[#0c0c0c] rounded-lg flex items-center justify-center border border-green-500/30">
                        <span className="text-green-500 font-mono text-lg">{group.name.charAt(0)}</span>
                    </div>
                    <div className="space-y-1 max-w-lg">
                        <p className="text-xs text-zinc-500 font-mono">
                            Created by{' '}
                            <span className="text-green-400">
                                {group.createdBy === alias ? 'you' : group.createdBy}
                            </span>
                        </p>


                        <div className="text-zinc-500 flex items-center">
                            <Users className="w-4 h-4 mr-1 text-green-500/70" />
                            <span className="font-mono text-sm">{group.members} anonymous users</span>
                        </div>

                        <div className="text-sm text-zinc-200 font-mono mt-3">
                            <div className="bg-zinc-800/40 border border-green-500/20 rounded-md px-3 py-2 text-xs font-mono text-green-300 space-y-1">
                                {/* Invite Link Row */}
                                <div className="flex items-center justify-between">
                                    <span className="text-green-400">Invite</span>
                                    <button
                                        onClick={() => {
                                            const link = `${window.location.origin}/darkroom?group=${group.id}`;
                                            navigator.clipboard.writeText(link);
                                            alert('Group link copied!');
                                        }}
                                        className="text-[10px] bg-green-600/20 hover:bg-green-600/40 px-2 py-0.5 rounded transition"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="truncate text-green-200 bg-zinc-900 px-2 py-1 rounded">
                                    {`${window.location.origin}/darkroom?group=${group.id}`}
                                </div>

                                {/* Room ID Row */}
                                <div className="flex items-center justify-between pt-1 border-t border-zinc-700 mt-1">
                                    <span className="text-green-400">Room ID</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(group.id);
                                            alert('Room ID copied!');
                                        }}
                                        className="text-[10px] bg-green-600/20 hover:bg-green-600/40 px-2 py-0.5 rounded transition"
                                    >
                                        Copy
                                    </button>

                                </div>
                                <div className="truncate text-green-200 bg-zinc-900 px-2 py-1 rounded">
                                    {group.id}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-0 sm:ml-auto">
                    {group.createdBy === alias && (
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this group?')) {
                                    setGroups(prev => prev.filter(g => g.id !== group.id));
                                    onBack();
                                }
                            }}
                            className="p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-100 transition text-xs font-mono"
                        >
                            Delete Group
                        </button>
                    )}
                    <button
                        onClick={onBack}
                        className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-green-400 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

            </div>



            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
                {group.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.alias === alias ? 'justify-end' : 'justify-start'} max-w-[90%]`}>
                        <div className={`rounded-xl p-4 border font-mono ${msg.alias === alias ? 'bg-green-900/20 text-white border-green-500/40' : 'bg-[#0c0c0c] text-zinc-300 border-green-500/30'}`}>
                            <div className="flex items-center mb-1">
                                <span className={`text-xs font-semibold ${msg.alias === alias ? 'text-green-400' : 'text-green-500'}`}>{msg.alias}</span>
                                <span className="text-xs text-zinc-500 ml-2">{msg.time}</span>
                            </div>
                            <p className="text-sm break-words max-w-sm">{msg.message}</p>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-black border-t border-green-500/30">
                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend();
                                }
                            }}
                            placeholder="Type anonymously..."
                            className="w-full px-4 py-3 bg-[#0c0c0c] border border-green-500/30 rounded-lg text-white placeholder-green-500/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-10 font-mono"
                        />

                        <div >
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-green-500"
                            >
                                <Smile className="w-5 h-5" />
                            </button>

                            {showEmojiPicker && (
                                <div className="absolute bottom-12 right-0 z-50">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={(emoji: any) => {
                                            setMessage(message + (emoji.native || ''));
                                            setShowEmojiPicker(false);
                                        }}
                                        theme="dark"
                                    />

                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onSend}
                        disabled={!message.trim()}
                        className={`p-3 rounded-lg text-white ${message.trim() ? 'bg-green-700 hover:bg-green-600' : 'bg-green-900/20 text-green-500/50 cursor-not-allowed'}`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-between items-center mt-2 px-2">
                    <div className="text-xs text-zinc-500 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        <span className="font-mono">Speaking as: <span className="text-green-500">{alias}</span></span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">
                        {Math.floor(Math.random() * 20) + 5} anonymous users online
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnonymousChat;
