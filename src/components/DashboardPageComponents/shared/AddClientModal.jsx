import { DatePicker, Modal, Select, Switch } from "antd";
import { CalenderIcon, DownArrowIcon, Forwardcon, ImageIcon, SearchIcon, UpdateIcon } from "../../../assets/icons/icons";
import { useState } from "react";

const AddClientModal = ({ isModalOpen, setIsModalOpen }) => {

  const [step, setStep] = useState(1);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGenderChange = (value) => {
    console.log(`selected ${value}`);
  }

  const handleDateChange = (date, dateString) => {
    console.log(dateString);
  };

  const handleCityChange = (value) => {
    console.log("Selected phone number:", value);
  };

  const onSwitchChange = checked => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Modal
      title="Add client"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ height: 600, display: 'flex', flexDirection: 'column' }}
    >
      {
        step == 1 ?
          <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
            <div className="space-y-3 mt-4">
              <h4>Avatar</h4>
              <fieldset className="relative size-14 rounded-full bg-[#F6F6F6] flex justify-center items-center">
                <ImageIcon />
                <div className="absolute -right-1 bottom-0 size-7 rounded-full border border-white bg-[#F5F4FE] flex items-center justify-center"><UpdateIcon /></div>
              </fieldset>

              <div className="grid grid-cols-2 gap-3">
                <fieldset className="">
                  <label htmlFor="firstName" className="block w-fit mb-1">First Name <span className="text-[#ED4245]">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    className="border border-[#E0E0E0] rounded-lg px-3 h-10 w-full"
                    placeholder="First name"
                  />
                </fieldset>
                <fieldset className="">
                  <label htmlFor="lastName" className="block w-fit mb-1">Last name <span className="text-[#ED4245]">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    className="border border-[#E0E0E0] rounded-lg px-3 w-full h-10"
                    placeholder="Last name"
                  />
                </fieldset>
              </div>

              <fieldset>
                <label htmlFor="gender" className="block w-fit mb-1">Gender <span className="text-[#ED4245]">*</span></label>
                <Select
                  id="gender"
                  onChange={handleGenderChange}
                  placeholder="Select Gender"
                  className="border border-[#E0E0E0] rounded-lg w-full !h-10"
                  suffixIcon={<DownArrowIcon />}
                >
                  {["fjgvhjg", "jdfgghfg"].map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </fieldset>

              <fieldset>
                <label htmlFor="dob" className="block w-fit mb-1">DOB <span className="text-[#ED4245]">*</span></label>
                <DatePicker
                  id="dob"
                  onChange={handleDateChange}
                  className="w-full !h-10 border border-[#E0E0E0] rounded-lg"
                  placeholder="dd/mm/yyyy"
                  suffixIcon={<CalenderIcon />}
                  format="YYYY-MM-DD"
                />
              </fieldset>

              <fieldset className="">
                <label htmlFor="phoneNumber" className="block w-fit mb-1">Phone number <span className="text-[#ED4245]">*</span></label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="border border-[#E0E0E0] rounded-lg px-3 h-10 w-full"
                  placeholder="Phone number"
                />
              </fieldset>

              <fieldset className="">
                <label htmlFor="city" className="block w-fit mb-1">City <span className="text-[#ED4245]">*</span></label>
                <Select
                  id="city"
                  showSearch
                  placeholder="Search city"
                  optionFilterProp="children"
                  className="border border-[#E0E0E0] rounded-lg w-full !h-10"
                  onChange={handleCityChange}
                  suffixIcon={<SearchIcon />}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {["Jerusalem, Israel", "Tel Aviv, Israel", "Haifa, Israel"].map((phone) => (
                    <Option key={phone} value={phone}>
                      {phone}
                    </Option>
                  ))}
                </Select>
              </fieldset>

              <fieldset className="flex items-center gap-2">
                <Switch onChange={onSwitchChange} id="isVip" />
                <label htmlFor="isVip" className="">Mark as VIP Client</label>
              </fieldset>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-[#262626]">Basic information</p>
                <Forwardcon />
                <p className="text-[#888]">Provider notes</p>
              </div>
              <button type="button" onClick={() => setStep(2)} className="text-white font-semibold bg-black py-2 w-24 rounded-lg cursor-pointer">Next</button>
            </div>
          </div> : <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
            <div className="mt-4">
              <fieldset>
                <label htmlFor="customNotes" className="block w-fit mb-1">Custom notes</label>
                <textarea
                  id="customNotes"
                  className="border border-[#E0E0E0] rounded-lg px-3 py-2 h-[125px] w-full"
                  placeholder="Note specific observations or client requests."
                />
              </fieldset>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-[#888]">Basic information</p>
                <Forwardcon />
                <p className="text-[#262626]">Provider notes</p>
              </div>
              <button type="button" className="text-[#242528] font-semibold border border-[#242528] py-2 w-24 rounded-lg cursor-pointer" onClick={() => setStep(1)}>Previous</button>
              <button type="button" className="text-white font-semibold bg-[#242528] py-2 w-24 rounded-lg cursor-pointer">Finish</button>
            </div>
          </div>
      }
    </Modal>
  );
};

export default AddClientModal;
