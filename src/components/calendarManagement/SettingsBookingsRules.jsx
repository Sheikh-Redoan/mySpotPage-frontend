import { Input } from "antd";
import { Switch } from "antd";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

const SettingsBookingsRules = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <h3 className="text-[#242528] text-[18px] font-semibold">Settings</h3>
      <div className="h-[1px] bg-[#E5E7E8] my-4" />

      <div className="space-y-4">
        <h6 className="text-primary01 text-[14px] font-semibold">
          Advance Booking Limits
        </h6>

        <div className="flex items-cente gap-4 w-full">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-[#3A3B3F] text-[14px] font-normal flex items-center gap-1">
              Minimum period{" "}
              <CircleAlert
                size={16}
                className="text-primary01"
                title="Define how far in advance clients can book."
              />{" "}
              <sup className="text-red-600">*</sup>
            </label>
            <Input type="number" placeholder="Enter Hours" className="w-full" />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-[#3A3B3F] text-[14px] font-normal">
              Maximum period <sup className="text-red-600">*</sup>
            </label>
            <Input type="number" placeholder="Enter Days" className="w-full" />
          </div>
        </div>

        <h6 className="text-primary01 text-[14px] font-semibold">
          Booking Confirmation Mode
        </h6>

        <div className="space-x-2">
          <label className="text-[#242528] text-[14px] font-normal">
            {checked ? "Manual confirmation" : "Auto confirmation"}
          </label>
          <Switch
            onChange={(checked) => setChecked(checked)}
            checked={checked}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsBookingsRules;
