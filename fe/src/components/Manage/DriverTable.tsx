import React, { useEffect, useState } from "react";
import { Space } from "antd";
import type { TableProps } from "antd";
import { StyledTable } from "./styles";
import ManageConfigProvider from "./ManageConfigProvider";
import { baseUserUrl } from "@src/utils/common";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export interface DataType {
  _id: string;
  name: string;
  phone_number: string;
  rating: string;
  income: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    render: (text) => (
      <a onClick={() => alert(text)}>
        {text.slice(0, 3) + "..." + text.slice(-3)}
      </a>
    ),
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined /> <DeleteOutlined />
      </Space>
    ),
  },
];

const DriverTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUserUrl}/all?role=driver`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ManageConfigProvider>
      <StyledTable columns={columns} dataSource={data} />;
    </ManageConfigProvider>
  );
};

export default DriverTable;
