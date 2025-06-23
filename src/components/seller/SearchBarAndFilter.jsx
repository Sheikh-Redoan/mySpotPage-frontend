// src/components/seller/SearchBarAndFilter.jsx
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Button, Drawer, Popover } from "antd";
import useResponsive from "../../hooks/useResponsive";
import FilterModal from "./FilterModal";
import AddStaffModal from "./AddStaffModal";

const SearchBarAndFilter = ({
  searchTerm,
  onSearchChange,
  allStaffData,
  onApplyFilters,
  currentFilters,
  onAddStaff,
}) => {
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const screens = useResponsive();
  const isMobile = !screens.md; // md breakpoint is 768px

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterClose = () => {
    setFilterVisible(false);
  };

  const filterContent = (
    <FilterModal
      onClose={handleFilterClose}
      allStaffData={allStaffData}
      onApplyFilters={onApplyFilters}
      currentFilters={currentFilters}
    />
  );

  return (
    <div className="self-stretch flex justify-between items-center relative max-[920px]:flex-col max-[920px]:gap-2 max-[920px]:items-start">
      <div className="flex justify-start items-center gap-2 max-[920px]:w-full">
        <div className="w-80 bg-white flex flex-col justify-start items-start gap-1 max-[920px]:w-full max-[920px]:gap-0">
          <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2 max-[920px]:text-[12px] max-[920px]:p-1 max-[920px]:justify-between">
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

        {isMobile ? (
          <>
            <Button
              className="w-24 h-10"
              icon={<FiFilter />}
              onClick={handleFilterToggle}
            >
              Filter
            </Button>
            <Drawer
              placement="bottom"
              open={filterVisible}
              onClose={handleFilterClose}
              closable={false}
              height="auto"
              bodyStyle={{ padding: 0, background: 'transparent' }}
              className="rounded-t-xl"
            >
              {filterContent}
            </Drawer>
          </>
        ) : (
          <Popover
            content={filterContent}
            trigger="click"
            open={filterVisible}
            onOpenChange={setFilterVisible}
            placement="bottomLeft"
          >
            <Button
              className="w-24 h-10"
              icon={<FiFilter />}
            >
              Filter
            </Button>
          </Popover>
        )}
      </div>

      <button
        className="h-10 px-3 py-2 bg-violet-600 rounded-lg flex justify-center items-center gap-2 hover:bg-violet-700 transition-colors duration-200 max-[920px]:p-1 max-[920px]:text-[12px] max-[920px]:w-full "
        onClick={() => setShowAddStaffModal(true)}
      >
        <FaPlus className="w-5 h-5 text-white" />
        <span className="text-white text-sm font-semibold font-['Golos_Text'] leading-tight max-[920px]:text-center">
          Add Staff
        </span>
      </button>

      {showAddStaffModal && (
        <AddStaffModal
          onClose={() => setShowAddStaffModal(false)}
          onAddStaff={onAddStaff}
          allStaffData={allStaffData}
        />
      )}
    </div>
  );
};

export default SearchBarAndFilter;