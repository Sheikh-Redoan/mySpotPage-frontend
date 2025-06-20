import { Checkbox, DatePicker, Modal, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Clock, PlusIcon } from "lucide-react";
import { useState } from "react";
import { CalenderIcon, DownArrowIcon } from "../../../assets/icons/icons";
import { DeleteIcon } from "../../../assets/icons/icons2";
import { imageProvider } from "../../../lib/imageProvider";
import TimePicker from "../../calendarManagement/pendingBookings/TimePicker";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { Calendar } from "lucide-react";
import TimeBasePricingCalender from "../../../pages/seller/TimeBasePricingCalender";
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

const format = "hh:mm A";

const TimeBasedModal = ({ isModalOpen, setIsModalOpen, setOpenDateRange, openDateRange, formatDate, handleGenderChange, handleAllDayChange, isAllDay, handleCancel }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <Modal
      title={
        <h2 className="text-xl font-semibold text-[#242528]">Set Time Based</h2>
      }
      open={isModalOpen}
      closable={false}
      footer={null}
      width={820}
      // height={500} 
      bodyStyle={{
        height: '480px',
        overflowY: 'auto',
      }}
      centered
    >
      <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <fieldset className="relative">
              <label htmlFor="date" className="block w-fit mb-1">
                Date <span className="text-[#ED4245]">*</span>
              </label>
              <div
                className="py-2 border border-border rounded-md flex items-center justify-between px-3"
                onClick={() => setOpenDateRange(!openDateRange)}
              >
                {range[0].endDate > range[0].startDate ? (
                  <p>
                    {formatDate(range[0].startDate)} - {formatDate(range[0].endDate)}
                  </p>
                ) : (
                  <p>Select</p>
                )}
                <Calendar size={20} className="text-description" />
              </div>
              {openDateRange && (<div className="absolute w-[380px] bg-white z-10  shadow-[0_0_25px_rgba(0,0,0,0.1)] rounded-xl">
                <TimeBasePricingCalender />
              </div>)}
            </fieldset>

            <fieldset>
              <label htmlFor="lastName" className="block w-fit mb-1">
                Frequency <span className="text-[#ED4245]">*</span>
              </label>
              <Select
                id="gender"
                onChange={handleGenderChange}
                placeholder="Does not repeat"
                className="border border-[#E0E0E0] rounded-lg w-full !h-10 !truncate"
                suffixIcon={<DownArrowIcon />}>
                {[
                  "Does not repeat",
                  "Every day",
                  "Every weak on [Wednesday]",
                ].map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </fieldset>
          </div>

          <div className="flex justify-between items-center mt-5 mb-2">
            <h2>
              Time Settings <span className="text-[#ED4245]">*</span>
            </h2>
            <Checkbox onChange={handleAllDayChange}>All day</Checkbox>
          </div>

          <div className="relative border border-[#E7E7E7] h-[138px] rounded-lg py-2 px-3">
            {isAllDay && (
              <div className="absolute inset-0 bg-transparent bg-opacity-60 z-10 cursor-not-allowed rounded-lg" />
            )}

            <div
              className={`flex justify-between gap-2 ${isAllDay ? "pointer-events-none opacity-50" : ""
                }`}>
              <div className="space-y-1">
                <h4 className="text-[#ACAFB4]">Start time</h4>
                <TimePicker
                  defaultValue={dayjs("11:00 AM", format)}
                  format={format}
                  use12Hours
                  className="custom-time-picker max-w-xs"
                  suffixIcon={<Clock size={22} />}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-[#ACAFB4]">End time</h4>
                <TimePicker
                  className="custom-time-picker max-w-xs"
                  defaultValue={dayjs("11:00 AM", format)}
                  format={format}
                  use12Hours
                  suffixIcon={<Clock size={22} />}
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-[#ACAFB4]">Action</h4>
                <div className="flex justify-center items-center my-2 rounded-full h-[40px] w-[40px] bg-[#F6F6F6] mx-auto hover:scale-105 transform transition-all duration-300 ease-in-out">
                  <DeleteIcon className="h-5 w-5" />
                </div>
              </div>
            </div>

            <button
              className={`flex items-center gap-2 p-2 text-[#744CDB] rounded-lg mt-2 hover:underline ${isAllDay ? "pointer-events-none opacity-50" : ""
                }`}>
              <PlusIcon size={20} className="text-[#744CDB]" />
              <p className="text-[15px] font-semibold">Add Time Range</p>
            </button>
          </div>

          <fieldset className="relative mt-4">
            <label htmlFor="dob" className="block w-fit mb-1">
              Discount <span className="text-[#ED4245]">*</span>
            </label>
            <input
              type="text"
              className="border border-[#E0E0E0] rounded-lg px-3 h-10 w-full"
              placeholder="Enter Value"
            />
            <div className="pointer absolute inset-y-0 top-8 right-3 flex items-center text-[#888888]">
              <p>%</p>
            </div>
          </fieldset>
        </div>

        <div className="mt-6 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={imageProvider.deleteIcon} alt="delete icon" />
            <p className="text-[#ED4245] text-[15px] font-semibold mt-0.5 hover:scale-95 transform transition-all duration-300 ease-in-out">
              Remove
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={handleCancel}
              type="button"
              className="font-semibold cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out">
              Cancel
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="text-[#82868E] font-semibold bg-[#E5E7E8] py-2.5 w-18 rounded-lg cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out">
              Publish
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimeBasedModal;
