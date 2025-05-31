import { Table as AntdTable, Tag } from "antd";
import { ChevronDown, ChevronUp, ListFilter } from "lucide-react";
import { Mastercard, Visa } from "react-payment-logos/dist/flat";
import { cn } from "../../lib/utils";

const data = [
  {
    time: "08:30",
    date: "01/05/25",
    plan: "Radiance Plan",
    duration: "01/05/25 - 01/06/25",
    method: "VISA",
    maskedCard: "************1627",
    amount: "₪279.00",
    status: "Active",
    action: "Download invoice",
  },
  {
    time: "12:10",
    date: "01/04/25",
    plan: "Bloom Plan",
    duration: "01/04/25 - 01/05/25",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: "₪149.00",
    status: "Expired",
    action: "Download invoice",
  },
  {
    time: "10:12",
    date: "01/03/25",
    plan: "Glow Plan",
    duration: "01/03/25 - 01/04/25",
    method: "VISA",
    maskedCard: "************1627",
    amount: "₪79.00",
    status: "Refunded",
    action: "Download invoice",
  },
  {
    time: "10:12",
    date: "01/02/25",
    plan: "Glow Plan",
    duration: "01/02/25 - 01/03/25",
    method: "VISA",
    maskedCard: "************1627",
    amount: "₪79.00",
    status: "Cancelled",
    action: "Refund",
  },
  {
    time: "08:19",
    date: "01/01/25",
    plan: "Spark Plan",
    duration: "01/01/25 - 01/02/25",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: "FREE",
    status: "--",
    action: "--",
  },
];

const iconMap = {
  visa: <Visa width={30} height={30} />,
  mastercard: <Mastercard width={30} height={30} />,
};

export default function Table() {
  function sortIcons({ sortOrder }) {
    console.log(sortOrder);
    return (
      <span className="flex flex-col items-center text-gray-400">
        <ChevronUp
          size={14}
          className={cn(
            sortOrder === "ascend" ? "text-blue-500" : "text-gray-400",
            "text-[10px]"
          )}
        />
        <ChevronDown
          size={14}
          className={cn(
            sortOrder === "descend" ? "text-blue-500" : "text-gray-400",
            "text-[10px] -mt-1"
          )}
        />
      </span>
    );
  }

  const columns = [
    {
      title: "Billing Time",
      dataIndex: "time",
      sorter: (a, b) => a.time.localeCompare(b.time),
      sortIcon: sortIcons,
      render: (_, row) => (
        <div>
          <div>{row.time}</div>
          <div className="text-xs text-gray-500">{row.date}</div>
        </div>
      ),
    },
    {
      title: "Plan Name / Duration",
      dataIndex: "plan",
      filters: [
        { text: "Radiance", value: "Radiance" },
        { text: "Bloom", value: "Bloom" },
        { text: "Glow", value: "Glow" },
        { text: "Spark", value: "Spark" },
      ],
      onFilter: (value, record) => record.plan.includes(value),
      filterIcon: (filtered) => (
        <ListFilter
          size={20}
          strokeWidth={1}
          className={`text-gray-400 ${filtered ? "text-blue-500" : ""}`}
        />
      ),
      render: (_, row) => (
        <div>
          <div className="font-semibold">{row.plan}</div>
          <div className="text-xs text-gray-500">{row.duration}</div>
        </div>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold">
            {iconMap[row.method.toLowerCase()]}
          </span>
          <span className="text-sm">{row.maskedCard}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => {
        const getNum = (val) => parseFloat(val.replace(/[^\d.]/g, "")) || 0;
        return getNum(a.amount) - getNum(b.amount);
      },
      sortIcon: sortIcons,
    },

    {
      title: "Plan Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Expired", value: "Expired" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Refunded", value: "Refunded" },
      ],
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <ListFilter
          size={20}
          strokeWidth={1}
          className={`text-gray-400 ${filtered ? "text-blue-500" : ""}`}
        />
      ),
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text) => (
        <span className="text-blue-600 cursor-pointer hover:underline">
          {text}
        </span>
      ),
    },
  ];

  const statusColors = {
    Active: "green",
    Expired: "gray",
    Refunded: "blue",
    Cancelled: "red",
  };

  const SorterIcon = ({ isSorted }) => {
    return (
      <span className="ml-1 flex flex-col items-center text-gray-400">
        <ChevronUp
          className={`${
            isSorted === "asc" ? "text-blue-500" : "text-gray-400"
          }`}
          style={{ fontSize: 10 }}
        />

        <ChevronDown
          size={20}
          strokeWidth={1}
          className={`${
            isSorted === "desc" ? "text-blue-500" : "text-gray-400"
          }`}
          style={{ fontSize: 10, marginTop: -4 }}
        />
      </span>
    );
  };

  return (
    <div className="p-4">
      <AntdTable
        className="bg-white rounded shadow text-white"
        columns={columns}
        dataSource={data}
        rowKey={(row) => `${row.date}-${row.time}`}
        pagination={false}
      />
    </div>
  );
}
