import React, { useState } from "react";
import { Table, Select, Pagination, Tooltip } from "antd";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoArrowDownOutline, IoCloseCircleOutline } from "react-icons/io5";
import CustomEmptyTable from "../DashboardPageComponents/shared/CustomEmptyTable";
import { FilterFilled } from "../../assets/icons/icons";

// Mock service for pending bookings data
const getPendingBookings = () => {
  return [
    {
      id: "1",
      scheduledDate: "09/01/2025",
      scheduledTime: "13:00",
      clientName: "Emily",
      clientPhone: "(+1) 234 567 890",
      services: [
        "Classic Ombre",
        "Smooth/Scalp treatment",
        "Cut + Treatment",
        "Moisture treatment",
      ],
      staffName: "Pixe Nomad",
      totalDuration: "1h 45m",
      totalPrice: "264.60",
      status: "Pending",
      avatar: "E",
    },
    {
      id: "2",
      scheduledDate: "12/01/2025",
      scheduledTime: "14:00",
      clientName: "Alexander",
      clientPhone: "(+1) 234 567 890",
      services: [
        "Haircut",
        "Smooth/Scalp treatment",
        "Cut + Treatment",
        "Moisture treatment",
      ],
      staffName: "Code Voyager",
      totalDuration: "2h 30m",
      totalPrice: "264.60",
      status: "Pending",
      avatar: "A",
    },
    {
      id: "3",
      scheduledDate: "14/01/2025",
      scheduledTime: "14:00",
      clientName: "Scarlett",
      clientPhone: "(+1) 234 567 890",
      services: [
        "Haircut",
        "Smooth/Scalp treatment",
        "Cut + Treatment",
        "Moisture treatment",
      ],
      staffName: "Pixe Nomad",
      totalDuration: "30m",
      totalPrice: "264.60",
      status: "Pending",
      avatar: "S",
    },
    {
      id: "4",
      scheduledDate: "18/01/2025",
      scheduledTime: "14:00",
      clientName: "Joseph",
      clientPhone: "(+1) 234 567 890",
      services: [
        "Haircut",
        "Smooth/Scalp treatment",
        "Cut + Treatment",
        "Moisture treatment",
      ],
      staffName: "John Doe",
      totalDuration: "1h",
      totalPrice: "264.60",
      status: "Pending",
      avatar: "J",
    },
    {
      id: "5",
      scheduledDate: "20/01/2025",
      scheduledTime: "14:00",
      clientName: "Thomas",
      clientPhone: "(+1) 234 567 890",
      services: [
        "Haircut",
        "Smooth/Scalp treatment",
        "Cut + Treatment",
        "Moisture treatment",
      ],
      staffName: "Echo Sage",
      totalDuration: "1h 45m",
      totalPrice: "264.60",
      status: "Pending",
      avatar: "T",
    },
  ];
};

const searchPendingBookings = (query) => {
  const allBookings = getPendingBookings();
  if (!query) {
    return allBookings;
  }
  const lowerCaseQuery = query.toLowerCase();
  return allBookings.filter(
    (booking) =>
      booking.clientName.toLowerCase().includes(lowerCaseQuery) ||
      booking.clientPhone.toLowerCase().includes(lowerCaseQuery) ||
      booking.staffName.toLowerCase().includes(lowerCaseQuery)
  );
};

const { Option } = Select;

