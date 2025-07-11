import { useState } from "react";
import { useNavigate } from "react-router";
import Breadcrumb from "../../../components/client/Breadcrumb";
import ServicesList from "../../../components/serviceProviderInfo/ServicesList";
import TreatmentModal from "../../../components/serviceProviderInfo/TreatmentModal";
import { getBreadcrumbs } from "../../../lib/staticData";
import { cn } from "../../../lib/utils";
import CheckoutCardForMobile from "../../../components/addBookingByProvider/CheckoutCardForMobile";
import BookingCheckoutCard from "../../../components/addBookingByProvider/BookingCheckoutCard";
import confirm_product from "/src/assets/images/confirm.jpg";
import { useDispatch } from "react-redux";
import { setServiceData } from "../../../redux/features/serviceSlice";

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  subtotal: 0.0,
  vatIncluded: true,
  discountPercent: 20,
  discountAmount: 0.0,
  total: 0.0,
  vat: 0.0,
  paymentInstruction: "You will pay at the appointment location",
};

const ServicesPageForProvider = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleBookNow = () => {
    dispatch(setServiceData(selected));
    setModalOpen(true);
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
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div
            className={cn(
              "max-md:mb-54 p-5 rounded-xl bg-[#FFFFFF] shadow-md space-y-3 flex-1 w-full md:w-auto",
              {
                "max-md:mb-94": showDetails,
              }
            )}
          >
            <ServicesList
              selected={selected}
              setSelected={setSelected}
              label="Select Services"
            />
          </div>

          <div className="max-md:hidden">
            <BookingCheckoutCard
              data={businessStaticData}
              handleBookNow={handleBookNow}
              selected={selected}
              disabled={selected.length === 0}
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <CheckoutCardForMobile
        data={businessStaticData}
        handleBookNow={handleBookNow}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        disabled={selected.length === 0}
      />

      {/* Modal After Select Services */}
      <TreatmentModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onContinue={(selectedData) => {
          console.log({ selectedData });
          navigate("/dashboard/add-booking-by-provider/select-staff");
        }}
        services={selected}
      />
    </section>
  );
};

export default ServicesPageForProvider;
