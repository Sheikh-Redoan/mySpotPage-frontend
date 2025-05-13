import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GoArrowUp } from "react-icons/go";
import { Progress, Select } from "antd";
import { imageProvider } from "../../lib/imageProvider";

function ClientChart() {
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

  return (
    <div className="bg-white space-x-8 divide-x divide-gray-200 rounded-2xl flex w-full h-full p-6 inset-shadow-sm ">
      <div className="w-9/12 pr-8 chart-1 flex flex-col  ">
        <div className="px-0 pt-0 pb-4 w-full flex justify-between items-center">
          <div className="flex items-start gap-4">
            <img
              className="p-4 rounded-lg bg-[#F5F4FE]"
              src={imageProvider.Client}
              alt=""
            />

            <div>
              <h4 className="font-medium text-black/60">Total Clients</h4>
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

          <div className="flex items-center gap-4">
            <Select
              defaultValue="Month"
              className="font-golos font-medium"
              style={{ width: 150 }}
              onChange={handleChange}
              options={month}
            />
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
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <CartesianGrid  strokeAarray="2 2" />
              <Bar dataKey="pv" fill="#866BE7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-3/12 ">
        <h3 className="font-semibold pb-4">Client By Cities</h3>
        <div className=" w-full space-y-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Karmiel</h4>
              <h4 className="font-medium">30%</h4>
            </div>
            <Progress percent={30} strokeColor={"#866BE7"} showInfo={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Tiberias (Teverya)</h4>
              <h4 className="font-medium">20%</h4>
            </div>
            <Progress percent={20} strokeColor={"#866BE7"} showInfo={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Migdal HaEmek</h4>
              <h4 className="font-medium">15%</h4>
            </div>
            <Progress percent={15} strokeColor={"#866BE7"} showInfo={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Sakhnin</h4>
              <h4 className="font-medium">25%</h4>
            </div>
            <Progress percent={25} strokeColor={"#866BE7"} showInfo={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Shefa-'Amr</h4>
              <h4 className="font-medium">5%</h4>
            </div>
            <Progress percent={5} strokeColor={"#866BE7"} showInfo={false} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h4 className="text-description">Tamra</h4>
              <h4 className="font-medium">20%</h4>
            </div>
            <Progress percent={20} strokeColor={"#866BE7"} showInfo={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientChart;
