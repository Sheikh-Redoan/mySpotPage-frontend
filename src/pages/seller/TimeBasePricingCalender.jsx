import React, { useState, useEffect, useRef } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    addMonths,
    subMonths,
    isBefore,
    isAfter,
    isWithinInterval,
    getDay,
    parseISO
} from 'date-fns';

// Lucide-react icons for arrows. Assumed available in the environment.
// For demonstration, we'll use inline SVG for simplicity if lucide-react isn't directly loaded.
// In a real project, you would import { ChevronLeft, ChevronRight } from 'lucide-react';
const ChevronLeftIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-left"
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-right"
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const TimeBasePricingCalender = () => {

    // State for the currently displayed month in the calendar
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // January 2025 as per image
    // State for the selected start date
    const [startDate, setStartDate] = useState(parseISO('2025-01-22')); // Default start date as per image
    // State for the selected end date
    const [endDate, setEndDate] = useState(parseISO('2025-01-25'));   // Default end date as per image
    // State for a single selected date (e.g., the 9th in the image, if not part of a range)
    const [singleSelectedDate, setSingleSelectedDate] = useState(parseISO('2025-01-09'));

    // Function to navigate to the previous month
    const goToPreviousMonth = () => {
        setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
    };

    // Function to navigate to the next month
    const goToNextMonth = () => {
        setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
    };

    // Handler for when a day is clicked
    const handleDayClick = (day) => {
        // If a range is already active (both start and end are set), clear and start a new selection.
        if (startDate && endDate) {
            setStartDate(day);
            setEndDate(null);
            setSingleSelectedDate(null);
        }
        // If only startDate is set (waiting for endDate), complete the range.
        else if (startDate && !endDate) {
            if (isBefore(day, startDate)) {
                // If clicked day is before start date, swap them
                setEndDate(startDate);
                setStartDate(day);
            } else {
                // Otherwise, set clicked day as end date
                setEndDate(day);
            }
            setSingleSelectedDate(null); // A range is now formed, clear single selection
        }
        // If no dates are selected at all, set the clicked day as a single selected date.
        else {
            setSingleSelectedDate(day);
            setStartDate(null); // Ensure no range is active
            setEndDate(null);
        }
    };


    // Get the days for the current month's calendar view
    const getDaysInMonth = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        // Calculate the start of the week for the first day of the month
        // Sunday (0) to Saturday (6)
        const startDayOfWeek = getDay(start); // 0 for Sunday, 1 for Monday, etc.

        // Adjust the start date to include days from the previous month to fill the first week
        const calendarStart = new Date(start); // Create a new Date object to avoid modifying 'start'
        // If the month doesn't start on Sunday, go back to the previous Sunday
        if (startDayOfWeek !== 0) {
            calendarStart.setDate(start.getDate() - startDayOfWeek);
        }

        // Calculate the end of the week for the last day of the month
        const calendarEnd = new Date(endOfMonth(currentMonth)); // Create new Date
        const endDayOfWeek = getDay(end); // Day of the week for the last day of the month
        // If the month doesn't end on Saturday, go forward to the next Saturday
        if (endDayOfWeek !== 6) {
            calendarEnd.setDate(end.getDate() + (6 - endDayOfWeek));
        }


        // Generate all days in the interval needed for the calendar grid
        return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    };

    const days = getDaysInMonth();
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
            <div className="bg-white p-6 rounded-xl shadow-lg w-full h-full border border-border">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        aria-label="Previous Month"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <span className="text-xl font-semibold text-gray-800">
                        {format(currentMonth, 'MMMM yyyy')} {/* Added 'yyyy' for year display */}
                    </span>
                    <button
                        onClick={goToNextMonth}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        aria-label="Next Month"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
                    {weekdays.map((day) => (
                        <div key={day} className="py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7"> {/* Removed gap-y-1 for seamless range highlight */}
                    {days.map((day, index) => {
                        const dayOfMonth = format(day, 'd');
                        const isCurrentMonth = isSameDay(startOfMonth(day), startOfMonth(currentMonth));

                        // Determine if the day is the start or end of the selected range
                        const isRangeStart = startDate && isSameDay(day, startDate);
                        const isRangeEnd = endDate && isSameDay(day, endDate);

                        // Determine if the day is within the selected range (inclusive of start/end)
                        const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });

                        // Determine if the day is the single selected date (only active if no range is selected)
                        const isSingleSelected = singleSelectedDate && isSameDay(day, singleSelectedDate) && !startDate && !endDate;

                        // Classes for the individual day cell container (responsible for range background and rounding)
                        let cellClasses = `relative flex items-center justify-center h-10 `; // Fixed height for consistent cell size

                        if (isInRange) {
                            cellClasses += ' bg-[#dddafa]'; // Apply light purple background for days in range
                            if (isRangeStart && !isRangeEnd) { // Apply rounded-l-full if it's the start of a multi-day range
                                cellClasses += ' rounded-l-full ';
                            } else if (isRangeEnd && !isRangeStart) { // Apply rounded-r-full if it's the end of a multi-day range
                                cellClasses += ' rounded-r-full';
                            }
                            // If it's a single-day range (start and end are the same day), the button will handle styling
                        }


                        // Classes for the button representing the day number (responsible for the circle/border)
                        let buttonClasses = `z-10 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 `;

                        if (!isCurrentMonth) {
                            buttonClasses += ' text-gray-400'; // Faded for days outside current month
                        } else if (isRangeStart || isRangeEnd) {
                            buttonClasses += ' bg-primary01 text-white shadow-md'; // Dark purple for start/end circles
                        } else if (isSingleSelected) {
                            buttonClasses += ' border border-primary01 text-primary01'; // Border for single selected day
                        } else if (isInRange) {
                            buttonClasses += ' text-gray-800'; // Default text color for days within range (not start/end)
                        } else {
                            buttonClasses += ' text-gray-700 hover:bg-gray-100'; // Default text and hover for unselected days
                        }

                        return (
                            <div key={index} className={cellClasses}>
                                <button
                                    onClick={() => handleDayClick(day)}
                                    className={buttonClasses}
                                    disabled={!isCurrentMonth} // Optionally disable clicking on prev/next month's days
                                >
                                    {dayOfMonth}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
    );
};

export default TimeBasePricingCalender;