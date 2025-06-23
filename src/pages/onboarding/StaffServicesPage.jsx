import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router"; // Corrected import path
import { Form, Select, Button, Input } from "antd";
import { GoChevronRight } from "react-icons/go";
import { staffData as initialStaffData } from "../../lib/staffData";

// Helper component for consistent form labels
const FormLabel = ({ label, required }) => (
  <span className="text-neutral-700 text-sm font-['Golos_Text']">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
  </span>
);

// Helper component to style the selected tags, which was missing
const TagLabel = (props) => {
    const { label } = props;
    return (
        <span className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium m-0.5 inline-block">
            {label}
        </span>
    );
};


const StaffServicesPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const previousState = location.state || {};
  const { roles, jobTitle, firstName } = previousState;

  const [error, setError] = useState("");

  const allAvailableServices = useMemo(() => {
    return Array.from(new Set(initialStaffData.flatMap((staff) => staff.services)));
  }, []);

  // Set initial values for read-only fields
  useEffect(() => {
    if (!firstName) {
      setError("Missing previous staff data. Please restart the onboarding process.");
      return;
    }
    form.setFieldsValue({
      roles: roles || [],
      jobTitle: jobTitle || "",
    });
  }, [firstName, roles, jobTitle, form]);

  const handlePrevious = () => {
    navigate("/onboard/staff-info", { state: previousState });
  };

  // On successful form submission, navigate to the next page
  const onFinish = (values) => {
    const staffServicesInfo = {
      ...previousState,
      selectedServices: values.selectedServices,
    };
    console.log("Staff Services Information Collected:", staffServicesInfo);
    navigate("/onboard/working-shift-settings", { state: staffServicesInfo });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Button type="primary" onClick={() => navigate("/seller-management")} className="mt-6">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-full max-w-[722px] flex flex-col gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch flex flex-wrap items-center gap-2 px-4 sm:px-0">
          <span className="text-gray-400 text-sm">Basic information</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-950 text-sm font-semibold">Services settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Working shift settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <Form.Item label={<FormLabel label="Role" required />} name="roles">
                  <Select
                    mode="multiple"
                    className="custom-input"
                    disabled
                    tagRender={TagLabel}
                  />
                </Form.Item>
                <Form.Item label={<FormLabel label="Job title" required />} name="jobTitle">
                  <Input className="custom-input" disabled />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label={<FormLabel label="Services" required />}
                  name="selectedServices"
                  rules={[{ required: true, message: "Please select at least one service." }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    placeholder="Select"
                    optionFilterProp="label"
                    options={allAvailableServices.map(service => ({
                      label: service,
                      value: service,
                    }))}
                    className="custom-input"
                  />
                </Form.Item>
                <p className="text-gray-400 text-xs font-normal leading-none -mt-4">
                  The services this staff member will be responsible for.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-8">
              <Button type="default" onClick={handlePrevious} className="btn-secondary w-full sm:w-auto">
                Previous
              </Button>
              <Button type="primary" htmlType="submit" className="btn-primary !bg-black w-full sm:w-auto">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StaffServicesPage;