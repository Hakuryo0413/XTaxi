import React from "react";
import { Radio, Image, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ManageConfigProvider from "@src/components/Manage/ManageConfigProvider";
import Momo from "@src/assets/momo_square";
import Cash from "@src/assets/cash";
import Card from "@src/assets/card";

const Payment: React.FC = () => {
  return (
    <ManageConfigProvider>
      <div className="px-12 sm:px-30 lg:px-40 md:px-40  sm:mx-20 rounded-2xl mt-2 h-4/5 text-white">
        <div className="pt-3">
          <p className="text-3xl font-bold my-8 text-yellow">Payment Methods</p>
          <p className="text-md font-bold text-yellow">Linked Methods</p>
          <p className="text-md font-light  pb-2">
            Swipe left to set your default
          </p>
          <div className="flex justify-between py-3">
            <div className="flex gap-2">
              <Momo />
              <p>Momo</p>
            </div>
            <Radio></Radio>
          </div>
          <div className="flex justify-between py-3">
            <div className="flex gap-2">
              <Cash />
              <p>Cash</p>
            </div>
            <Radio></Radio>
          </div>
          <p className="text-md font-bold text-yellow">Add Methods</p>

          <div className="flex justify-between py-3">
            <div className="flex gap-2">
              <Card />
              <p>Cards</p>
            </div>

            <RightOutlined className="text-white" />
          </div>
          <div className="flex justify-between py-3">
            <div className="flex gap-2 ">
              <Image
                width={32}
                preview={false}
                src="https://vcci-hcm.org.vn/wp-content/uploads/2022/12/1.png"
              />
              <p>ZaloPay</p>
            </div>

            <RightOutlined className="text-white" />
          </div>
          <div className="mt-4 justify-end flex">
            <Button>Pay</Button>
          </div>
        </div>
      </div>
    </ManageConfigProvider>
  );
};

export default Payment;