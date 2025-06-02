import { Avatar, Space } from "antd";
import { Cake, Mars, Phone, Venus } from "lucide-react";
import { useParams } from "react-router";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";

export default function BasicInformation() {
  const { name } = useParams();

  const genders = {
    Male: <Mars strokeWidth={1.8} size={24} className="text-primary01" />,
    Female: <Venus strokeWidth={1.8} size={24} className="text-primary01" />,
  };

  return (
    <section className="space-y-8">
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "User Management",
            link: "/admin/user-management",
          },
          {
            name: name.split("-").join(" "),
            link: `/admin/user-management${name}`,
          },
          {
            name: "Business Information",
            link: `/admin/user-management/${name}/business-information`,
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

      <div className="flex gap-1 bg-white p-8 rounded-xl justify-between items-start border border-gray-200">
        <ul className="list-none space-y-4 w-full">
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">
              Business Name
            </span>
            <p className="text-sm text-right line-clamp-2">Serene Bliss Spa</p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">
              Classification
            </span>
            <p className="text-sm text-right line-clamp-2 py-1 px-3 bg-primary01/15 text-primary01 rounded-full font-semibold">
              Massage
            </p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">Description</span>
            <p className="text-sm text-right line-clamp-2">
              A luxurious spa providing rejuvenating massages, skincare
              treatments.
            </p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">Legal Name</span>
            <p className="text-sm text-right line-clamp-2">
              Serene Bliss Wellness Center LLC
            </p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">
              Registration Number
            </span>
            <p className="text-sm text-right line-clamp-2">987654321</p>
          </li>
        </ul>
      </div>

      <div className="flex gap-1 bg-white p-8 rounded-xl justify-between items-start border border-gray-200">
        <ul className="list-none space-y-4 w-full">
          <li className="flex items-start justify-between">
            <p className="flex items-center gap-2">
              <span className="text-sm font-bold rounded-full">
                Fixed location 1
              </span>
              <span className="bg-primary01/15 text-primary01 rounded-xl text-xs p-1 px-2 font-medium">
                Hidden
              </span>
            </p>
            <p className="text-sm text-right line-clamp-2">
              123 Herzl Street, Tel Aviv-Yafo, 6100001, Israel
            </p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">
              Fixed location 2
            </span>
            <p className="text-sm text-right line-clamp-2 py-1 px-3">
              32 Dizengoff Street, Tel Aviv-Yafo, Israel
            </p>
          </li>
          <li className="flex items-start justify-between">
            <span className="text-sm font-bold rounded-full">
              Mobile location
            </span>
            <p className="text-sm text-right line-clamp-2">
              Jerusalem, Tel Aviv, Haifa, Rishon LeZion, Petah Tikva
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
