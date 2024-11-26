import React from "react";
import { Button, ConfigProvider, Form, Input, Select } from "antd";

enum FormFieldName {
  Username = "username",
  Password = "password",
  Role = "role",
  Name = "name",
  Email = "email",
  Phone = "phone",
}

type FormFieldValue = {
  Username: string;
  Password: string;
  Role: string;
  Name: string;
  Email: string;
  Phone: number;
};

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm<FormFieldValue>();

  const onFinish = (values: FormFieldValue) => {
    console.log(values);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#FCCD04",
          },
          Button: {
            defaultBg: "#FCCD04",
            defaultBorderColor: "transparent",
            defaultHoverBg: "#FCCD04",
          },
          Input: {
            colorTextPlaceholder: "#757575",
          },
          Select: {
            colorTextPlaceholder: "#757575",
          },
        },
      }}
    >
      <div className="px-12 sm:px-40 lg:px-96 md:px-80">
        <p className="text-white text-3xl font-bold my-2">Register</p>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name={FormFieldName.Username}
            label={"Username"}
            layout="vertical"
            rules={[{ required: true }]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            name={FormFieldName.Password}
            label={"Password"}
            layout="vertical"
            rules={[{ required: true }]}
          >
            <Input placeholder="password" />
          </Form.Item>
          <Form.Item name={FormFieldName.Role} label="Role">
            <Select placeholder="Select your role">
              <Select.Option value="driver">Driver</Select.Option>
              <Select.Option value="customer">Customer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={FormFieldName.Name} label={"Name"} layout="vertical">
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name={FormFieldName.Email}
            label={"Email"}
            layout="vertical"
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name={FormFieldName.Phone}
            label={"Phone"}
            layout="vertical"
          >
            <Input placeholder="phone" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="w-full pr-4">
              REGISTER
            </Button>
          </Form.Item>
          <div className="flex text-white justify-center gap-2">
            <p>Already have an account ?</p>
            <a href="/login">Login now</a>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default RegisterForm;
