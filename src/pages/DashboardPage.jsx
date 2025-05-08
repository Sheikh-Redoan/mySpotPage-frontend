import { ArrowUp } from "lucide-react";
import { GoArrowUp } from "react-icons/go";

// chart 1
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardPage() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="p-4 bg-[#F9FAFC]">
      {/* statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white shadow-xs inset-shadow-sm">
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

      <div className="w-full">
        {/* chart1 */}
        <div className="bg-white flex w-full p-6 inset-shadow-sm ">
          <div className="w-7/12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E7D5D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#9DCCBC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="w-5/12">
            <h3>Most Popular Service</h3>
          </div>
        </div>

        {/* chart1 */}
        <div></div>

        {/* chart1 */}
        <div></div>
      </div>
    </div>
  );
}

export default DashboardPage;
