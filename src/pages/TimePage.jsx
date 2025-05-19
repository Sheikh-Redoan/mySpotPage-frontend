import { PlusIcon } from "../assets/icons/icons";
import { useState } from "react";

import TimeBasedModal from "../components/DashboardPageComponents/shared/TimeBasedModal";
import TimePageTable from "../components/DashboardPageComponents/shared/TimePageTable";

function TimePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full p-5">
      <div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
        >
          <PlusIcon className="text-[#FFF]" />
          Set time-based
        </button>
        <TimePageTable />

        <TimeBasedModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
}

export default TimePage;
