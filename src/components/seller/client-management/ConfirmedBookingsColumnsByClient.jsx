import { Tooltip, Input, Checkbox } from "antd";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FilterFilled, SearchOutlined } from "../../../assets/icons/icons";
import { ArrowUpRight } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

export const getConfirmedBookingsColumnsByClient = (
  navigate,
  selectedServiceFilters,
  handleServiceFilterChange,
  serviceFilterDropdownSearchQuery,
  setServiceFilterDropdownSearchQuery,
  filteredDropdownServices,
  handleResetServiceFilter,
  handleApplyServiceFilter
) => [
    {
      title: "Scheduled Time",
      dataIndex: "scheduledTime",
      key: "scheduledTime",
      sorter: (a, b) => {
        const parseDateTime = (dateStr, timeStr) => {
          const [day, month, year] = dateStr.split('/');
          const [hours, minutes] = timeStr.split(':');
          return new Date(year, month - 1, day, hours, minutes);
        };

        const dateA = parseDateTime(a.scheduledDate, a.scheduledTime);
        const dateB = parseDateTime(b.scheduledDate, b.scheduledTime);

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
      title: "Service",
      dataIndex: "serviceDetails",
      key: "service",
      render: (serviceDetails) => (
        <>
          {
            serviceDetails.map((detail, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="text-[#262626] text-sm font-medium">
                  {detail.name || "N/A"}
                </span>
                {
                  detail.tags.map(tag => (
                    <span key={tag} className="text-[#888] text-xs">
                      {tag}
                    </span>
                  ))
                }

              </div>
            ))
          }
        </>
      ),
      filterDropdown: ({ confirm, clearFilters }) => (
        <div className="p-2 bg-white rounded-lg shadow-lg max-w-[320px]">
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
          if (!visible) {
            handleApplyServiceFilter(() => { }); // Re-apply filters when closing if needed
          }
        },
      },
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
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
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a, b) => parseFloat(a.totalPrice) - parseFloat(b.totalPrice),
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
      render: (text) => <span className="text-[#262626] text-sm">₪{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div
          className={`rounded-full text-center px-2 py-1 ${text === "Pending"
            ? "bg-[#FFF4EA] text-[#FC8B23]"
            : text === "Confirmed"
              ? "text-[#3E70DD] bg-[#E6F3FF]"
              : text === "Completed"
                ? "bg-[#E3FAE6] text-[#21C66E]"
                : text === "Cancelled"
                  ? "bg-[#FFEFEF] text-[#ED4245]"
                  : text === "No Show"
                    ? "bg-[#E7E7E7] text-[#82868E]"
                    : ""
            }`}
        >
          <span className="text-xs">{text}</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <Tooltip placement="top" color="" title="Booking Detail">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/calendar/bookings-details/${record.id}`)}
              className="cursor-pointer"
            >
              <ArrowUpRight size={20} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];