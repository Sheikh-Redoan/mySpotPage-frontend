import { Button } from "antd";
import { CircleUserRound } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Crown } from "lucide-react";
import { Link } from "react-router";
import StaffReassignSelect from "./StaffReassignSelect";
import { Calendar } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { ChevronDown } from "lucide-react";
import StyledDatePicker from "./StyledDatePicker";
import TimePicker from "./TimePicker";
import { Plus } from "lucide-react";

const BookingDetailsContent = ({ selectedDate, setSelectedDate, booking }) => {
  console.log("booking", booking);

  const formatDate = (date) => {
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  };

  const handleReassign = (newStaff) => {
    console.log("Re-assigned to:", newStaff);
    // Add logic to update booking.staffName if needed
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* Left Section: Client and Booking Info */}
      <div className="w-full lg:w-[30%] border-r-[1px] border-t-[1px] border-t-gray-300 border-r-gray-300 p-4">
        <div className="space-y-4 border-b-[1px] border-b-gray-300 pb-3">
          <div className="w-16 h-16 bg-primary01 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {booking.avatar}
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"#"}
              className="text-[#3E70DD] underline decoration-1 decoration-Boulder-400 text-[20px] font-medium"
            >
              {booking.clientName}
            </Link>
            <div className="w-5 h-5 rounded-full bg-[#FFB743] flex items-center justify-center">
              <Crown className="text-white size-3" />
            </div>
          </div>
        </div>

        <div className="py-4 space-y-3 border-b-[2px] border-dashed border-b-gray-300">
          <div className="flex items-center gap-3">
            <PhoneCall className="size-5 text-gray-600" />
            <p className="text-[#242528] text-[14px] font-normal">
              {booking.clientPhone}
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
            <p className="text-[#242528] text-sm">{booking.scheduledDate},</p>
            <p className="text-[#242528] text-sm">{booking.scheduledTime}</p>
          </div>

          <p className="text-[#424348] text-sm font-noramal p-2">
            Hair is thick and slightly wavy, prefers a shoulder-length layered
            cut with light texture.
          </p>
        </div>

        <div className="py-4">
          <p className="text-[#3A3B3F] text-[14px] font-normal">
            Specific notes
          </p>
          <div className="border-[1px] border-[#E5E7E8] py-2 px-3 h-44 rounded-lg shadow-sm">
            <p className="text-[#424348] text-sm font-normal p-2">
              Shop recommend booking a trim every 6-8 weeks
            </p>
          </div>
        </div>

        <div>
          <Button color="danger" variant="text" className="flex items-center">
            <CircleAlert className="size-5" />
            Add to blacklist
          </Button>
        </div>
      </div>

      {/* Middle Section: Services INfo */}
      <div className="w-full lg:w-[50%] border-r-[1px] border-t-[1px] border-t-gray-300 border-r-gray-300">
        <div className="bg-[#F5F4FE] w-full p-4 flex justify-between items-center">
          {/* Date Picker */}
          <div className="relative">
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
          <div className="flex items-center gap-2">
            {/* Time Picker */}
            <TimePicker scheduledTime={booking?.scheduledTime} />

            <div
              className={`px-3 py-2 bg-[#FFFFFF] rounded-lg text-sm font-medium ${
                booking.status === "Pending"
                  ? "text-[#FC8B23]"
                  : booking.status === "Confirmed"
                  ? "text-[#3E70DD]"
                  : booking.status === "Completed"
                  ? "text-[#21C66E]"
                  : booking.status === "Cancelled"
                  ? "text-[#ED4245]"
                  : booking.status === "No Show"
                  ? "text-[#82868E]"
                  : ""
              }`}
            >
              {booking.status}
            </div>
          </div>
        </div>

        <div className="px-4 py-6 w-full">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-[#242528]">Services</h3>

            <Button className="flex items-center gap-2 bg-[#FFFFFF] px-2 py-3 border-[1px] border-[#744CDB] rounded-lg">
              <Plus size={18} color="#744CDB" />
              <span className="text-[#744CDB] text-sm font-normal">Add service</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section: Summary */}
      <div>summary</div>
    </div>
  );
};

export default BookingDetailsContent;
