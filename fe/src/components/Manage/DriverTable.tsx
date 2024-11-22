import React from "react";
import { Space } from "antd";
import type { TableProps } from "antd";
import { StyledTable } from "./styles";
import ManageConfigProvider from "./ManageConfigProvider";

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
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Rating",
    key: "rating",
    dataIndex: "rating",
  },
  {
    title: "Vehicle",
    key: "vehicle",
    dataIndex: "vehicle",
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

const DriverTable: React.FC = () => {
  return (
    <ManageConfigProvider>
      <StyledTable columns={columns} dataSource={data} />
    </ManageConfigProvider>
  );
};

export default DriverTable;
