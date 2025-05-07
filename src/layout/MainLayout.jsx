import { imageProvider } from "@/lib/imageProvider";
import { dashboardTabs } from "@/lib/staticData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router";

function MainLayout() {
  // const {currentTab} = useContext(MainContext)
  const [toggle, setToggle] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTab, setCurrentTab] = useState('Dashboard')
  const handleActiveTab = (index, tab) => {
    console.log(activeTab);
    setActiveTab(index);
    setCurrentTab(tab)
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
          }`}
        >
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
          <div className="pt-10  flex flex-col w-fit  justify-between">
            <div className="flex w-fit flex-col gap-4">
              {dashboardTabs.map((tab, index) => (
                <Link to={tab.link}
                  onClick={() => handleActiveTab(index, tab.name)}
                  key={tab.id}
                  className={` ${
                    activeTab === index ? "bg-primary01 text-white" : ""
                  } py-2 justify-center items-center px-3 transiton-all duration-300 flex w-fit text-white cursor-pointer rounded-md `}
                >
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
                    }`}
                  >
                    {tab.name}
                  </h4>
                </Link>
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
            }`}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative ml-20  min-h-screen h-full ">
        {/* topnav */}
        <div className="flex justify-between border-b items-center px-6 py-4 absolute  top-0 left-0 right-0">
          <h3 className="font-semibold text-lg">{currentTab}</h3>
          <div className="flex items-center gap-4">
            <img className="cursor-pointer" src={imageProvider.Notification} alt="" />
            <div className="cursor-pointer">
              <img className="w-10 h-10 rounded-full bg-white" src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="" />
            </div>
          </div>
        </div>
        <div className="pt-18 px-1">
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
