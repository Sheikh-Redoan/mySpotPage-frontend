import { Button } from "antd";
import { ChevronDown, ChevronUp, Info, MapPin, Star } from "lucide-react";
import React, { useState } from "react";
import { FaRegUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PiFireLight, PiInfo } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router"; // Assuming you are using react-router-dom for Link
import { TbArrowBadgeDown } from "react-icons/tb";


export default function CheckoutCardForMobile({ data, selected, handleBookNow, to = "#" , showDetails, setShowDetails }) {
  const [showAllServices, setShowAllServices] = useState(false);

  const displayedServices = showAllServices ? data.services : data.services?.slice(0, 2);

  const hasPricingInfo =
    data.subtotal || data.vat || data.discountAmount || data.total;

  return (
    <div className="md:hidden bg-white p-4 shadow fixed bottom-0 w-full z-10">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed mb-2">
            {data.studioName}
          </h3>

          {(data.rating || data.reviewCount) && (
            <div className="flex gap-1 items-center">
              {data.rating && (
                <Star className="text-yellow-500" size={16} fill="currentColor" stroke="currentColor" />
              )}
              {data.rating && (
                <p className="text-black text-sm font-normal leading-tight">
                  {data.rating}
                </p>
              )}
              {data.reviewCount && (
                <p className="text-description text-sm font-normal underline leading-tight">
                  ({data.reviewCount})
                </p>
              )}
            </div>
          )}
        </div>

        <div className="self-end">
          <Button
            type="text"
            className="w-full"
            onClick={() => setShowDetails(!showDetails)}
          >
            See detail{" "}
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </div>
      </div>
      <div className="border-b border-b-gray-200 my-3" />

      {/* Service Selection Status */}
      {/* <div className="text-sm font-normal text-[#888888] mb-3">
        {selected && selected.length > 0
          ? `${selected.length} service selected`
          : "No service selected."}
      </div> */}

      {showDetails && (
        <>
          {/* Staff and Appointment Details Section */}
          {(data.staffName || data.appointmentDateTime || data.bookingNote) && (
            <div className="flex flex-col gap-2 w-full mb-3">
              {data.staffName && (
                <div className="flex gap-2 items-start justify-start">
                  <FaRegUserCircle className="text-black text-[20px] flex-shrink-0" />
                  <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                    Staff - {data.staffName}
                  </p>
                </div>
              )}
              {data.appointmentDateTime && (
                <div className="flex gap-2 items-start justify-start">
                  <CiCalendar className="text-black text-[20px] flex-shrink-0" />
                  <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                    {data.appointmentDateTime}
                  </p>
                </div>
              )}
              {data.bookingNote && (
                <div className="self-stretch p-3 bg-neutral-50 rounded-lg inline-flex justify-center items-center">
                  <div className="flex-1 justify-start">
                    <span className="text-neutral-800 text-sm font-semibold leading-tight">
                      Note:{" "}
                    </span>
                    <span className="text-neutral-800 text-sm font-normal leading-tight">
                      {data.bookingNote}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Services Section */}
          {data.services && data.services.length > 0 && (
            <div className="flex flex-col gap-[12px] w-full justify-center items-start mb-3">
              <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
                Services ({data.services.length})
              </h3>
              {displayedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-start items-start gap-[12px] w-full"
                >
                  <img
                    src={
                      service.image ||
                      "https://placehold.co/80x80/cccccc/333333?text=No+Image"
                    }
                    alt={service.name || "Service image"}
                    className="w-20 h-20 relative rounded-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/80x80/cccccc/333333?text=No+Image";
                    }}
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

              {data.services.length > 2 && (
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
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
          {data.services && data.services.length > 0 && hasPricingInfo && (
            <div className="w-full border-t border-dashed border-gray-300 mb-3"></div>
          )}


          {/* Price details */}
          <div className="flex flex-col gap-[12px] w-full justify-center items-start">
            {(!!data.subtotal) && (
              <div className="flex justify-between items-start w-full">
                <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                  Subtotal{" "}
                </p>
                <p className="text-right text-black text-sm font-normal leading-tight">
                  ₪ {data.subtotal?.toFixed(2)}
                </p>
              </div>
            )}
            {(!!data.vat) && (
              <div className="flex justify-between items-start w-full">
                <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                  VAT <Info size={16} />
                </p>
                <p className="text-right text-black text-sm font-normal leading-tight">
                  ₪ {data.vat?.toFixed(2)}
                </p>
              </div>
            )}

            {(!!data.subtotal || !!data.vat) && (
              <div className="border-t border-dashed border-gray-200 w-full"></div>
            )}


            {(!!data.subtotalAfterVat) && (
              <div className="flex justify-between items-start w-full">
                <p className="self-stretch text-description text-sm font-normal leading-tight">
                  Subtotal (after VAT)
                </p>
                <p className="text-right text-black text-sm font-normal leading-tight">
                  ₪ {data.subtotalAfterVat?.toFixed(2)}
                </p>
              </div>
            )}

            {(!!data.discountPercentage || !!data.discountAmount) && (
              <div className="flex justify-between items-start w-full">
                <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                  Discount
                </p>
                <div className="flex gap-1 items-center">
                  {data.discountPercentage && (
                    <p className="text-violet-500 text-xs font-medium leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                      <TbArrowBadgeDown size={16} /> {data.discountPercentage}% OFF
                    </p>
                  )}
                  {data.discountAmount && (
                    <p className="text-right text-red-500 text-sm font-normal leading-tight">
                      -₪ {data.discountAmount?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            )}
            {(!!data.subtotalAfterVat || !!data.discountAmount) && !!data.total && (
              <div className="h-[1px] w-full border-t border-[#E9EAEC]"></div>
            )}
          </div>
        </>
      )}

      {data.total && (
        <div className="flex justify-between items-start w-full mt-4 mb-2">
          <p className="w-full max-w-48 text-description text-sm font-semibold leading-tight">
            Total
          </p>
          <p className="text-right text-violet-500 text-lg font-semibold leading-relaxed">
            ₪ {data.total?.toFixed(2)}
          </p>
        </div>
      )}

      <Link to={to} className="w-full">
        <Button
          color="default"
          variant="solid"
          className="w-full my-2 bg-[#242528] text-white py-2 px-4 rounded-lg transition hover:bg-gray-800"
          onClick={handleBookNow}
        >
          Continue
        </Button>
      </Link>


      {data.paymentInstruction && (
        <p className="self-stretch text-center text-description text-xs font-normal leading-none py-2">
          {data.paymentInstruction}
        </p>
      )}
    </div>
  );
}