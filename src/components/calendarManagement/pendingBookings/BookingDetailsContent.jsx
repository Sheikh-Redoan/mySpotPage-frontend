import { Button, Select } from "antd";
import { CircleUserRound } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Crown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router";
import StaffReassignSelect from "./StaffReassignSelect";
import { Calendar } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Clock } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import StyledDatePicker from "./StyledDatePicker";

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
            <div className="bg-[#FFFFFF] px-3 py-2 rounded-lg border-[1px] border-[#262626] text-[#242528] text-sm font-normal flex gap-2 items-center">
              {booking.scheduledTime}
              <Clock size={16} />
            </div>
            <div className="px-3 py-2 bg-[#FFFFFF] text-[#FC8B23] rounded-lg text-sm font-medium">
              {booking.status}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Summary */}
      <div className="w-full lg:w-[30%] border-t-[1px] border-t-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Travel Fee</p>
          <p className="text-gray-600">฿0.00</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-gray-600">฿{booking.subtotal}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">VAT</p>
          <p className="text-gray-600">฿{booking.tax}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Discount ({booking.discount})</p>
          <p className="text-gray-600">฿-{booking.discountAmount}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Additional Discount</p>
          <p className="text-gray-600">฿0.00</p>
        </div>
        <div className="flex justify-between font-semibold mt-4 pt-4 border-t border-gray-200">
          <p>Total</p>
          <p>฿{booking.totalPrice}</p>
        </div>

        {/* Status and Save Button */}
        <div className="mt-4">
          <select
            value={booking.status}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2 text-gray-700"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsContent;
