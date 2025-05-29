import { Select } from "antd";
import { useSearchParams } from "react-router";
import { DownArrowIcon } from "../../assets/icons/icons";
import Search from "./Search";

export default function Filter({ name, data, defaultValue, search = false }) {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get(name);

  const handleQuery = (value) => {
    if (value) {
      searchQuery.set(name, value);
    }

    if (value?.includes("All")) {
      searchQuery.delete(name);
    }

    setSearchQuery(searchQuery);
  };

  return (
    <Select
      onChange={handleQuery}
      value={query || defaultValue || query}
      className="w-full"
      suffixIcon={<DownArrowIcon />}>
      {search && (
        <Select.Option className="!p-0 mb-2">
          <Search name="category" placeholder="Search by category name" />
        </Select.Option>
      )}

      {data.map((value) => (
        <Select.Option key={value} value={value}>
          {value}
        </Select.Option>
      ))}
    </Select>
  );
}
