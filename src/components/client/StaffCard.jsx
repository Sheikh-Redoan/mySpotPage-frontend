import { Avatar, Radio } from "antd";
import { User } from "lucide-react";
import { useState } from "react";

export default function StaffCard() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group value={value} onChange={onChange}>
      <div className="flex items-center gap-4 flex-col border border-[#E7E7E7] rounded-xl w-full py-4 relative">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<User size={48} strokeWidth={1.25} />}
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Any Staff</h3>
          <p className="text-sm text-description">
            Staff will be assigned later
          </p>
        </div>
      </div>
      <Radio value={1} className="absolute top-4 right-4" />
    </Radio.Group>
  );
}
