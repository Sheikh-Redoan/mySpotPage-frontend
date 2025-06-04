import { Select } from "antd";
import { CircleUserRound } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Crown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router";
import StaffReassignSelect from "./StaffReassignSelect";

const BookingDetailsContent = ({ selectedDate, setSelectedDate, booking }) => {
  console.log("booking", booking);
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const handleReassign = (newStaff) => {
    console.log("Re-assigned to:", newStaff);
    // Add logic to update booking.staffName if needed
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* Left Section: Client and Booking Info */}
      <div className="flex-1 border-r-[1px] border-t-[1px] border-t-gray-300 border-r-gray-300 p-4">
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

        <div className="py-3 flex itcems-center gap-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="size-5 text-gray-600" />
            <p className="text-[#242528] text-[14px] font-normal">
              {booking.clientPhone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CircleUserRound className="size-5 text-gray-600" />
            <p className="text-[#242528] text-[14px] font-normal">Staff - </p>
          </div>
          <StaffReassignSelect booking={booking} onReassign={handleReassign} />
        </div>

        {/* Date and Time */}
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <p className="text-gray-600">{formatDate(selectedDate)}</p>
            <p className="text-gray-600">{booking.scheduledTime}</p>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Services */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          {booking.serviceDetails.map((service, index) => (
            <div key={index} className="flex justify-between py-1">
              <p className="text-gray-600">{service.name}</p>
              <p className="text-gray-600">฿{service.price}</p>
            </div>
          ))}
        </div>

        {/* Special Notes */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Special Notes</h2>
          <p className="text-gray-600">
            {booking.notes || "No notes available"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Service Out
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Add to Blacklist
          </button>
        </div>
      </div>

      {/* Right Section: Summary */}
      <div className="w-full lg:w-1/3 border-t-[1px] border-t-gray-300 p-4">
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
