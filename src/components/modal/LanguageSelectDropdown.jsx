import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const items = [
  {
    label: "English",
    key: "1",
  },
  {
    label: "Hebrew",
    key: "2",
  },
];

export default function LanguageSelectDropdown() {
  const [language, setLanguage] = useState("English");
  const handleMenuClick = (e) => {
    setLanguage(items[e.key - 1].label);
  };

  return (
    <Space direction="vertical" className="!w-full !block">
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
        <Button className="!w-full !flex !justify-between">
          <Space>{language}</Space>
          <FaCaretDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
