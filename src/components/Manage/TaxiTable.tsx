import React from "react";
import { Space } from "antd";
import type { TableProps } from "antd";
import { StyledTable } from "./styles";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Driver ID",
    dataIndex: "age",
    key: "age",
  },

  {
    title: "Registered Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "active",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: "active",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: "active",
  },
];

const TaxiTable: React.FC = () => {
  return (
    <div>
      <StyledTable columns={columns} dataSource={data} />;
    </div>
  );
};

export default TaxiTable;
