import { Modal, Button } from "antd";
import { NotificationIcon } from "../../assets/icons/icons2";
import { X } from "lucide-react";

const DeleteLocationModal = ({ isOpen, onClose, onDeleteConfirm, title }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-[#242528] text-[18px] font-semibold">
            Notifications
          </h2>
          <X onClick={onClose} className="w-6 h-6 cursor-pointer" />
        </div>
      }
      className="!w-[430px]"
      styles={{
        header: {
          padding: "6px 0px",
          borderBottom: "1px solid #E5E7E8",
        },
        body: {
          padding: "24px 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
        },
        content: {
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
        },
      }}
      style={{
        backgroundColor: "rgba(75, 85, 99, 0.7)",
      }}
      centered
    >
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center rounded-full h-[40px] w-[40px] bg-[#FBD9DA] mx-auto my-4">
          <NotificationIcon className="h-5 w-5" />
        </div>

        <h2 className="text-[#262626] font-semibold my-2">
          {title} Deleted Permanently
        </h2>
        <p className="text-[#797979] my-1 text-sm pb-6">
          {title} and all associated data will be permanently removed.
          This action cannot be undone.
        </p>
      </div>

      <div className="flex justify-between gap-4 items-center w-full">
        <Button
          type="default"
          onClick={onClose}
          className="w-1/2 !border !border-[#242528] !text-[#242528] !rounded-lg hover:!scale-95 transform transition-all duration-300 ease-in-out"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onDeleteConfirm}
          className="!w-1/2 !bg-[#ED4245] !text-white !rounded-lg hover:!scale-95 transform transition-all duration-300 ease-in-out"
        >
          Remove
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteLocationModal;
