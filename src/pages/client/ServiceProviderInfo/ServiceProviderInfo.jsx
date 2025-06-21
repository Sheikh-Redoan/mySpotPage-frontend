import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import banner from "../../../assets/images/ClientBanner.png";
import BookingCart from "../../../components/serviceProviderInfo/BookingCart";
import LoginNotificationModal from "../../../components/serviceProviderInfo/LoginNotificationModal";
import OurWork from "../../../components/serviceProviderInfo/OurWork";
import ServicesList from "../../../components/serviceProviderInfo/ServicesList";
import TestimonialsSection from "../../../components/serviceProviderInfo/TestimonialsSection";
import TreatmentModal from "../../../components/serviceProviderInfo/TreatmentModal";
import { selectUser } from "../../../redux/features/userSlice";
import { use } from "react";

const businessData = {
  studioName: "TCL Beauty Studio 01",
  label: "Business Based",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  workingHours: [
    { day: "Monday", time: "08:00 - 17:00" },
    { day: "Tuesday", time: "08:00 - 17:00" },
    { day: "Wednesday", time: "08:00 - 17:00" },
    { day: "Thursday", time: "08:00 - 17:00" },
    { day: "Friday", time: "08:00 - 17:00" },
    { day: "Saturday", time: "08:00 - 17:00" },
    { day: "Sunday", time: "08:00 - 17:00" },
  ],
};

const ServiceProviderInfo = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isLoggedIn = false; // Replace with actual login state check
  const user = useSelector(selectUser);

  const handleBookNow = () => {
    if (user) {
      setModalOpen(true); // Open service booking modal
    } else {
      setLoginModalOpen(true); // Open login modal
    }
  };

  return (
    <section className="container mx-auto py-5 px-3">
      {/* banner part */}
      <div className="mb-10">
        <img
          className="w-full h-auto"
          src={banner}
          alt="Service Provider Banner"
        />
      </div>
      {/* content part */}
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Services List + about us  */}
        <div className="flex-1">
          <ServicesList selected={selected} setSelected={setSelected} />
          <div className="my-12 font-golos ">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-description text-sm md:text-base">
              At TCL Beauty Studio 01, we’re passionate about delivering
              exceptional hair services with a personalized touch. Founded in
              2020, our mission is to help every client feel confident and
              beautiful through expert styling and innovative techniques. What
              sets us apart? Our commitment to high-quality products, skilled
              professionals, and a welcoming atmosphere. Whether you visit our
              salon or book a home service, we ensure a top-tier experience
              tailored just for you.
            </p>
          </div>
          <div className="w-full ">
            <div className="flex justify-between items-center font-golos mb-4">
              <h2 className="text-2xl font-semibold mb-4">Our Work</h2>
              <Link
                to="/our-work"
                className="text-base font-semibold rounded text-white bg-primary01 px-4 py-2">
                View All
              </Link>
            </div>
            <OurWork />
          </div>
          <div>
            <TestimonialsSection />
          </div>
        </div>

        {/* Booking part */}
        <div className="">
          <BookingCart
            businessData={businessData}
            selected={selected}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setModalOpen={setModalOpen}
            handleBookNow={handleBookNow}
          />
        </div>
      </div>

      {/* Mobile booking button */}
      <div className="flex justify-between items-center md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-4 pt-6 pb-12 z-50">
        <div className="text-sm text-center text-gray-500">
          {selected.length > 0
            ? `${selected.length} service selected`
            : "0 service selected"}
        </div>
          <button
            className={`bg-gray-900 text-white py-2 px-8 rounded-lg transition ${
              selected.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
            disabled={selected.length === 0}
            onClick={handleBookNow}>
            Book now
          </button>
      </div>

      {/* modal for booking confirmation */}
      <TreatmentModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onContinue={() => {
          setModalOpen(false);
          navigate("/service-provider-info/select-staff");
        }}
        services={selected}
      />

      {/* modal for login notification */}
      <LoginNotificationModal
        open={loginModalOpen}
        onCancel={() => setLoginModalOpen(false)}
      />
    </section>
  );
};

export default ServiceProviderInfo;
