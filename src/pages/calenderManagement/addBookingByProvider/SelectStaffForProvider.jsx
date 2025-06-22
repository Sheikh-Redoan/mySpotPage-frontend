import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/client/Breadcrumb";
import ConfirmDetails from "../../../components/client/ConfirmDetails";
import StaffCard from "../../../components/client/StaffCard";
import { getBreadcrumbs } from "../../../lib/staticData";
import { setSelectedStaff } from "../../../redux/features/staffSlice";
import staff1 from "/src/assets/images/staff/staff1.jpg";
import staff2 from "/src/assets/images/staff/staff2.jpg";
import staff3 from "/src/assets/images/staff/staff3.jpg";
import staff4 from "/src/assets/images/staff/staff4.jpg";
import staff5 from "/src/assets/images/staff/staff5.jpg";
import staff6 from "/src/assets/images/staff/staff6.jpg";
import staff7 from "/src/assets/images/staff/staff7.jpg";
import BookingCheckoutCard from "../../../components/addBookingByProvider/BookingCheckoutCard";
import { useNavigate } from "react-router";
import CheckoutCardForMobile from "../../../components/addBookingByProvider/CheckoutCardForMobile";
import { cn } from "../../../lib/utils";
import confirm_product from "/src/assets/images/confirm.jpg";

const staffData = [
  {
    id: "0",
    selected: true,
    name: "Any Staff",
    designation: "Staff will be assigned later",
    picture: null,
  },
  {
    id: "1",
    selected: false,
    name: "Staff1",
    designation: "Junior stylist",
    picture: staff1,
  },
  {
    id: "2",
    selected: false,
    name: "Staff2",
    designation: "Junior stylist",
    picture: staff2,
  },
  {
    id: "3",
    selected: false,
    name: "Staff3",
    designation: "Junior stylist",
    picture: staff3,
  },
  {
    id: "4",
    selected: false,
    name: "Staff4",
    designation: "Junior stylist",
    picture: staff4,
  },
  {
    id: "5",
    selected: false,
    name: "Staff5",
    designation: "Junior stylist",
    picture: staff5,
  },
  {
    id: "6",
    selected: false,
    name: "Staff6",
    designation: "Junior stylist",
    picture: staff6,
  },
  {
    id: "7",
    selected: false,
    name: "Staff7",
    designation: "Junior stylist",
    picture: staff7,
  },
];

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

const SelectStaffForProvider = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const selectedStaff = useSelector(({ selectedStaff }) => selectedStaff);
  const [staff, setStaff] = useState(staffData);
  const dispatch = useDispatch();

  // log to the console of selected staff from redux store
  console.log({selectedStaff});

  const handleSelect = (staffData) => {
    const updatedStaff = staff.map((item) => ({
      ...item,
      selected: item.id === staffData.id,
    }));
    setStaff(updatedStaff);
    dispatch(setSelectedStaff(staffData));
  };

  const handleBookNow = async () => {
    navigate("/dashboard/add-booking-by-provider/select-time");
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

        <div className="flex justify-between flex-col lg:flex-row w-full gap-8">
          <div
            className={cn(
              "flex-1 bg-white rounded-xl p-5 shadow space-y-3 w-full md:w-auto max-md:mb-56",
              {
                "max-md:mb-94": showDetails,
              }
            )}
          >
            <h2 className="text-xl font-semibold font-golos">Select staff</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-5">
              {staff.length > 0 ? (
                staff.map((item, index) => (
                  <StaffCard
                    key={index}
                    value={item.id}
                    isActive={item.selected}
                    handleSelect={() => handleSelect(item)}
                    name={item.name}
                    designation={item.designation}
                    picture={item.picture}
                  />
                ))
              ) : (
                // Should be replaced with Empty component
                <p className="text-center text-lg font-semibold">
                  No staff found
                </p>
              )}
            </div>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0 max-md:hidden">
            <BookingCheckoutCard
              data={businessStaticData}
              handleBookNow={handleBookNow}
              selectedStaff={selectedStaff}
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
        isDrawer={true}
        selectedStaff={selectedStaff}
      />
    </section>
  );
};

export default SelectStaffForProvider;
