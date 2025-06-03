// src/components/reusable/CustomStaffCalendar.jsx
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { Dropdown, Checkbox, Button } from "antd";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// Import your staff data (assuming this is global or fetched elsewhere)
import { staffData as allStaffData } from "../../lib/staffData";

// Import view components
import StaffCalendarWeekView from "../calendarManagement/StaffCalendarWeekView";
// You'll create MonthView and DayView similarly, or keep them simple for now
// import StaffCalendarMonthView from "./StaffCalendarMonthView";
// import StaffCalendarDayView from "./StaffCalendarDayView";

dayjs.extend(weekday);

// Helper function to get the start of the week (Sunday)
const getStartOfWeek = (date) => {
  return dayjs(date).startOf('week').day(0); // Set to Sunday
};

/**
 * A highly customizable and reusable staff-centric calendar component.
 * Allows switching between Week, Month, and Day views, filtering by staff,
 * and custom rendering of staff and appointment cards.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.appointmentsData - Array of all appointments to display.
 * @param {Array} props.staffData - Array of all staff members available for selection.
 * @param {string} [props.initialView='week'] - The initial calendar view ('month', 'week', 'day').
 * @param {dayjs.Dayjs} [props.initialDate=dayjs()] - The initial date to display the calendar for.
 * @param {boolean} [props.showHeaderToolbar=true] - Whether to display the navigation and view toggles.
 * @param {boolean} [props.showStaffFilter=true] - Whether to display the staff filter dropdown.
 * @param {boolean} [props.showViewToggle=true] - Whether to display the Month/Week/Day toggle buttons.
 * @param {Function} [props.renderStaffCard] - Custom render function for a staff card. (Not implemented in this example for simplicity)
 * @param {Function} [props.renderAppointmentCard] - Custom render function for an appointment card. (Not implemented in this example for simplicity)
 */
