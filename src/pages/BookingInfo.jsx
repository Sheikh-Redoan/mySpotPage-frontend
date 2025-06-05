import { useState } from "react";
import { useParams } from "react-router";
import Breadcrumb from "../components/client/Breadcrumb";
import { getBreadcrumbs } from "../lib/staticData";
import PendingBookingByClient from "./PendingBookingByClient";
import ConfirmedBookingByClient from "../components/seller/client-management/ConfirmedBookingByClient";

const BookingInfo = () => {
  const { client } = useParams();
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const tabs = [
    { label: "Pending Bookings", number: 12 },
    { label: "Confirmed Bookings", number: 12 },
    { label: "Past Bookings", number: 20 },
  ];

  return (
    <div>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client Management",
            link: "/dashboard/client-management",
          },
          {
            name: client?.split("-").join(" "),
            link: "",
          },
          {
            name: "Booking Information",
            link: `/dashboard/client-management/${client}/booking-info`,
          },
        ])}
      />
      <div className="mt-6">
        <div className="flex">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`${
                activeTabIdx === idx
                  ? "bg-primary01 text-white"
                  : "bg-transparent text-[#262626]"
              } rounded-full font-semibold py-2 px-4 inline-flex gap-2 cursor-pointer`}
              onClick={() => setActiveTabIdx(idx)}>
              {tab.label}{" "}
              <span
                className={` size-6 text-xs inline-flex justify-center items-center rounded-full shrink-0 ${
                  activeTabIdx === idx
                    ? "bg-white text-primary01"
                    : "bg-[#E7E7E7] text-[#797979]"
                }`}>
                {tab.number}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6">
          {activeTabIdx === 0 ? (
            <PendingBookingByClient />
          ) : activeTabIdx === 1 ? (
            <ConfirmedBookingByClient />
          ) : (
            <PendingBookingByClient />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
