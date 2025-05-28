import React from "react";
// Importing icons from react-icons
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { PiStorefrontLight, PiInfo, PiFireLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
// import { FaRegUserCircle, FaChevronUp, FaChevronDown } from "react-icons/fa6"; // Using FaChevronUp and FaChevronDown for consistency
import { CiCalendar } from "react-icons/ci";

// Importing the ConfirmDetails component
import ConfirmDetails from "../../components/client/ConfirmDetails"; // Adjust path as per your project structure

// Dummy image import for services. In a real application, these would be dynamic.
// Ensure this path is correct relative to ConfirmBooking.jsx
import confirm_product from "../../assets/images/confirm.jpg";

const ConfirmBooking = () => {
  // Define all the data required for the Confirm Booking page.
  // This data would typically come from an API call or a global state management system.
  const bookingData = {
    // Top section data
    thankYouMessage: "Thank You for Your Booking!",
    confirmationText: "Your booking is confirmed! You’ve successfully booked an appointment at TCL Beauty Studio 01. See you soon!",

    // Payment Requirement section data
    paymentRequirementTitle: "Payment Requirement",
    paymentInstruction: "You will pay at the appointment location",

    // Booking Information section data (passed to ConfirmDetails component)
    storeName: "TCL Beauty Studio 01",
    rating: "4.8",
    reviewsCount: "12.5K reviews",
    location: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    staffName: "John Doe",
    appointmentDateTime: "06 Jan 2025, 11:00",
    bookingNote: "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
    services: [
      {
        id: 1,
        image: confirm_product,
        name: "Classic Ombre",
        options: "Smooth / Scalp treatment",
        duration: "2h45m",
        price: "₪70.00",
      },
      {
        id: 2,
        image: confirm_product,
        name: "Reverse Ombre",
        options: "Shadow Root",
        duration: "3h30m",
        price: "₪100.00",
      },
      {
        id: 3,
        image: confirm_product,
        name: "Balayage with Toner",
        options: "30m",
        duration: "30m",
        price: "₪100.00",
      },
      // You can add more services here to test the "Show more" functionality
      // {
      //   id: 4,
      //   image: confirm_product,
      //   name: "Haircut & Style",
      //   options: "Short Hair",
      //   duration: "1h00m",
      //   price: "₪60.00",
      // },
    ],
    subtotal: "₪270.00",
    vatIncluded: "(includes ₪48.60 VAT)",
    discountPercentage: "20% OFF",
    discountAmount: "-₪54.00",
    total: "₪216.00",
  };

  return (
    // Main container for the entire page, with background color and padding
    <div className="self-stretch px-4 py-5 bg-gray-50 flex flex-col items-center gap-10 lg:px-16">
      {/* Content wrapper for desktop view to control max width */}
      <div className="w-full max-w-[1296px] flex flex-col items-center gap-5">

        {/* Thank You Message Section */}
        <div className="self-stretch flex flex-col justify-start items-center gap-4">
          {/* Checkmark Icon */}
          <div className="w-12 h-12 relative flex z-[1] items-center justify-center rounded-full bg-green-500">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          {/* Thank you title and confirmation text */}
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <h1 className="text-Boulder-950 text-3xl font-semibold font-['Golos_Text'] leading-10 text-center">
              {bookingData.thankYouMessage}
            </h1>
            <p className="w-full max-w-[604px] text-center text-Boulder-500 text-base font-normal font-['Golos_Text'] leading-normal">
              {bookingData.confirmationText}
            </p>
          </div>
        </div>

        {/* Payment Requirement Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold font-['Golos_Text'] leading-7">
            {bookingData.paymentRequirementTitle}
          </h2>
          <div className="self-stretch px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2">
            <PiStorefrontLight className="text-violet-500 text-2xl flex-shrink-0" /> {/* Using PiStorefrontLight for the icon */}
            <p className="text-violet-500 text-base font-semibold font-['Golos_Text'] leading-normal">
              {bookingData.paymentInstruction}
            </p>
          </div>
        </div>

        {/* Booking Information Section (using ConfirmDetails component) */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold font-['Golos_Text'] leading-7">
            Booking Information
          </h2>
          {/* Render the ConfirmDetails component with relevant props */}
          
          <ConfirmDetails
          className="w-full"
            // No additional className needed here as ConfirmDetails itself has styling
            storeName={bookingData.storeName}
            rating={bookingData.rating}
            reviewsCount={bookingData.reviewsCount}
            // paymentInstruction={bookingData.paymentInstruction} // This prop is used in ConfirmDetails
          />

          <ConfirmDetails
          className="w-full"
            // No additional className needed here as ConfirmDetails itself has styling
            storeName={bookingData.storeName}
            rating={bookingData.rating}
            reviewsCount={bookingData.reviewsCount}
            location={bookingData.location}
            staffName={bookingData.staffName}
            appointmentDateTime={bookingData.appointmentDateTime}
            bookingNote={bookingData.bookingNote}
            services={bookingData.services}
            subtotal={bookingData.subtotal}
            vatIncluded={bookingData.vatIncluded}
            discountPercentage={bookingData.discountPercentage}
            discountAmount={bookingData.discountAmount}
            total={bookingData.total}
            // paymentInstruction={bookingData.paymentInstruction} // This prop is used in ConfirmDetails
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
