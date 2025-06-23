import { Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { Trash2 } from "lucide-react";

export const getBlacklistOverviewColumns = () => [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (text, record, index) => (
      <div className="flex flex-col">
        <span className="text-[#262626] text-sm font-medium">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    ),
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
    width: 150,
    render: (text, record) => (
      <div className="flex flex-col">
        <span className="text-[#262626] text-sm font-medium">{text}</span>
        <span className="text-[#888] text-xs">{record.clientPhone}</span>
      </div>
    ),
  },
  {
    title: "Note / Reasons",
    dataIndex: "note",
    key: "note",
    render: (text) => (
      <span className="text-[#262626] text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste est
        repellat officiis eveniet. Libero repellat, mollitia enim soluta,
        reiciendis optio provident dolore eligendi facere nulla in excepturi
        maiores totam magni maxime sm!
      </span>
    ),
  },
  {
    title: "Ban Date",
    dataIndex: "banDate",
    key: "banDate",
    sorter: (a, b) => a.clientName.localeCompare(b.clientName),
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
      <div className="flex gap-1">
        <span className="text-[#888] text-xs">{record.scheduledDate}</span>
        <span className="text-[#888] text-xs">{record.scheduledTime}</span>
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex justify-center gap-2">
        <Tooltip placement="top" color="#52c41a" title="Remove from blacklist">
          <button
            type="button"
            onClick={() => console.log("Remove From Blacklist", record.id)}
            className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200">
            <Trash2 size={20} strokeWidth={1.5} />
          </button>
        </Tooltip>
      </div>
    ),
  },
];