export default function CustomStaffCalendar({
  appointmentsData,
  staffData = allStaffData, // Default to imported staffData if not provided
  initialView = 'week',
  initialDate = dayjs(),
  showHeaderToolbar = true,
  showStaffFilter = true,
  showViewToggle = true,
  // renderStaffCard, // Future customization
  // renderAppointmentCard, // Future customization
}) {
  const [currentView, setCurrentView] = useState(initialView);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(initialDate);
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [displayedStaff, setDisplayedStaff] = useState([]);

  // Initialize selectedStaffIds with all staff IDs on mount
  useEffect(() => {
    setSelectedStaffIds(staffData.map(staff => staff.id));
  }, [staffData]); // Re-run if staffData changes

  // Filter staff based on selectedStaffIds
  useEffect(() => {
    if (selectedStaffIds.includes('all') || selectedStaffIds.length === 0) {
      setDisplayedStaff(staffData);
    } else {
      setDisplayedStaff(staffData.filter(staff => selectedStaffIds.includes(staff.id)));
    }
  }, [selectedStaffIds, staffData]);

  const goToPrevious = useCallback(() => {
    if (currentView === 'week') {
      setCurrentDisplayDate(prev => prev.subtract(1, 'week'));
    } else if (currentView === 'month') {
      setCurrentDisplayDate(prev => prev.subtract(1, 'month'));
    } else if (currentView === 'day') {
      setCurrentDisplayDate(prev => prev.subtract(1, 'day'));
    }
  }, [currentView]);

  const goToNext = useCallback(() => {
    if (currentView === 'week') {
      setCurrentDisplayDate(prev => prev.add(1, 'week'));
    } else if (currentView === 'month') {
      setCurrentDisplayDate(prev => prev.add(1, 'month'));
    } else if (currentView === 'day') {
      setCurrentDisplayDate(prev => prev.add(1, 'day'));
    }
  }, [currentView]);

  const goToToday = useCallback(() => {
    setCurrentDisplayDate(dayjs());
  }, []);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
    // When changing view, re-align the date to the start of the current week/month/day
    if (view === 'week') {
      setCurrentDisplayDate(getStartOfWeek(currentDisplayDate));
    } else if (view === 'month') {
      setCurrentDisplayDate(currentDisplayDate.startOf('month'));
    } else if (view === 'day') {
      setCurrentDisplayDate(currentDisplayDate.startOf('day'));
    }
  }, [currentDisplayDate]);


  const handleStaffFilterChange = (checkedValues) => {
    // If 'all' is checked, and it's the only one, then all are selected.
    // Otherwise, filter 'all' out if individual staff are selected.
    if (checkedValues.includes('all')) {
      setSelectedStaffIds(staffData.map(staff => staff.id));
    } else if (checkedValues.length === 0) {
      setSelectedStaffIds([]); // Allows selecting none
    } else {
      setSelectedStaffIds(checkedValues);
    }
  };

  const staffFilterOverlay = (
    <div className="bg-white shadow-lg rounded-lg p-4 w-60">
      <Checkbox.Group
        className="flex flex-col gap-2"
        value={selectedStaffIds.length === staffData.length || selectedStaffIds.length === 0 ? ['all'] : selectedStaffIds}
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
        {/* The 'Apply' button might be more useful if changes are not applied instantly */}
        <Button type="primary" className="!px-3 !py-2 !bg-[#866BE7] !text-white !rounded-md" >Apply</Button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    const commonProps = {
      displayedStaff: displayedStaff,
      allAppointments: appointmentsData,
      // renderAppointmentCard: renderAppointmentCard, // Pass custom render if provided
      // renderStaffCard: renderStaffCard, // Pass custom render if provided
    };

    if (currentView === 'week') {
      const weekDays = [];
      let currentDay = getStartOfWeek(currentDisplayDate); // Ensure week starts on Sunday
      for (let i = 0; i < 7; i++) {
        weekDays.push(currentDay);
        currentDay = currentDay.add(1, 'day');
      }
      const weekRangeStart = weekDays[0].format("DD MMM YYYY");
      const weekRangeEnd = weekDays[6].format("DD MMM YYYY");
      
      return (
        <>
          {showHeaderToolbar && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={goToPrevious} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
                  <ChevronLeft size={20} color="#6B7280" />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-zinc-700 text-sm font-normal">
                    {weekRangeStart} - {weekRangeEnd}
                  </span>
                </div>
                <button onClick={goToNext} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
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
                {showStaffFilter && (
                  <Dropdown overlay={staffFilterOverlay} trigger={['click']} placement="bottomRight">
                    <Button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]">
                      All staffs <ChevronDown size={16} />
                    </Button>
                  </Dropdown>
                )}

                {showViewToggle && (
                  <div className="flex border border-gray-200 rounded-lg">
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'month' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('month')}
                    >
                      Month
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'week' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('week')}
                    >
                      Week
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'day' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('day')}
                    >
                      Day
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <StaffCalendarWeekView weekDays={weekDays} {...commonProps} />
        </>
      );
    } else if (currentView === 'month') {
      // --- Month View Logic (Basic placeholder) ---
      // This will need significant styling and logic to match your monthly design if it's different.
      // For now, it will just show the header and a simple message.
      const startOfMonth = currentDisplayDate.startOf('month');
      const endOfMonth = currentDisplayDate.endOf('month');
      const monthRange = `${startOfMonth.format("MMMM YYYY")}`;

      const daysInMonth = [];
      let day = startOfMonth.startOf('week').day(0); // Start from Sunday of the first week of the month
      while (day.isBefore(endOfMonth.endOf('week').add(1, 'day'))) {
        daysInMonth.push(day);
        day = day.add(1, 'day');
      }

      return (
        <>
          {showHeaderToolbar && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={goToPrevious} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
                  <ChevronLeft size={20} color="#6B7280" />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-zinc-700 text-sm font-normal">
                    {monthRange}
                  </span>
                </div>
                <button onClick={goToNext} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
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
                {showStaffFilter && (
                  <Dropdown overlay={staffFilterOverlay} trigger={['click']} placement="bottomRight">
                    <Button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]">
                      All staffs <ChevronDown size={16} />
                    </Button>
                  </Dropdown>
                )}

                {showViewToggle && (
                  <div className="flex border border-gray-200 rounded-lg">
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'month' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('month')}
                    >
                      Month
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'week' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('week')}
                    >
                      Week
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'day' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('day')}
                    >
                      Day
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* A simplified month view for now */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Month View: {monthRange}</h3>
            <div className="grid grid-cols-7 text-center font-bold border-b pb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 pt-2">
              {daysInMonth.map(day => (
                <div 
                  key={day.format("YYYY-MM-DD")}
                  className={`p-2 h-24 border rounded ${day.month() !== currentDisplayDate.month() ? 'bg-gray-100 text-gray-400' : 'bg-white'} ${day.isSame(dayjs(), 'day') ? 'border-2 border-violet-500' : ''}`}
                >
                  <div className={`text-right text-sm ${day.isSame(dayjs(), 'day') ? 'text-violet-600 font-bold' : ''}`}>
                    {day.format("D")}
                  </div>
                  {/* Render appointments for the month view if needed */}
                  <div className="text-xs">
                    {/* Add logic to show dots or counts for appointments on this day */}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-gray-600">
              *Month view currently shows a basic grid. Full appointment display for month view requires dedicated implementation based on your design.
            </p>
          </div>
        </>
      );
    } else if (currentView === 'day') {
      // --- Day View Logic (Basic placeholder) ---
      const dayRange = currentDisplayDate.format("DD MMMM YYYY (dddd)");

      return (
        <>
          {showHeaderToolbar && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={goToPrevious} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
                  <ChevronLeft size={20} color="#6B7280" />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-zinc-700 text-sm font-normal">
                    {dayRange}
                  </span>
                </div>
                <button onClick={goToNext} className="cursor-pointer p-1 rounded-full hover:bg-gray-100">
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
                {showStaffFilter && (
                  <Dropdown overlay={staffFilterOverlay} trigger={['click']} placement="bottomRight">
                    <Button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-zinc-700 text-sm font-normal focus:!border-[#866BE7] focus:!shadow-none hover:!border-[#866BE7]">
                      All staffs <ChevronDown size={16} />
                    </Button>
                  </Dropdown>
                )}

                {showViewToggle && (
                  <div className="flex border border-gray-200 rounded-lg">
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'month' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('month')}
                    >
                      Month
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'week' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('week')}
                    >
                      Week
                    </button>
                    <button
                      className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${currentView === 'day' ? 'bg-[#866BE7] text-white' : 'text-neutral-800'}`}
                      onClick={() => handleViewChange('day')}
                    >
                      Day
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* A simplified day view for now */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Day View: {dayRange}</h3>
            {displayedStaff.map(staff => (
              <div key={staff.id} className="mb-4 p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <img src={staff.image} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-semibold">{staff.name}</span>
                </div>
                <h4 className="text-md font-medium mb-2">Appointments for {currentDisplayDate.format("DD MMMM")}</h4>
                {appointmentsData.filter(app => app.staffId === staff.id && dayjs(app.date).isSame(currentDisplayDate, 'day')).length > 0 ? (
                  appointmentsData.filter(app => app.staffId === staff.id && dayjs(app.date).isSame(currentDisplayDate, 'day')).map(app => (
                    <div key={app.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 ${getStatusColor(app.status)} rounded-full`} />
                      <span>{app.time} - {app.client} ({app.status})</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No appointments for this staff on this day.</p>
                )}
              </div>
            ))}
            <p className="mt-4 text-gray-600">
              *Day view currently shows a basic list. Full hourly grid for day view requires dedicated implementation based on your design.
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0">
      <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        {renderCurrentView()}
      </div>
    </section>
  );
}

