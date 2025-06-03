import { AutoComplete, Input, Radio } from "antd";
import { useNavigate } from "react-router";
import ProviderCheckoutCard from "../../../components/addBookingByProvider/ProviderCheckoutCard";
import Breadcrumb from "../../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../../lib/staticData";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

const businessStaticData = {
  studioName: "TCL Beauty Studio 01",
  label: "Beauty",
  rating: 4.8,
  reviewCount: "12.5K reviews",
  address: "15 Rothschild Boulevard, Tel Aviv-Yafo, Israel",
};

const ClientInfoFormPage = () => {
  const navigation = useNavigate();

  const handleBookNow = () => {
    navigation("/add-booking-by-provider/select-services");
  };

  return (
    <section>
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
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div className="p-5 rounded-xl bg-[#FFFFFF] shadow-md space-y-3 flex-1 w-full md:w-auto">
          <h3 className="text-[#262626] text-[16px] font-semibold">
            Client Information
          </h3>

          <div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-700 text-sm">
                  Name <sup className="text-red-600">*</sup>
                </label>
                <AutoComplete
                  style={{ width: "100%" }}
                  options={options}
                  placeholder="Your Name"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  size="large"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <label htmlFor="phone" className="text-gray-700 text-sm">
                  Phone Number <sup className="text-red-600">*</sup>
                </label>
                <Input
                  name="phone"
                  placeholder="Your Phone Number"
                  size="large"
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor="sex">
                Sex <sup className="text-red-600">*</sup>
              </label>
              <Radio.Group
                name="sex"
                defaultValue={1}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0">
          <ProviderCheckoutCard
            businessData={businessStaticData}
            handleBookNow={handleBookNow}
            to="/dashboard/add-booking-by-provider/select-services"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientInfoFormPage;
