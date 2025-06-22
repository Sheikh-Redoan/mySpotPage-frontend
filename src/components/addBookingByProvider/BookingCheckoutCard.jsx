import { Button } from "antd";
import { Info } from "lucide-react";
import { MapPin, Star } from "lucide-react";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaRegUserCircle } from "react-icons/fa";
import { TbArrowBadgeDown } from "react-icons/tb";
import { cn } from "../../lib/utils";

const BookingCheckoutCard = ({
  data,
  selected,
  handleBookNow,
  fromDrawer = false,
}) => {
  const [showAllServices, setShowAllServices] = useState(false);

  const subtotal = 100.0;
  const subtotalAfterVat = subtotal + data?.vat;
  const discountAmount = 0.0;
  const total = subtotalAfterVat - discountAmount;

  const displayedServices =
    data?.services && data?.services.length > 2 && !showAllServices
      ? data?.services.slice(0, 2)
      : data?.services;

  const hasPricingInfo = subtotal || discountAmount || total;

  return (
    <div
      className={cn(
        "w-full max-w-sm p-4 rounded-xl shadow-sm space-y-3 bg-[#FFFFFF] mx-auto",
        { "bg-none rounded-none shadow-none p-2 max-w-none": fromDrawer }
      )}
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-3 text-[#262626]">
          {data.studioName}
        </h2>
        <div className="flex items-center gap-2 mb-3">
          {/* Rating and Reviews */}
          <div className="flex items-center text-sm text-yellow-500 font-medium gap-1">
            <Star size={16} fill="currentColor" stroke="currentColor" />
            <span className="text-black">{data?.rating}</span>
            <span className="text-gray-500 hover:underline text-sm cursor-pointer">
              ({data.reviewCount})
            </span>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-center gap-2 text-sm text-[#262626]">
          <MapPin size={16} />
          <a
            href={`https://maps.google.com/?q=$${data?.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-sm font-medium"
          >
            {data?.address}
          </a>
        </div>
      </div>

      {/* Service Selection Status */}
      {selected && selected.length > 0 && (
        <div className="text-sm font-normal text-[#888888]">
          {selected && selected.length > 0
            ? `${selected.length} service selected`
            : "No service selected."}
        </div>
      )}

      {/* Staff and Appointment Details Section - Renders only if any staff/appointment/note prop is provided */}
      {selected && selected.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          {data?.staffName && (
            <div className="flex gap-2 items-start justify-start">
              <FaRegUserCircle className="text-black text-[20px] flex-shrink-0" />
              <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                Staff - {data?.staffName}
              </p>
            </div>
          )}
          {data?.appointmentDateTime && (
            <div className="flex gap-2 items-start justify-start">
              <CiCalendar className="text-black text-[20px] flex-shrink-0" />
              <p className="self-stretch text-neutral-800 text-sm font-normal leading-tight">
                {data?.appointmentDateTime}
              </p>
            </div>
          )}
          {data?.bookingNote && (
            <div className="self-stretch p-3 bg-neutral-50 rounded-lg inline-flex justify-center items-center">
              <div className="flex-1 justify-start">
                <span className="text-neutral-800 text-sm font-semibold leading-tight">
                  Note:{" "}
                </span>
                <span className="text-neutral-800 text-sm font-normal leading-tight">
                  {data?.bookingNote}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dashed Line */}
      <div className="border-b border-dashed border-gray-200" />

      {/* Services Section - Renders only if services array is provided and not empty */}
      {data?.services && data?.services.length > 0 && (
        <div className="flex flex-col gap-[12px] w-full justify-center items-start">
          <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
            Services ({data?.services.length})
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

          {/* Show less/Show more button */}
          {data?.services.length > 2 && ( // Only show button if there are more than 2 services
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="text-sm font-normal font-['Golos_Text'] leading-tight text-description flex items-center justify-start gap-2 cursor-pointer w-full"
            >
              {showAllServices ? (
                <>
                  Show less <FaChevronUp size={14} />
                </>
              ) : (
                <>
                  Show more <FaChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Separator Line (renders if services are present, AND pricing info is present) */}
      {data?.services && data?.services.length > 0 && hasPricingInfo && (
        <div className="w-full border-t border-dashed border-gray-300"></div>
      )}

      {/* Pricing Details */}
      <div className="space-y-3 text-sm text-[#888888]">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>₪ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex gap-1 items-center">
            VAT <Info size={16} />
          </span>
          <span>₪ {data?.vat?.toFixed(2) || 0}</span>
        </div>

        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex justify-between items-center text-[#888888]">
          <span>Subtotal (after VAT)</span>
          <span>₪ {subtotalAfterVat.toFixed(2) || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#F5F4FE] border-[1px] border-[#ECEBFC] px-2 py-1 rounded-sm">
              <span className="text-[#866BE7] px-2 py-1 text-xs font-semibold flex gap-1 items-center">
                <TbArrowBadgeDown size={16} />
                {data.discountPercent || 0}% OFF
              </span>
            </div>
            <span className="text-red-500">-₪ {discountAmount.toFixed(2)}</span>
          </div>
        </div>
        {/* Separator before Total */}
        <div className="border-t border-dashed border-gray-200 pt-3"></div>
        <div className="flex justify-between items-center text-sm font-semibold text-[#888888]">
          <span>Total</span>
          <span className="text-[#866BE7] text-[18px] text-semibold">
            ₪ {data?.total.toFixed(2) || 0}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        color="default"
        variant="solid"
        onClick={handleBookNow}
        className="w-full"
      >
        Continue
      </Button>

      {/* Payment Note */}
      <p className="text-xs font-normal text-center text-[#797979] mt-4">
        You will pay at the appointment location
      </p>
    </div>
  );
};

export default BookingCheckoutCard;
