import { CircleUserRound } from 'lucide-react';
import { Lock } from 'lucide-react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, Outlet, useLocation } from 'react-router';

const MyProfileLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    console.log("Current path:", currentPath);

    const isActive = (path) => {
        return (
            currentPath === path ||
            (currentPath === "/user-management/my-profile" && path === "/user-management/my-profile")
        );
    };

    return (
        <div className="flex h-[calc(100vh-73px)] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[280px] bg-white  left-[65px] top-[73px] shadow-md py-6 px-5 flex flex-col justify-between">
                <ul className="space-y-3">
                    <Link to={"/user-management/my-profile"}>
                        <li
                            className={`px-3 py-3 my-4 rounded-xl flex items-center gap-4 ${isActive("/user-management/my-profile")
                                ? "bg-[#ECEBFC] text-[#744CDB]"
                                : "hover:bg-gray-100 text-[#242528]"
                                }`}
                        >
                            <CircleUserRound size={20} strokeWidth={1.75} />
                            <p className=" font-semibold block">Basic Information</p>
                        </li>
                    </Link>
                    <Link to="/user-management/my-profile/security">
                        <li
                            className={`px-3 py-3 mb-4 rounded-xl flex items-center gap-5 ${isActive("/user-management/my-profile/security")
                                ? "bg-[#ECEBFC] text-[#744CDB]"
                                : "hover:bg-gray-100 text-[#242528]"
                                }`}
                        >
                            <Lock size={20} strokeWidth={1.75} />
                            <p className=" font-semibold block">Security</p>
                        </li>
                    </Link>
                </ul>
                <button className="flex items-center gap-2 px-3 text-red-500 cursor-pointer">
                    <FiLogOut className="text-lg" />
                    Sign out
                </button>
            </aside>

            {/* Main content */}
            <main className=" flex-1 bg-[#F9FAFC] h-full p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MyProfileLayout;