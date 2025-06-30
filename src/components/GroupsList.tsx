import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../types/chat";
import {
  MessageSquare,
  Users,
  Activity,
  Sparkles,
  Flame,
  Clock,
} from "lucide-react";

interface GroupsListProps {
  filteredGroups: ChatRoom[];
  setSelectedGroup: (group: ChatRoom) => void;
  avatars: string[];
}

export default function GroupsList({
  filteredGroups,
  setSelectedGroup,
  avatars,
}: GroupsListProps) {
  const navigate = useNavigate();

  if (!filteredGroups.length) return null;

  return (
    <div className="space-y-6 mt-6">
      {/* Featured group */}
      <div className="mb-8 bg-zinc-800/60 rounded-2xl overflow-hidden border border-gold/10 shadow-lg shadow-gold/5 transform hover:scale-[1.01] transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/5 mix-blend-overlay"></div>
          <div className="h-48 bg-gradient-to-br from-gold/60 via-gold/30 to-transparent relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover opacity-30 mix-blend-overlay"></div>
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-gold font-medium">Featured</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 to-transparent p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-14 h-14 rounded-full bg-gold/30 flex items-center justify-center border border-gold/20">
                    <span className="font-bold text-2xl text-gold">
                      {filteredGroups[0].name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h2 className="text-2xl font-bold text-white mr-2">
                      {filteredGroups[0].name}
                    </h2>
                    {(filteredGroups[0].trending || 0) >= 8 && (
                      <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Flame className="w-3 h-3 mr-1" /> Hot
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-zinc-300 bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    {filteredGroups[0].members}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-3">
            <p className="text-zinc-300 leading-relaxed mb-4">
              {filteredGroups[0].description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {filteredGroups[0].messages.slice(0, 4).map((message, idx) => (
                  <div
                    key={`featured-avatar-${idx}`}
                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-zinc-900">
                    <img
                      src={message.avatar || avatars[idx % avatars.length]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {filteredGroups[0].members > 4 && (
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300 ring-2 ring-zinc-900">
                    +{filteredGroups[0].members - 4}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedGroup(filteredGroups[0]);
                  navigate(`/nexus-vibe/${filteredGroups[0].id}`);
                }}
                className="bg-gold hover:bg-gold/90 text-zinc-900 font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Join Conversation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredGroups.slice(1).map((group) => (
          <div
            key={group.id}
            onClick={() => {
              setSelectedGroup(group);
              navigate(`/nexus-vibe/${group.id}`);
            }}
            className="relative bg-zinc-800/70 rounded-xl overflow-hidden cursor-pointer border border-zinc-700/50 hover:border-gold/20 transition-all duration-300 flex flex-col group">
            {(group.trending || 0) > 7 && (
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute rotate-45 bg-gold text-xs font-bold py-1 text-zinc-900 text-center w-24 top-3 right-[-6px]">
                  HOT
                </div>
              </div>
            )}
            <div className="p-4 flex-1">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-gold/30 flex items-center justify-center mr-3 border border-gold/20 flex-shrink-0">
                  <span className="font-semibold text-gold">
                    {group.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-gold transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 mt-1 mb-3">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {group.members}
                </span>
                <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  {Math.floor(Math.random() * 10) + 1} active now
                </span>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-700/50">
                <div className="flex -space-x-2">
                  {group.messages.slice(0, 3).map((message, idx) => (
                    <div
                      key={`avatar-${idx}`}
                      className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-zinc-800">
                      <img
                        src={message.avatar || avatars[idx % avatars.length]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {group.messages.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300 ring-2 ring-zinc-800">
                      +{group.messages.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center text-xs text-zinc-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Active {Math.floor(Math.random() * 24) + 1}h ago</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-gold hover:bg-gold/90 text-zinc-900 font-medium px-4 py-2 rounded-lg transition-colors transform scale-95 group-hover:scale-100">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
