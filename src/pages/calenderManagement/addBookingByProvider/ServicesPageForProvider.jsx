import { useState } from "react";
import { useNavigate } from "react-router";
import ProviderCheckoutCard from "../../../components/addBookingByProvider/ProviderCheckoutCard";
import Breadcrumb from "../../../components/client/Breadcrumb";
import ServicesList from "../../../components/serviceProviderInfo/ServicesList";
import TreatmentModal from "../../../components/serviceProviderInfo/TreatmentModal";
import { getBreadcrumbs } from "../../../lib/staticData";

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
};

const ServicesPageForProvider = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBookNow = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="py-4">
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
          <div className="p-5 rounded-xl bg-[#FFFFFF] shadow-md space-y-3 flex-1 w-full md:w-auto">
            <ServicesList
              selected={selected}
              setSelected={setSelected}
              label="Select Services"
            />
          </div>
          <ProviderCheckoutCard
            businessData={businessStaticData}
            handleBookNow={handleBookNow}
            selected={selected}
            to="/dashboard/add-booking-by-provider/select-staff"
          />
        </div>
      </div>

      <TreatmentModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onContinue={() => {
          navigate("/add-booking-by-provider/select-staff");
        }}
        services={selected}
      />
    </>
  );
};

export default ServicesPageForProvider;
