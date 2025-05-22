import { Input } from "antd";
import { SearchOutlined } from "../assets/icons/icons";
import { PlusIcon } from "lucide-react";
import { PhotoIcon } from "../assets/icons/icons2";
import ServiceTable from "../components/DashboardPageComponents/shared/ServiceTable";
import AddNewService from "../components/DashboardPageComponents/shared/AddNewService";
import { useState } from "react";

function ServicePage() {
  const [addNewService, setAddNewService] = useState(false);
  const handleSearch = (value) => {
    console.log(value);
  };
  return (
    <div className="w-full p-5">
      {!addNewService ? (
        <>
          <div className="flex justify-between items-center">
            <div className="relative w-[280px]">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                className="custom-client-input"
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setAddNewService(true)}
                className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
              >
                <PlusIcon className="text-[#FFF]" />
                Add Service
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-3 py-2 gap-2 border border-[#242528] rounded-lg"
              >
                <PhotoIcon />
                <p className="font-semibold text-[15px]">Photo Style</p>
              </button>
            </div>
          </div>

          <ServiceTable />
        </>
      ) : (
        <AddNewService setAddNewService={setAddNewService} />
      )}
    </div>
  );
}

export default ServicePage;
