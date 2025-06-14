import { Progress, Select } from "antd";
import { GoArrowUp } from "react-icons/go";
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

function ClientChart() {
  const data = [
    { name: "", pv: 0 },
    { name: "1/2/2025", pv: 12 },
    { name: "2/2/2025", pv: 4 },
    { name: "3/2/2025", pv: 20 },
    { name: "4/2/2025", pv: 17 },
    { name: "5/2/2025", pv: 9 },
    { name: "6/2/2025", pv: 22 },
    { name: "7/2/2025", pv: 3 },
    { name: "8/2/2025", pv: 14 },
    { name: "9/2/2025", pv: 8 },
    { name: "10/2/2025", pv: 21 },
    { name: "11/2/2025", pv: 7 },
    { name: "12/2/2025", pv: 18 },
    { name: "13/2/2025", pv: 2 },
    { name: "14/2/2025", pv: 24 },
    { name: "15/2/2025", pv: 10 },
    { name: "16/2/2025", pv: 1 },
    { name: "17/2/2025", pv: 16 },
    { name: "18/2/2025", pv: 5 },
    { name: "19/2/2025", pv: 19 },
    { name: "20/2/2025", pv: 13 },
    { name: "21/2/2025", pv: 6 },
    { name: "22/2/2025", pv: 11 },
    { name: "23/2/2025", pv: 15 },
    { name: "24/2/2025", pv: 23 },
    { name: "25/2/2025", pv: 20 },
    { name: "26/2/2025", pv: 9 },
    { name: "27/2/2025", pv: 25 },
    { name: "28/2/2025", pv: 3 },
  ];

  const totalClients = data.reduce((sum, item) => sum + item.pv, 0);


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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="flex items-center gap-1 text-sm"
          style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 10 }}>
          <p>{label}</p>
          <p>-</p>
          <div className="flex gap-1 items-center">
            <p>Total Clients: {" "}</p>
            <p>{payload[0].value}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const clientCities = [
    { city: "Karmiel", percent: 30 },
    { city: "Tiberias (Teverya)", percent: 20 },
    { city: "Migdal HaEmek", percent: 15 },
    { city: "Sakhnin", percent: 25 },
    { city: "Shefa-'Amr", percent: 5 },
    { city: "Tamra", percent: 5 },
  ];


  return (
    <div className="bg-white gap-8 divide-x divide-gray-200 rounded-2xl flex max-lg:flex-col w-full h-full p-6 inset-shadow-sm ">
      <div className="w-full lg:w-9/12 pr-8 chart-1 flex flex-col  ">
        <div className="px-0 pt-0 pb-4 w-full flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-start gap-4">
            <img
              className="p-4 rounded-lg bg-[#F5F4FE]"
              src={imageProvider.Client}
              alt=""
            />

            <div>
              <h4 className="font-medium text-black/60">Total Clients</h4>
              <h3 className="text-lg font-semibold flex items-center">
                {totalClients}{" "}
                <span className="pl-4">
                  <GoArrowUp size={18} color="#05DF72" />
                </span>{" "}
                <span className="text-green-400 font-medium text-base">
                  +0.5%
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 md:max-w-30 w-full">
            <Select
              defaultValue="Month"
              className="font-golos font-medium flex-1"
              style={{ width: 150 }}
              onChange={handleChange}
              options={month}
            />
          </div>
        </div>
        <div className="w-full chart-1 overflow-x-auto">
          <ResponsiveContainer width={2500} height={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 0,
              }}
              barSize={30}>
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                interval={0}
                tickLine={false}
                tick={{
                  angle: 0,
                  textAnchor: 'middle',
                }}

              />
              <YAxis domain={[0, 25]} ticks={[5, 10, 15, 20, 25]} />
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend /> */}
              <CartesianGrid strokeDasharray="0.3" vertical={false} />
              <Bar dataKey="pv" fill="#866BE7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full lg:w-3/12 ">
        <h3 className="font-semibold pb-4">Client By Cities</h3>
        <div className=" w-full space-y-2">
          {clientCities.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center justify-between">
                <h4 className="text-description">{item.city}</h4>
                <h4 className="font-medium">{item.percent}%</h4>
              </div>
              <Progress percent={item.percent} strokeColor={"#866BE7"} showInfo={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientChart;
