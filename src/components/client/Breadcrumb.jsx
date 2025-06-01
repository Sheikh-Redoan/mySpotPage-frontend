import { Breadcrumb as Breadcrumbs } from "antd";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
export default function Breadcrumb({ breadcrumbs }) {
  let location = useLocation();
  const currentPath = location.pathname;

  function activePath(path, title) {
    return path === currentPath ? (
      <span className="text-black cursor-pointer">{title}</span>
    ) : (
      <Link to={path}>{title}</Link>
    );
  }

  const data = breadcrumbs.filter(Boolean).map((item) => ({
    title: activePath(item.link, item.name),
  }));

  return (
    <div className="my-4">
      <Breadcrumbs separator={<ChevronRight strokeWidth={1} />} items={data} />
    </div>
  );
}
