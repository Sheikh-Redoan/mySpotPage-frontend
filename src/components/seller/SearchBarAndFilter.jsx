// src/components/SearchBarAndFilter.jsx
import React from "react";
import SearchIcon from "./SearchIcon";
import FilterIcon from "./FilterIcon";
import PlusIcon from "./PlusIcon";

const SearchBarAndFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="self-stretch flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <div className="w-80 bg-white flex flex-col justify-start items-start gap-1">
          <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <button className="w-24 h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200">
          <FilterIcon className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 text-sm font-normal font-['Golos_Text'] leading-tight">
            Filter
          </span>
        </button>
      </div>
      <button className="h-10 px-3 py-2 bg-violet-600 rounded-lg flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors duration-200">
        <PlusIcon className="w-5 h-5 text-white" />
        <span className="text-white text-sm font-semibold font-['Golos_Text'] leading-tight">
          Add Staff
        </span>
      </button>
    </div>
  );
};

export default SearchBarAndFilter;