import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"; // Import FaChevronDown for "Show more"
import { IoLocationOutline } from "react-icons/io5";
import { PiFireLight, PiInfo } from "react-icons/pi";

// Dummy image import for demonstration. In a real app, this would likely come from props or a dynamic source.

const ConfirmDetails = ({
  className,
  storeName,
  rating,
  reviewsCount,
  location,
  staffName,
  appointmentDateTime,
  bookingNote,
  services, // This will be an array
  subtotal,
  vatIncluded,
  discountPercentage,
  discountAmount,
  total,
  paymentInstruction,
  buttonTittle,
}) => {
  // State to manage the visibility of all services.
  // Initially, if there are more than 2 services, only show 2.
  const [showAllServices, setShowAllServices] = useState(false);

  // Determine which services to display based on the showAllServices state
  // Only slice if services array exists and has more than 2 items
  const displayedServices = (services && services.length > 2 && !showAllServices)
    ? services.slice(0, 2)
    : services;

  // Toggle function for "Show less/Show more"
  const toggleShowServices = () => {
    setShowAllServices(!showAllServices);
  };

  // Helper to check if any store info is provided to render the section
  const hasStoreInfo = storeName || rating || reviewsCount || location;
  // Helper to check if any staff/appointment/note info is provided
  const hasStaffAppointmentNote = staffName || appointmentDateTime || bookingNote;
  // Helper to check if any pricing info is provided
  const hasPricingInfo = subtotal || discountAmount || total;

  return (
    <div className={`${className} bg-white rounded-xl flex flex-col justify-start items-start gap-5`}>
      {/* Store Information Section - Renders only if any store-related prop is provided */}
      {hasStoreInfo && (
        <div className="flex flex-col gap-2 w-full">
          {storeName && (
            <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
              {storeName}
            </h3>
          )}
          {(rating || reviewsCount) && (
            <div className="flex gap-1 items-center">
              {rating && <FaStar className="text-[#FFD056]" />}
              {rating && (
                <p className="text-black text-sm font-normal leading-tight">
                  {rating}
                </p>
              )}
              {reviewsCount && (
                <p className="text-description text-sm font-normal underline leading-tight">
                  ({reviewsCount})
                </p>
              )}
            </div>
          )}
          {location && (
            <div className="flex gap-2 items-start justify-start">
              <IoLocationOutline className="text-black text-[20px] flex-shrink-0" />
              <p className="self-stretch text-black text-sm font-normal leading-tight">
                {location}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Staff and Appointment Details Section - Renders only if any staff/appointment/note prop is provided */}
      {hasStaffAppointmentNote && (
        <div className="flex flex-col gap-2 w-full">
          {staffName && (
            <div className="flex gap-2 items-start justify-start">
              <FaRegUserCircle className="text-black text-[20px] flex-shrink-0" />
              <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                Staff - {staffName}
              </p>
            </div>
          )}
          {appointmentDateTime && (
            <div className="flex gap-2 items-start justify-start">
              <CiCalendar className="text-black text-[20px] flex-shrink-0" />
              <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                {appointmentDateTime}
              </p>
            </div>
          )}
          {bookingNote && (
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
          )}
        </div>
      )}

      {/* Separator Line (renders if either store info or staff/appointment/note info is present, AND services are present) */}
      {(hasStoreInfo || hasStaffAppointmentNote) && services && services.length > 0 && (
        <div className="w-full border-t border-dashed border-gray-300"></div>
      )}

      {/* Services Section - Renders only if services array is provided and not empty */}
      {services && services.length > 0 && (
        <div className="flex flex-col gap-[12px] w-full justify-center items-start">
          <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
            Services ({services.length})
          </h3>
          {displayedServices.map((service) => (
            <div key={service.id} className="flex justify-start items-start gap-[12px] w-full">
              <img
                src={service.image || 'https://placehold.co/80x80/cccccc/333333?text=No+Image'} // Fallback for broken or missing images
                alt={service.name || 'Service image'}
                className="w-20 h-20 relative rounded-lg object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=No+Image'; }}
              />
              <div className="w-full flex flex-col">
                {service.name && (
                  <h3 className="self-stretch text-Boulder-950 text-sm font-medium leading-tight">
                    {service.name}
                  </h3>
                )}
                {service.options && (
                  <p className="text-violet-500 text-xs font-normal w-max leading-none px-[8px] py-[4px] border border-violet-500 my-[8px] rounded-[20px]">
                    {service.options}
                  </p>
                )}
                {(service.duration || service.price) && (
                  <div className="w-full flex justify-between items-center">
                    {service.duration && (
                      <p className="text-description text-sm font-normal leading-tight">
                        {service.duration}
                      </p>
                    )}
                    {service.price && (
                      <p className="text-Boulder-950 text-sm font-normal leading-tight">
                        {service.price}
                      </p>
                    )}
                  </div>
                )}
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
      )}

      {/* Separator Line (renders if services are present, AND pricing info is present) */}
      {services && services.length > 0 && hasPricingInfo && (
        <div className="w-full border-t border-dashed border-gray-300"></div>
      )}

      {/* Pricing Details Section - Renders only if any pricing-related prop is provided */}
      {hasPricingInfo && (
        <div className="flex flex-col gap-[12px] w-full justify-center items-start">
          {(subtotal || vatIncluded) && (
            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal font-['Golos_Text'] leading-tight flex items-center gap-1">
                Subtotal {subtotal && <PiInfo className="text-gray-500" />}
              </p>
              <div>
                {subtotal && (
                  <p className="text-right text-black text-sm font-normal font-['Golos_Text'] leading-tight">
                    {subtotal}
                  </p>
                )}
                {vatIncluded && (
                  <p className="w-32 h-4 text-description text-xs font-normal font-['Golos_Text'] leading-none">
                    {vatIncluded}
                  </p>
                )}
              </div>
            </div>
          )}
          {(discountPercentage || discountAmount) && (
            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal font-['Golos_Text'] leading-tight flex items-center gap-1">
                Discount
              </p>
              <div className="flex gap-1 items-center">
                {discountPercentage && (
                  <p className="text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                    <PiFireLight /> {discountPercentage}
                  </p>
                )}
                {discountAmount && (
                  <p className="text-right text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                    {discountAmount}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Separator Line for Total - Renders only if discount or subtotal is present AND total is present */}
          {((subtotal || discountAmount) && total) && (
            <div className="h-[1px] w-full border-t border-description"></div>
          )}
          {total && (
            <div className="flex justify-between items-start w-full">
              <p className="w-full max-w-48 text-description text-sm font-normal font-['Golos_Text'] leading-tight">
                Total
              </p>
              <p className="text-right text-violet-500 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
                {total}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Complete Button and Payment Instruction */}
      {buttonTittle && (
        <button
          type="submit"
          className="cursor-pointer bg-black rounded-xl justify-center text-white text-base font-semibold font-['Golos_Text'] leading-normal py-[10px] w-full text-center hover:bg-gray-800 transition-colors duration-200"
        >
          {buttonTittle}
        </button>
      )}
      {paymentInstruction && (
        <p className="self-stretch text-center text-description text-xs font-normal font-['Golos_Text'] leading-none">
          {paymentInstruction}
        </p>
      )}
    </div>
  );
};

export default ConfirmDetails;
