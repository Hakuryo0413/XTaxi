import React, { useEffect, useState } from "react";
import { Space } from "antd";
import type { TableProps } from "antd";
import { StyledTable } from "./styles";
import ManageConfigProvider from "./ManageConfigProvider";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { baseDriverUrl } from "@src/utils/common";

export interface VehicleDataType {
  driver_id: string;
  license_plate: string;
  vehicle_type: string;
  capacity: number;
  registered_date: string;
  status: string;
}

const columns: TableProps<VehicleDataType>["columns"] = [
  {
    title: "Driver_id",
    dataIndex: "driver_id",
    key: "driver_id",
    render: (text) => (
      <a onClick={() => alert(text)}>
        {text.slice(0, 3) + "..." + text.slice(-3)}
      </a>
    ),
  },
  {
    title: "Vehicle Type",
    dataIndex: "vehicle_type",
    key: "vehicle_type",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },

  {
    title: "Registered Date",
    dataIndex: "registered_date",
    key: "registered_date",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text) => <a>{text}</a>,
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

const TaxiTable: React.FC = () => {
  const [data, setData] = useState<VehicleDataType[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseDriverUrl}/get/vehicles`, {
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

export default TaxiTable;
