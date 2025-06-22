import { DatePicker, Modal, Select, Switch, Upload } from "antd"; // Import Upload
import { CalenderIcon, DownArrowIcon, ForwardIcon, ImageIcon, SearchIcon, UpdateIcon } from "../../../assets/icons/icons";
// import ImgCrop from 'antd-img-crop'; // Consider adding ant-design-pro for image cropping if needed

const { Option } = Select; // Destructure Option from Select

const AddClientModal = ({ isModalOpen, setIsModalOpen, setStep, step, fileList, setFileList, handleGenderChange, handleDateChange, handleCityChange, onSwitchChange, onImageChange, beforeUpload, customRequest, handleCancel }) => {

  return (
    <Modal
      title="Add client"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{  display: 'flex', flexDirection: 'column' }}
    >
      {
        step === 1 ?
          <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
            <div className="space-y-3 mt-4 add-client-modal">
              <h4>Avatar</h4>
              {/* Replaced fieldset with Ant Design Upload component */}
              {/* You might want to wrap Upload with ImgCrop for cropping functionality */}
              {/* <ImgCrop rotationSlider> */}

              <Upload
                className="w-[52px] h-[52px]"
                listType="picture-circle" // Makes it look like an avatar upload
                fileList={fileList}
                onChange={onImageChange}
                beforeUpload={beforeUpload}
                customRequest={customRequest} // Use customRequest for manual upload
                maxCount={1} // Allow only one image
              >
                {/* Display ImageIcon if no file is uploaded yet */}
                {fileList.length < 1 ? <ImageIcon /> : null}
              </Upload>
              {/* </ImgCrop> */}

              <div className="grid grid-cols-2 gap-3 mt-3">
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
                  {/* Corrected options for gender */}
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Others">Others</Option>
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
                  showToday={false}
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
                  {/* Corrected options for city */}
                  {["Jerusalem, Israel", "Tel Aviv, Israel", "Haifa, Israel", "Petah Tikva, Israel", "Beersheba, Israel"].map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </fieldset>

              <fieldset className="flex items-center gap-2">
                <Switch onChange={onSwitchChange} id="isVip" />
                <label htmlFor="isVip" className="">Mark as VIP Client</label>
              </fieldset>
            </div>

            <div className="md:mt-8 flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between py-5">
              <div className="flex items-center gap-1">
                <p className="text-[#262626]">Basic information</p>
                <ForwardIcon />
                <p className="text-[#888]">Provider notes</p>
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full text-white font-semibold bg-black py-2 md:w-24 rounded-lg cursor-pointer">Next</button>
            </div>
          </div> :
          <div className="text-[#3A3B3F] flex flex-col justify-between h-full">
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

            <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-[#888]">Basic information</p>
                <ForwardIcon />
                <p className="text-[#262626]">Provider notes</p>
              </div>
              {/* Changed type to button for both for consistency */}
              <div className="flex items-center gap-3 w-full md:w-[180px] mt-6 md:mt-0">
                <button type="button" className="w-1/2 text-[#242528] font-semibold border border-[#242528] py-2 md:w-24 rounded-lg cursor-pointer" onClick={() => setStep(1)}>Previous</button>
                <button type="button" className="w-1/2 text-white font-semibold bg-[#242528] py-2 md:w-24 rounded-lg cursor-pointer">Finish</button>
              </div>
            </div>
          </div>
      }
    </Modal>
  );
};

export default AddClientModal;