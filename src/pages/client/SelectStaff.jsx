import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/client/Breadcrumb";
import ConfirmDetails from "../../components/client/ConfirmDetails";
import StaffCard from "../../components/client/StaffCard";
import { getBreadcrumbs } from "../../lib/staticData";
import { setSelectedStaff } from "../../redux/features/staffSlice";
import Container from "./Container";
import { storeData } from "./ClientAppointmentCal";
import { PiFireLight, PiInfo } from "react-icons/pi";
import { Button } from "antd";

// Belows are the Mock staff data will be replaced with the real data
import staff1 from "../../assets/images/staff/staff1.jpg";
import staff2 from "../../assets/images/staff/staff2.jpg";
import staff3 from "../../assets/images/staff/staff3.jpg";
import staff4 from "../../assets/images/staff/staff4.jpg";
import staff5 from "../../assets/images/staff/staff5.jpg";
import staff6 from "../../assets/images/staff/staff6.jpg";
import staff7 from "../../assets/images/staff/staff7.jpg";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { cn } from "../../lib/utils";

export default function SelectStaff() {
  const [showDetails, setShowDetails] = useState(false);
  const selectedStaff = useSelector(({ selectedStaff }) => selectedStaff);
  const [staff, setStaff] = useState(staffData);
  const dispatch = useDispatch();

  // log to the console of selected staff from redux store
  console.log(selectedStaff);

  const handleSelect = (staffData) => {
    const updatedStaff = staff.map((item) => ({
      ...item,
      selected: item.id === staffData.id,
    }));
    setStaff(updatedStaff);
    dispatch(setSelectedStaff(staffData));
  };

  return (
    <section className="bg-[#F9FAFC] md:py-8">
      <Container
        // className={cn("max-md:h-[610px] max-md:overflow-y-auto", {
        //   "max-md:h-[520px] max-md:overflow-y-auto": showDetails,
        // })}
        className={cn("max-md:mb-56", { "max-md:mb-78": showDetails })}
      >
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Select staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8">
          <div className="p-5 bg-white rounded-xl flex-1 w-full lg:w-auto">
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

          <ConfirmDetails
            className="w-ull lg:w-1/4 p-4 max-md:hidden"
            staffName={selectedStaff?.name}
            storeName="TCL Beauty Studio 01"
            appointmentDateTime={"06 Jan 2025, 11:00"}
            bookingNote={
              "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture."
            }
            services={[]}
            subtotal={0}
            vatIncluded={0}
            discountPercentage={0}
            discountAmount={0}
            total={0}
            paymentInstruction={""}
            buttonTittle={"Continue"}
            buttonpath="/service-provider-info/select-time"
          />
        </div>
      </Container>

      {/* Mobile View */}
      <div className="md:hidden bg-white p-4 shadow fixed bottom-0 w-full z-50">
        <div className="flex items-end justify-between">
          <div>
            {storeData.storeName && (
              <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
                {storeData.storeName}
              </h3>
            )}
            {(storeData.rating || storeData.reviewsCount) && (
              <div className="flex gap-1 items-center">
                {storeData.rating && <FaStar className="text-[#FFD056]" />}
                {storeData.rating && (
                  <p className="text-black text-sm font-normal leading-tight">
                    {storeData.rating}
                  </p>
                )}
                {storeData.reviewsCount && (
                  <p className="text-description text-sm font-normal underline leading-tight">
                    ({storeData.reviewsCount})
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="self-end">
            <Button
              type="text"
              className="w-full"
              onClick={() => setShowDetails(!showDetails)}
            >
              See detail{" "}
              {showDetails ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </Button>
          </div>
        </div>
        <div className="border-b border-b-gray-200 my-3" />

        {/* Price details */}
        <div className="flex flex-col gap-[12px] w-full justify-center items-start">
          {showDetails && (
            <>
              {(storeData.subtotal || storeData.vatIncluded) && (
                <div className="flex justify-between items-start w-full mb-2">
                  <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                    Subtotal{" "}
                    {storeData.subtotal && <PiInfo className="text-gray-500" />}
                  </p>
                  <div>
                    {storeData.subtotal && (
                      <p className="text-right text-black text-sm font-normal leading-tight">
                        {storeData.subtotal}
                      </p>
                    )}
                    {storeData.vatIncluded && (
                      <p className=" text-description text-xs font-normal text-right  leading-none">
                        {storeData.vatIncluded}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {(storeData.discountPercentage || storeData.discountAmount) && (
                <div className="flex justify-between items-start w-full">
                  <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                    Discount
                  </p>
                  <div className="flex gap-1 items-center">
                    {storeData.discountPercentage && (
                      <p className="text-violet-500 text-xs font-medium   leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                        <PiFireLight /> {storeData.discountPercentage}
                      </p>
                    )}
                    {storeData.discountAmount && (
                      <p className="text-right text-red-500 text-sm font-normal   leading-tight">
                        {storeData.discountAmount}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* Separator Line for Total - Renders only if discount or subtotal is present AND total is present */}
              {(storeData.subtotal || storeData.discountAmount) &&
                storeData.total && (
                  <div className="h-[1px] w-full border-t border-[#E9EAEC]"></div>
                )}
            </>
          )}

          {storeData.total && (
            <div className="flex justify-between items-start w-full">
              <p className="w-full max-w-48 text-description text-sm font-normal   leading-tight">
                Total
              </p>
              <p className="text-right text-violet-500 text-lg font-semibold   leading-relaxed">
                {storeData.total}
              </p>
            </div>
          )}
        </div>

        <Button
          color="default"
          variant="solid"
          className="w-full my-2"
          disabled
        >
          Continue
        </Button>

        {storeData.paymentInstruction && (
          <p className="self-stretch text-center text-description text-xs font-normal   leading-none">
            {storeData.paymentInstruction}
          </p>
        )}
      </div>
    </section>
  );
}

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
