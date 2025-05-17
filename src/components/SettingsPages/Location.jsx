import { Checkbox, ConfigProvider, Switch, TimePicker } from "antd";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  MoveUpRight,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { AlertIcon, SearchIcon } from "../../assets/icons/icons2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { imageProvider } from "../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { collapseVariants } from "../../animations/variants";
import LocationDropdown from "../ui/LocationDropdown";
dayjs.extend(customParseFormat);
const format = "hh:mm A";
const onChange = (e) => {
  console.log("checked =", e.target.checked);
};
const cityOptions = [
  {
    value: "Afula",
    label: "Afula",
  },
  {
    value: "Alfei Menashe",
    label: "Alfei Menashe",
  },
  {
    value: "Ashkelon",
    label: "Ashkelon",
  },
  {
    value: "Baqa al-Gharbiyye",
    label: "Baqa al-Gharbiyye",
  },
  {
    value: "Beit Shemesh",
    label: "Beit Shemesh",
  },
  {
    value: "Beit Shemesh",
    label: "Beit Shemesh",
  },
  {
    value: "Dimona",
    label: "Dimona",
  },
  {
    value: "Baqa al-Gharbiyye",
    label: "Baqa al-Gharbiyye",
  },
  {
    value: "Even Yehuda",
    label: "Even Yehuda",
  },
  {
    value: "Hod HaSharon",
    label: "Hod HaSharon",
  },
];

