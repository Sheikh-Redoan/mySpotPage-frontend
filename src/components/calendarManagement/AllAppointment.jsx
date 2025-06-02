// src/components/calendarManagement/AllAppointment.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { Dropdown, Checkbox, Button } from "antd";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"; // Using lucide-react for icons
import { staffData } from "../../lib/staffData"; // Make sure this path is correct
import StaffCalendarWeekView from "./StaffCalendarWeekView"; // Import the new component

dayjs.extend(weekday);

// Helper function to get the start of the week (Sunday)
const getStartOfWeek = (date) => {
  return dayjs(date).startOf('week').day(0); // Set to Sunday
};

export default function AllAppointment() {
// Change this line to start on a week that includes your mock data dates (e.g., Jan 5, 2025 is a Sunday)
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(dayjs('2025-01-05')));
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [displayedStaff, setDisplayedStaff] = useState([]);

  useEffect(() => {
    // Initialize selectedStaffIds with all staff IDs on mount
    setSelectedStaffIds(staffData.map(staff => staff.id));
  }, []);

  useEffect(() => {
    // Filter staff based on selectedStaffIds
    if (selectedStaffIds.includes('all')) {
      setDisplayedStaff(staffData);
    } else {
      setDisplayedStaff(staffData.filter(staff => selectedStaffIds.includes(staff.id)));
    }
  }, [selectedStaffIds]);

  const goToPreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, 'week'));
  };

  const goToToday = () => {
    setCurrentWeekStart(getStartOfWeek(dayjs()));
  };

  const getWeekDays = () => {
    const days = [];
    let currentDay = dayjs(currentWeekStart);
    for (let i = 0; i < 7; i++) {
      days.push(currentDay);
      currentDay = currentDay.add(1, 'day');
    }
    return days;
  };

  const weekDays = getWeekDays();
  const weekRangeStart = weekDays[0].format("DD MMM YYYY"); // Format like "06 Jan 2025"
  const weekRangeEnd = weekDays[6].format("DD MMM YYYY"); // Format like "12 Jan 2025"

  const handleStaffFilterChange = (checkedValues) => {
    // If "All staffs" is checked, select all staff IDs
    if (checkedValues.includes('all')) {
      setSelectedStaffIds(staffData.map(staff => staff.id));
    } else {
      setSelectedStaffIds(checkedValues.filter(id => id !== 'all')); // Remove 'all' if other items are selected
    }
  };

  const staffFilterOverlay = (
    <div className="bg-white shadow-lg rounded-lg p-4 w-60">
      <Checkbox.Group
        className="flex flex-col gap-2"
        value={selectedStaffIds.length === staffData.length ? ['all'] : selectedStaffIds}
        onChange={handleStaffFilterChange}
      >
        <Checkbox value="all">All staffs</Checkbox>
        {staffData.map((staff) => (
          <Checkbox key={staff.id} value={staff.id}>
            <div className="flex items-center gap-2">
              <img src={staff.image} alt={staff.name} className="w-6 h-6 rounded-full" />
              {staff.name}
            </div>
          </Checkbox>
        ))}
      </Checkbox.Group>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => setSelectedStaffIds([])} className="!text-[#242528] !border-none hover:!bg-gray-100">Reset</Button>
        <Button type="primary" className="!px-3 !py-2 !bg-[#866BE7] !text-white !rounded-md" >Apply</Button> {/* No direct apply needed if state updates on change */}
      </div>
    </div>
  );

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0">
      <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        {/* Top Calendar Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button onClick={goToPreviousWeek} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft size={20} color="#6B7280" />
            </button>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-zinc-700 text-sm font-normal">
                {weekRangeStart} - {weekRangeEnd}
              </span>
            </div>
            <button onClick={goToNextWeek} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
              <ChevronRight size={20} color="#6B7280" />
            </button>
            <button
              className="text-[#866be7] cursor-pointer text-sm font-semibold"
              onClick={goToToday}
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Dropdown overlay={staffFilterOverlay} trigger={['click']} placement="bottomRight">
              <Button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]">
                All staffs <ChevronDown size={16} />
              </Button>
            </Dropdown>

            {/* View toggles - keeping "Week" active as per design */}
            <div className="flex border border-gray-200 rounded-lg">
              <button
                className="px-5 py-1.5 cursor-pointer rounded-md text-sm text-neutral-800"
                // No actual view change logic here as we are in a fixed week view
              >
                Month
              </button>
              <button
                className="px-5 py-1.5 cursor-pointer rounded-md text-sm bg-[#866BE7] text-white"
              >
                Week
              </button>
              <button
                className="px-5 py-1.5 cursor-pointer rounded-md text-sm text-neutral-800"
                // No actual view change logic here as we are in a fixed week view
              >
                Day
              </button>
            </div>
          </div>
        </div>

        {/* Staff Calendar Week View */}
        <StaffCalendarWeekView weekDays={weekDays} displayedStaff={displayedStaff} />
      </div>
    </section>
  );
}