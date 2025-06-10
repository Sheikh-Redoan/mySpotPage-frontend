// src/components/seller/SearchBarAndFilter.jsx
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import FilterModal from "./FilterModal";
import AddStaffModal from "./AddStaffModal"; // Import the new AddStaffModal

const SearchBarAndFilter = ({
  searchTerm,
  onSearchChange,
  allStaffData,
  onApplyFilters,
  currentFilters,
  onAddStaff, // New prop to handle adding staff
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false); // New state for AddStaffModal

  return (
    <div className="self-stretch flex justify-between items-center relative max-[475px]:flex-col max-[475px]:gap-2 max-[475px]:items-start">
      <div className="flex justify-start items-center gap-2 max-[475px]:w-full">
        <div className="w-80 bg-white flex flex-col justify-start items-start gap-1 max-[475px]:w-full max-[475px]:gap-0">
          <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2 max-[475px]:text-[12px] max-[475px]:p-1 max-[475px]:justify-between"> 
            <CiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-24 h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setShowFilterModal(true)}
        >
          <FiFilter className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 text-sm font-normal font-['Golos_Text'] leading-tight">
            Filter
          </span>
        </button>
      </div>

      <button
        className="h-10 px-3 py-2 bg-violet-600 rounded-lg flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors duration-200 max-[475px]:p-1 max-[475px]:text-[12px] max-[475px]:w-full " 
        onClick={() => setShowAddStaffModal(true)} // Open AddStaffModal
      >
        <FaPlus className="w-5 h-5 text-white" />
        <span className="text-white text-sm font-semibold font-['Golos_Text'] leading-tight max-[475px]:text-center">
          Add Staff
        </span>
      </button>

      {/* Filter Modal Overlay */}
      {showFilterModal && (
        <div className="absolute text-left bottom-[-227px] left-[630px] max-[475px]:bottom-[100% ] max-[475px]:left-[50%] max-[475px]:-translate-x-1/2 max-[475px]:-translate-y-1/2 max-[475px]:z-50">
          <FilterModal
            onClose={() => setShowFilterModal(false)}
            allStaffData={allStaffData}
            onApplyFilters={onApplyFilters}
            currentFilters={currentFilters}
          />
        </div>
      )}

      {/* Add Staff Modal Overlay */}
      {showAddStaffModal && (
        <AddStaffModal
          onClose={() => setShowAddStaffModal(false)}
          onAddStaff={onAddStaff}
          allStaffData={allStaffData} // Pass allStaffData to derive unique roles and next ID
        />
      )}
    </div>
  );
};

export default SearchBarAndFilter;