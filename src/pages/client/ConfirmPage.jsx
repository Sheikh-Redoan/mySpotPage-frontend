import { PiStorefrontLight } from "react-icons/pi";
import confirm_product from "../../assets/images/confirm.jpg";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";
import BookingCheckoutCard from "../../components/addBookingByProvider/BookingCheckoutCard";
import CheckoutCardForMobile from "../../components/addBookingByProvider/CheckoutCardForMobile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  subtotal: 80.0,
  vat: 10.0,
  vatText: "includes ₪49.50 VAT",
  discountPercent: 10.0,
  discountAmount: 60.0,
  paymentInstruction: "You will pay at the appointment location",
  selectedTime: "06 Jan 2025, 11:00",
  note: "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
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

const ConfirmPage = () => {
  const navigate = useNavigate();
  const selectedStaff = useSelector(({ selectedStaff }) => selectedStaff);

  const handleBookNow = () => {
    navigate("/service-provider-info/confirmation");
  };

  return (
    <section className="md:py-8">
      <Container className="">
        {/* Pass isAddressPage as true to show "Enter address" and "Select staff" in the breadcrumb */}
        <Breadcrumb breadcrumbs={getBreadcrumbs()} />
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
                  Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.
                </h3>
              </div>
            </div>
          </div>

          <div className="max-md:hidden">
            <BookingCheckoutCard
              data={businessStaticData}
              handleBookNow={handleBookNow}
              selectedStaff={selectedStaff}
            />
          </div>
        </div>
      </Container>

      {/* Mobile View */}
      <CheckoutCardForMobile
        data={businessStaticData}
        handleBookNow={handleBookNow}
        isDrawer={true}
        selectedStaff={selectedStaff}
      />
    </section>
  );
};

export default ConfirmPage;
