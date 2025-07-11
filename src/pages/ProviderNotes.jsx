import { useParams } from "react-router";
import Breadcrumb from "../components/client/Breadcrumb";
import { getBreadcrumbs } from "../lib/staticData";

const ProviderNotes = () => {
  const { client } = useParams();
  return (
    <div>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client Management",
            link: "/dashboard/client-management",
          },
          {
            name: client?.split("-").join(" "),
            link: "",
          },
          {
            name: "Provider Notes",
            link: `/dashboard/client-management/${client}/provider-notes`,
          },
        ])}
      />
      <div className="mt-6 bg-white p-3 rounded-xl text-sm">
        <fieldset>
          <label htmlFor="notes" className="block mb-2 text-[#3A3B3F]">
            Custom Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            className="text bg-white w-full py-2 px-3 border border-[#E5E7E8] rounded-lg h-[175px]"
            placeholder="Note specific observations or client requests."></textarea>
        </fieldset>
        <button
          type="submit"
          className="cursor-pointer ml-auto block py-2 px-3 text-white bg-[#242528] rounded-lg mt-3">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProviderNotes;
