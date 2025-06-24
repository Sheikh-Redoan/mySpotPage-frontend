// src/components/reusable/CustomStaffCalendar.jsx
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { Dropdown, Checkbox, Button, Drawer } from "antd";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// New Imports
import useMobile from "../../hooks/useMobile";
import FilterIcon from "../seller/FilterIcon";
import FilterModal from "../seller/FilterModal";

// Import view components
import StaffCalendarWeekView from "../calendarManagement/StaffCalendarWeekView";

dayjs.extend(weekday);

const getStartOfWeek = (date) => {
  return dayjs(date).startOf("week").day(0);
};

export default function CustomStaffCalendar({
  appointmentsData,
  staffData, // This is the filtered staff list passed from the parent
  allStaffForFilter, // This is the full staff list for the filter modal
  onApplyFilters,
  currentFilters,
  initialView = "week",
  initialDate = dayjs(),
  showHeaderToolbar = true,
  showStaffFilter = true,
}) { // showViewToggle prop removed
  const [currentView, setCurrentView] = useState(initialView);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(initialDate);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [displayedStaff, setDisplayedStaff] = useState([]);

  // New state for filter modal/drawer visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // When the filtered staffData from props changes, update the selection
    setSelectedStaffIds(staffData.map((staff) => staff.id));
  }, [staffData]);

  useEffect(() => {
    if (selectedStaffIds.includes("all") || selectedStaffIds.length === 0) {
      setDisplayedStaff(staffData);
    } else {
      setDisplayedStaff(
        staffData.filter((staff) => selectedStaffIds.includes(staff.id))
      );
    }
  }, [selectedStaffIds, staffData]);

  const goToPrevious = useCallback(() => {
    setCurrentDisplayDate((prev) => prev.subtract(1, currentView));
  }, [currentView]);

  const goToNext = useCallback(() => {
    setCurrentDisplayDate((prev) => prev.add(1, currentView));
  }, [currentView]);

  const goToToday = useCallback(() => {
    setCurrentDisplayDate(dayjs());
  }, []);

  const handleStaffFilterChange = (checkedValues) => {
    if (checkedValues.includes("all")) {
      setSelectedStaffIds(staffData.map((staff) => staff.id));
    } else {
      setSelectedStaffIds(checkedValues);
    }
  };

  const handleApplyMainFilter = (newFilters) => {
    onApplyFilters(newFilters);
    setIsFilterVisible(false); // Close modal/drawer after applying
  };

  const staffFilterOverlay = (
    <div className="bg-white shadow-lg rounded-lg p-4 w-60">
      <Checkbox.Group
        className="flex flex-col gap-2"
        value={
          selectedStaffIds.length === staffData.length ||
          selectedStaffIds.length === 0
            ? ["all"]
            : selectedStaffIds
        }
        onChange={handleStaffFilterChange}
      >
        <Checkbox value="all">All staffs</Checkbox>
        {staffData.map((staff) => (
          <Checkbox key={staff.id} value={staff.id}>
            <div className="flex items-center gap-2">
              <img
                src={staff.image}
                alt={staff.name}
                className="w-6 h-6 rounded-full"
              />
              {staff.name}
            </div>
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  const renderCurrentView = () => {
    // Common props for view components
    const commonProps = {
      displayedStaff: displayedStaff,
      allAppointments: appointmentsData,
    };

    let viewComponent;
    let dateRangeString = "";

    // Since view toggles are removed, we only need to handle the initialView (week)
    const weekDays = Array.from({ length: 7 }, (_, i) =>
      getStartOfWeek(currentDisplayDate).add(i, "day")
    );
    dateRangeString = `${weekDays[0].format(
      "DD MMM YYYY"
    )} - ${weekDays[6].format("DD MMM YYYY")}`;
    viewComponent = <StaffCalendarWeekView weekDays={weekDays} {...commonProps} />;

    return (
      <>
        {showHeaderToolbar && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPrevious}
                className="cursor-pointer p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} color="#6B7280" />
              </button>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-zinc-700 text-sm font-normal">
                  {dateRangeString}
                </span>
              </div>
              <button
                onClick={goToNext}
                className="cursor-pointer p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} color="#6B7280" />
              </button>
              <button
                className="text-[#866be7] cursor-pointer text-sm font-semibold"
                onClick={goToToday}
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Main Filter Button */}
              <button
                onClick={() => setIsFilterVisible(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]"
              >
                <FilterIcon />
                Filter
              </button>

              {/* Staff Dropdown Filter */}
              {showStaffFilter && (
                <Dropdown
                  overlay={staffFilterOverlay}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button className="flex items-center gap-2 !px-3 !py-5 !rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]">
                    All staffs <ChevronDown size={16} />
                  </Button>
                </Dropdown>
              )}
              {/* View Toggle Buttons Removed */}
            </div>
          </div>
        )}
        {viewComponent}
      </>
    );
  };
  
  // Helper function to render the filter content
  const renderFilterContent = () => (
      <FilterModal
        onClose={() => setIsFilterVisible(false)}
        allStaffData={allStaffForFilter}
        onApplyFilters={handleApplyMainFilter}
        currentFilters={currentFilters}
      />
  )

  return (
    <section className="bg-[#F9FAFC] px-2 md:px-0">
      <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        {renderCurrentView()}
      </div>

      {/* Render Drawer for mobile and Modal for Desktop */}
      {isMobile ? (
        <Drawer
          placement="bottom"
          height="auto"
          className="rounded-t-3xl"
          onClose={() => setIsFilterVisible(false)}
          open={isFilterVisible}
          closable={false}
        >
         {renderFilterContent()}
        </Drawer>
      ) : (
        isFilterVisible && (
          <div className="fixed inset-0 bg-[#00000081] flex justify-center items-center z-50">
           {renderFilterContent()}
          </div>
        )
      )}
    </section>
  );
}