// Define mockAppointments here or import them
const mockAppointments = [
  // IMPORTANT: Adjust these dates to be in the current week you are testing, or use Option 2 below
  // For example, if today is June 3, 2025 (Tuesday), currentWeekStart is June 1, 2025.
  // So dates should be from '2025-06-01' to '2025-06-07'.

  // Appointments for Ava Thompson (staffId: 5)
  { id: 'app1', staffId: 5, date: '2025-06-01', time: '14:00', client: 'Alexander', status: 'completed' }, // Sunday
  { id: 'app2', staffId: 5, date: '2025-06-01', time: '15:00', client: 'Emily', status: 'completed' }, // Sunday
  { id: 'app3', staffId: 5, date: '2025-06-04', time: '14:00', client: 'Scarlett', status: 'completed' }, // Wednesday
  { id: 'app4', staffId: 5, date: '2025-06-04', time: '15:00', client: 'Emily', status: 'completed' }, // Wednesday
  { id: 'app5', staffId: 5, date: '2025-06-04', time: '16:00', client: 'Thomas', status: 'completed' }, // Wednesday
  { id: 'app6', staffId: 5, date: '2025-06-04', time: '17:00', client: 'Alexander', status: 'seller-confirmed' }, // Wednesday
  { id: 'app7', staffId: 5, date: '2025-06-05', time: '14:00', client: 'Alexander', status: 'seller-confirmed' }, // Thursday
  { id: 'app8', staffId: 5, date: '2025-06-05', time: '15:00', client: 'Michael', status: 'seller-confirmed' }, // Thursday
  { id: 'app9', staffId: 5, date: '2025-06-05', time: '16:00', client: 'Emily', status: 'seller-confirmed' }, // Thursday
  { id: 'app10', staffId: 5, date: '2025-06-05', time: '17:00', client: 'Thomas', status: 'seller-confirmed' }, // Thursday
  { id: 'app11', staffId: 5, date: '2025-06-06', time: '14:00', client: 'Michael', status: 'seller-confirmed' }, // Friday
  { id: 'app12', staffId: 5, date: '2025-06-06', time: '15:00', client: 'Alexander', status: 'seller-confirmed' }, // Friday

  // Appointments for Sophia Miller (staffId: 3)
  { id: 'app13', staffId: 3, date: '2025-06-02', time: '09:30', client: 'Client A', status: 'booked' }, // Monday
  { id: 'app14', staffId: 3, date: '2025-06-02', time: '10:00', client: 'Client B', status: 'pending' }, // Monday
  { id: 'app15', staffId: 3, date: '2025-06-02', time: '11:00', client: 'Client C', status: 'completed' }, // Monday
  { id: 'app16', staffId: 3, date: '2025-06-03', time: '08:00', client: 'Client D', status: 'booked' }, // Tuesday

  // Appointments for Ella Scott (staffId: 8)
  { id: 'app17', staffId: 8, date: '2025-06-03', time: '10:00', client: 'Client E', status: 'booked' }, // Tuesday
  { id: 'app18', staffId: 8, date: '2025-06-03', time: '11:00', client: 'Client F', status: 'pending' }, // Tuesday

  // Appointments for Chloe Davis (staffId: 10)
  { id: 'app19', staffId: 10, date: '2025-06-03', time: '13:00', client: 'Client G', status: 'completed' }, // Tuesday
  { id: 'app20', staffId: 10, date: '2025-06-03', time: '14:00', client: 'Client H', status: 'booked' }, // Tuesday
];