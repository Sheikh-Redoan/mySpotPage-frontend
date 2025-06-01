import { imageProvider } from "@/lib/imageProvider";

import { Tooltip } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { cn } from "../lib/utils";
import TopNavbar from "../pages/layout/TopNavbar";
import "../styles/antdCustom.css";
function MainLayout({ tabs }) {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="relative font-golos h-screen">
      {/* sidebar */}
      <div className="p-4 flex flex-col z-[8] justify-between top-0 left-0 transition-transform duration-300 h-screen fixed bg-[#F5F4FE]">
        {/* sidebar close button */}
        <button
          onClick={() => setToggle(!toggle)}
          className={cn(
            toggle
              ? "w-0 opacity-0 invisible "
              : "size-9 flex justify-center items-center object-cover  opacity-100",
            "transition-all p-2 cursor-pointer rounded-full absolute top-3 right-1 bg-primary01  duration-300 whitespace-nowrap overflow-hidden"
          )}>
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
                  <NavLink
                    to={tab.link}
                    key={tab.id}
                    className={({ isActive }) =>
                      cn(
                        isActive && "bg-primary01 text-white",
                        "py-2 justify-center items-center px-3 transiton-all duration-300 flex w-fit text-white cursor-pointer rounded-xl"
                      )
                    }>
                    {({ isActive }) => (
                      <>
                        <img src={isActive ? tab.imageWhite : tab.imagePink} />
                        <h4
                          className={cn(
                            isActive && "text-white",
                            "transition-all text-primary01 duration-300 whitespace-nowrap overflow-hidden",
                            toggle
                              ? "w-0 opacity-0 invisible  "
                              : "w-48 pl-2 opacity-100"
                          )}>
                          {tab.name}
                        </h4>
                      </>
                    )}
                  </NavLink>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar open button */}
        <div>
          <button
            onClick={() => setToggle(!toggle)}
            className={cn(
              !toggle
                ? "w-0 opacity-0 invisible -translate-x-6 "
                : "size-9 flex justify-center items-center  opacity-100",
              "transition-all p-2 rounded-full cursor-pointer  bg-primary01  duration-300 whitespace-nowrap overflow-hidden"
            )}>
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative ml-18  min-h-screen h-full bg-[#F9FAFC]">
        {/* topnav */}
        <TopNavbar />
        <div className="pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
