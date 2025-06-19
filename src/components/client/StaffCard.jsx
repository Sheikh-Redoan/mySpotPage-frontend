import { Avatar } from "antd";

import { User } from "lucide-react";
import { cn } from "../../lib/utils";

export default function StaffCard({
  isActive = false,
  handleSelect,
  name,
  designation,
  picture,
}) {
  return (
    <div
      className={cn("flex items-center gap-4 flex-row lg:flex-col border border-[#E7E7E7] rounded-xl w-full py-4 relative px-4 cursor-pointer", { "border border-primary01 bg-[#F5F4FE]": isActive,})}
      onClick={handleSelect}
      >
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<User size={48} strokeWidth={1.25} />}
        src={picture}
        className="flex-shrink-0 min-w-10 min-h-10"
      />
      <div className="text-start lg:text-center">
        <h3 className="lg:text-lg font-semibold">{name}</h3>
        <p className="text-sm text-description">{designation}</p>
      </div>
      <span
        className={cn(
          "absolute top-1/3 lg:top-2 right-2 w-6 h-6 rounded-full ",
          isActive ? "border-primary01 border-1" : "border-[#E7E7E7] border-3"
        )}>
        <span
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full",
            isActive && "bg-primary01"
          )}
        />
      </span>
    </div>
  );
}
