// src/components/seller/Header.jsx
import { GoGear } from "react-icons/go";
import { Link } from "react-router"; // Import Link from react-router-dom

const Header = ({ activeTab, onTabChange }) => {
  const tabs = ["Active Staff", "Inactive Staff", "Calendar View"];

  return (
    <div className="self-stretch flex justify-between items-end">
      <div className="flex justify-start items-center">
        {tabs.map((tab) => (
          <button
            key={tab} // Key for list item
            className={`px-8 py-3 border-b-2 transition-colors duration-200 ${
              activeTab === tab
                ? "border-violet-500 text-violet-500 font-semibold"
                : "border-gray-200 text-gray-500 font-normal hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab)}>
            <span className="text-center text-base font-['Golos_Text'] leading-normal">
              {tab}
            </span>
          </button>
        ))}
      </div>
      {/*
        Corrected usage: Wrap the entire button element with the Link component.
        This makes the whole button clickable and handles navigation via React Router.
      */}
      <Link to="/dashboard/staff-management/settings">
        {/* Link to the new staff settings route */}
        <button className="h-10 px-3 py-2 bg-white rounded-lg border border-neutral-300 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200">
          <GoGear className="w-5 h-5 text-neutral-700" />
          <span className="text-neutral-700 text-sm font-semibold font-['Golos_Text'] leading-tight">
            Settings
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Header;
