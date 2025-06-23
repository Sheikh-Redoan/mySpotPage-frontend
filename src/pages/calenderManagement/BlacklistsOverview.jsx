import React, { useState } from "react";
import { Table, Select, Pagination, Tooltip, Input, Checkbox } from "antd";
import { IoArrowDownOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { getPendingBookings } from "../../dummy-data/bookingsData";
import CustomEmptyTable from "../../components/DashboardPageComponents/shared/CustomEmptyTable";
import { getBlacklistOverviewColumns } from "../../components/calendarManagement/blacklistsOverview/BlacklistOverviewColumns";

const { Option } = Select;

const BlacklistsOverview = () => {
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

  const columns = getBlacklistOverviewColumns();

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBookings = bookings.slice(startIndex, endIndex);

  return (
    <div className="w-full py-2 px-3">
      <Table
        dataSource={paginatedBookings}
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1220 }}
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
        showSorterTooltip={false}
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
      <style>{`.ant-table-column-title{flex:none !important} .ant-table-filter-column{justify-content:flex-start !important;}`}</style>
    </div>
  );
};

export default BlacklistsOverview;