const PendingBookings = () => {
  const [bookings, setBookings] = useState(getPendingBookings());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalBookings, setTotalBookings] = useState(
    getPendingBookings().length
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filteredResults = searchPendingBookings(value);
    setBookings(filteredResults);
    setTotalBookings(filteredResults.length);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleApproveBooking = (id) => {
    // Logic to approve booking
    console.log(`Booking ${id} approved`);
    // In a real application, you would update the backend and then refetch data
    // For this mock, we'll just filter it out or change its status
    setBookings(bookings.filter((booking) => booking.id !== id));
    setTotalBookings(totalBookings - 1);
  };

  const handleRejectBooking = (id) => {
    // Logic to reject booking
    console.log(`Booking ${id} rejected`);
    // In a real application, you would update the backend and then refetch data
    // For this mock, we'll just filter it out or change its status
    setBookings(bookings.filter((booking) => booking.id !== id));
    setTotalBookings(totalBookings - 1);
  };

  const columns = [
    {
      title: "Scheduled Time",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      sorter: (a, b) => {
        const dateA = new Date(`${a.scheduledDate} ${a.scheduledTime}`);
        const dateB = new Date(`${b.scheduledDate} ${b.scheduledTime}`);
        return dateA - dateB;
      },
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="text-[#262626] text-sm font-medium">
            {record.scheduledDate}
          </span>
          <span className="text-[#888] text-xs">{text}</span>
        </div>
      ),
    },
    {
      title: "Client Information",
      dataIndex: "clientName",
      key: "clientInfo",
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="text-[#262626] text-sm font-medium">{text}</span>
          <span className="text-[#888] text-xs">{record.clientPhone}</span>
        </div>
      ),
    },
    {
      title: "Service",
      dataIndex: "services",
      key: "service",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      // render: (services) => (
      //   <div className="flex flex-col">
      //     <span className="text-[#262626] text-sm font-medium">
      //       {services[0]}
      //     </span>
      //     {services.slice(1).map((service, index) => (
      //       <span key={index} className="text-[#888] text-xs">
      //         {service}
      //       </span>
      //     ))}
      //   </div>
      // ),
      filterIcon: (filtered) => (
        <FilterFilled
          className="fill-[#797979]"
        />
      ),
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Total Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
      sorter: (a, b) => {
        // Simple duration sorting, can be improved for more complex formats
        const parseDuration = (duration) => {
          const parts = duration.match(/(\d+h)?\s*(\d+m)?/);
          let hours = parseInt(parts[1] || "0h") || 0;
          let minutes = parseInt(parts[2] || "0m") || 0;
          return hours * 60 + minutes;
        };
        return parseDuration(a.totalDuration) - parseDuration(b.totalDuration);
      },
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice),
      render: (text) => <span className="text-[#262626] text-sm">₦{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-[#FFC107]"></span>{" "}
          {/* Orange dot for Pending */}
          <span className="text-[#262626] text-sm">{text}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip placement="top" color="#52c41a" title="Approve">
            <button
              type="button"
              onClick={() => handleApproveBooking(record.id)}
              className="cursor-pointer text-[#52c41a] hover:text-[#73d13d]"
            >
              <MdCheckCircleOutline className="size-5" />
            </button>
          </Tooltip>

          <Tooltip placement="top" color="#f5222d" title="Reject">
            <button
              type="button"
              onClick={() => handleRejectBooking(record.id)}
              className="cursor-pointer text-[#f5222d] hover:text-[#ff4d4f]"
            >
              <IoCloseCircleOutline className="size-5" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBookings = bookings.slice(startIndex, endIndex);

  return (
    <div className="w-full py-2">
      <Table
        dataSource={paginatedBookings}
        columns={columns}
        pagination={false}
        rowKey="id"
        className="w-full"
        locale={{ emptyText: <CustomEmptyTable /> }}
        rowClassName={(record) =>
          searchQuery &&
          (record.clientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            record.clientPhone
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            record.staffName.toLowerCase().includes(searchQuery.toLowerCase()))
            ? "bg-highlight01"
            : ""
        }
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-gray-600">Show </span>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mx-2"
            popupMatchSelectWidth={false}
            suffixIcon={<IoArrowDownOutline />}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
          <span className="text-sm text-gray-600">
            {" "}
            / {totalBookings} results per page
          </span>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalBookings}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          hideOnSinglePage={false}
        />
      </div>
    </div>
  );
};

export default PendingBookings;
