import { Input, Pagination, Select, Table, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import {
  DetailsIcon,
  DownArrowIcon,
  FemaleIcon,
  FilterFilled,
  InfoCircleOutlined,
  MaleIcon,
  OthersIcon,
  SearchOutlined,
  VipIcon,
} from "../../../assets/icons/icons";
import { getClients, searchClients } from "../clientService";
import CustomEmptyTable from "./CustomEmptyTable";
// import { Checkbox } from "@/components/ui/checkbox";

const { Option } = Select;

const ClientTable = () => {
  const [clients, setClients] = useState(getClients());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All cities");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalClients, setTotalClients] = useState(getClients().length);
  const [genderFilterOpen, setGenderFilterOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchQuery(value);
    let filteredResults = getClients();

    if (selectedCity !== "All cities") {
      filteredResults = filteredResults.filter((client) =>
        client.city.includes(selectedCity)
      );
    }

    if (selectedGenders.length > 0) {
      filteredResults = filteredResults.filter((client) =>
        selectedGenders.includes(client.gender)
      );
    }

    setClients(filteredResults);
    setTotalClients(filteredResults.length);
    setCurrentPage(1);
  };

  const handleCityFilter = (value) => {
    setSelectedCity(value);
    let results = getClients();

    if (searchQuery) {
      results = searchClients(searchQuery);
    }

    if (value !== "All cities") {
      results = results.filter((client) => client.city.includes(value));
    }

    if (selectedGenders.length > 0) {
      results = results.filter((client) =>
        selectedGenders.includes(client.gender)
      );
    }

    setClients(results);
    setTotalClients(results.length);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleGenderFilter = (gender) => {
    let newSelectedGenders;

    if (selectedGenders.includes(gender)) {
      // Remove gender if already selected
      newSelectedGenders = selectedGenders.filter((g) => g !== gender);
    } else {
      // Add gender if not selected
      newSelectedGenders = [...selectedGenders, gender];
    }

    setSelectedGenders(newSelectedGenders);

    // Filter data based on new selections
    let results = getClients();

    if (searchQuery) {
      results = searchClients(searchQuery);
    }

    if (selectedCity !== "All cities") {
      results = results.filter((client) => client.city.includes(selectedCity));
    }

    if (newSelectedGenders.length > 0) {
      results = results.filter((client) =>
        newSelectedGenders.includes(client.gender)
      );
    }

    setClients(results);
    setTotalClients(results.length);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Extract unique cities for filter dropdown
  const uniqueCities = [
    "All cities",
    ...new Set(getClients().map((client) => client.city.split(",")[0])),
  ];

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (text, record) => (
        <div className="">
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
      render: (text, record) => (
        <div className="flex items-center gap-2">
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
      filterIcon: (filtered) => (
        <FilterFilled
          className={
            genderFilterOpen || filtered ? "fill-[#F6F6F6]" : "fill-[#797979]"
          }
        />
      ),
      filterDropdownOpen: genderFilterOpen,
      onFilterDropdownVisibleChange: (visible) => {
        setGenderFilterOpen(visible);
      },
      filters: [
        {
          text: (
            <span className="inline-flex items-center gap-1">
              <MaleIcon />
              Male
            </span>
          ),
          value: "Male",
        },
        {
          text: (
            <span className="inline-flex items-center gap-1">
              <FemaleIcon />
              Female
            </span>
          ),
          value: "Female",
        },
        {
          text: (
            <span className="inline-flex items-center gap-1">
              <OthersIcon />
              Others
            </span>
          ),
          value: "Others",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
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
          <div className="flex items-center gap-1">
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
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text, record) => (
        <div>
          <div className="text-[#262626] text-sm mb-1">{text}</div>
          {!record.isVerified && (
            <Tooltip
              placement="top"
              color="white"
              title={"Pending Phone Confirmation"}>
              <div className="px-2 py-1 inline-flex items-center gap-1 bg-[#FBD9DA] rounded-full text-[#ED4245] text-xs font-medium">
                Unverified <InfoCircleOutlined className="size-4" />
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
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-4">
          <Tooltip placement="top" color="white" title="View detail">
            <Link to="/dashboard/client-management/client/basic-info">
              <DetailsIcon />
            </Link>
          </Tooltip>

          <Tooltip title="Add to blacklist">
            <button type="button" className="cursor-pointer">
              <InfoCircleOutlined className="size-5" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedClients = clients.slice(startIndex, endIndex);

  return (
    <div className="w-full">
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
          <Select
            defaultValue="All cities"
            onChange={handleCityFilter}
            className="w-full"
            suffixIcon={<DownArrowIcon />}>
            {uniqueCities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* <div className="flex gap-6 mb-4 p-4 border border-dashed border-purple-200 bg-purple-50 rounded-md">
        <div className="text-gray-700 font-medium">Gender:</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gender-male"
              checked={selectedGenders.includes("Male")}
              onCheckedChange={() => handleGenderFilter("Male")}
            />
            <label
              htmlFor="gender-male"
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="text-blue-500">♂</span> Male
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gender-female"
              checked={selectedGenders.includes("Female")}
              onCheckedChange={() => handleGenderFilter("Female")}
            />
            <label
              htmlFor="gender-female"
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="text-purple-500">♀</span> Female
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gender-others"
              checked={selectedGenders.includes("Others")}
              onCheckedChange={() => handleGenderFilter("Others")}
            />
            <label
              htmlFor="gender-others"
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="text-gray-500">⚧</span> Others
            </label>
          </div>
        </div>
      </div> */}

      <Table
        dataSource={paginatedClients}
        columns={columns}
        pagination={false}
        rowKey="id"
        className="w-full"
        locale={{ emptyText: <CustomEmptyTable /> }}
        rowClassName={(record) =>
          searchQuery &&
          (record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.phone.toLowerCase().includes(searchQuery.toLowerCase()))
            ? "bg-highlight01"
            : ""
        }
      />

      <div className="flex justify-between items-center mt-4">
        <div>
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
    </div>
  );
};

export default ClientTable;
