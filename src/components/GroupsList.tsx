import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../types/chat";
import {
  MessageSquare,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
} from "lucide-react";

interface GroupsListProps {
  filteredGroups: ChatRoom[];
  setSelectedGroup: (group: ChatRoom) => void;
  avatars: string[];
}

function TrendingTag({ trending }: { trending: number }) {
  let label = "";
  let bgColor = "";

  if (trending > 7) {
    label = "HOT";
    bgColor = "bg-red-500";
  } else if (trending > 3) {
    label = "ACTIVE";
    bgColor = "bg-yellow-400";
  } else {
    label = "CHILL";
    bgColor = "bg-blue-400";
  }

  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
      <div
        className={`absolute rotate-45 ${bgColor} text-xs font-bold py-1 text-white text-center w-24 top-3 right-[-6px]`}>
        {label}
      </div>
    </div>
  );
}

function GroupSection({
  title,
  groups,
  page,
  setPage,
  groupsPerPage,
  totalPages,
  setSelectedGroup,
  avatars,
}: {
  title: string;
  groups: ChatRoom[];
  page: number;
  setPage: (page: number) => void;
  groupsPerPage: number;
  totalPages: number;
  setSelectedGroup: (group: ChatRoom) => void;
  avatars: string[];
}) {
  const navigate = useNavigate();
  const paginatedGroups = groups.slice(
    page * groupsPerPage,
    (page + 1) * groupsPerPage
  );

  const getTitleColor = (title: string) => {
    if (title === "HOT CHANNELS") return "text-red-400";
    if (title === "ACTIVE CHANNELS") return "text-yellow-400";
    if (title === "CHILL CHANNELS") return "text-blue-400";
    return "text-white";
  };

  return (
    <>
      <div className="flex items-center justify-center my-6">
        <div className="border-t border-zinc-700 flex-grow mr-4"></div>
        <h2 className={`text-lg font-semibold ${getTitleColor(title)}`}>
          {title}
        </h2>
        <div className="border-t border-zinc-700 flex-grow ml-4"></div>
      </div>

      <div className="relative">
        <button
          onClick={() => setPage(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-full disabled:opacity-30">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginatedGroups.map((group) => (
            <div
              key={group.id}
              className="relative h-[260px] perspective-1000 group">
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* FRONT FACE */}
                <div className="absolute w-full h-full backface-hidden bg-zinc-800/70 rounded-xl border border-zinc-700/50 p-6 flex flex-col items-center justify-center text-center">
                  <TrendingTag trending={group.trending || 0} />
                  <div className="w-16 h-16 rounded-full bg-gold/30 border border-gold/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-gold">
                      {group.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {group.name}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {group.description}
                  </p>
                </div>

                {/* BACK FACE */}
                <div className="absolute w-full h-full backface-hidden bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6 flex flex-col items-center justify-center text-center space-y-3 transform rotate-y-180">
                  <div>
                    <span className="text-xs text-zinc-400">Total Members</span>
                    <div className="text-base text-white font-medium">
                      {group.members}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400">Category</span>
                    <div className="text-base text-white font-medium">
                      {group.category || "General"}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400">Time Spent</span>
                    <div className="text-base text-white font-medium">
                      {group.timeSpent || "12h+"}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGroup(group);
                      navigate(`/nexus-vibe/${group.id}`);
                    }}
                    className="mt-2 bg-gold hover:bg-gold/90 text-zinc-900 font-medium px-4 py-2 rounded-lg transition-transform scale-95 hover:scale-100">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-full disabled:opacity-30">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default function GroupsList({
  filteredGroups,
  setSelectedGroup,
  avatars,
}: GroupsListProps) {
  const hotGroups = filteredGroups
    .slice(1)
    .filter((g) => (g.trending || 0) > 7);
  const activeGroups = filteredGroups
    .slice(1)
    .filter((g) => (g.trending || 0) <= 7 && (g.trending || 0) > 3);
  const chillGroups = filteredGroups
    .slice(1)
    .filter((g) => (g.trending || 0) <= 3);

  const hotGroupsPerPage = 6;
  const activeGroupsPerPage = 6;
  const chillGroupsPerPage = 6;

  const [hotPage, setHotPage] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [chillPage, setChillPage] = useState(0);

  const totalHotPages = Math.ceil(hotGroups.length / hotGroupsPerPage);
  const totalActivePages = Math.ceil(activeGroups.length / activeGroupsPerPage);
  const totalChillPages = Math.ceil(chillGroups.length / chillGroupsPerPage);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 mt-6">
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

      <GroupSection
        title="HOT CHANNELS"
        groups={hotGroups}
        page={hotPage}
        setPage={setHotPage}
        groupsPerPage={hotGroupsPerPage}
        totalPages={totalHotPages}
        setSelectedGroup={setSelectedGroup}
        avatars={avatars}
      />
      <GroupSection
        title="ACTIVE CHANNELS"
        groups={activeGroups}
        page={activePage}
        setPage={setActivePage}
        groupsPerPage={activeGroupsPerPage}
        totalPages={totalActivePages}
        setSelectedGroup={setSelectedGroup}
        avatars={avatars}
      />
      <GroupSection
        title="CHILL CHANNELS"
        groups={chillGroups}
        page={chillPage}
        setPage={setChillPage}
        groupsPerPage={chillGroupsPerPage}
        totalPages={totalChillPages}
        setSelectedGroup={setSelectedGroup}
        avatars={avatars}
      />
    </div>
  );
}
