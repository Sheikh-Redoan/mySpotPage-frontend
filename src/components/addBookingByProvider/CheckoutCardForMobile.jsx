import { Button } from "antd";
import { ChevronDown, ChevronUp, Info, MapPin, Star } from "lucide-react";
import React, { useState } from "react";
import { TbArrowBadgeDown } from "react-icons/tb";
import { Drawer } from "antd";
import BookingCheckoutCard from "./BookingCheckoutCard";
import { X } from "lucide-react";
import useResponsive from "../../hooks/useResponsive";

export default function CheckoutCardForMobile({
  data,
  handleBookNow,
  isDrawer = false,
  showDetails,
  setShowDetails,
  disabled = false,
  ...props
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { lg } = useResponsive();

  const subtotalAfterVat = data?.subtotal + data?.vat;
  const total = subtotalAfterVat - data?.discountAmount;

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
                <Star
                  className="text-yellow-500"
                  size={16}
                  fill="currentColor"
                  stroke="currentColor"
                />
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
          <button
            className="text-sm font-normal flex items-center gap-1"
            onClick={() => {
              if (isDrawer) {
                setIsDrawerOpen(true);
                setShowDetails(false);
              } else {
                setShowDetails(!showDetails);
                setIsDrawerOpen(false);
              }
            }}
          >
            See detail{" "}
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      <div className="border-b border-b-gray-200 my-3" />

      {showDetails && !isDrawer && (
        <>
          {/* Price details */}
          <div className="flex flex-col gap-[12px] w-full justify-center items-start">
            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                Subtotal{" "}
              </p>
              <p className="text-right text-black text-sm font-normal leading-tight">
                ₪ {data.subtotal?.toFixed(2) || 0}
              </p>
            </div>

            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                VAT <Info size={16} />
              </p>
              <p className="text-right text-black text-sm font-normal leading-tight">
                ₪{data.vat?.toFixed(2) || 0}
              </p>
            </div>

            <div className="border-t border-dashed border-gray-200 w-full"></div>

            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal leading-tight">
                Subtotal (after VAT)
              </p>
              <p className="text-right text-black text-sm font-normal leading-tight">
                ₪{subtotalAfterVat.toFixed(2) || 0.0}
              </p>
            </div>

            <div className="flex justify-between items-start w-full">
              <p className="self-stretch text-description text-sm font-normal leading-tight flex items-center gap-1">
                Discount
              </p>
              <div className="flex gap-1 items-center">
                <p className="text-violet-500 text-xs font-medium leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                  <TbArrowBadgeDown size={16} /> {data?.discountPercent || 0.0}%
                  OFF
                </p>
                <p className="text-right text-red-500 text-sm font-normal leading-tight">
                  -₪{data.discountAmount?.toFixed(2) || 0}
                </p>
              </div>
            </div>

            {/* Border */}
            <div className="h-[1px] w-full border-t border-[#E9EAEC]"></div>
          </div>
        </>
      )}

      {isDrawer && !showDetails && (
        <>
          <Drawer
            placement={"bottom"}
            closable={false}
            title="Summary"
            extra={
              <Button type="text" onClick={() => setIsDrawerOpen(false)}>
                <X size={22} className="" />
              </Button>
            }
            height="80%"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            className="rounded-t-lg"
          >
            <BookingCheckoutCard
              data={data}
              handleBookNow={handleBookNow}
              fromDrawer={true}
              selectedStaff={props.selectedStaff}
            />
          </Drawer>
          <style>
            {`
          .ant-drawer-body {
            padding: 0;
          }
        `}
          </style>
        </>
      )}

      <div className="flex justify-between items-start w-full mt-4 mb-2">
        <p className="w-full max-w-48 text-description text-sm font-semibold leading-tight">
          Total
        </p>
        <p className="text-right text-violet-500 text-lg font-semibold leading-relaxed">
          ₪ {total.toFixed(2) || 0.0}
        </p>
      </div>

      <Button
        color="default"
        variant="solid"
        className="w-full text-white"
        onClick={handleBookNow}
        size={lg ? "large" : "middle"}
        disabled={disabled}
      >
        Continue
      </Button>

      {data.paymentInstruction && (
        <p className="self-stretch text-center text-description text-xs font-normal leading-none py-2">
          {data.paymentInstruction}
        </p>
      )}
    </div>
  );
}
