// src/components/seller/Header.jsx
import { GoGear } from "react-icons/go";
import { Link } from "react-router"; // Corrected: Import Link from react-router-dom

const Header = ({ activeTab, onTabChange }) => {
  const tabs = ["Active Staff", "Inactive Staff", "Calendar View"];

  return (
    <div className="self-stretch flex justify-between items-end gap-4">
      <div className="flex justify-start items-center max-[700px]:overflow-x-auto max-[700px]:scrollbar-hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-8 py-3 border-b-2 transition-colors duration-200 max-[700px]:text-[12px] max-[700px]:p-0 ${
              activeTab === tab
                ? "border-violet-500 text-violet-500 font-semibold"
                : "border-gray-200 text-gray-500 font-normal hover:border-gray-300"
            }`}
            onClick={() => onTabChange(tab)}>
            <p className="text-center text-base font-['Golos_Text'] leading-normal max-[700px]:text-[16px] max-[700px]:w-max max-[700px]:mx-[10px]">
              {tab}
            </p>
          </button>
        ))}
      </div>
      <Link to="/dashboard/staff-management/settings">
        <button className="h-10 px-3 py-2 bg-white rounded-lg border border-neutral-300 flex justify-end items-center gap-2 hover:bg-gray-50 transition-colors duration-200 max-[700px]:text-[10px] max-[700px]:p-1">
          <GoGear className="w-5 h-5 text-neutral-700 max-[700px]:text-[12px]" />
          <span className="text-neutral-700 text-sm font-semibold font-['Golos_Text'] leading-tight">
            Settings
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Header;