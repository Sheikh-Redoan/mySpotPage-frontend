import React from "react";
import { MapPin, Star } from "lucide-react";
import { TbArrowBadgeDown } from "react-icons/tb";

const ProviderCheckoutCard = ({ businessData, selected, handleBookNow }) => {
  const { studioName, label, rating, reviewCount, address } = businessData;

  const subtotal = 0.0;
  const vat = 0.0;
  const subtotalAfterVat = subtotal + vat;
  const discountAmount = 0.0;
  const total = subtotalAfterVat - discountAmount;

  return (
    <section className="w-full max-w-sm p-4 rounded-xl shadow-sm space-y-5 bg-[#FFFFFF] mx-auto">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-3 text-[#262626]">
          {studioName}
        </h2>
        <div className="flex items-center gap-2 mb-3">
          {/* {label && (
            <span className="text-sm bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-semibold">
              {label}
            </span>
          )} */}
          {/* <span className="text-gray-300">•</span> */}
          {/* Rating and Reviews */}
          <div className="flex items-center text-sm text-yellow-500 font-medium gap-1">
            <Star size={16} fill="currentColor" stroke="currentColor" />
            <span className="text-black">{rating}</span>
            <span className="text-gray-500 hover:underline text-sm cursor-pointer">
              ({reviewCount})
            </span>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-center gap-2 text-sm text-[#262626]">
          <MapPin size={16} />
          <a
            href={`https://maps.google.com/?q=$${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-sm font-medium"
          >
            {address}
          </a>
        </div>
      </div>

      {/* Service Selection Status */}
      <div className="text-sm font-normal text-[#888888]">
        {selected && selected.length > 0
          ? `${selected.length} service selected`
          : "No service selected."}
      </div>

      {/* Separator */}
      <div className="border-t border-dashed border-gray-200"></div>

      {/* Pricing Details */}
      <div className="space-y-3 text-sm text-[#888888]">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>₪ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>
            VAT <span className="text-gray-400">(i)</span>
          </span>
          <span>₪ {vat.toFixed(2)}</span>
        </div>

        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex justify-between items-center text-[#888888]">
          <span>Subtotal (after VAT)</span>
          <span>₪ {subtotalAfterVat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#F5F4FE] border-[1px] border-[#ECEBFC] px-2 py-1 rounded-sm">
              <span className="text-[#866BE7] px-2 py-1 text-xs font-semibold flex gap-1 items-center">
                <TbArrowBadgeDown size={16} />
                20% OFF
              </span>
            </div>
            <span className="text-red-500">-₪ {discountAmount.toFixed(2)}</span>
          </div>
        </div>
        {/* Separator before Total */}
        <div className="border-t border-dashed border-gray-200 pt-3"></div>
        <div className="flex justify-between items-center text-sm font-semibold text-[#888888]">
          <span>Total</span>
          <span className="text-[#866BE7] text-[18px] text-semibold">₪ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleBookNow}
        className={`w-full bg-[#242528] text-white py-2 px-4 rounded-lg transition ${
          selected && selected.length === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-800"
        }`}
        disabled={selected && selected.length === 0}
      >
        Continue
      </button>

      {/* Payment Note */}
      <p className="text-xs font-normal text-center text-[#797979]">
        You will pay at the appointment location
      </p>
    </section>
  );
};

export default ProviderCheckoutCard;
