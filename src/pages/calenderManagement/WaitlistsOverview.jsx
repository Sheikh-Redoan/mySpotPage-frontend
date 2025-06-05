import React, { useState } from "react";
import { Table, Select, Pagination, Tooltip, Input, Checkbox } from "antd";
import { IoArrowDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { getWaitlistOverviewColumns } from "../../components/calendarManagement/waitlistsOverview/WaitlistOverviewColumns";
import { getPendingBookings } from "../../dummy-data/bookingsData";
import CustomEmptyTable from "../../components/DashboardPageComponents/shared/CustomEmptyTable";

const { Option } = Select;

const WaitlistsOverview = () => {
  const navigate = useNavigate();

  const allBookings = getPendingBookings();
  const pendingBookings =
    allBookings && allBookings.filter((booking) => booking.status === "Pending");

  const [bookings, setBookings] = useState(pendingBookings || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalBookings, setTotalBookings] = useState(pendingBookings.length);

  // State for service filter dropdown
  const [selectedServiceFilters, setSelectedServiceFilters] = useState([]);
  const [serviceFilterDropdownSearchQuery, setServiceFilterDropdownSearchQuery] = useState("");

  const applyFilters = (currentSearchQuery, currentServiceFilters) => {
    let results = [...pendingBookings];

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
          booking.staffName.toLowerCase().includes(currentSearchQuery.toLowerCase())
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

  // Extract unique services for filter dropdown
  const allUniqueServices = [
    ...new Set(
      bookings.flatMap((booking) =>
        booking.serviceDetails.map((detail) => detail.name)
      )
    ),
  ];

  // Filtered services for the dropdown search
  const filteredDropdownServices = allUniqueServices.filter((service) =>
    service.toLowerCase().includes(serviceFilterDropdownSearchQuery.toLowerCase())
  );

  const handleServiceFilterChange = (service) => {
    setSelectedServiceFilters((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
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

  const columns = getWaitlistOverviewColumns(
    selectedServiceFilters,
    handleServiceFilterChange,
    serviceFilterDropdownSearchQuery,
    setServiceFilterDropdownSearchQuery,
    filteredDropdownServices,
    handleResetServiceFilter,
    handleApplyServiceFilter
  );

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
          (record.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.clientPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.staffName.toLowerCase().includes(searchQuery.toLowerCase()))
            ? "bg-highlight01"
            : ""
        }
        onRow={(record) => ({
          onClick: () => navigate(`/dashboard/calendar/bookings-details/${record.id}`),
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

export default WaitlistsOverview;