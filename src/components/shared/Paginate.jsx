import { Pagination } from "antd";
import { useSearchParams } from "react-router";

export default function Paginate({ total }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("page") || 1;
  const onShowSizeChange = (current, pageSize) => {
    searchParams.set("page", current);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Pagination
        showSizeChanger={false}
        onChange={onShowSizeChange}
        defaultCurrent={current}
        total={total}
        className="col-span-6"
      />
    </>
  );
}
