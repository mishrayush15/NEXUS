// src/components/CharacterCardSkeleton.tsx
import React from "react";

const CharacterCardSkeleton: React.FC = () => {
  return (
    <div className="w-full p-4 rounded-xl bg-zinc-800 animate-pulse space-y-4">
      <div className="w-full h-32 rounded-lg bg-zinc-700" />
      <div className="h-4 w-3/4 bg-zinc-700 rounded" />
      <div className="h-3 w-1/2 bg-zinc-700 rounded" />
    </div>
  );
};

export default CharacterCardSkeleton;
