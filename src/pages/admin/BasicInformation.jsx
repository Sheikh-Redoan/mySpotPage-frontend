import { useParams } from "react-router";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";

export default function BasicInformation() {
  const { name } = useParams();
  console.log(name);
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
    </div>
  );
}
