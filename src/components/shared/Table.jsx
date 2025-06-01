import { Table as AntdTable } from "antd";

export default function Table({ columns, data, pagination }) {
  return (
    <div className="p-4">
      <AntdTable
        columns={columns}
        dataSource={data}
        rowKey={(row) => `${row.date}-${row.time}`}
        pagination={pagination}
      />
    </div>
  );
}
