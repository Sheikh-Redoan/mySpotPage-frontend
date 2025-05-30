import { Avatar, Card, Space } from "antd";
import { Cake, Dot, Mars, Phone, Venus } from "lucide-react";
import { Link } from "react-router";

export default function UserCard({ user }) {
  const { id, name, gender, plan, businessName, category, description } = user;
  const genders = {
    Male: <Mars strokeWidth={1.5} size={16} className="text-primary01" />,
    Female: <Venus strokeWidth={1.5} size={16} className="text-primary01" />,
  };

  return (
    <Link to={`/user-management/${name}/basic-information`}>
      <Card variant="outlined">
        <div className="flex items-start justify-between border-b border-dashed border-gray-200 pb-4">
          <Space>
            <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
            <div>
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-semibold">{name}</h4>
                <span>{genders[gender]}</span>
              </div>
              <p className="text-sm font-normal flex justify-center items-center text-description">
                {id} <Dot strokeWidth={1} />
                <span className="text-primary01 font-semibold">{plan}</span>
              </p>
            </div>
          </Space>

          <Space>
            <div className="flex items-center gap-5">
              <Cake strokeWidth={1} size={16} />
              <Phone strokeWidth={1} size={14} />
            </div>
          </Space>
        </div>

        <div className="pt-4">
          <ul className="list-none space-y-2">
            <li className="flex items-start justify-between">
              <span className="text-sm  text-description rounded-full">
                Business Name
              </span>
              <p className="text-sm text-right max-w-96 line-clamp-2">
                {businessName}
              </p>
            </li>
            <li className="flex items-start justify-between">
              <span className="text-sm  text-description rounded-full">
                Category
              </span>
              <p className="text-sm text-right max-w-96 line-clamp-2">
                {category}
              </p>
            </li>
            <li className="flex items-start justify-between">
              <span className="text-sm  text-description rounded-full">
                Description
              </span>
              <p className="text-sm text-right max-w-96 line-clamp-2">
                {description}
              </p>
            </li>
          </ul>
        </div>
      </Card>
    </Link>
  );
}
