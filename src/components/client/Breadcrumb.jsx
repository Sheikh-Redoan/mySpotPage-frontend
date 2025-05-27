import { Breadcrumb as Breadcrumbs } from "antd";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
export default function Breadcrumb() {
  let location = useLocation();
  const currentPath = location.pathname;

  function activePath(path, title) {
    return path === currentPath ? (
      <span className="text-black cursor-pointer">{title}</span>
    ) : (
      <Link to={path}> {title}</Link>
    );
  }

  return (
    <div className="my-4">
      <Breadcrumbs
        separator={<ChevronRight strokeWidth={1} />}
        items={[
          {
            title: activePath("/service-provider-info", "Service"),
          },
          {
            title: activePath(
              "/service-provider-info/select-staff",
              "Select staff"
            ),
          },
          {
            title: activePath(
              "/service-provider-info/select-time",
              "Select time"
            ),
          },
          {
            title: activePath("/service-provider-info/confirm", "Confirm"),
          },
        ]}
      />
    </div>
  );
}