const Location = () => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [fixedModalOpen, setFixedModalOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [regionalDropdown, setRegionalDropdown] = useState(false);
  const [regionalModal, setRegionalModal] = useState(false);

  const onChanges = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) setMobileModalOpen(true);
  };

  const cityCheckboxChange = (e) => {
    setCityDropdown(e.target.checked);
  };
  const regionalCheckboxChange = (e) => {
    setRegionalDropdown(e.target.checked);
  };

  const handleChange = (value) => {
    console.log("Selected:", value);
  };
  return (
    <div className="min-h-full">
      <div className="p-6 rounded-md mt-4 bg-[#FFFFFF] ">
        <div className="xl:flex justify-between items-start my-2">
          <div>
            <h2 className="text-xl text-[#242528] font-semibold">
              Fixed Location Services
            </h2>
            <p className="text-[#797979] mt-1 text-sm">
              Your service is based at a specific location. Ensure your address
              settings are correct for customers to find you easily.
            </p>
          </div>

          <div
            onClick={() => setFixedModalOpen(true)}
            className="flex items-center gap-2 border border-[#744CDB] rounded-lg px-4 py-2 text-[#744CDB] text-sm sm:text-base font-semibold hover:underline mt-3 xl:mt-0 whitespace-nowrap w-fit hover:scale-95 transform transition-all duration-300 ease-in-out"
          >
            <Plus size={20} /> Add Location
          </div>
        </div>
        <hr className="my-6 text-[#F6F6F6]" />

        <div className="flex items-start gap-5">
          <div>
            <Switch defaultChecked onChange={onChanges} />
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="text-[#242528] font-semibold text-base md:text-lg">
              Mobile Service
            </h4>
            <p className="text-[#797979] my-2 text-sm">
              Your mobile service is currently inactive. Please enable it to
              offer on-location services to your clients.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Modal */}
      {fixedModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl h-[750px] overflow-y-auto">
            {/* Header */}

            <h3 className="text-xl font-semibold text-[#242528] py-6 px-6">
              Fixed Service Location
            </h3>
            <hr className="pt-4 text-[#E5E7E8]" />
            <div className="py-6 px-6">
              {/* Location name */}
              <div className="">
                <label className="block mb-2 text-[#3A3B3F]">
                  Location Name <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                  placeholder='e.g., "Downtown Spa", "Uptown Salon"'
                  required
                />
              </div>
              {/* Address */}
              <div className="relative my-4">
                <label className="block mb-2 text-[#3A3B3F]">
                  Address <span className="text-orange-600">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                  placeholder="Search address"
                  required
                />
                <div className="pointer absolute inset-y-0 top-8 right-3 flex items-center text-[#888888] hover:scale-90 transform transition-all duration-300 ease-in-out">
                  <SearchIcon />
                </div>
              </div>
              {/* Toggle */}
              <div className="flex items-center gap-3 my-4">
                <div>
                  <Switch defaultChecked onChange={onChange} />
                </div>
                <p className="text-[#262626]">
                  Show full address only after booking
                </p>
              </div>

              {/* Payment */}
              <div className="my-4">
                <label className="block mb-2 text-[#3A3B3F]">
                  Payment requirements
                </label>
                <input
                  type="text"
                  className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                  placeholder="Payment requirements"
                  required
                />
              </div>
              {/* deposit */}
              <div className="my-4">
                <label className="mb-2 text-[#3A3B3F] flex items-center gap-1">
                  Deposit policy message{" "}
                  <AlertIcon className="hover:text-[#866BE7]" />
                </label>
                <input
                  type="text"
                  className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                  placeholder="Message"
                  required
                />
              </div>

              {/* Booking availability */}
              <div className="my-4">
                <div className="flex justify-between items-center pt-3">
                  <h2>
                    Booking availability{" "}
                    <span className="text-orange-600">*</span>
                  </h2>
                  <h2 className="text-[#82868E] ml-12">Opening</h2>
                  <h2 className="text-[#82868E] mr-12">Closed</h2>
                </div>

                <div className="py-4">
                  {/* Sunday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Sunday
                    </Checkbox>
                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Monday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Monday
                    </Checkbox>

                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Tuesday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Tuesday
                    </Checkbox>

                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Wednesday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Wednesday
                    </Checkbox>
                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Thursday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Thursday
                    </Checkbox>
                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Friday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Friday
                    </Checkbox>
                    <div className="flex gap-8 my-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p className="text-[#5d5f67]">-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>
                  </div>

                  {/* Saturday */}
                  <div className="flex justify-between items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Saturday
                    </Checkbox>
                    <div className="my-2">
                      <button className="py-2.5 pr-4 rounded-lg text-center bg-[#F5F6F6] min-w-[382px] text-[#82868E] hover:scale-95 transform transition-all ease-in-out duration-300">
                        Closed
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-6">
                <button
                  onClick={() => setFixedModalOpen(false)}
                  className="text-[#242528] hover:scale-95 transform transition-all ease-in-out duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setFixedModalOpen(false)}
                  className="bg-[#242528] text-[#FFF]  py-2 px-3 rounded-lg  hover:scale-95 transform transition-all ease-in-out duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Modal */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl h-[750px] overflow-y-auto">
            {/* Header */}

            <h3 className="text-xl font-semibold text-[#242528] py-6 px-6">
              Fixed Service Location
            </h3>
            <hr className="pt-4 text-[#E5E7E8]" />
            <div className="py-6 px-6">
              {/* Toggle */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Switch defaultChecked onChange={onChange} />
                  <p className="text-[#262626]">Charge travel fees</p>
                </div>
                <div className="flex items-center justify-between w-[120px] border border-[#E5E7E8] rounded-lg px-4 py-2.5">
                  <p>50</p>
                  <img src={imageProvider.dollor} alt="icon" />
                </div>
              </div>
              {/* Payment */}
              <div className="border p-5 rounded-lg border-[#E5E7E8] my-3">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => setPaymentOpen(!paymentOpen)}
                >
                  <h4 className="text-[#262626] text-lg font-semibold">
                    Payment <span className="text-orange-600">*</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    {paymentOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {paymentOpen && (
                    <motion.div
                      key="payment-content"
                      variants={collapseVariants()}
                      initial="hidden"
                      animate="visible"
                      className="mt-4"
                      exit="exit"
                    >
                      {/* Payment Input */}
                      <div className="my-4">
                        <label className="block mb-2 text-[#3A3B3F]">
                          Payment requirements
                        </label>
                        <input
                          type="text"
                          className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                          placeholder="Payment requirements"
                          required
                        />
                      </div>

                      {/* Deposit Input */}
                      <div className="my-4">
                        <label className="mb-2 text-[#3A3B3F] flex items-center gap-1">
                          Deposit policy message{" "}
                          <AlertIcon className="hover:text-[#866BE7]" />
                        </label>
                        <input
                          type="text"
                          className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                          placeholder="Message"
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Service area type  */}
              <div className="border p-5 rounded-lg border-[#E5E7E8] my-3">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => setServiceModalOpen(!serviceModalOpen)}
                >
                  <h4 className="text-[#262626] text-lg font-semibold">
                    Service area type <span className="text-orange-600">*</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    {serviceModalOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {serviceModalOpen && (
                    <motion.div
                      key="service-area"
                      variants={collapseVariants()}
                      initial="hidden"
                      animate="visible"
                      className="my-4"
                      exit="exit"
                      custom={0}
                    >
                      {/* Multiple Citys */}
                      <div className="my-4 relative">
                        <label className="flex items-center gap-2 mb-3 text-[#4F4F4F]">
                          <Checkbox
                            className="custom-checkbox1"
                            onChange={cityCheckboxChange}
                            checked={cityDropdown}
                          />
                          Multiple cities
                        </label>
                        {cityDropdown && (
                          <div className="ml-7">
                            <ConfigProvider
                              theme={{
                                token: {
                                  colorPrimary: "#8B5CF6",
                                  borderRadius: 8,
                                },
                                components: {
                                  Select: {
                                    controlHeight: 38,
                                  },
                                },
                              }}
                            >
                              <LocationDropdown
                                options={cityOptions}
                                placeholder="Search"
                                onChange={handleChange}
                              />
                            </ConfigProvider>
                          </div>
                        )}
                      </div>
                      {/* Regional selection */}
                      <div className="my-4">
                        <label className="flex items-center gap-2 mb-2 text-[#4F4F4F]">
                          <Checkbox
                            className="custom-checkbox1"
                            onChange={regionalCheckboxChange}
                            checked={regionalDropdown}
                          />
                          Regional selection
                        </label>
                        <p className="my-2 pl-7 text-[#888888] text-sm">
                          Selecting a district will automatically include all
                          its cities, but you can adjust them by clicking the ↗
                          to view details.
                        </p>
                        {regionalDropdown && (
                          <div className="pl-7 my-6 space-y-3.5">
                            {[
                              "Northern District (Mehoz HaTzafon)",
                              "Haifa District (Mehoz Heifa)",
                              "Central District (Mehoz HaMerkaz)",
                              "Jerusalem District (Mehoz Yerushalayim)",
                              "Tel Aviv District (Mehoz Tel Aviv)",
                              "Southern District (Mehoz HaDarom)",
                            ].map((district) => (
                              <div
                                key={district}
                                className="flex justify-between items-center"
                              >
                                <Checkbox
                                  onClick={() => setRegionalModal(true)}
                                  onChange={onChange}
                                  className="text-[#262626]"
                                >
                                  {district}
                                </Checkbox>
                                <ArrowUpRight
                                  onClick={() => setRegionalModal(true)}
                                  className="text-[#888888] hover:text-[#744CDB] hover:font-semibold"
                                  size={18}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Offer service */}
                      <div className="my-4">
                        <label className="flex items-center gap-2 mb-2 text-[#4F4F4F]">
                          <Checkbox
                            className="custom-checkbox1"
                            onChange={onChange}
                          />
                          I offer services across the entire country
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Booking availability */}
              <div className="border p-5 rounded-lg border-[#E5E7E8] my-3">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => setBookingModalOpen(!bookingModalOpen)}
                >
                  <h2 className="text-[#262626] text-lg font-semibold">
                    Booking availability{" "}
                    <span className="text-orange-600">*</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    {bookingModalOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {bookingModalOpen && (
                    <motion.div
                      key="booking-content"
                      variants={collapseVariants()}
                      initial="hidden"
                      animate="visible"
                      className="my-4"
                      exit="exit"
                      custom={0}
                    >
                      <div className="flex justify-between items-center pt-3">
                        <h2>Date</h2>
                        <h2 className="text-[#82868E] ml-12">Opening</h2>
                        <h2 className="text-[#82868E] mr-12">Closed</h2>
                      </div>
                      <div className="py-4">
                        {/* Sunday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Sunday
                          </Checkbox>
                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p>-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Monday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Monday
                          </Checkbox>

                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p>-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Tuesday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Tuesday
                          </Checkbox>

                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p>-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Wednesday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Wednesday
                          </Checkbox>
                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p>-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Thursday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Thursday
                          </Checkbox>
                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p>-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Friday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Friday
                          </Checkbox>
                          <div className="flex gap-8 my-2">
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                            <p className="text-[#5d5f67]">-</p>
                            <TimePicker
                              defaultValue={dayjs("11:00 AM", format)}
                              format={format}
                              use12Hours
                              className="custom-time-picker"
                              suffixIcon={<Clock size={22} />}
                            />
                          </div>
                        </div>

                        {/* Saturday */}
                        <div className="flex justify-between items-center">
                          <Checkbox
                            onChange={onChange}
                            className="custom-checkbox"
                            style={{ fontSize: "16px" }}
                          >
                            Saturday
                          </Checkbox>
                          <div className="my-2">
                            <button className="py-2.5 pr-4 rounded-lg text-center bg-[#F5F6F6] min-w-[382px] text-[#82868E] hover:scale-95 transform transition-all ease-in-out duration-300">
                              Closed
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-end items-center gap-6">
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className="text-[#242528] hover:scale-95 transform transition-all ease-in-out duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className="bg-[#242528] text-[#FFF]  py-2 px-3 rounded-lg  hover:scale-95 transform transition-all ease-in-out duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  regional Modal */}
      {regionalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-md w-[90%] max-w-md relative">
            <button
              onClick={() => setRegionalModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">District Info</h2>
            <p></p>
            <p className="mt-2">More info about this district can go here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
