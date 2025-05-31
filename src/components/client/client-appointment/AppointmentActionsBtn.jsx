import React, { useState } from "react";
import WaitingListModal from "./WaitingListModal";

const AppointmentActionsBtn = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleOpenWaitlistModal = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleCloseWaitlistModal = () => {
    setIsWaitlistModalOpen(false);
  };

  return (
    <>
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <p className="text-[#3D3D3D] text-sm">
          No suitable time slot?{" "}
          <button
            onClick={handleOpenWaitlistModal}
            className="hover:text-indigo-700 text-[#744CDB] text-sm underline bg-transparent border-none p-0 cursor-pointer"
          >
            Join our waitlist!
          </button>
        </p>
        <button className="px-6 py-2 text-[#82868E] bg-[#E5E7E8] rounded-md hover:bg-[#ECEBFC] transition-colors cursor-pointer">
          Continue
        </button>
      </div>

      <WaitingListModal
        isOpen={isWaitlistModalOpen} 
        onClose={handleCloseWaitlistModal} 
      />
    </>
  );
};

export default AppointmentActionsBtn;
