import React from "react";
import { use } from "react";
import { useParams } from "react-router";

const BookingsDetailsPage = () => {
  const { id } = useParams();
  console.log("booking id", id);

  return (
    <div className="w-full">
      <h1>Booking Details for ID: {id}</h1>
      {/* Add your booking details content here */}
    </div>
  );
};

export default BookingsDetailsPage;
