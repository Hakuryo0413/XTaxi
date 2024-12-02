import React, { useState } from "react";
import { List, Image, Checkbox, Button } from "antd";
import ManageConfigProvider from "../Manage/ManageConfigProvider";

const data = [
  {
    title: "Giảm 15% | Tối đa 50K",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/voucher.png?raw=true",
    description: "15% off, invalid booking type.",
    available: true,
  },
  {
    title: "Giảm 5% | Tối đa 50K",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/Yellow%20Taxi%20Service%20Instagram%20Post.png?raw=true",
    description: "15% off, invalid booking type.",
    available: true,
  },

  {
    title: "Giảm 50% Đặt Trước",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/voucher.png?raw=true",
    description: "50% off, invalid booking type.",
    available: true,
  },
  {
    title: "Giảm 25% Đặt Trước Chuyến Xe",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/Yellow%20Taxi%20Service%20Instagram%20Post.png?raw=true",
    description: "25% off, invalid booking type.",
    available: false,
  },
  {
    title: "17h-20h | Giảm 20%",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/voucher.png?raw=true",
    description:
      "20% off, this offer is only available on certain days and times. Try it again late.",
    available: false,
  },
  {
    title: "SÂN BAY | Giảm 5%",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/voucher.png?raw=true",
    description:
      "5% off, change your chosen vehicle type to enjoy this offers.",
    available: false,
  },
];

const Offers: React.FC = () => {
  const [numberSelected, setNumberSelected] = useState(0);

  const onChange = (e: any) => {
    if (e.target.checked) {
      setNumberSelected(numberSelected + 1);
    } else {
      setNumberSelected(numberSelected - 1);
    }
  };
  return (
    <ManageConfigProvider>
      <div>
        <p className="text-3xl font-bold my-6 ml-10 text-yellow">Offers</p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    width={60}
                    height={52}
                    preview={false}
                    src={item.img}
                  />
                }
                title={
                  item.available ? (
                    <p className="text-white">{item.title}</p>
                  ) : (
                    <p className="text-gray-400">{item.title}</p>
                  )
                }
                description={
                  item.available ? (
                    item.description
                  ) : (
                    <p className="text-gray-400">{item.description}</p>
                  )
                }
              />
              <div>{item.available && <Checkbox onClick={onChange} />}</div>
            </List.Item>
          )}
        />
        <div className="flex justify-between text-white px-10">
          <p>{`${numberSelected} offer sellected`}</p>
          <Button size="large">Apply</Button>
        </div>
      </div>
    </ManageConfigProvider>
  );
};

export default Offers;
