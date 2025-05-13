


import SalesChart from "../components/DashboardPageComponents/SalesChart";
import RepeatClientChart from "../components/DashboardPageComponents/RepeatClientChart";
import { GoArrowUp } from "react-icons/go";
import RevenueChart from "../components/DashboardPageComponents/RevenueChart";
import ClientChart from "../components/DashboardPageComponents/ClientChart";

function DashboardPage() {
 

  return (
    <div className="p-4 bg-[#F9FAFC]">
      {/* statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white shadow-xs inset-shadow-sm">
          <h3 className="text-description">Complete Bookings</h3>
          <h2 className="text-xl font-semibold pt-1">1250</h2>
          <p className="flex items-center gap-1 pt-1">
            <GoArrowUp size={18} color="#05DF72" />{" "}
            <span className="text-green-400 font-medium">+8.7% </span>
            <span className="text-description">since last week</span>
          </p>
        </div>
        <div className="p-5 rounded-xl bg-white shadow-xs inset-shadow-sm">
          <h3 className="text-description">Success Rate</h3>
          <h2 className="text-xl font-semibold pt-1">82.5%</h2>
          <p className="flex items-center gap-1 pt-1">
            <GoArrowUp className="rotate-180" size={18} color="red" />{" "}
            <span className="text-red-400 font-medium">-2.1% </span>
            <span className="text-description">since last week</span>
          </p>
        </div>
        <div className="p-5 rounded-xl bg-white shadow-xs inset-shadow-sm">
          <h3 className="text-description">Cancel Rate</h3>
          <h2 className="text-xl font-semibold pt-1">12.2%</h2>
          <p className="flex items-center gap-1 pt-1">
            <GoArrowUp size={18} color="#05DF72" />{" "}
            <span className="text-green-400 font-medium">+4.7% </span>
            <span className="text-description">since last week</span>
          </p>
        </div>
        <div className="p-5 rounded-xl bg-white shadow-xs inset-shadow-sm">
          <h3 className="text-description">No Show Rate</h3>
          <h2 className="text-xl font-semibold pt-1">5.2%</h2>
          <p className="flex items-center gap-1 pt-1">
            <GoArrowUp className="rotate-180" size={18} color="red" />{" "}
            <span className="text-red-400 font-medium">-8.7% </span>
            <span className="text-description">since last week</span>
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 pt-4">
        {/* chart1 */}
        <RevenueChart/>
        {/* chart 2 */}
        <SalesChart/>
        {/* chart3 */}
        <ClientChart/>
      </div>
    </div>
  );
}

export default DashboardPage;
