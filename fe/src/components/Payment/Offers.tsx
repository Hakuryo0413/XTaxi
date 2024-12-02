import React, { useState } from "react";
import { List, Image, Checkbox, Button, Modal } from "antd";
import ManageConfigProvider from "../Manage/ManageConfigProvider";
import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "Giảm 15% | Tối đa 50K",
    img: "https://github.com/Hakuryo0413/XTaxi/blob/main/voucher.png?raw=true",
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

type ModalProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const Offers: React.FC<ModalProps> = ({ open, onOk, onCancel }) => {
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
      <Modal
        title="Offers"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
      >
        <div>
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
                      <p className="text-black">{item.title}</p>
                    ) : (
                      <p className="text-gray-400">{item.title}</p>
                    )
                  }
                  description={
                    item.available ? (
                      <p className="text-black">{item.description}</p>
                    ) : (
                      <p className="text-gray-400">{item.description}</p>
                    )
                  }
                />
                <div>{item.available && <Checkbox onClick={onChange} />}</div>
              </List.Item>
            )}
          />
          <div className="flex justify-between text-black px-10">
            <p>{`${numberSelected} offer sellected`}</p>
            <Button size="large" onClick={onOk}>
              Apply
            </Button>
          </div>
        </div>
      </Modal>
    </ManageConfigProvider>
  );
};

export default Offers;
