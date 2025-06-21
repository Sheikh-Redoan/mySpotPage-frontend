import { Button, Popover } from "antd";
import { Suspense, useState } from "react";
import languageIcon from "../../assets/icons/language.png";
import Translate from "../shared/Translate";
import LanguageSelLctDropdown from "./LanguageSelectDropdown";

export default function LanguageSelectModal() {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      placement="left"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      arrow={false}
      content={<LanguageSelLctDropdown hide={hide} />}>
      <Button type="default" variant="outlined" className="!rounded-full">
        <img src={languageIcon} alt="language icon" className="w-4" />
        <span className="text-base text-primary01">
          <Suspense fallback={<div>Loading...</div>}>
            <Translate text={"Translate"} />
          </Suspense>
        </span>
      </Button>
    </Popover>
  );
}
