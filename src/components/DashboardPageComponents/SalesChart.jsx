import { Select } from "antd";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { imageProvider } from "../../lib/imageProvider";
import RepeatClientChart from "./RepeatClientChart";

function SalesChart() {
  const data = [
    { name: "", pv: 0 },
    { name: "1/2/2025", pv: 23 },
    { name: "2/2/2025", pv: 12 },
    { name: "3/2/2025", pv: 37 },
    { name: "4/2/2025", pv: 5 },
    { name: "5/2/2025", pv: 19 },
    { name: "6/2/2025", pv: 9 },
    { name: "7/2/2025", pv: 34 },
    { name: "8/2/2025", pv: 3 },
    { name: "9/2/2025", pv: 28 },
    { name: "10/2/2025", pv: 18 },
    { name: "11/2/2025", pv: 32 },
    { name: "12/2/2025", pv: 6 },
    { name: "13/2/2025", pv: 15 },
    { name: "14/2/2025", pv: 11 },
    { name: "15/2/2025", pv: 36 },
    { name: "16/2/2025", pv: 8 },
    { name: "17/2/2025", pv: 1 },
    { name: "18/2/2025", pv: 39 },
    { name: "19/2/2025", pv: 14 },
    { name: "20/2/2025", pv: 25 },
    { name: "21/2/2025", pv: 31 },
    { name: "22/2/2025", pv: 4 },
    { name: "23/2/2025", pv: 20 },
    { name: "24/2/2025", pv: 30 },
    { name: "25/2/2025", pv: 2 },
    { name: "26/2/2025", pv: 17 },
    { name: "27/2/2025", pv: 26 },
    { name: "28/2/2025", pv: 38 }
  ];

   const totalSales = data.reduce((sum, item) => sum + item.pv, 0);



  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const month = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  const services = [
    { value: "Classic Ombre", label: "Classic Ombre" },
    { value: "Reverse Ombre", label: "Reverse Ombre" },
    { value: "Smoothing Keratin Treatment", label: "Smoothing Keratin Treatment" },
    { value: "Balayage with Toner", label: "Balayage with Toner" },
    { value: "Balayage & Root Shadow", label: "Balayage & Root Shadow" },
    { value: "Full Highlights", label: "Full Highlights" },
    { value: "Partial Highlights", label: "Partial Highlights" },
    { value: "Root Touch-Up", label: "Root Touch-Up" },
    { value: "Gloss Treatment", label: "Gloss Treatment" },
    { value: "Color Correction", label: "Color Correction" },
    { value: "Hair Botox Treatment", label: "Hair Botox Treatment" },
    { value: "Japanese Straightening", label: "Japanese Straightening" },
    { value: "Hair Spa Treatment", label: "Hair Spa Treatment" },
    { value: "Fashion Color", label: "Fashion Color" },
    { value: "Double Process Color", label: "Double Process Color" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="flex items-center gap-1 text-sm"
          style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 10 }}>
          <p>{label}</p>
          <p>-</p>
          <div className="flex gap-1 items-center">
            <p>Total Sales: {" "}</p>
            <p>{payload[0].value}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white gap-8 divide-x divide-gray-200 rounded-xl flex w-full h-full p-6 inset-shadow-sm max-lg:flex-col">
      <div className="w-full lg:w-9/12 pr-8 chart-1 flex flex-col ">
        <div className="">
          <div className="px-0 pt-0 pb-4 w-full flex flex-wrap justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                className="p-3.5 rounded-lg bg-[#FEE8D3]"
                src={imageProvider.SalesIcon}
                alt=""
              />

              <div>
                <h4 className="font-medium text-black/60">Total Sales</h4>
                <h3 className="text-lg font-semibold flex items-center">
                  {totalSales}{" "}
                  <span className="pl-4">
                    <GoArrowUp size={18} color="#05DF72" />
                  </span>{" "}
                  <span className="text-green-400 font-medium text-base">
                    +6.5%
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 md:max-w-sm w-full">
              <Select
                defaultValue="Month"
                className="font-golos font-medium flex-1"
                style={{ width: 150 }}
                onChange={handleChange}
                options={month}
              />
              <Select
                className="font-golos font-medium flex-1 md:flex-2"
                defaultValue="Services"
                style={{ width: 250 }}
                onChange={handleChange}
                options={services}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 py-4 gap-4">
            <div className="border p-4 space-y-1.5 border-black/10 rounded-xl">
              <h4 className="text-description ">Average Daily Bookings</h4>
              <h3 className="text-black font-semibold text-lg">950</h3>
              <h4 className="flex items-center">
                <GoArrowDown color="red" />{" "}
                <span className="text-red-400 font-semibold pr-2">-2.1%</span>{" "}
                <span className="text-description">since last month</span>
              </h4>
            </div>

            <div className="border p-4 space-y-1.5 border-black/10 rounded-xl">
              <h4 className="text-description flex flex-wrap w-full justify-between gap-3">
                Peek- Time Booking Volume{" "}
                <span className="text-primary01 bg-[#ECEBFC] px-4 py-2 rounded-full text-sm font-medium ">
                  Peak time: 14:00 - 18:00
                </span>
              </h4>
              <h3 className="font-semibold text-black text-lg">950</h3>
              <h4 className="flex items-center ">
                <GoArrowUp color="#05DF72" />{" "}
                <span className="text-green-400 font-semibold pr-2">-2.1%</span>{" "}
                <span className="text-description"> from daily average</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="w-full chart-1 overflow-x-auto">
          <ResponsiveContainer width={2500} height={380}>
            <BarChart
              width={1500}
              height={380}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="0.3" vertical={false} />
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                interval={0}
                height={60}
                tickMargin={10}
                tick={{
                  angle: 0,
                  textAnchor: 'middle',
                }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 40]}
                ticks={[5, 10, 15, 20, 25, 30, 35, 40]}
                allowDataOverflow={true}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pv" fill="#FC8B23" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full lg:w-3/12 ">
        <h3 className="font-semibold pb-4">Repeat Clients</h3>
        <RepeatClientChart />
      </div>
    </div>
  );
}

export default SalesChart;
