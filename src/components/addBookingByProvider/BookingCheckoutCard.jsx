import { Button } from "antd";
import { Info } from "lucide-react";
import { MapPin, Star } from "lucide-react";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaRegUserCircle } from "react-icons/fa";
import { TbArrowBadgeDown } from "react-icons/tb";
import { cn } from "../../lib/utils";
import useResponsive from "../../hooks/useResponsive";
import { PiInfo } from "react-icons/pi";
import { useSelector } from "react-redux";

function formatDateTime(isoString) {
  const date = new Date(isoString);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  // Remove seconds and use local time
  return date
    .toLocaleString("en-GB", options)
    .replace(",", "")
    .replace(/(\d{2}:\d{2}).*/, "$1");
}

const BookingCheckoutCard = ({
  data,
  selected,
  handleBookNow,
  fromDrawer = false,
  disabled = false,
  selectedStaff = {},
  fromCofirmation = false,
  ...props
}) => {
  const selectedServices = useSelector(({ service }) => service);
  const selectedTimeSlot = useSelector(({ selectTime }) => selectTime);
  console.log({ selectedTimeSlot });

  const [showAllServices, setShowAllServices] = useState(false);
  const { lg } = useResponsive();

  const subtotalAfterVat = data?.subtotal + data?.vat;
  const total = subtotalAfterVat - data?.discountAmount;

  const displayedServices =
    selectedServices && selectedServices.length > 2 && !showAllServices
      ? selectedServices.slice(0, 2)
      : selectedServices;

  const hasPricingInfo = data?.subtotal || data?.discountAmount || total;

  return (
    <div
      className={cn(
        "w-full max-w-sm p-4 rounded-xl shadow-sm space-y-3 bg-[#FFFFFF] mx-auto",
        { "bg-none rounded-none shadow-none px-1 py-0 max-w-none": fromDrawer }
      )}
    >
      {!fromCofirmation && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-3 text-[#262626]">
            {data.studioName}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            {/* Rating and Reviews */}
            <div className="flex items-center text-sm text-yellow-500 font-medium gap-1">
              <Star size={16} fill="currentColor" stroke="currentColor" />
              <span className="text-black">{data?.rating}</span>
              <span className="text-gray-500 hover:underline text-sm cursor-pointer underline">
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
      )}

      {/* Service Selection Status, selected staff, selected time and note. Renders only if selected staff is provided */}
      {selectedStaff?.name ? (
        <>
          <div className="flex items-center gap-2 text-sm text-[#262626] pt-2">
            <FaRegUserCircle size={16} /> Staff -
            <span>{selectedStaff?.name}</span>
          </div>

          {selectedTimeSlot && (
            <div className="flex items-center gap-2 text-sm text-[#262626]">
              <CiCalendar size={16} />
              <span>{formatDateTime(selectedTimeSlot?.fullDateTime)}</span>
            </div>
          )}

          {data?.note && (
            <div className="bg-[#FAFAFA] p-3 rounded-lg text-sm text-[#242528]">
              <span>
                {" "}
                <b>Note:</b> {data?.note}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="text-sm font-normal text-[#888888] pt-2">
          {selected && selected.length > 0
            ? `${selected.length} service selected`
            : "No service selected."}
        </div>
      )}

      {/* Dashed Line */}
      <div className="border-b border-dashed border-gray-200" />

      {/* Services Section - Renders only if services array is provided and not empty */}
      {selectedServices && selectedServices.length > 0 && (
        <div className="flex flex-col gap-[12px] w-full justify-center items-start">
          <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
            Services ({selectedServices.length})
          </h3>
          {displayedServices &&
            displayedServices.map((service) => (
              <div
                key={service?.id}
                className="flex justify-start items-start gap-[12px] w-full"
              >
                <img
                  src={
                    service?.image ||
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
                  <h3 className="self-stretch text-Boulder-950 text-sm font-medium leading-tight">
                    {service?.title}
                  </h3>
                  <p className="text-violet-500 text-xs font-normal w-max leading-none px-[8px] py-[4px] border border-violet-500 my-[8px] rounded-[20px]">
                    Smooth / Scalp treatment
                  </p>
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
          {selectedServices.length > 2 && ( // Only show button if there are more than 2 services
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
      {selectedServices && selectedServices.length > 0 && hasPricingInfo && (
        <div className="w-full border-t border-dashed border-gray-300"></div>
      )}

      {/* Pricing Details */}
      <div className="space-y-3 text-sm text-[#888888]">
        {/* Render Travel Fee or Subtotal */}
        {data?.travelFee ? (
          <>
            <div className="flex justify-between items-center">
              <span className="flex gap-1 items-center">Travel Fee</span>
              <span>₪{data?.travelFee?.toFixed(2) || 0.0}</span>
            </div>
            <div className="border-t border-dashed border-gray-200"></div>
          </>
        ) : data?.vatText ? (
          ""
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>₪{data?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex gap-1 items-center">
                VAT <Info size={16} />
              </span>
              <span>₪{data?.vat?.toFixed(2) || 0}</span>
            </div>

            <div className="border-t border-dashed border-gray-200"></div>
          </>
        )}

        {/* Render Subtotal and vat text (if applicable) */}
        {data?.vatText ? (
          <div className="flex justify-between items-center text-[#888888]">
            <p className="flex items-center">
              Subtotal <PiInfo className="text-gray-500" />
            </p>
            <div className="space-y-1">
              <p className="text-right text-black text-sm font-normal leading-tight">
                {data?.subtotal.toFixed(2) || 0.0}
              </p>
              <p className="text-description text-xs font-normal  text-right leading-none">
                ({data?.vatText})
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-[#888888]">
            <p>Subtotal(after VAT)</p>
            <div>
              <span>₪{subtotalAfterVat.toFixed(2) || 0.0}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Discount</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#F5F4FE] border-[1px] border-[#ECEBFC] px-2 py-1 rounded-sm">
              <span className="text-[#866BE7] px-2 py-1 text-xs font-semibold flex gap-1 items-center">
                <TbArrowBadgeDown size={16} />
                {data.discountPercent || 0}% OFF
              </span>
            </div>
            <span className="text-red-500">
              -₪{data?.discountAmount.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Separator before Total */}
        <div className="border-t border-gray-200 pt-3"></div>

        <div className="flex justify-between items-center text-sm font-semibold text-[#888888]">
          <span>Total</span>
          <span className="text-[#866BE7] text-[18px] text-semibold">
            ₪{total.toFixed(2) || 0}
          </span>
        </div>
      </div>

      {!fromCofirmation && (
        <>
          <Button
            color="default"
            variant="solid"
            onClick={handleBookNow}
            className="w-full"
            size={lg ? "large" : "middle"}
            disabled={disabled}
          >
            Continue
          </Button>
          <p className="text-xs font-normal text-center text-[#797979]">
            You will pay at the appointment location
          </p>
        </>
      )}
    </div>
  );
};

export default BookingCheckoutCard;
