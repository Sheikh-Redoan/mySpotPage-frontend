import { useState } from "react";
import { Pagination, Select, Table } from "antd";
import { imageProvider } from "../../../lib/imageProvider";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";


// Data
const data = [
  {
    key: "1",
    discount: "30%",
    date: "12/04/25 - 14/04/25",
    frequency: "Does not repeat",
  },
  {
    key: "2",
    discount: "20%",
    date: "Since 04/04/25",
    frequency: "Everyday",
  },
  {
    key: "3",
    discount: "95%",
    date: "on Wednesday",
    frequency: "Every week",
  },
  {
    key: "4",
    discount: "27%",
    date: "10/03/25 - 10/03/25",
    frequency: "Does not repeat",
  },
  {
    key: "5",
    discount: "75%",
    date: "01/03/25 - 05/03/25",
    frequency: "Everyday",
  },
  {
    key: "6",
    discount: "65%",
    date: "12/04/23 - 14/04/25",
    frequency: "Every week",
  },
  {
    key: "7",
    discount: "15%",
    date: "12/04/25 - 14/08/25",
    frequency: "Does not repeat",
  },
  {
    key: "8",
    discount: "15%",
    date: "12/07/25 - 14/09/25",
    frequency: "Everyday",
  },
  {
    key: "9",
    discount: "75%",
    date: "11/04/25 - 14/04/25",
    frequency: "Every week",
  },
  {
    key: "10",
    discount: "95%",
    date: "12/04/25 - 18/04/25",
    frequency: "Does not repeat",
  },
];


const TimePageTable = ({ setIsModalOpen, setOpen, setDeleteLocationModalOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);


  // Columns (same, with align properties added)
  const columns = [
    {
      title: "Date & Frequency",
      dataIndex: "date",
      key: "date",
      onCell: () => ({
        style: {
          backgroundColor: 'white',
        },
      }),
      width: 250,
      sorter: (a, b) => {
        const parseStartDate = (dateStr) => {
          const match = dateStr.match(/\d{2}\/\d{2}\/\d{2}/);
          if (!match) return new Date(9999, 0, 1); // push "on Wednesday" etc. to bottom
          const [day, month, year] = match[0].split('/');
          return new Date(`20${year}`, month - 1, day);
        };

        const dateA = parseStartDate(a.date);
        const dateB = parseStartDate(b.date);

        return dateA - dateB;
      },
      sortIcon: ({ sortOrder }) => {
        return (
          <div className="flex flex-col">
            <ChevronUp
              size={16}
              strokeWidth={1.5}
              className={
                sortOrder === "ascend" ? "!text-white" : "text-gray-400"
              }
            />
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className={
                sortOrder === "descend" ? "!text-white" : "text-gray-400"
              }
            />
          </div>
        );
      },
      defaultSortOrder: "descend",
      render: (_, record, index) => {
        const prev = data[index - 1];
        if (prev && prev.date === record.date) return null;
        return (
          <div className="space-y-1">
            <p className="text-[#797979] text-sm">{record.frequency}</p>
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
      render: (_) => (
        <div className="flex flex-wrap gap-4 ">
          <p className="bg-[#F6F6F6] text-[#3E70DD] p-1 rounded-lg">
            08:00 - 09:00
          </p>
          <p className="bg-[#F6F6F6] text-[#3E70DD] p-1 rounded-lg">
            06:00 - 09:00
          </p>
          <p className="bg-[#F6F6F6] text-[#3E70DD] p-1 rounded-lg">
            03:00 - 06:00
          </p>
          <p className="bg-[#F6F6F6] text-[#3E70DD] p-1 rounded-lg">
            08:00 - 11:00
          </p>
          <p className="bg-[#F6F6F6] text-[#3E70DD] p-1 rounded-lg">
            06:00 - 09:00
          </p>
        </div>
      ),
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
          <img
            src={imageProvider.edit}
            alt="icon"
            onClick={() => {
              setIsModalOpen(true)
              setOpen(true)
            }}
            className="cursor-pointer"
          />
          <img
            src={imageProvider.deleteIcon}
            alt="icon"
            onClick={() => setDeleteLocationModalOpen(true)}
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];


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
      <div className="overflow-x-auto my-6 rounded-lg">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 1200 }}
          className="custom-ant-table"
          showSorterTooltip={false}
        />
      </div>
      <div className="flex justify-center md:justify-between items-center mt-4 ">
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

      <style>{`.ant-table-column-title{flex:none !important} .ant-table-filter-column{justify-content:flex-start !important;}`}</style>
    </>
  );
};

export default TimePageTable;
