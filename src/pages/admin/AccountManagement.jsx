import { Button } from "antd";
import { Settings } from "lucide-react";
import AddAccount from "../../components/admin/AddAccount";
import MultipleSelector from "../../components/shared/MultipleSelector";
import Search from "../../components/shared/Search";
import RoleCard from "../../components/admin/RoleCard";

export default function AccountManagement() {
  return (
    <section>
      <div className="flex w-full gap-4 mb-4 p-5 justify-between">
        <div className="flex gap-4">
          <div className="relative w-[300px]">
            <Search
              name="search"
              placeholder="Search by name, or phone number"
            />
          </div>
          <div className="w-[200px]">
            <MultipleSelector
              name="role"
              data={roles}
              defaultValue="All roles"
              search={false}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <AddAccount />
          <Button type="default" className="flex items-center" size="large">
            <Settings size={16} /> Settings
          </Button>
        </div>
      </div>

      <div className="mb-4 p-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <RoleCard key={user.name} user={user} />
        ))}
      </div>
    </section>
  );
}

// Available role options
const roles = ["All roles", "Super Admin", "Admin"];

const users = [
  {
    name: "John Doe",
    role: "Super Admin",
    phone: "+1 987 654 321",
    joinedDate: "01/01/2025",
  },
  {
    name: "Jane Smith",
    role: "Admin",
    phone: "+44 7912 345678",
    joinedDate: "01/01/2025",
  },
  {
    name: "Alice Brown",
    role: "Admin",
    phone: "+33 601 234 567",
    joinedDate: "01/01/2025",
  },
  {
    name: "Michael Green",
    role: "Admin",
    phone: "+49 171 567 890",
    joinedDate: "01/01/2025",
  },
  {
    name: "Sarah White",
    role: "Admin",
    phone: "+61 412 345 678",
    joinedDate: "01/01/2025",
  },
  {
    name: "David Black",
    role: "Super Admin",
    phone: "+1 305 789 4561",
    joinedDate: "01/01/2025",
  },
  {
    name: "Emma Wilson",
    role: "Admin",
    phone: "+34 657 890 123",
    joinedDate: "01/01/2025",
  },
  {
    name: "Robert Miller",
    role: "Admin",
    phone: "+55 219 876 543",
    joinedDate: "01/01/2025",
  },
  {
    name: "Olivia Taylor",
    role: "Admin",
    phone: "+81 901 234 567",
    joinedDate: "01/01/2025",
  },
];
