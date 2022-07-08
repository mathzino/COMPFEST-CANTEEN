import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { signin } from "../../store/user";
const SigninForm = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .post("https://honesty-canteen1.herokuapp.com/auth/signin", {
        studentId: values.id,
        password: values.password,
      })
      .then((res) => {
        var token = res.data.data.token;
        Cookies.set("id", values.id, { expires: 1 });
        Cookies.set("token", token, { expires: 1 });
        dispatch(signin());
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div>
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
                message: "Please values your id!",
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
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SigninForm;
