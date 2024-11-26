import React from "react";
import { ConfigProvider } from "antd";
import { COLOR } from "@src/color";

const ManageConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: COLOR.YELLOW,
            headerBg: "transparent",
            colorBgContainer: "transparent",
            colorText: "white",
            borderColor: "white",
          },

          Radio: {
            wrapperMarginInlineEnd: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ManageConfigProvider;
