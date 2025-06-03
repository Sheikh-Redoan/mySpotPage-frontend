import React, { useState } from "react";
import { useParams } from "react-router";
import { getPendingBookingsById } from "../../dummy-data/bookingsData";
import BookingDetailsContent from "../../components/calendarManagement/BookingDetailsContent";

const BookingsDetailsOfEachStatus = () => {
  const { id } = useParams();
  const booking = getPendingBookingsById(id);

  // State for the date picker
  const [selectedDate, setSelectedDate] = useState(
    booking
      ? new Date(booking.scheduledDate.split("/").reverse().join("-"))
      : new Date()
  );

  if (!booking) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
      </div>
    );
  }

  return (
    <section className="p-4">
      <h3 className="text-[18px] text-[#242528] font-semibold mb-4">
        Booking Details
      </h3>

      <BookingDetailsContent
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        booking={booking}
      />
    </section>
  );
};

export default BookingsDetailsOfEachStatus;
