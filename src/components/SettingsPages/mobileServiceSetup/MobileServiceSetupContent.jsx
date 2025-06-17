import {
  Checkbox,
  ConfigProvider,
  Switch,
  TimePicker
} from "antd";
import dayjs from "dayjs";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  X
} from "lucide-react";
import { useState } from "react";
import { AlertIcon } from "../../../assets/icons/icons2";
import { imageProvider } from "../../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { Grid } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { collapseVariants } from "../../../animations/variants";
import LocationDropdown from "../../ui/LocationDropdown";

const format = "hh:mm A";

export const MobileServiceSetupContent = ({
  setMobileModalOpen,
  isOpen,
  onClose,
  setSelectedDistrict,
  selectedCities,
  setOpenCitySelectionModal,
  cityOptions
}) => {
  const [paymentOpen, setPaymentOpen] = useState(true);
  const [serviceModalOpen, setServiceModalOpen] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [regionalDropdown, setRegionalDropdown] = useState(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onChange = (e) => {
    console.log("checked =", e.target.checked);
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
    <>
      <div className="flex justify-between items-center p-3 shadow">
        <p className="text-lg font-semibold">Mobile service setup</p>
        <buttn className="hover:scale-105" onClick={onClose}>
          <X />
        </buttn>
      </div>

      <hr className="pt-4 text-[#E5E7E8]" />
      <div className="py-6 px-6 flex-1 overflow-y-auto">
        {/* Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 md:gap-3">
            <Switch
              defaultChecked
              onChange={onChange}
              size={screens.sm ? "default" : "small"}
            />
            <p className="text-[#262626] ">Charge travel fees</p>
          </div>
          <div className="flex items-center justify-between w-14 md:w-[120px] border border-[#E5E7E8] rounded-lg px-2 md:px-4 py-1 md:py-2.5">
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
                          placeholder="Select"
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
                    Selecting a district will automatically include all its
                    cities, but you can adjust them by clicking the ↗ to view
                    details.
                  </p>
                  <AnimatePresence initial={false}>
                    {regionalDropdown && (
                      <motion.div
                        key="regional-area"
                        variants={collapseVariants()}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={0}
                        className="pl-7 my-6 space-y-3.5"
                      >
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
                            className="flex justify-between items-start"
                          >
                            <div>
                              <Checkbox
                                checked={selectedCities[district]?.length > 0}
                                onClick={() => {
                                  setSelectedDistrict(district);
                                  setOpenCitySelectionModal(true);
                                }}
                                className="text-[#262626]"
                              >
                                {district}
                              </Checkbox>
                              <div className="flex flex-wrap ml-4 items-center gap-2 my-2">
                                {selectedCities[district]?.length > 0 &&
                                  selectedCities[district].map(
                                    (city, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2 text-[#866BE7] rounded-full px-3 py-1 text-sm bg-[#ECEBFC]"
                                      >
                                        {city}
                                        <X
                                          onClick={() => handleCityChange(city)}
                                          size={16}
                                          className="text-[#C3BCF6] hover:scale-110 hover:font-medium"
                                        />
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>

                            <ArrowUpRight
                              onClick={() => {
                                setSelectedDistrict(district);
                                setOpenCitySelectionModal(true);
                              }}
                              className="text-[#888888] hover:text-[#744CDB] hover:font-semibold"
                              size={20}
                            />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              Booking availability <span className="text-orange-600">*</span>
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
                <div className="hidden md:block">
                  <div className="flex justify-between items-center pt-3">
                    <h2>Date</h2>
                    <h2 className="text-[#82868E] ml-12">Opening</h2>
                    <h2 className="text-[#82868E] mr-12">Closed</h2>
                  </div>
                </div>
                <div className="py-4">
                  {/* Sunday */}
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Sunday
                    </Checkbox>
                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Monday
                    </Checkbox>

                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Tuesday
                    </Checkbox>

                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Wednesday
                    </Checkbox>
                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Thursday
                    </Checkbox>
                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Friday
                    </Checkbox>
                    <div className="flex gap-4 md:gap-8 items-center mt-2">
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
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}
                    >
                      Saturday
                    </Checkbox>
                    <div className="my-2">
                      <button className="py-2.5 pr-4 rounded-lg text-center bg-[#F5F6F6] w-full md:min-w-[382px] text-[#82868E] hover:scale-95 transform transition-all ease-in-out duration-300">
                        Closed
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-end items-center gap-6 p-6">
        <button
          onClick={() => setMobileModalOpen(false)}
          className="text-[#242528] hover:scale-95 transform transition-all ease-in-out duration-300 hidden md:block"
        >
          Cancel
        </button>
        <button
          onClick={() => setMobileModalOpen(false)}
          className="bg-[#242528] text-[#FFF]  py-2 px-3 rounded-lg  hover:scale-95 transform transition-all ease-in-out duration-300 w-full md:w-fit"
        >
          Save
        </button>
      </div>
    </>
  );
};
