import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    await axios
      .post("https://honesty-canteen1.herokuapp.com/auth/signup", {
        studentId: values.id,
        password: values.password,
      })
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <h1>Sign up </h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="id"
          rules={[
            {
              required: true,
              message: "Please input your id!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="id" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
