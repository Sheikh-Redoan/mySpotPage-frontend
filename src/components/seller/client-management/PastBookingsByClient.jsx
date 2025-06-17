import React, { useState } from "react";
import { Table, Select, Pagination, Tooltip, Input, Checkbox } from "antd";
import { IoArrowDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import CustomEmptyTable from "../../DashboardPageComponents/shared/CustomEmptyTable";
import { getPendingBookings } from "../../../dummy-data/bookingsData";
import { getPastBookingsColumnsByClient } from "./PastBookingsColumnsByClient";

const { Option } = Select;

const PastBookingsByClient = () => {
  const navigate = useNavigate();

  const allBookings = getPendingBookings();
  const pendingBookings =
    allBookings &&
    allBookings.filter(
      (booking) =>
        booking.status === "Completed" ||
        booking.status === "Cancelled" ||
        booking.status === "No Show"
    );

  const [bookings, setBookings] = useState(pendingBookings || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalBookings, setTotalBookings] = useState(pendingBookings.length);

  // State for service filter dropdown
  const [selectedServiceFilters, setSelectedServiceFilters] = useState([]);
  const [
    serviceFilterDropdownSearchQuery,
    setServiceFilterDropdownSearchQuery,
  ] = useState("");

  // State for status filter dropdown
  const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);

  const applyFilters = (
    currentSearchQuery,
    currentServiceFilters,
    currentStatusFilters
  ) => {
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

    // Apply status filters
    if (
      currentStatusFilters.length > 0 &&
      !currentStatusFilters.includes("All Status")
    ) {
      results = results.filter((booking) =>
        currentStatusFilters.includes(booking.status)
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

  // Status Filter Handlers
  const allPossibleStatuses = [
    "All Status",
    "Completed",
    "Cancelled",
    "No Show",
  ];

  const handleStatusFilterChange = (status) => {
    setSelectedStatusFilters((prev) => {
      if (status === "All Status") {
        return ["All Status"];
      } else {
        const newSelected = prev.includes(status)
          ? prev.filter((s) => s !== status) 
          : [...prev, status]; 

        if (newSelected.includes("All Status") && newSelected.length > 1) {
          return newSelected.filter((s) => s !== "All Status");
        }

        if (newSelected.length === 0) {
          return ["All Status"];
        }

        return newSelected;
      }
    });
  };

  const handleApplyStatusFilter = (confirm) => {
    applyFilters(searchQuery, selectedServiceFilters, selectedStatusFilters);
    confirm();
  };

  const handleResetStatusFilter = (clearFilters) => {
    setSelectedStatusFilters([]);
    applyFilters(searchQuery, selectedServiceFilters, []);
    clearFilters();
  };

  const columns = getPastBookingsColumnsByClient(
    navigate,
    selectedServiceFilters,
    handleServiceFilterChange,
    serviceFilterDropdownSearchQuery,
    setServiceFilterDropdownSearchQuery,
    filteredDropdownServices,
    handleResetServiceFilter,
    handleApplyServiceFilter,
    selectedStatusFilters,
    handleStatusFilterChange,
    allPossibleStatuses,
    handleResetStatusFilter,
    handleApplyStatusFilter
  );

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBookings = bookings.slice(startIndex, endIndex);

  if (
    !bookings.length &&
    searchQuery === "" &&
    selectedServiceFilters.length === 0 &&
    selectedStatusFilters.length === 0
  )
    return <CustomEmptyTable />;

  return (
    <div className="w-full py-2">
      <Table
        dataSource={paginatedBookings}
        columns={columns}
        pagination={false}
        emptyText={<CustomEmptyTable />}
        rowKey="id"
        className="w-full overflow-x-auto border border-border rounded-md"
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
      <div className="flex justify-center md:justify-between items-center mt-4">
        <div className="hidden md:block">
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

export default PastBookingsByClient;
