import { imageProvider } from "../../lib/imageProvider";

import { Select } from "antd";
import { GoArrowUp } from "react-icons/go";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function RevenueChart() {
  const data = [
    { name: "0/0/0000", uv: 450, pv: 0, amt: 0 },
    { name: "1/2/2025", uv: 400, pv: 400, amt: 200 },
    { name: "2/2/2025", uv: 600, pv: 200, amt: 200 },
    { name: "3/2/2025", uv: 500, pv: 300, amt: 200 },
    { name: "4/2/2025", uv: 500, pv: 500, amt: 200 },
    { name: "5/2/2025", uv: 400, pv: 100, amt: 200 },
    { name: "6/2/2025", uv: 500, pv: 200, amt: 200 },
    { name: "7/2/2025", uv: 700, pv: 500, amt: 200 },
    { name: "8/2/2025", uv: 400, pv: 200, amt: 200 },
    { name: "9/2/2025", uv: 700, pv: 100, amt: 200 },
    { name: "10/2/2025", uv: 600, pv: 600, amt: 200 },
    { name: "11/2/2025", uv: 500, pv: 200, amt: 200 },
    { name: "12/2/2025", uv: 700, pv: 500, amt: 200 },
    { name: "13/2/2025", uv: 400, pv: 200, amt: 200 },
    { name: "14/2/2025", uv: 700, pv: 100, amt: 200 },
    { name: "15/2/2025", uv: 600, pv: 600, amt: 200 },
    { name: "16/2/2025", uv: 400, pv: 200, amt: 200 },
    { name: "17/2/2025", uv: 700, pv: 100, amt: 200 },
    { name: "18/2/2025", uv: 600, pv: 600, amt: 200 },
    { name: "19/2/2025", uv: 500, pv: 300, amt: 200 },
    { name: "20/2/2025", uv: 600, pv: 600, amt: 200 },
    { name: "21/2/2025", uv: 700, pv: 500, amt: 200 },
    { name: "22/2/2025", uv: 400, pv: 200, amt: 200 },
    { name: "23/2/2025", uv: 600, pv: 200, amt: 200 },
    { name: "24/2/2025", uv: 500, pv: 100, amt: 200 },
    { name: "25/2/2025", uv: 700, pv: 500, amt: 200 },
    { name: "26/2/2025", uv: 600, pv: 600, amt: 200 },
    { name: "27/2/2025", uv: 400, pv: 100, amt: 200 },
    { name: "28/2/2025", uv: 500, pv: 200, amt: 200 },
  ];

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

  const topServices = [
    {
      rank: 1,
      service: "Classic Ombre",
      bookings: 820,
      revenue: 1029910,
    },
    {
      rank: 2,
      service: "Reverse Ombre",
      bookings: 740,
      revenue: 912340,
    },
    {
      rank: 3,
      service: "Smoothing Keratin Treatment",
      bookings: 685,
      revenue: 845210,
    },
    {
      rank: 4,
      service: "Balayage with Toner",
      bookings: 640,
      revenue: 798300,
    },
    {
      rank: 5,
      service: "Balayage & Root Shadow",
      bookings: 590,
      revenue: 755000,
    },
    {
      rank: 6,
      service: "Full Highlights",
      bookings: 570,
      revenue: 688900,
    },
    {
      rank: 7,
      service: "Partial Highlights",
      bookings: 540,
      revenue: 642100,
    },
    {
      rank: 8,
      service: "Root Touch-Up",
      bookings: 490,
      revenue: 595500,
    },
    {
      rank: 9,
      service: "Gloss Treatment",
      bookings: 460,
      revenue: 552200,
    },
    {
      rank: 10,
      service: "Color Correction",
      bookings: 430,
      revenue: 519000,
    },
  ];


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="flex items-center gap-2 text-sm"
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
          <p>{label}</p>
          <p>-</p>
          <div className="flex items-center">
            <img src={imageProvider.dollerIcon} className="h-3 " />
            <p>{payload[0].value}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white gap-8 divide-x divide-gray-200 rounded-2xl flex flex-col lg:flex-row w-full h-full p-6 inset-shadow-sm">
      <div className="w-full lg:w-9/12 pr-8 chart-1 flex flex-col">
        <div className="px-0 pt-0 pb-4 w-full flex justify-between items-center">
          <div className="flex items-center justify-between gap-4 flex-wrap w-full">
            <div className="flex items-start gap-4">
              <img
                className="p-4 rounded-lg bg-[#EFFAF5]"
                src={imageProvider.RevenueIcon}
                alt=""
              />

              <div>
                <h4 className="font-medium text-black/60">Total Revenue</h4>
                <h3 className="text-lg font-semibold flex items-center">
                  12,123,874
                  <span className="pl-4">
                    <GoArrowUp size={18} color="#05DF72" />
                  </span>
                  <span className="text-green-400 font-medium text-base">
                    +6.5%
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:max-w-sm">
              <Select
                defaultValue="Month"
                className="font-golos font-medium flex-1"
                onChange={handleChange}
                options={month}
              />
              <Select
                className="font-golos font-medium flex-1 md:flex-2"
                defaultValue="Services"
                onChange={handleChange}
                options={services}
              />
            </div>
          </div>
        </div>
        <div className="w-full chart-1 overflow-x-auto">
          <ResponsiveContainer width={2600} height={400}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 50,
                left: 10,
                bottom: 0,
              }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D9C74" stopOpacity={1.2} />
                  <stop offset="95%" stopColor="#9DCCBC" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0.3" vertical={false} />
              <XAxis dataKey="name"
                interval={0}
                textAnchor="end"
                height={60}
                tickMargin={10}
                tickFormatter={(value, index) => (index === 0 ? '' : value)}
              />
              <YAxis ticks={[100, 200, 300, 400, 500, 600, 700, 800, 900]} />
              <Tooltip content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#1E7D5D"
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full lg:w-3/12 ">
        <h3 className="font-semibold pb-4">Most Popular Service</h3>

        <div className=" w-full ">
          <div>
            <div className="flex justify-between">
              <h4 className="text-description">
                <span className="pr-3">#</span> Booking per services
              </h4>
              <h4 className="text-description pr-2">Revenue</h4>
            </div>

            <div className="pt-5 space-y-3 overflow-y-auto pr-2 chart-1 max-h-[420px] divide-y divide-gray-200 ">
              {
                topServices.map((topService, idx) => {
                  return (
                    <div className="flex items-center pb-2 justify-between">
                      <div className="flex  gap-2 flex-1">
                        <h4 className={` ${(topService.rank === (1)) && "bg-primary02 text-white" } ${(topService.rank === (2) || topService.rank === (3)) ? "bg-[#8ebdad] text-white" : "bg-[#f6f6f6]"} w-5 mt-1 text-sm text-description  flex justify-center items-center h-5 rounded-full`}>
                          {topService.rank}
                        </h4>
                        <div>
                          <h4>{topService.service}</h4>
                          <h4 className="text-description text-sm">{topService.bookings}</h4>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium ">₪ {topService.revenue}</h4>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
