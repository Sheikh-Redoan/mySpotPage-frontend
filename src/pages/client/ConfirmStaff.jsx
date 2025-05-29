import React, { useState, useEffect } from "react";
import { PiStorefrontLight } from "react-icons/pi";
import Container from "./Container";
import Breadcrumb from "../../components/client/Breadcrumb";
import ConfirmDetails from "../../components/client/ConfirmDetails";
import confirm_product from "../../assets/images/confirm.jpg";
import { Link } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const ConfirmStaff = () => {
  // State to manage mobile view and full summary modal visibility
  const [isMobile, setIsMobile] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Sample data to pass to ConfirmDetails.
  const storeData = {
    storeName: "TCL Beauty Studio 01",
    rating: "4.8",
    reviewsCount: "12.5K reviews",
    location: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
    staffName: "John Doe",
    appointmentDateTime: "06 Jan 2025, 11:00",
    bookingNote:
      "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
    services: [
      {
        id: 1,
        image: confirm_product, // Using the dummy image for all services
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
    paymentInstruction: "You will pay at the appointment location",
    buttonTittle: "Complete",
    buttonpath: "/service-provider-info/confirmation-pending",
  };

  // Effect to detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Check if screen width is between 350px and 400px (inclusive)
      setIsMobile(window.innerWidth >= 350 && window.innerWidth <= 400);
    };

    // Set initial state on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // JSX for the collapsed mobile footer (when showFullSummary is false)
  const MobileCollapsedFooter = (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 rounded-t-xl">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">{storeData.storeName}</h3>
          <p className="text-sm text-gray-600">
            {storeData.rating} ({storeData.reviewsCount})
          </p>
        </div>
        <button
          onClick={() => setShowFullSummary(true)}
          className="text-black text-sm font-semibold flex justify-center items-center"
        >
          See detail <MdOutlineKeyboardArrowDown/>
        </button>
      </div>
        <div className="border-t border-t-gray-200 my-3"></div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-description">Total</span>
        <span className="text-lg font-bold text-violet-500">{storeData.total}</span>
      </div>
      <Link to="/service-provider-info/confirmation-pending">
        <button className="cursor-pointer bg-black rounded-xl justify-center text-white text-base font-semibold font-['Golos_Text'] leading-normal py-[10px] w-full text-center hover:bg-gray-800 transition-colors duration-200">
          {storeData.buttonTittle}
        </button>
      </Link>
      <p className="text-center text-xs text-gray-500 mt-2">
        {storeData.paymentInstruction}
      </p>
    </div>
  );

  // JSX for the full mobile summary modal (when showFullSummary is true)
  const MobileFullSummaryModal = (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 overflow-y-auto shadow-[0_0_80px_29px_black] mt-5 rounded-[30px_30px_0_0]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Summary</h2>
        <button
          onClick={() => setShowFullSummary(false)}
          className="text-gray-500 text-2xl font-bold"
        >
          &times; {/* Cross icon */}
        </button>
      </div>
      {/* Render ConfirmDetails component directly inside the modal */}
      <ConfirmDetails
        storeName={storeData.storeName}
        rating={storeData.rating}
        reviewsCount={storeData.reviewsCount}
        location={storeData.location}
        staffName={storeData.staffName}
        appointmentDateTime={storeData.appointmentDateTime}
        bookingNote={storeData.bookingNote}
        services={storeData.services}
        subtotal={storeData.subtotal}
        vatIncluded={storeData.vatIncluded}
        discountPercentage={storeData.discountPercentage}
        discountAmount={storeData.discountAmount}
        total={storeData.total}
        paymentInstruction={storeData.paymentInstruction}
        buttonTittle={"Complete"}
        buttonpath={"/service-provider-info/confirmation-pending"} // Button text for the full summary modal
      />
    </div>
  );

  return (
    <div>
      <section className="py-4">
        <Container className="max-w-[1296px] mx-auto px-4">
          {/* Breadcrumb: Set isAddressPage to false to match the provided image's breadcrumb */}
          <Breadcrumb isAddressPage={false} />
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 mt-6">
            <div className="p-5 bg-white rounded-xl flex-1 w-full lg:w-auto">
              <h2 className="text-Boulder-950 text-base font-semibold leading-normal mb-4">
                Confirm
              </h2>
              <div className="px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2 mb-4">
                <PiStorefrontLight className="text-primary01 text-[24px] flex-shrink-0" />
                <p className="text-violet-500 text-base font-semibold leading-normal">
                  You will pay at the appointment location
                </p>
              </div>
              <div>
                <p className="text-neutral-700 text-sm font-normal leading-tight mb-1">
                  Booking note
                </p>
                <div className="px-3 py-2 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-200 flex items-start gap-2 w-full min-h-[125px]">
                  <h3 className="flex-1 text-zinc-700 text-sm font-normal leading-tight">
                    {storeData.bookingNote}
                  </h3>
                </div>
              </div>
            </div>

            {/* Conditional rendering for ConfirmDetails outside the mobile range */}
            {!isMobile && (
              <ConfirmDetails
                className="w-full lg:w-80 p-4 flex-shrink-0"
                storeName={storeData.storeName}
                rating={storeData.rating}
                reviewsCount={storeData.reviewsCount}
                location={storeData.location}
                staffName={storeData.staffName}
                appointmentDateTime={storeData.appointmentDateTime}
                bookingNote={storeData.bookingNote}
                services={storeData.services}
                subtotal={storeData.subtotal}
                vatIncluded={storeData.vatIncluded}
                discountPercentage={storeData.discountPercentage}
                discountAmount={storeData.discountAmount}
                total={storeData.total}
                paymentInstruction={storeData.paymentInstruction}
                buttonTittle={"Complete"} // Button text for desktop view
                buttonpath={"/service-provider-info/confirmation-pending"}
              />
            )}
          </div>
        </Container>
      </section>

      {/* Render mobile-specific UI based on state */}
      {isMobile && !showFullSummary && MobileCollapsedFooter}
      {isMobile && showFullSummary && MobileFullSummaryModal}
    </div>
  );
};

export default ConfirmStaff;
