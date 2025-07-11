import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  Modal,
  Switch,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Clock, X } from "lucide-react";
import { AlertIcon, SearchIcon } from "../../assets/icons/icons2";

dayjs.extend(customParseFormat);

const format = "hh:mm A";

const FixedLocationModal = ({ isOpen, onClose, onSave }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  console.log("screens", screens);

  const onChange = (e) => {
    console.log("checked =", e.target.checked);
  };

  if (screens.xs || (screens.sm && !screens.md && !screens.lg && !screens.xl)) {
    return (
      <>
        <Drawer
          placement={"bottom"}
          closable={false}
          height="90%"
          onClose={onClose}
          open={isOpen}
          className="rounded-t-xl"
          title="Fixed location setup"
          extra={
            <Button
              type="text"
              onClick={onClose}
              className="!px-0"
            >
              <X size={24} className="text-description" />
            </Button>
          }
        >
          <div className="flex-1 overflow-y-auto mt-5 p-3 pb-20">
            {/* Location name */}
            <div className="mb-4">
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
            <div className="relative mb-4">
              <label className="block mb-2 text-[#3A3B3F]">
                Address <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
                placeholder="Search address"
                required
              />
              <div className="absolute inset-y-0 top-8 right-3 flex items-center text-[#888888] hover:scale-90 transform transition-all duration-300 ease-in-out cursor-pointer">
                <SearchIcon />
              </div>
            </div>

            {/* Toggle Show Full Address */}
            <div className="flex items-center gap-1 md:gap-3 mb-4">
              <div>
                <Switch
                  defaultChecked
                  onChange={(checked) => console.log(checked)}
                  size={screens.sm ? "default" : "small"}
                />
              </div>
              <p className="text-[#262626] text-sm md:text-base">
                Show full address only after booking
              </p>
            </div>

            {/* Payment */}
            <div className="mb-4">
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
            {/* Deposit */}
            <div className="mb-4">
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
            <div className="mb-4">
              <div className="flex justify-between items-center pt-3">
                <h2 className="text-[16px] font-medium text-[#262626]">
                  Booking availability{" "}
                  <span className="text-orange-600">*</span>
                </h2>
                <h2 className="text-[#82868E] ml-12 hidden md:block">
                  Opening
                </h2>
                <h2 className="text-[#82868E] mr-12 hidden md:block">Closed</h2>
              </div>

              <div className="py-4">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <Checkbox
                      onChange={onChange}
                      className="custom-checkbox"
                      style={{ fontSize: "16px" }}>
                      {day}
                    </Checkbox>
                    {day !== "Saturday" && (<div className="flex gap-4 md:gap-8 items-center mt-2">
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker flex-1"
                        suffixIcon={<Clock size={22} />}
                      />
                      <p>-</p>
                      <TimePicker
                        defaultValue={dayjs("11:00 AM", format)}
                        format={format}
                        use12Hours
                        className="custom-time-picker flex-1"
                        suffixIcon={<Clock size={22} />}
                      />
                    </div>)}
                    {
                      day === "Saturday" && <div>
                        <button className="py-2.5 pr-4 rounded-lg text-center bg-[#F5F6F6] w-full md:min-w-[382px] text-[#82868E] hover:scale-95 transform transition-all ease-in-out duration-300 mt-2 md:mt-0">
                          Closed
                        </button>
                      </div>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-6 border-t-[1px] border-[#E5E7E8] p-3 fixed bottom-0 w-full bg-white pb-10 pt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Button
              type="primary"
              onClick={onSave}
              className="!px-3 !py-5 md:!py-2 !bg-[#242528] !text-white !rounded-md !ml-1 w-full md:w-fit">
              Save
            </Button>
          </div>
        </Drawer>

        <style>
          {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
        </style>
      </>
    );
  } else {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        closable={true}
        closeIcon={<X className="w-6 h-6" />}
        title={
          <h3 className="text-[#242528] text-[18px] font-semibold mb-5">
            Fixed location setup
          </h3>
        }
        className="!w-[90%] !max-w-3xl max-h-[80vh] !overflow-y-auto !rounded-xl"
        centered>
        <div className="flex-1 mt-5">
          {/* Location name */}
          <div className="mb-4">
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
          <div className="relative mb-4">
            <label className="block mb-2 text-[#3A3B3F]">
              Address <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              className="block w-full text-sm border border-[#E5E7E8] px-2 py-3 rounded-md"
              placeholder="Search address"
              required
            />
            <div className="absolute inset-y-0 top-8 right-3 flex items-center text-[#888888] hover:scale-90 transform transition-all duration-300 ease-in-out cursor-pointer">
              <SearchIcon />
            </div>
          </div>

          {/* Toggle Show Full Address */}
          <div className="flex items-center gap-1 md:gap-3 mb-4">
            <div>
              <Switch
                defaultChecked
                onChange={(checked) => console.log(checked)}
                size={screens.sm ? "default" : "small"}
              />
            </div>
            <p className="text-[#262626] text-sm md:text-base">
              Show full address only after booking
            </p>
          </div>

          {/* Payment */}
          <div className="mb-4">
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
          {/* Deposit */}
          <div className="mb-4">
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
          <div className="mb-4">
            <div className="flex justify-between items-center pt-3">
              <h2 className="text-[16px] font-medium text-[#262626]">
                Booking availability <span className="text-orange-600">*</span>
              </h2>
              <h2 className="text-[#82868E] ml-12 hidden md:block">Opening</h2>
              <h2 className="text-[#82868E] mr-12 hidden md:block">Closed</h2>
            </div>

            <div className="py-4">
              {/* Sunday */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <Checkbox
                  onChange={onChange}
                  className="custom-checkbox"
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
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
                  style={{ fontSize: "16px" }}>
                  Saturday
                </Checkbox>
                <div>
                  <button className="py-2.5 pr-4 rounded-lg text-center bg-[#F5F6F6] w-full md:min-w-[382px] text-[#82868E] hover:scale-95 transform transition-all ease-in-out duration-300 mt-2 md:mt-0">
                    Closed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-6 md:p-6 border-t-[1px] border-[#E5E7E8] pt-4">
          <Button
            type="default"
            onClick={onClose}
            className="!text-[#242528] !border-none !bg-transparent hover:!bg-gray-100 !hidden md:!block">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onSave}
            className="!px-3 !py-5 md:!py-2 !bg-[#242528] !text-white !rounded-md !ml-1 w-full md:w-fit">
            Save
          </Button>
        </div>
      </Modal>
    );
  }
};

export default FixedLocationModal;
