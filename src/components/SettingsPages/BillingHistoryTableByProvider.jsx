import { Table } from "antd";
import { Mastercard, Visa } from "react-payment-logos/dist/flat";

const iconMap = {
  visa: <Visa width={30} height={30} />,
  mastercard: <Mastercard width={30} height={30} />,
};

const data = [
  {
    key: "1",
    time: "05:32",
    plan: "Bloom Plan",
    method: "VISA",
    maskedCard: "************1627",
    amount: 120,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "2",
    time: "08:32",
    plan: "Bloom Plan",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: 170,
    status: "Expired",
    action: "Download Invoice",
  },
  {
    key: "3",
    time: "08:35",
    plan: "Bloom Plan",
    method: "VISA",
    maskedCard: "************1627",
    amount: 190,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "4",
    time: "10:32",
    plan: "Bloom Plan",
    method: "VISA",
    maskedCard: "************1627",
    amount: 110,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "5",
    time: "09:32",
    plan: "Bloom Plan",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: 180,
    status: "Active",
    action: "Download Invoice",
  },
  {
    key: "6",
    time: "03:32",
    plan: "Bloom Plan",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: 140,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "7",
    time: "02:32",
    plan: "Bloom Plan",
    method: "MasterCard",
    maskedCard: "************1627",
    amount: 120,
    status: "Canceled",
    action: "Download Invoice",
  },
  {
    key: "8",
    time: "06:32",
    plan: "Bloom Plan",
    method: "VISA",
    maskedCard: "************1627",
    amount: 150,
    status: "Active",
    action: "Download Invoice",
  },
];

const BillingHistoryTableByProvider = () => {
  const columns = [
    {
      title: "Billing Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => {
        const toMinutes = (t) => {
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };
        return toMinutes(a.time) - toMinutes(b.time);
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Plan Name / Duration",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      key: "method",
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
      key: "amount",
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
      render: (text) => <span className="">₪{text}</span>,
    },
    {
      title: "Plan Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: <span className="font-semibold text-white">Action</span>,
      dataIndex: "action",
      key: "action",
      render: (text) => (
      <span className="text-blue-600 cursor-pointer hover:underline">
        {text}
      </span>
    ),
    },
  ];

  return (
    <div className="overflow-x-auto my-4 rounded shadow-md">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }}
        className="custom-ant-table"
      />
    </div>
  );
};

export default BillingHistoryTableByProvider;
