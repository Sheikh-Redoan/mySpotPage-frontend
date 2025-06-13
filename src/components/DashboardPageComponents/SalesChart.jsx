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
    { value: "web_design", label: "Web Design" },
    { value: "web_development", label: "Web Development" },
    { value: "seo", label: "SEO Optimization" },
    { value: "content_writing", label: "Content Writing" },
    { value: "branding", label: "Branding" },
    { value: "ui_ux", label: "UI/UX Design" },
    { value: "digital_marketing", label: "Digital Marketing" },
    { value: "app_development", label: "App Development" },
    { value: "maintenance", label: "Website Maintenance" },
    { value: "ecommerce", label: "E-commerce Solutions" },
    { value: "consulting", label: "Tech Consulting" },
    { value: "cloud_services", label: "Cloud Services" },
  ];

  return (
    <div className="bg-white gap-8 divide-x divide-gray-200 rounded-xl flex w-full h-full p-6 inset-shadow-sm max-lg:flex-col">
      <div className="w-full lg:w-9/12 pr-8 chart-1 flex flex-col  ">
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
                  12,123,874{" "}
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
          <ResponsiveContainer width={1900} height={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}>
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <CartesianGrid strokeDasharray="3 3" />
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
