import React from 'react'
import { imageProvider } from '../../lib/imageProvider'

import { ArrowUp, ChevronDown } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import { GoArrowUp } from 'react-icons/go';
function RevenueChart() {


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
    <div className="bg-white space-x-8 divide-x divide-gray-200 rounded-2xl flex w-full h-full p-6 inset-shadow-sm ">
          <div className="w-9/12 pr-8 chart-1 flex flex-col  ">
            <div className="px-0 pt-0 pb-4 w-full flex justify-between items-center">
              <div className="flex items-start gap-4">
                <img
                  className="p-4 rounded-lg bg-[#EFFAF5]"
                  src={imageProvider.RevenueIcon}
                  alt=""
                />

                <div>
                  <h4 className="font-medium text-black/60">Total Revenue</h4>
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
                <Select
                  className="font-golos font-medium"
                  defaultValue="Services"
                  style={{ width: 250 }}
                  onChange={handleChange}
                  options={services}
                />
              </div>
            </div>
            <div className="w-full chart-1 overflow-x-auto">
              <ResponsiveContainer width={1900} height={400}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 50,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D9C74" stopOpacity={1.2} />
                      <stop
                        offset="95%"
                        stopColor="#9DCCBC"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
          <div className="w-3/12 ">
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
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        1
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        2
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        3
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        2
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        3
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        3
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        2
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        3
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                  <div className="flex items-center pb-2 justify-between">
                    <div className="flex  gap-2">
                      <h4 className="bg-primary02 w-5 mt-1 text-sm text-white flex justify-center items-center h-5 rounded-full">
                        3
                      </h4>
                      <div>
                        <h4>Classic Ombre</h4>
                        <h4 className="text-description text-sm">
                          820 bookings
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">₪ 1,029,910</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default RevenueChart