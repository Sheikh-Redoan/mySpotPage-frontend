import React, { useState } from "react";
import { Button } from "antd";
import { Info } from "lucide-react";
import { MapPin, Star } from "lucide-react";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaRegUserCircle } from "react-icons/fa";
import { TbArrowBadgeDown } from "react-icons/tb";
import { cn } from "../../lib/utils";
import { MdPayment } from "react-icons/md";
import CancelBookingModal from "./CancelBookingModal";

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
  return date
    .toLocaleString("en-GB", options)
    .replace(",", "")
    .replace(/(\d{2}:\d{2}).*/, "$1");
}

const dummyData = {
  studioName: "TCL Beauty Studio 01",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  staff: { name: "John Doe" },
  dateTime: "2025-01-06T08:00:00Z",
  note: "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
  services: [
    {
      id: 1,
      title: "Classic Ombre",
      duration: "1h45m",
      price: "₪70.00",
    },
    {
      id: 2,
      title: "Reverse Ombre Shadow Root",
      duration: "1h30m",
      price: "₪100.00",
    },
    {
      id: 3,
      title: "Smoothing Keratin Treatment",
      duration: "1h",
      price: "₪120.00",
    },
  ],
  subtotal: 290.0,
  vat: 48.6,
  discountPercent: 20,
  discountAmount: 54.0,
  total: 216.0,
};

export default function BookingDetails() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const displayedServices =
    dummyData.services.length > 2 && !showAllServices
      ? dummyData.services.slice(0, 2)
      : dummyData.services;

  return (
    <section className="max-w-md bg-[#F9FAFC] relative mx-auto">
      <div className="p-4 mb-20">
        <div className="w-full max-w-md p-4 rounded-xl shadow-sm space-y-3 bg-[#FFFFFF] mx-auto">
          <h2 className="text-lg font-semibold mb-3 text-[#262626]">
            {dummyData.studioName}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-sm text-yellow-500 font-medium gap-1">
              <Star size={16} fill="currentColor" stroke="currentColor" />
              <span className="text-black">{dummyData.rating}</span>
              <span className="text-gray-500 hover:underline text-sm cursor-pointer underline">
                ({dummyData.reviewCount})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#262626]">
            <MapPin size={16} />
            <a
              href={`https://maps.google.com/?q=${dummyData.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm font-medium"
            >
              {dummyData.address}
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#262626] pt-2">
            <FaRegUserCircle size={16} /> Staff -
            <span className="text-primary01">{dummyData.staff.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#262626]">
            <CiCalendar size={16} />
            <span>{formatDateTime(dummyData.dateTime)}</span>
          </div>
          {dummyData.note && (
            <div className="bg-[#FAFAFA] p-3 rounded-lg text-sm text-[#242528]">
              <span>
                <b>Note:</b> {dummyData.note}
              </span>
            </div>
          )}

          <div className="border-b border-dashed border-gray-200" />

          {/* Services Section */}
          <div className="flex flex-col gap-[12px] w-full justify-center items-start">
            <h3 className="self-stretch text-description text-sm font-semibold leading-tight">
              Services ({dummyData.services.length})
            </h3>
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="flex justify-start items-start gap-[12px] w-full"
              >
                <img
                  src="https://placehold.co/80x80/cccccc/333333?text=No+Image"
                  alt={service.title || "Service image"}
                  className="w-20 h-20 relative rounded-lg object-cover"
                />
                <div className="w-full flex flex-col">
                  <h3 className="self-stretch text-Boulder-950 text-sm font-medium leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-violet-500 text-xs font-normal w-max leading-none px-[8px] py-[4px] border border-violet-500 my-[8px] rounded-[20px]">
                    Smooth / Scalp treatment
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-normal text-[#888888]">
                      {service?.duration}
                    </p>
                    <p className="text-Boulder-950 text-sm font-normal leading-tight">
                      {service?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {dummyData.services.length > 2 && (
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

          <div className="w-full border-t border-dashed border-gray-300"></div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <div className="flex flex-col justify-end">
                <span className="text-right">
                  ₪{dummyData.subtotal.toFixed(2)}
                </span>
                <p className="text-[10px] text-[#888888] self-end">
                  (includes ₪48.60 VAT)
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Discount</span>
              <div className="flex items-center gap-2">
                <div className="bg-[#F5F4FE] border-[1px] border-[#ECEBFC] px-2 py-1 rounded-sm">
                  <span className="text-[#866BE7] px-2 py-1 text-xs font-semibold flex gap-1 items-center">
                    <TbArrowBadgeDown size={16} />
                    {dummyData.discountPercent}% OFF
                  </span>
                </div>
                <span className="text-red-500">
                  -₪{dummyData.discountAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3"></div>
            <div className="flex justify-between items-center text-sm font-semibold text-[#888888]">
              <span>Total</span>
              <span className="text-[#866BE7] text-[18px] text-semibold">
                ₪{dummyData.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="px-3 py-2 text-sm text-primary01 bg-primary01/10 rounded-md mt-4 flex items-center gap-2">
            <MdPayment size={22} />
            <p>You will pay at the appointment location</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-6 fixed bottom-0 w-full max-w-md ">
        <Button
          onClick={() => setShowCancelModal(true)}
          color="danger"
          variant="outlined"
          className="w-full"
        >
          Cancel Booking
        </Button>
      </div>

      {showCancelModal && (
        <CancelBookingModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onDeleteConfirm={() => setShowCancelModal(false)}
        />
      )}
    </section>
  );
}
