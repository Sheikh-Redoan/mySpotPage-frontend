import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SearchOutlined } from "../../assets/icons/icons";

export default function Search({ name, placeholder }) {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [search, setSearch] = useState("");
  const getSearchQuery = searchQuery.get(name);

  // Performing a debounce to avoid making too many requests to the server
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        searchQuery.set(name, search);
      } else {
        searchQuery.delete(name);
      }

      setSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, search]);

  useEffect(() => {
    if (getSearchQuery) {
      setSearch(getSearchQuery);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Input
      size="large"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={handleSearch}
      value={search}
      className="custom-client-input rounded-lg"
    />
  );
}
