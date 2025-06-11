import { Button, Checkbox, ConfigProvider, Switch, TimePicker } from "antd";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  AlertIcon,
  EditIcon,
  NotificationIcon,
} from "../../assets/icons/icons2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { imageProvider } from "../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { collapseVariants } from "../../animations/variants";
import LocationDropdown from "../ui/LocationDropdown";
import FixedModal from "../modal/FixedModal";
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

const SoloLocation = () => {
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [mobileServiceEnabled, setMobileServiceEnabled] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(true);
  const [serviceModalOpen, setServiceModalOpen] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [fixedModalOpen, setFixedModalOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [regionalDropdown, setRegionalDropdown] = useState(false);
  const [regionalModal, setRegionalModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCities, setSelectedCities] = useState({});
  const [deleteLocationModal, setDeleteLocationModal] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCities((prev) => {
      const district = selectedDistrict;

      const current = prev[district] || [];

      const updated = current.includes(city)
        ? current.filter((c) => c !== city)
        : [...current, city];

      return {
        ...prev,
        [district]: updated,
      };
    });
  };

  const onChanges = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked) setMobileModalOpen(true);
  };

  const handleSwitchChange = (checked) => {
    setMobileServiceEnabled(checked);
    onChanges?.(checked);
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
      <div className="p-6 rounded-md mt-4 bg-[#FFFFFF]">
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

          <Button
            onClick={() => setFixedModalOpen(true)}
            className="!text-primary01 !border-primary01"
          >
            <Plus size={20} /> Add Location
          </Button>
        </div>
        <hr className="my-6 text-[#F6F6F6]" />

        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-5">
            <div>
              <Switch defaultChecked onChange={onChange} />
            </div>
            <div className="flex flex-col justify-start">
              <h4 className="text-[#242528] font-semibold text-base md:text-lg">
                TCL Beauty Studio 01{" "}
                <span className="text-[#866BE7] bg-[#F5F4FE] ml-2 p-1 rounded text-sm">
                  Hidden
                </span>
              </h4>
              <p className="text-[#797979] my-2 text-sm">
                15 Rothschild Boulevard, Tel Aviv-Yafo, Israel
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <img src={imageProvider.edit} alt="Edit Icon" />
            <img
              onClick={() => setDeleteLocationModal(true)}
              src={imageProvider.deleteIcon}
              alt="Delete Icon"
            />
          </div>
          {/* Show on small screens */}
          <div className="block md:hidden relative">
            <button
              className="text-3xl"
              onClick={() => setShowMenu1(!showMenu1)}
            >
              ⋯
            </button>
            {showMenu1 && (
              <div className="absolute  bg-gray-200 rounded z-10 w-10 h-14 p-2 pl-3 mr-3 shadow-md">
                <img
                  className="pb-2"
                  src={imageProvider.edit}
                  alt="Edit Icon"
                />
                <img src={imageProvider.deleteIcon} alt="Delete Icon" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start my-4">
          <div className="flex items-start gap-5">
            <div>
              <Switch defaultChecked={false} onChange={onChange} />
            </div>
            <div className="flex flex-col justify-start">
              <h4 className="text-[#242528] font-semibold text-base md:text-lg">
                TCL Beauty Studio 01
              </h4>
              <p className="text-[#797979] my-2 text-sm">
                15 Rothschild Boulevard, Tel Aviv-Yafo, Israel
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <img src={imageProvider.edit} alt="Edit Icon" />
            <img
              onClick={() => setDeleteLocationModal(true)}
              src={imageProvider.deleteIcon}
              alt="Delete Icon"
            />
          </div>
          {/* Show on small screens */}
          <div className="block md:hidden relative">
            <button
              className="text-3xl"
              onClick={() => setShowMenu2(!showMenu2)}
            >
              ⋯
            </button>
            {showMenu1 && (
              <div className="absolute  bg-gray-200 rounded z-10 w-10 h-14 p-2 pl-3 mr-3 shadow-md">
                <img
                  className="pb-2"
                  src={imageProvider.edit}
                  alt="Edit Icon"
                />
                <img src={imageProvider.deleteIcon} alt="Delete Icon" />
              </div>
            )}
          </div>
        </div>
        <hr className="my-6 text-[#F6F6F6]" />
        <div className="flex items-start justify-between">
          <div className="flex gap-5">
            <Switch
              checked={mobileServiceEnabled}
              onChange={handleSwitchChange}
              style={{
                marginTop: "3px",
              }}
            />

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
          {mobileServiceEnabled && (
            <div className="pr-5">
              <EditIcon />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Modal */}
      {fixedModalOpen && (
        <FixedModal
          isOpen={fixedModalOpen}
          onClose={() => setFixedModalOpen(false)}
          onSave={() => setFixedModalOpen(false)}
        />
      )}

      {/* Mobile Modal */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl h-[750px] flex flex-col">
            {/* Header */}
            <h3 className="text-xl font-semibold text-[#242528] py-6 px-6">
              Mobile service setup
            </h3>
            <hr className="pt-4 text-[#E5E7E8]" />
            <div className="py-6 px-6 flex-1 overflow-y-auto">
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
                                      checked={
                                        selectedCities[district]?.length > 0
                                      }
                                      onClick={() => {
                                        setSelectedDistrict(district);
                                        setRegionalModal(true);
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
                                                onClick={() =>
                                                  handleCityChange(city)
                                                }
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
                                      setRegionalModal(true);
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
            </div>
            <div className="flex justify-end items-center gap-6 p-6">
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
      )}

      {/*  regional Modal */}
      {regionalModal && (
        <div className="fixed inset-0 bg-[#111113cc] flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-md w-[90%] min-h-md max-w-lg relative">
            <div className="flex items-center gap-3 my-2 p-6">
              <ArrowLeft onClick={() => setRegionalModal(false)} />
              <p className="text-[#262626] font-semibold">{selectedDistrict}</p>
            </div>
            <hr className="text-[#E5E7E8]" />
            <h2 className="text-sm my-4 px-6 text-[#797979]">
              All cities within the district:
            </h2>
            <div className="px-6 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Checkbox onChange={() => handleCityChange("All cities")}>
                All cities
              </Checkbox>
              <Checkbox onChange={() => handleCityChange("Karmiel")}>
                Karmiel
              </Checkbox>
              <Checkbox onChange={() => handleCityChange("Migdal HaEmek")}>
                Migdal HaEmek
              </Checkbox>
              <Checkbox onChange={() => handleCityChange("Nazareth (Nazerat)")}>
                Nazareth (Nazerat)
              </Checkbox>
              <div className="flex gap-2 items-center">
                <Checkbox
                  onChange={() => handleCityChange("Ma'alot-Tarshiha")}
                />
                <p className="text-sm">Ma'alot-Tarshiha</p>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox onChange={() => handleCityChange("Yokneam Illit")} />
                <p className="text-sm">Yokneam Illit</p>
              </div>

              <Checkbox onChange={() => handleCityChange("Sakhnin")}>
                Sakhnin
              </Checkbox>
              <Checkbox onChange={() => handleCityChange("Acre (Akko)")}>
                Acre (Akko)
              </Checkbox>
              <Checkbox onChange={() => handleCityChange("Kiryat Shmona")}>
                Kiryat Shmona
              </Checkbox>
            </div>

            <div className="flex justify-end items-center gap-6 px-6 py-3">
              <button
                onClick={() => setRegionalModal(false)}
                className="text-[#242528] text-sm hover:scale-95 transform transition-all ease-in-out duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setRegionalModal(false)}
                className="bg-[#242528] text-[#FFF] text-sm  py-2 px-3 rounded-lg  hover:scale-95 transform transition-all ease-in-out duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* delete location modal */}
      {deleteLocationModal && (
        <div className="fixed inset-0 bg-[#111113cc] flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-md max-w-[90%] w-[430px] h-[328px]">
            <h2 className="p-6 text-[#242528] font-semibold">Notifications</h2>
            <hr className="text-[#E5E7E8] pb -3" />

            <div className="flex justify-center items-center text-center p-6">
              <div>
                <div className="flex justify-center items-center my-2 rounded-full h-[40px] w-[40px] bg-[#FBD9DA] mx-auto">
                  <NotificationIcon className="h-5 w-5" />
                </div>

                <h2 className="text-[#262626] font-semibold my-1">
                  Location Deleted Permanently
                </h2>
                <p className="text-[#797979] my-1 text-sm pb-4">
                  This location and all associated data will be permanently
                  removed. This action cannot be undone.
                </p>
                <div className="flex justify-between items-center mt-6 pb-2">
                  <button
                    onClick={() => setDeleteLocationModal(false)}
                    className="w-[180px] h-[40px] border border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDeleteLocationModal(false)}
                    className="w-[180px] h-[40px] bg-[#ED4245] text-white rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoloLocation;
