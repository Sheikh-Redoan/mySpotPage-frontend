import { useNavigate } from "react-router";
import BookingCheckoutCard from "../../components/addBookingByProvider/BookingCheckoutCard";
import AddressForm from "../../components/client/AddressForm";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";
import Container from "./Container";
import confirm_product from "../../assets/images/confirm.jpg";
import CheckoutCardForMobile from "../../components/addBookingByProvider/CheckoutCardForMobile";

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
  travelFee: 20.0,
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

export default function EnterAddress() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/service-provider-info/select-staff");
  };

  return (
    <section>
      <Container>
        <Breadcrumb
          isAddressPage={true}
          isStaffPage={true}
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Enter Address",
              link: "/service-provider-info/enter-address",
            },
            {
              name: "Select Staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />
        <div className="flex justify-between flex-col lg:flex-row w-full gap-8">
          <div className="flex-1 bg-white rounded-xl p-5">
            <h2 className="text-xl font-semibold font-golos">Enter Address</h2>

            <AddressForm />
          </div>

          <div className="max-md:hidden">
            <BookingCheckoutCard
              data={businessStaticData}
              handleBookNow={handleBookNow}
            />
          </div>
        </div>
      </Container>

      {/* Mobile View */}
      <CheckoutCardForMobile
        data={businessStaticData}
        handleBookNow={handleBookNow}
        isDrawer={true}
      />
    </section>
  );
}
