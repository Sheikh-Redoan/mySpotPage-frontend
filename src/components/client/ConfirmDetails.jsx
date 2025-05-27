import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'; // Import FaChevronDown for "Show more"
import { PiInfo, PiFireLight } from 'react-icons/pi';

// Dummy image import for demonstration. In a real app, this would likely come from props or a dynamic source.
import confirm_product from '../../assets/images/confirm.jpg'; // Ensure this path is correct relative to ConfirmDetails.jsx

const ConfirmDetails = ({
  className,
  storeName,
  rating,
  reviewsCount,
  location,
  staffName,
  appointmentDateTime,
  bookingNote,
  services,
  subtotal,
  vatIncluded,
  discountPercentage,
  discountAmount,
  total,
  paymentInstruction,
}) => {
  // State to manage the visibility of all services.
  // Initially, if there are more than 2 services, only show 2.
  const [showAllServices, setShowAllServices] = useState(false);

  // Determine which services to display based on the showAllServices state
  const displayedServices = showAllServices ? services : services.slice(0, 2);

  // Toggle function for "Show less/Show more"
  const toggleShowServices = () => {
    setShowAllServices(!showAllServices);
  };

  return (
    <div className={`${className} bg-white rounded-xl flex flex-col justify-start items-start gap-5`}>
      {/* Store Information Section */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
          {storeName}
        </h3>
        <div className="flex gap-1 items-center">
          <FaStar className="text-[#FFD056]" />
          <p className="text-black text-sm font-normal leading-tight">
            {rating}
          </p>
          <p className="text-description text-sm font-normal underline leading-tight">
            ({reviewsCount})
          </p>
        </div>
        <div className="flex gap-2 items-start justify-start">
          <IoLocationOutline className="text-black text-[20px] flex-shrink-0" />
          <p className="self-stretch text-black text-sm font-normal leading-tight">
            {location}
          </p>
        </div>
      </div>

      {/* Staff and Appointment Details Section */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-start justify-start">
          <FaRegUserCircle className="text-black text-[20px] flex-shrink-0" />
          <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
            Staff - {staffName}
          </p>
        </div>
        <div className="flex gap-2 items-start justify-start">
          <CiCalendar className="text-black text-[20px] flex-shrink-0" />
          <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
            {appointmentDateTime}
          </p>
        </div>
        <div className="self-stretch p-3 bg-neutral-50 rounded-lg inline-flex justify-center items-center">
          <div className="flex-1 justify-start">
            <span className="text-neutral-800 text-sm font-semibold leading-tight">
              Note:{" "}
            </span>
            <span className="text-neutral-800 text-sm font-normal leading-tight">
              {bookingNote}
            </span>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full border-t border-dashed border-gray-300"></div>

      {/* Services Section */}
      <div className="flex flex-col gap-[12px] w-full justify-center items-start">
        <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
          Services ({services.length})
        </h3>
        {displayedServices.map((service) => (
          <div key={service.id} className="flex justify-start items-start gap-[12px] w-full">
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 relative rounded-lg object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=No+Image'; }} // Fallback for broken images
            />
            <div className="w-full flex flex-col">
              <h3 className="self-stretch text-Boulder-950 text-sm font-medium leading-tight">
                {service.name}
              </h3>
              <p className="text-violet-500 text-xs font-normal w-max leading-none px-[8px] py-[4px] border border-violet-500 my-[8px] rounded-[20px]">
                {service.options}
              </p>
              <div className="w-full flex justify-between items-center">
                <p className="text-description text-sm font-normal leading-tight">
                  {service.duration}
                </p>
                <p className="text-Boulder-950 text-sm font-normal leading-tight">
                  {service.price}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Show less/Show more button */}
        {services.length > 2 && ( // Only show button if there are more than 2 services
          <button
            onClick={toggleShowServices}
            className="text-sm font-normal font-['Golos_Text'] leading-tight text-description flex items-center justify-center gap-2 cursor-pointer w-full"
          >
            {showAllServices ? (
              <>
                Show less <FaChevronUp />
              </>
            ) : (
              <>
                Show more <FaChevronDown />
              </>
            )}
          </button>
        )}
      </div>

      {/* Separator Line */}
      <div className="w-full border-t border-dashed border-gray-300"></div>

      {/* Pricing Details Section */}
      <div className="flex flex-col gap-[12px] w-full justify-center items-start">
        <div className="flex justify-between items-start w-full">
          <p className="self-stretch text-description text-sm font-normal font-['Golos_Text'] leading-tight flex items-center gap-1">
            Subtotal <PiInfo className="text-gray-500" />
          </p>
          <div>
            <p className="text-right text-black text-sm font-normal font-['Golos_Text'] leading-tight">
              {subtotal}
            </p>
            <p className="w-32 h-4 text-description text-xs font-normal font-['Golos_Text'] leading-none">
              {vatIncluded}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start w-full">
          <p className="self-stretch text-description text-sm font-normal font-['Golos_Text'] leading-tight flex items-center gap-1">
            Discount
          </p>
          <div className="flex gap-1 items-center">
            <p className="text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
              <PiFireLight /> {discountPercentage}
            </p>
            <p className="text-right text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
              {discountAmount}
            </p>
          </div>
        </div>
        {/* Separator Line */}
        <div className="h-[1px] w-full border-t border-description"></div>
        <div className="flex justify-between items-start w-full">
          <p className="w-full max-w-48 text-description text-sm font-normal font-['Golos_Text'] leading-tight">
            Total
          </p>
          <p className="text-right text-violet-500 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
            {total}
          </p>
        </div>
      </div>

      {/* Complete Button and Payment Instruction */}
      <button
        type="submit"
        className="cursor-pointer bg-black rounded-xl justify-center text-white text-base font-semibold font-['Golos_Text'] leading-normal py-[10px] w-full text-center hover:bg-gray-800 transition-colors duration-200"
      >
        Complete 
      </button>
      <p className="self-stretch text-center text-description text-xs font-normal font-['Golos_Text'] leading-none">
        {paymentInstruction}
      </p>
    </div>
  );
};

export default ConfirmDetails;
