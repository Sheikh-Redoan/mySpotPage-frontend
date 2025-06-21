import { AutoComplete, Input, Radio, Form, Button } from "antd";
import { useNavigate } from "react-router";
import ProviderCheckoutCard from "../../../components/addBookingByProvider/ProviderCheckoutCard";
import Breadcrumb from "../../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../../lib/staticData";
import CheckoutCardForMobile from "../../../components/addBookingByProvider/CheckoutCardForMobile";
import { cn } from "../../../lib/utils";
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
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
    <section>
      <div className="max-md:px-3 max-md:py-4">
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
          <div
            className={cn(
              "p-5 rounded-xl bg-[#FFFFFF] shadow space-y-3 flex-1 w-full md:w-auto max-md:mb-56",
              {
                "max-md:mb-80": showDetails,
              }
            )}
          >
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
              data={businessStaticData}
              handleBookNow={handleBookNow}
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
      />
    </section>
  );
};

export default ClientInfoFormPage;
