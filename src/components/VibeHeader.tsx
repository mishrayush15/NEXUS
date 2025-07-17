import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setIsCreateGroupOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setIsCreateGroupOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky -mx-5 top-0 z-20 bg-zinc-900 shadow-md shadow-black/30">
      <div className="px-6 py-3 flex items-center justify-between space-x-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groups..."
            className="w-full pl-10 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        {/* Create Group Button */}
        <button
          onClick={() => setIsCreateGroupOpen(true)}
          className="px-4 py-2.5 bg-gold hover:bg-gold/90 rounded-lg text-zinc-900 font-medium transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Create Group</span>
        </button>

        {/* Profile Icon Button */}
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user w-6 h-6 text-zinc-400">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
