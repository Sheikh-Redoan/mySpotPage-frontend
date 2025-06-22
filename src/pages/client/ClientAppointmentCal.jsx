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
import confirm_product from "/src/assets/images/confirm.jpg";
import CheckoutCardForMobile from "../../components/addBookingByProvider/CheckoutCardForMobile";
import { useSelector } from "react-redux";

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
  services: [
    {
      id: 1,
      image: confirm_product,
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
  ],
};

export default function ClientAppointmentCal() {
  const selectedStaff = useSelector(({ selectedStaff }) => selectedStaff);

  const handleBookNow = () => {
    navigate("/service-provider-info/confirm");
  };

  return (
    <section className="bg-[#F9FAFC] lg:py-8 md:px-4">
      <Container>
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Select staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />

        <div className="bg-white shadow-md rounded-lg max-lg:py-4 max-lg:px-2 lg:p-6 max-md:mb-58">
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
      <CheckoutCardForMobile
        data={businessStaticData}
        handleBookNow={handleBookNow}
        selectedStaff={selectedStaff}
        isDrawer={true}
      />
    </section>
  );
}
