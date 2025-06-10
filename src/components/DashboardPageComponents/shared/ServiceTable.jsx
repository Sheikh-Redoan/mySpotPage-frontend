import { useState } from "react";
import { Pagination, Select, Table } from "antd";
import { imageProvider } from "../../../lib/imageProvider";

// Columns
const columns = [
  {
    title: "Thumbnail",
    dataIndex: "date",
    key: "date",
    width: 130,

    render: (_, record, index) => {
      const prev = data[index - 1];
      if (prev && prev.date === record.date) return null;
      return (
        <div>
          <img
            src="https://i.ibb.co/MTS9Ys5/Frame-2147226180.png"
            alt="image"
          />
        </div>
      );
    },
  },
  {
    title: "Name / Available For",
    dataIndex: "name",
    key: "time",
    width: 140,
    render: (_) => (
      <div className="space-y-2 w-[150px]">
        <p className="text-[#3D3D3D] font-medium mb-1">Classic Ombre</p>
        <p className="w-[110px] rounded-2xl py-1 px-2   text-primary01 border border-primary01">
          Female Only
        </p>
      </div>
    ),
  },
  {
    title: "Description",
    dataIndex: "dercription",
    key: "dercription",
    width: 490,
    render: (text) => <span style={{ color: "#797979" }}>{text}</span>,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "discount",
    align: "center",
    width: 130,
  },
  {
    title: "No. Options",
    dataIndex: "option",
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
        <img src={imageProvider.edit} alt="icon" />
        <img src={imageProvider.deleteIcon} alt="icon" />
      </div>
    ),
  },
];

// Data
const data = [
  {
    key: "1",
    duration: "3h",
    date: "12/04/25 - 14/04/25",
    option: "09",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
  },
  {
    key: "2",
    duration: "3h 20m",
    date: "12/04/25 - 13/04/25",
    option: "06",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
  },
  {
    key: "3",
    duration: "1h 10m",
    date: "12/04/25 - 18/04/25",
    option: "03",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
  },
  {
    key: "4",
    duration: "5h",
    date: "12/04/25 - 14/06/25",
    option: "05",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
  },
  {
    key: "5",
    duration: "8h 55m",
    date: "11/04/25 - 14/04/25",
    option: "08",
    dercription:
      "Smoothing Keratin Treatment infuses keratin to reduce frizz, enhance shine, and strengthen hair for a smoother, more manageable look.",
  },
  {
    key: "6",
    duration: "7h 23m",
    date: "12/04/23 - 14/04/25",
    option: "00",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
  },
  {
    key: "7",
    duration: "3h 44m",
    date: "12/04/25 - 14/08/25",
    option: "02",
    dercription:
      "Smoothing Keratin Treatment infuses keratin to reduce frizz, enhance shine, and strengthen hair for a smoother, more manageable look.",
  },
  {
    key: "8",
    duration: "2h",
    date: "12/07/25 - 14/09/25",
    option: "11",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
  },
  {
    key: "9",
    duration: "9h 11m",
    date: "11/04/25 - 14/04/25",
    option: "00",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
  },
  {
    key: "10",
    duration: "3h",
    date: "12/04/25 - 18/04/25",
    option: "19",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
  },
];

const ServiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const totalItems = data.length;
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div className="overflow-x-auto my-6 rounded-lg border border-border">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 800 }}
          className="custom-ant-table"
        />
      </div>
      <div className="flex justify-center md:justify-between items-center mt-4">
        <div className="space-x-1 hidden md:block">
          <span className="text-sm text-gray-600">Show </span>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mx-3"
            popupMatchSelectWidth={false}
            style={{ width: 60 }}
          >
            <Select.Option value={5}>5</Select.Option>
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={50}>50</Select.Option>
          </Select>
          <span className="text-sm pl-2 text-gray-600">
            / {totalItems} results per page
          </span>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          hideOnSinglePage={false}
        />
      </div>
    </>
  );
};

export default ServiceTable;
