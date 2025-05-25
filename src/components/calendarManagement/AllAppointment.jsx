import { Input } from "antd";
import { DownArrowIcon, SearchOutlined } from "../../assets/icons/icons";
import { Select } from "antd";
import { useState } from "react";
import { DatePicker } from "antd";

function AllAppoimtment() {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);
  const newDate = new Date();

  const getMonthYear = (date) => {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };
  const handleCityFilter = () => {};

  const handlePrev = () => {};

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="w-full p-4">
      <div className="flex w-full gap-4 mb-4">
        <div className="relative w-[300px]">
          <Input
            prefix={<SearchOutlined />}
            value={getMonthYear(currentDate)}
            onChange={(e) => handleSearch(e.target.value)}
            className="custom-client-input"
            readOnly
          />
        </div>

        <div>
          <DatePicker onChange={onChange} picker="month" />
        </div>
        <div className="w-[200px]">
          <Select
            defaultValue="All Stafs"
            onChange={handleCityFilter}
            className="w-full"
            suffixIcon={<DownArrowIcon />}
          >
            {/* {uniqueCities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))} */}
            const getMontYear
          </Select>
        </div>
      </div>
    </div>
  );
}

export default AllAppoimtment;
