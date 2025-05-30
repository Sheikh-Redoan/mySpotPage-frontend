import { ListFilter } from "lucide-react";
import UserCard from "../../components/admin/UserCard";
import UserFilter from "../../components/admin/UserFilter";
import Filter from "../../components/shared/Filter";
import Paginate from "../../components/shared/Paginate";
import Popup from "../../components/shared/Popup";
import Search from "../../components/shared/Search";

export default function UserManagement() {
  return (
    <div>
      <div className="flex w-full gap-4 mb-4 p-5">
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="fixed bottom-0 bg-white p-5 inset-x-0 pl-28">
        <div className="flex items-center justify-between w-full">
          <p className="space-x-2 text-sm">
            Show <span className="px-4 py-2 bg-gray-100 rounded-lg">10</span> /
            25 results per page
          </p>

          <Paginate total={500} current={4} />
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

const users = [
  {
    id: "#CLT-1007",
    name: "Liam Bennett",
    gender: "Male",
    plan: "Radiance Plan",
    businessName: "SharpEdge Barber Lounge",
    category: "Hair & Barber",
    description:
      "Modern barber lounge with premium fades, shaves, and grooming services.",
  },
  {
    id: "#CLT-1008",
    name: "Olivia Turner",
    gender: "Female",
    plan: "Glow Plan",
    businessName: "Elegance Skincare Studio",
    category: "Skincare",
    description:
      "Customized facials, anti-aging treatments, and holistic skincare solutions.",
  },
  {
    id: "#CLT-1009",
    name: "Ethan Hayes",
    gender: "Male",
    plan: "Bloom Plan",
    businessName: "The Wax Hub",
    category: "Waxing",
    description:
      "Men's grooming and waxing studio offering back, chest, and full-body waxing.",
  },
  {
    id: "#CLT-1010",
    name: "Isabella Moore",
    gender: "Female",
    plan: "Radiance Plan",
    businessName: "Nail Envy Boutique",
    category: "Nails",
    description:
      "Acrylics, gel polish, and creative nail art by certified technicians.",
  },
  {
    id: "#CLT-1011",
    name: "Noah Brooks",
    gender: "Male",
    plan: "Glow Plan",
    businessName: "Urban Fade Lab",
    category: "Hair & Barber",
    description: "Trendy fade and beard studio with a modern urban aesthetic.",
  },
  {
    id: "#CLT-1012",
    name: "Mia Collins",
    gender: "Female",
    plan: "Bloom Plan",
    businessName: "Brow & Beauty Lounge",
    category: "Lash & Brow",
    description:
      "Lash lifts, brow shaping, and tinting for a perfect everyday look.",
  },
  {
    id: "#CLT-1013",
    name: "James Allen",
    gender: "Male",
    plan: "Radiance Plan",
    businessName: "The Gentleman's Parlor",
    category: "Hair & Barber",
    description: "Classic cuts, hot towel shaves, and premium beard care.",
  },
  {
    id: "#CLT-1014",
    name: "Sophia Ramirez",
    gender: "Female",
    plan: "Glow Plan",
    businessName: "Radiant You Spa",
    category: "Massage",
    description:
      "Therapeutic massage, hot stone therapy, and stress relief sessions.",
  },
  {
    id: "#CLT-1015",
    name: "Jackson Lee",
    gender: "Male",
    plan: "Bloom Plan",
    businessName: "WaxCraft Studio",
    category: "Waxing",
    description:
      "High-end waxing services for all genders with sensitive-skin options.",
  },
  {
    id: "#CLT-1016",
    name: "Amelia Scott",
    gender: "Female",
    plan: "Radiance Plan",
    businessName: "Luxe Glow Makeup Bar",
    category: "Makeup",
    description:
      "Runway-ready makeup looks, bridal styling, and professional beauty sessions.",
  },
];
