import React, { useState, useRef, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterDropdownProps {
  filters: string[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const toggleFilter = (filter: string) => {
    const updated = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];
    onFilterChange(updated);
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFilterChange([]);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {selectedFilters.length > 0 && (
          <span className="bg-gold text-zinc-900 text-xs px-2 py-0.5 rounded-full ml-2">
            {selectedFilters.length}
          </span>
        )}
      </button>

      {/* Dropdown Panel (Rendered only when open) */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 z-50 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Filters</h3>
              {selectedFilters.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filters.map((filter) => (
                <label
                  key={filter}
                  className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                    className="form-checkbox h-4 w-4 text-gold rounded border-zinc-600 focus:ring-gold"
                  />
                  <span className="text-white">{filter}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedFilters.length > 0 && (
            <div className="p-3 bg-zinc-900 border-t border-zinc-700">
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="flex items-center space-x-1 bg-zinc-800 text-white px-2 py-1 rounded-full text-sm"
                  >
                    <span>{filter}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(filter);
                      }}
                      className="hover:text-zinc-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};