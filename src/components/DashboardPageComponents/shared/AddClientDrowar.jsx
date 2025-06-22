import { Button, Drawer } from 'antd';
import { X } from 'lucide-react';
import { DatePicker, Select, Switch, Upload } from "antd"; // Import Upload
import { CalenderIcon, DownArrowIcon, ForwardIcon, ImageIcon, SearchIcon, UpdateIcon } from "../../../assets/icons/icons";
// import ImgCrop from 'antd-img-crop'; // Consider adding ant-design-pro for image cropping if needed

const { Option } = Select;

const AddClientDrowar = ({ openDrowar, setOpenDrowar, setStep, step, fileList, setFileList, handleGenderChange, handleDateChange, handleCityChange, onSwitchChange, onImageChange, beforeUpload, customRequest }) => {

    return (
        <div>
            <Drawer
                placement={"bottom"}
                closable={false}
                title="Add client"
                extra={
                    <Button
                        type="text"
                        onClick={() => setOpenDrowar(false)}
                        className="!px-0"
                    >
                        <X size={24} className="text-description" />
                    </Button>
                }
                height="84%"
                onClose={() => {
                    setOpenDrowar(false)
                    setStep(1);
                    setFileList([]);
                }}
                open={openDrowar}
                className="rounded-t-xl"
            >
                {
                    step === 1 ?
                        <div className="text-[#3A3B3F] flex flex-col justify-between h-full px-3">
                            <div className="space-y-3 mt-4 add-client-modal pb-[150px]">
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

                                <div className="grid grid-cols-2 gap-3 mt-4">
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
                        </div> :
                        <div className="text-[#3A3B3F] flex flex-col justify-between h-full px-3">
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
                        </div>
                }
                {/* <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center fixed bottom-0 w-full">
                    <button
                        onClick={() => {
                            setOpenDrowar(false)
                        }}
                        className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md"
                    >
                        Apply
                    </button>
                </div> */}

                {
                    step === 1 ? <>
                        <div className="fixed bottom-0 w-full flex flex-col gap-3 items-center justify-between bg-white pb-10 pt-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-1">
                                <p className="text-[#262626]">Basic information</p>
                                <ForwardIcon />
                                <p className="text-[#888]">Provider notes</p>
                            </div>
                            <div className='w-[95%]'>
                                <button type="button" onClick={() => setStep(2)} className="w-full text-white font-semibold bg-black py-2 md:w-24 rounded-lg cursor-pointer">Next</button>
                            </div>

                        </div>
                    </> : <>
                        <div className="fixed bottom-0 w-full flex flex-col gap-3 items-center justify-between bg-white pb-10 pt-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center gap-1">
                                <p className="text-[#888]">Basic information</p>
                                <ForwardIcon />
                                <p className="text-[#262626]">Provider notes</p>
                            </div>
                            {/* Changed type to button for both for consistency */}
                            <div className="flex items-center gap-3 w-full px-4">
                                <button type="button" className="w-1/2 text-[#242528] font-semibold border border-[#242528] py-2 md:w-24 rounded-lg cursor-pointer" onClick={() => setStep(1)}>Previous</button>
                                <button type="button" className="w-1/2 text-white font-semibold bg-[#242528] py-2 md:w-24 rounded-lg cursor-pointer">Finish</button>
                            </div>
                        </div>
                    </>
                }
            </Drawer>
            <style>
                {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
            </style>
        </div>
    );
};

export default AddClientDrowar;