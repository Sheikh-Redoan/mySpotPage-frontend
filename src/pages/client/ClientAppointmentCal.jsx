import dayjs from "dayjs";
import Calender from "../../components/calender/Calender";
import {
  MOCK_EVENTS,
  MOCK_RESOURCES,
} from "../../components/calender/mockdata";
import Breadcrumb from "../../components/client/Breadcrumb";
import AppointmentActionsBtn from "../../components/client/client-appointment/AppointmentActionsBtn";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";
import "/src/styles/fullCalender.css";
import { Button, Drawer } from "antd";
import ConfirmDetails from "../../components/client/ConfirmDetails";
import confirm_product from "/src/assets/images/confirm.jpg";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { PiFireLight, PiInfo } from "react-icons/pi";
import { cn } from "../../lib/utils";

let eventGuid = 0;
let todayStr = dayjs().format("YYYY-MM-DD");

export const INITIAL_EVENTS = [
  {
    id: `event-${eventGuid++}`,
    title: "All-day event",
    start: todayStr,
  },
  {
    id: `event-${eventGuid++}`,
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export const storeData = {
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
    // Add more services here if needed to test "Show more"
    // {
    //   id: 4,
    //   image: confirm_product,
    //   name: "Hair Cut",
    //   options: "Short Hair",
    //   duration: "1h00m",
    //   price: "₪50.00",
    // },
  ],
  subtotal: "₪270.00",
  vatIncluded: "(includes ₪48.60 VAT)",
  discountPercentage: "20% OFF",
  discountAmount: "-₪54.00",
  total: "₪216.00",
  paymentInstruction: "You will pay at the appointment location",
};

export default function ClientAppointmentCal() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="bg-[#F9FAFC] md:py-8">
      <Container
        className={cn("max-md:mb-54", { "max-md:mb-78": showDetails })}
      >
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Select staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />

        <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
          <Calender
            events={MOCK_EVENTS}
            resources={MOCK_RESOURCES}
            selectTimeFromProvider={true}
            applyFilter={false}
          />

          <AppointmentActionsBtn to="/service-provider-info/confirm" />
        </div>
      </Container>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="bg-white p-4 shadow fixed bottom-0 w-full z-50">
          <div className="flex items-end justify-between">
            <div>
              {storeData.storeName && (
                <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
                  {storeData.storeName}
                </h3>
              )}
              {(storeData.rating || storeData.reviewsCount) && (
                <div className="flex gap-1 items-center">
                  {storeData.rating && <FaStar className="text-[#FFD056]" />}
                  {storeData.rating && (
                    <p className="text-black text-sm font-normal leading-tight">
                      {storeData.rating}
                    </p>
                  )}
                  {storeData.reviewsCount && (
                    <p className="text-description text-sm font-normal underline leading-tight">
                      ({storeData.reviewsCount})
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
                {showDetails ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </Button>
            </div>
          </div>
          <div className="border-b border-b-gray-200 my-3" />

          {/* Price details */}
          <div className="flex flex-col gap-[12px] w-full justify-center items-start">
            {showDetails && (
              <>
                {(storeData.subtotal || storeData.vatIncluded) && (
                  <div className="flex justify-between items-start w-full mb-2">
                    <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                      Subtotal{" "}
                      {storeData.subtotal && (
                        <PiInfo className="text-gray-500" />
                      )}
                    </p>
                    <div>
                      {storeData.subtotal && (
                        <p className="text-right text-black text-sm font-normal leading-tight">
                          {storeData.subtotal}
                        </p>
                      )}
                      {storeData.vatIncluded && (
                        <p className=" text-description text-xs font-normal text-right  leading-none">
                          {storeData.vatIncluded}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {(storeData.discountPercentage || storeData.discountAmount) && (
                  <div className="flex justify-between items-start w-full">
                    <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                      Discount
                    </p>
                    <div className="flex gap-1 items-center">
                      {storeData.discountPercentage && (
                        <p className="text-violet-500 text-xs font-medium   leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                          <PiFireLight /> {storeData.discountPercentage}
                        </p>
                      )}
                      {storeData.discountAmount && (
                        <p className="text-right text-red-500 text-sm font-normal   leading-tight">
                          {storeData.discountAmount}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {/* Separator Line for Total - Renders only if discount or subtotal is present AND total is present */}
                {(storeData.subtotal || storeData.discountAmount) &&
                  storeData.total && (
                    <div className="h-[1px] w-full border-t border-[#E9EAEC]"></div>
                  )}
              </>
            )}

            {storeData.total && (
              <div className="flex justify-between items-start w-full">
                <p className="w-full max-w-48 text-description text-sm font-normal   leading-tight">
                  Total
                </p>
                <p className="text-right text-violet-500 text-lg font-semibold   leading-relaxed">
                  {storeData.total}
                </p>
              </div>
            )}
          </div>

          <Button
            color="default"
            variant="solid"
            className="w-full my-2"
            disabled
          >
            Continue
          </Button>

          {storeData.paymentInstruction && (
            <p className="self-stretch text-center text-description text-xs font-normal   leading-none">
              {storeData.paymentInstruction}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
