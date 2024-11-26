import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { DriverTable, TaxiTable, UserTable } from "@src/components/Manage";
import UserSideFooter from "@src/components/footer/Footer";
import { COLOR } from "@src/color";
import { AdminHeader } from "@src/components/header";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "driver",
    label: "Driver",
    children: <DriverTable />,
  },
  {
    key: "user",
    label: "User",
    children: <UserTable />,
  },
  {
    key: "vehicle",
    label: "Vehicle",
    children: <TaxiTable />,
  },
];

const AdminPage: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          colorBorderSecondary: "transparent",
          colorText: "white",
          itemSelectedColor: COLOR.YELLOW,
          inkBarColor: COLOR.YELLOW,
        },
      },
    }}
  >
    <div className="bg-primary h-screen">
      <AdminHeader />
      <Tabs
        centered
        defaultActiveKey="driver"
        items={items}
        onChange={onChange}
      />
      <UserSideFooter />
    </div>
  </ConfigProvider>
);

export default AdminPage;
