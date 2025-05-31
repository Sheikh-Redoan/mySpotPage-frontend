import { imageProvider } from "@/lib/imageProvider";

import { Tooltip } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import TopNavbar from "../pages/layout/TopNavbar";
import "../styles/antdCustom.css";
function MainLayout({ tabs }) {
  // const {currentTab} = useContext(MainContext)
  const [toggle, setToggle] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  const handleActiveTab = (index, tab) => {
    console.log(activeTab);
    setActiveTab(index);
    setCurrentTab(tab);
  };

  return (
    <div className="relative font-golos h-screen">
      {/* sidebar */}
      <div className="p-4 flex flex-col z-[8] justify-between top-0 left-0 transition-transform duration-300 h-screen fixed bg-[#F5F4FE]">
        {/* sidebar close button */}
        <button
          onClick={() => setToggle(!toggle)}
          className={` transition-all p-2 cursor-pointer rounded-full absolute top-3 right-1 bg-primary01  duration-300 whitespace-nowrap overflow-hidden ${
            toggle
              ? "w-0 opacity-0 invisible "
              : "size-9 flex justify-center items-center object-cover  opacity-100"
          }`}>
          <ChevronLeft size={18} className="text-white" />
        </button>
        {/* sidebar top */}
        <div className="">
          {/* logo */}
          <div className="flex items-center ">
            <div>
              <img src="/my_spot_page_favicon.png" alt="" />
            </div>
            <div>
              <img
                className={` transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  toggle ? "w-0 opacity-0 invisible  " : "w-16 ml-2 opacity-100"
                }`}
                src={imageProvider.TextLogo}
                alt=""
              />
            </div>
          </div>

          {/* tabs */}
          <div className="pt-6  flex flex-col w-fit  justify-between">
            <div className="flex sidebar-tabs w-fit flex-col gap-4">
              {tabs.map((tab, index) => (
                <Tooltip
                  key={tab.id}
                  placement="right"
                  color="white"
                  title={toggle ? tab.name : ""}>
                  <Link
                    to={tab.link}
                    onClick={() => handleActiveTab(index, tab.name)}
                    key={tab.id}
                    className={` ${
                      activeTab === index ? "bg-primary01 text-white" : ""
                    } py-2 justify-center items-center px-3 transiton-all duration-300 flex w-fit text-white cursor-pointer rounded-xl `}>
                    <img
                      className=""
                      src={
                        index === activeTab && activeTab === tab.id
                          ? tab.imageWhite
                          : tab.imagePink
                      }
                    />
                    <h4
                      className={` ${
                        index === activeTab ? "text-white" : ""
                      } transition-all text-primary01 duration-300 whitespace-nowrap overflow-hidden ${
                        toggle
                          ? "w-0 opacity-0 invisible  "
                          : "w-48 pl-2 opacity-100"
                      }`}>
                      {tab.name}
                    </h4>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar open button */}
        <div>
          <button
            onClick={() => setToggle(!toggle)}
            className={` transition-all p-2 rounded-full cursor-pointer  bg-primary01  duration-300 whitespace-nowrap overflow-hidden ${
              !toggle
                ? "w-0 opacity-0 invisible -translate-x-6 "
                : "size-9 flex justify-center items-center  opacity-100"
            }`}>
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative ml-20  min-h-screen h-full">
        {/* topnav */}
        <TopNavbar currentTab={currentTab} />
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
