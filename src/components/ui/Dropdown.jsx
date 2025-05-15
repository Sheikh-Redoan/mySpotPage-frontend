import { Select } from "antd";

const Dropdown = ({ options, placeholder = "Select", onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      onChange={(value) => onChange?.(value)}
      virtual={false}
      listHeight={200}
      className="w-full"
      dropdownClassName="custom-dropdown"
    />
  );
};

export default Dropdown;
