import { useState } from "react";
import { Pagination, Select, Table } from "antd";
import { imageProvider } from "../../../lib/imageProvider";
import service1 from '../../../assets/images/service1.png'
import service2 from '../../../assets/images/service2.png'
import service3 from '../../../assets/images/service3.png'
import service4 from '../../../assets/images/service4.png'
import service5 from '../../../assets/images/service5.png'
import { Link } from "react-router";
import DeleteServiceModal from "../../modal/DeleteServiceModal";



// Data
const data = [
  {
    key: "1",
    duration: "3h",
    date: "12/04/25 - 14/04/25",
    option: "09",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
    title: "Classic Ombre",
    category: "Female Only",
    image: service1
  },
  {
    key: "2",
    duration: "3h 20m",
    date: "12/04/25 - 13/04/25",
    option: "06",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
    title: "Reverse Ombre",
    category: "Female Only",
    image: service2
  },
  {
    key: "3",
    duration: "1h 10m",
    date: "12/04/25 - 18/04/25",
    option: "03",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
    title: "Smoothing Keratin Treatment",
    category: "Female Only",
    image: service3
  },
  {
    key: "4",
    duration: "5h",
    date: "12/04/25 - 14/06/25",
    option: "05",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
    title: "Balayage with Toner",
    category: "Female Only",
    image: service4
  },
  {
    key: "5",
    duration: "8h 55m",
    date: "11/04/25 - 14/04/25",
    option: "08",
    dercription:
      "Smoothing Keratin Treatment infuses keratin to reduce frizz, enhance shine, and strengthen hair for a smoother, more manageable look.",
    title: "Balayage & Root Shadow",
    category: "Female Only",
    image: service5
  },
  {
    key: "6",
    duration: "7h 23m",
    date: "12/04/23 - 14/04/25",
    option: "00",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
    title: "Classic Ombre",
    category: "Female Only",
    image: service1
  },
  {
    key: "7",
    duration: "3h 44m",
    date: "12/04/25 - 14/08/25",
    option: "02",
    dercription:
      "Smoothing Keratin Treatment infuses keratin to reduce frizz, enhance shine, and strengthen hair for a smoother, more manageable look.",
    title: "Reverse Ombre",
    category: "Female Only",
    image: service2
  },
  {
    key: "10",
    duration: "3h",
    date: "12/04/25 - 18/04/25",
    option: "19",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
    title: "Balayage & Root Shadow",
    category: "Female Only",
    image: service5
  },
  {
    key: "8",
    duration: "2h",
    date: "12/07/25 - 14/09/25",
    option: "11",
    dercription:
      "Reverse Ombre is a hair coloring style that transitions from lighter roots to darker ends, creating a bold, modern contrast.",
    title: "Smoothing Keratin Treatment",
    category: "Female Only",
    image: service3
  },
  {
    key: "9",
    duration: "9h 11m",
    date: "11/04/25 - 14/04/25",
    option: "00",
    dercription:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter.",
    title: "Balayage with Toner",
    category: "Female Only",
    image: service4
  },

];


const ServiceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [deleteServiceModalOpen, setDeleteServiceModalOpen] = useState(false);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const totalItems = data.length;
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Columns
const columns = [
  {
    title: "Thumbnail",
    dataIndex: "image",
    key: "image",
    width: 130,
    render: (_, record, index) => {
      const prev = data[index - 1];
      if (prev && prev.date === record.date) return null;
      return (
        <div className="w-20 p-0">
          <img
            className="w-full"
            src={record.image}
            alt="image"
          />
        </div>
      );
    },
  },
  {
    title: "Name / Available For",
    dataIndex: "title",
    key: "title",
    width: 390,
    render: (_, record) => (
      <div className="space-y-2 w-[150px]">
        <p className="text-[#3D3D3D] font-medium mb-1 whitespace-nowrap">{record.title}</p>
        <p className="w-[110px] rounded-2xl py-1 px-2   text-primary01 border border-primary01">
          {record.category}
        </p>
      </div>
    ),
  },
  {
    title: "Description",
    dataIndex: "dercription",
    key: "dercription",
    width: 790,
    render: (text) => <span style={{ color: "#797979" }} className="w-48">{text}</span>,
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
    width: 150,
  },
  {
    title: <span className="font-semibold text-white pr-5">Action</span>,
    dataIndex: "action",
    key: "action",
    align: "right",
    width: 120,
    render: (_, record) => (
      <div className="flex gap-4 justify-end pr-4">
        <Link to={`/dashboard/service-menu/create?serviceId=${record.key}`} state={{beforeAfter: "Only Outcome"}}>
          <img src={imageProvider.edit} alt="icon" />
        </Link>
        <img onClick={() => setDeleteServiceModalOpen(true)} src={imageProvider.deleteIcon} alt="icon" />
      </div>
    ),
  },
];

  return (
    <>
      <div className="overflow-x-auto my-6 rounded-lg border border-border pb-2">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 1120 }}
          className="custom-ant-table"
          setDeleteServiceModalOpen={setDeleteServiceModalOpen}
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

      {deleteServiceModalOpen && (
        <DeleteServiceModal
          isOpen={deleteServiceModalOpen}
          onClose={() => setDeleteServiceModalOpen(false)}
          setDeleteServiceModalOpen={setDeleteServiceModalOpen}
          onDeleteConfirm={() => setDeleteServiceModalOpen(false)}
        />
      )}
    </>
  );
};

export default ServiceTable;
