import { useState } from "react";
import { Select, Input, Checkbox } from "antd"; 
import { X } from "lucide-react";
import { SearchOutlined } from "../../assets/icons/icons";

const LocationDropdown = ({
  options,
  placeholder = "Select",
  searchPlaceholder = "Search",
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  // Filter options based on search input
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleChange = (values) => {
    setSelectedValues(values);
    onChange?.(values);
  };

  return (
    <div className="space-y-3">
      <Select
        mode="multiple"
        placeholder={placeholder}
        open={open}
        onDropdownVisibleChange={(visible) => setOpen(visible)}
        value={[]}
        onChange={handleChange}
        tagRender={() => null}
        dropdownRender={(menu) => (
          <div className="rounded-lg px-3">
            {/* Search input */}
            <div className="border border-[#E7E7E7] rounded-lg my-2">
              <Input
                placeholder={searchPlaceholder}
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: "20px",
                  height: "38px",
                }}
              />
            </div>

            {/* Custom list with checkboxes */}
            <div className="max-h-[200px] overflow-y-auto pr-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    const alreadySelected = selectedValues.includes(
                      option.value
                    );
                    const updatedValues = alreadySelected
                      ? selectedValues.filter((v) => v !== option.value)
                      : [...selectedValues, option.value];
                    handleChange(updatedValues);
                  }}
                >
                  <Checkbox
                    style={{
                      transform: "scale(1.2)",
                    }}
                    checked={selectedValues.includes(option.value)}
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        options={[]}
        virtual={false}
        listHeight={200}
        className="w-full"
      />

      {/* 🔽 Show selected labels outside */}
      <div className="mt-4 mb-2 flex flex-wrap gap-4">
        {selectedValues.map((val) => {
          const label = options.find((opt) => opt.value === val)?.label;
          return (
            <div
              key={val}
              className="flex items-center  text-[#866BE7] rounded-full px-3 py-1 text-sm bg-[#ECEBFC]"
            >
              <span>{label}</span>
              <button
                onClick={() => {
                  const newValues = selectedValues.filter((v) => v !== val);
                  setSelectedValues(newValues);
                  onChange?.(newValues);
                }}
                className="ml-2 text-gray-500 hover:text-red-600 font-bold focus:outline-none"
                type="button"
              >
                <X
                  size={16}
                  className="text-[#C3BCF6] hover:scale-110 hover:font-medium"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationDropdown;
