import { Avatar, Button } from "antd";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  CircleUserRound,
  Crown,
  PhoneCall,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { formatToDDMonYYYY } from "../../../utils/dateFormatter";
import BookingDetailsServices from "./BookingDetailsServices";
import BookingSummary from "./BookingSummary";
import StaffReassignSelect from "./StaffReassignSelect";
import StyledDatePicker from "./StyledDatePicker";
import TimePicker from "./TimePicker";

const BookingDetailsContent = ({ selectedDate, setSelectedDate, booking }) => {
  const [showMore, setShowMore] = useState(false);
  console.log("Booking Details Content Rendered", booking);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
    const day = String(date?.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date?.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  };

  const handleReassign = (newStaff) => {
    console.log("Re-assigned to:", newStaff);
    // Add logic to update booking.staffName if needed
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Left Section: Client and Booking Info */}
      <div className="w-full h-full md:w-[30%] md:border-r-[1px] md:border-t-[1px] md:border-t-gray-300 md:border-r-gray-300 md:p-4">
        <div className="flex flex-row lg:flex-col gap-2 md:gap-4 items-start md:border-b-[1px] md:border-b-gray-300 pb-3 max-md:px-4">
          <div className="w-[64px] h-[64px]">
            <Avatar
              size={60}
              style={{
                backgroundColor: "#744CDB",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              shape="circle">
              {booking?.avatar}
            </Avatar>
          </div>

          <div className="flex items-center gap-2 max-md:hidden">
            <Link
              to={"#"}
              className="text-[#3E70DD] underline decoration-1 decoration-Boulder-400 text-[20px] font-medium">
              {booking?.clientName}
            </Link>
            <div className="w-5 h-5 rounded-full bg-[#FFB743] flex items-center justify-center">
              <Crown className="text-white size-3" />
            </div>
          </div>

          {/* Mobile and Tablet View */}
          <div className="md:hidden">
            <div className="flex items-center gap-2">
              <Link
                to={"#"}
                className="text-[#3E70DD] underline decoration-1 decoration-Boulder-400 text-[20px] font-medium">
                {booking?.clientName}
              </Link>
              <div className="w-5 h-5 rounded-full bg-[#FFB743] flex items-center justify-center">
                <Crown className="text-white size-3" />
              </div>
            </div>

            <div className="py-2 space-y-3">
              <div className="flex items-center gap-3">
                <PhoneCall className="size-5 text-gray-600" />
                <p className="text-[#242528] text-[14px] font-normal">
                  {booking?.clientPhone}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <CircleUserRound className="size-5 text-gray-600" />
                  <p className="text-[#242528] text-[14px] font-normal">
                    Staff -{" "}
                  </p>
                </div>
                <StaffReassignSelect
                  booking={booking}
                  onReassign={handleReassign}
                />
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-gray-600" />
                <p className="text-[#242528] text-sm">
                  {formatToDDMonYYYY(booking?.scheduledDate)},
                </p>
                <p className="text-[#242528] text-sm ml-[-2px]">
                  {booking?.scheduledTime}
                </p>
              </div>
            </div>

            {showMore && (
              <>
                <p className="text-[#424348] text-sm font-noramal py-2">
                  Hair is thick and slightly wavy, prefers a shoulder-length
                  layered cut with light texture.
                </p>

                <div className="border-b-[2px] border-dashed border-b-gray-300 my-2" />

                <div className="py-2">
                  <p className="text-[#3A3B3F] text-[14px] font-normal mb-1">
                    Specific notes
                  </p>
                  <div className="border-[1px] border-[#E5E7E8] p-1 h-44 rounded-lg shadow-sm">
                    <p className="text-[#424348] text-sm font-normal p-2">
                      Shop recommend booking a trim every 6-8 weeks
                    </p>
                  </div>
                </div>

                <div className="">
                  <Button
                    color="danger"
                    variant="text"
                    className="flex items-center">
                    <CircleAlert className="size-5" />
                    Add to blacklist
                  </Button>
                </div>
              </>
            )}

            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1 text-[#888888] text-sm font-normal mt-2">
              {showMore ? "Show less" : "Show more"}{" "}
              {showMore ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="py-4 space-y-3 border-b-[2px] border-dashed border-b-gray-300 max-md:hidden">
          <div className="flex items-center gap-3">
            <PhoneCall className="size-5 text-gray-600" />
            <p className="text-[#242528] text-[14px] font-normal">
              {booking?.clientPhone}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <CircleUserRound className="size-5 text-gray-600" />
              <p className="text-[#242528] text-[14px] font-normal">Staff - </p>
            </div>
            <StaffReassignSelect
              booking={booking}
              onReassign={handleReassign}
            />
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-gray-600" />
            <p className="text-[#242528] text-sm">{booking?.scheduledDate},</p>
            <p className="text-[#242528] text-sm">{booking?.scheduledTime}</p>
          </div>

          <p className="text-[#424348] text-sm font-noramal p-2">
            Hair is thick and slightly wavy, prefers a shoulder-length layered
            cut with light texture.
          </p>
        </div>

        <div className="py-4 max-md:hidden">
          <p className="text-[#3A3B3F] text-[14px] font-normal">
            Specific notes
          </p>
          <div className="border-[1px] border-[#E5E7E8] py-2 px-3 h-44 rounded-lg shadow-sm">
            <p className="text-[#424348] text-sm font-normal p-2">
              Shop recommend booking a trim every 6-8 weeks
            </p>
          </div>
        </div>

        <div className="max-md:hidden">
          <Button color="danger" variant="text" className="flex items-center">
            <CircleAlert className="size-5" />
            Add to blacklist
          </Button>
        </div>
      </div>

      {/* Middle Section: Services INfo */}
      <div className="w-full lg:w-[50%] lg:border-r-[1px] lg:border-t-[1px] lg:border-t-gray-300 lg:border-r-gray-300">
        <div className="bg-[#F5F4FE] w-full p-4 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center max-md:gap-2 max-md:my-2">
          {/* Date Picker */}
          <div className="relative max-md:hidden">
            <StyledDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dateFormat="EEE, dd MMM yyyy"
              customInput={
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-lg font-semibold text-[#6C5DD3]">
                    {formatDate(selectedDate)}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#6C5DD3]" />
                </div>
              }
            />
          </div>

          {/* Mobile Screen Date Picker */}
          <div className="relative md:hidden">
            <StyledDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dateFormat="EEE, dd MMM yyyy"
              customInput={
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-lg font-semibold text-[#6C5DD3]">
                    {formatDate(selectedDate)}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#6C5DD3]" />
                </div>
              }
              isMobile={true}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Time Picker */}
            <TimePicker scheduledTime={booking?.scheduledTime} />

            {/* Mobile Screen Time Picker */}
            <TimePicker
              isMobile={true}
              scheduledTime={booking?.scheduledTime}
            />

            <div
              className={`px-3 py-2 bg-[#FFFFFF] rounded-lg text-sm font-medium ${
                booking?.status === "Pending"
                  ? "text-[#FC8B23]"
                  : booking?.status === "Confirmed"
                  ? "text-[#3E70DD]"
                  : booking?.status === "Completed"
                  ? "text-[#21C66E]"
                  : booking?.status === "Cancelled"
                  ? "text-[#ED4245]"
                  : booking?.status === "No Show"
                  ? "text-[#82868E]"
                  : ""
              }`}>
              {booking?.status}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-4 py-6 w-full">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-[#242528]">Services</h3>

            <Button
              onClick={() => navigate("/dashboard/service-menu")}
              className="flex items-center gap-2 bg-[#FFFFFF] px-2 py-3 border-[1px] border-[#744CDB] rounded-lg">
              <Plus size={18} color="#744CDB" />
              <span className="text-[#744CDB] text-sm font-normal">
                Add service
              </span>
            </Button>
          </div>

          {/* Serivices List */}
          <BookingDetailsServices services={booking?.serviceDetails} />
        </div>
      </div>

      {/* Right Section: Summary */}
      <div className="w-full h-full lg:w-[30%] lg:border-t-[1px] lg:border-t-gray-300 p-4">
        <BookingSummary status={booking?.status} />
      </div>
    </div>
  );
};

export default BookingDetailsContent;
