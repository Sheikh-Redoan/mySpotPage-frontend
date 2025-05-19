import { Table } from "antd";
import { PlusIcon } from "../assets/icons/icons";
import { useState } from "react";
import { imageProvider } from "./../lib/imageProvider";

// Columns (same, with align properties added)
const columns = [
  {
    title: "Date & Frequency",
    dataIndex: "date",
    key: "date",
    width: 200,
    sorter: (a, b) => {
      const toMinutes = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      };
      return toMinutes(a.time) - toMinutes(b.time);
    },
    defaultSortOrder: "descend",
    render: (_, record, index) => {
      const prev = data[index - 1];
      if (prev && prev.date === record.date) return null;
      return (
        <div className="space-y-1">
          <p className="text-[#797979] text-sm">Does not repeat</p>
          <p className="text-[#262626]">{record.date}</p>
        </div>
      );
    },
  },
  {
    title: "Time Range",
    dataIndex: "time",
    key: "time",
    width: 790,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    align: "center",
    width: 130,
  },
  {
    title: <span className="font-semibold text-white pr-5">Action</span>,
    dataIndex: "action",
    key: "action",
    align: "right",
    width: 120,
    render: (_) => (
      <div className="flex gap-4 justify-end pr-4">
        <img src={imageProvider.deleteIcon} alt="icon" />
        <img src={imageProvider.edit} alt="icon" />
      </div>
    ),
  },
];

// Data
const data = [
  {
    key: "1",
    time: "05:32",
    discount: "30%",
    date: "12/04/25 - 14/04/25",
  },
  {
    key: "2",
    time: "06:45",
    discount: "20%",
    date: "12/04/25 - 13/04/25",
  },
  {
    key: "3",
    time: "07:30",
    discount: "95%",
    date: "12/04/25 - 18/04/25",
  },
  {
    key: "4",
    time: "07:30",
    discount: "27%",
    date: "12/04/25 - 14/06/25",
  },
  {
    key: "5",
    time: "07:30",
    discount: "75%",
    date: "11/04/25 - 14/04/25",
  },
  {
    key: "6",
    time: "07:30",
    discount: "65%",
    date: "12/04/23 - 14/04/25",
  },
  {
    key: "7",
    time: "07:30",
    discount: "15%",
    date: "12/04/25 - 14/08/25",
  },
];

function TimePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full p-5">
      <div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2.5 gap-2 text-white bg-[#744CDB] border border-[#744CDB] rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
        >
          <PlusIcon />
          Set time-based
        </button> 
        <div className="overflow-x-auto my-6 rounded shadow-lg">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
            className="custom-ant-table"
          />
        </div>
      </div>
    </div>
  );
}

export default TimePage;
