import React from "react";
// Importing icons from react-icons
import { FaCheckCircle, FaStar } from "react-icons/fa"; // Keep FaStar for custom star rendering
import { PiStorefrontLight, PiInfo, PiFireLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5"; // Keep for location icon in ConfirmDetails if needed later, but we'll use CiMap here
import { CiCalendar } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { CiMap } from "react-icons/ci"; // Using CiMap for the map icon as per your original structure

// Importing the ConfirmDetails component
import ConfirmDetails from "../../components/client/ConfirmDetails"; // Adjust path as per your project structure

// Dummy image import for services. In a real application, these would be dynamic.
import confirm_product from "../../assets/images/confirm.jpg";
import { SplitIcon } from "lucide-react"; // Only SplitIcon is used from lucide-react

const ConfirmBooking = () => {
  const bookingData = {
    thankYouMessage: "Thank You for Your Booking!",
    confirmationText:
      "Your booking is confirmed! You’ve successfully booked an appointment at TCL Beauty Studio 01. See you soon!",
    paymentRequirementTitle: "Payment Requirement",
    paymentInstruction: "You will pay at the appointment location",
    storeName: "TCL Beauty Studio 01",
    rating: "4.8", // This will be used to render stars directly in ConfirmBooking
    reviewsCount: "2.5K", // Changed to 2.5K as per image for consistency
    location: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel", // Location is still part of bookingData
    staffName: "John Doe",
    appointmentDateTime: "06 Jan 2025, 11:00",
    bookingNote:
      "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
    services: [
      { id: 1, image: confirm_product, name: "Classic Ombre", options: "Smooth / Scalp treatment", duration: "2h45m", price: "₪70.00" },
      { id: 2, image: confirm_product, name: "Reverse Ombre", options: "Shadow Root", duration: "3h30m", price: "₪100.00" },
      { id: 3, image: confirm_product, name: "Balayage with Toner", options: "30m", duration: "30m", price: "₪100.00" },
    ],
    subtotal: "₪270.00",
    vatIncluded: "(includes ₪48.60 VAT)",
    discountPercentage: "20% OFF",
    discountAmount: "-₪54.00",
    total: "₪216.00",
  };

  // Helper function to render dynamic stars based on the rating string
  const renderStars = (currentRatingString) => {
    const numericRating = parseFloat(currentRatingString);
    if (isNaN(numericRating)) {
      return null; // Don't render stars if rating is not a valid number
    }

    const totalStars = 5; // Total number of stars to display
    const fullStars = Math.floor(numericRating);
    const partialStarFraction = numericRating - fullStars;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <FaStar key={`star-full-${i}`} className="text-[#FFD056] text-sm" />
        );
      } else if (i === fullStars && partialStarFraction > 0) {
        // Partial star using a layering technique
        stars.push(
          <div key={`star-partial-${i}`} className="relative inline-block w-4 h-4"> {/* Adjust w-4 h-4 for icon size */}
            <FaStar className="text-gray-300 absolute top-0 left-0 text-sm" /> {/* Background empty star */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${partialStarFraction * 100}%` }}
            >
              <FaStar className="text-[#FFD056] text-sm" /> {/* Foreground filled star */}
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <FaStar key={`star-empty-${i}`} className="text-gray-300 text-sm" />
        );
      }
    }
    return stars;
  };


  return (
    <div className="self-stretch px-4 py-5 bg-gray-50 flex flex-col items-center gap-10 lg:px-16">
      <div className="w-full max-w-[1296px] flex flex-col items-center gap-5">
        {/* Thank You Message Section */}
        <div className="self-stretch flex flex-col justify-start items-center gap-4">
          <div className="w-12 h-12 relative flex z-[1] items-center justify-center rounded-full bg-green-500">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <h1 className="text-Boulder-950 text-3xl font-semibold   leading-10 text-center">
              {bookingData.thankYouMessage}
            </h1>
            <p className="w-full max-w-[604px] text-center text-Boulder-500 text-base font-normal   leading-normal">
              {bookingData.confirmationText}
            </p>
          </div>
        </div>

        {/* Payment Requirement Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold   leading-7">
            {bookingData.paymentRequirementTitle}
          </h2>
          <div className="self-stretch px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2">
            <PiStorefrontLight className="text-violet-500 text-2xl flex-shrink-0" />
            <p className="text-violet-500 text-base font-semibold   leading-normal">
              {bookingData.paymentInstruction}
            </p>
          </div>
        </div>

        {/* Booking Information Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold   leading-7">
            Booking Information
          </h2>

          <div className="self-stretch p-4 bg-white rounded-lg outline outline-offset-[-1px] outline-violet-100 inline-flex justify-between items-start gap-2">
            <div>
              {/* Store Name */}
              <div className="flex justify-start items-center text-Boulder-950 text-lg font-semibold leading-relaxed">
                {/* CiMap icon is not part of the store name from the image, it's just a general map icon */}
                {/* <CiMap/>  -- Removed as per image only showing text and stars first */}
                <h3 className="text-Boulder-950 text-lg font-semibold leading-relaxed">
                  {bookingData.storeName}
                </h3>
              </div>

              {/* Dynamic Star Rating and Reviews Count */}
              <div className="flex gap-1 items-center">
                {bookingData.rating && (
                  <div className="flex items-center">
                    {renderStars(bookingData.rating)}
                  </div>
                )}
                {bookingData.rating && (
                  <p className="text-black text-sm font-normal leading-tight">
                    {bookingData.rating}
                  </p>
                )}
                {bookingData.reviewsCount && (
                  <p className="text-description text-sm font-normal underline leading-tight">
                    ({bookingData.reviewsCount})
                  </p>
                )}
              </div>

              {/* Baber shop and location info */}
              <p className="justify-start text-description text-xs font-normal leading-none flex items-center gap-1 my-1 ">
                <span>Baber shop</span> <GoDotFill className="opacity-[.4]" />{" "}
                <span>26 Bedfordbury</span>
              </p>
              <a href="#" className="justify-center text-violet-600 text-xs font-normal   underline leading-none">
                View larger map
              </a>
            </div>

            {/* Get Direction button */}
            <div className="flex flex-col justify-center items-center">
              <SplitIcon className="text-violet-600" />
              <a href="#" className="justify-center text-violet-600 text-sm font-semibold   underline leading-tight">
                Get Direction
              </a>
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-gray-200"></div>

          {/* ConfirmDetails for staff, appointment, services, and pricing */}
          <ConfirmDetails
            className="w-full"
            staffName={bookingData.staffName}
            appointmentDateTime={bookingData.appointmentDateTime}
            bookingNote={bookingData.bookingNote}
            services={bookingData.services}
            subtotal={bookingData.subtotal}
            vatIncluded={bookingData.vatIncluded}
            discountPercentage={bookingData.discountPercentage}
            discountAmount={bookingData.discountAmount}
            total={bookingData.total}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;