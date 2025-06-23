import {
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
  Tooltip,
} from "antd";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Info,
  ListFilter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router"; // Corrected import for Link
import {
  DetailsIcon,
  ErrorIcon2,
  FemaleIcon,
  MaleIcon,
  OthersIcon,
  SearchOutlined,
  VipIcon,
} from "../../../assets/icons/icons";
import MultipleSelector from "../../shared/MultipleSelector";
import { getClients } from "../clientService";
import CustomEmptyTable from "./CustomEmptyTable";

const { Option } = Select;

// Receive activeTabKey as a prop
const ClientTable = ({ activeTabKey }) => {
  const [clients, setClients] = useState(getClients());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(["All cities"]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalClients, setTotalClients] = useState(getClients().length);
  const [genders, setGenders] = useState([]);
  const [citySearchTermExternal, setCitySearchTermExternal] = useState("");
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const getUniqueCities = () => {
    const cities = new Set(
      getClients().map((client) => client.city.split(",")[0])
    );
    return ["All cities", ...Array.from(cities)];
  };

  const filteredCitiesExternal = getUniqueCities().filter((city) =>
    city.toLowerCase().includes(citySearchTermExternal.toLowerCase())
  );

  // Modified applyFilters to accept activeTabKey
  const applyFilters = (
    currentSearchQuery,
    currentSelectedCities,
    currentSelectedGenders,
    currentTabKey // New parameter for the active tab key
  ) => {
    let allClients = getClients(); // Get all clients initially

    let filteredResults = allClients;

    // Apply tab-based filtering first
    if (currentTabKey === "2") {
      // VIP Clients
      filteredResults = filteredResults.filter(
        (client) => client.type === "VIP"
      );
    } else if (currentTabKey === "3") {
      // Blacklisted Clients
      // Assuming 'isBlacklisted' property exists in clientData
      // If not, you'll need to add it to your client data or define what makes a client "blacklisted"
      filteredResults = filteredResults.filter(
        (client) => client.isBlacklisted
      );
    }

    // Apply search query
    if (currentSearchQuery) {
      filteredResults = filteredResults.filter(
        (client) =>
          client.name
            .toLowerCase()
            .includes(currentSearchQuery.toLowerCase()) ||
          client.phone.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );
    }

    // Apply city filter
    if (
      currentSelectedCities &&
      currentSelectedCities.length > 0 &&
      !currentSelectedCities.includes("All cities")
    ) {
      filteredResults = filteredResults.filter((client) =>
        currentSelectedCities.some((city) => client.city.includes(city))
      );
    }

    // Apply gender filter
    if (currentSelectedGenders.length > 0) {
      filteredResults = filteredResults.filter((client) =>
        currentSelectedGenders.includes(client.gender)
      );
    }

    setClients(filteredResults);
    setTotalClients(filteredResults.length);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    applyFilters(value, selectedCity, selectedGenders, activeTabKey); // Pass activeTabKey
  };

  const handleGenderFilter = (values) => {
    setSelectedGenders(genders);
    applyFilters(searchQuery, selectedCity, values, activeTabKey); // Pass activeTabKey
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "gap-3",
      sorter: (a, b) => a.id.localeCompare(b.id),
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
        <div className="w-28">
          <p className="text-[#262626] text-sm mb-2">{text}</p>
          {record.type === "VIP" ? (
            <div className="flex items-center gap-1">
              <div className="bg-[#FFB743] aspect-square size-5 rounded-full flex justify-center items-center">
                <VipIcon />
              </div>
              <p className="text-[#888] text-xs">VIP</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="bg-[#D1D1D1] aspect-square size-5 rounded-full flex justify-center items-center">
                <VipIcon />
              </div>
              <p className="text-[#888] text-xs">Standard</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      headerCellStyle: { textAlign: "left" },
      render: (text, record) => (
        <div className="flex items-center gap-2 w-40">
          <figure
            className={`size-10 rounded-full flex items-center justify-center text-white bg-primary01 overflow-hidden`}>
            {record.avatar}
          </figure>
          <span className="text-sm text-[#262626]">{text}</span>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      headerCellStyle: { textAlign: "left" },
      filterIcon: (filtered) => (
        <ListFilter size={20} strokeWidth={1.5} className="text-gray-400" />
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-4 space-y-4 min-w-[200px]">
          <h3 className="font-semibold mb-2">Select</h3>
          <Checkbox.Group
            className="flex flex-col gap-3 w-full"
            options={[
              { label: "All Gender", value: "All Gender" },
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Others", value: "Others" },
            ]}
            value={genders}
            onChange={(values) => {
              setGenders((prev) => [...prev, ...values]);
            }}
            vertical
          />
          <Flex gap={4} justifyContent="between" className="!mt-4">
            <Button
              size="large"
              onClick={() => {
                clearFilters();
                handleGenderFilter([]);
                setSelectedGenders([]);
                confirm();
                setGenders([]);
              }}>
              Reset
            </Button>
            <Button
              type="primary"
              className="!bg-black "
              size="large"
              onClick={() => {
                confirm();
                handleGenderFilter(selectedGenders);
              }}>
              Apply
            </Button>
          </Flex>
        </div>
      ),
      onFilter: (value, record) =>
        selectedGenders.length === 0 || selectedGenders.includes(record.gender),
      render: (text) => {
        const genderIcon =
          text === "Male" ? (
            <MaleIcon />
          ) : text === "Female" ? (
            <FemaleIcon />
          ) : (
            <OthersIcon />
          );
        return (
          <div className="flex items-center gap-1 w-24 justify-start">
            <span className="text-gray-400">{genderIcon}</span>
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      className: "text-left",
      headerCellStyle: { textAlign: "left" },
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      className: "text-left",
      headerCellStyle: { textAlign: "left" },
      render: (text, record) => (
        <div className="w-36">
          <div className="text-[#262626] text-sm mb-1">{text}</div>
          {!record.isVerified && (
            <Tooltip
              placement="top"
              color="white"
              title={"Pending Phone Confirmation"}>
              <div className="px-2 py-1 inline-flex items-center gap-1 bg-[#FBD9DA] rounded-full text-[#ED4245] text-xs font-medium">
                Unverified <AlertCircle size={16} className="text-[#ED4245]" />
              </div>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      className: "text-left",
      headerCellStyle: { textAlign: "left" },
    },
    {
      title: "Action",
      key: "action",
      className: "text-left",
      headerCellStyle: { textAlign: "left" },
      render: (_, record) => (
        <div className="flex gap-4 justify-start">
          <Tooltip placement="top" color="white" title="View detail">
            <Link to="/dashboard/client-management/client/basic-info">
              <DetailsIcon size={20} strokeWidth={1.5} />
            </Link>
          </Tooltip>

          <Tooltip title="Add to blacklist">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setSelectedClient(record);
                setIsBlacklistModalOpen(true);
              }}>
              <Info size={20} strokeWidth={1.5} className="text-red-400" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedClients = clients.slice(startIndex, endIndex);

  // Trigger applyFilters when activeTabKey changes
  useEffect(() => {
    applyFilters(searchQuery, selectedCity, selectedGenders, activeTabKey);
  }, [searchQuery, selectedCity, selectedGenders, activeTabKey]); // Added activeTabKey to dependency array

  return (
    <>
      <div className="w-full bg-white">
        <div className="flex w-full gap-4 mb-4">
          <div className="relative w-[300px]">
            <Input
              placeholder="Search by name, or phone number"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              className="custom-client-input"
            />
          </div>
          <div className="w-[200px]">
            <MultipleSelector data={filteredCitiesExternal} name="city" />
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <Table
            dataSource={paginatedClients}
            columns={columns}
            pagination={false}
            rowKey="id"
            className="text-left"
            locale={{ emptyText: <CustomEmptyTable /> }}
            rowClassName={(record) =>
              searchQuery &&
              (record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.phone.toLowerCase().includes(searchQuery.toLowerCase()))
                ? "bg-highlight01"
                : ""
            }
            bordered={false}
            // Add custom sort icons
            showSorterTooltip={false}
            // Define custom sort icons for table
          />
        </div>

        <div className="flex justify-center md:justify-between items-center mt-4">
          <div className="hidden md:block">
            <span className="text-sm text-gray-600">Show </span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="mx-2"
              popupMatchSelectWidth={false}
              suffixIcon="">
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
            </Select>
            <span className="text-sm text-gray-600">
              {" "}
              / {totalClients} results per page
            </span>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalClients}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            hideOnSinglePage={false}
          />
        </div>
        <Modal
          title="Notification"
          closable={false}
          open={isBlacklistModalOpen}
          onCancel={() => setIsBlacklistModalOpen(false)}
          footer={null}
          width={420}>
          <div className="mt-8">
            <div className="size-11 bg-[#FBD9DA] rounded-full flex items-center justify-center mx-auto mb-3">
              <ErrorIcon2 className="size-5" />
            </div>
            <div className="text-center">
              <p className="text-[#262626] text-base font-semibold mb-1">
                Add Client to Blacklist?
              </p>
              <p className="text-[#797979]">
                Are you sure you want to add {selectedClient?.name} to the
                blacklist? This action will prevent them from making future
                bookings.
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                className="flex-1 cursor-pointer border border-[#242528] py-2 px-3 text-[#242528] rounded-lg"
                onClick={() => setIsBlacklistModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer bg-[#ED4245] py-2 px-3 text-white rounded-lg"
                onClick={() => {
                  // Here you would typically make an API call to update the client's blacklist status
                  console.log(`Blacklisting client: ${selectedClient?.id}`);
                  setIsBlacklistModalOpen(false);
                  // You would then refresh your client data or update the local state
                }}>
                Yes, confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <style>{`.ant-table-column-title{flex:none !important} .ant-table-filter-column{justify-content:flex-start !important;}`}</style>
    </>
  );
};

export default ClientTable;
