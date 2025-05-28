import { Button, Modal } from "antd";
import { useState } from "react";
import languageIcon from "../../assets/icons/language.png";
import LanguageSelLctDropdown from "./LanguageSelectDropdown";

export default function LanguageSelectModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="default"
        onClick={showModal}
        variant="outlined"
        className="!rounded-full">
        <img src={languageIcon} alt="language icon" className="w-4" />
        <span className="text-base text-primary01">Translate</span>
      </Button>
      <Modal
        cancelText="Reset"
        cancelButtonProps={{ className: "!rounded-full" }}
        okText="Translate"
        okButtonProps={{ className: "!rounded-full" }}
        title="Language to Translate into"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="!top-3 !left-1/2 !-translate-x-1/2 md:!-translate-x-4/5 !max-w-xs">
        <LanguageSelLctDropdown />
      </Modal>
    </>
  );
}
