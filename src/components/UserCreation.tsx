import { User, Heart, Eye } from "lucide-react";
import { Character } from "../utils/characters";

interface CharacterCardData {
  slug: string;
  character: Character;
  views: number;
  likes: number;
}

interface UserCreationProps {
  title?: string;
  characters: CharacterCardData[];
  icon?: React.ReactNode;
  favorites?: Set<string>;
  toggleFavorite: (e: React.MouseEvent, slug: string) => void;
  handleLike: (e: React.MouseEvent, slug: string) => void;
}

const UserCreation = ({
  title = "Your Creations",
  characters = [],
  icon = <User className="w-5 h-5 text-white" />,
  favorites = new Set(),
  toggleFavorite,
  handleLike,
}: UserCreationProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800/80 mr-3">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="h-1 w-12 mt-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <p className="text-zinc-400 text-sm mt-1">
            Characters that you created
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {characters.map(({ slug, character, views, likes }) => (
          <div
            key={slug}
            className="group relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:from-blue-900/40 hover:to-purple-900/40 transition-all duration-300">
            <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <User className="w-3 h-3 mr-1" />
              CREATED
            </div>
            <div className="aspect-[2/3] relative overflow-hidden">
              <img
                src={
                  character.image ||
                  "https://i.pinimg.com/736x/8d/45/d7/8d45d7182a790992f538de186944f79c.jpg"
                }
                alt={character.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
            <button
              className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-colors bg-black/40 text-white hover:bg-black/60"
              onClick={(e) => toggleFavorite(e, slug)}>
              <Heart
                className={`w-4 h-4 ${
                  favorites?.has(slug) ? "fill-current text-red-400" : ""
                }`}
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <h3 className="text-white text-xl font-bold mb-1">
                {character.name}
              </h3>
              <p className="text-purple-400 text-sm mb-3">
                {character.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-zinc-300 text-sm">
                  <button
                    onClick={(e) => handleLike(e, slug)}
                    className="flex items-center hover:text-blue-400 transition-colors">
                    <Heart className="w-4 h-4 mr-1 text-blue-400" />
                    <span>{likes}</span>
                  </button>
                </div>
                <div className="flex items-center text-zinc-300 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{views} views</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                Edit Character
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCreation;
