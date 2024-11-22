import React from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { COLOR } from "@src/color";
enum FormFieldName {
  Username = "username",
  Password = "password",
}

type FormFieldValue = {
  Username: string;
  Password: string;
};

const LoginForm: React.FC = () => {
  const [form] = Form.useForm<FormFieldValue>();

  const onFinish = (values: FormFieldValue) => {
    console.log(values);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: COLOR.YELLOW,
            // labelColor: "#FCCD04",
          },
          Button: {
            defaultBg: "#FCCD04",
            defaultBorderColor: "transparent",
            defaultHoverBg: "#FCCD04",
          },
          Input: {
            colorTextPlaceholder: "#757575",
          },
        },
      }}
    >
      <div className="px-12 sm:px-40 lg:px-96 md:px-80">
        <p className="text-white text-3xl font-bold my-8">Login</p>
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

          <Form.Item>
            <Button htmlType="submit" className="w-full pr-4">
              LOGIN
            </Button>
          </Form.Item>
          <div className="flex text-white justify-center gap-2">
            <p>Don't have an account ?</p>
            <a href="/register">Register here</a>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default LoginForm;
