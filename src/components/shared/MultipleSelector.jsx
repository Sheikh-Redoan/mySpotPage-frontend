import { Button, Checkbox, Drawer, Input, Select } from "antd";
import { X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { SearchOutlined } from "../../assets/icons/icons";
import useResponsive from "../../hooks/useResponsive";

export default function MultipleSelector({ name, data, search = true }) {
  const { xl } = useResponsive();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([
    searchParams.get(name) || data[0],
  ]);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleCheckboxChange = (role) => {
    let newSelection;
    if (role === data[0]) {
      newSelection = selectedRoles.includes(role) ? [] : data;
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
    if (selectedRoles.length === 0) {
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

  const showDrawer = () => {
    setSelectOpen(true);
  };
  const onClose = () => {
    setSelectOpen(false);
  };

  const displayValue =
    selectedRoles.includes(data[0]) || selectedRoles.length === 0
      ? data[0]
      : selectedRoles.join(", ");

  return xl ? (
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
          {search && (
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="w-full p-2"
              onChange={(event) => {
                const { value } = event.target;
                setSearchTerm(value);
                // Update the search params with the search term
              }}
            />
          )}
          {/* Render the search input if the search prop is true */}
          <div className="p-4 space-y-3">
            {data
              .filter((role) =>
                role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((role) => (
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
              className="flex-1 !bg-black"
              size="large">
              Apply
            </Button>
          </div>
        </div>
      )}>
      {/* No <Option> components are needed here as dropdownRender completely replaces the menu content. */}
    </Select>
  ) : (
    <>
      <Button
        type="default"
        onClick={showDrawer}
        className="flex !justify-between items-center flex-1 max-md:w-full !rounded-md"
        size="middle">
        <span>All Cities</span>
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
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={selectOpen}
        height={"80dvh"}
        className="!rounded-t-xl">
        <div>
          <div className="flex items-center justify-between py-2 px-4 border-b border-gray-100 sticky top-0 bg-white z-10 ">
            <h3 className="font-semibold">Filter by cities</h3>
            <Button type="text" onClick={onClose}>
              <X size={20} strokeWidth={1.5} />
            </Button>
          </div>

          <div className="overflow-hidden p-4 min-h-[70dvh]">
            {search && (
              <Input
                size="large"
                placeholder="Search"
                prefix={<SearchOutlined />}
                className="w-full p-2"
                onChange={(event) => {
                  const { value } = event.target;
                  setSearchTerm(value);
                  // Update the search params with the search term
                }}
              />
            )}
            {/* Render the search input if the search prop is true */}
            <div className="p-4 space-y-3">
              {data
                .filter((role) =>
                  role.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((role) => (
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
          </div>

          {/* Action Buttons (Reset and Apply) */}
          <div className="flex justify-between gap-2 sticky bottom-0 p-4 bg-white border-t border-gray-100">
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
              className="flex-1 !bg-black"
              size="large">
              Apply
            </Button>
          </div>
        </div>
      </Drawer>
      <style>{`
        .ant-drawer-body {
          padding: 0 !important;
        }
      `}</style>
    </>
  );
}
