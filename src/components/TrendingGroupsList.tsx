import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, MessageSquare } from "lucide-react";
import { ChatRoom } from "../types/chat";

interface TrendingGroupsListProps {
  getTrendingGroups: () => ChatRoom[];
  setSelectedGroup: (group: ChatRoom) => void;
  formatTimeSpent: (minutes: number) => string;
  getAvgTimePerUser: (group: ChatRoom) => number;
}

export default function TrendingGroupsList({
  getTrendingGroups,
  setSelectedGroup,
  formatTimeSpent,
  getAvgTimePerUser,
}: TrendingGroupsListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mt-6">
      {getTrendingGroups().map((group, index) => (
        <div
          key={group.id}
          onClick={() => {
            setSelectedGroup(group);
            navigate(`/nexus-vibe/${group.id}`);
          }}
          className="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-700/80 transition-colors border border-zinc-700">
          <div className="flex flex-col md:flex-row">
            {/* Left side */}
            <div className="flex p-4 flex-1">
              <div className="flex items-start mr-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/20 text-gold font-bold text-2xl">
                  #{index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-white font-semibold text-lg">
                    {group.name}
                  </h3>
                  {(group.trending || 0) >= 8 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gold/20 text-gold text-xs rounded-md flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> Hot
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 mb-2 line-clamp-1">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full">
                    {group.category}
                  </span>
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {group.members}
                  </span>
                  <span className="text-xs text-zinc-300 bg-zinc-700/60 px-2 py-0.5 rounded-full flex items-center">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {group.messages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="bg-zinc-700/50 p-4 flex md:flex-col justify-between items-end md:w-48 md:border-l border-zinc-700">
              <div className="text-center md:w-full">
                <div className="text-lg font-bold text-gold">
                  {formatTimeSpent(group.timeSpent || 0)}
                </div>
                <div className="text-xs text-zinc-400">Daily active time</div>
              </div>
              <div className="text-center md:w-full md:mt-3">
                <div className="text-md font-semibold text-zinc-300">
                  {formatTimeSpent(getAvgTimePerUser(group))}
                </div>
                <div className="text-xs text-zinc-400">Avg per user</div>
              </div>
            </div>
          </div>

          {/* Trending indicator bar */}
          <div className="h-1 bg-zinc-700">
            <div
              className="h-full bg-gold"
              style={{ width: `${(group.trending || 0) * 10}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
