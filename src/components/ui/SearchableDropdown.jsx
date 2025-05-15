import { useState } from "react";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchableDropdown = ({
  options,
  placeholder = "Select",
  searchPlaceholder = "Search",
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  // Filter options based on search input
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Custom dropdown menu with search input
  const dropdownRender = (menu) => (
    <div className="rounded-lg px-3">
      <div className="border border-[#E7E7E7] rounded-lg my-2">
        <Input
          placeholder={searchPlaceholder}
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          bordered={false}
          style={{
            fontSize: "20px",
            height: "38px",
          }}
        />
      </div>
      {menu}
    </div>
  );

  return (
    <Select
      placeholder={placeholder}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      options={filteredOptions}
      dropdownRender={dropdownRender}
      onChange={(value) => onChange?.(value)}
      virtual={false}
      listHeight={200}
      className="w-full "
    />
  );
};

export default SearchableDropdown;
