import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function RepeatClientChart() {
  const data = [{ value: 250 }, { value: 150 }, { value: 600 }];

  const COLORS = ["#FEEFC1", "#FCCB30", "#FF8F00"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      ></text>
    );
  };
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center">
        <div className="space-y-2 flex   flex-col">
          <div className="text-description flex items-center gap-2">
            <span className="size-2 bg-[#FF8F00] rounded-full"></span> New
            Clients
          </div>
          <div className="text-description flex items-center gap-2">
            <span className="size-2 bg-[#FCCB30] rounded-full"></span>
            Returning Clients (2-3 times)
          </div>
          <div className="text-description flex items-center gap-2">
            <span className="size-2 bg-[#FEEFC1] rounded-full"></span> Loyal
            Client (4+ times) 
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepeatClientChart;
