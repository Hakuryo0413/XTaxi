import React from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { COLOR } from "@src/color";
import {
  IsLoginLocalStorage,
  RoleLocalStorage,
  baseUserUrl,
} from "@src/utils/common";
import { useNavigate } from "react-router-dom";
enum FormFieldName {
  Username = "username",
  Password = "password",
}

type FormFieldValue = {
  Username: string;
  Password: string;
};

async function loginUser(values: FormFieldValue) {
  const url = `${baseUserUrl}/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("User logged in successfully:", data);
    localStorage.setItem(IsLoginLocalStorage, "true");
    localStorage.setItem(RoleLocalStorage, data.data.role);
  } catch (error) {
    console.error("Error logging in user:", error);
    localStorage.setItem(IsLoginLocalStorage, "false");
  }
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm<FormFieldValue>();
  const navigate = useNavigate();

  const onFinish = async (values: FormFieldValue) => {
    await loginUser(values);
    if (localStorage.getItem(IsLoginLocalStorage) === "true")
      if (localStorage.getItem(RoleLocalStorage) === "user")
        navigate("/booking");
      else if (localStorage.getItem(RoleLocalStorage) === "driver")
        navigate("/driver");
      else if (localStorage.getItem(RoleLocalStorage) === "admin")
        navigate("/admin/manage");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: COLOR.YELLOW,
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
            <Button
              htmlType="submit"
              className="w-full pr-4"
              onClick={() => onFinish}
            >
              LOGIN
            </Button>
          </Form.Item>
          <div className="flex text-white justify-center gap-2">
            <p>Don't have an account ?</p>
            <button onClick={() => navigate("/register")}>Register here</button>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default LoginForm;
