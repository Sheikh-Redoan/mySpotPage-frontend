import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetailsContent = ({selectedDate, setSelectedDate, booking}) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Left Section: Client and Booking Info */}
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {booking.avatar}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{booking.clientName}</h1>
            <p className="text-gray-600">{booking.clientPhone}</p>
          </div>
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

        {/* Staff */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Staff:</span> {booking.staffName}
          </p>
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
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
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
