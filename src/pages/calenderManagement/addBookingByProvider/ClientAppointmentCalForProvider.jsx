import { useNavigate } from "react-router";
import CheckoutCardForMobile from "../../../components/addBookingByProvider/CheckoutCardForMobile";
import Calender from "../../../components/calender/Calender";
import {
  MOCK_EVENTS,
  specialDatesData,
} from "../../../components/calender/mockdata";
import Breadcrumb from "../../../components/client/Breadcrumb";
import AppointmentActionsBtn from "../../../components/client/client-appointment/AppointmentActionsBtn";
import { getBreadcrumbs } from "../../../lib/staticData";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useSelector } from "react-redux";
import confirm_product from "/src/assets/images/confirm.jpg";

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  subtotal: 80.0,
  vat: 10.0,
  vatIncluded: true,
  discountPercent: 10.0,
  discountAmount: 60.0,
  paymentInstruction: "You will pay at the appointment location",
};

export default function ClientAppointmentCalForProvider() {
  const selectedStaff = useSelector(({ selectedStaff }) => selectedStaff);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/dashboard/add-booking-by-provider/confirm");
  };

  return (
    <section>
      <div className="max-md:px-3 max-md:py-2">
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(0, 3, [
            {
              name: "Client information",
              link: "/dashboard/add-booking-by-provider",
            },
            {
              name: "Select Services",
              link: "/dashboard/add-booking-by-provider/select-services",
            },
            {
              name: "Select staff",
              link: "/dashboard/add-booking-by-provider/select-staff",
            },
            {
              name: "Select Time",
              link: "/dashboard/add-booking-by-provider/select-time",
            },
            {
              name: "Confirm",
              link: "/dashboard/add-booking-by-provider/confirm",
            },
          ])}
        />

        <div className="max-md:mb-58 p-5 rounded-xl bg-[#FFFFFF] px-1 py-4 md:p-4">
          <Calender
            selectTimeFromProvider={true}
            events={MOCK_EVENTS}
            resources={specialDatesData}
            applyFilter={false}
          />

          <AppointmentActionsBtn to="/dashboard/add-booking-by-provider/confirm" />
        </div>
      </div>

      {/* Mobile View */}
      <CheckoutCardForMobile
        data={businessStaticData}
        handleBookNow={handleBookNow}
        selectedStaff={selectedStaff}
        isDrawer={true}
      />
    </section>
  );
}
