import { Plus } from "lucide-react";
import { useState } from "react";

import FixedModal from "../modal/FixedModal";

const TeamLocation = () => {
  const [fixedModalOpen, setFixedModalOpen] = useState(false);

  return (
    <div className="min-h-full">
      <div className="p-6 rounded-md mt-4 bg-[#FFFFFF] h-[692px]">
        <div className="xl:flex justify-between items-start my-2">
          <div>
            <h2 className="text-xl text-[#242528] font-semibold">
              Fixed Location Services
            </h2>
            <p className="text-[#797979] mt-1 text-sm">
              Your service is based at a specific location. Ensure your address
              settings are correct for customers to find you easily.
            </p>
          </div>

          <div
            onClick={() => setFixedModalOpen(true)}
            className="flex items-center gap-2 border border-[#744CDB] rounded-lg px-4 py-2 text-[#744CDB] text-sm sm:text-base font-semibold hover:underline mt-3 xl:mt-0 whitespace-nowrap w-fit hover:scale-95 transform transition-all duration-300 ease-in-out"
          >
            <Plus size={20} /> Add Location
          </div>
        </div>
      </div>

      {/* Fixed Modal */}

      {fixedModalOpen && (
        <FixedModal
          isOpen={fixedModalOpen}
          onClose={() => setFixedModalOpen(false)}
          onSave={() => setFixedModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeamLocation;
