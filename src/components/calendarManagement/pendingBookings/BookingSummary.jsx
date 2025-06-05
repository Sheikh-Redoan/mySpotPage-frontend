import { Button } from "antd";
import { TbArrowBadgeDown } from "react-icons/tb";

const BookingSummary = () => {
  return (
    <div className="">
      <h2 className="text-lg font-semibold text-primary01 mb-5">Summary</h2>

      <div className="space-y-4">
        {/* Travel fee */}
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-300">
          <span className="text-[#888888] font-normal text-sm">Travel fee</span>
          <span className="text-[#262626] font-normal text-sm">₪0.00</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center">
            <span className="text-[#888888] font-normal text-sm">Subtotal</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 text-gray-400 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-right">
            <span className="text-[#262626] font-normal text-sm">₪270.00</span>
            <p className="text-[#888888] font-normal text-xs">(Includes ₪48.60 VAT)</p>
          </div>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <span className="text-[#888888] font-normal text-sm">Discount</span>
          <div className="flex items-center space-x-2">
            <span className="bg-primary01/20 text-primary01 text-xs font-medium px-2 py-1 rounded-full flex items-center border border-primary01/20">
             <TbArrowBadgeDown size={16} />
              20% OFF
            </span>
            <span className="text-red-500 font-xs font-medium">-₪54.00</span>
          </div>
        </div>

        {/* Additional Discount */}
        <div className="flex justify-between items-center">
          <span className="text-[#888888] font-normal text-sm">Additional Discount</span>
          <div className="w-[100px] flex items-center justify-between border border-gray-300 rounded-md px-3 py-2">
            <span className="text-[#262626] font-normal text-sm">0</span>
            <span className="text-gray-500 ml-1 text-sm">₪</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <span className="text-[#888888] font-normal text-sm">Total</span>
        <span className="text-pimarry01 font-semibold text-lg">₪216.00</span>
      </div>

      {/* Confirm Button */}
      <Button color="default" variant="solid" className="w-full px-4 py-2 text-md font-semibold rounded-lg mt-2">
        Confirm
      </Button>
    </div>
  );
};

export default BookingSummary; 