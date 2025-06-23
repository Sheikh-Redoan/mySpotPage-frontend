import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { Form, Select, Button, Checkbox, Row, Col } from "antd";
import { GoChevronRight } from "react-icons/go";
import { LuClock } from "react-icons/lu";
import dayjs from "dayjs";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const StaffWorkingHoursPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const previousState = location.state || {};
  const { firstName, selectedServices } = previousState;

  const [error, setError] = useState("");

  // Set initial form values
  useEffect(() => {
    if (!firstName || !selectedServices) {
      setError("Missing previous staff data. Please restart the onboarding process.");
      return;
    }

    form.setFieldsValue({
      workingHours: daysOfWeek.map(day => ({
        day: day,
        enabled: day !== "Saturday",
        startShift: "08:00",
        endShift: "14:00",
        breakEnabled: day !== "Saturday",
        breakStart: "12:00",
        breakEnd: "13:00",
      }))
    });
  }, [firstName, selectedServices, form]);

  const handlePrevious = () => {
    navigate("/onboard/services-settings", { state: previousState });
  };

  const onFinish = (values) => {
    const staffWorkingHoursInfo = {
      ...previousState,
      workingHours: values.workingHours,
    };
    console.log("Staff Working Hours Information Collected:", staffWorkingHoursInfo);
    navigate("/onboard/security-settings", { state: staffWorkingHoursInfo });
  };
  
  const timeOptions = useMemo(() => 
    Array.from({ length: 24 * 4 }, (_, i) => {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const timeValue = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      return { value: timeValue, label: dayjs(timeValue, "HH:mm").format("hh:mm A") };
    }), []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Button type="primary" onClick={() => navigate("/seller-management")} className="mt-6">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch flex flex-wrap items-center gap-2 px-4 sm:px-0">
          <span className="text-gray-400 text-sm">Basic information</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Services settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-950 text-sm font-semibold">Working shift settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ShiftSection title="Working hours" form={form} listName="workingHours" timeOptions={timeOptions} isBreak={false} />
              <ShiftSection title="Breaking time" form={form} listName="workingHours" timeOptions={timeOptions} isBreak={true} />
            </div>
            <div className="flex flex-row sm:flex-row justify-end items-center gap-3 mt-8">
              <Button type="default" onClick={handlePrevious} className="btn-secondary w-full sm:w-auto">Previous</Button>
              <Button type="primary" htmlType="submit" className="btn-primary w-full !bg-black sm:w-auto">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};


// Reusable component for a section with corrected responsive logic
const ShiftSection = ({ title, form, listName, timeOptions, isBreak }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 space-y-4">
      {/* Header for Desktop */}
      <Row align="middle" gutter={16} className="flex max-md:!hidden  text-gray-500 text-sm text-center">
        <Col span={8} className="text-left text-neutral-800 text-base font-semibold">{title}</Col>
        <Col span={8}>{isBreak ? 'Break Start' : 'Start Shift'}</Col>
        <Col span={8}>{isBreak ? 'Break End' : 'End Shift'}</Col>
      </Row>
      {/* Header for Mobile */}
      <div className="lg:hidden text-left text-neutral-800 text-base font-semibold">{title}</div>

      <Form.List name={listName}>
        {(fields) => (
          <div className="space-y-4">
            {fields.map(({ key, name }) => (
              <Form.Item shouldUpdate noStyle key={key}>
                {() => {
                  const day = form.getFieldValue([listName, name, 'day']);
                  const shiftEnabled = form.getFieldValue([listName, name, 'enabled']);
                  const breakEnabled = form.getFieldValue([listName, name, 'breakEnabled']);
                  const isRowEnabled = isBreak ? shiftEnabled && breakEnabled : shiftEnabled;
                  const isDayDisabled = isBreak && !shiftEnabled;

                  return (
                    <div>
                      {/* --- DESKTOP VIEW --- */}
                      <div className="hidden md:block">
                        <Row align="middle" gutter={16} wrap={false}>
                          <Col span={8}>
                            <Form.Item name={[name, isBreak ? 'breakEnabled' : 'enabled']} valuePropName="checked" noStyle>
                              <Checkbox className="custom-square-check" disabled={isDayDisabled}>
                                <span className={`font-semibold text-sm ${isDayDisabled ? 'text-gray-400' : 'text-neutral-800'}`}>{day}</span>
                              </Checkbox>
                            </Form.Item>
                          </Col>
                          {isRowEnabled ? (
                            <>
                              <Col span={8}><Form.Item name={[name, isBreak ? 'breakStart' : 'startShift']} noStyle><Select options={timeOptions} suffixIcon={<LuClock className="text-gray-400" />} className="custom-input w-full" /></Form.Item></Col>
                              <Col span={8}><Form.Item name={[name, isBreak ? 'breakEnd' : 'endShift']} noStyle><Select options={timeOptions} suffixIcon={<LuClock className="text-gray-400" />} className="custom-input w-full" /></Form.Item></Col>
                            </>
                          ) : (
                            <Col span={16}><div className="unavailable-block">{isBreak ? 'No Break' : 'Unavailable'}</div></Col>
                          )}
                        </Row>
                      </div>

                      {/* --- MOBILE VIEW (matches the image) --- */}
                      <div className="block md:hidden space-y-2">
                        <Form.Item name={[name, isBreak ? 'breakEnabled' : 'enabled']} valuePropName="checked" noStyle>
                          <Checkbox className="custom-square-check" disabled={isDayDisabled}>
                            <span className={`font-semibold text-sm ${isDayDisabled ? 'text-gray-400' : 'text-neutral-800'}`}>{day}</span>
                          </Checkbox>
                        </Form.Item>
                        
                        {isRowEnabled ? (
                          <div className="pl-7">
                            <Row gutter={16} className="text-gray-500 text-sm mb-1">
                              <Col span={12}>{isBreak ? 'Break Start' : 'Start Shift'}</Col>
                              <Col span={12}>{isBreak ? 'Break End' : 'End Shift'}</Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}><Form.Item name={[name, isBreak ? 'breakStart' : 'startShift']} noStyle><Select options={timeOptions} suffixIcon={<LuClock className="text-gray-400" />} className="custom-input w-full" /></Form.Item></Col>
                              <Col span={12}><Form.Item name={[name, isBreak ? 'breakEnd' : 'endShift']} noStyle><Select options={timeOptions} suffixIcon={<LuClock className="text-gray-400" />} className="custom-input w-full" /></Form.Item></Col>
                            </Row>
                          </div>
                        ) : (
                          <div className="pl-7"><div className="unavailable-block">{isBreak ? 'No Break' : 'Unavailable'}</div></div>
                        )}
                      </div>
                    </div>
                  );
                }}
              </Form.Item>
            ))}
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default StaffWorkingHoursPage;