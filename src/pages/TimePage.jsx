import { useState } from "react";

import TimeBasedModal from "../components/DashboardPageComponents/shared/TimeBasedModal";
import TimePageTable from "../components/DashboardPageComponents/shared/TimePageTable";
import useResponsive from "../hooks/useResponsive";
import { DeleteIcon } from "../assets/icons/icons2";
import { Checkbox, Drawer, Button } from "antd";
import { PlusIcon, X } from "lucide-react";
import { imageProvider } from "../lib/imageProvider";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange, } from 'react-date-range';
import { ChevronDown } from "lucide-react";
import { Radio } from "antd";
import TimePicker from "../components/calendarManagement/pendingBookings/TimePicker";
import { Calendar } from "lucide-react";

function TimePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { md, lg } = useResponsive()

  const [open, setOpen] = useState(false)
  const [openDateRange, setOpenDateRange] = useState(false)

  const [isAllDay, setIsAllDay] = useState(false);

  const [openForFrequency, setOpenForFrequency] = useState(false)
  const [label, setLabel] = useState("Does not repeat");
  const [selectValue, setSelectvalue] = useState(label);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGenderChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleAllDayChange = (e) => {
    setIsAllDay(e.target.checked);
  };

  return (
    <div className="w-full p-5">

      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true)
          setOpen(true)
        }}
        className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
      >
        <PlusIcon className="text-[#FFF]" />
        Set time-based
      </button>
      <TimePageTable />



      {(lg || md) ? (
        <TimeBasedModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setOpenDateRange={setOpenDateRange}
          openDateRange={openDateRange}
          formatDate={formatDate}
          handleGenderChange={handleGenderChange}
          handleAllDayChange={handleAllDayChange}
          isAllDay={isAllDay}
          handleCancel={handleCancel}
        />) : (
        <>
          <Drawer
            placement={"bottom"}
            closable={false}
            title="Set time-based"
            extra={
              <Button type="text" onClick={() => setOpen(false)} className="!px-0">
                <X size={24} className="text-description" />
              </Button>
            }
            height="70%"
            onClose={() => setOpen(false)}
            open={open}
            className="rounded-t-xl"
          >
            <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
              <div className="space-y-3 mt-4 px-3.5">
                <div className="">
                  <fieldset className="mb-4">
                    <label htmlFor="date" className="block w-fit mb-1">
                      Date <span className="text-[#ED4245]">*</span>
                    </label>
                    <>
                      <div
                        className="py-2 border border-border rounded-md flex items-center justify-between px-3"
                        onClick={() => setOpenDateRange(true)}
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

                      <Drawer
                        title="Date"
                        placement={"bottom"}
                        closable={false}
                        open={openDateRange}
                        extra={
                          <Button type="text" onClick={() => setOpenDateRange(false)} className="!px-0">
                            <X size={24} className="text-description" />
                          </Button>
                        }
                        height="52%"
                        onClose={() => setOpenDateRange(false)}
                        className="rounded-t-xl"
                      >
                        <div style={{ width: "100%" }}>
                          <DateRange
                            className="custom-calendar"
                            ranges={range}
                            onChange={(item) => setRange([item.selection])}
                            showDateDisplay={false}
                            showSelectionPreview={false}
                            moveRangeOnFirstSelection={false}
                            rangeColors={["#dedbfb"]}
                          />
                        </div>
                        <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center">
                          <button
                            onClick={() => {
                              setOpenDateRange(false)
                            }}
                            className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md">
                            Apply
                          </button>
                        </div>
                      </Drawer>
                    </>
                  </fieldset>

                  {/* frequency drower */}
                  <fieldset>
                    <label htmlFor="lastName" className="block w-fit mb-1">
                      Frequency <span className="text-[#ED4245]">*</span>
                    </label>
                    <Button
                      type="default"
                      className="w-full !flex !justify-between !py-5 !border !border-gray-300"
                      onClick={() => setOpenForFrequency(true)}>
                      {selectValue} <ChevronDown className="text-description" />
                    </Button>
                    <Drawer
                      placement={"bottom"}
                      closable={false}
                      title="Frequency"
                      extra={
                        <Button type="text" onClick={() => setOpenForFrequency(false)} className="!px-0">
                          <X size={24} className="text-description" />
                        </Button>
                      }
                      height="33%"
                      onClose={() => setOpenForFrequency(false)}
                      open={openForFrequency}
                      className="rounded-t-xl"
                    >
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          padding: 20,
                          fontSize: '14px'
                        }}
                        onChange={
                          (e) => setLabel(e.target.value)
                        }
                        value={label}
                        options={[
                          { value: 'Does not repeat', label: 'Does not repeat' },
                          { value: 'Every day', label: 'Every day' },
                          { value: 'Every week on [weekday]', label: 'Every week on [weekday]' },
                        ]}
                      />
                      <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center">
                        <button
                          onClick={() => {
                            setOpenForFrequency(false)
                            setSelectvalue(label)
                          }}
                          className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md">
                          Apply
                        </button>
                      </div>
                    </Drawer>
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

                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[#ACAFB4]">End time</h4>
                      <TimePicker

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

              <div className="mt-6 mb-2 flex items-center justify-around py-7 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <img src={imageProvider.deleteIcon} alt="delete icon" />
                  <p className="text-[#ED4245] text-[15px] font-semibold mt-0.5 hover:scale-95 transform transition-all duration-300 ease-in-out">
                    Remove
                  </p>
                </div>

                <div className="">
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="font-semibold bg-black-button text-white py-2.5 px-12 rounded-lg cursor-pointer ">
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </Drawer>
          <style>
            {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
          </style>
        </>
      )}

    </div>
  );
}

export default TimePage;
