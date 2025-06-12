import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "/src/styles/datePicker.css";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { Space } from "antd";
import useDeviceWidth from "../../../hooks/useDeviceWidth";

const StyledDatePicker = ({
  selectedDate,
  setSelectedDate,
  dateFormat,
  customInput,
  ...rest
}) => {
  const deviceWidth = useDeviceWidth();
  const isMobile = deviceWidth <= 768;
  console.log("isMobile", isMobile);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer
        title="Drawer with extra actions"
        placement={"bottom"}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat={dateFormat}
          showPopperArrow={false}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex justify-between items-center p-2">
              <span className="text-base font-semibold text-[#6C5DD3]">
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(date)}
              </span>
              <div className="flex items-center">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="flex items-center justify-center w-7 h-7 rounded-full text-[#6C5DD3] hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="flex items-center justify-center w-7 h-7 rounded-full text-[#6C5DD3] hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          // Styling for day names (S, M, T...)
          dayClassName={(date) => {
            let classes =
              "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium";

            // Apply selected day style (solid purple circle)
            if (date.toDateString() === selectedDate?.toDateString()) {
              classes += " bg-[#6C5DD3] text-white";
            } else if (
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear()
            ) {
              // Specific styling for day today
              classes += " border border-[#6C5DD3] text-[#6C5DD3]";
            }
            // Days from previous/next month are lighter
            else if (
              date.getMonth() !== selectedDate.getMonth() ||
              date.getFullYear() !== selectedDate.getFullYear()
            ) {
              classes += " text-gray-300";
            } else {
              classes += " text-gray-700 hover:bg-gray-100"; // Current month days
            }

            // Override default selected/keyboard selected styles
            if (date.toDateString() === selectedDate?.toDateString()) {
              classes += " react-datepicker__day--selected-override";
            }

            return classes;
          }}
          customInput={customInput}
          {...rest}
        />
      </Drawer>
    );
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      dateFormat={dateFormat}
      showPopperArrow={false}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex justify-between items-center p-2">
          <span className="text-base font-semibold text-[#6C5DD3]">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(date)}
          </span>
          <div className="flex items-center">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="flex items-center justify-center w-7 h-7 rounded-full text-[#6C5DD3] hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="flex items-center justify-center w-7 h-7 rounded-full text-[#6C5DD3] hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      // Styling for day names (S, M, T...)
      dayClassName={(date) => {
        let classes =
          "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium";

        // Apply selected day style (solid purple circle)
        if (date.toDateString() === selectedDate?.toDateString()) {
          classes += " bg-[#6C5DD3] text-white";
        } else if (
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
        ) {
          // Specific styling for day today
          classes += " border border-[#6C5DD3] text-[#6C5DD3]";
        }
        // Days from previous/next month are lighter
        else if (
          date.getMonth() !== selectedDate.getMonth() ||
          date.getFullYear() !== selectedDate.getFullYear()
        ) {
          classes += " text-gray-300";
        } else {
          classes += " text-gray-700 hover:bg-gray-100"; // Current month days
        }

        // Override default selected/keyboard selected styles
        if (date.toDateString() === selectedDate?.toDateString()) {
          classes += " react-datepicker__day--selected-override";
        }

        return classes;
      }}
      customInput={customInput}
      {...rest}
    />
  );
};

export default StyledDatePicker;
