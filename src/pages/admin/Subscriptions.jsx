import { useParams } from "react-router";
import Breadcrumb from "../../components/client/Breadcrumb";
import Table from "../../components/shared/Table";
import { imageProvider } from "../../lib/imageProvider";
import { getBreadcrumbs } from "../../lib/staticData";

export default function Subscriptions() {
  const { name } = useParams();
  return (
    <section>
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
            name: "Subscription",
            link: `/user-management/${name}/subscription`,
          },
        ])}
      />
      <div className="space-y-4 mb-10">
        <h1 className="text-xl font-bold">Plan</h1>
        <div className="bg-white p-8 rounded-xl border border-gray-200 min-w-xs w-fit space-y-2">
          <div className="flex items-center gap-2">
            <img src={imageProvider.sparkIcon} alt="spark icon" />
            <span className="text-lg font-bold">Radiance</span>
          </div>
          <p className="text-description  flex items-center gap-1">
            <span className="text-4xl font-bold text-primary01">&#8362; </span>
            <span className="text-2xl font-semibold text-primary01">279</span> /
            month
          </p>
          <p>Set the Standard</p>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-bold">Billing History</h1>
        <Table className="border-0" />
      </div>
    </section>
  );
}
