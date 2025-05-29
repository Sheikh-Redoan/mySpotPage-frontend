import Filter from "../../components/shared/Filter";
import Search from "../../components/shared/Search";

export default function UserManagement() {
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
          <Filter name="filter" data={categories} defaultValue="Filter" />
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
