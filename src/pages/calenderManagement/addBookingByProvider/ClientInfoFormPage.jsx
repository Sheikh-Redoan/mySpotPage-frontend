import { AutoComplete, Input, Radio, Form, Button } from "antd";
import { useNavigate } from "react-router";
import ProviderCheckoutCard from "../../../components/addBookingByProvider/ProviderCheckoutCard";
import Breadcrumb from "../../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../../lib/staticData";
import { FaStar } from "react-icons/fa";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { PiFireLight, PiInfo } from "react-icons/pi";
import { useState } from "react";

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
  subtotal: 20.0,
  vatIncluded: true,
  discountPercentage: 10.0,
  discountAmount: 60.0,
  total: 90.0,
  paymentInstruction: "You will pay at the appointment location",
};

const ClientInfoFormPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDetails, setShowDetails] = useState(false);

  const handleBookNow = async () => {
    try {
      const values = await form.validateFields();
      console.log("Client Info Form Values:", values);
      navigate("/dashboard/add-booking-by-provider/select-services");
    } catch (errorInfo) {
      console.log("Client Info Form Validation Failed:", errorInfo);
    }
  };

  return (
    <section className="">
      <div className="max-md:px-3">
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
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start max-md:px-3">
        <div className="p-5 rounded-xl bg-[#FFFFFF] shadow space-y-3 flex-1 w-full md:w-auto">
          <h3 className="text-[#262626] text-[16px] font-semibold">
            Client Information
          </h3>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ sex: "male" }}
            requiredMark={false}
          >
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                  <Form.Item
                    label={
                      <span>
                        Name <sup className="text-red-600">*</sup>
                      </span>
                    }
                    name="clientName"
                    rules={[
                      {
                        required: true,
                        message: "Please input the client's name!",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters long!",
                      },
                    ]}
                  >
                    <AutoComplete
                      options={options}
                      placeholder="Your Name"
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      size="large"
                    />
                  </Form.Item>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                  <Form.Item
                    label={
                      <span>
                        Phone Number <sup className="text-red-600">*</sup>
                      </span>
                    }
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input the phone number!",
                      },
                      {
                        pattern: /^[0-9]{10,15}$/,
                        message: "Please enter a valid phone number!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Your Phone Number"
                      size="large"
                      type="tel"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <Form.Item
                  label={
                    <span>
                      Sex <sup className="text-red-600">*</sup>
                    </span>
                  }
                  name="sex"
                  rules={[
                    {
                      required: true,
                      message: "Please select a gender!",
                    },
                  ]}
                >
                  <Radio.Group
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0 max-md:hidden">
          <ProviderCheckoutCard
            businessData={businessStaticData}
            handleBookNow={handleBookNow}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-white p-4 shadow fixed bottom-0 w-full z-50">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="self-stretch text-Boulder-950 text-lg font-semibold leading-relaxed">
              {businessStaticData.studioName}
            </h3>

            {(businessStaticData.rating || businessStaticData.reviewCount) && (
              <div className="flex gap-1 items-center">
                {businessStaticData.rating && (
                  <FaStar className="text-[#FFD056]" />
                )}
                {businessStaticData.rating && (
                  <p className="text-black text-sm font-normal leading-tight">
                    {businessStaticData.rating}
                  </p>
                )}
                {businessStaticData.reviewCount && (
                  <p className="text-description text-sm font-normal underline leading-tight">
                    ({businessStaticData.reviewCount})
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
              {(!!businessStaticData.subtotal ||
                businessStaticData.vatIncluded) && (
                <div className="flex justify-between items-start w-full mb-2">
                  <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                    Subtotal{" "}
                    {businessStaticData.subtotal && (
                      <PiInfo className="text-gray-500" />
                    )}
                  </p>
                  <div>
                    {businessStaticData.subtotal && (
                      <p className="text-right text-black text-sm font-normal leading-tight">
                        {businessStaticData.subtotal}
                      </p>
                    )}
                    {businessStaticData.vatIncluded && (
                      <p className=" text-description text-xs font-normal text-right  leading-none">
                        {businessStaticData.vatIncluded}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {(businessStaticData.discountPercentage ||
                businessStaticData.discountAmount) && (
                <div className="flex justify-between items-start w-full">
                  <p className="self-stretch text-description text-sm font-normal   leading-tight flex items-center gap-1">
                    Discount
                  </p>
                  <div className="flex gap-1 items-center">
                    {businessStaticData.discountPercentage && (
                      <p className="text-violet-500 text-xs font-medium   leading-none px-2 py-1 flex bg-[#ecebfc] w-max rounded items-center gap-1">
                        <PiFireLight /> {businessStaticData.discountPercentage}
                      </p>
                    )}
                    {businessStaticData.discountAmount && (
                      <p className="text-right text-red-500 text-sm font-normal   leading-tight">
                        {businessStaticData.discountAmount}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* Separator Line for Total - Renders only if discount or subtotal is present AND total is present */}
              {(businessStaticData.subtotal ||
                businessStaticData.discountAmount) &&
                businessStaticData.total && (
                  <div className="h-[1px] w-full border-t border-[#E9EAEC]"></div>
                )}
            </>
          )}

          {businessStaticData.total && (
            <div className="flex justify-between items-start w-full">
              <p className="w-full max-w-48 text-description text-sm font-normal   leading-tight">
                Total
              </p>
              <p className="text-right text-violet-500 text-lg font-semibold leading-relaxed">
                {businessStaticData.total}
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

        {businessStaticData.paymentInstruction && (
          <p className="self-stretch text-center text-description text-xs font-normal   leading-none">
            {businessStaticData.paymentInstruction}
          </p>
        )}
      </div>
    </section>
  );
};

export default ClientInfoFormPage;
