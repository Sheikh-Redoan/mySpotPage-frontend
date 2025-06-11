import { useState, useRef, useEffect } from "react";
import {
  Input,
  Pagination,
  Select,
  Table,
  Tooltip,
  Checkbox,
  Space,
  Button,
} from "antd";
import { Link } from "react-router"; // Corrected import for Link
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
  ErrorIcon2,
} from "../../../assets/icons/icons";
import { getClients, searchClients } from "../clientService";
import CustomEmptyTable from "./CustomEmptyTable";
import { Modal } from "antd";

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

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearchTermExternal, setCitySearchTermExternal] = useState("");

  const searchInputRefExternal = useRef(null);

  const [citySearchTermTableColumn, setCitySearchTermTableColumn] =
    useState("");

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

  const handleCityDropdownOpenChangeExternal = (open) => {
    if (open) {
      setCitySearchTermExternal("");
      setTimeout(() => {
        searchInputRefExternal.current?.focus();
      }, 0);
    }
    setCityDropdownOpen(open);
  };

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

  const handleCityFilter = (values) => {
    setSelectedCity(values);
    applyFilters(searchQuery, values, selectedGenders, activeTabKey); // Pass activeTabKey
  };

  const handleGenderFilter = (values) => {
    setSelectedGenders(values);
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
      sorter: (a, b) => a.id.localeCompare(b.id),
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
      render: (text, record) => (
        <div className="flex items-center gap-2 w-40">
          <figure
            className={`size-10 rounded-full flex items-center justify-center text-white bg-primary01 overflow-hidden`}
          >
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
          className={filtered ? "fill-[#F6F6F6]" : "fill-[#797979]"}
        />
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="" style={{ padding: 8}}>
          <Select
            mode="multiple"
            placeholder="Select Gender"
            value={selectedGenders}
            onChange={(values) => {
              setSelectedKeys(values);
              handleGenderFilter(values);
            }}
            style={{ width: "100%" }}
            showSearch
            filterOption={(input, option) =>
              option.children.props.children[1]
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            <Option value="Male">
              <span className="inline-flex items-center gap-1">
                <MaleIcon /> Male
              </span>
            </Option>
            <Option value="Female">
              <span className="inline-flex items-center gap-1">
                <FemaleIcon /> Female
              </span>
            </Option>
            <Option value="Others">
              <span className="inline-flex items-center gap-1">
                <OthersIcon /> Others
              </span>
            </Option>
          </Select>
          <div className="flex justify-end mt-2">
            <a
              onClick={() => {
                clearFilters();
                handleGenderFilter([]);
                confirm();
              }}
              className="text-blue-500 text-sm"
            >
              Reset
            </a>
          </div>
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
          <div className="flex items-center gap-1 w-24">
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
        <div className="w-36">
          <div className="text-[#262626] text-sm mb-1">{text}</div>
          {!record.isVerified && (
            <Tooltip
              placement="top"
              color="white"
              title={"Pending Phone Confirmation"}
            >
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
      filterIcon: (filtered) => (
        <FilterFilled
          className={filtered ? "fill-[#F6F6F6]" : "fill-[#797979]"}
        />
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        const cityFilterSearchInputTableColumn = useRef(null);
        const filteredCitiesTableColumn = getUniqueCities().filter((city) =>
          city.toLowerCase().includes(citySearchTermTableColumn.toLowerCase())
        );

        return (
          <div style={{ padding: 8}}>
            <Input
              ref={cityFilterSearchInputTableColumn}
              placeholder="Search"
              value={citySearchTermTableColumn}
              onChange={(e) => setCitySearchTermTableColumn(e.target.value)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
              prefix={<SearchOutlined style={{ marginRight: 8 }} />}
            />
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              <Checkbox.Group
                options={filteredCitiesTableColumn.map((city) => ({
                  label: city,
                  value: city,
                }))}
                value={selectedCity}
                onChange={(checkedValues) => {
                  let newSelectedCities = checkedValues;
                  if (
                    checkedValues.includes("All cities") &&
                    checkedValues.length > 1
                  ) {
                    newSelectedCities = ["All cities"];
                  } else if (
                    checkedValues.length > 1 &&
                    checkedValues.includes("All cities") &&
                    selectedCity.includes("All cities")
                  ) {
                    newSelectedCities = checkedValues.filter(
                      (val) => val !== "All cities"
                    );
                  } else if (checkedValues.length === 0) {
                    newSelectedCities = ["All cities"];
                  }

                  setSelectedKeys(newSelectedCities);
                  handleCityFilter(newSelectedCities);
                }}
              />
            </div>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Button
                size="small"
                onClick={() => {
                  clearFilters();
                  handleCityFilter(["All cities"]);
                  setCitySearchTermTableColumn("");
                  confirm();
                }}
              >
                Reset
              </Button>
              <Button type="primary" size="small" onClick={() => confirm()}>
                Apply
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        if (selectedCity.includes("All cities") || selectedCity.length === 0) {
          return true;
        }
        return selectedCity.some((city) => record.city.includes(city));
      },
      render: (text) => <span className="text-[#262626] text-sm">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (
        _,
        record // Add record parameter to access client data
      ) => (
        <div className="flex gap-4">
          <Tooltip placement="top" color="white" title="View detail">
            <Link to="/dashboard/client-management/client/basic-info">
              <DetailsIcon />
            </Link>
          </Tooltip>

          <Tooltip title="Add to blacklist">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setSelectedClient(record);
                setIsBlacklistModalOpen(true);
              }}
            >
              <InfoCircleOutlined className="size-5" />
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
          <Select
            value={
              selectedCity.includes("All cities")
                ? "All cities"
                : selectedCity[0]
            }
            className="w-full"
            suffixIcon={<DownArrowIcon />}
            open={cityDropdownOpen}
            onOpenChange={handleCityDropdownOpenChangeExternal}
            popupRender={() => (
              <div className="bg-white shadow-lg rounded-md p-2">
                {/* Search input */}
                <div className="mb-2">
                  <Input
                    ref={searchInputRefExternal}
                    prefix={<SearchOutlined />}
                    placeholder="Search"
                    value={citySearchTermExternal}
                    onChange={(e) => setCitySearchTermExternal(e.target.value)}
                  />
                </div>
                {/* City list */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCitiesExternal.map((city) => (
                    <div
                      key={city}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        selectedCity.includes(city) ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        const newSelectedCity =
                          selectedCity.includes("All cities") ||
                          selectedCity.length === 0
                            ? [city]
                            : city === "All cities"
                            ? ["All cities"]
                            : selectedCity.includes(city)
                            ? selectedCity.filter((val) => val !== city)
                            : [
                                ...selectedCity.filter(
                                  (val) => val !== "All cities"
                                ),
                                city,
                              ];

                        handleCityFilter(
                          newSelectedCity.length === 0
                            ? ["All cities"]
                            : newSelectedCity
                        );
                        setCityDropdownOpen(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            )}
          >
            <Option
              key="selected"
              value={
                selectedCity.includes("All cities")
                  ? "All cities"
                  : selectedCity[0]
              }
            >
              {selectedCity.includes("All cities")
                ? "All cities"
                : selectedCity[0]}
            </Option>
          </Select>
        </div>
      </div>

      <Table
        dataSource={paginatedClients}
        columns={columns}
        pagination={false}
        rowKey="id"
        className="w-full overflow-x-auto"
        locale={{ emptyText: <CustomEmptyTable /> }}
        rowClassName={(record) =>
          searchQuery &&
          (record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.phone.toLowerCase().includes(searchQuery.toLowerCase()))
            ? "bg-highlight01"
            : ""
        }
      />

      <div className="flex justify-center md:justify-between items-center mt-4">
        <div className="hidden md:block">
          <span className="text-sm text-gray-600">Show </span>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mx-2"
            popupMatchSelectWidth={false}
            suffixIcon=""
          >
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
        width={420}
      >
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
              onClick={() => setIsBlacklistModalOpen(false)}
            >
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
              }}
            >
              Yes, confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientTable;
