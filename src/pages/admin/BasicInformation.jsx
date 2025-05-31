import { Avatar, Space } from "antd";
import { Cake, Mars, Phone, Venus } from "lucide-react";
import { useParams } from "react-router";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";

export default function BasicInformation() {
  const { name } = useParams();
  console.log(name);

  const genders = {
    Male: <Mars strokeWidth={1.8} size={24} className="text-primary01" />,
    Female: <Venus strokeWidth={1.8} size={24} className="text-primary01" />,
  };

  return (
    <div>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "User Management",
            link: "/user-management",
          },
          {
            name: name.split("-").join(" "),
            link: `/user-management${name}`,
          },
          {
            name: "Business Information",
            link: `/user-management/${name}/business-information`,
          },
        ])}
      />

      <div className="flex gap-1 bg-white p-8 rounded-xl justify-between items-start border border-gray-200">
        <Space>
          <Avatar size={60} src="https://joeschmoe.io/api/v1/random" />
          <div className="mr-4">
            <div className="flex items-center gap-1 text-start">
              <h4 className="text-lg font-semibold">{name}</h4>
              <span>{genders["Male"]}</span>
            </div>
            <p className="text-sm font-normal text-description">#CLT-1001</p>
          </div>
        </Space>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Phone strokeWidth={1.5} size={16} className="text-primary01" />{" "}
            <span>+91 9876543210</span>
          </div>
          <span className="border-r border-gray-200" />
          <div className="flex items-center gap-2">
            <Cake strokeWidth={1.5} size={16} className="text-primary01" />{" "}
            <span>20/09/1999</span>
          </div>
        </div>
      </div>
    </div>
  );
}
