import { Button, Tabs } from "antd";
import { PlusIcon } from "./../assets/icons/icons";
import { useState } from "react";
import ClientTable from "../components/DashboardPageComponents/shared/ClientTable";
import AddClientModal from "../components/DashboardPageComponents/shared/AddClientModal";

const items = [
  {
    key: "1",
    label: "All Clients",
  },
  {
    key: "2",
    label: "VIP Clients",
  },
  {
    key: "3",
    label: "Blacklisted Clients", // Assuming you'll add a 'blacklisted' property to client data
  },
];

function ClientPage() {
  const [tabKey, setTabKey] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (key) => {
    console.log(typeof key);
    setTabKey(key);
  };

  return (
    <div className="w-full p-3 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="custom-client-tabs"
        />

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-[150px] inline-flex items-center justify-center px-3 py-2 gap-2 text-sm font-semibold text-white bg-primary01 border border-primary01 rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
        >
          <PlusIcon />
          Add Client
        </button>
      </div>
      {/* Pass tabKey as a prop */}
      <ClientTable activeTabKey={tabKey} />
      <AddClientModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default ClientPage;
