import { Tooltip, Input, Checkbox } from "antd";
import { MdDelete } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { FilterFilled, SearchOutlined } from "../../../assets/icons/icons";

export const getWaitlistOverviewColumns = (
  selectedServiceFilters,
  handleServiceFilterChange,
  serviceFilterDropdownSearchQuery,
  setServiceFilterDropdownSearchQuery,
  filteredDropdownServices,
  handleResetServiceFilter,
  handleApplyServiceFilter
) => [
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    render: (text, record, index) => (
      <div className="flex flex-col">
        <span className="text-[#262626] text-sm font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    ),
  },
  {
    title: "Waitlist Entry Time",
    dataIndex: "clientName",
    key: "clientInfo",
    sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    render: (text, record) => (
      <div className="flex gap-1">
        <span className="text-[#888] text-xs">{record.scheduledDate}</span>
        <span className="text-[#888] text-xs">{record.scheduledTime}</span>
      </div>
    ),
  },
  {
    title: "Client Name",
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
    filterDropdown: ({ confirm, clearFilters }) => (
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
          {Array.isArray(
            filteredDropdownServices.map((service) => (
              <div key={service} className="flex items-center">
                <Checkbox
                  checked={selectedServiceFilters.includes(service)}
                  onChange={() => handleServiceFilterChange(service)}
                  className="rounded border-[#E5E7EB] checked:bg-[#111827] checked:border-[#111827] checked:hover:bg-[#111827] hover:border-[#111827]"
                >
                  <span className="text-sm text-[#111827]">{service}</span>
                </Checkbox>
              </div>
            ))
          )}
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
        if (!visible) {
          handleApplyServiceFilter(() => {}); // Re-apply filters when closing if needed
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
    render: (text) => <span className="text-[#262626] text-sm">₪{text}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2">
        <Tooltip placement="top" color="#52c41a" title="Remove from blacklist">
          <button
            type="button"
            onClick={() => console.log("Remove From Blacklist", record.id)}
            className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            <MdDelete className="size-4" />
          </button>
        </Tooltip>

        <Tooltip placement="top" color="#f5222d" title="Add to blacklist">
          <button
            type="button"
            onClick={() => console.log("Add To Blacklist", record.id)}
            className="cursor-pointer text-[#f5222d] hover:text-[#ff4d4f]"
          >
            <FaBan className="size-4" />
          </button>
        </Tooltip>
      </div>
    ),
  },
];
