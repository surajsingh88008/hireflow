import React, { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = () => {
    onSearch(query, sortBy);
  };

  return (
    <div className="w-full max-w mx-auto mb-6">
      <div className="bg-white shadow-sm rounded-xl p-2 flex items-center gap-2 border border-slate-200">

        {/* Input */}
        <div className="flex-1 flex items-center px-3 bg-slate-50 rounded-lg border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all">
          <SearchIcon size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 border-l pl-2 border-slate-200">
          <SlidersHorizontal size={16} className="text-slate-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm font-medium text-slate-600 py-2 outline-none cursor-pointer hover:text-blue-600 transition-colors"
          >
            <option value="">Sort By</option>
            <option value="experience">Experience</option>
            <option value="salary">Salary</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-bold active:scale-95 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;