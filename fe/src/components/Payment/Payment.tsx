import React from "react";
import { Radio } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ManageConfigProvider from "@src/components/Manage/ManageConfigProvider";
import Momo from "@src/assets/momo_square";
import ZaloPay from "@src/assets/zalopay-seeklogo";

const Payment: React.FC = () => {
  return (
    <ManageConfigProvider>
      <div className="px-12 sm:px-40 lg:px-96 md:px-80 bg-yellow">
        <p className=" text-3xl font-bold my-8">Payment Methods</p>
        <p className=" text-md font-bold">Linked Methods</p>
        <p className="text-md font-bold">Swipe left to set your default</p>
        <div className="flex justify-between py-2">
          <div className="flex gap-2">
            <Momo />
            <p>Momo</p>
          </div>

          <Radio></Radio>
        </div>
        <div className="flex justify-between py-2">
          <div className="flex gap-2">
            <Momo />
            <p>Cash</p>
          </div>

          <Radio></Radio>
        </div>
        <p className="text-md font-bold">Add Methods</p>

        <div className="flex justify-between py-2">
          <div className="flex gap-2">
            <Momo />
            <p>Cards</p>
          </div>

          <RightOutlined className="text-black" />
        </div>
        <div className="flex justify-between py-2">
          <div className="flex gap-2">
            {/* <ZaloPay width={24} height={24} /> */}
            <p>ZaloPay</p>
          </div>

          <RightOutlined className="text-black" />
        </div>
      </div>
    </ManageConfigProvider>
  );
};

export default Payment;
