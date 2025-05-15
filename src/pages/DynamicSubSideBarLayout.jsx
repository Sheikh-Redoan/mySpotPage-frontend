import { Link, Outlet, useLocation } from "react-router";
import { cn } from './../lib/utils';

function DynamicSubSideBarLayout({ indexPath, items }) {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("Current path:", currentPath);
  console.log("items:", items);

  const isActive = (path) => {
    return (
      currentPath === path ||
      (currentPath === indexPath && path === indexPath)
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="min-w-[240px] bg-white h-full left-[65px] top-[73px] shadow-md py-6 px-5">
        <ul className="space-y-3">
          {
            items.map((item) => (
              <Link to={item.path} key={item.path}>
                <li
                  className={`p-3 mb-4 rounded-xl flex items-center gap-3 ${isActive(item.path)
                    ? "bg-[#ECEBFC] text-[#744CDB]"
                    : "hover:bg-gray-100 text-[#242528]"
                    }`}
                >
                  <item.icon className={cn(isActive(item.path) ? "fill-[#866BE7]" : "fill-[#676B73]", "shrink-0")} />
                  <p className="font-semibold block text-nowrap">{item.title}</p>
                </li>
              </Link>
            ))
          }
        </ul>
      </aside>

      <main className=" flex-1 bg-[#F9FAFC] h-full p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DynamicSubSideBarLayout;
