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
            colorPrimary: COLOR.YELLOW,
          },
          List: {
            colorTextDescription: "white",
            colorSplit: COLOR.YELLOW,
            itemPadding: "12px 40px",
          },
          Checkbox: {
            colorPrimary: COLOR.YELLOW,
            colorPrimaryHover: COLOR.YELLOW,
          },
          Button: {
            defaultBg: "#FCCD04",
            defaultBorderColor: "transparent",
            defaultHoverBg: "#FCCD04",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ManageConfigProvider;
