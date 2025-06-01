import { Avatar, Card } from "antd";
import { Flag, Phone } from "lucide-react";

export default function RoleCard({ user }) {
  const { name, role, phone, joinedDate } = user;
  return (
    <Card>
      <div className="flex items-start gap-2">
        <Avatar size={50}>{name.charAt(0)}</Avatar>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="px-2 py-1 bg-primary01/10 text-primary01 rounded-full text-xs">
              {role}
            </span>
          </div>
          <p className="flex items-center gap-1">
            <Phone size={16} strokeWidth={1.5} className="text-primary01" />{" "}
            <span className="text-description">{phone}</span>
          </p>
          <p className="flex items-center gap-1">
            <Flag size={16} strokeWidth={1.5} className="text-primary01" />
            <span className="text-description">Join date: {joinedDate}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
