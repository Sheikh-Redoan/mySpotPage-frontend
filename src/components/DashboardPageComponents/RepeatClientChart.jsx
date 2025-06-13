import { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function RepeatClientChart() {
  const data = [{ value: 250 }, { value: 150 }, { value: 600 }];
  const COLORS = ["#FEEFC1", "#FCCB30", "#FF8F00"];

  // Responsive outerRadius based on container size
  const chartRef = useRef(null);
  const [outerRadius, setOuterRadius] = useState(100);

  useEffect(() => {
    function handleResize() {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        setOuterRadius(Math.max(60, Math.min(120, width / 4)));
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        fontSize="0.9rem"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      ref={chartRef}
      className="w-full max-w-full h-[60vw] max-h-[440px] min-h-[360px] bg-white rounded-xl p-4 sm:p-6 inset-shadow-sm flex flex-col justify-between"
      style={{ minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center mt-4">
        <div className="space-y-2 flex flex-col">
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
