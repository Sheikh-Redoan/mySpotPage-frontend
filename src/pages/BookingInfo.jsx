import { useState } from "react";
import ClientDetailsBreadCrumb from "../components/DashboardPageComponents/shared/ClientDetailsBreadCrumb";
import PendingBooking from "./PendingBooking";

const BookingInfo = () => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const tabs = [
    { label: "Pending Bookings", number: 0 },
    { label: "Confirmed Bookings", number: 12 },
    { label: "Past Bookings", number: 20 },
  ];

  return (
    <div>
      <ClientDetailsBreadCrumb />
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
              onClick={() => setActiveTabIdx(idx)}
            >
              {tab.label}{" "}
              <span
                className={` size-6 text-xs inline-flex justify-center items-center rounded-full shrink-0 ${
                  activeTabIdx === idx
                    ? "bg-white text-primary01"
                    : "bg-[#E7E7E7] text-[#797979]"
                }`}
              >
                {tab.number}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6">
          {activeTabIdx === 0 ? (
            <PendingBooking />
          ) : activeTabIdx === 1 ? (
            <PendingBooking />
          ) : (
            <PendingBooking />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
