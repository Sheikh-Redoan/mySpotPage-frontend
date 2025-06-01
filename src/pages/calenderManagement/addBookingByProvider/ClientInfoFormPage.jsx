import { Input } from "antd";
import { AutoComplete } from "antd";
import { useState } from "react";
import ProviderCheckoutCard from "../../../components/addBookingByProvider/ProviderCheckoutCard";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const ClientInfoFormPage = () => {
  const businessStaticData = {
    studioName: "TCL Beauty Studio 01",
    label: "Beauty", 
    rating: 4.8,
    reviewCount: "12.5K reviews",
    address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
  };

  const [selectedServices, setSelectedServices] = useState([]);

  const handleBookNow = () => {
    // This function will be called when the "Continue" button is clicked
    console.log("Booking initiated. Selected services:", selectedServices);
    // You can add navigation or further logic here
    alert("Continue button clicked! Implement your booking logic here.");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start p-4 md:p-8">
      <div className="p-5 rounded-xl bg-[#FFFFFF] shadow-md space-y-3 flex-1 w-full md:w-auto">
        <h3 className="text-[#262626] text-[16px] font-semibold">
          Client Information
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="name" className="text-gray-700 text-sm">Name</label>
            <AutoComplete
              style={{ width: "100%" }}
              options={options}
              placeholder="Your Name"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              size="large"
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-1">
            <label htmlFor="phone" className="text-gray-700 text-sm">Phone Number</label>
            <Input placeholder="Your Phone Number" size="large" />
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto mt-4 md:mt-0">
        <ProviderCheckoutCard
          businessData={businessStaticData}
          selected={selectedServices} 
          handleBookNow={handleBookNow}
        />
      </div>
    </div>
  );
};

export default ClientInfoFormPage;
