import React, { useState, useEffect } from "react";
// Importing icons from react-icons
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { PiStorefrontLight, PiInfo, PiFireLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { CiMap } from "react-icons/ci";
import { SplitIcon } from "lucide-react";

// Importing the ConfirmDetails component
import ConfirmDetails from "../../components/client/ConfirmDetails";

// Dummy image import for services.
import confirm_product from "../../assets/images/confirm.jpg";

const ConfirmPending = () => {
  // State to manage the booking status: 'pending' or 'confirmed'
  const [bookingStatus, setBookingStatus] = useState('pending');

  const bookingData = {
    thankYouMessage: "Thank You for Your Booking!",
    confirmationText:
      "Your booking is confirmed! You’ve successfully booked an appointment at TCL Beauty Studio 01. See you soon!",
    paymentRequirementTitle: "Payment Requirement",
    paymentInstruction: "You will pay at the appointment location",
    storeName: "TCL Beauty Studio 01",
    rating: "4.8",
    reviewsCount: "2.5K",
    location: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    staffName: "John Doe",
    appointmentDateTime: "06 Jan 2025, 11:00",
    bookingNote:
      "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
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
    ],
    subtotal: "₪270.00",
    vatIncluded: "(includes ₪48.60 VAT)",
    discountPercentage: "20% OFF",
    discountAmount: "-₪54.00",
    total: "₪216.00",
  };

  // Simulate an API call to update booking status
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real application, this would be an actual API call
      // and you would set the status based on the API response.
      setBookingStatus('confirmed'); // Simulate successful confirmation
    }, 5000); // Simulate 5 seconds delay for API response

    return () => clearTimeout(timer); // Cleanup the timer if component unmounts
  }, []); // Empty dependency array means this effect runs once on mount

  // Helper function to render dynamic stars based on the rating string
  const renderStars = (currentRatingString) => {
    const numericRating = parseFloat(currentRatingString);
    if (isNaN(numericRating)) {
      return null;
    }

    const totalStars = 5;
    const fullStars = Math.floor(numericRating);
    const partialStarFraction = numericRating - fullStars;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={`star-full-${i}`} className="text-[#FFD056] text-sm" />
        );
      } else if (i === fullStars && partialStarFraction > 0) {
        stars.push(
          <div
            key={`star-partial-${i}`}
            className="relative inline-block w-4 h-4"
          >
            <FaStar className="text-gray-300 absolute top-0 left-0 text-sm" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${partialStarFraction * 100}%` }}
            >
              <FaStar className="text-[#FFD056] text-sm" />
            </div>
          </div>
        );
      } else {
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
            <h1 className="text-Boulder-950 text-3xl font-semibold font-['Golos_Text'] leading-10 text-center">
              {bookingData.thankYouMessage}
            </h1>
            <p className="max-w-[472px] text-center justify-start text-description text-base font-normal font-['Golos_Text'] leading-normal">
              {bookingData.confirmationText}
            </p>
          </div>
        </div>

        {/* Booking Status Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold font-['Golos_Text'] leading-7">
            Booking Status
          </h2>
          <div className="relative w-full">

            {/* Conditionally render Pending status and dashed line */}
            {bookingStatus === 'pending' && (
              <>
                {/* Dashed line connector */}
                <div className="absolute left-[11px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-300 h-[45%]"></div>

                {/* Pending for Confirmation Status - Using original div design */}
                <div className="flex items-start mb-8 z-10 relative">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                    {/* Inner green dot for active pending as per image */}
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-base font-medium text-gray-800 mb-1">
                      Pending for Confirmation
                    </h3>
                    <p className="text-sm text-gray-600 leading-tight">
                      Our team will review and send to your phone number a
                      confirmation message once it has been approved.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Confirmed Status - Using original div design with conditional styling */}
            <div className="flex items-start z-10 relative">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${bookingStatus === 'confirmed' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                {/* Inner white dot, visible only when 'confirmed' and active */}
                <div className={`w-3 h-3 rounded-full bg-white ${bookingStatus === 'confirmed' ? 'block' : 'hidden'}`}></div>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-base font-medium text-gray-800 mb-1">
                  Confirmed
                </h3>
                <p className="text-sm text-gray-600 leading-tight">
                  We look forward to seeing you at your scheduled time. If you
                  need to make any changes, please contact us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Requirement Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold font-['Golos_Text'] leading-7">
            {bookingData.paymentRequirementTitle}
          </h2>
          <div className="self-stretch px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2">
            <PiStorefrontLight className="text-violet-500 text-2xl flex-shrink-0" />
            <p className="text-violet-500 text-base font-semibold font-['Golos_Text'] leading-normal">
              {bookingData.paymentInstruction}
            </p>
          </div>
        </div>

        {/* Booking Information Section */}
        <div className="w-full max-w-[856px] p-6 bg-white rounded-xl shadow flex flex-col justify-start items-start gap-4">
          <h2 className="self-stretch text-violet-500 text-xl font-semibold font-['Golos_Text'] leading-7">
            Booking Information
          </h2>

          <div className="self-stretch p-4 bg-white rounded-lg outline outline-offset-[-1px] outline-violet-100 inline-flex justify-between items-start gap-2">
            <div>
              {/* Store Name */}
              <div className="flex justify-start items-center text-Boulder-950 text-lg font-semibold leading-relaxed">
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
              <a
                href="#"
                className="justify-center text-violet-600 text-xs font-normal font-['Golos_Text'] underline leading-none"
              >
                View larger map
              </a>
            </div>

            {/* Get Direction button */}
            <div className="flex flex-col justify-center items-center">
              <SplitIcon className="text-violet-600" />
              <a
                href="#"
                className="justify-center text-violet-600 text-sm font-semibold font-['Golos_Text'] underline leading-tight"
              >
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

export default ConfirmPending;