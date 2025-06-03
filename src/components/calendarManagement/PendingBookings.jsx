import React, { useState } from "react";
import {
  Table,
  Select,
  Pagination,
  Tooltip,
  Input,
  Checkbox,
  Button,
  Space,
} from "antd";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoArrowDownOutline, IoCloseCircleOutline } from "react-icons/io5";
import CustomEmptyTable from "../DashboardPageComponents/shared/CustomEmptyTable";
import { FilterFilled, SearchOutlined } from "../../assets/icons/icons";
import { getPendingBookings } from "../../dummy-data/bookingsData";
import { useNavigate } from "react-router";

const { Option } = Select;

const PendingBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(getPendingBookings());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalBookings, setTotalBookings] = useState(getPendingBookings().length);

  // State for service filter dropdown
  const [selectedServiceFilters, setSelectedServiceFilters] = useState([]);
  const [
    serviceFilterDropdownSearchQuery,
    setServiceFilterDropdownSearchQuery,
  ] = useState("");
  const [serviceFilterOpen, setServiceFilterOpen] = useState(false);

  const applyFilters = (currentSearchQuery, currentServiceFilters) => {
    let results = getPendingBookings();

    // Apply main search query
    if (currentSearchQuery) {
      results = results.filter(
        (booking) =>
          booking.clientName
            .toLowerCase()
            .includes(currentSearchQuery.toLowerCase()) ||
          booking.clientPhone
            .toLowerCase()
            .includes(currentSearchQuery.toLowerCase()) ||
          booking.staffName
            .toLowerCase()
            .includes(currentSearchQuery.toLowerCase())
      );
    }

    // Apply service filters
    if (currentServiceFilters.length > 0) {
      results = results.filter((booking) =>
        currentServiceFilters.some((filterService) =>
          booking.serviceDetails.some((detail) => detail.name === filterService)
        )
      );
    }

    setBookings(results);
    setTotalBookings(results.length);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    applyFilters(value, selectedServiceFilters);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleApproveBooking = (id) => {
    console.log(`Booking ${id} approved`);
    setBookings(bookings.filter((booking) => booking.id !== id));
    setTotalBookings(totalBookings - 1);
  };

  const handleRejectBooking = (id) => {
    console.log(`Booking ${id} rejected`);
    setBookings(bookings.filter((booking) => booking.id !== id));
    setTotalBookings(totalBookings - 1);
  };

  // Extract unique services for filter dropdown
  const allUniqueServices = [
    ...new Set(bookings.flatMap((booking) => booking.serviceDetails.map((detail) => detail.name))),
  ];

  // Filtered services for the dropdown search
  const filteredDropdownServices = allUniqueServices.filter((service) =>
    service
      .toLowerCase()
      .includes(serviceFilterDropdownSearchQuery.toLowerCase())
  );

  const handleServiceFilterChange = (service) => {
    setSelectedServiceFilters((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleApplyServiceFilter = (confirm) => {
    applyFilters(searchQuery, selectedServiceFilters);
    confirm(); // Close the filter dropdown
  };

  const handleResetServiceFilter = (clearFilters) => {
    setSelectedServiceFilters([]);
    setServiceFilterDropdownSearchQuery("");
    applyFilters(searchQuery, []);
    clearFilters();
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
      dataIndex: "serviceDetails",
      key: "service",
      render: (serviceDetails) => (
        <div className="flex flex-col">
          <span className="text-[#262626] text-sm font-medium">
            {serviceDetails[0]?.name || "N/A"}
          </span>
          {serviceDetails.slice(1).map((detail, index) => (
            <span key={index} className="text-[#888] text-xs">
              {detail.name}
            </span>
          ))}
        </div>
      ),
      // --- CUSTOM FILTER DROPDOWN IMPLEMENTATION ---
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div className="p-2 bg-white rounded-lg shadow-lg w-[320px]">
          <div className="mb-4">
            <Input
              placeholder="Search services"
              value={serviceFilterDropdownSearchQuery}
              onChange={(e) => {
                setServiceFilterDropdownSearchQuery(e.target.value);
              }}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#111827] focus:border-[#111827]"
              prefix={<SearchOutlined className="text-gray-400" />}
            />
          </div>
          <div className="max-h-[280px] overflow-y-auto space-y-2 mb-4">
            {filteredDropdownServices.map((service) => (
              <div key={service} className="flex items-center">
                <Checkbox
                  checked={selectedServiceFilters.includes(service)}
                  onChange={() => handleServiceFilterChange(service)}
                  className="rounded border-[#E5E7EB] checked:bg-[#111827] checked:border-[#111827] checked:hover:bg-[#111827] hover:border-[#111827]"
                >
                  <span className="text-sm text-[#111827]">{service}</span>
                </Checkbox>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleResetServiceFilter(clearFilters)}
              className="flex-1 px-4 py-2 text-sm font-medium text-[#111827] bg-white border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => handleApplyServiceFilter(confirm)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#111827] rounded-lg hover:bg-black transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <FilterFilled
          className={
            selectedServiceFilters.length > 0 || filtered
              ? "fill-[#F6F6F6]"
              : "fill-[#797979]"
          }
        />
      ),
      filterDropdownProps: {
        onOpenChange: (visible) => {
          setServiceFilterOpen(visible);
          if (!visible) {
            applyFilters(searchQuery, selectedServiceFilters);
          }
        },
      },
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
        <div className="rounded-full bg-[#FFF4EA] text-center">
          <span className="text-xs text-[#FC8B23]">{text}</span>
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
        onRow={(record) => ({
          onClick: () =>
            navigate(`/dashboard/calendar/bookings-details/${record.id}`),
          className: "cursor-pointer hover:bg-gray-50",
        })}
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