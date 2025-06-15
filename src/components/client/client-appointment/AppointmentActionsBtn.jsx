import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import WaitingListModal from "./WaitingListModal";

const AppointmentActionsBtn = ({ to = "/service-provider-info/confirm" }) => {
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
            className="hover:text-indigo-700 text-[#744CDB] text-sm underline bg-transparent border-none p-0 cursor-pointer">
            Join our waitlist!
          </button>
        </p>
        <Link to={to}>
          <Button type="default" className="!bg-black !text-white">
            Continue
          </Button>
        </Link>
      </div>

      <WaitingListModal
        isOpen={isWaitlistModalOpen}
        onClose={handleCloseWaitlistModal}
      />
    </>
  );
};

export default AppointmentActionsBtn;
