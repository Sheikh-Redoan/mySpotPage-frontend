import { Tooltip, Input, Checkbox } from "antd";
import { MdDelete } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { FilterFilled, SearchOutlined } from "../../../assets/icons/icons";

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
    render: (text) => <span className="text-[#262626] text-sm">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste est repellat officiis eveniet. Libero repellat, mollitia enim soluta, reiciendis optio provident dolore eligendi facere nulla in excepturi maiores totam magni maxime sm!
    </span>,
  },
  {
    title: "Ban Date",
    dataIndex: "banDate",
    key: "banDate",
    sorter: (a, b) => a.clientName.localeCompare(b.clientName),
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
      </div>
    ),
  },
];
