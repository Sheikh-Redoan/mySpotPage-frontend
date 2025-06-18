import { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function RepeatClientChart() {
  const data = [
    { label: "New Clients", value: 600 },
    { label: "Returning Clients (2-3 times)", value: 280 },
    { label: "Loyal Clients (4+ times)", value: 120 },
  ];

  const COLORS = ["#FF8F00", "#FCCB30", "#FEEFC1"];

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
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      ref={chartRef}
      className="w-full max-w-full h-[60vw] max-h-[480px] min-h-[420px] bg-white rounded-xl flex flex-col justify-between"
      style={{ minWidth: 0 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            labelLine={false}
            label={renderCustomizedLabel}
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

      {/* Dynamic Legend */}
      <div className="flex mt-4">
        <div className="space-y-2 flex flex-col w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="text-description flex items-center justify-between gap-2 border-b border-border mb-5 pb-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span>{item.label}</span>
              </div>
              <span className="font-medium text-sm text-black">
                {((item.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default RepeatClientChart;
