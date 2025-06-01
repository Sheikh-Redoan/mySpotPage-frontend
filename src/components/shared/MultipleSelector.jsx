import { Button, Checkbox, Select } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function MultipleSelector({ name, data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoles, setSelectedRoles] = useState([
    searchParams.get(name) || data[0],
  ]);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleCheckboxChange = (role) => {
    let newSelection;
    if (role === data[0]) {
      newSelection = selectedRoles.includes(data[0]) ? [] : [data[0]];
    } else {
      const currentSelectionWithoutAll = selectedRoles.filter(
        (r) => r !== data[0]
      );
      if (currentSelectionWithoutAll.includes(role)) {
        // If the role is already selected, deselect it.
        newSelection = currentSelectionWithoutAll.filter((r) => r !== role);
      } else {
        // If the role is not selected, add it to the selection.
        newSelection = [...currentSelectionWithoutAll, role];
      }
    }
    setSelectedRoles(newSelection);
  };

  const handleApply = () => {
    setSelectOpen(false); // Close the dropdown after applying
    if (selectedRoles.length === 0 || selectedRoles.includes(data[0])) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, selectedRoles.join(","));
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSelectedRoles([]); // Reset to no roles selected
    searchParams.delete(name);
    setSearchParams(searchParams);
  };

  const displayValue =
    selectedRoles.includes(data[0]) || selectedRoles.length === 0
      ? data[0]
      : selectedRoles.join(", ");

  return (
    <Select
      size="large"
      value={displayValue}
      open={selectOpen}
      onOpenChange={setSelectOpen}
      placeholder={data[0]}
      className="w-full rounded-lg"
      allowClear={false}
      suffixIcon={
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            selectOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      }
      // Use dropdownRender to completely customize the content of the dropdown panel.
      popupRender={(menu) => (
        <div className="overflow-hidden">
          <div className="p-4 space-y-3">
            {data.map((role) => (
              <label
                key={role}
                className="flex items-center cursor-pointer text-gray-800 text-sm">
                <Checkbox
                  className="hidden" // Hide the default HTML checkbox.
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleCheckboxChange(role)}
                />

                <span className="ml-3">{role}</span>
              </label>
            ))}
          </div>

          {/* Action Buttons (Reset and Apply) */}
          <div className="flex justify-between p-4 gap-2">
            <Button
              type="default"
              onClick={handleReset}
              className="flex-1"
              size="large">
              Reset
            </Button>
            <Button
              type="primary"
              onClick={handleApply}
              className="flex-1"
              size="large">
              Apply
            </Button>
          </div>
        </div>
      )}>
      {/* No <Option> components are needed here as dropdownRender completely replaces the menu content. */}
    </Select>
  );
}
