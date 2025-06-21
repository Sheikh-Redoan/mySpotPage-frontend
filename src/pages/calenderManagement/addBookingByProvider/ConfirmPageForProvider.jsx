import { PiStorefrontLight } from "react-icons/pi";
import Breadcrumb from "../../../components/client/Breadcrumb";
import ConfirmDetails from "../../../components/client/ConfirmDetails";
import { getBreadcrumbs } from "../../../lib/staticData";
import confirm_product from "/src/assets/images/confirm.jpg";
import BookingCheckoutCard from "../../../components/addBookingByProvider/BookingCheckoutCard";
import { useNavigate } from "react-router";

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  subtotal: 20.0,
  vatIncluded: true,
  discountPercentage: 10.0,
  discountAmount: 60.0,
  total: 90.0,
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

const ConfirmPageForProvider = () => {
 const navigate = useNavigate();

  const handleBookNow =() => {
    navigate("/dashboard/add-booking-by-provider/confirmation")
  }

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

        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 mt-6">
          <div className="p-5 bg-white rounded-xl flex-1 w-full lg:w-auto">
            <h2 className="text-Boulder-950 text-base font-semibold leading-normal mb-4">
              Confirm
            </h2>
            <div className="px-3 py-2 bg-violet-50 rounded-lg flex items-center gap-2 mb-4">
              <PiStorefrontLight className="text-primary01 text-[24px] flex-shrink-0" />
              <p className="text-violet-500 text-base font-semibold leading-normal">
                You will pay at the appointment location
              </p>
            </div>
            <div>
              <p className="text-neutral-700 text-sm font-normal leading-tight mb-1">
                Booking note
              </p>
              <div className="px-3 py-2 bg-white rounded-lg outline outline-offset-[-1px] outline-gray-200 flex items-start gap-2 w-full min-h-[125px]">
                <h3 className="flex-1 text-zinc-700 text-sm font-normal leading-tight">
                  {storeData.bookingNote}
                </h3>
              </div>
            </div>
          </div>

          <div className="max-md:hidden">
            {/* <BookingCheckoutCard
              data={businessStaticData}
              handleBookNow={handleBookNow}
            /> */}
          </div>

          {/* <ConfirmDetails
            className="w-full lg:w-80 p-4 flex-shrink-0"
            storeName={storeData.storeName}
            rating={storeData.rating}
            reviewsCount={storeData.reviewsCount}
            location={storeData.location}
            staffName={storeData.staffName}
            appointmentDateTime={storeData.appointmentDateTime}
            bookingNote={storeData.bookingNote}
            services={storeData.services}
            subtotal={storeData.subtotal}
            vatIncluded={storeData.vatIncluded}
            discountPercentage={storeData.discountPercentage}
            discountAmount={storeData.discountAmount}
            total={storeData.total}
            paymentInstruction={storeData.paymentInstruction}
            buttonTittle={"Complete"}
            buttonpath="/dashboard/add-booking-by-provider/confirmation"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default ConfirmPageForProvider;


 const storeData = {
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
    subtotal: "₪270.00",
    vatIncluded: "(includes ₪48.60 VAT)",
    discountPercentage: "20% OFF",
    discountAmount: "-₪54.00",
    total: "₪216.00",
    paymentInstruction: "You will pay at the appointment location",
  };
