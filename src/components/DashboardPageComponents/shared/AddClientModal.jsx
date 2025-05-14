import { Modal } from "antd";
import { ImageIcon, UpdateIcon } from "../../../assets/icons/icons";

const AddClientModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add client"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null} // Removes default footer with OK and Cancel buttons
    >
      <div className="text-[#3A3B3F]">
        <div className="space-y-3">
          <h4>Avatar</h4>
          <fieldset className="relative size-14 rounded-full bg-[#F6F6F6] flex justify-center items-center">
            <ImageIcon />
            <div className="absolute -right-1 bottom-0 size-7 rounded-full border border-white bg-[#F5F4FE] flex items-center justify-center"><UpdateIcon /></div>
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <fieldset className="">
              <label htmlFor="firstName" className="block mb-1">First Name <span className="text-[#ED4245]">*</span></label>
              <input
                type="text"
                id="firstName"
                className="border border-[#E0E0E0] rounded-lg px-3 py-2 w-full"
                placeholder="First name"
              />
            </fieldset>
            <fieldset className="">
              <label htmlFor="lastName" className="block mb-1">Last name <span className="text-[#ED4245]">*</span></label>
              <input
                type="text"
                id="lastName"
                className="border border-[#E0E0E0] rounded-lg px-3 py-2 w-full"
                placeholder="Last name"
              />
            </fieldset>
          </div>
        </div>
        <div className="">fhgfjhhgf</div>
      </div>
    </Modal>
  );
};

export default AddClientModal;
