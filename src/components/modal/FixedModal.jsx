import { SearchIcon, AlertIcon } from "../../assets/icons/icons2";
import { Switch, Checkbox, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Clock } from "lucide-react";
dayjs.extend(customParseFormat);

const format = "hh:mm A";

const FixedModal = ({
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) {
    return null;
  }

  const onChange = (e) => {
    console.log("checked =", e.target.checked);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl h-[750px] flex flex-col">
        {/* Header */}
        <h3 className="text-xl font-semibold text-[#242528] py-6 px-6">
          Fixed location setup
        </h3>
        <hr className="pt-4 text-[#E5E7E8]" />
        <div className="py-6 px-6 flex-1 overflow-y-auto">
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
                Booking availability <span className="text-orange-600">*</span>
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
        </div>
        <div className="flex justify-end items-center gap-6 p-6">
          <button
            onClick={onClose}
            className="text-[#242528] hover:scale-95 transform transition-all ease-in-out duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-[#242528] text-[#FFF]  py-1.5 px-2.5 rounded-lg  hover:scale-95 transform transition-all ease-in-out duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedModal;
