import { Button, DatePicker, Drawer, Segmented } from "antd";
import dayjs from "dayjs";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Plus,
  Settings,
  StretchHorizontal,
  StretchVertical,
  TextSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils";
import SettingsBookingsRulesModal from "../calendarManagement/SettingsBookingsRulesModal";
import StaffSelection from "../calendarManagement/StaffSelection";
import MultipleSelector from "../shared/MultipleSelector";

export default function CalendarToolbar({
  selectedDate,
  onDatePickerChange,
  handleNavButtonClick,
  handleTodayClick,
  currentView,
  handleViewChange,
  applyFilter = true,
  selectTimeFromProvider = false,
}) {
  const [openMonth, setOpenMonth] = useState(false);
  const [selectMonth, setSelectMonth] = useState(dayjs().month() + 1);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const onClose = () => {
    setOpenDrawer(false);
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format("MMMM")
  );

  return (
    <>
      <div
        className={cn(
          "flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-start md:justify-between mb-4",
          { "max-md:hidden": !selectTimeFromProvider }
        )}
      >
        <div className="flex items-center gap-4 max-md:self-start">
          <div className="flex items-center">
            <button
              className="cursor-pointer mr-2"
              onClick={() => handleNavButtonClick("prev")}
            >
              <ChevronLeft size={20} />
            </button>
            <DatePicker
              onChange={onDatePickerChange}
              picker="month"
              value={selectedDate}
              format="MMMM YYYY"
              allowClear={false}
              className="w-40 h-9"
            />
            <button
              className="cursor-pointer ml-1.5"
              onClick={() => handleNavButtonClick("next")}
            >
              <ChevronRight size={20} />
            </button>
            <button
              className="text-[#866be7] cursor-pointer text-[14px] font-semibold ml-4"
              onClick={handleTodayClick}
            >
              Today
            </button>
          </div>

          {/* Filter Actions */}
          {applyFilter && (
            <div className="md:ml-4 w-xs">
              <MultipleSelector
                data={[
                  "All Staffs",
                  "My Staffs",
                  "Admins",
                  "Managers",
                  "Staffs",
                ]}
                name={"calender-filter"}
              />
            </div>
          )}
        </div>

        <Segmented
          options={[
            { label: (<div className="!w-18">Month</div>), value: "month" },
            { label: (<div className="!w-18">Week</div>), value: "week" },
            { label: (<div className="!w-18">Day</div>), value: "day" },
          ]}
          value={currentView}
          onChange={handleViewChange}
          className="border border-gray-300"
        />
      </div>

      {/* Mobile View From Seller Calendar Management */}
      {!selectTimeFromProvider && (
        <>
          <div className="px-4 lg:hidden mb-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  type="text"
                  className="!p-0"
                  onClick={() => setOpenDrawer(true)}
                >
                  <TextSearch
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#888888]"
                  />
                </Button>

                <Button
                  type="text"
                  className="!p-0"
                  onClick={() => setOpenMonth(!openMonth)}
                >
                  <span>
                    {dayjs()
                      .month(selectMonth - 1)
                      .format("MMMM")}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={cn("transition-transform", {
                      "rotate-180": openMonth,
                    })}
                  />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="text"
                  className="!p-0 !text-primary01 !font-bold"
                  onClick={handleTodayClick}
                >
                  Today
                </Button>

                <Button
                  type="default"
                  className="!p-0 !w-8 !h-8 !rounded-full !border-primary01"
                  onClick={() => setSettingsModalOpen(true)}
                >
                  <Settings
                    size={16}
                    strokeWidth={1.5}
                    className="text-primary01"
                  />
                </Button>

                <Link to="/dashboard/add-booking-by-provider">
                  <Button
                    type="default"
                    className="!p-0 !w-8 !h-8 !rounded-full !border-primary01"
                  >
                    <Plus
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary01"
                    />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center justify-between gap-2 mt-2 overflow-x-auto py-5 transition-all",
                { hidden: !openMonth }
              )}
            >
              {months.map((month, index) => (
                <Button
                  key={month}
                  type="default"
                  onClick={() => {
                    onDatePickerChange(dayjs().month(index));
                    setSelectMonth(index + 1);
                    // setOpenMonth(false);
                  }}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>

          {/* Settings Bookings Rules Modal */}
          <SettingsBookingsRulesModal
            settingsModalOpen={settingsModalOpen}
            setSettingsModalOpen={setSettingsModalOpen}
          />

          <Drawer
            placement="left"
            width={250}
            onClose={onClose}
            open={openDrawer}
            closeIcon={false}
            extra={
              <Button
                type="text"
                className="!p-0 !text-primary01 !font-bold"
                onClick={onClose}
              >
                Close
              </Button>
            }
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 py-4 px-6">
              <h3 className="text-base font-semibold">View mode</h3>
              <X
                size={20}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>

            <div className="border-b border-gray-200 pb-3">
              <Segmented
                options={[
                  {
                    label: (
                      <div className="flex items-center gap-2 my-2">
                        <Grid3x3 size={20} strokeWidth={1.5} />
                        <span>Month view</span>
                      </div>
                    ),
                    value: "month",
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2 my-2">
                        <StretchVertical size={20} strokeWidth={1.5} />
                        <span>Week view</span>
                      </div>
                    ),
                    value: "week",
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2 my-2">
                        <StretchHorizontal size={20} strokeWidth={1.5} />
                        <span>Day view</span>
                      </div>
                    ),
                    value: "day",
                  },
                ]}
                value={currentView}
                onChange={handleViewChange}
                size="large"
                className="mb-4 !w-full text-start"
                vertical
              />
            </div>

            <div className="flex flex-col gap-4 px-4 py-5">
              <StaffSelection />
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
    </>
  );
}
