import { ListFilter } from "lucide-react";
import { useState } from "react";
import UserFilter from "../../components/admin/UserFilter";
import Filter from "../../components/shared/Filter";
import Popup from "../../components/shared/Popup";
import Search from "../../components/shared/Search";

export default function UserManagement() {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full p-5">
      <div className="flex w-full gap-4 mb-4">
        <div className="relative w-[300px]">
          <Search name="search" placeholder="Search by name, or phone number" />
        </div>
        <div className="w-[200px]">
          <Filter
            name="city"
            data={categories}
            defaultValue="All cities"
            search={true}
          />
        </div>
        <div className="w-[200px]">
          <Popup
            name="Filter"
            icon={<ListFilter size={20} className="text-gray-400" />}>
            {(handlePopup) => <UserFilter closePopup={handlePopup} />}
          </Popup>
        </div>
      </div>
    </div>
  );
}

const categories = [
  "All category",
  "Nails",
  "Hair & Barber",
  "Makeup",
  "Waxing",
  "Tanning",
  "Massage",
  "Skincare",
  "Spas & Wellness",
  "Fitness",
  "Tattoo & Piercing",
  "Teeth White",
  "Holistic",
];
